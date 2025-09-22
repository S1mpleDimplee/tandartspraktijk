import React, { useState } from 'react';
import './Timetable.css';
import { getISOWeek, startOfISOWeek, setISOWeek, addDays } from 'date-fns';

const DentisTimetable = () => {
  const [currentWeek, setCurrentWeek] = useState(getISOWeek(new Date()));
  const year = new Date().getFullYear();

  // Get Monday-Friday dates for the current ISO week using date-fns
  const weekDates = Array.from({ length: 5 }, (_, i) => {
    const monday = startOfISOWeek(setISOWeek(new Date(year, 0, 1), currentWeek));
    const date = addDays(monday, i);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  });

  const weekData = {
    days: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'],
    dates: weekDates,
    timeSlots: [
      '8:00 - 8:30',
      '8:30 - 9:00',
      '9:00 - 9:30',
      '9:30 - 10:00',
      '10:00 - 10:30',
      '10:30 - 11:00',
    ],
  };

  const appointments = {
    Maandag: [
      { time: '8:00 - 8:30', patient: 'Dr. Jannes', type: 'Checkup' },
      { time: '8:30 - 9:00', patient: null, type: 'Geen afspraak' },
    ],
    Dinsdag: [{ time: '8:00 - 8:30', patient: 'Dr. Jannes', type: 'Checkup' }],
    Woensdag: [],
    Donderdag: [],
    Vrijdag: [
      { time: '8:00 - 8:30', patient: 'Dr. Jannes', type: 'Checkup' },
      { time: '8:30 - 9:00', patient: 'Dr. Jannes', type: 'Checkup' },
    ],
  };

  const navigateWeek = (direction) => {
    const TOTAL_WEEKS = 52;

    setCurrentWeek((prev) =>
      direction === 'next'
        ? prev === TOTAL_WEEKS
          ? 1
          : prev + 1
        : prev === 1
        ? TOTAL_WEEKS
        : prev - 1
    );
  };

  const getAppointmentForSlot = (day, timeSlot) => {
    const dayApps = appointments[day] || [];
    return dayApps.find((app) => app.time === timeSlot);
  };

  return (
    <div className="rooster-container">
      <div className="rooster-main">
        <div className="schedule-content">
          <div className="week-header">
            <h2>Mijn rooster</h2>
            <div className="week-controls">
              <div className="week-display">Week: {currentWeek}</div>
              <button className="week-nav-btn" onClick={() => navigateWeek('prev')}>
                ←
              </button>
              <button className="week-nav-btn" onClick={() => navigateWeek('next')}>
                →
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            <div className="calendar-header">
              {weekData.days.map((day, index) => (
                <div key={day} className="day-header">
                  <div className="day-name">{day}</div>
                  <div className="day-date">{weekData.dates[index]}</div>
                </div>
              ))}
            </div>

            <div className="time-slots-grid">
              {weekData.timeSlots.map((timeSlot) => (
                <div key={timeSlot} className="time-row">
                  {weekData.days.map((day) => {
                    const appointment = getAppointmentForSlot(day, timeSlot);
                    return (
                      <div key={`${day}-${timeSlot}`} className="time-slot">
                        {appointment ? (
                          <div className="appointment-card">
                            <div className="appointment-time">{appointment.time}</div>
                            <div className="appointment-patient">
                              Patiënt: {appointment.patient}
                            </div>
                            <div className="appointment-type">{appointment.type}</div>
                          </div>
                        ) : (
                          <div className="appointment-time">{timeSlot}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentisTimetable;
