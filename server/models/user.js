const mongoose=require('mongoose')
let schema=new mongoose.Schema({
    name:{
        type:String,
        require:true        
    },
    email:{
        type:String,
        require:true,
       
        
    },
    password:{
        type:String,
        require:true
    },
    lastupdated:{
        type:Date,
        default:new Date()
    }

})
  

let model=mongoose.model('User_Details',schema)
module.exports=model
