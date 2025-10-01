import React, { useState } from 'react';
import './PatientTreatments.css';
import postCall from '../../../../Calls/calls';

const PatientTreatment = ({ userid }) => {
    const [isOpen, setIsOpen] = useState(true);


    const [treatment, setTreatment] = useState('Nieuwe sok');
    const [note, setNote] = useState('Nieuwe sok vanwege gat in zijn sok');

    const recenteBehandelingen = [
        { id: 1, text: 'Fluoride behandeling', checked: true },
        { id: 2, text: 'Nieuwe sok', checked: true },
        { id: 3, text: 'Gebit vulling', checked: true }
    ];

    if (!isOpen) return null;

    const addTreatment = async () => {
        console.log("Adding treatment:", { userid, treatment, note });
        // Logic to add treatment
        const response = await postCall("addTreatment", { userid, treatment, note });
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                </div>

                <h1 className="modal-title">Recente behandelingen patiënt</h1>

                <div className="modal-content">
                    <div className="recente-behandelingen-box">
                        <h2 className="section-title">Recente behandelingen</h2>
                        <div className="behandelingen-grid">
                            {recenteBehandelingen.map(behandeling => (
                                <div key={behandeling.id} className="behandeling-item">
                                    <div className="checkbox-icon">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span>{behandeling.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="form-group">
                            <label>Behandeling</label>
                            <input
                                type="text"
                                value={treatment}
                                onChange={(e) => setTreatment(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Notitie</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="form-textarea"
                                rows="4"
                            />
                        </div>

                        <button className="btn-toevoegen" onClick={() => addTreatment()}>Behandeling toevoegen</button>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={() => setIsOpen(false)}>
                        Verwijderen
                    </button>
                    <button className="btn-primary">
                        Behandeling Bewerken
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientTreatment;