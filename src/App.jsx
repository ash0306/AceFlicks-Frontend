import { useState, React } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/styles.css';
import { Routes, Route } from'react-router-dom'
import RegisterComponent from './Components/AuthComponents/RegisterComponent'
import LoginComponent from './Components/AuthComponents/LoginComponent';
import ForgotPasswordComponent from './Components/AuthComponents/ForgotPasswordComponent';
import ShowtimeComponent from './Components/DisplayDetailsComponents/ShowtimeComponent';
import SeatsComponent from './Components/DisplayDetailsComponents/SeatsComponent';
import HomepageComponent from './Components/HomepageComponents/HomepageComponent';
import BookingDetailsComponents from './Components/BookingComponents/BookingDetailsComponents';
import PrivateRoute from './utilities/PrivateRoute';
import BookingConfirmationComponent from './Components/BookingComponents/BookingConfirmationComponent';
import ProfileComponent from './Components/UserComponents/ProfileComponent';
import BookingHistoryComponent from './Components/UserComponents/BookingHistoryComponent';
import LogoutComponent from './Components/AuthComponents/LogoutComponent';
import AdminDashboardComponents from './AdminComponents/AdminDashboardComponents';
import MoviesTable from './AdminComponents/TableComponents/MoviesTableComponent';
import ShowtimesTable from './AdminComponents/TableComponents/ShowtimesTableComponent';
import TheatresTable from './AdminComponents/TableComponents/TheatresTableComponent';
import BookingsTable from './AdminComponents/TableComponents/BookingsTableComponent';
import RegisterAdminComponent from './AdminComponents/FormComponents/RegisterAdminComponent';
import AddMovieComponent from './AdminComponents/FormComponents/AddMovieComponent';
import AddShowtimeComponent from './AdminComponents/FormComponents/AddShowtimeComponent';
import AddTheatreComponent from './AdminComponents/FormComponents/AddTheatreComponent';
import VerifyAccountComponent from './Components/AuthComponents/VerifyAccountComponent';

function App() {

  return (
      <Routes>
        <Route path='/' element={<HomepageComponent/>}/>
        {/* Auth Routes */}
        <Route path='/login' element={<LoginComponent/>}/>
        <Route path='/register' element={<RegisterComponent/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordComponent/>}/>
        <Route path='/verify' element={<VerifyAccountComponent/>}/>
        
        {/* User Routes */}
        <Route path='/:type/:name/showtimes' element={<ShowtimeComponent/>}/>
        <Route path='/:movie/:theatre/:showtime/seats' element={<PrivateRoute component={SeatsComponent}/>}/>
        <Route path='/:movie/:theatre/:showtime/:seats/booking' element={<PrivateRoute component={BookingDetailsComponents}/>}/>
        <Route path='/booking-confirmation' element={<PrivateRoute component={BookingConfirmationComponent}/>}/>
        <Route path='/profile' element={<PrivateRoute component={ProfileComponent}/>}/>
        <Route path='/user/bookings' element={<PrivateRoute component={BookingHistoryComponent}/>}/>
        <Route path='/logout' element={<PrivateRoute component={LogoutComponent}/>}/>

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<PrivateRoute component={AdminDashboardComponents}/>}/>
        <Route path='/admin/movies' element={<PrivateRoute component={MoviesTable}/>}/>
        <Route path='/admin/showtimes' element={<PrivateRoute component={ShowtimesTable}/>}/>
        <Route path='/admin/theatres' element={<PrivateRoute component={TheatresTable}/>}/>
        <Route path='/admin/bookings' element={<PrivateRoute component={BookingsTable}/>}/>
        <Route path='/admin/register-new' element={<PrivateRoute component={RegisterAdminComponent}/>}/>
        <Route path='/admin/add-movie' element={<PrivateRoute component={AddMovieComponent}/>}/>
        <Route path='/admin/add-showtime' element={<PrivateRoute component={AddShowtimeComponent}/>}/>
        <Route path='/admin/add-theatre' element={<PrivateRoute component={AddTheatreComponent}/>}/>
      </Routes>
  )
}

export default App
