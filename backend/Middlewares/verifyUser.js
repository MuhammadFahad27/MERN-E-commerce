const jwt  = require("jsonwebtoken");
const ErrorHandler = require("../Utils/handleError");
const catchAsyncErrors = require("./catchAsyncErrors");


//  to check the use is authenticated or not 
const verifyUser = async(req,res,next)=>{

    try {

         const token = req.cookies.token ;

        

        if(!token){

            return next(new ErrorHandler('Plz login ',401))
        }

        
    // token is available 

    const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY) ;

    req.user = decode 

    next() ;
        
    } catch (error) {
        
        next(new ErrorHandler('Plz again Login ',401))
    }

   



}

module.exports = verifyUser