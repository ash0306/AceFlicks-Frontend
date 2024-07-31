import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFormValidation from "../../utilities/useFormValidation";
import '../../styles/styles.css';
import axiosInstance from '../../utilities/axiosConfig';
import ToastNotification from '../NotificationComponents/ToastNotification';
import NavBarComponent from '../HeaderComponents/NavBarComponent';

function ForgotPasswordComponent() {
    useFormValidation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [toastConfig, setToastConfig] = useState({
        show: false,
        classBackground: '',
        message: '',
    });

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setLoading(true);
            axiosInstance.put('/auth/password', {
                email: email,
                password: password
            }, {
                withCredentials: true,
            })
            .then(response => {
                if (response.status === 200) {
                    newToast("bg-success", "Password updated successfullly! Redirecting....");
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
            })
            .catch(error => {
                console.error(error);
                newToast("bg-danger", "Could not update password. "+ error.message);
            })
            .finally(() => {
                setLoading(false);
            });
        }
        setValidated(true);
    };

    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById("password");
        const passwordIcon = document.getElementById("toggle-password-icon");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordIcon.className = "bi bi-eye";
        } else {
            passwordInput.type = "password";
            passwordIcon.className = "bi bi-eye-slash";
        }
    };
  return (
    <div className='main-container'>
        <NavBarComponent/>
            <div className="container p-3 align-middle" id="div-content">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 container border rounded shadow-lg" id='card-form'>
                        <div className="row d-flex align-items-center">
                            <div className="py-5 col-12">
                                <div>
                                    <h1 className="text-center">Forgot Password</h1>
                                </div>
                                <form className="container needs-validation" noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                                    <div className="row m-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                                        <div className="invalid-feedback">
                                            Please enter a valid email.
                                        </div>
                                        <div className="valid-feedback">
                                            Valid Email
                                        </div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className="input-group p-0">
                                            <input type="password" className="form-control" id="password" placeholder="Enter your new password" minLength="8" required onChange={(e) => setPassword(e.target.value)} />
                                            <span className="input-group-text rounded-end" id="toggle-password" onClick={togglePasswordVisibility}>
                                                <i className="bi bi-eye-slash" id="toggle-password-icon"></i>
                                            </span>
                                            <div className="invalid-feedback">
                                                Please enter a valid password of min length 8.
                                            </div>
                                            <div className="valid-feedback">
                                                Valid password
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row m-3 d-flex justify-content-center" id="login-btn">
                                        <button type="submit" className="btn btn-dark w-50 fs-5" disabled={loading}>
                                            {loading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                "Submit"
                                            )}
                                        </button>
                                    </div>
                                    <div className="row m-3 text-center">
                                        <p className="m-0">New to AceTickets?</p>
                                        <p><Link to="/register" className="text-decoration-none">Register here</Link></p>
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

export default ForgotPasswordComponent