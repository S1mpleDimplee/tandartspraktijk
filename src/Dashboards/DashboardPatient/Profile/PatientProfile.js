import React, { useEffect, useState } from "react";
import "./PatientProfile.css";
import postCall from "../../../Calls/calls";
import InfoCard from "../Dashboard/InfoCard/InfoCard";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    voornaam: "",
    achternaam: "",
    email: "",
    telefoon: "",
    woonplaats: "",
    postcode: "",
    straatnaam: "",
    toevoeging: "",
    huisnummer: "",
  });

  const [patientInfo] = useState({
    tandarts: "Dr Janzen",
    laatsteAfspraak: "-",
    geplandeAfspraken: 0,
    totaleAfsprakenGehad: 0,
    totaleAfspraken: "-",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUserData = async () => {
    const userinfo = localStorage.getItem("loggedInData");
    const userid = JSON.parse(userinfo).userid;

    const result = await postCall("fetchUserData", userid);

    if (result.isSuccess) {

      alert("Data succesvol opgehaald");
      setFormData({
        voornaam: result.data.firstname || "",
        achternaam: result.data.lastname || "",
        email: result.data.email || "",
        telefoon: result.data.phonenumber || "",
        woonplaats: "",
        postcode: "",
        straatnaam: "",
        toevoeging: "",
        huisnummer: "",
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleBewerken = () => {
    alert("Profiel bewerken functionaliteit");
  };

  return (
    <div className="profile-container">
      <div className="profile-main">
        <div className="form-section">
          <h2>Persoonlijke gegevens</h2>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="voornaam">Voornaam</label>
              <input
                type="text"
                id="voornaam"
                name="voornaam"
                value={formData.voornaam}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="achternaam">Achternaam</label>
              <input
                type="text"
                id="achternaam"
                name="achternaam"
                value={formData.achternaam}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="email">Email adress</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefoon">Telefoonnummer</label>
              <div className="phone-input">
                <span className="country-code">31+</span>
                <input
                  type="tel"
                  id="telefoon"
                  name="telefoon"
                  value={formData.telefoon}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="woonplaats">Woonplaats</label>
              <input
                type="text"
                id="woonplaats"
                name="woonplaats"
                value={formData.woonplaats}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="postcode">Postcode</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="straatnaam">Straatnaam</label>
              <input
                type="text"
                id="straatnaam"
                name="straatnaam"
                value={formData.straatnaam}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address-number">Toevoeging - Huisnummer</label>
              <div className="address-number-group">
                <input
                  type="text"
                  id="toevoeging"
                  name="toevoeging"
                  value={formData.toevoeging}
                  onChange={handleInputChange}
                  className="form-input address-input"
                />
                <span className="address-separator">—</span>
                <input
                  type="text"
                  id="huisnummer"
                  name="huisnummer"
                  value={formData.huisnummer}
                  onChange={handleInputChange}
                  className="form-input address-input"
                />
              </div>
            </div>
          </div>

          <button onClick={handleBewerken} className="edit-button">
            Bewerken
          </button>
        </div>

        <InfoCard patientInfo={patientInfo} />
      </div>
    </div>
  );
};

export default PatientProfile;
