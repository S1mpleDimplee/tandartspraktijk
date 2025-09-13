// Dashboard.js
import React, { useState } from "react";
import "./DashboardPatient.css";


const DashboardPatient = () => {

  const [RecentTreatments, setRecentTreatments] = useState([
    "Fluoride behandeling",
    "Gebit vulling",
  ]);

  return (
    <main className="dashboard-main">
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="content-left">
          {/* Check-up Status Card */}
          <div className="card status-card">
            <div
              className="services-treatments-row"
              style={{ display: "flex", gap: "2rem" }}
            >
              {/* Huidige diensten */}
              <div className="services-section">
                <h3>Vorige gebit check-up status</h3>
                <p className="status-text">
                  Uit vorige onderzoek blijkt uw gebit in perfecte staat.
                </p>
                <h4>Huidige diensten</h4>
                <ul className="services-list">
                  <li>Beugel</li>
                  <li>Beugel</li>
                  <li>Beugel</li>
                  <li>Beugel</li>
                </ul>
              </div>
              <div className="treatments-section">
                <h3 className="treatment-title">Recente behandelingen</h3>
                <div className="treatment-list">
                  {RecentTreatments.map((treatment) => (
                    <div className="treatment-item completed" key={treatment}>
                      <span className="check-icon">✓</span>
                      <span>{treatment}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card health-card">
            <div className="health-content">
              <div className="health-text">
                <h3>mondgezondheid belangrijk voor uw algehele gezondheid?</h3>
                <button className="health-button">Meer informatie</button>
              </div>
              <div className="health-image">
                {/* <img src={dentalImage} alt="Dental Health" /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right">
          {/* Personal Info Card */}
          <div className="card info-card">
            <h3>Uw Informatie</h3>
            <p className="info-name">Uw tandarts: Dr Jansen</p>

            <div className="info-details">
              <div className="info-item">
                <label>Laatste afspraak:</label>
                <span>-</span>
              </div>
              <div className="info-item">
                <label>Geplande afspraken:</label>
                <span>0</span>
              </div>
              <div className="info-item">
                <label>Totale afspraken gehad:</label>
                <span>0</span>
              </div>
              <div className="info-item">
                <label>Totale afspraken:</label>
                <span>-</span>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="card appointments-card">
            <h3>Aankomende afspraken</h3>
            <p className="no-appointments">
              U heeft op dit moment geen aankomende afspraken. Plan gemakkelijk
              een afspraak in met de knop hier onder
            </p>
            <button className="appointment-button">Afspraak maken</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPatient;
