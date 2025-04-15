// Save Appointment Data to localStorage
function saveAppointment(patientName, patientEmail, patientPhone, appointmentDate, appointmentTime, doctor) {
  // Get existing appointments or initialize an empty array
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Add new appointment
  appointments.push({
    patientName,
    patientEmail,
    patientPhone,
    appointmentDate,
    appointmentTime,
    doctor,
    status: 'Pending', // Default status for new appointments
  });

  // Save updated appointments to localStorage
  localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Load Patient List from localStorage
function loadPatientList() {
  const patientTableBody = document.getElementById('patientTableBody');
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Clear existing table rows
  patientTableBody.innerHTML = '';

  // Add each appointment to the table
  appointments.forEach((appointment, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${appointment.patientName}</td>
      <td>${appointment.patientEmail}</td>
      <td>${appointment.patientPhone}</td>
      <td>${appointment.appointmentDate}</td>
      <td>${appointment.appointmentTime}</td>
      <td>${appointment.doctor}</td>
      <td data-status="${appointment.status}">${appointment.status}</td>
      <td>
        <button class="btn-accept" onclick="acceptAppointment(${index})">Accept</button>
        <button class="btn-delete" onclick="deleteAppointment(${index})">Delete</button>
      </td>
    `;
    patientTableBody.appendChild(row);
  });
}

// Delete Appointment
function deleteAppointment(index) {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Remove the appointment at the specified index
  appointments.splice(index, 1);

  // Save updated appointments to localStorage
  localStorage.setItem('appointments', JSON.stringify(appointments));

  // Reload the patient list
  loadPatientList();

  // Show success message
  showPopup('Appointment deleted successfully!', 'success');
}

// Accept Appointment
function acceptAppointment(index) {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Update the status of the selected appointment to "Accepted"
  appointments[index].status = 'Accepted';

  // Save updated appointments to localStorage
  localStorage.setItem('appointments', JSON.stringify(appointments));

  // Show success message
  showPopup('Your appointment is accepted successfully!', 'success');

  // Reload the patient list
  loadPatientList();
}

// Appointment Form Submission
document.getElementById('appointmentForm')?.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Get form values
  const patientName = document.getElementById('patientName').value;
  const patientEmail = document.getElementById('patientEmail').value;
  const patientPhone = document.getElementById('patientPhone').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const appointmentTime = document.getElementById('appointmentTime').value;
  const doctor = document.getElementById('doctor').value;

  // Validate form
  if (patientName && patientEmail && patientPhone && appointmentDate && appointmentTime && doctor) {
    // Save appointment to localStorage
    saveAppointment(patientName, patientEmail, patientPhone, appointmentDate, appointmentTime, doctor);

    // Show success message
    showPopup(`Appointment booked successfully with ${doctor} on ${appointmentDate} at ${appointmentTime}.`, 'success');

    // Clear form
    document.getElementById('appointmentForm').reset();
  } else {
    // Show error message
    showPopup('Please fill out all fields.', 'error');
  }
});

// Load Patient List when the page loads
window.addEventListener('load', () => {
  if (window.location.pathname.includes('patient-list.html')) {
    loadPatientList();
  }
});

// Show Pop-up Message
function showPopup(message, type) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popupMessage');

  // Set message and style based on type
  popupMessage.textContent = message;
  popup.className = `popup ${type}`; // Add type class (success or error)

  // Show pop-up
  popup.classList.add('show');

  // Hide pop-up after 3 seconds
  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}