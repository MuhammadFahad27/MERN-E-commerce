const mongoose = require('mongoose') ;

const cartScheema = new mongoose.Schema({

    // for all product  
    // p1= 40 p2 = 100 T = P1 + P2 

    totalPrice:{

        type:Number ,
        required:true 
    },
    // all products quanitity = length of an array 
    totalProducts:{

        type:Number 
    } ,

    products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],

    user:{

        type:mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required:true ,

    }
    
    

},{timestamps:true})

const Cart = mongoose.model('Cart',cartScheema) ;

module.exports = Cart 
