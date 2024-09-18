import axios from 'axios';
import './Taskpage.css';
  
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const Taskpage = () => {
  const [name,setName]=useState('')
  const [task,setTask]=useState([])

  const navigate=useNavigate();

  
  useEffect(()=>{
   
    gettasks();
  },[])
  const gettasks=async ()=>{
   
    try {
     
     let result=await axios.get(`http://localhost:3001/gettask/${sessionStorage.getItem("email")}`,{headers:{token:sessionStorage.getItem("token")}});
      
     if(result)
     {
        
     setName(result.data.data[0].email[0].name);  
     setTask(result.data.data);
    
     console.log(result.data.data);
     }
     else{
       navigate('/Login');
     }
    } catch (error) {
      console.log(error);
    }
  }

  const logout=()=>
  {
  sessionStorage.clear();
  navigate('/Login');

  } 
  const del=async (e)=>{
    try {
      let result=await axios.delete(`http://localhost:3001/deletetask/${e}`)
      console.log(result);
    } catch (error) {
      console.log(error.message)
    }
    finally{
      gettasks()
    }
  } 
    
  
  return (
    <>
      <div id="color">
      <div class="d-flex justify-content-end " id="gap">
      <h4>Setting</h4>
      <h4 onClick={logout}>logout</h4>     
      <a onClick={()=>{navigate('/Adtask')}}><h4>Add task</h4></a>
      </div>
      <div class={"d-flex align-items-center"}  >
      <h3>Hello {name}</h3> 
      </div>
      </div> 
      <div>
        <table>
        <thead>
            <td>S.no</td>
            <td>Task</td>
            
            <td>Action</td>
            
            </thead>
             {task.map((e,i)=>{
              return<>
              <tr>
                <td>{i+1}</td>
                <td>{e?.task} </td>         
                
                <td><button type='button'  onClick={()=>{del(e._id)}}>Delete</button></td>
              </tr>
              
              </>
            })}  
            
       


        </table>
      </div>
   
    </>
  )
}

export default Taskpage