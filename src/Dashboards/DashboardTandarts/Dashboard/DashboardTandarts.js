import React, { useState } from 'react';
import './DashboardTandarts.css';

const DashboardTandarts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients] = useState([
    {
      id: 1,
      name: 'Sjonnie van der Boer',
      address: 'Baksteenstraat 8\n1234XJ, Hengelo',
      status: 'Iets'
    },
    {
      id: 2,
      name: 'Coen Bekhuis',
      address: 'Reutummerweg 20\n7651KL, Tubbergen',
      status: 'Iets'
    },
    {
      id: 3,
      name: 'Pieter Post',
      address: 'Pieter post straat 12\n3412MV, Almelo',
      status: 'Iets'
    },
    {
      id: 4,
      name: 'Jan biggel',
      address: 'Jan biggel straat 17\n9412ML, Assenstraat',
      status: 'Iets'
    }
  ]);

  const [selectedPatient] = useState({
    name: 'Jan biggel',
    birthDate: '01/01/2000',
    patientSince: '31/12/2021',
    lastAppointment: '17/03/2025'
  });

  const [treatments] = useState([
    { id: 1, name: 'Fluoride behandeling', completed: true },
    { id: 2, name: 'Nieuwe sok', completed: true },
    { id: 3, name: 'Gebit vulling', completed: true }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality already handled by filteredPatients
  };

  const handleLogout = () => {
    alert('Uitgelogd');
  };

  const handleBewerken = () => {
    alert('Bewerken functionaliteit');
  };

  const handleAfspraakInplannen = () => {
    alert('Afspraak inplannen functionaliteit');
  };

  return (
    <div className="dashboard-tandarts-container">
      {/* Header */}
     

      {/* Main Content */}
      <div className="dashboard-tandarts-main">
        {/* Left Section - Patient Search and List */}
        <div className="left-section">
          <div className="search-section">
            <h2>Hawk tuah informatie</h2>
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
                <div key={patient.id} className="table-row">
                  <span className="patient-name">{patient.name}</span>
                  <span className="patient-address">{patient.address}</span>
                  <span className="patient-status">{patient.status}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Uitloggen
          </button>
        </div>

        {/* Right Section - Patient Details */}
        <div className="right-section">
          {/* Patient Info Card */}
          <div className="patient-info-card">
            <h3>Patiënt info</h3>
            <div className="patient-details">
              <p><strong>Naam:</strong> {selectedPatient.name}</p>
              <p><strong>Geboorte datum:</strong> {selectedPatient.birthDate}</p>
              <p><strong>Patiënt sinds:</strong> {selectedPatient.patientSince}</p>
              <p><strong>Vorige afspraak:</strong> {selectedPatient.lastAppointment}</p>
            </div>
          </div>

          {/* Recent Treatments */}
          <div className="treatments-card">
            <h3>Recente behandelingen</h3>
            <div className="treatments-list">
              {treatments.map((treatment) => (
                <div key={treatment.id} className="treatment-item">
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
            <button onClick={handleAfspraakInplannen} className="appointment-btn">
              Afspraak inplannen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTandarts;