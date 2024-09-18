import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Taskbar from './components/Taskbar';
import Login from './components/Login';

import Sign from './components/Sign';
import Taskpage from './components/Taskpage';
import Adtask from './components/Adtask';


function App() {
  
   
  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Login/>}></Route>
   <Route path='/Login' element={<Login/>}></Route>
   <Route path='/sign' element={<Sign/>}></Route>
    <Route path='/taskpage' element={<Taskpage/>}></Route>
    <Route path='/adtask' element={<Adtask/>}></Route>

    
   </Routes>
   
   </BrowserRouter>
  

  );
}

export default App;
