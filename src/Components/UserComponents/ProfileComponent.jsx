import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import user from '../../assets/images/user.png'
import axiosInstance from '../../utilities/axiosConfig';
import { useSelector } from 'react-redux';
import NavBarComponent from '../HeaderComponents/NavBarComponent';

function ProfileComponent() {
    const [isEditing, setIsEditing] = useState(false);
    const [phone, setPhone] = useState('');
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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async() => {
        console.log(userId);
        await axiosInstance.put('/users',{
            id: `${userId}`,
            phoneNumber: phone
        },{
            withCredentials: true,
        })
        .then(response =>{
            setData(response.data);
            setIsEditing(false);
        })
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setPhone(data.phone);
        setIsEditing(false);
    };
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
                            <strong>Phone : </strong>
                            {isEditing ? (
                            <>
                                <input type="tel" maxLength="10" minLength="10" id="phone-input" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control d-inline-block"
                                    style={{ width: '150px' }}
                                />
                                <button className="btn btn-success btn-sm ms-2"
                                id="save-changes"
                                onClick={() => handleSaveClick()}
                                >
                                Save
                                </button>
                                <button className="btn btn-danger btn-sm ms-2"
                                id="cancel-changes"
                                onClick={() => handleCancelClick()}
                                >
                                Cancel
                                </button>
                            </>
                            ) : (
                            <>
                                <span id="phone-span">{data.phone}</span>
                                <i className="bi bi-pencil-square ms-2 float-end"
                                id="edit-phone"
                                style={{ cursor: 'pointer' }}
                                onClick={handleEditClick}
                                ></i>
                            </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileComponent