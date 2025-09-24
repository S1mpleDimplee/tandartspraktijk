import React, { useEffect, useState } from "react";
import "./PatientProfile.css";
import postCall from "../../../Calls/calls";
import InfoCard from "../Dashboard/InfoCard/InfoCard";

const PatientProfile = () => {
  const [formData, setFormData] = useState({
    userid: "",
    firstname: "",
    lastname: "",
    email: "",
    // phonenumber: "",
    city: "",
    postalcode: "",
    streetname: "",
    addition: "",
    housenumber: "",
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
    console.log("Data succesvol opgehaald", result);



    setFormData({
      userid: userid,
      firstname: result.data.firstname || "",
      lastname: result.data.lastname || "",
      email: result.data.email || "",
      phonenumber: result.data.phonenumber || "",
      city: "",
      postalcode: "",
      streetname: "",
      addition: "",
      housenumber: "",
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleBewerken = async () => {
    const result = await postCall("updateUserData", formData);

      alert("Succes", result.message);
    
  };

  return (
    <div className="profile-container">
      <div className="profile-main">
        <div className="form-section">
          <h2>Persoonlijke gegevens</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Voornaam</label>
              <input
                type="text"
                id="voornaam"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Achternaam</label>
              <input
                type="text"
                id="achternaam"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <label>Email adress</label>
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
              <label>Telefoonnummer</label>
              <div className="phone-input">
                <span className="country-code">31+</span>
                <input
                  type="tel"
                  id="telefoon"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Woonplaats</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Postcode</label>
              <input
                type="text"
                id="postcode"
                name="postalcode"
                value={formData.postalcode}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Straatnaam</label>
              <input
                type="text"
                id="straatnaam"
                name="streetname"
                value={formData.streetname}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Toevoeging - Huisnummer</label>
              <div className="address-number-group">
                <input
                  type="text"
                  id="toevoeging"
                  name="addition"
                  value={formData.addition}
                  onChange={handleInputChange}
                  className="form-input address-input"
                />
                <span className="address-separator">—</span>
                <input
                  type="text"
                  id="huisnummer"
                  name="housenumber"
                  value={formData.housenumber}
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

        <InfoCard patientInfo={patientInfo} edit={true} />
      </div>
    </div>
  );
};

export default PatientProfile;
