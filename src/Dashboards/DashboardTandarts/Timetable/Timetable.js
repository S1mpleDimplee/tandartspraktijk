import React, { useState, useEffect, use } from 'react';
import './Timetable.css';
import { getISOWeek, startOfISOWeek, setISOWeek, addDays, lastDayOfISOWeek, getISOWeeksInYear } from 'date-fns';
import postCall from '../../../Calls/calls';
import { useToast } from '../../../toastmessage/toastmessage';
import CreateAppointmentModal from '../../DashboardPatient/modals/CreateAppointment';

const DentisTimetable = () => {
  const today = new Date();
  const [currentWeek, setCurrentWeek] = useState(getISOWeek(today));
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Get Monday-Friday dates for the current ISO week
  const weekDates = Array.from({ length: 5 }, (_, i) => {
    const monday = startOfISOWeek(setISOWeek(new Date(currentYear, 0, 1), currentWeek));
    const date = addDays(monday, i);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  });

  const { openToast } = useToast();

  const [loadPatients, setLoadPatients] = useState(false);

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
      '11:00 - 11:30',
      '11:30 - 12:00',
      '12:00 - 12:30',
      '12:30 - 13:00',
      '13:00 - 13:30',
      '13:30 - 14:00',
      '14:00 - 14:30',
      '14:30 - 15:00',
      '15:00 - 15:30',
    ],
  };

  const [appointments, setAppointments] = useState({});
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  // Helper function to add 30 minutes to a time string
  const addThirtyMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes + 30, 0, 0);
    return date.toTimeString().substring(0, 5);
  };

  const [selectedAppointmentID, setSelectedAppointmentID] = useState(null);

  // Helper function to normalize time format (handle both "9:00" and "09:00")
  const normalizeTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  // Helper function to get day name with proper capitalization
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const dayNames = {
      0: 'Zondag',
      1: 'Maandag',
      2: 'Dinsdag',
      3: 'Woensdag',
      4: 'Donderdag',
      5: 'Vrijdag',
      6: 'Zaterdag'
    };
    return dayNames[date.getDay()];
  };

  // Load appointments on component mount
  useEffect(() => {
    fetchAppointmentsForWeek(currentWeek, currentYear);
  }, []);

  const navigateWeek = (direction) => {
    let newWeek = direction === 'next' ? currentWeek + 1 : currentWeek - 1;
    let newYear = currentYear;
    const totalWeeks = getISOWeeksInYear(new Date(currentYear, 0, 1));

    if (newWeek > totalWeeks) {
      newWeek = 1;
      newYear += 1;
    } else if (newWeek < 1) {
      newYear -= 1;
      newWeek = getISOWeeksInYear(new Date(newYear, 0, 1));
    }

    setCurrentWeek(newWeek);
    setCurrentYear(newYear);
    fetchAppointmentsForWeek(newWeek, newYear);
  };

  const fetchAppointmentsForWeek = async (week, year) => {
    try {
      const loggedInData = JSON.parse(localStorage.getItem('loggedInData'));
      const userid = loggedInData.userid;
      const response = await postCall('getAppointmentsForWeek', { week, year, userid });


      // Transform response data into the appointments structure
      const fetchedAppointments = {};

      if (response.isSuccess && response.data) {
        response.data.forEach((appointment, index) => {
          console.log(`Processing appointment ${index}:`, appointment);

          const appointmentDate = new Date(appointment.date);
          console.log('Appointment Date object:', appointmentDate);

          const dayName = getDayName(appointment.date);
          console.log('Generated day name:', dayName);
          console.log('Is day in weekData.days?', weekData.days.includes(dayName));

          // Only process weekdays that are in our schedule
          if (weekData.days.includes(dayName)) {
            if (!fetchedAppointments[dayName]) {
              fetchedAppointments[dayName] = [];
            }

            const startTime = normalizeTime(appointment.time.substring(0, 5));
            const endTime = normalizeTime(addThirtyMinutes(startTime));
            const timeRange = `${startTime} - ${endTime}`;

            console.log('Original time:', appointment.time);
            console.log('Start time:', startTime);
            console.log('End time:', endTime);
            console.log('Time range:', timeRange);
            console.log('Available time slots:', weekData.timeSlots);
            console.log('Does time slot exist?', weekData.timeSlots.includes(timeRange));

            fetchedAppointments[dayName].push({
              time: timeRange,
              patient: appointment.userid,
              type: appointment.treatment,
              id: appointment.id,
              note: appointment.note
            });
          }
        });
      }

      setAppointments(fetchedAppointments);

    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments({});
    }
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
              <div className="week-display">
                Week: {currentWeek}, {currentYear}
              </div>
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
                      <div key={`${day}-${timeSlot}`} className="time-slot" onClick={() => {
                        if (appointment) {
                          setShowAppointmentModal(true);
                          setLoadPatients(false);
                          setSelectedAppointmentID(appointment.id);
                        }
                        else {
                          openToast(`Geen afspraak gepland op ${day} om ${timeSlot}.`);
                          setSelectedAppointmentID(null);
                          setLoadPatients(true);
                          setShowAppointmentModal(true);
                        }
                      }}>
                        {appointment ? (
                          <div className="appointment-card">
                            <div className="appointment-time">{appointment.time}</div>
                            <div className="appointment-patient">
                              Patiënt: {appointment.patient}
                            </div>
                            <div className="appointment-type">{appointment.type}</div>
                            {appointment.note && (
                              <div className="appointment-note">Note: {appointment.note}</div>
                            )}
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
        {showAppointmentModal && (
          <CreateAppointmentModal isOpen={showAppointmentModal} onClose={() => {
            setShowAppointmentModal(false);
            fetchAppointmentsForWeek(currentWeek, currentYear);
          }}
            loadPatients={loadPatients}
            appointmentId={selectedAppointmentID}
          />
        )}
      </div>
    </div>
  );
};

export default DentisTimetable;