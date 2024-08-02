import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import useFormValidation from '../../utilities/useFormValidation';
import NavBarComponent from '../../Components/HeaderComponents/NavBarComponent';
import axiosInstance from '../../utilities/axiosConfig';
import ToastNotification from '../../Components/NotificationComponents/ToastNotification';
// import addTheatre from '../../assets/images/addTheatre.png';
// import newTheatre from '../../assets/images/newTheatre.jpg';

function AddTheatreComponent() {
    useFormValidation();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toastConfig, setToastConfig] = useState({
        show: false,
        classBackground: '',
        message: '',
    });
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const newToast = (classBackground, message) => {
        setToastConfig({
            show: true,
            classBackground,
            message,
        });
    };

    const closeToast = () => {
        setToastConfig((prevState) => ({ ...prevState, show: false }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setIsLoading(true);
            await axiosInstance.post('/theatres', {
                name: name,
                location: location,
            }, {
                withCredentials: true,
            })
            .then(response => {
                console.log(response);
                newToast("bg-success", "Theatre added successfully!");
                setTimeout(() => {
                    navigate('/admin/theatres');
                }, 3000);
            })
            .catch(error => {
                console.error('Error adding theatre:', error);
                newToast("bg-danger", "Error adding theatre!");
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
        setName('');
        setLocation('');
        setValidated(true);
    };

    return (
        <div className='main-container'>
            <NavBarComponent />
            <div className="container p-3 text-dark">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 container border rounded shadow-lg" id="card-form">
                        <div className="row d-flex">
                            <div className="d-none d-md-block col-5 p-0">
                                <img src='' className="img-fluid rounded-start" style={{ height: '100%', width: 'auto' }} alt="Add Theatre" />
                            </div>
                            <div className="py-5 col-md-6 col-12">
                                <div>
                                    <h1 className="text-center">ADD <span className='color-font'>THEATRE</span></h1>
                                </div>
                                <form className="container needs-validation" noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                                    <div className="row m-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter theatre name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a theatre name.</div>
                                        <div className="valid-feedback">Valid theatre name</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="location" className="form-label">Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="location"
                                            placeholder="Enter location"
                                            required
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a location.</div>
                                        <div className="valid-feedback">Valid location</div>
                                    </div>
                                    <div className="row m-3 d-flex justify-content-center" id="register-btn">
                                        <button type="submit" className="btn btn-dark w-50 fs-5">
                                            {isLoading ? <Spinner animation="border" size="sm" /> : "Add Theatre"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastNotification classBackground={toastConfig.classBackground} message={toastConfig.message} show={toastConfig.show} onClose={closeToast} />
        </div>
    )
}

export default AddTheatreComponent;