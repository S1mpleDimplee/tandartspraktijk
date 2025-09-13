// Login.js
import React, { useState } from "react";
import "./Login.css";
import image from "../register.png"; // Use same image or replace with login image
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, inputName) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [inputName]: value,
    }));
  };

  const checkLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  return (
    <main className="main-container-login">
      <div className="login-section">
        <div className="image-section-login">
          <img
            src={image}
            alt="Tandarts Login"
            className="image-placeholder-login"
          />
        </div>

        <div className="form-section-login">
          <div className="form-container-login">
            <h2 className="form-title-login">Inloggen</h2>

            <form className="login-form" onSubmit={checkLogin}>
              <div className="form-group-login">
                <input
                  className="form-input-login"
                  placeholder="mijnemailadress@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
                />
                <label className="form-label-login">
                  Voer hier uw bestaande email adress in
                </label>
              </div>

              <div className="form-group-login">
                <input
                  type="password"
                  className="form-input-login"
                  placeholder="EenSterkWachtwoord123"
                  value={formData.password}
                  onChange={(e) => handleChange(e, "password")}
                />
                <label className="form-label-login">
                  Voer hier uw wachtwoord in
                </label>
              </div>

              <button type="submit" className="submit-button-login" onClick={() => Navigate("/dashboard")}>
                Log in
              </button>

              <p
                className="register-link"
                onClick={() => checkLogin()}
              >
                Ik heb nog geen account
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
