import React, { useEffect, useState } from "react";
import "./PatientTreatments.css";
import postCall from "../../../../Calls/calls";
import { useToast } from "../../../../toastmessage/toastmessage";

const PatientTreatment = ({ userid, onclose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [treatment, setTreatment] = useState("");
  const [note, setNote] = useState("");
  const [selectedTreatmentid, setSelectedTreatmentid] = useState(null);

  const [recenteBehandelingen, setRecenteBehandelingen] = useState([]);
  const [availableTreatments, setAvailableTreatments] = useState([]);

  const { openToast } = useToast();

  useEffect(() => {
    fetchUserTreatments();
    fetchTreatments();
  }, []);

  if (!isOpen) return null;

  const fetchTreatments = async () => {
    const result = await postCall("getalltreatments");
    if (result.isSuccess) {
      setAvailableTreatments(result.data);
    } else {
      openToast(result.message);
    }
  };

  const fetchUserTreatments = async () => {
    try {
      const response = await postCall("fetchalluserdata", userid);
      if (response.isSuccess) {
        setRecenteBehandelingen(response.data.treatments || []);
      } else {
        openToast("Fout bij het ophalen van behandelingen:", response.message);
      }
    } catch (error) {
      openToast("Er is een fout opgetreden:", error);
    }
  };

  const updateTreatment = async () => {
    try {
      const response = await postCall("updateTreatment", {
        id: selectedTreatmentid,
        userid: userid,
        treatment: treatment,
        note: note,
      });
      if (response.isSuccess) {
        setRecenteBehandelingen((prev) =>
          prev.map((item) =>
            item.id === selectedTreatmentid
              ? { ...item, treatment: treatment, note: note }
              : item
          )
        );
        setSelectedTreatmentid(null);
        setTreatment("");
        setNote("");
        openToast(response.message);
      } else {
        openToast("Fout bij het bijwerken van behandeling:", response.message);
      }
    } catch (error) {
      openToast("Er is een fout opgetreden:", error);
    }
  };

  const deleteTreatment = async () => {
    try {
      const response = await postCall("deleteTreatment", {
        id: selectedTreatmentid,
        userid: userid,
      });
      if (response.isSuccess) {
        setRecenteBehandelingen((prev) =>
          prev.filter((item) => item.id !== selectedTreatmentid)
        );
        setSelectedTreatmentid(null);
        setTreatment("");
        setNote("");
        openToast(response.message);
      } else {
        openToast(
          "Fout bij het verwijderen van behandeling:",
          response.message
        );
      }
    } catch (error) {
      openToast("Er is een fout opgetreden:", error);
    }
  };

  const addTreatment = async () => {
    console.log("Adding treatment:", { userid, treatment, note });
    const response = await postCall("addTreatment", {
      userid,
      treatment,
      note,
    });
    if (response.isSuccess) {
      fetchUserTreatments();
      setTreatment("");
      setNote("");
      openToast("Behandeling succesvol toegevoegd!");
    } else {
      openToast(response.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <button
            className="close-btn"
            onClick={() => {
              setIsOpen(false);
              onclose();
            }}
          >
            ×
          </button>
        </div>

        <h1 className="modal-title">Recente behandelingen patiënt</h1>

        <div className="modal-content">
          <div className="recente-behandelingen-box">
            <h2 className="section-title">Recente behandelingen</h2>
            <div className="behandelingen-grid">
              {recenteBehandelingen.map((behandeling) => (
                <div
                  key={behandeling.id}
                  className="behandeling-item-patient"
                  onClick={() => {
                    setTreatment(behandeling.treatment);
                    setNote(behandeling.note);
                    setSelectedTreatmentid(behandeling.id);
                  }}
                >
                  <div className="checkbox-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7 10L9 12L13 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>{behandeling.treatment}</span>
                  <span>{behandeling.treatmentdate}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section-treatments">
            <div className="form-group-treatments">
              <label>Behandeling</label>
              <select
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                type="text"
                className="form-input"
              >
                <option value="">Selecteer een behandeling</option>
                {availableTreatments.map((treatment) => (
                  <option key={treatment.id} value={treatment.treatment}>
                    {treatment.treatment}
                  </option>
                ))}
              </select>

            </div>

            <div className="form-group-treatments">
              <label>Notitie</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="form-textarea"
                rows="4"
              />
            </div>

            {selectedTreatmentid === null ? (
              <button className="btn-toevoegen" onClick={() => addTreatment()}>
                Behandeling toevoegen
              </button>
            ) : (
              <div className="button-group">
                <button
                  className="btn-secondary"
                  onClick={() => deleteTreatment()}
                >
                  Verwijderen
                </button>
                <button
                  className="btn-primary"
                  onClick={() => updateTreatment()}
                >
                  Behandeling Bewerken
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTreatment;
