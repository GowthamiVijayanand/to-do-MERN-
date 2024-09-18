import axios from 'axios'
import React, { useState } from 'react'

const Sign = () => {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

 async function submit(e)
 {
  e.preventDefault()
  
  try {
    var result=await axios.post('http://localhost:3001/signup',{name,email,password})
    console.log(result); 
    sessionStorage.setItem("token",result.data.jwt);
    sessionStorage.setItem("email",result.data.email);
    
    } catch (error) {
     
    console.log(error.message);
  }
 }

  return (
    <>
    <form className='d-flex flex-column  w-25 h-50 position-absolute top-50 start-50 translate-middle'>
     <label>Name :</label><input type='text' placeholder='Enter Your Name ' onChange={(e)=>{setName(e.target.value)}}></input>
     <label>E-mail :</label><input type='email' placeholder='Enter Your E-mailid ' onChange={(e)=>{setEmail(e.target.value)}}></input>
     <label>Password :</label><input type='password' placeholder='Enter Your Password' onChange={(e)=>{setPassword(e.target.value)}}></input>
     <button type='submit' className='btn btn-primary' onClick={submit}>Create</button>
     {/* <a href=''>Create</a> */}


    </form>
    
    
    
    
    </>
  )
}

export default Sign