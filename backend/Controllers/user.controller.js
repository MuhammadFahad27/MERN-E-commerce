const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const User = require("../Models/user.model");
const ErrorHandler = require("../Utils/handleError");
const bcrypt = require('bcryptjs')

const getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    if(!req.params.id){

        return next(new ErrorHandler('User is undefine ',400))

    }

    if(req.params.id !== req.user.id ){

        return next(new ErrorHandler('you can not get details of this user ',403))
    }

    const user = await User.findById(req.params.id) ;

   

    return res.status(200).json({

        success:true , 
        message:'User found successfully ',
        user
    })


})

const updateProfile = catchAsyncErrors(async (req,res,next)=>{

     if(!req.params.id){

        return next(new ErrorHandler('User is undefine ',400))

    }

    if(req.params.id !== req.user.id ){

        return next(new ErrorHandler('you can not update Profile ',403))
    }

    let update = {} ;
    

    const {username , email , password } = req.body ;


    if(username ){

        update.username = username 
    }

    if(email ){

        update.email = email 
    }

    if(password ){

       

        if(password.length > 15 || password.length < 5 ){

            return next(new ErrorHandler('password should be in 5-15 characters ') )
        }

        // hash password 

        const hashedPassword = await bcrypt.hash(password,10) ;

        update.password = hashedPassword 


    }

   

    const updatedUser = await User.findByIdAndUpdate(req.params.id,update,{new:true}) ;

    

    return res.status(200).json({

        success:true , 
        message:'Profile updated ',
        user :{

            id:updatedUser._id ,
            role:updatedUser.role ,
            name:updatedUser.username,
            email:updatedUser.email 
        }
    })


})

const filterUsers =  catchAsyncErrors (async (req,res,next)=>{

    
    if(req.user.role !== 'admin'){
    
            return next(new ErrorHandler('Only Admin can see user',403)) ;
     }
    const {name} = req.query ;

   

    if(!name){

        return next(new ErrorHandler('Enter user to search ',400))
    }

    const users = await User.find({

            username:{$regex:name,$options:'i'} 

           
    })

     return res.status(200).json({

        success:true , 
        message:'Users filtered' , 
        users 
     })
})




module.exports = {getUserDetails , updateProfile , filterUsers

}