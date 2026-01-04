import React, { useState, useEffect } from 'react';
import './DashboardTandarts.css';
import postCall from '../../../Calls/calls';

const DashboardTandarts = () => {
  const [currentWeek, setCurrentWeek] = useState(51);

  // format today’s date as dd/MM/yyyy
  const getTodayFormatted = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [selectedDate] = useState(getTodayFormatted());

  // appointment counts for today and tomorrow
  const [appointmentStats, setAppointmentStats] = useState({
    afsprakenTegaanVandaag: 0,
    afsprakenTegaanMorgen: 0
  });

  // fetch appointment counts from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await postCall("checkAppointments", {});
      if (response.isSuccess && response.data) {
        setAppointmentStats({
          afsprakenTegaanVandaag: response.data.today,
          afsprakenTegaanMorgen: response.data.tomorrow
        });
      }
    };
    fetchAppointments();
  }, []);

  // Static week layout for now
  const weekData = {
    days: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'],
    dates: ['27 Dec 2025', '28 Dec 2025', '29 Dec 2025', '30 Dec 2025', '31 Dec 2025'],
    timeSlots: ['8:00 - 8:30', '8:30 - 9:00', '9:00 - 9:30', '9:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00']
  };

  const navigateWeek = (direction) => {
    setCurrentWeek(prev => direction === 'next' ? prev + 1 : prev - 1);
  };

  return (
    <div className="doctor-dashboard-container">
      <div className="doctor-dashboard-main">

        {/* Top Section - Appointment Counts */}
        <div className="appointments-summary">
          <div className="date-badge">{selectedDate}</div>
          <h2>Afspraken</h2>
          <div className="summary-stats">
            <div className="stat-item">
              Vandaag: <span className="stat-number">{appointmentStats.afsprakenTegaanVandaag}</span>
            </div>
            <div className="stat-item">
              Morgen: <span className="stat-number">{appointmentStats.afsprakenTegaanMorgen}</span>
            </div>
          </div>
        </div>

        {/* Week Calendar Section */}
        <div className="schedule-section">
          <div className="schedule-header">
            <h2>Mijn rooster</h2>
            <div className="week-controls">
              <div className="week-display">Week: {currentWeek}</div>
              <button className="week-nav-btn" onClick={() => navigateWeek('prev')}>←</button>
              <button className="week-nav-btn" onClick={() => navigateWeek('next')}>→</button>
            </div>
          </div>

          <div className="calendar-grid">
            {/* Days Header */}
            {/* <div className="calendar-header">
              {weekData.days.map((day, index) => (
                <div key={day} className="day-header">
                  <div className="day-name">{day}</div>
                  <div className="day-date">{weekData.dates[index]}</div>
                </div>
              ))}
            </div> */}

            {/* Time Slots Grid (static for now) */}
            {/* <div className="time-slots-grid">
              {weekData.timeSlots.map((timeSlot) => (
                <div key={timeSlot} className="time-row">
                  {weekData.days.map((day) => (
                    <div key={`${day}-${timeSlot}`} className="time-slot">
                      <div className="no-appointment">
                        <div className="appointment-time">{timeSlot}</div>
                        <div className="no-appointment-text">Geen afspraak</div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div> */}

          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardTandarts;