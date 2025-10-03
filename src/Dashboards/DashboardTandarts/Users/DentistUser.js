import React, { use, useEffect, useState } from "react";
import "./DentistUsers.css";
import postCall from "../../../Calls/calls";

const DentistUsers = () => {
  const [currentWeek, setCurrentWeek] = useState(51);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([
    {
      userid: 1,
      name: "Sjonnie van der Boer",
      address: "Boekenstraat 8, 1234AZ Almelo",
      status: "lets",
    },
    {
      userid: 2,
      name: "Coen Bekhuis",
      address: "Reutummerweg 20, 7681KL Tubbergen",
      status: "lets",
    },
    {
      userid: 3,
      name: "Pieter Poet",
      address: "Pieter post straat 12, 3412MV Almelo",
      status: "lets",
    },
    {
      userid: 4,
      name: "Jan biggel",
      address: "Jan biggel straat 12, 3412MV Amsterdam",
      status: "lets",
    },
  ]);

  const [selectedPatient, setSelectedPatient] = useState({
    name: "Jan biggel",
    birthDate: "01/01/2000",
    patientSince: "31/12/2021",
    lastAppointment: "17/03/2025",
  });

  const [treatments] = useState([
    { id: 1, name: "Fluoride behandeling", completed: true },
    { id: 2, name: "Nieuwe sok", completed: true },
    { id: 3, name: "Gebit vulling", completed: true },
  ]);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handlePatientClick = (patient) => {
    // Update selected patient when clicking on a patient in the table
    setSelectedPatient({
      name: patient.name,
      birthDate: "01/01/2000", // You can make this dynamic from patient data
      patientSince: "31/12/2021", // You can make this dynamic from patient data
      lastAppointment: "17/03/2025", // You can make this dynamic from patient data
    });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await postCall("getAllPatients", {});
      if (response.isSuccess && response.data) {
        setPatients(
          response.data.map((patient) => ({
            userid: patient.userid,
            name: patient.firstname + " " + patient.lastname,
            address: patient.streetname
              ? patient.streetname +
                " " +
                patient.housenumber +
                ", " +
                patient.postalcode +
                " " +
                patient.city
              : "-",
            status: patient.status,
          }))
        );
      } else {
        console.error("Fout bij het ophalen van patiënten:", response.message);
        // Keep the demo data if API fails
        console.log("Using demo data instead");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      // Keep the demo data if API fails
      console.log("Using demo data instead");
    }
  };

  const handleLogout = () => {
    alert("Uitgelogd");
  };

  const handleBewerken = () => {
    alert("Bewerken functionaliteit");
  };

  const handleAfspraakInplannen = () => {
    alert("Afspraak inplannen functionaliteit");
  };

  return (
    <div className="dashboard-tandarts-container">
      {/* Main Content */}
      <div className="dashboard-tandarts-main">
        {/* Left Section - Patient Search and List */}
        <div className="left-section">
            <div className="search-form">
              <input
                type="text"
                placeholder="Klantzoeken"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button onClick={handleSearch} className="search-btn">
                Zoeken
              </button>
          </div>

          {/* Patient Table */}
          <div className="patient-table">
            <div className="table-header">
              <span>Naam</span>
              <span>Adress</span>
              <span>Iets</span>
            </div>
            <div className="table-body">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.userid}
                  className={`table-row ${
                    selectedPatient.name === patient.name ? "selected" : ""
                  }`}
                  onClick={() => handlePatientClick(patient)}
                >
                  <span className="patient-name">{patient.name}</span>
                  <span className="patient-address">
                    {patient.address ? patient.address : "-"}
                  </span>
                  <span className="patient-status">{patient.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Patient Details */}
        <div className="right-section">
          {/* Patient Info Card */}
          <div className="patient-info-card">
            <h3>Patiënt info</h3>
            <div className="patient-details">
              <p>
                <strong>Naam:</strong> <span>{selectedPatient.name}</span>
              </p>
              <p>
                <strong>Geboorte datum:</strong>{" "}
                <span>{selectedPatient.birthDate}</span>
              </p>
              <p>
                <strong>Patiënt sinds:</strong>{" "}
                <span>{selectedPatient.patientSince}</span>
              </p>
              <p>
                <strong>Vorige afspraak:</strong>{" "}
                <span>{selectedPatient.lastAppointment}</span>
              </p>
            </div>
          </div>

          {/* Recent Treatments */}
          <div className="treatments-card">
            <h3>Recente behandelingen</h3>
            <div className="treatments-list">
              {treatments.map((treatment) => (
                <div key={treatment.id} className="treatment-item-dentist">
                  <span className="checkmark">✓</span>
                  <span>{treatment.name}</span>
                </div>
              ))}
            </div>
            <button onClick={handleBewerken} className="bewerken-btn">
              Bewerken
            </button>
          </div>

          {/* Next Appointment */}
          <div className="appointment-card">
            <h3>Volgende afspraak</h3>
            <p className="appointment-text">
              Deze patiënt heeft momenteel geen toekomstige afspraken
            </p>
            <button
              onClick={handleAfspraakInplannen}
              className="appointment-btn"
            >
              Afspraak inplannen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistUsers;
