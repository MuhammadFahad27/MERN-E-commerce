const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const Category = require("../Models/category.model");
const ErrorHandler = require("../Utils/handleError");


//  -- Admin Route All 

const createCategory  = catchAsyncErrors(async(req,res,next)=>{

     if(req.user.role !== 'admin'){

        return next(new ErrorHandler('Only admin can create categories  ',403))
    }

   const {name} = req.body ;

  

    if(!name  ){

        return next(new ErrorHandler(' Category name is required ! ',400))
    }


    const iscreated = await Category.findOne({name}) ;

    if(iscreated){

        return next(new ErrorHandler(' Category already exist ! ',404))


    }
    
    const category = await Category.create({name}) ;

    return res.status(201).json({

        success:true ,
        message:'Category Created Successfully ',
        category
    })


})

const deleteCategory = catchAsyncErrors(async (req,res,next)=>{

      if(req.user.role !== 'admin'){

        return next(new ErrorHandler('Only admin can delete categories  ',403))

    }
    const {id} = req.params;

    console.log('category id : ',id)
    if(!id){

        return next(new ErrorHandler('Select categiry to delete  ',400))

    }

    const delete_Category  = await Category.findByIdAndDelete(id) ;

    console.log('after delete',delete_Category)
    console.log('type of id ',typeof id)


    if(!delete_Category){

        return next(new ErrorHandler('Category not found   ',404))
    }

    return res.status(200).json({

        success:true , 
        message:'Deleted Successfully '
    })



})
const updateCategory = catchAsyncErrors(async (req,res,next)=>{

      if(req.user.role !== 'admin'){

        return next(new ErrorHandler('Only admin can update  categories  ',403))
    }

    if(!req.params.id){

        return next(new ErrorHandler('Select category to update   ',400))

    }



    const {name} = req.body ;

    console.log(name)

    if(!name){

        return next(new ErrorHandler('category name is required   ',400))
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id,{name},{new:true}) ;

    return res.status(200).json({

        success:true ,
        message:'Category updated Successfully ',
        updatedCategory 
    })


})
const readCategories = catchAsyncErrors(async (req,res,next)=>{

    
    const allCategories = await Category.find();

     return res.status(200).json({

        success:true , 
        message:'All Categories  ',
        allCategories
    })



})

const searchCategory = catchAsyncErrors(async(req,res,next)=>{

    const {category} = req.params ;
    

    if(!category){

        return next(new ErrorHandler('Enter category name ',400))
    }

    
    // const searchTerm = category.trim();

    const result = await Category.find({
      name: { $regex:category, $options: "i" },
    });

    // const result = await Category.find({ name: category });


   


    return res.status(200).json({

        success:true , 
        message:'Category Found ',
        result 
    })
})



module.exports = {createCategory , deleteCategory , updateCategory , readCategories ,
    searchCategory
}