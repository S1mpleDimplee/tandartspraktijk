import React, { useEffect, useState } from 'react';
import './CreateAppointment.css';
import postCall from '../../../Calls/calls';
import { set } from 'date-fns';

const CreateAppointmentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    dentistid: '',
    userid: '',
    date: '',
    time: { hours: '10', minutes: '30' },
    treatments: [

    ],
    note: ''
  });

  const [datums, setDatums] = useState([
    'Vrijdag 10 september',
    'Maandag 13 september',
    'Dinsdag 14 september',
    'Woensdag 15 september'
  ]);

  const [dentistName, setDentistName] = useState('');

  const [availableDentists, setAvailableDentists] = useState([{
  }]);

  const [availableTreatments, setAvailableTreatments] = useState([{

  }]);

  const [showDentistsDropdown, setShowDentistsDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTreatmentsDropdown, setShowTreatmentsDropdown] = useState(false);

  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    fetchAvailableDentists();
    fetchAvailableTreatments();
  }, []);

  const fetchAvailableTreatments = async () => {
    const response = await postCall('getAllTreatments');
    if (response.isSuccess) {
      setAvailableTreatments(response.data.map(treatment => ({ id: treatment.id, name: treatment.treatment, duration: treatment.duration })));
    } else {
      console.error('Fout bij het ophalen van behandelingen');
    }
  };

  const fetchAvailableDentists = async () => {
    const response = await postCall('getAllDentists');
    if (response.isSuccess) {
      setAvailableDentists(response.data.map(dentist => ({ userid: dentist.userid, name: dentist.name })));
    } else {
      console.error('Fout bij het ophalen van tandartsen');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimeSelect = (type, value) => {
    setFormData(prev => ({
      ...prev,
      time: {
        ...prev.time,
        [type]: value
      }
    }));
  };

  const handleDentistSelect = (dentist, userid) => {
    handleInputChange('dentistid', userid);
    setDentistName(dentist);
    setShowDentistsDropdown(false);
  };

  const handleDateSelect = (date) => {
    handleInputChange('date', date);
    setShowDateDropdown(false);
  };

  const addTreatment = (treatment) => {
    setShowTreatmentsDropdown(false);

    setFormData(prev => {
      const alreadyAdded = prev.treatments.find(t => t.name === treatment);
      if (alreadyAdded) return prev;

      return {
        ...prev,
        treatments: [
          ...prev.treatments,
          {
            id: prev.treatments.length + 1,
            name: treatment.name,
            duration: treatment.duration
          }]
      };
    });
  };

  const removeTreatment = (id) => {
    setFormData(prev => ({
      ...prev,
      treatments: prev.treatments.filter(t => t.id !== id)
    }));
  };
  const handleSubmit = () => {

    const loggedInData = JSON.parse(localStorage.getItem('loggedInData'));

    const response = postCall('createAppointment', {
      userid: loggedInData.userid,
      dentistid: formData.dentistid,
      date: formData.date,
      time: `${formData.time.hours}:${formData.time.minutes}`,
      treatments: formData.treatments.map(t => t.name).join(', '),
      note: formData.note || ''
    });
    if (response.isSuccess) {
      alert('Afspraak succesvol gemaakt!');
      onClose();
    }
    else {
      alert('Fout bij het maken van de afspraak. Probeer het opnieuw.' + response.message);
      return;
    }

    console.log(`Afspraak gemaakt!\nTandarts: ${dentistName}\nDatum: ${formData.date}\nTijd: ${formData.time.hours}:${formData.time.minutes}\nBehandeling: ${formData.treatments}`);
    onClose();
  };


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2>Afspraak maken</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          {/* Left Column */}
          <div className="left-column">
            {/* Tandarts Selection */}
            <div className="form-group">
              <label>Tandarts</label>
              <div className="dropdown-container">
                <button
                  className="dropdown-btn"
                  onClick={() => {
                    setShowDentistsDropdown(!showDentistsDropdown);
                    console.log(availableDentists);
                  }}
                >
                  {dentistName || 'Selecteerd uw tandarts'}
                  <span className="dropdown-arrow">∨</span>
                </button>
                {showDentistsDropdown && (
                  <div className="dropdown-menu">
                    {availableDentists.map((dentist, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleDentistSelect(dentist.name, dentist.userid)}
                      >
                        {dentist.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Behandeling(en)</label>
              <div className="behandeling-container">
                <button
                  className="dropdown-treatments-btn"
                  onClick={() => {
                    setShowTreatmentsDropdown(!showTreatmentsDropdown);
                    console.log(availableTreatments);
                  }}
                >+</button>

                {showTreatmentsDropdown && (
                  <div className="dropdown-menu">
                    {availableTreatments.map((treatment, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => addTreatment(treatment)}
                      >
                        {treatment.name}
                      </div>
                    ))}
                  </div>
                )}

                {formData.treatments.map(treatment => (
                  <> <div className="behandeling-item selected">
                    <span key={treatment.id} className="behandeling-name">{treatment.name}</span>
                    <button className="remove-btn" onClick={() => removeTreatment(treatment.id)}>×</button>
                  </div></>
                ))}


                <div className="behandeling-duration">
                  Verwachte tijdsduur: {totalDuration} minuten
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Datum Selection */}
            <div className="form-group">
              <label>Datum</label>
              <div className="dropdown-container">
                <button
                  className="dropdown-btn"
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                >
                  {formData.date || 'Vrijdag 10 september'}
                  <span className="dropdown-arrow">∨</span>
                </button>
                {showDateDropdown && (
                  <div className="dropdown-menu">
                    {datums.map((datum, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleDateSelect(datum)}
                      >
                        {datum}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tijdstip Selection */}
            <div className="form-group">
              <label>Tijdstip</label>
              <div className="tijd-container">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={formData.time.hours}
                  onChange={(e) => handleTimeSelect('hours', e.target.value)}
                  className="tijd-input"
                />
                <span className="tijd-separator">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={formData.time.minutes}
                  onChange={(e) => handleTimeSelect('minutes', e.target.value)}
                  className="tijd-input"
                />
              </div>
            </div>

            {/* Notitie */}
            <div className="form-group">
              <label>Notitie (Optioneel)</label>
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className="notitie-textarea"
                placeholder="Voeg een notitie toe..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="modal-footer">
          <button className="submit-btn" onClick={handleSubmit}>
            Afspraak maken
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentModal;