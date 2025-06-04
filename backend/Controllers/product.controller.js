const Product = require("../Models/product.model");
const ErrorHandler = require("../Utils/handleError");
const catchAsyncError = require('../Middlewares/catchAsyncErrors') ;
const uploader = require('../Utils/upload');



//  -- Admin Route 
const createProduct = catchAsyncError(async(req,res,next)=>{

    if(req.user.role !== 'admin'){

        return next(ErrorHandler('Only admin can create Products ',403))
    }

    const {user}  = req.params 
    
    if(!user){

        return next(ErrorHandler('Un-Otherized  ',400))


    }

    const {

        name , price , description , 
        category , stock ,
        
    } = req.body 

    if(!name || !price || !description || !category || !stock  ){

        return next(new ErrorHandler('All Fields are required ! ',400))
    }

     
   
        if (!req.files || req.files.length !== 4) {
        return next(new ErrorHandler("Upload at 4 image", 400));
        }


        let images = [];

        for (const file of req.files) {
            const result = await uploader.uploadFile(file.path);
            images.push(result.secure_url); 
        }


    
    const product = await Product.create({

        name , 
        price :Number(price), 
        stock :Number(price),
        description ,
        category,
        images , 
        user 
    }) ;

    return res.status(201).json({

        success:true ,
        message:'Product Created Successfully ',
        product
    })


})

const getAllProducts = catchAsyncError(async(req,res,next)=>{

    const allProducts = await Product.find().populate('user','username email').populate('category','name') ;

      return res.status(201).json({

        success:true ,
        message:'Product Found Successfully ',
        allProducts
    })


})
// --ADMIN 
const updateProduct = catchAsyncError(async (req,res,next)=>{

    
    if(req.user.role !== 'admin'){

        return next(ErrorHandler('Only admin can create Products ',403))
    }

    if(!req.params.id){

        return next(new ErrorHandler('Select Product to update',400))
    }

    let product = await Product.findById(req.params.id) ;



    if(!product){

        return next(new ErrorHandler('Product not found ',404))
    }

    let data = {} ;

     const {

        name , price , description , 
        category , stock ,
        
    } = req.body

    if(name){

        data.name = name ;
    }
    if(price){

        const Price = Number(price)
        data.price = Price ;

    }if(name){

        data.name = name ;
    }if(description){

        data.description = description  ;
    }if(category){

        data.category  = category  ;
    }
    if(stock){

        const Stock = Number(stock) ;

        data.stock = Stock ;
    }



        let images = [];
        let existingImages = [] ;

        if(req.body.existingImages){

             existingImages = JSON.parse(req.body.existingImages);

        }

        if(req.files && req.files.length > 0){

            
            for (const file of req.files) {
                const result = await uploader.uploadFile(file.path);
                images.push(result.secure_url); 
            }

        }




        data.images = [...images,...existingImages] ;



    product = await Product.findByIdAndUpdate(req.params.id,data,{new:true , runValidators:true})

     return res.status(200).json({

        success:true ,
        message:'Product updated Successfuly ',
        product
    })

})

// --- Admin
const deleteProduct = catchAsyncError(async(req,res,next)=>{

    
    if(req.user.role !== 'admin'){

        return next(ErrorHandler('Only admin can create Products ',403))
    }
    
    if(!req.params.id){

        return next(new ErrorHandler('Select Product to Delete',400))
    }
    const deletedProduct = await Product.findByIdAndDelete(req.params.id) ;

     if(!deletedProduct){

        return next(new ErrorHandler('Product not found',404))
    }

  

    return res.status(200).json({

        success:true ,
        message:'Product Deleted Successfully '
    })


})

const getProductDetails = catchAsyncError(async (req,res,next)=>{

    
    if(!req.params.id){

        return next(new ErrorHandler('Select Product ',400))
    }

    const product = await Product.findById(req.params.id).populate('category','name') ;

    if(!product){

        return next(new ErrorHandler('Product not found ',404))
    }

    return res.status(200).json({

        success:true ,
        message:"Product Found Successfully ",
        product
    })
})


// -- Searching filtering sorting paginations 


const getProducts = catchAsyncError(async (req, res, next) => {
  
    const search = req.query.search || '';
    let limit =  4; 
    const page = Number(req.query.page) || 1;
    let filter = {} ;
    let  skip = (page-1) * limit 
    const condition = [] ;
    
    let sort = req.query.sort 
   let order = req.query.order 

 
    if(search){

        filter.name = {$regex:search,$options:'i'}
    }

    if(req.query.category && req.query.category.length > 0 ){

        filter.category = {$in:req.query.category} ;
    }

    if(req.query.priceRange && req.query.priceRange.length > 0 ){

          const priceRanges = Array.isArray(req.query.priceRange) ? req.query.priceRange : [req.query.priceRange];

        
        
        const priceCondition = priceRanges.map((range)=>{

            const [min,max] = range.split('-').map(Number) ;
            return {

                price:{

                    $gte:min , $lte:max 
                }
            }
        })

        condition.push({$or:priceCondition})
    }

    

    if(req.query.rating && req.query.rating.length > 0){


           const ratings = Array.isArray(req.query.rating) ? req.query.rating : [req.query.rating];

        const ratingCondition =ratings.map((r)=>{

            const [min,max] = r.split('-').map(Number) ;

            return {
                
                ratings:{

                    $gte:min , $lte:max
                }
            }
        })

        
        condition.push({$or:ratingCondition})
       

       
    }

        if (condition.length > 0) {
            filter.$and = condition;
            }

    if(!search && !req.query.rating && !req.query.category && !req.query.priceRange && 

        !sort && !order
     ){

        limit = 4
        skip = (page-1) * limit 
         const products = await Product.find()
        .skip(skip)
        .limit(limit);
        const total = await Product.countDocuments();
        

        

        return res.status(200).json({
        success: true,
        message: 'Products',
        products,
        total,
        limit ,
        totalPages:Math.ceil(total/limit)
       
    });
     }

   
 
    // Sorting options
    if (sort === 'priceAsc') {
        order = 1;
        sort = 'price';
    } else if (sort === 'priceDesc') {
        order = -1;
        sort = 'price';
    } else if (sort === 'latest') {
        sort = 'createdAt';
        order = -1;
    } else if (sort === 'oldest') {
        sort = 'createdAt';
        order = 1; 
    }   
    if(!order){

        order = -1 
    }
    if(!sort){

        sort = 'createdAt'
    }
   

    
    const products = await Product.find(filter)
        .sort({ [sort]: order })
        .skip(skip)
        .limit(limit);

     const total = await Product.countDocuments(filter);


    
    return res.status(200).json({
        success: true,
        message: 'Products',
        products,
        total,
         limit ,
        totalPages:Math.ceil(total/limit)

       
    });
});

const searchProducts = catchAsyncError(async (req,res,next)=>{

    if(req.user.role !== 'admin'){

        return next(new ErrorHandler('Only Admin can see products',403)) ;
    }

    const {name} = req.query ;

    if(!name){

        return next(new ErrorHandler('Product name is required ',400)) ;
    }

    const products = await Product.find({

        name:{$regex:name,$options:'i'} 
    })

    return res.status(200).json({

        success:true , 
        message:'Products found' , 
        products
    })
})

   


// add a revie w
const productReviews = catchAsyncError (async (req,res,next)=>{

    if(req.params.userId !== req.user.id){

        return next(new ErrorHandler('Unotherized ',403))
    }

    const {ratings , comment } = req.body ;
    const {id} = req.params 

    const review = {

        name : req.user.name ,
        ratings:Number(ratings) ,
        comment  ,
        user : req.user.id   
    }

    const product = await Product.findById(id).populate('category','name') ;

    if(!product){

        return next(new ErrorHandler('product not found ',404))
    }

   const isReviewed = product.reviews.find( r => r.user.toString() === req.user.id.toString())  

    if(isReviewed){

        product.reviews.forEach((r)=>{

            if( r.user.toString() === req.user.id.toString()){

                r.ratings = ratings 
                r.comment = comment 

            }
          
        })


    }
    else {

        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    // now the avg rating based on all users reviews 

    product.ratings = product.reviews.reduce((acc,r)=> acc+r.ratings ,0)/product.reviews.length

    await product.save({validateBeforeSave:false}) ;

    

    return res.status(200).json({

        success:true ,
        
        message:'Review Reviews ',
        reviews:product.reviews,

    })

   

})

//  All Reviews of a particular Product 
const getAllReviews  = catchAsyncError (async (req,res,next)=>{

    const {id} = req.query  ;

    if(!id){

        return next(new ErrorHandler('Product is undefine',400))
    }
    const product = await Product.findById(id) ;

      if(!product){

        return next(new ErrorHandler('Product not found ',404))
    }


    return res.status(200).json({

        success:true ,
        message:'All Reviews ',
        reviews:product.reviews

    })

})

const deleteReview = catchAsyncError(async (req,res,next)=>{

  
    // rID = Review Id 
    // id = product Id 
    const {id, rId} = req.params ;

    if(req.user.role !== 'admin'){

         return next(new ErrorHandler('Un Otherized ',403))
    }


    if(!id){

        return next(new ErrorHandler('Select product  ',400))
    }
    
    if(!rId){

        return next(new ErrorHandler('Select review to delete ',400))
    }

    const product = await Product.findById(id) ;

     if(!product){

        return next(new ErrorHandler('Product not found ',404))
    }

    const review = product.reviews.find( (r)=> r._id.toString() === rId) ;

     if (!review) {
        return next(new ErrorHandler("You haven't reviewed this product", 404));
    }

    if(review){

        product.reviews = product.reviews.filter((r)=> r._id.toString() !== rId)

    }

    // update number of reviews 

    product.numOfReviews = product.reviews.length ;

    // update ratings 

    product.ratings =   product.reviews.length === 0
    ? 0 :
    product.reviews.reduce((acc,r)=>acc+r.ratings,0)/product.reviews.length ;

    await product.save({validateBeforeSave:false})

    return res.status(200).json({

        success:true ,
        message:"Review Deleted"
    })

})

// -- admin

module.exports = {getAllProducts, createProduct , updateProduct , deleteProduct , getProductDetails ,getProducts , productReviews ,getAllReviews , deleteReview , searchProducts}