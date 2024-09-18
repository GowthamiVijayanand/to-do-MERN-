import React, { useState } from 'react';
import Sign from './Sign';
import { FaUser,FaLock  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import ima1 from '../Asserts/bg.webp';
import axios from 'axios';




const Login = () => {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const navigate=useNavigate();
const [name,setName]=useState('')

  async function logfun()
{

 let result=await axios.post('http://localhost:3001/login',{email,password});
 console.log(result);
 setName(result.name);
 setEmail(result.email);
 let token=result.data.jwt;
 sessionStorage.setItem("token",result.data.jwt);
 sessionStorage.setItem("email",result.data.email);
 sessionStorage.setItem("name",result.data.name);
 if(token)
   {
    navigate('/Taskpage');
   }

}



  return (
    <div style={{ background:`url(${ima1})`}}>
    <form className='d-flex flex-column  w-25 h-50 position-absolute top-50 start-50 translate-middle'>
     <div className='mx-5 mt-5 mr-5 border rounded-pill' ><label className=' p-2'><FaUser /></label><input  className='shadow-none p-2 border-0 w-75' type='text' placeholder='Enter the e-mail' onChange={(e)=>{setEmail(e.target.value)}}></input></div> 
     <div className='mx-5 mt-5 mr-5 border rounded-pill'><label className=' p-2'><FaLock /></label><input className='shadow-none p-2 border-0 w-75' type='text' placeholder='Enter the Password' onChange={(e)=>{setPassword(e.target.value)}}></input></div> 
     <button type='button' className='mx-5 mt-5 mr-5 mb-3 border rounded-pill btn btn-primary' onClick={()=>{logfun()}}>Login</button>
     <div className='mb-2'><input type='checkbox'></input><label className='p-2'>Keep me Loggedin</label><Link to='/' style={{textDecoration:0,color:"black"}} className='mx-4 p-3'>Forgot Password</Link></div>
     <div className='text-center'><Link to="/sign" style={{textDecoration:0,color:"black"}}>CREATE ACCOUNT</Link></div>
   

    </form>
    
{/* 
    <>
    <Appcontext.provider value={userSettings}>
      
      </Appcontext.provider>
      </> */}
    {/* <form className='d-flex flex-column border w-25 h-50  position-absolute top-50 start-50 translate-middle' > */}
   
      
    
    </div>
    
  )
}

export default Login;
