import React, { useEffect, useState } from "react";
import "./DashboardPatient.css";
import InfoCard from "./InfoCard/InfoCard";
import CreateAppointmentModal from "../modals/CreateAppointment";
import postCall from "../../../Calls/calls";

const DashboardPatient = () => {
  const [recentTreatments, setRecentTreatments] = useState([
  ]);

  const [currentServices] = useState([
    "Reguliere controle",
    "Mondhygiëne behandeling",
    "Kaakgewricht therapie",
    "Preventieve zorg",
  ]);

  const [patientInfo] = useState({
    dentist: "Dr Jansen",
    lastAppointment: "-",
    scheduledAppointments: 0,
    totalAppointmentsHad: 0,
    totalAppointments: "-",
  });

  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState(false);

  const handleAppointmentClick = () => {
    setShowCreateAppointmentModal(true);
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    const userid = JSON.parse(localStorage.getItem("loggedInData")).userid;
    const response = await postCall("fetchAllUserData", userid);

    if (response.isSuccess) {
      console.log("User data:", response.data);
      setRecentTreatments(response.data.treatments?.map(treatment => treatment));
    }
  };

  const handleMoreInfoClick = () => {
    window.open(
      "https://www.zorgvoorbeter.nl/thema-s/lichamelijke-verzorging/mondzorg/mondgezondheid-en-algemene-gezondheid/",
      "_blank"
    );
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
                  Uit vorige onderzoek blijkt uw gebit in perfecte staat. Uw
                  tandheelkundige gezondheid is uitstekend en alle behandelingen
                  verlopen volgens planning.
                </p>
                {/* <h4>Huidige diensten</h4>
                <ul className="services-list">
                  {currentServices.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul> */}
              </div>

              {/* Recent Treatments */}
              <div className="treatments-section">
                <h3 className="treatment-title">Recente behandelingen</h3>
                <div className="treatment-list">
                  {recentTreatments.length === 0 ? (
                    <div className="treatment-item">
                      <span>Geen recente behandelingen gevonden.</span>
                    </div>
                  ) : (
                    recentTreatments.map((treatment, index) => (
                      <div className="treatment-item completed" key={index}>
                        <span className="check-icon">✓</span>
                        <span>{treatment.treatment || "Er is een fout opgetreden"}</span>
                      </div>
                    )
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Health Information Card */}
          <div className="card health-card">
            <div className="health-content">
              <div className="health-text">
                <h3>
                  Is mondgezondheid belangrijk voor uw algehele gezondheid?
                </h3>
                <button className="health-button" onClick={handleMoreInfoClick}>
                  Meer informatie
                </button>
              </div>
              <div className="health-image">
                {/* Placeholder for dental health image */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                  }}
                >
                  🦷
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right">
          <InfoCard patientInfo={patientInfo} />

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
      {showCreateAppointmentModal && (
        <CreateAppointmentModal
          onClose={() => setShowCreateAppointmentModal(false)}
        />
      )}
    </main>
  );
};

export default DashboardPatient;
