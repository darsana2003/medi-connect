'use client'

import { useState } from 'react'
import PatientDetails from './PatientDetails'
import PatientEdit from './PatientEdit'

type Patient = {
  id: string
  name: string
  date: string
  department: string
  doctorName: string
  age: number
  gender: string
  contactNumber: string
  email: string
  address: string
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  medicalHistory: {
    conditions: string[]
    allergies: string[]
    medications: string[]
  }
  appointments: {
    id: string
    date: string
    doctorName: string
    department: string
    status: string
    notes?: string
    prescription?: string[]
  }[]
  treatmentPlan: {
    description: string
    startDate: string
    endDate?: string
    goals: string[]
  }
  status: 'admitted' | 'discharged' | 'under_observation' | 'regular'
  notes: {
    date: string
    doctorName: string
    content: string
  }[]
}

export default function Patients() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Sample patient data with extended information
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      date: '2024-01-02',
      department: 'Cardiology',
      doctorName: 'Dr. Emily White',
      age: 45,
      gender: 'Female',
      contactNumber: '+1 234-567-8900',
      email: 'sarah.j@email.com',
      address: '123 Main St, City, State 12345',
      emergencyContact: {
        name: 'John Johnson',
        relation: 'Spouse',
        phone: '+1 234-567-8901'
      },
      medicalHistory: {
        conditions: ['Hypertension', 'Type 2 Diabetes'],
        allergies: ['Penicillin'],
        medications: ['Metformin', 'Lisinopril']
      },
      appointments: [
        {
          id: 'apt1',
          date: '2024-01-02',
          doctorName: 'Dr. Emily White',
          department: 'Cardiology',
          status: 'completed',
          notes: 'Blood pressure stable. Continue current medication.',
          prescription: ['Lisinopril 10mg', 'Aspirin 81mg']
        }
      ],
      treatmentPlan: {
        description: 'Cardiac rehabilitation program',
        startDate: '2024-01-02',
        goals: ['Improve cardiovascular fitness', 'Blood pressure management']
      },
      status: 'regular',
      notes: [
        {
          date: '2024-01-02',
          doctorName: 'Dr. Emily White',
          content: 'Patient showing good progress with current treatment plan.'
        }
      ]
    },
    {
      id: '2',
      name: 'Michael Smith',
      date: '2024-01-02',
      department: 'Orthopedics',
      doctorName: 'Dr. James Wilson',
      age: 35,
      gender: 'Male',
      contactNumber: '+1 234-567-8902',
      email: 'michael.s@email.com',
      address: '456 Oak Ave, City, State 12345',
      emergencyContact: {
        name: 'Emma Smith',
        relation: 'Wife',
        phone: '+1 234-567-8903'
      },
      medicalHistory: {
        conditions: ['Knee Injury', 'Sports-related trauma'],
        allergies: [],
        medications: ['Ibuprofen']
      },
      appointments: [
        {
          id: 'apt2',
          date: '2024-01-02',
          doctorName: 'Dr. James Wilson',
          department: 'Orthopedics',
          status: 'completed',
          notes: 'Physical therapy recommended.',
          prescription: ['Ibuprofen 400mg']
        }
      ],
      treatmentPlan: {
        description: 'Physical therapy and rehabilitation',
        startDate: '2024-01-02',
        goals: ['Restore knee mobility', 'Strengthen supporting muscles']
      },
      status: 'under_observation',
      notes: [
        {
          date: '2024-01-02',
          doctorName: 'Dr. James Wilson',
          content: 'Patient needs regular physical therapy sessions.'
        }
      ]
    },
    {
      id: '3',
      name: 'Emma Davis',
      date: '2024-01-03',
      department: 'Neurology',
      doctorName: 'Dr. Robert Brown',
      age: 52,
      gender: 'Female',
      contactNumber: '+1 234-567-8904',
      email: 'emma.d@email.com',
      address: '789 Pine St, City, State 12345',
      emergencyContact: {
        name: 'David Davis',
        relation: 'Son',
        phone: '+1 234-567-8905'
      },
      medicalHistory: {
        conditions: ['Migraine', 'Anxiety'],
        allergies: ['Sulfa drugs'],
        medications: ['Sumatriptan', 'Propranolol']
      },
      appointments: [
        {
          id: 'apt3',
          date: '2024-01-03',
          doctorName: 'Dr. Robert Brown',
          department: 'Neurology',
          status: 'scheduled',
          notes: 'Follow-up for migraine management.'
        }
      ],
      treatmentPlan: {
        description: 'Migraine management and prevention',
        startDate: '2024-01-03',
        goals: ['Reduce frequency of migraines', 'Identify triggers']
      },
      status: 'regular',
      notes: [
        {
          date: '2024-01-03',
          doctorName: 'Dr. Robert Brown',
          content: 'Patient responding well to preventive medication.'
        }
      ]
    },
    {
      id: '4',
      name: 'William Turner',
      date: '2024-01-03',
      department: 'Pulmonology',
      doctorName: 'Dr. Sarah Miller',
      age: 60,
      gender: 'Male',
      contactNumber: '+1 234-567-8906',
      email: 'william.t@email.com',
      address: '321 Elm St, City, State 12345',
      emergencyContact: {
        name: 'Mary Turner',
        relation: 'Daughter',
        phone: '+1 234-567-8907'
      },
      medicalHistory: {
        conditions: ['COPD', 'Hypertension'],
        allergies: ['Dust', 'Pollen'],
        medications: ['Albuterol', 'Spiriva']
      },
      appointments: [
        {
          id: 'apt4',
          date: '2024-01-03',
          doctorName: 'Dr. Sarah Miller',
          department: 'Pulmonology',
          status: 'scheduled',
          notes: 'Regular check-up for COPD management.'
        }
      ],
      treatmentPlan: {
        description: 'COPD Management Program',
        startDate: '2024-01-03',
        goals: ['Improve breathing capacity', 'Reduce exacerbations']
      },
      status: 'under_observation',
      notes: [
        {
          date: '2024-01-03',
          doctorName: 'Dr. Sarah Miller',
          content: 'Patient needs regular monitoring of lung function.'
        }
      ]
    }
  ])

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsViewModalOpen(true)
  }

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsEditModalOpen(true)
  }

  return (
    <>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Patient List</h2>
          <p className="mt-1 text-sm text-gray-500">Complete list of registered patients</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(patient.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.doctorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewDetails(patient)}
                      className="text-[#0D6C7E] hover:text-[#0A5A6B] mr-3"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => handleEdit(patient)}
                      className="text-[#0D6C7E] hover:text-[#0A5A6B]"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Details Modal */}
      {isViewModalOpen && selectedPatient && (
        <PatientDetails 
          patient={selectedPatient}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {/* Patient Edit Modal */}
      {isEditModalOpen && selectedPatient && (
        <PatientEdit
          patient={selectedPatient}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedPatient) => {
            // Handle save logic here
            setIsEditModalOpen(false)
          }}
        />
      )}
    </>
  )
} 