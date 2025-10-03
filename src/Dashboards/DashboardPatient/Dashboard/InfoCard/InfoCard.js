import React, { useEffect, useState } from "react";

import "./InfoCard.css";
import postCall from "../../../../Calls/calls";
import { set } from "date-fns";
import { useToast } from "../../../../toastmessage/toastmessage";

const InfoCard = ({ userid, edit = false }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedDentist, setSelectedDentist] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [patientInfo, setPatientInfo] = useState({
    dentist: "",
    lastAppointment: "",
    scheduledAppointments: "",
    totalAppointmentsHad: "",
  });

  const { openToast } = useToast();

  useEffect(() => {
    getAllDentists();
    getCurrentDentist();
    setSelectedDentist(patientInfo.dentist || "");
    getAppointmentsDataPatient();
  }, []);

  const getCurrentDentist = async () => {
    const userid = JSON.parse(localStorage.getItem("loggedInData")).userid;
    const response = await postCall("getCurrentDentist", { userid });
    if (response.isSuccess) {
      setPatientInfo((prev) => ({
        ...prev,
        dentist: response.data?.name || "",
      }));
      setSelectedDentist(response.data?.name || "");
      console.log("getCurrentDentist fetched:", response.data);
    }
  };

  const getAppointmentsDataPatient = async () => {
    const userid = JSON.parse(localStorage.getItem("loggedInData")).userid;
    const response = await postCall("getAppointmentsDataPatient", { userid });
    if (response.isSuccess) {
      console.log("getAppointmentsDataPatient fetched:", response.data);
    } else {
      console.log(response.message);
    }
  };

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

    const dentistid = doctors.find(
      (doc) => doc.name === e.target.value
    )?.userid;
    const userid = JSON.parse(localStorage.getItem("loggedInData")).userid;

    const response = await postCall("updateCurrentDentist", {
      dentistid: dentistid,
      userid: userid,
    });

    if (response.isSuccess) {
      openToast(response.message);
    } else {
      openToast(response.message);
    }
  };

  return (
    <div className="card info-card">
      <h3>Uw Informatie</h3>
      <div className="info-name">
        {selectedDentist
          ? `Uw tandarts: ${selectedDentist}`
          : "Selecteer een tandarts"}

        {edit && (
          <select
            className="dentist-select"
            value={selectedDentist}
            onChange={updateCurrentDentist}
          >
            <option value="">-- Selecteer een tandarts --</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="info-details">
        <div className="info-item">
          <label>Laatste afspraak:</label>
          <span>
            {patientInfo.lastAppointment ? patientInfo.lastAppointment : 0}
          </span>
        </div>

        <div className="info-item">
          <label>Geplande afspraken:</label>
          <span>
            {patientInfo.scheduledAppointments
              ? patientInfo.scheduledAppointments
              : 0}
          </span>
        </div>

        <div className="info-item">
          <label>Totale afspraken gehad:</label>
          <span>
            {patientInfo.totalAppointmentsHad
              ? patientInfo.totalAppointmentsHad
              : 0}
          </span>
        </div>
      </div>
    </div>
  );
};
export default InfoCard;
