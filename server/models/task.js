const mongoose=require('mongoose')
let schema=new mongoose.Schema({
   
    email:{
        type:String,
        require:true,        
    },
    task:{
        type:String,            
    },   
    updated:{
        type:String,
        default:new Date(),
    },   

})


let model=mongoose.model('Task_Details',schema)
module.exports=model