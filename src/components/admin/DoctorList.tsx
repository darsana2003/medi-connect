'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DoctorDetails from './DoctorDetails'
import EditDoctor from './EditDoctor'

interface Doctor {
  id: string
  name: string
  employeeId: string
  specialization: string
  department: string
  expertise: string[]
  qualifications: string[]
  experience: number
  previousWorkplaces: string[]
  position: string
  schedule: {
    days: string[]
    timeSlots: string
  }
  contact: {
    email: string
    phone: string
    office: string
  }
  statistics: {
    totalPatients: number
    ongoingPatients: number
    rating: number
  }
  status: 'active' | 'inactive' | 'on-leave'
}

export default function DoctorList() {
  const router = useRouter()
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Emily White',
      employeeId: 'DOC001',
      specialization: 'Cardiology',
      department: 'Cardiology',
      expertise: ['Interventional Cardiology', 'Heart Failure'],
      qualifications: ['MD', 'Ph.D', 'FACC'],
      experience: 12,
      previousWorkplaces: ['Mayo Clinic', 'Cleveland Clinic'],
      position: 'Senior Cardiologist',
      schedule: {
        days: ['Mon', 'Tue', 'Wed', 'Fri'],
        timeSlots: '9:00 AM - 5:00 PM'
      },
      contact: {
        email: 'emily.white@hospital.com',
        phone: '123-456-7890',
        office: 'Room 405, 4th Floor'
      },
      statistics: {
        totalPatients: 1500,
        ongoingPatients: 45,
        rating: 4.8
      },
      status: 'active'
    },
    {
      id: '2',
      name: 'Dr. Michael Brown',
      employeeId: 'DOC002',
      specialization: 'Neurology',
      department: 'Neurology',
      expertise: ['Neurological Surgery', 'Brain Disorders'],
      qualifications: ['MD', 'FAAN'],
      experience: 15,
      previousWorkplaces: ['Johns Hopkins', 'Stanford Medical'],
      position: 'Head of Neurology',
      schedule: {
        days: ['Mon', 'Wed', 'Thu'],
        timeSlots: '10:00 AM - 4:00 PM'
      },
      contact: {
        email: 'michael.brown@hospital.com',
        phone: '123-456-7891',
        office: 'Room 302, 3rd Floor'
      },
      statistics: {
        totalPatients: 1200,
        ongoingPatients: 30,
        rating: 4.9
      },
      status: 'active'
    },
    {
      id: '3',
      name: 'Dr. Sarah Johnson',
      employeeId: 'DOC003',
      specialization: 'Pediatrics',
      department: 'Pediatrics',
      expertise: ['General Pediatrics', 'Pediatric Emergency'],
      qualifications: ['MD', 'FAAP'],
      experience: 8,
      previousWorkplaces: ['Children\'s Hospital', 'City Medical'],
      position: 'Pediatrician',
      schedule: {
        days: ['Tue', 'Wed', 'Thu'],
        timeSlots: '8:00 AM - 3:00 PM'
      },
      contact: {
        email: 'sarah.johnson@hospital.com',
        phone: '123-456-7892',
        office: 'Room 205, 2nd Floor'
      },
      statistics: {
        totalPatients: 2000,
        ongoingPatients: 60,
        rating: 4.7
      },
      status: 'active'
    },
    {
      id: '4',
      name: 'Dr. John Doe',
      employeeId: 'DOC004',
      specialization: 'Orthopedics',
      department: 'Orthopedics',
      expertise: ['Joint Replacement', 'Sports Medicine'],
      qualifications: ['MD', 'FAAOS'],
      experience: 10,
      previousWorkplaces: ['Sports Medicine Center', 'General Hospital'],
      position: 'Senior Orthopedic Surgeon',
      schedule: {
        days: ['Mon', 'Tue', 'Thu', 'Fri'],
        timeSlots: '11:00 AM - 6:00 PM'
      },
      contact: {
        email: 'john.doe@hospital.com',
        phone: '123-456-7893',
        office: 'Room 503, 5th Floor'
      },
      statistics: {
        totalPatients: 1800,
        ongoingPatients: 40,
        rating: 4.6
      },
      status: 'active'
    }
  ]

  const handleView = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsEditing(false)
  }

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsEditing(true)
  }

  const handleDelete = async (doctorId: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      try {
        // API call to delete doctor
        console.log('Deleting doctor:', doctorId)
        // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting doctor:', error)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold">Doctor List</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Specialization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Availability
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact Information
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                      <div className="text-sm text-gray-500">{doctor.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.schedule.timeSlots}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doctor.contact.email}</div>
                  <div className="text-sm text-gray-500">{doctor.contact.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(doctor)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {selectedDoctor && !isEditing && (
        <DoctorDetails
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}

      {/* Edit Modal */}
      {selectedDoctor && isEditing && (
        <EditDoctor
          doctor={selectedDoctor}
          onClose={() => {
            setSelectedDoctor(null)
            setIsEditing(false)
          }}
          onSave={(updatedDoctor) => {
            console.log('Updated doctor:', updatedDoctor)
            // Handle save logic here
            setIsEditing(false)
            setSelectedDoctor(null)
          }}
        />
      )}
    </div>
  )
} 