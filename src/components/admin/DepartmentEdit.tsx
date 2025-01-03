'use client'

import { useState } from 'react'

export default function DepartmentEdit({
  department,
  onClose,
  onSave
}: {
  department: any
  onClose: () => void
  onSave: (department: any) => void
}) {
  const [editedDepartment, setEditedDepartment] = useState(department)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedDepartment)
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold leading-6 text-gray-900">Edit Department</h3>
                  <p className="mt-1 text-sm text-gray-500">Update department information and settings.</p>
                </div>

                {/* Basic Information */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Basic Information</h4>
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Department Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={editedDepartment.name}
                        onChange={(e) => setEditedDepartment({ ...editedDepartment, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0D6C7E] focus:ring-[#0D6C7E] sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Staff Information */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Staff Information</h4>
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="doctors" className="block text-sm font-medium text-gray-700">
                        Number of Doctors
                      </label>
                      <input
                        type="number"
                        id="doctors"
                        value={editedDepartment.staff.doctors}
                        onChange={(e) => setEditedDepartment({
                          ...editedDepartment,
                          staff: { ...editedDepartment.staff, doctors: parseInt(e.target.value) }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0D6C7E] focus:ring-[#0D6C7E] sm:text-sm"
                      />
                    </div>
                    {/* Add similar fields for nurses and support staff */}
                  </div>
                </div>

                {/* Facilities */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Facilities</h4>
                  {/* Add fields for facilities */}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-[#0D6C7E] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0A5A6B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D6C7E]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
} 