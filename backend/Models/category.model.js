const mongoose = require('mongoose') ;

const categoryScheema = new mongoose.Schema({

    name:{

        type:String ,
        required:[true,'Enter Category name']
    },
  


},{timestamps:true})

const Category = mongoose.model('Category',categoryScheema) ;

module.exports = Category ;