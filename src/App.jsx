import { useState, React } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegisterComponent from './Components/AuthComponents/RegisterComponent/RegisterComponent'
import LoginComponent from './Components/AuthComponents/LoginComponent/LoginComponent';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' Component={LoginComponent}/>
        <Route path='/register' Component={RegisterComponent}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
