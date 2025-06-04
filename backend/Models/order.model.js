const mongoose = require('mongoose') ;

const orderScheema = new mongoose.Schema({

   name:{

            type:String ,
            required:true
    } ,
     address:{

            type:String ,
            required:true
    } ,
        
    city:{

            type:String ,
            required:true
    } ,
   

    country:{

            type:String ,
            required:true
    } ,

    phone:{

            type:String ,
            required:true
    } ,

   orderItems: [
        {
            product: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Product',
                  required: true
            },
            name: {
                type: String,
                  required: true
            },
                  quantity: {
                  type: Number,
                  required: true
                  },
              price: {
                type: Number,
                required: true
              },
              image: {
                type: String,
                required: true
              }
        }
    ]
,
     

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    paymentMethod:{ type: String, required: true },
    shippingMethod: { type: String, required: true },
    orderStatus: { type: String, default: 'pending' },
    paymentStatus: { type: String, default: 'pending' },
    totalProducts :{

        type:Number , 
        required:true 
    }  ,
    totalPrice :{

         type:Number ,
        required:true
    } ,
   

    
            

} , {timestamps:true})

const Order = mongoose.model('Order',orderScheema) ;

module.exports = Order 