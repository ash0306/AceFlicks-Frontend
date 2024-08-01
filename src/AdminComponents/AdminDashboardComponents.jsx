import React from 'react'
import NavBarComponent from '../Components/HeaderComponents/NavBarComponent'
import adminDashboard from '../assets/images/adminDashboard.gif'

function AdminDashboardComponents() {
  return (
    <div className='home-container'>
        <NavBarComponent/>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 col-12'>
                    <h1>Welcome to your Admin Dashboard</h1>
                    <img src={adminDashboard} className='img-fluid' alt='admin-dashboard'></img>
                </div>
                <div className='col-md-6 col-12 text-end my-auto'>
                    <h1 className='display-3'>
                        Manage the Bookings, Movies, Theatres and Showtime Services,<span className='color-font'> All in one place!!</span>
                    </h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboardComponents