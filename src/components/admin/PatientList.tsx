'use client'

import { useState } from 'react'
import PatientDetails from './PatientDetails'

type Patient = {
  id: string
  name: string
  date: string
  department: string
  doctor: string
  age: number
  gender: string
  medicalHistory: string
  contactInfo: string
  appointments: { date: string; doctor: string; medication: string }[]
  treatmentPlan: string
  notes: string
}

export default function PatientList() {
  const [patients] = useState<Patient[]>([
    {
      id: 'PAT001',
      name: 'John Smith',
      date: 'January 4, 2024',
      department: 'Cardiology',
      doctor: 'Dr. Emily White',
      age: 30,
      gender: 'Male',
      medicalHistory: 'No known allergies.',
      contactInfo: '123-456-7890',
      appointments: [
        { date: '2024-01-10', doctor: 'Dr. Emily White', medication: 'Aspirin' },
        { date: '2024-01-15', doctor: 'Dr. Sarah Johnson', medication: 'Ibuprofen' }
      ],
      treatmentPlan: 'Follow-up in 2 weeks.',
      notes: 'Patient is recovering well.'
    },
    {
      id: 'PAT002',
      name: 'Emily Johnson',
      date: 'January 3, 2024',
      department: 'Neurology',
      doctor: 'Dr. Michael Brown',
      age: 25,
      gender: 'Female',
      medicalHistory: 'Allergic to penicillin.',
      contactInfo: '123-456-7890',
      appointments: [
        { date: '2024-01-05', doctor: 'Dr. Michael Brown', medication: 'Ibuprofen' },
        { date: '2024-01-10', doctor: 'Dr. Emily White', medication: 'Aspirin' }
      ],
      treatmentPlan: 'Follow-up in 1 week.',
      notes: 'Patient is improving.'
    },
    {
      id: 'PAT003',
      name: 'Michael Brown',
      date: 'January 2, 2024',
      department: 'Pediatrics',
      doctor: 'Dr. Sarah Johnson',
      age: 10,
      gender: 'Male',
      medicalHistory: 'Asthma, allergies to pollen.',
      contactInfo: '123-456-7890',
      appointments: [
        { date: '2024-01-05', doctor: 'Dr. Sarah Johnson', medication: 'Albuterol' },
        { date: '2024-01-10', doctor: 'Dr. Emily White', medication: 'Aspirin' }
      ],
      treatmentPlan: 'Follow-up in 1 week.',
      notes: 'Patient is doing well.'
    },
    {
      id: 'PAT004',
      name: 'Jessica Taylor',
      date: 'January 1, 2024',
      department: 'Orthopedics',
      doctor: 'Dr. John Doe',
      age: 20,
      gender: 'Female',
      medicalHistory: 'No known allergies.',
      contactInfo: '123-456-7890',
      appointments: [
        { date: '2024-01-05', doctor: 'Dr. John Doe', medication: 'Ibuprofen' },
        { date: '2024-01-10', doctor: 'Dr. Emily White', medication: 'Aspirin' }
      ],
      treatmentPlan: 'Follow-up in 1 week.',
      notes: 'Patient is recovering well.'
    },
    {
      id: 'PAT005',
      name: 'David Wilson',
      date: 'December 31, 2023',
      department: 'General Medicine',
      doctor: 'Dr. Anna Smith',
      age: 40,
      gender: 'Male',
      medicalHistory: 'Hypertension, diabetes.',
      contactInfo: '123-456-7890',
      appointments: [
        { date: '2024-01-05', doctor: 'Dr. Anna Smith', medication: 'Metformin' },
        { date: '2024-01-10', doctor: 'Dr. Emily White', medication: 'Aspirin' }
      ],
      treatmentPlan: 'Follow-up in 1 week.',
      notes: 'Patient is managing well.'
    }
  ])

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const handleViewDetails = (id: string) => {
    const patient = patients.find((p) => p.id === id)
    if (patient) {
      setSelectedPatient(patient)
    }
  }

  const handleCloseDetails = () => {
    setSelectedPatient(null)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Patient List</h2>

      {/* Table Header */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 text-sm font-medium text-gray-500">
          <div>PATIENT NAME</div>
          <div>DATE</div>
          <div>DEPARTMENT</div>
          <div>DOCTOR NAME</div>
          <div>ACTIONS</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {patients.map((patient) => (
          <div key={patient.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center">
            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
            <div className="text-sm text-gray-500">{patient.date}</div>
            <div className="text-sm text-gray-500">{patient.department}</div>
            <div className="text-sm text-gray-500">{patient.doctor}</div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewDetails(patient.id)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <PatientDetails patient={selectedPatient} onClose={handleCloseDetails} />
      )}
    </div>
  )
} 