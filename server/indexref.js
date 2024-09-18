const express=require('express')
const app=express()
const mongoose=require('mongoose')
const modeltask=require('./models/taskmodel')
const cors=require('cors')
const port=3001

app.use(express.json())
app.use(cors())



async function connect()
{
    try {
     let connect=await mongoose.connect('mongodb+srv://mailtogowths:Riyatanishka%4024@cluster0.4dj0i7j.mongodb.net/',{
        useNewUrlparser:true,
        useUnifiedTopology:true
     })  

     console.log('--------Connection established',connect.connection.host);
        

    } catch (error) {
        console.log(error.message);
    }
}

connect()

app.post('/task',async (req,res,next)=>{
   

    try {
       let body=req.body
       
       
       let data=new modeltask(body)
       let result=await data.save()
      
       res.send({data:result,message:"Successfully added"}).status(200)



    } catch (error) {
       
       console.log(error);
        res.send({message:error.message}).status(500)
    }




})
app.get('/getdata',async (req,res,next)=>{
    try {
        

        let body=await modeltask.find().sort({Date:-1})       
       
       
        res.send({data:body})

    } catch(error) {
        console.log(error);

    }
        
    
})

app.delete('/deletetask/:id',async(req,res,next)=>{
    try {
        let {id}=req.params
        let result=await modeltask.findByIdAndDelete(id)
        res.send({data:result,message:"Successfully Deleted"}).status(200)
    } catch (error) {
        res.send({message:error.message}).status(500)
    }
})


app.put('/updatetask/:id',async (req,res,next)=>{
    try
    {
        let {id}=req.params
        let result=await modeltask.updateOne({_id:id},{task:req.body})
        res.send({message:"Succesfully updated"}).status(200)
    }
    catch(error){
        res.send(error.message)
    }


})


app.listen(port,()=>{console.log('server listening on port',port);})






