import axiosInstance from '../../utilities/axiosConfig';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../styles/styles.css';

function NavBarComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    axiosInstance.get('/auth/user',{
        withCredentials: true,
    })
    .then(response =>{
        console.log(response);
        setIsLoggedIn(true);
        console.log(isLoggedIn);
    })
    .catch(error => {
        console.log(error);
        setIsLoggedIn(false);
    });
  },[]);

  return (
    <div className='home-container'>
      <div className="container p-3 mt-3" id='navbar'>
        <div className="row">
          <div className="col-6 p-2">
            <h3 className="fw-bold">
              <Link to="#" className="text-light text-decoration-none">
                <img src="/AceTicketsLogo.png" className="img-fluid me-3" style={{width:"70px"}} alt="AceTickets"/> AceTickets
              </Link>
            </h3>
          </div>
          <div className="col-6 d-flex justify-content-end">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle h4"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  {isLoggedIn ? (
                    <>
                      <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                      <li><Link to="/bookings" className="dropdown-item">Bookings</Link></li>
                      <li><Link to="/logout" className="dropdown-item">Logout</Link></li>
                    </>
                  ) : (
                    <li><Link to="/login" className="dropdown-item">Login</Link></li>
                  )}
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBarComponent;
