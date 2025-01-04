'use client'

import { useState } from 'react'

type PatientDetailsProps = {
  patient: {
    id: string
    name: string
    age: number
    gender: string
    medicalHistory: string
    contactInfo: string
    appointments: { date: string; doctor: string; medication: string }[]
    treatmentPlan: string
    notes: string
  }
  onClose: () => void // Function to close the details view
}

export default function PatientDetails({ patient, onClose }: PatientDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPatient, setEditedPatient] = useState(patient)

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedPatient((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Logic to save edited patient info
    console.log('Saving patient info:', editedPatient)
    setIsEditing(false)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Patient Profile</h2>
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedPatient.name}
              onChange={handleChange}
              className="border rounded p-1"
            />
          </div>
          <div className="mb-4">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={editedPatient.age}
              onChange={handleChange}
              className="border rounded p-1"
            />
          </div>
          <div className="mb-4">
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={editedPatient.gender}
              onChange={handleChange}
              className="border rounded p-1"
            />
          </div>
          <div className="mb-4">
            <label>Contact Info:</label>
            <input
              type="text"
              name="contactInfo"
              value={editedPatient.contactInfo}
              onChange={handleChange}
              className="border rounded p-1"
            />
          </div>
          <div className="mb-4">
            <label>Medical History:</label>
            <textarea
              name="medicalHistory"
              value={editedPatient.medicalHistory}
              onChange={handleChange}
              className="border rounded p-1"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Modify Appointments</h3>
          {editedPatient.appointments.map((appointment, index) => (
            <div key={index} className="mb-4">
              <label>Appointment Date:</label>
              <input
                type="date"
                value={appointment.date}
                onChange={(e) => {
                  const newAppointments = [...editedPatient.appointments]
                  newAppointments[index].date = e.target.value
                  setEditedPatient({ ...editedPatient, appointments: newAppointments })
                }}
                className="border rounded p-1"
              />
              <label>Doctor:</label>
              <input
                type="text"
                value={appointment.doctor}
                onChange={(e) => {
                  const newAppointments = [...editedPatient.appointments]
                  newAppointments[index].doctor = e.target.value
                  setEditedPatient({ ...editedPatient, appointments: newAppointments })
                }}
                className="border rounded p-1"
              />
              <label>Medication:</label>
              <input
                type="text"
                value={appointment.medication}
                onChange={(e) => {
                  const newAppointments = [...editedPatient.appointments]
                  newAppointments[index].medication = e.target.value
                  setEditedPatient({ ...editedPatient, appointments: newAppointments })
                }}
                className="border rounded p-1"
              />
            </div>
          ))}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Change Department/Doctor</h3>
          <div className="mb-4">
            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={editedPatient.department}
              onChange={handleChange}
              className="border rounded p-1"
            />
          </div>
          <div className="mb-4">
            <label>Doctor:</label>
            <input
              type="text"
              name="doctor"
              value={editedPatient.doctor}
              onChange={handleChange}
              className="border rounded p-1"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={handleEditToggle}
            className="ml-2 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Contact Info:</strong> {patient.contactInfo}</p>
          <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mb-2">Appointment History</h3>
      <ul className="list-disc pl-5 mb-4">
        {patient.appointments.map((appointment, index) => (
          <li key={index}>
            {appointment.date} - {appointment.doctor} (Medication: {appointment.medication})
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">Treatment Plan</h3>
      <p>{patient.treatmentPlan}</p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">Notes/Observations</h3>
      <p>{patient.notes}</p>

      <button
        onClick={onClose}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Close
      </button>
    </div>
  )
} 