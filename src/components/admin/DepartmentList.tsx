'use client'

import { useState } from 'react'

type Department = {
  id: string
  name: string
  hod: string
  totalStaff: number
  numberOfPatients: number
  availableFacilities: string[]
}

export default function DepartmentList() {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 'DEP001',
      name: 'Cardiology',
      hod: 'Dr. Emily White',
      totalStaff: 15,
      numberOfPatients: 30,
      availableFacilities: ['ECG', 'Echocardiogram', 'Stress Test']
    },
    {
      id: 'DEP002',
      name: 'Neurology',
      hod: 'Dr. Michael Brown',
      totalStaff: 10,
      numberOfPatients: 20,
      availableFacilities: ['EEG', 'CT Scan', 'MRI']
    },
    {
      id: 'DEP003',
      name: 'Pediatrics',
      hod: 'Dr. Sarah Johnson',
      totalStaff: 12,
      numberOfPatients: 25,
      availableFacilities: ['Vaccination', 'Pediatric ICU']
    },
    {
      id: 'DEP004',
      name: 'Orthopedics',
      hod: 'Dr. John Doe',
      totalStaff: 8,
      numberOfPatients: 15,
      availableFacilities: ['X-Ray', 'Physiotherapy']
    }
  ])

  const handleViewDetails = (id: string) => {
    // Logic to view department details
    console.log('Viewing details for:', id)
  }

  const handleEdit = (id: string) => {
    // Logic to edit department information
    console.log('Editing department:', id)
  }

  const handleDelete = (id: string) => {
    // Logic to delete department
    setDepartments(departments.filter(department => department.id !== id))
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Department List</h2>

      {/* Table Header */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 text-sm font-medium text-gray-500">
          <div>DEPARTMENT NAME</div>
          <div>HEAD OF DEPARTMENT</div>
          <div>TOTAL STAFF</div>
          <div>NUMBER OF PATIENTS</div>
          <div>AVAILABLE FACILITIES</div>
          <div>ACTIONS</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {departments.map((department) => (
          <div key={department.id} className="grid grid-cols-6 gap-4 px-6 py-4 items-center">
            <div className="text-sm font-medium text-gray-900">{department.name}</div>
            <div className="text-sm text-gray-500">{department.hod}</div>
            <div className="text-sm text-gray-500">{department.totalStaff}</div>
            <div className="text-sm text-gray-500">{department.numberOfPatients}</div>
            <div className="text-sm text-gray-500">{department.availableFacilities.join(', ')}</div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewDetails(department.id)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Details
              </button>
              <button
                onClick={() => handleEdit(department.id)}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(department.id)}
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