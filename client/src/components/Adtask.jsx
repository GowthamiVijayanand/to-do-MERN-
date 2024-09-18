import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Adtask = () => {
  const [task, addTask] = useState('');
  const navigate=useNavigate();
  const fun = async () => {
    try {
   
      let email  = sessionStorage.getItem("email")


      let result = await axios.post('http://localhost:3001/addtask', {email, task })
      console.log(result);
      navigate('/Taskpage');
     
    } catch (error) {
      console.log(error);

    }

  }
  return (
    <div ><input type='text' onChange={(e) => addTask(e.target.value)}></input>
      <button type='button' onClick={fun}>Ok</button>


    </div>
  )
}

export default Adtask