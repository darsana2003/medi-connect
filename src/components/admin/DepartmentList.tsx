'use client'

import { useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'

// Mock data for departments
const departmentsData = [
  {
    id: 'D001',
    name: 'Cardiology',
    head: 'Dr. Radha Krishnan',
    totalStaff: 15,
    facilities: 'ECG, Echo, Cath Lab, Stress Test',
    status: 'Active'
  },
  {
    id: 'D002',
    name: 'Neurology',
    head: 'Dr. Pillar S',
    totalStaff: 12,
    facilities: 'EEG, EMG, MRI, CT Scan',
    status: 'Active'
  },
  {
    id: 'D003',
    name: 'Orthopedics',
    head: 'Dr. Manmathan K',
    totalStaff: 14,
    facilities: 'X-Ray, MRI, Physiotherapy, Rehabilitation',
    status: 'Active'
  },
  {
    id: 'D004',
    name: 'Pediatrics',
    head: 'Dr. Aleena Biju',
    totalStaff: 18,
    facilities: 'NICU, Vaccination, Child Development Center',
    status: 'Active'
  },
  {
    id: 'D005',
    name: 'Dermatology',
    head: 'Dr. Thomas T',
    totalStaff: 8,
    facilities: 'Laser Treatment, Skin Biopsy, Phototherapy',
    status: 'Active'
  }
]

export default function DepartmentList() {
  const [departments, setDepartments] = useState(departmentsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewDepartment, setViewDepartment] = useState<any>(null)
  const [editDepartment, setEditDepartment] = useState<any>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [departmentToDelete, setDepartmentToDelete] = useState<string | null>(null)

  // Filter departments based on search term
  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.head.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle view department details
  const handleViewDetails = (department: any) => {
    setViewDepartment(department)
    setShowViewModal(true)
  }

  // Handle edit department
  const handleEdit = (department: any) => {
    setEditDepartment({ ...department })
    setShowEditModal(true)
  }

  // Handle delete confirmation
  const handleDeleteConfirmation = (id: string) => {
    setDepartmentToDelete(id)
    setShowDeleteModal(true)
  }

  // Handle delete department
  const handleDelete = () => {
    if (departmentToDelete) {
      setDepartments(departments.filter(dept => dept.id !== departmentToDelete))
      setShowDeleteModal(false)
      setDepartmentToDelete(null)
      toast.success('Department deleted successfully')
    }
  }

  // Handle save edit
  const handleSaveEdit = () => {
    if (editDepartment) {
      setDepartments(departments.map(dept =>
        dept.id === editDepartment.id ? editDepartment : dept
      ))
      setShowEditModal(false)
      setEditDepartment(null)
      toast.success('Department updated successfully')
    }
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Department Lists</h2>
        <div className="w-1/3">
          <input
            type="text"
            placeholder="Search departments..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Departments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Department</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Head of Department</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total Staff</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Available Facilities</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDepartments.map((department) => (
              <tr key={department.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{department.name}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{department.head}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{department.totalStaff}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <div className="max-w-xs truncate" title={department.facilities}>
                    {department.facilities}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(department)}
                      className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(department)}
                      className="p-1 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200 transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteConfirmation(department.id)}
                      className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Department Modal */}
      {showViewModal && viewDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Department Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Department ID</p>
                <p className="font-medium">{viewDepartment.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department Name</p>
                <p className="font-medium">{viewDepartment.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Head of Department</p>
                <p className="font-medium">{viewDepartment.head}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Staff</p>
                <p className="font-medium">{viewDepartment.totalStaff}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Available Facilities</p>
                <p className="font-medium">{viewDepartment.facilities}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${viewDepartment.status === 'Active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {viewDepartment.status}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Department Modal */}
      {showEditModal && editDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Department</h3>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                <input
                  type="text"
                  value={editDepartment.name}
                  onChange={(e) => setEditDepartment({ ...editDepartment, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department</label>
                <input
                  type="text"
                  value={editDepartment.head}
                  onChange={(e) => setEditDepartment({ ...editDepartment, head: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Staff</label>
                <input
                  type="number"
                  value={editDepartment.totalStaff}
                  onChange={(e) => setEditDepartment({ ...editDepartment, totalStaff: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Facilities</label>
                <textarea
                  value={editDepartment.facilities}
                  onChange={(e) => setEditDepartment({ ...editDepartment, facilities: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editDepartment.status}
                  onChange={(e) => setEditDepartment({ ...editDepartment, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-[#0D6C7E] text-white rounded hover:bg-[#0A5A6B]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this department? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 