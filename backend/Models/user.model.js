const mongoose = require('mongoose') ;

const userScheema = new mongoose.Schema({

    username:{

        type:String ,
        required:true,
        maxLength:30,
        
    },
    email:{

        type:String ,
        required:true,
        unique:true 
    },
    password:{

        type:String ,
        required:true,
        select:false
         
    },
    role:{

        type:String ,
        default:'user',
        enum:['admin','user']
    }
    

    
  
              
            
},{timestamps:true})

const User = mongoose.model('User',userScheema) ;

module.exports = User ;