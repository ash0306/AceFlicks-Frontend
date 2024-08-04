import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../utilities/axiosConfig';
import { logout } from '../../AuthSlice';

function LogoutComponent() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const { userId } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLogout = async () =>{
            await axiosInstance.post('/auth/logout',{},{
                withCredentials: true,
            }).then((response) => {
                console.log(response);
                dispatch(logout());
                setIsLoggedOut(true);
                setTimeout(() =>{

                },3000);
            })
            .catch((error) => {
                console.error('Error logging out:', error);
                setIsLoggedOut(false);
            });
        }
        fetchLogout();
    },[]);

  return (
     <div className='home-container d-flex flex-column align-items-center justify-content-center'>
        {loading && <div>Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {isLoggedOut && (
            <>
                <img src={logoutImage} alt="Logout" className="img-fluid" />
                <h2>You have been logged out successfully</h2>
            </>
        )}
    </div>
  )
}

export default LogoutComponent