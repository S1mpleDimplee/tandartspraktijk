import React, { useState } from "react";
import "./DashboardPatient.css";

const DashboardPatient = () => {
  const [recentTreatments, setRecentTreatments] = useState([
    "Fluoride behandeling",
    "Gebit vulling",
  ]);

  const [currentServices] = useState([
    "Reguliere controle",
    "Mondhygiëne behandeling",
    "Kaakgewricht therapie",
    "Preventieve zorg"
  ]);

  const [patientInfo] = useState({
    dentist: "Dr Jansen",
    lastAppointment: "-",
    scheduledAppointments: 0,
    totalAppointmentsHad: 0,
    totalAppointments: "-"
  });

  const handleAppointmentClick = () => {
    // Handle appointment booking logic
    console.log("Navigating to appointment booking...");
  };

  const handleMoreInfoClick = () => {
    // Handle more info navigation
    console.log("Navigating to health information...");
  };

  return (
    <main className="dashboard-main">
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="content-left">
          {/* Check-up Status Card */}
          <div className="card status-card">
            <div className="services-treatments-row">
              {/* Current Services */}
              <div className="services-section">
                <h3>Vorige gebit check-up status</h3>
                <p className="status-text">
                  Uit vorige onderzoek blijkt uw gebit in perfecte staat.
                  Uw tandheelkundige gezondheid is uitstekend en alle
                  behandelingen verlopen volgens planning.
                </p>
                <h4>Huidige diensten</h4>
                <ul className="services-list">
                  {currentServices.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>

              {/* Recent Treatments */}
              <div className="treatments-section">
                <h3 className="treatment-title">Recente behandelingen</h3>
                <div className="treatment-list">
                  {recentTreatments.map((treatment, index) => (
                    <div className="treatment-item completed" key={index}>
                      <span className="check-icon">✓</span>
                      <span>{treatment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Health Information Card */}
          <div className="card health-card">
            <div className="health-content">
              <div className="health-text">
                <h3>Is mondgezondheid belangrijk voor uw algehele gezondheid?</h3>
                <button
                  className="health-button"
                  onClick={handleMoreInfoClick}
                >
                  Meer informatie
                </button>
              </div>
              <div className="health-image">
                {/* Placeholder for dental health image */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem'
                }}>
                  🦷
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right">
          {/* Personal Info Card */}
          <div className="card info-card">
            <h3>Uw Informatie</h3>
            <p className="info-name">Uw tandarts: {patientInfo.dentist}</p>

            <div className="info-details">
              <div className="info-item">
                <label>Laatste afspraak:</label>
                <span>{patientInfo.lastAppointment}</span>
              </div>
              <div className="info-item">
                <label>Geplande afspraken:</label>
                <span>{patientInfo.scheduledAppointments}</span>
              </div>
              <div className="info-item">
                <label>Totale afspraken gehad:</label>
                <span>{patientInfo.totalAppointmentsHad}</span>
              </div>
              <div className="info-item">
                <label>Totale afspraken:</label>
                <span>{patientInfo.totalAppointments}</span>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="card appointments-card">
            <h3>Aankomende afspraken</h3>
            <p className="no-appointments">
              U heeft op dit moment geen aankomende afspraken. Plan gemakkelijk
              een afspraak in met de knop hier onder om uw tandheelkundige
              gezondheid optimaal te houden.
            </p>
            <button
              className="appointment-button"
              onClick={handleAppointmentClick}
            >
              Afspraak maken
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPatient;