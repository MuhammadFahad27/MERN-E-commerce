const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const User = require("../Models/user.model");
const ErrorHandler = require("../Utils/handleError");
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcryptjs')

const signUp = catchAsyncErrors(async (req,res,next)=>{

    const {username , email, password } = req.body 

    if(!username || !email || !password || email=='' || password == ''){

        return next(ErrorHandler('All Fields are required ',400))
    }

    if(password.length < 5 ){

        return next(new ErrorHandler('Password have atleast 5 characters'))
    }
    if(password.length > 15 ){

        return next(new ErrorHandler('Password is too long  5-15'))
    }

    const hashedPassword = await bcrypt.hash(password,10) ;

    const isCreated = await User.findOne({email}) ;

    if(isCreated){

        return next(new ErrorHandler('Username already taken ',400))
    }

    const user = await User.create({
        username ,
        email ,
        password:hashedPassword 
    })

    return res.status(201).json({

        success:true ,
        message:"Sign up Successfully "
    })

})

const signIn = catchAsyncErrors(async (req,res,next)=>{

    const {email , password } = req.body ;

     if(!email || !password || email==='' || password === ''){

        return next(new ErrorHandler('All Fields are required ',400))
    }

    const ValidUser = await User.findOne({email}).select('+password') ;

    if(!ValidUser){

        return next(new ErrorHandler('User not found ',404))
    }

    const user = await bcrypt.compare(password,ValidUser.password) ;

    if(!user){

        return next(new ErrorHandler('Invalid Credentails',400))
    }

    // now JWT Token 

    const token = jwt.sign({

        id:ValidUser._id ,
        role:ValidUser.role ,
        name:ValidUser.username
    },process.env.JWT_SECRET_KEY,{expiresIn:'1h'}) ;


    return res.cookie('token',token,{

        httpOnly:true,
        secure:process.env.NODE_ENV == "production",
        sameSite:process.env.NODE_ENV == "production" ? 'none':'strict' ,
        path:'/',
        domain: process.env.NODE_ENV === "production" ? '.vercel.app' : undefined,
        maxAge: 3600000 ,


    }).status(200).json({

        success:true ,
        message:'Sign in Successfully ',
        user: {

             id:ValidUser._id ,
            role:ValidUser.role ,
            name:ValidUser.username,
            email:ValidUser.email
        } ,
        token 
    })



})

const signOut = catchAsyncErrors(async (req,res,next)=>{

    const token = req.cookies.token ;

    

    if(!token){

        return next(new ErrorHandler('Login before sign out ',400))
    } 

    return res.clearCookie('token').status(200).json({

        success:true , 
        message:'Sign out successfully '
    })
})

const checkAuth = catchAsyncErrors(async (req,res,next)=>{

    const token = req.cookies.token ;

    console.log('token',token)

    if(!token){

        return res.json({

            success:false , 
            
        })
    } 

    // check expiry 

    const isValid = await jwt.verify(token,process.env.JWT_SECRET_KEY) ;

    if(!isValid){

        return res.json({

            success:false ,
            message:'not authenticated'
        })
    }

    return res.status(200).json({

        success:true ,
        message:'Authenticated ! '
    })


})

module.exports = {signUp , signIn , signOut , checkAuth}