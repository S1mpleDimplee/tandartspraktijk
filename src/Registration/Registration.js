import React, { useState } from 'react';
import "./Registration.css"




const TandartsRegistratie = () => {

  const [email, setEmail] = useState();

  return (
    <>
      <main className="main-container-registration">
        <div className="registration-section">
          <div className="image-section">
            <div className="image-placeholder">
            </div>
          </div>
          
          <div className="form-section-registration">
            <div className="form-container">
              <h2 className="form-title">Maak een account aan</h2>
              
              <form className="registration-form">
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Bijv. Klaas van den Hof"
                  />
                  <label className="form-label">Voer hier uw voor en achternaam is inclusief tussenvoegsel</label>
                </div>

                <div className="form-group">
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="mijnemailadress@gmail.com"
                  />
                  <label className="form-label">Voer hier uw e-mail adress in</label>
                </div>

                <div className="form-group">
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="EenSterkWachtwoord123"
                  />
                  <label className="form-label">Voer hier een sterk wachtwoord<br />(Minimaal 8 karakters waarvan 1 hoofdletter en 1 cijfer)</label>
                </div>

                <div className="form-group">
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="EenSterkWachtwoord123"
                  />
                  <label className="form-label">Herhaal hier uw wachtwoord</label>
                </div>

                <button type="submit" className="submit-button">Registreren</button>
                
                <p className="login-link">Ik heb al een account</p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TandartsRegistratie;