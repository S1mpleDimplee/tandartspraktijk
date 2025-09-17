import React, { useState } from "react";
import "./Registration.css";
import image from "../register.png";
import { useNavigate } from "react-router-dom";
import postCall from "../../Calls/calls";

const TandartsRegistratie = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Simple password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setMessage("Wachtwoorden komen niet overeen");
      return;
    }

    setLoading(true);
    const response = await postCall("addUser", formData);

    if (response.isSuccess  ) {
      setMessage("Registratie succesvol!");
      setTimeout(() => {
        navigate("/inloggen");
      }, 2000);
    } else {
      setLoading(false);
      setMessage("Registratie mislukt: " + response.message);
    }
  };

  return (
    <>
      <main className="main-container-registration">
        <div className="registration-section">
          <div className="image-section">
            <img
              src={image}
              alt="Tandarts Registratie"
              className="image-placeholder"
            />
          </div>

          <div className="form-section-registration">
            <div className="form-container">
              <h2 className="form-title">Maak een account aan</h2>

              {message && (
                <div
                  style={{
                    color: message.includes("succesvol") ? "green" : "red",
                    marginBottom: "15px",
                    textAlign: "center",
                  }}
                >
                  {message}
                </div>
              )}

              <div className="registration-form">
                <div className="form-group ">
                  <div className="name-group">
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      placeholder="Voornaam"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange(e.target.value, "firstName")}
                      required
                    />

                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      placeholder="Achternaam"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange(e.target.value, "lastName")}
                      required
                    />
                  </div>
                  <label className="form-label">
                    Voer hier uw voor en achternaam is inclusief tussenvoegsel
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="mijnemailadress@gmail.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e.target.value, "email")}
                    required
                  />
                  <label className="form-label">
                    Voer hier uw e-mail adress in
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-input"
                    placeholder="EenSterkWachtwoord123"
                    value={formData.password}
                    onChange={(e) => handleInputChange(e.target.value, "password")}
                    required
                  />
                  <label className="form-label">
                    Voer hier een sterk wachtwoord
                    <br />
                    (Minimaal 8 karakters waarvan 1 hoofdletter en 1 cijfer)
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    placeholder="EenSterkWachtwoord123"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange(e.target.value, "confirmPassword")}
                    required
                  />
                  <label className="form-label">
                    Herhaal hier uw wachtwoord
                  </label>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Bezig met registreren..." : "Registreer"}
                </button>

                <p
                  className="login-link"
                  onClick={() => navigate("/inloggen")}
                  style={{ cursor: "pointer" }}
                >
                  Ik heb al een account
                </p>
              </div>
                </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TandartsRegistratie;
