const mongoose = require('mongoose') ;

const productScheema = new mongoose.Schema({

    name:{

        type:String ,
        required:[true,'Enter product name']
    },
    description:{

        type:String ,
        required:[true,'Enter product description ']
    },
    price : {

        type:Number ,
        required:[true,'Enter product price '] 
    },
    ratings:{

        type:Number ,
        default:0
    },
    images:{

        type:[String],
        required:true 
    },
    category :{

       
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    user:{

       
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
  
    stock:{
        type:Number ,
        required:[true,'Enter stock of product'],
        default:1
    },
    numOfReviews:{

        type:Number ,
        default:0
    },

    reviews:[

        {

            name:{

                type:String ,
                required:true 
            },
            ratings:{
                type:Number ,
                required:true 
            },
            comment:{
                type:String,
                required:true 
            },
             user:{

       
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User',
                    required:true
            },
        }
    ]


},{timestamps:true})

const Product = mongoose.model('Product',productScheema) ;

module.exports = Product ;