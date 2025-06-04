const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Cart = require("../Models/cart.model");
const ErrorHandler = require("../Utils/handleError");

const addToCart = catchAsyncErrors(async(req,res,next)=>{

   const { userId, id } = req.params;

   let message = 'Add to Cart' ;

    

    
    if(req.user.id !== userId){

        

        return next(new ErrorHandler('Not Authenticated ',403)) ;

    }



    if(!id){

        return next(new ErrorHandler('Bad Request ',400)) ;
    }

   let cart = await Cart.findOne({user:userId}) ;

   if(!cart){

    cart = new Cart({

        products:[{product:id , quantity:1}] ,
        user:userId 
    })

    
   }
   else{

        const productInCart = cart.products.find((p)=> p.product.toString() === id  ) ;

        if(productInCart){

            productInCart.quantity  +=1 ;
            message = 'Already in cart'
        }
        else {
           
           cart.products.push({product: id, quantity: 1});
       }
        
   }

   await cart.populate('products.product');

            cart.totalProducts = cart.products.reduce((acc, item) => acc + item.quantity, 0);

            cart.totalPrice = cart.products.reduce((acc, item) => {
                return acc + (item.product.price * item.quantity);
            }, 0);


 

   await cart.save() ;

   // -- to make the structure same

    const item = await Cart.find().populate('products.product') ;

    return res.status(200).json({

        success:true ,
        message,
        item
        
    })

  


})

const removeFromCart = catchAsyncErrors(async(req,res,next)=>{

     const { userId, id } = req.params;
    if(req.user.id !== userId){


        return next(new ErrorHandler('Not Authenticated ',403)) ;

    }



    if(!id){

        return next(new ErrorHandler('Bad Request ',400)) ;
    }

    let cart = await Cart.findOne({user:userId}) ;

    if(!cart){

        return res.status(404).json({
            success:true , 
            message:"Cart not found"
        })
    }

    // find the product send by the user 

    const product = cart.products.find((p)=>p.product.toString() === id) ;

    if(!product){

        return res.status(404).json({

            success:false , 
            message:'Product not found '
        })
       
    }

    if(product.quantity === 1){

        cart.products = cart.products.filter((p)=>p.product.toString() !== id) ;

    }

    product.quantity -= 1 ;
    

    // update price & total Quantity 
   await cart.populate('products.product');
    
    cart.totalPrice = cart.products.reduce((acc,item)=>{

        return acc + (item.product.price * item.quantity)
    },0)

    cart.totalProducts = cart.products.reduce((acc,item)=>{

        return acc +  item.quantity
    },0)

    await cart.save() ;

    // -- to make the structure same

    const item = await Cart.find().populate('products.product') ;

    return res.status(200).json({

        success:true ,
        message:'Remove From Cart ',
        item
    })


    


})

const cartItems = catchAsyncErrors (async(req,res,next)=>{

     const { userId } = req.params;

    

    
    if(req.user.id !== userId){

        

        return next(new ErrorHandler('Not Authenticated ',403)) ;

    }




    const item = await Cart.find().populate('products.product') ;

    return res.status(200).json({

        success:true ,
        message:"All Cart items",
        item
    })
})

const removeProduct = catchAsyncErrors(async (req,res,next)=>{

    const { userId, id } = req.params;
    if(req.user.id !== userId){


        return next(new ErrorHandler('Not Authenticated ',403)) ;

    }
    if(!id){

        return next(new ErrorHandler('Bad Request ',400)) ;
    }

    let cart = await Cart.findOne({user:userId}) ;

    if(!cart){

        return res.status(404).json({
            success:true , 
            message:"Cart not found"
        })
    }

    // find the product send by the user 

    const product = cart.products.find((p)=>p.product.toString() === id) ;

    if(!product){

        return res.status(404).json({

            success:false , 
            message:'Product not found '
        })
       
    }

    
    // totally remove the Product
    cart.products = cart.products.filter((p)=>p.product.toString() !== id) ;

    

    
    

    // update price & total Quantity 
   await cart.populate('products.product');
    
    cart.totalPrice = cart.products.reduce((acc,item)=>{

        return acc + (item.product.price * item.quantity)
    },0)

    cart.totalProducts = cart.products.reduce((acc,item)=>{

        return acc +  item.quantity
    },0)

    await cart.save() ;

    // -- to make the structure same

    const item = await Cart.find().populate('products.product') ;

    return res.status(200).json({

        success:true ,
        message:'Remove From Cart ',
        item
    })


    




})

const deleteCart = catchAsyncErrors(async (req,res,next)=>{

    const {userId} = req.params ;

    if(!userId){

        return next(new ErrorHandler('Bad Request',400))
    }

    const cart = await Cart.deleteOne({user:userId}) ;

    if(!cart){

        return next(new ErrorHandler('Cart Not found ',404))

    }

    return res.status(200).json({

        success:true , 
    })
})



module.exports = {addToCart , removeFromCart  , cartItems , removeProduct , deleteCart}