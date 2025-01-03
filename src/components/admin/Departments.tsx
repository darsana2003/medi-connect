'use client'

import { useState } from 'react'
import Image from 'next/image'
import DepartmentDetails from './DepartmentDetails'
import DepartmentEdit from './DepartmentEdit'

type Staff = {
  id: string
  name: string
  role: string
  photo: string
  specialization?: string
}

type Equipment = {
  name: string
  quantity: number
  status: 'operational' | 'maintenance' | 'out-of-order'
}

type Department = {
  id: string
  name: string
  description: string
  hod: {
    id: string
    name: string
    photo: string
    contact: string
    yearsOfService: number
    specialization: string
  }
  staff: {
    doctors: number
    nurses: number
    support: number
    keyStaff: Staff[]
  }
  patients: {
    current: number
    capacity: number
    bedsAvailable: number
  }
  facilities: {
    equipment: Equipment[]
    specialTreatmentAreas: string[]
    ongoingProjects: string[]
  }
  operationalHours: {
    weekdays: string
    weekends: string
    emergency: '24/7' | 'Limited'
  }
}

export default function Departments() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [departments] = useState<Department[]>([
    {
      id: 'DEPT001',
      name: 'Cardiology',
      description: 'Specialized in diagnosis and treatment of heart diseases',
      hod: {
        id: 'DOC001',
        name: 'Dr. Emily White',
        photo: '/medib.jpg',
        contact: 'emily.white@hospital.com',
        yearsOfService: 12,
        specialization: 'Interventional Cardiology'
      },
      staff: {
        doctors: 15,
        nurses: 30,
        support: 10,
        keyStaff: [
          {
            id: 'DOC002',
            name: 'Dr. John Smith',
            role: 'Senior Cardiologist',
            photo: '/medib.jpg',
            specialization: 'Electrophysiology'
          }
        ]
      },
      patients: {
        current: 45,
        capacity: 60,
        bedsAvailable: 15
      },
      facilities: {
        equipment: [
          { name: 'ECG Machine', quantity: 5, status: 'operational' },
          { name: 'Cardiac Catheterization Lab', quantity: 2, status: 'operational' }
        ],
        specialTreatmentAreas: ['CCU', 'ICCU', 'Catheterization Lab'],
        ongoingProjects: ['Heart Failure Research', 'Preventive Cardiology Program']
      },
      operationalHours: {
        weekdays: '8:00 AM - 8:00 PM',
        weekends: '9:00 AM - 5:00 PM',
        emergency: '24/7'
      }
    },
    {
      id: 'DEPT002',
      name: 'Orthopedics',
      description: 'Specialized in musculoskeletal system treatment',
      hod: {
        id: 'DOC003',
        name: 'Dr. James Wilson',
        photo: '/medib.jpg',
        contact: 'james.wilson@hospital.com',
        yearsOfService: 15,
        specialization: 'Joint Replacement'
      },
      staff: {
        doctors: 12,
        nurses: 25,
        support: 8,
        keyStaff: [
          {
            id: 'DOC004',
            name: 'Dr. Sarah Parker',
            role: 'Senior Orthopedic Surgeon',
            photo: '/medib.jpg',
            specialization: 'Sports Medicine'
          }
        ]
      },
      patients: {
        current: 35,
        capacity: 50,
        bedsAvailable: 15
      },
      facilities: {
        equipment: [
          { name: 'X-Ray Machine', quantity: 3, status: 'operational' },
          { name: 'MRI Scanner', quantity: 1, status: 'operational' }
        ],
        specialTreatmentAreas: ['Joint Replacement Center', 'Sports Medicine Unit'],
        ongoingProjects: ['Advanced Prosthetics Research']
      },
      operationalHours: {
        weekdays: '9:00 AM - 6:00 PM',
        weekends: '9:00 AM - 1:00 PM',
        emergency: '24/7'
      }
    },
    {
      id: 'DEPT003',
      name: 'Pediatrics',
      description: 'Comprehensive care for children and adolescents',
      hod: {
        id: 'DOC005',
        name: 'Dr. Sarah Miller',
        photo: '/medib.jpg',
        contact: 'sarah.miller@hospital.com',
        yearsOfService: 10,
        specialization: 'Pediatric Medicine'
      },
      staff: {
        doctors: 20,
        nurses: 40,
        support: 15,
        keyStaff: [
          {
            id: 'DOC006',
            name: 'Dr. Michael Brown',
            role: 'Pediatric Surgeon',
            photo: '/medib.jpg',
            specialization: 'Pediatric Surgery'
          }
        ]
      },
      patients: {
        current: 30,
        capacity: 45,
        bedsAvailable: 15
      },
      facilities: {
        equipment: [
          { name: 'Infant Incubator', quantity: 10, status: 'operational' },
          { name: 'Pediatric Ventilator', quantity: 5, status: 'operational' }
        ],
        specialTreatmentAreas: ['NICU', 'Pediatric ICU', 'Child Development Center'],
        ongoingProjects: ['Early Intervention Program', 'Pediatric Nutrition Study']
      },
      operationalHours: {
        weekdays: '8:00 AM - 7:00 PM',
        weekends: '9:00 AM - 4:00 PM',
        emergency: '24/7'
      }
    },
    {
      id: 'DEPT004',
      name: 'Neurology',
      description: 'Advanced neurological care and treatment',
      hod: {
        id: 'DOC007',
        name: 'Dr. Robert Brown',
        photo: '/medib.jpg',
        contact: 'robert.brown@hospital.com',
        yearsOfService: 18,
        specialization: 'Neurosurgery'
      },
      staff: {
        doctors: 10,
        nurses: 20,
        support: 8,
        keyStaff: [
          {
            id: 'DOC008',
            name: 'Dr. Lisa Chen',
            role: 'Neurologist',
            photo: '/medib.jpg',
            specialization: 'Stroke Medicine'
          }
        ]
      },
      patients: {
        current: 25,
        capacity: 40,
        bedsAvailable: 15
      },
      facilities: {
        equipment: [
          { name: 'MRI Scanner', quantity: 2, status: 'operational' },
          { name: 'EEG Machine', quantity: 3, status: 'operational' }
        ],
        specialTreatmentAreas: ['Stroke Unit', 'Neuro ICU', 'Brain Mapping Center'],
        ongoingProjects: ['Brain Tumor Research', 'Stroke Prevention Study']
      },
      operationalHours: {
        weekdays: '8:00 AM - 6:00 PM',
        weekends: '9:00 AM - 2:00 PM',
        emergency: '24/7'
      }
    }
  ])

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">Department List</h2>
        <p className="mt-1 text-sm text-gray-500">Complete list of hospital departments</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Head of Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Staff
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patients
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Facilities
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((department) => (
              <tr key={department.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{department.name}</div>
                  <div className="text-sm text-gray-500">{department.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={department.hod.photo}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{department.hod.name}</div>
                      <div className="text-sm text-gray-500">{department.hod.specialization}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {department.staff.doctors + department.staff.nurses + department.staff.support}
                  </div>
                  <div className="text-sm text-gray-500">
                    {`${department.staff.doctors} Doctors, ${department.staff.nurses} Nurses`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {`${department.patients.current}/${department.patients.capacity}`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {`${department.patients.bedsAvailable} Beds Available`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {department.facilities.specialTreatmentAreas.length} Treatment Areas
                  </div>
                  <div className="text-sm text-gray-500">
                    {department.facilities.equipment.length} Equipment
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedDepartment(department)
                      setIsViewModalOpen(true)
                    }}
                    className="text-[#0D6C7E] hover:text-[#0A5A6B] mr-3"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDepartment(department)
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

      {/* Department Details Modal */}
      {isViewModalOpen && selectedDepartment && (
        <DepartmentDetails
          department={selectedDepartment}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {/* Department Edit Modal */}
      {isEditModalOpen && selectedDepartment && (
        <DepartmentEdit
          department={selectedDepartment}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedDepartment) => {
            // Handle save logic here
            setIsEditModalOpen(false)
          }}
        />
      )}
    </div>
  )
} 