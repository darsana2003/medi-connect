'use client'

import { useState } from 'react'

export default function DoctorEdit({
  doctor,
  onClose,
  onSave
}: {
  doctor: any
  onClose: () => void
  onSave: (doctor: any) => void
}) {
  const [editedDoctor, setEditedDoctor] = useState(doctor)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedDoctor)
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
                  <h3 className="text-xl font-semibold leading-6 text-gray-900">Edit Doctor Profile</h3>
                  <p className="mt-1 text-sm text-gray-500">Update doctor information and settings.</p>
                </div>

                {/* Basic Information */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Basic Information</h4>
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    {/* Add form fields for basic information */}
                  </div>
                </div>

                {/* Professional Information */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Professional Information</h4>
                  {/* Add form fields for professional information */}
                </div>

                {/* Work Schedule */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Work Schedule</h4>
                  {/* Add form fields for work schedule */}
                </div>

                {/* Status */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Status</h4>
                  <select
                    value={editedDoctor.status}
                    onChange={(e) => setEditedDoctor({ ...editedDoctor, status: e.target.value })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#0D6C7E] sm:text-sm sm:leading-6"
                  >
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                    <option value="resigned">Resigned</option>
                    <option value="retired">Retired</option>
                  </select>
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