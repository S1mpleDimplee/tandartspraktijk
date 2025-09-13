import React, { useState } from "react";
import "./Registration.css";
import image from "../register.png";
import { useNavigate } from "react-router-dom";

const TandartsRegistratie = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "testname",
    email: "test@example.com",
    password: "testPassword123",
    confirmPassword: "testPassword123",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setMessage("Wachtwoorden komen niet overeen");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost/tandartspraktijkBackend/Datareceiver/datareceiver.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            function: "addUser",
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // setMessage("Registratie succesvol! U wordt doorgestuurd...");
        setTimeout(() => {
          navigate("/inloggen");
        }, 2000);
      } else {
        setMessage(data.message || "Registratie mislukt");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Er is een fout opgetreden. Probeer het later opnieuw.");
    } finally {
      setLoading(false);
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
                    padding: "10px",
                    backgroundColor: message.includes("succesvol")
                      ? "#e6ffe6"
                      : "#ffe6e6",
                    borderRadius: "4px",
                    textAlign: "center",
                  }}
                >
                  {message}
                </div>
              )}

              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Bijv. Klaas van den Hof"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                >
                  {loading ? "Bezig met registreren..." : "Registreren"}
                </button>

                <p
                  className="login-link"
                  onClick={() => navigate("/inloggen")}
                  style={{ cursor: "pointer" }}
                >
                  Ik heb al een account
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TandartsRegistratie;
