import React, { useEffect, useState } from 'react';
import './UserPage.css';
import postCall from '../../../../Calls/calls';
import { useToast } from '../../../../toastmessage/toastmessage';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('Enquetes');
  const [userRole, setUserRole] = useState(0);
  const [formData, setFormData] = useState({
    userId: '',
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    woonplaats: '',
    postcode: '',
    straatnaam: '',
    toevoeging: '',
    huisnummer: '',
  });

  const { openToast } = useToast();

  useEffect(() => {
    // Fetch user data from API
    fetchUserData();
  }, []);

  const fetchUserData = async () => {

    const userid = localStorage.getItem('selectedUserId') || null;

    const response = await postCall('fetchalluserdata', userid);
    if (response.isSuccess) {
      setFormData({
        userId: response.data.userid,
        voornaam: response.data.firstname,
        achternaam: response.data.lastname,
        email: response.data.email,
        telefoon: response.data.phonenumber,
        woonplaats: response.data.city,
        postcode: response.data.postalcode,
        straatnaam: response.data.streetname,
        toevoeging: response.data.addition,
        huisnummer: response.data.housenumber
      });
      setUserRole(response.data.role);
    }

    else {
      openToast(response.message);
    };
  }

  const [systemData] = useState({
    afsprakenGehad: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleRoleChange = async (e) => {

    if (userRole === 1 || userRole === "1") {
      const confirmed = window.confirm('Weet je zeker dat je de rol tandarts van de patient wil aanpassen? Alle afspraken met deze tandarts word verwijderd');
      if (!confirmed) {
        return; // Stop the function if the user cancels
      }
    }

    setUserRole(parseInt(e.target.value));

    const response = await postCall('updateuserrole', {
      userid: formData.userId,
      role: e.target.value
    });

    if (response.isSuccess) {
      openToast(response.message)
    } else {
      openToast(response.message, true);
    }
  };

  const handleBijwerken = () => {
    openToast('Profiel bijwerken functionaliteit');
  };

  const handleVerwijderen = () => {
    const confirmed = window.confirm('Weet je zeker dat je dit profiel wilt verwijderen?');
    if (confirmed) {
      openToast('Profiel verwijderen functionaliteit');
    }
  };

  return (
    <div className="user-profile-manager-container">
      {/* Main Content */}
      <div className="profile-manager-main">
        {/* Content Sections */}
        <div className="profile-content-grid">
          {/* Left Section - Personal Data */}
          <div className="personal-data-section">
            <div className="section-header">
              <div className="user-id-display">{formData.userId}</div>

              <div className="action-tabs">
                {/* <button
                  className={`tab-btn ${activeTab === 'Enquetes' ? 'active' : ''}`}
                  onClick={() => handleTabChange('Enquetes')}
                >
                  Enquetes
                </button> */}
                {/* <button
                  className={`tab-btn ${activeTab === 'Afspraken' ? 'active' : ''}`}
                  onClick={() => handleTabChange('Afspraken')}
                >
                  Afspraken
                </button> */}
              </div>

              <div className="profile-actions">
                <button className="action-btn bijwerken-btn" onClick={handleBijwerken}>
                  Bijwerken
                </button>
                {/* <button className="action-btn verwijderen-btn" onClick={handleVerwijderen}>
                  Verwijderen
                </button> */}
              </div>
            </div>
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
                  className="form-input-userpage"
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
                  className="form-input-userpage"
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
                  className="form-input-userpage"
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
                    className="form-input-userpage"
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
                  className="form-input-userpage"
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
                  className="form-input-userpage"
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
                  className="form-input-userpage"
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
                    className="form-input-userpage address-input"
                  />
                  <span className="address-separator">—</span>
                  <input
                    type="text"
                    id="huisnummer"
                    name="huisnummer"
                    value={formData.huisnummer}
                    onChange={handleInputChange}
                    className="form-input-userpage address-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - System Data */}
          <div className="system-data-section">
            <h2>Systeem gegevens</h2>

            <div className="system-grid">
              <div className="system-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={userRole}
                  onChange={handleRoleChange}
                  className="system-select"
                >
                  <option value={0}>Patient</option>
                  <option value={1}>Tandarts</option>
                  <option value={3}>Manager</option>
                </select>
              </div>

              <div className="system-group">
                <label>Afspraken gehad</label>
                <div className="system-display">
                  {systemData.afsprakenGehad}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;