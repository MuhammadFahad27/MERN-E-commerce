const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Order = require("../Models/order.model");
const ErrorHandler = require("../Utils/handleError");
const Product = require('../Models/product.model')

const createOrder = catchAsyncErrors(async(req,res,next)=>{

       const {

        name , 
        country ,
        address,
        phone ,
        city ,
        user ,
        orderItems ,
        totalPrice,
        totalProducts,
        paymentMethod,
        shippingMethod


       } = req.body 

        const order = await Order.create({

            name ,
            country ,
            address ,
            phone ,
            city ,
            user,
            totalPrice ,
            totalProducts,
            orderItems,
            shippingMethod,
            paymentMethod

        })

        return res.status(201).json({

            success:true , 
            message:'Order created Successfully ',
            order 
        })


})

//  --- for user 
const getSingleOrder = catchAsyncErrors(async (req,res,next)=>{

    if(!req.param.id){

        return next(new ErrorHandler('Select order ',400))

    }

    const  order = await Order.findbyId(req.params.id).populate('user','username email') ;

    if(!order){

        return next(new ErrorHandler('order not found',404))
    }

    return res.status(200).json({

        success:true , 
        message:'Order found ',
        order
    })
})
// for user
const getAllOrders = catchAsyncErrors(async (req,res,next)=>{

   

    const  order = await Order.find({user:req.user.id}) ;


    return res.status(200).json({

        success:true , 
        message:'All Order  ',
        order
    })
})

const Orders = catchAsyncErrors(async(req,res,next)=>{

    if(req.user.role !== 'admin'){

        return next(new ErrorHandler(403,'Un-Otherized'))
    }

    const Orders = await Order.find() ;

    return res.status(200).json({

        success:true ,
        Orders 
    })
})

const updateStatus = catchAsyncErrors(async(req,res,next)=>{

    if(req.user.role !== 'admin'){

        return next(new ErrorHandler('Un-Otherized',403))
    }

    const {id} = req.params ;
    const {orderStatus} = req.body ;

    if(!id){

        return next(new ErrorHandler('Bad Request',400))
    }

    const order = await Order.findByIdAndUpdate(id,{
        orderStatus

    },{new:true }) ;

    if(!order){

        return res.status(404).json({

            success:false ,
            message:"Order not found"
        })
    }

    // store ids of products 
     const orderItems = order?.orderItems.map((item) => (
        { product: item?.product ,
            quantity : item?.quantity
        }
    ));

//     [
//   { product: new ObjectId('6830a35d2155c38f4336c309'), quantity: 1 },
//   { product: new ObjectId('6830a4742155c38f4336c30b'), quantity: 1 }
//     ]   

      if(order.orderStatus==='delivered'){

            await Promise.all( orderItems.map(async(p)=>{
                
                const product = await Product.findById(p.product) ;

                if(!product){

                    return next(new ErrorHandler('Product not found',404)) ;
                }

                product.stock -= p.quantity ;
                
                await product.save() ;

            })

        )

      }

      console.log( orderItems)

    return res.status(200).json({

        success:true ,
        message:"Status updated Successfully !"
    })
})


module.exports = {createOrder , getSingleOrder , getAllOrders,Orders , updateStatus}