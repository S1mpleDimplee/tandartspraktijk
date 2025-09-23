import React, { useEffect, useState } from "react";

import "./InfoCard.css";
import postCall from "../../../../Calls/calls";
import { set } from "date-fns";

const InfoCard = ({ patientInfo }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [selectedDentist, setSelectedDentist] = useState("");


  const [doctors, setDoctors] = useState([
  ]);

  useEffect(() => {
    getAllDentists();
    setSelectedDentist(patientInfo.dentist || "");
  }, []);

  const getAllDentists = async () => {
    const response = await postCall("getAllDentists", {});
    if (response.isSuccess) {
      setDoctors(response.data);
      console.log("getAllDentists fetched:", response.data);
    } else {
     console.log(response.message);
    }
  };

  const updateCurrentDentist = async (e) => {
    setSelectedDentist(e.target.value);

    const dentistid = doctors.find(doc => doc.name === e.target.value)?.userid;
    const userid = JSON.parse(localStorage.getItem("loggedInData")).userid;

    const response = await postCall("updateCurrentDentist", {
      dentistid: dentistid,
      userid: userid,
    });

    if (response.isSuccess) {
      alert("Tandarts succesvol bijgewerkt");
    } else {
      alert("Fout bij het bijwerken van de tandarts: " + response.message);
    }
  }

  return (
    <div className="card info-card">
      <h3>Uw Informatie</h3>
      <p className="info-name">
        {selectedDentist ? `Uw tandarts: ${selectedDentist}` : "Selecteer een tandarts"}
      </p>

      <div className="info-dropdown">
        <select
          id="dentist-select"
          value={selectedDentist}
          onChange={updateCurrentDentist }
        >
          <option value="">-- Selecteer een tandarts --</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.name}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>

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
