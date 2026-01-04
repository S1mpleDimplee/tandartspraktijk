import React, { useEffect, useState } from 'react';
import './CreateAppointment.css';
import postCall from '../../../Calls/calls';
import { set } from 'date-fns';
import { useToast } from '../../../toastmessage/toastmessage';

const CreateAppointmentModal = ({ isOpen, loadPatients, onClose, appointmentId, date, selectedStartDate }) => {
  const [formData, setFormData] = useState({
    dentistid: '',
    userid: '',
    date: date || '',
    duration: 30,
    time: selectedStartDate ? { hours: selectedStartDate.hour, minutes: selectedStartDate.minute } : { hours: 8, minutes: 0 },
    treatments: [],
    note: ''
  });
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [selectedUserName, setSelectedUserName] = useState('');

  const [availableTreatments, setAvailableTreatments] = useState([]);

  const [showDentistsDropdown, setShowDentistsDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showTreatmentsDropdown, setShowTreatmentsDropdown] = useState(false);

  const [totalDuration, setTotalDuration] = useState(0);

  const { openToast } = useToast();

  useEffect(() => {
    loadPatients ? fetchAllPatients() : fetchAvailableDentists();
    fetchAvailableTreatments();
    if (appointmentId) {
      fetchAppointmentDetails();
    }
  }, []);

  // Calculate total duration when treatments change
  useEffect(() => {
    const duration = formData.treatments.reduce((sum, treatment) => sum + (treatment.duration || 0), 0);
    setTotalDuration(duration);
  }, [formData.treatments]);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await postCall('getAppointmentData', { appointmentId });

      if (!response?.isSuccess || !response.data?.length) {
        console.error("No appointment found");
        return;
      }

      const appointment = response.data[0];

      // Parse time to { hours, minutes }
      let hours = '10', minutes = '30';
      if (appointment.time) {
        const timeParts = appointment.time.split(':');
        if (timeParts.length >= 2) {
          hours = timeParts[0];
          minutes = timeParts[1];
        }
      }

      setFormData(prev => ({
        ...prev,
        dentistid: appointment.dentistid || '',
        userid: appointment.userid || '',
        date: appointment.date || '',
        time: { hours, minutes },
        treatments: appointment.treatment
          ? [{ id: 1, name: appointment.treatment, duration: appointment.duration }]
          : [],
        note: appointment.note || ''
      }));

      // Set the selected user name for display
      const targetUserId = loadPatients ? appointment.dentistid : appointment.userid;
      const foundUser = loadedUsers.find(u => u.userid === targetUserId);
      if (foundUser) {
        setSelectedUserName(foundUser.name);
      }
    } catch (err) {
      console.error("Failed to fetch appointment details:", err);
    }
  };

  const fetchAvailableTreatments = async () => {
    const response = await postCall('getAllTreatments');
    if (response.isSuccess) {
      setAvailableTreatments(response.data.map(treatment => ({
        id: treatment.id,
        name: treatment.treatment,
        duration: treatment.duration
      })));
    } else {
      console.error('Fout bij het ophalen van behandelingen');
    }
  };

  const fetchAvailableDentists = async () => {
    const response = await postCall('getAllDentists');
    if (response.isSuccess) {
      setLoadedUsers(response.data.map(dentist => ({
        userid: dentist.userid,
        name: dentist.name
      })));
    } else {
      console.error('Fout bij het ophalen van tandartsen');
    }
  };

  const fetchAllPatients = async () => {
    const response = await postCall('getAllPatients');
    if (response.isSuccess) {
      setLoadedUsers(response.data.map(patient => ({
        userid: patient.userid,
        name: patient.firstname + ' ' + patient.lastname
      })));
    } else {
      openToast(response.message);
    }
  };

  const DeleteAppointment = async (appointmentId) => {
    const response = await postCall('deleteAppointment', { appointmentId });
    if (response.isSuccess) {
      openToast(response.message);
      onClose();
    } else {
      openToast(response.message);
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

  const handleUserSelect = (userName, userid) => {
    if (loadPatients) {
      handleInputChange('userid', userid);
    } else {
      handleInputChange('dentistid', userid);
    }
    setSelectedUserName(userName);
    setShowDentistsDropdown(false);
  };

  const addTreatment = (treatment) => {
    setShowTreatmentsDropdown(false);

    setFormData(prev => {
      const alreadyAdded = prev.treatments.find(t => t.name === treatment.name);
      if (alreadyAdded) return prev;

      return {
        ...prev,
        treatments: [
          ...prev.treatments,
          {
            id: prev.treatments.length + 1,
            name: treatment.name,
            duration: treatment.duration
          }
        ]
      };
    });
  };

  const removeTreatment = (id) => {
    setFormData(prev => ({
      ...prev,
      treatments: prev.treatments.filter(t => t.id !== id)
    }));
  };

  const handleSubmit = async () => {
    const loggedInData = JSON.parse(localStorage.getItem('loggedInData'));

    // Determine which IDs to use based on loadPatients
    const submitData = {
      userid: loadPatients ? formData.userid : loggedInData.userid,
      dentistid: loadPatients ? loggedInData.userid : formData.dentistid,
      date: formData.date,
      time: `${formData.time.hours}:${formData.time.minutes}`,
      treatments: formData.treatments.map(t => t.name).join(', '),
      note: formData.note || ''
    };

    const response = await postCall('createAppointment', submitData);

    if (response.isSuccess) {
      openToast(response.message);
      onClose();
    } else {
      openToast(response.message);
    }
  };

  const handleUpdate = async () => {
    const loggedInData = JSON.parse(localStorage.getItem('loggedInData'));

    const updateData = {
      appointmentId: appointmentId,
      userid: loadPatients ? formData.userid : loggedInData.userid,
      dentistid: loadPatients ? loggedInData.userid : formData.dentistid,
      date: formData.date,
      time: `${formData.time.hours}:${formData.time.minutes}`,
      treatments: formData.treatments.map(t => t.name).join(', '),
      note: formData.note || ''
    };

    const response = await postCall('editappointment', updateData);

    if (response.isSuccess) {
      openToast(response.message);
      onClose();
    } else {
      openToast(response.message);
    }
  };

  return (
    <div className="modal-createappointment-overlay">
      <div className="modal-createappointment-container">
        {/* Header */}
        <div className="modal-createappointment-header">
          <h2>{appointmentId ? 'Afspraak bijwerken' : 'Afspraak maken'}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-createappointment-content">
          {/* Left Column */}
          <div className="left-createappointment-column">
            {/* Tandarts/Patient Selection */}
            <div className="form-group-appointments">
              <label>{loadPatients ? 'Patiënt' : 'Tandarts'}</label>
              <div className="dropdown-container">
                <button
                  className="dropdown-btn"
                  onClick={() => {
                    setShowDentistsDropdown(!showDentistsDropdown);
                  }}
                >
                  {selectedUserName || (loadPatients ? 'Selecteer een patiënt' : 'Selecteer uw tandarts')}
                  <span className="dropdown-arrow">∨</span>
                </button>
                {showDentistsDropdown && (
                  <div className="dropdown-menu">
                    {loadedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleUserSelect(user.name, user.userid)}
                      >
                        {user.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group-appointments">
              <label>Behandeling(en)</label>
              <div className="behandeling-container">
                <button
                  className="dropdown-treatments-btn"
                  onClick={() => {
                    setShowTreatmentsDropdown(!showTreatmentsDropdown);
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
                  <div key={treatment.id} className="behandeling-item selected">
                    <span className="behandeling-name">{treatment.name}</span>
                    <button className="remove-btn" onClick={() => removeTreatment(treatment.id)}>×</button>
                  </div>
                ))}

                <div className="behandeling-duration">
                  {/* Verwachte tijdsduur: {totalDuration} minuten */}
                </div>
              </div>
            </div>

            {/* Notitie */}
            <div className="form-group-appointments">
              <label>Notitie (Optioneel)</label>
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className="notitie-textarea"
                placeholder="Voeg een notitie toe..."
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <div className="form-group-appointments">
              <label>Datum</label>
              <div className="dropdown-container">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    const selectedDate = new Date(e.target.value);
                    const day = selectedDate.getDay();
                    if (day === 0 || day === 6) {
                      openToast('Kies een datum tussen maandag en vrijdag.');
                      return;
                    }
                    handleInputChange('date', e.target.value);
                  }}
                  className="date-input"
                />
              </div>
            </div>

            {/* Tijdstip Selection */}
            <div className="form-group-appointments">
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
                <select
                  value={formData.time.minutes}
                  onChange={(e) => handleTimeSelect('minutes', e.target.value)}
                  className="tijd-input tijd-select"
                >
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="modal-createappointment-footer">
              <button className="submit-createappointment-btn" onClick={() => appointmentId ? handleUpdate() : handleSubmit()}>
                {appointmentId ? 'Afspraak bijwerken' : 'Afspraak maken'}
              </button>
              {appointmentId && (
                <button className="submit-createappointment-btn" onClick={() => DeleteAppointment(appointmentId)}>
                  Afspraak afzeggen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentModal;