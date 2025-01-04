'use client'

import { useState } from 'react'

export default function Appointments() {
  const [patientId, setPatientId] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the appointment request
    setShowSuccess(true)
    setPatientId('')
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Appointment Request
      </h2>

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-6">
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
            Patient ID
          </label>
          <input
            type="text"
            id="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
            placeholder="Enter patient ID"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0D6C7E] text-white py-2 px-4 rounded-md hover:bg-[#0A5A6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E] transition-colors"
        >
          Submit Request
        </button>
      </form>

      {/* Success Message */}
      {showSuccess && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600">
            Submit request successfully
          </p>
        </div>
      )}
    </div>
  )
} 