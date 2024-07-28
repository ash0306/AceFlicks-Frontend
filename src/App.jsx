import { useState, React } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from'react-router-dom'
import RegisterComponent from './Components/AuthComponents/RegisterComponent'
import LoginComponent from './Components/AuthComponents/LoginComponent';

function App() {

  return (
      <Routes>
        <Route path='/login' element={<LoginComponent/>}/>
        <Route path='/register' element={<RegisterComponent/>}/>
      </Routes>
  )
}

export default App
