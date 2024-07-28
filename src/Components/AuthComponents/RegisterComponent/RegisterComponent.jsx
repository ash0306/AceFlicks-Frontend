import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../../../utilities/useFormValidation";

function Register() {
  useFormValidation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
    <>
    <div className="container p-3" id="div-content">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 container border rounded shadow-lg">
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
                <div className="row m-3 text-center d-none">
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>

    </div>
    </>
  );
}

export default Register;