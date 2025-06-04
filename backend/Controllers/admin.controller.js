const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const User = require("../Models/user.model");
const ErrorHandler = require("../Utils/handleError");
const bcrypt = require('bcryptjs')
const Order = require('../Models/order.model')

const getAllUsers = catchAsyncErrors(async (req,res,next)=>{

    if(req.user.role !== 'admin'){

        return next(new ErrorHandler('only admin can access',403)) 
    } 

    const allUsers = await User.find() ;

    return res.status(200).json({

        success:true ,
        message : "All Users ",
        allUsers 
    })
})

const getSingleUser = catchAsyncErrors(async (req,res,next)=>{

     if(req.user.role !== 'admin'){

        return next(new ErrorHandler('only admin can access',403)) 
    } 

    const {userId} = req.params ;

    if(!userId){

        return next(new ErrorHandler('Select User ',400)) 

    }

    const user = await User.findById(userId) ;

    if(!user){

          return next(new ErrorHandler('User not found  ',404)) 
    }

    return res.status(200).json({

        success:true , 
        message:'User found ',
        user 

    })

})

const updateRole = catchAsyncErrors (async (req,res,next)=>{

     if(req.user.role !== 'admin'){

        return next(new ErrorHandler('only admin can access',403)) 
    } 

    const {role} = req.body ;

    console.log(role)

    if(!role){

        return next(new ErrorHandler('Enter Role ? Admin/User ',400)) 

    }

     const {id} = req.params ;

    if(!id){

        return next(new ErrorHandler('Select User ',400)) 

    }

    const user = await User.findByIdAndUpdate(id,{role},{new:true}) ;

    return res.status(200).json({

        success:true , 
        message:'Role Update ',
        user ,
    })

    





})

const deleteUser = catchAsyncErrors (async (req,res,next)=>{

     if(req.user.role !== 'admin'){

        return next(new ErrorHandler('Only admin can acess',403))

     }

     const {id} = req.params ;

      if(!id){

        return next(new ErrorHandler('select user to delete',400))

     }

     const deleteUser = await User.findByIdAndDelete(id) ;

     if(!deleteUser){

        return next(new ErrorHandler('User not found ',404))
     }

     return res.status(200).json({

        success:true , 
        message:'User deleted '
     })



})

const userOrders = catchAsyncErrors(async (req,res,next)=>{


    if(req.user.role !== 'admin'){

        return next(new ErrorHandler('only admin can acess',403)) ;
    }

    const {id} = req.params.id 

    const allOrders = await Order.find({user:id}) ;

    return res.status(200).json({

        success:true , 
        message:'All Orders ',
        allOrders
    })
})

const allOrders = catchAsyncErrors(async (req,res,next)=>{

    if(req.user.role!=='admin'){

        return next(new ErrorHandler('only amdin can aceess',403))
    }

    const allOrders = await Order.find() ;

    const totalAmount = allOrders.reduce((acc,order)=> acc+ order.totalPrice ,0)

    return res.status(200).json({

        success:true , 
        message:'All Orders ',
        allOrders,
        totalAmount
    })
})

const updateOrder = catchAsyncErrors (async (req,res,next)=>{

     if(req.user.role !== 'admin'){

        return next(new ErrorHandler('only admin can acess',403)) ;
    }

    const id = req.params.id ;

    const status = req.body.status 

    if(!id){

        return next(new ErrorHandler('Select Order ',400)) ;
    }

    const order =  await Order.findById(id) ;

    if(order.orderStatus === 'Delivered'){

        return next(new ErrorHandler('Order delivered Already ',400)) ;
        
    }

    order.orderStatus = status  

    if(status==='Delivered'){

        order.deliveredAt = Date.now() ;

    }


    await order.save({validateBeforeSave:false})
   

    return res.status(200).json({

        success:true , 
        message:'Order status Updated Successfully ',
        isDelivered
    })
})

const deleteOrder = catchAsyncErrors (async (req,res,next)=>{

     if(req.user.role !== 'admin'){

        return next(new ErrorHandler('only admin can acess',403)) ;
    }

    const id = req.params.id ;

  

    if(!id){

        return next(new ErrorHandler('Select Order ',400)) ;
    }

    const order =  await Order.findByIdAndDelete(id) ;

    if(!order){

        return next(new ErrorHandler('Order not found ',404))
    }


    return res.status(200).json({

        success:true , 
        message:'Order Deleted  Successfully ',
        
    })
})

module.exports = {getAllUsers , getSingleUser , updateRole ,deleteUser , userOrders , allOrders ,updateOrder ,deleteOrder}
