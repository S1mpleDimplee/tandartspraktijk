import React, { useState } from 'react';
import "./Registration.css";
import image from "../register.png";
import { useNavigate } from 'react-router-dom';

const TandartsRegistratie = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Call the PHP API with the addUser function
      const response = await fetch('http://localhost/tandartspraktijk/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          function: 'addUser',
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Show success message (optional)
        alert('Registratie succesvol! U wordt doorgestuurd naar de login pagina.');
        
        // Navigate to login or dashboard
        navigate('/inloggen');
      } else {
        // Show error message
        setErrors({ general: data.message || 'Registratie mislukt' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Er is een fout opgetreden. Probeer het later opnieuw.' });
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
              
              {errors.general && (
                <div style={{
                  color: 'red',
                  marginBottom: '15px',
                  padding: '10px',
                  backgroundColor: '#ffe6e6',
                  borderRadius: '4px'
                }}>
                  {errors.general}
                </div>
              )}
              
              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text"
                    name="name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Bijv. Klaas van den Hof"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">
                    Voer hier uw voor en achternaam is inclusief tussenvoegsel
                  </label>
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <input 
                    type="email"
                    name="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="mijnemailadress@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={(e) => checkEmailAvailability(e.target.value)}
                  />
                  <label className="form-label">Voer hier uw e-mail adress in</label>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <input 
                    type="password"
                    name="password"
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="EenSterkWachtwoord123"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">
                    Voer hier een sterk wachtwoord<br />
                    (Minimaal 8 karakters waarvan 1 hoofdletter en 1 cijfer)
                  </label>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <input 
                    type="password"
                    name="confirmPassword"
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="EenSterkWachtwoord123"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">Herhaal hier uw wachtwoord</label>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Bezig met registreren...' : 'Registreren'}
                </button>

                <p 
                  className="login-link" 
                  onClick={() => navigate("/inloggen")}
                  style={{ cursor: 'pointer' }}
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