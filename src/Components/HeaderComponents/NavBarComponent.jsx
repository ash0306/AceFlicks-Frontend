import axiosInstance from '../../utilities/axiosConfig';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../styles/styles.css';
import { useSelector } from 'react-redux';

function NavBarComponent() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  return (
    <div className='home-container'>
      <div className="container p-3 mt-3" id='navbar'>
        <div className="row">
          <div className="col-6 p-2">
            <h3 className="fw-bold">
              {isLoggedIn && role === 'User' ? (
                <Link to="/" className="text-light text-decoration-none">
                  <img src="/AceTicketsLogo.png" className="img-fluid me-3" style={{width:"70px"}} alt="AceTickets"/>  Ace<span className='color-font'>Tickets</span>
                </Link>
              ) : isLoggedIn && role === 'Admin' ? (
                <Link to="/admin/dashboard" className="text-light text-decoration-none">
                  <img src="/AceTicketsLogo.png" className="img-fluid me-3" style={{width:"70px"}} alt="AceTickets"/>  Ace<span className='color-font'>Tickets</span>
                </Link>
              ) : (
                <Link to="/" className="text-light text-decoration-none">
                  <img src="/AceTicketsLogo.png" className="img-fluid me-3" style={{width:"70px"}} alt="AceTickets"/>  Ace<span className='color-font'>Tickets</span>
                </Link>
              )}
            </h3>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            {isLoggedIn && role === 'User' ? (
              <div className="dropdown">
                  <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-person h4"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                      <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                      <li><Link to="/user/bookings" className="dropdown-item">Bookings</Link></li>
                      <li><Link to="/logout" className="dropdown-item">Logout</Link></li>
                  </ul>
              </div>
            ) : isLoggedIn && role === 'Admin' ? (
              <div className="dropdown">
                  <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="adminDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-person-fill h4"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
                      <li><Link to="/admin/movies" className="dropdown-item">Movies</Link></li>
                      <li><Link to="/admin/bookings" className="dropdown-item">Bookings</Link></li>
                      <li><Link to="/admin/theatres" className="dropdown-item">Theatres</Link></li>
                      <li><Link to="/admin/showtimes" className="dropdown-item">Showtimes</Link></li>
                      <li><Link to="/admin/register-new" className="dropdown-item">Register new admin</Link></li>
                      <li><Link to="/logout" className="dropdown-item">Logout</Link></li>
                  </ul>
              </div>
          ) : (
              <button className='btn color-bg text-white fs-5' id='color-btn'>
                  <Link to='/login' className='text-decoration-none text-white'>Login</Link>
              </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarComponent;