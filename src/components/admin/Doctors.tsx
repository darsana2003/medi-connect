'use client'

import { useState } from 'react'
import Image from 'next/image'
import DoctorDetails from './DoctorDetails'
import DoctorEdit from './DoctorEdit'

type Doctor = {
  id: string
  name: string
  photo: string
  employeeId: string
  gender: string
  age: number
  department: string
  subSpecialty?: string
  qualifications: string[]
  experience: number
  previousWorkplaces: string[]
  position: string
  availability: {
    days: string[]
    timeSlots: string[]
  }
  onCall: boolean
  contact: {
    email: string
    phone: string
    office: string
  }
  statistics: {
    totalPatients: number
    activePatients: number
  }
  status: 'active' | 'on_leave' | 'resigned' | 'retired'
}

export default function Doctors() {
  const [doctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Emily White',
      photo: '/medib.jpg',
      employeeId: 'DOC001',
      gender: 'Female',
      age: 38,
      department: 'Cardiology',
      subSpecialty: 'Interventional Cardiology',
      qualifications: ['MD', 'FACC', 'PhD in Cardiovascular Medicine'],
      experience: 12,
      previousWorkplaces: ['City General Hospital', 'Heart Institute'],
      position: 'Senior Cardiologist',
      availability: {
        days: ['Monday', 'Wednesday', 'Friday'],
        timeSlots: ['9:00 AM - 1:00 PM', '2:00 PM - 5:00 PM']
      },
      onCall: true,
      contact: {
        email: 'emily.white@hospital.com',
        phone: '+1 234-567-8900',
        office: 'Room 201, 2nd Floor'
      },
      statistics: {
        totalPatients: 1200,
        activePatients: 45
      },
      status: 'active'
    },
    {
      id: '2',
      name: 'Dr. James Wilson',
      photo: '/medib.jpg',
      employeeId: 'DOC002',
      gender: 'Male',
      age: 42,
      department: 'Orthopedics',
      subSpecialty: 'Sports Medicine',
      qualifications: ['MD', 'FAAOS', 'Fellowship in Sports Medicine'],
      experience: 15,
      previousWorkplaces: ['Sports Medicine Center', 'University Hospital'],
      position: 'Head of Orthopedics',
      availability: {
        days: ['Tuesday', 'Thursday', 'Saturday'],
        timeSlots: ['10:00 AM - 2:00 PM', '3:00 PM - 6:00 PM']
      },
      onCall: false,
      contact: {
        email: 'james.wilson@hospital.com',
        phone: '+1 234-567-8901',
        office: 'Room 302, 3rd Floor'
      },
      statistics: {
        totalPatients: 950,
        activePatients: 38
      },
      status: 'active'
    },
    {
      id: '3',
      name: 'Dr. Sarah Miller',
      photo: '/medib.jpg',
      employeeId: 'DOC003',
      gender: 'Female',
      age: 35,
      department: 'Pediatrics',
      qualifications: ['MD', 'Board Certified in Pediatrics'],
      experience: 8,
      previousWorkplaces: ['Children\'s Hospital', 'Family Care Clinic'],
      position: 'Pediatrician',
      availability: {
        days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
        timeSlots: ['9:00 AM - 3:00 PM']
      },
      onCall: true,
      contact: {
        email: 'sarah.miller@hospital.com',
        phone: '+1 234-567-8902',
        office: 'Room 105, 1st Floor'
      },
      statistics: {
        totalPatients: 800,
        activePatients: 60
      },
      status: 'active'
    },
    {
      id: '4',
      name: 'Dr. Robert Brown',
      photo: '/medib.jpg',
      employeeId: 'DOC004',
      gender: 'Male',
      age: 45,
      department: 'Neurology',
      subSpecialty: 'Neurosurgery',
      qualifications: ['MD', 'PhD', 'Board Certified in Neurosurgery'],
      experience: 18,
      previousWorkplaces: ['Neuroscience Institute', 'Memorial Hospital'],
      position: 'Chief of Neurosurgery',
      availability: {
        days: ['Wednesday', 'Thursday', 'Friday'],
        timeSlots: ['8:00 AM - 2:00 PM', '3:00 PM - 5:00 PM']
      },
      onCall: true,
      contact: {
        email: 'robert.brown@hospital.com',
        phone: '+1 234-567-8903',
        office: 'Room 401, 4th Floor'
      },
      statistics: {
        totalPatients: 650,
        activePatients: 25
      },
      status: 'active'
    }
  ])

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Doctor List</h2>
        <p className="mt-1 text-sm text-gray-500">Complete list of hospital doctors</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Availability
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={doctor.photo}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                      <div className="text-sm text-gray-500">{doctor.employeeId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doctor.department}</div>
                  {doctor.subSpecialty && (
                    <div className="text-sm text-gray-500">{doctor.subSpecialty}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doctor.availability.days.join(', ')}</div>
                  <div className="text-sm text-gray-500">{doctor.availability.timeSlots[0]}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doctor.contact.email}</div>
                  <div className="text-sm text-gray-500">{doctor.contact.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor)
                      setIsViewModalOpen(true)
                    }}
                    className="text-[#0D6C7E] hover:text-[#0A5A6B] mr-3"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor)
                      setIsEditModalOpen(true)
                    }}
                    className="text-[#0D6C7E] hover:text-[#0A5A6B] mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      // Handle delete
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Doctor Details Modal */}
      {isViewModalOpen && selectedDoctor && (
        <DoctorDetails
          doctor={selectedDoctor}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {/* Doctor Edit Modal */}
      {isEditModalOpen && selectedDoctor && (
        <DoctorEdit
          doctor={selectedDoctor}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedDoctor) => {
            // Handle save logic here
            setIsEditModalOpen(false)
          }}
        />
      )}
    </div>
  )
} 