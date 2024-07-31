import { useState, React } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from'react-router-dom'
import RegisterComponent from './Components/AuthComponents/RegisterComponent'
import LoginComponent from './Components/AuthComponents/LoginComponent';
import ForgotPasswordComponent from './Components/AuthComponents/ForgotPasswordComponent';
import ShowtimeComponent from './Components/DisplayDetailsComponents/ShowtimeComponent';
import SeatsComponent from './Components/DisplayDetailsComponents/SeatsComponent';
import HomepageComponent from './Components/HomepageComponents/HomepageComponent';
import TestComponent from './Components/TestComponent';
import BookingDetailsComponents from './Components/BookingComponents/BookingDetailsComponents';
import PrivateRoute from './utilities/PrivateRoute';
import BookingConfirmationComponent from './Components/BookingComponents/BookingConfirmationComponent';
import ProfileComponent from './Components/UserComponents/ProfileComponent';
import BookingHistoryComponent from './Components/UserComponents/BookingHistoryComponent';

function App() {

  return (
      <Routes>
        <Route path='/' element={<HomepageComponent/>}/>
        <Route path='/login' element={<LoginComponent/>}/>
        <Route path='/register' element={<RegisterComponent/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordComponent/>}/>
        <Route path='/:type/:name/showtimes' element={<ShowtimeComponent/>}/>
        <Route path='/:movie/:theatre/:showtime/seats' element={<PrivateRoute component={SeatsComponent}/>}/>
        <Route path='/:movie/:theatre/:showtime/:seats/booking' element={<PrivateRoute component={BookingDetailsComponents}/>}/>
        <Route path='/booking-confirmation' element={<PrivateRoute component={BookingConfirmationComponent}/>}/>
        <Route path='/profile' element={<PrivateRoute component={ProfileComponent}/>}/>
        <Route path='/user/bookings' element={<PrivateRoute component={BookingHistoryComponent}/>}/>
        <Route path='/test' element={<TestComponent/>}/>
      </Routes>
  )
}

export default App
