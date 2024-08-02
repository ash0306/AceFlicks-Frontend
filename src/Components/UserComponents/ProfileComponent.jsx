import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import user from '../../assets/images/user.png'
import axiosInstance from '../../utilities/axiosConfig';
import { useSelector } from 'react-redux';
import NavBarComponent from '../HeaderComponents/NavBarComponent';

function ProfileComponent() {
    const [data, setData] = useState('');
    const { userId, role } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/users/id/${userId}`,{
                    withCredentials: true,
                });
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    },[]);
  return (
    <div className='home-container'>
        <NavBarComponent/>
        <div className="container p-3">
            <div className="row">
                <div className="col-md-6 col-12">
                    <img src={user} alt="user" className='img-fluid'/>
                </div>
                <div className="col-md-6 col-12">
                    <h1 className="fw-bold">User Profile</h1>
                    <ul className="list-group list-group-flush my-5 rounded rounded-xl">
                        <li className="list-group-item">
                            <strong>Name : </strong>{data.name}
                        </li>
                        <li className="list-group-item">
                            <strong>Email ID : </strong>{data.email}
                        </li>
                        <li className="list-group-item">
                            <strong>Phone : </strong>{data.phone}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileComponent