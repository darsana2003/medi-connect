'use client'

import { useState } from 'react'
import DepartmentDetails from './DepartmentDetails'
import EditDepartment from './EditDepartment'

interface Department {
  id: string
  name: string
  departmentId: string
  description: string
  headOfDepartment: {
    name: string
    yearsOfService: number
    specialization: string
    contact: {
      email: string
      phone: string
      office: string
    }
  }
  staff: {
    totalDoctors: number
    totalNurses: number
    totalSupportStaff: number
    keyStaffMembers: Array<{
      name: string
      role: string
      specialization: string
    }>
  }
  patientInfo: {
    currentPatients: number
    totalBeds: number
    availableBeds: number
  }
  facilities: {
    equipment: string[]
    specialTreatmentAreas: string[]
    ongoingProjects: string[]
  }
  operationalHours: {
    weekdays: string
    weekends: string
    emergencyContact: string
  }
  performance: {
    successRate: number
    monthlyTurnover: number
    patientFeedback: number
  }
}

export default function DepartmentList() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const departments: Department[] = [
    {
      id: '1',
      name: 'Cardiology',
      departmentId: 'CARD001',
      description: 'Specialized in heart and cardiovascular treatments',
      headOfDepartment: {
        name: 'Dr. Emily White',
        yearsOfService: 15,
        specialization: 'Interventional Cardiology',
        contact: {
          email: 'emily.white@hospital.com',
          phone: '123-456-7890',
          office: 'Room 405'
        }
      },
      staff: {
        totalDoctors: 15,
        totalNurses: 25,
        totalSupportStaff: 10,
        keyStaffMembers: [
          { name: 'Dr. John Smith', role: 'Senior Cardiologist', specialization: 'Heart Surgery' },
          { name: 'Dr. Sarah Lee', role: 'Cardiologist', specialization: 'Heart Failure' }
        ]
      },
      patientInfo: {
        currentPatients: 30,
        totalBeds: 40,
        availableBeds: 10
      },
      facilities: {
        equipment: ['ECG', 'Echocardiogram', 'Stress Test Equipment'],
        specialTreatmentAreas: ['Cardiac ICU', 'Catheterization Lab'],
        ongoingProjects: ['Heart Failure Research', 'Preventive Cardiology Program']
      },
      operationalHours: {
        weekdays: '8:00 AM - 8:00 PM',
        weekends: '9:00 AM - 5:00 PM',
        emergencyContact: '911'
      },
      performance: {
        successRate: 95,
        monthlyTurnover: 150,
        patientFeedback: 4.8
      }
    },
    {
      id: '2',
      name: 'Neurology',
      departmentId: 'NEUR001',
      description: 'Specialized in neurological disorders and brain treatments',
      headOfDepartment: {
        name: 'Dr. Michael Brown',
        yearsOfService: 12,
        specialization: 'Neurological Surgery',
        contact: {
          email: 'michael.brown@hospital.com',
          phone: '123-456-7891',
          office: 'Room 302'
        }
      },
      staff: {
        totalDoctors: 10,
        totalNurses: 20,
        totalSupportStaff: 8,
        keyStaffMembers: [
          { name: 'Dr. Lisa Chen', role: 'Neurologist', specialization: 'Stroke Treatment' },
          { name: 'Dr. James Wilson', role: 'Neurologist', specialization: 'Epilepsy' }
        ]
      },
      patientInfo: {
        currentPatients: 20,
        totalBeds: 30,
        availableBeds: 10
      },
      facilities: {
        equipment: ['MRI', 'CT Scan', 'EEG Machine'],
        specialTreatmentAreas: ['Neuro ICU', 'Stroke Unit'],
        ongoingProjects: ['Brain Mapping Research', 'Epilepsy Treatment Study']
      },
      operationalHours: {
        weekdays: '9:00 AM - 6:00 PM',
        weekends: '9:00 AM - 2:00 PM',
        emergencyContact: '911'
      },
      performance: {
        successRate: 92,
        monthlyTurnover: 100,
        patientFeedback: 4.7
      }
    },
    {
      id: '3',
      name: 'Pediatrics',
      departmentId: 'PED001',
      description: 'Specialized in medical care for children and adolescents',
      headOfDepartment: {
        name: 'Dr. Sarah Johnson',
        yearsOfService: 10,
        specialization: 'Pediatric Medicine',
        contact: {
          email: 'sarah.johnson@hospital.com',
          phone: '123-456-7892',
          office: 'Room 205'
        }
      },
      staff: {
        totalDoctors: 12,
        totalNurses: 30,
        totalSupportStaff: 15,
        keyStaffMembers: [
          { name: 'Dr. Robert Kim', role: 'Pediatrician', specialization: 'Neonatology' },
          { name: 'Dr. Maria Garcia', role: 'Pediatrician', specialization: 'Pediatric Emergency' }
        ]
      },
      patientInfo: {
        currentPatients: 25,
        totalBeds: 35,
        availableBeds: 10
      },
      facilities: {
        equipment: ['Pediatric Ventilators', 'Incubators', 'Phototherapy Units'],
        specialTreatmentAreas: ['NICU', 'Pediatric Emergency'],
        ongoingProjects: ['Childhood Obesity Prevention', 'Vaccination Awareness']
      },
      operationalHours: {
        weekdays: '8:00 AM - 7:00 PM',
        weekends: '9:00 AM - 4:00 PM',
        emergencyContact: '911'
      },
      performance: {
        successRate: 97,
        monthlyTurnover: 200,
        patientFeedback: 4.9
      }
    },
    {
      id: '4',
      name: 'Orthopedics',
      departmentId: 'ORTH001',
      description: 'Specialized in musculoskeletal system and bone treatments',
      headOfDepartment: {
        name: 'Dr. John Doe',
        yearsOfService: 18,
        specialization: 'Orthopedic Surgery',
        contact: {
          email: 'john.doe@hospital.com',
          phone: '123-456-7893',
          office: 'Room 503'
        }
      },
      staff: {
        totalDoctors: 8,
        totalNurses: 15,
        totalSupportStaff: 10,
        keyStaffMembers: [
          { name: 'Dr. David Park', role: 'Orthopedic Surgeon', specialization: 'Joint Replacement' },
          { name: 'Dr. Emma Thompson', role: 'Orthopedic Surgeon', specialization: 'Sports Medicine' }
        ]
      },
      patientInfo: {
        currentPatients: 15,
        totalBeds: 25,
        availableBeds: 10
      },
      facilities: {
        equipment: ['X-Ray', 'MRI', 'Physiotherapy Equipment'],
        specialTreatmentAreas: ['Joint Replacement Center', 'Sports Injury Clinic'],
        ongoingProjects: ['Minimally Invasive Surgery Research', 'Sports Injury Prevention']
      },
      operationalHours: {
        weekdays: '8:30 AM - 6:00 PM',
        weekends: '10:00 AM - 2:00 PM',
        emergencyContact: '911'
      },
      performance: {
        successRate: 94,
        monthlyTurnover: 120,
        patientFeedback: 4.6
      }
    }
  ]

  const handleView = (department: Department) => {
    setSelectedDepartment(department)
    setIsEditing(false)
  }

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department)
    setIsEditing(true)
  }

  const handleDelete = async (departmentId: string) => {
    if (confirm('Are you sure you want to delete this department?')) {
      try {
        // API call to delete department
        console.log('Deleting department:', departmentId)
        // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting department:', error)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold">Department List</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Department Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Head of Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total Staff
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Number of Patients
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Available Facilities
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((department) => (
              <tr key={department.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{department.name}</div>
                  <div className="text-sm text-gray-500">{department.departmentId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {department.headOfDepartment.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {department.staff.totalDoctors + department.staff.totalNurses + department.staff.totalSupportStaff}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {department.patientInfo.currentPatients}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {department.facilities.equipment.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(department)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleEdit(department)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(department.id)}
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
      {selectedDepartment && !isEditing && (
        <DepartmentDetails
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}

      {/* Edit Modal */}
      {selectedDepartment && isEditing && (
        <EditDepartment
          department={selectedDepartment}
          onClose={() => {
            setSelectedDepartment(null)
            setIsEditing(false)
          }}
          onSave={(updatedDepartment) => {
            console.log('Updated department:', updatedDepartment)
            setIsEditing(false)
            setSelectedDepartment(null)
          }}
        />
      )}
    </div>
  )
} 