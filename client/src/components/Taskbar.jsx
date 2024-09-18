 import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Taskbar = () => {

useEffect( ()=>{

gettask()



},[])

const [task,setTask]=useState('')
const [tasks,setTasks]=useState([])
//const [edittsk,seteditTask]=useState('')
async function gettask()
{
  
  var result= await axios.get('http://localhost:3001/getdata') 
  var arr=result.data.data
  console.log(arr.length);
  setTasks(arr) 
   

}



  async function posttast()
{
  try {
    
    let result=await axios.post('http://localhost:3001/task',{task})
   console.log(result);


  } catch (error) {
    console.log(error.message);
  }
  finally{
    gettask()
  }
}

  async function edittask(e)
{
  try {
    let result=await axios.put('http://localhost:3001/edittask',"NEWthing")

  } catch (error) {
    console.log(error.message);
  }
  finally{
    gettask();
  }
}

async function deletetask({_id})
{
  try {
    let result=await axios.delete(`http://localhost:3001/deletetask/${_id}`)
    console.log(result);
  } catch (error) {
    console.log(error.message)
  }
  finally{
    gettask()
  }
}


  return (
    <>
    <div className="container">
      
        <div >
          <input placeholder='Enter your yask and just do it' onChange={(e)=>setTask(e.target.value)}  className='form-control col-5 my-3'/>
          <button className='col-3 btn btn-primary' onClick={posttast}>Enter task</button>
         <div>
         <table>
          <thead>
            <tr><td>S.no</td>
            <td>Task</td>
            <td>Action</td>
            <td>Action</td></tr>
          </thead>

        {tasks.map((e,i)=>{
           return <>
           <tr>
            <td key={e._id}> {e?.task}</td>
                 <td>{i+1}</td>
                 <td><button type='button' onClick={()=>edittask(e)}>Edit</button></td>
                 <td><button type='button' onClick={()=>deletetask(e)}>Delete</button></td>
                 
          </tr>
          </>
          })}

         </table>

         </div>

        </div>    
    </div>
    {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}
  
  
    </>
  )
}

export default Taskbar