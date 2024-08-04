import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utilities/axiosConfig';
import NavBarComponent from '../HeaderComponents/NavBarComponent';
import useFormValidation from '../../utilities/useFormValidation';
import ToastNotification from '../NotificationComponents/ToastNotification';

function VerifyAccountComponent() {
    useFormValidation();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();
    const [toastConfig, setToastConfig] = useState({
        show: false,
        classBackground: '',
        message: '',
    });

    const handleSendCode = () => {
        setLoading(true);
        axiosInstance.post('/auth/verify/generateCode',null, { 
            params: {
                userEmail: email
            }
        })
            .then(response => {
                if (response.status === 200) {
                    newToast("bg-success", "Verification code sent! Check your email.");
                    setOtpSent(true);
                }
            })
            .catch(error => {
                console.error(error);
                newToast("bg-danger", `Failed to send verification code. ${error.response.data.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setLoading(true);
            axiosInstance.post(`/api/auth/verify/verifyCode?userEmail=${email}&verificationCode=${otp}`)
            .then(response => {
                if (response.status === 200) {
                    newToast("bg-success", "Verification successful! Redirecting....");
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
            })
            .catch(error => {
                console.error(error);
                newToast("bg-danger", `Verification failed. ${error.response.data.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
        }
        setValidated(true);
    };

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

    return (
        <div className='main-container'>
            <NavBarComponent />
            <div className="container p-3 align-middle" id="div-content">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 container border rounded shadow-lg" id='card-form'>
                        <div className="row d-flex align-items-center">
                            <div className="py-5 col-12">
                                <div>
                                    <h1 className="text-center">VERIFY ACCOUNT</h1>
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
                                        <label htmlFor="otp" className="form-label">Verification OTP</label>
                                        <div className="input-group p-0">
                                            <input type="text" className="form-control" id="otp" placeholder="Enter the OTP" minLength="6" maxLength="6" required onChange={(e) => setOtp(e.target.value)} disabled={!otpSent} />
                                        </div>
                                    </div>
                                    <div className="row m-3 d-flex justify-content-center" id="login-btn">
                                        <button type="button" className="btn btn-dark w-50 fs-5" onClick={otpSent ? handleSubmit : handleSendCode} disabled={loading}>
                                            {loading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                otpSent ? "Verify Code" : "Send Verification Code"
                                            )}
                                        </button>
                                    </div>
                                    <div className="row m-3 text-center">
                                        <p className="m-0">New to AceTickets?</p>
                                        <p><Link to="/register" className="text-decoration-none">Register here</Link></p>
                                        <p className="m-0">Already have an account?</p>
                                        <p><Link to="/login" className="text-decoration-none">Login here</Link></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastNotification classBackground={toastConfig.classBackground} message={toastConfig.message} show={toastConfig.show} onClose={closeToast} />
        </div>
    );
}

export default VerifyAccountComponent;