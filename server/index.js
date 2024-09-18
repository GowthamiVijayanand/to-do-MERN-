const express=require('express')
const app=express()
const mongoose=require('mongoose')
const port=3001
const cors=require('cors')
const usermodel=require('./models/user')
const taskmodel=require('./models/task')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

require('dotenv').config()



app.use(express.json())
app.use(cors())

async function connect(){
    try {
        const connect=await mongoose.connect('mongodb+srv://mailtogowths:Riyatanishka%4024@cluster0.4dj0i7j.mongodb.net/',{
            useNewUrlparser:true,
            useUnifiedTopology:true
         })
         console.log("----connection Established",connect.connection.host); 

    } catch (error) {
        
        console.log(error.message);
    }
    

}
connect()


app.post('/signup',async (req,res,next)=>{
try {
    
       let {name,email,password}=req.body       
       
       //hashing 
       let salt=bcrypt.genSaltSync(10)
       let hash=bcrypt.hashSync(password,salt)
       let newuser=new usermodel({name:name,email:email,password:hash})
       let result=await newuser.save()       
       let token=jwt.sign({data:{name,email}},process.env.SECRET_KEY,{expiresIn:"1hr"})
       res.send({jwt:token,data:result,message:"Successfully Registered"}).status(200)

    }
catch (error) {
   res. send({data:error.message}) 
}

})


app.post('/login',async (req,res,next)=>{
    try {
      let {email,password}=req.body;
      
      let chk=await usermodel.findOne({email:email})
    
      
      if(chk)
        {
           let hashpass=chk.password;
           let name=chk.name;
           let haskchk=bcrypt.compareSync(password,hashpass)
           let token=jwt.sign({data:{email}},process.env.SECRET_KEY,{expiresIn:"1hr"})

           res.send({jwt:token,email,name,message:"Successfull logi-------nin"}).status(200)
           
       }
       else{
        res.send({message:"E-mail id not valid"}).status(401)
       }

    
        } catch (error) {
                res. send({data:error.message}) 
           }
})


app.delete('/deletetask/:id',async(req,res,next)=>{
  try {
      let {id}=req.params
      let result=await taskmodel.findByIdAndDelete(id)
      res.send({data:result,message:"Successfully Deleted"}).status(200)
  } catch (error) {
      res.send({message:error.message}).status(500)
  }
})


app.get('/gettask/:email',async (req,res,next)=>{
    try {
  let {email}=req.params;
  let token=req.headers.token; 
  console.log(token+"----gettask-------");

  
  let username=await taskmodel.aggregate([
    {
      $match:{email:email}
    },
   
    {
         $lookup:{
            from:"user_details",
           localField:"email",
           foreignField:"email",
           as:"email"
                } 
    },
   
    {
      $project:{task:1,"email.name":1}
    },
        
    ]).then()
   
  console.log("aggregation------->"+JSON.stringify( username));
 
  res.send({data:username,message:"Successful"}).status(200); 
 
  


    
  } catch (error) {
    res.send(error.message);  }  

})


app.post('/addtask',async(req,res,next)=>{
  try {
    
   let {email,task}=req.body;
   let data=new taskmodel({email:email,task:task});
   let result=await data.save();
   console.log("Successsssssssss");
   
   res.send({message:"Success"}).status(200);
  } catch (error) {
    res.send({message:error.message}) 
  }
})

app.post('/posttask/:email',async (req,res,next)=>{
  try {
  let {task1,task2,task3}=req.params;
  let {email}=req.params;
  let token=req.headers.token;
  let data=new taskmodel({email:email,task:task});
  let result=await data.save();
  res.send({message:"Success"}).status(200)
  } catch (error) {
    res.send({message:error.message})
  }


})



app.listen(port,()=>{
    console.log("server Listening from"+port);
})

