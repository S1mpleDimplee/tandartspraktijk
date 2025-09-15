// Login.js
import React, { useState } from "react";
import "./Login.css";
import image from "../register.png";
import { data, Navigate, useNavigate } from "react-router-dom";
import postCall from "../../Calls/calls";

const Login = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("Er is een fout opgetreden tijdens het inloggen. Probeer het later opnieuw.");

  const handleChange = (e, inputName) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [inputName]: value,
    }));
  };

  // const addLoginData = (loggedInData) => {
  //   console.log("Storing login data:", loggedInData);

  //   localStorage.setItem("loggedInData", JSON.stringify(loggedInData));

  //   const getUserData = async () => {
  //     const response = await fetch("http://localhost/tandartspraktijkBackend/Datareceiver/datareceiver.php", {
  //       method: "GET",
  //       body: JSON.stringify({
  //         function: "getUserData",
  //         email: formData.email || "",
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log("Fetched data for login storage:", data);

  //     // Add userID to the loggedInData
  //     const updatedLoggedInData = { ...loggedInData, userID: data.userID || "placeholderUserID" };
  //     localStorage.setItem("loggedInData", JSON.stringify(updatedLoggedInData));
  //   };

  //   getUserData();

  //   // Store login state in localStorage with 30-minute expiry
  //   // const expiryDate = new Date(new Date().getTime() + 30 * 60 * 1000);
  //   // localStorage.setItem("loggedInData", JSON.stringify({ ...loggedInData, expiry: expiryDate }));

  // }

  const checkLogin = async (e) => {
    e.preventDefault();

    const result = await postCall("loginUser", formData);

    if (result.isSuccess) {
      setMessage("U bent succesvol ingelogd!");
      setTimeout(() => {
        Navigate("/dashboard");
      }, 2000);
    } else {
      setMessage("Inloggen mislukt: " + result.message);
    }
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

            {message && (
              <div className={`login-message ${message.includes("succesvol") ? "login-success" : "login-error"}`}>
                {message}
              </div>
            )}

            <div className="login-form" onSubmit={checkLogin}>
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

              <button type="submit" className="submit-button-login" onClick={checkLogin}>
                Log in
              </button>

              <p
                className="register-link"
                onClick={() => Navigate("/registreren")}
              >
                Ik heb nog geen account
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
