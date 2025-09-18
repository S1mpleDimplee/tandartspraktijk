import React, { useEffect } from "react";

import "./InfoCard.css";

const InfoCard = ({ patientInfo }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
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
  );
};
export default InfoCard;
