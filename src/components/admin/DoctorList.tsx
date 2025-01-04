'use client'

import { useState } from 'react'

type Doctor = {
  id: string
  name: string
  specialization: string
  availability: string
  contactInfo: {
    phone: string
    email: string
  }
}

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 'DOC001',
      name: 'Dr. Emily White',
      specialization: 'Cardiology',
      availability: 'Mon-Fri, 9 AM - 5 PM',
      contactInfo: {
        phone: '123-456-7890',
        email: 'emily.white@hospital.com'
      }
    },
    {
      id: 'DOC002',
      name: 'Dr. Michael Brown',
      specialization: 'Neurology',
      availability: 'Mon-Wed, 10 AM - 4 PM',
      contactInfo: {
        phone: '123-456-7891',
        email: 'michael.brown@hospital.com'
      }
    },
    {
      id: 'DOC003',
      name: 'Dr. Sarah Johnson',
      specialization: 'Pediatrics',
      availability: 'Tue-Thu, 8 AM - 3 PM',
      contactInfo: {
        phone: '123-456-7892',
        email: 'sarah.johnson@hospital.com'
      }
    },
    {
      id: 'DOC004',
      name: 'Dr. John Doe',
      specialization: 'Orthopedics',
      availability: 'Mon-Fri, 11 AM - 6 PM',
      contactInfo: {
        phone: '123-456-7893',
        email: 'john.doe@hospital.com'
      }
    }
  ])

  const handleViewProfile = (id: string) => {
    // Logic to view doctor profile
    console.log('Viewing profile for:', id)
  }

  const handleEdit = (id: string) => {
    // Logic to edit doctor information
    console.log('Editing doctor:', id)
  }

  const handleDelete = (id: string) => {
    // Logic to delete doctor
    setDoctors(doctors.filter(doctor => doctor.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Doctor List</h2>

      {/* Table Header */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 text-sm font-medium text-gray-500">
          <div>DOCTOR NAME</div>
          <div>SPECIALIZATION</div>
          <div>AVAILABILITY</div>
          <div>CONTACT INFORMATION</div>
          <div>ACTIONS</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="grid grid-cols-5 gap-4 px-6 py-4 items-center">
            <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
            <div className="text-sm text-gray-500">{doctor.specialization}</div>
            <div className="text-sm text-gray-500">{doctor.availability}</div>
            <div className="text-sm text-gray-500">
              {doctor.contactInfo.phone} <br />
              {doctor.contactInfo.email}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewProfile(doctor.id)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Profile
              </button>
              <button
                onClick={() => handleEdit(doctor.id)}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(doctor.id)}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 