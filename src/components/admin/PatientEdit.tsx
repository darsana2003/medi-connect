'use client'

import { useState } from 'react'

export default function PatientEdit({
  patient,
  onClose,
  onSave
}: {
  patient: any
  onClose: () => void
  onSave: (patient: any) => void
}) {
  const [editedPatient, setEditedPatient] = useState(patient)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedPatient)
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
                  <h3 className="text-xl font-semibold leading-6 text-gray-900">Edit Patient Information</h3>
                  <p className="mt-1 text-sm text-gray-500">Update patient details and medical information.</p>
                </div>

                {/* Personal Information */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Personal Information</h4>
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={editedPatient.name}
                        onChange={(e) => setEditedPatient({ ...editedPatient, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0D6C7E] focus:ring-[#0D6C7E] sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={editedPatient.status}
                        onChange={(e) => setEditedPatient({ ...editedPatient, status: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0D6C7E] focus:ring-[#0D6C7E] sm:text-sm"
                      >
                        <option value="regular">Regular</option>
                        <option value="admitted">Admitted</option>
                        <option value="under_observation">Under Observation</option>
                        <option value="discharged">Discharged</option>
                      </select>
                    </div>

                    {/* Add more fields for contact information, department assignment, etc. */}
                  </div>
                </div>

                {/* Appointment Management */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Appointment Management</h4>
                  {/* Add appointment management fields */}
                </div>

                {/* Treatment Updates */}
                <div className="border-b border-gray-900/10 pb-6">
                  <h4 className="text-sm font-semibold leading-6 text-gray-900">Treatment Updates</h4>
                  {/* Add treatment update fields */}
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