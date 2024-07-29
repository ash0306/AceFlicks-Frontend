import { useState, React } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from'react-router-dom'
import RegisterComponent from './Components/AuthComponents/RegisterComponent'
import LoginComponent from './Components/AuthComponents/LoginComponent';
import HomepageComponent from './Components/DisplayDetailsComponents/HomepageComponent';
import ShowtimeComponent from './Components/DisplayDetailsComponents/ShowtimeComponent';
import SeatsComponent from './Components/DisplayDetailsComponents/SeatsComponent';

function App() {

  return (
      <Routes>
        <Route path='/' element={<HomepageComponent/>}/>
        <Route path='/login' element={<LoginComponent/>}/>
        <Route path='/register' element={<RegisterComponent/>}/>
        <Route path='/showtimes' element={<ShowtimeComponent/>}/>
        <Route path='/seats' element={<SeatsComponent/>}/>
      </Routes>
  )
}

export default App
