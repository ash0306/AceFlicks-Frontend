import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer, Toast } from 'react-bootstrap';
import { useState } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../../utilities/useFormValidation";
import '../../App.css';
import axiosInstance from "../../utilities/axiosConfig";

function RegisterComponent() {
  useFormValidation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [validated, setValidated] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("bg-success");
  const [showToast, setShowToast] = useState(false);
  const [isOTPDIVVisible, setIsOTPDIVVisible] = useState(false);
  const [userId, setUserId] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      axiosInstance.post('/auth/register',{
        name: name,
        email: email,
        password: password,
        phone: phone
      })
      .then( response => {
        if(response.status === 200) {
          setUserId(response.data.id);
          newToast("bg-success", "Registration successful!Please verify your email to proceed");
          setIsOTPDIVVisible(true);
        }
      })
      .catch(error => {
        newToast("bg-danger", "Registration failed. Please try again.");
      });
    }
    setValidated(true);
  };

  const handleVerification = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      axiosInstance.post(`/auth/verify/verifyCode/${otp}?userId=${userId}`)
      .then( response => {
        console.log(response);
        if(response.status === 200) {
          newToast("bg-success", "Verification successful!Redirecting...");
        }
      })
      .catch(error => {
        newToast("bg-danger", "Verification failed. Error: " + error.message);
      });
    }
    setOtpValidated(true);
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

  const newToast = (variant, message) => {
    setToastVariant(variant);
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <div className="main-container">
      <div className="container p-3" id="div-content">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 container border rounded shadow-lg" id="card-form">
          <div className="row d-flex">
            <div className="py-5 col-12">
              <div>
                <h1 className="text-center">REGISTER</h1>
              </div>
              <form className="container needs-validation" noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                <div className="row m-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="invalid-feedback">Please enter a Name.</div>
                  <div className="valid-feedback">Valid name</div>
                </div>
                <div className="row m-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    minLength="10"
                    maxLength="10"
                    placeholder="Enter phone number"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid phone number in the format
                    [xxxxxxxxxx] with no country code.
                  </div>
                  <div className="valid-feedback">Valid Phone</div>
                </div>
                <div className="row m-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email.
                  </div>
                  <div className="valid-feedback">Valid Email</div>
                </div>
                <div className="row m-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      minLength="8"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="input-group-text rounded-end"
                      id="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      <i className="bi bi-eye-slash" id="toggle-password-icon"></i>
                    </span>
                    <div className="invalid-feedback">
                      Please enter a valid password of min length 8.
                    </div>
                    <div className="valid-feedback">Valid password</div>
                  </div>
                </div>

                <div className="row m-3 d-flex justify-content-center" id="register-btn">
                  <button type="submit" className="btn btn-dark w-50 fs-5">
                    Register
                  </button>
                </div>
                <div className="row m-3 text-center align-center">
                  <p className="m-0">Already Registered? 
                    <br></br>
                    <Link to="/login" className="text-decoration-none">
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
              <div className={`row m-3 ${isOTPDIVVisible ? '' : 'd-none'}`}>
                  <div className="row">
                    <h5>OTP Verification</h5>
                    <form className="container needs-validation" noValidate validated={otpValidated.toString()} onSubmit={handleVerification}>
                      <label htmlFor="otp" className="form-label">OTP:</label>
                      <input type="text" className="form-control" id="otp" placeholder="Enter the otp" required value={otp} onChange={(e) => setOtp(e.target.value)}/>
                      <div className="row m-3 d-flex justify-content-center" id="register-btn">
                        <button type="submit" className="btn btn-dark w-50 fs-5"> Verify </button>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header className={toastVariant}>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
    </div>
  );
}

export default RegisterComponent;