import { useState, React } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from'react-router-dom'
import RegisterComponent from './Components/AuthComponents/RegisterComponent'
import LoginComponent from './Components/AuthComponents/LoginComponent';
import ShowtimeComponent from './Components/DisplayDetailsComponents/ShowtimeComponent';
import SeatsComponent from './Components/DisplayDetailsComponents/SeatsComponent';
import HomepageComponent from './Components/HomepageComponents/HomepageComponent';
import TestComponent from './Components/TestComponent';
import BookingDetailsComponents from './Components/BookingDetailsComponents/BookingDetailsComponents';

function App() {

  return (
      <Routes>
        <Route path='/' element={<HomepageComponent/>}/>
        <Route path='/login' element={<LoginComponent/>}/>
        <Route path='/register' element={<RegisterComponent/>}/>
        <Route path='/:type/:name/showtimes' element={<ShowtimeComponent/>}/>
        <Route path='/:movie/:theatre/:showtime/seats' element={<SeatsComponent/>}/>
        <Route path='/:movie/:theatre/:showtime/:seats/booking' element={<BookingDetailsComponents/>}/>
        <Route path='/test' element={<TestComponent/>}/>
      </Routes>
  )
}

export default App
