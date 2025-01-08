'use client'

import { useState } from 'react'

interface Appointment {
  id: string
  patientName: string
  doctorName: string
  date: string
  time: string
  type: string
  status: 'Scheduled' | 'Completed' | 'Cancelled'
}

interface NewAppointmentForm {
  patientId: string
  isOpen: boolean
}

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'APT001',
      patientName: 'John Smith',
      doctorName: 'Dr. Emily White',
      date: '2024-01-04',
      time: '9:00 AM',
      type: 'Regular Checkup',
      status: 'Scheduled'
    },
    {
      id: 'APT002',
      patientName: 'Sarah Johnson',
      doctorName: 'Dr. Michael Brown',
      date: '2024-01-04',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'Completed'
    },
    {
      id: 'APT003',
      patientName: 'Robert Wilson',
      doctorName: 'Dr. Sarah Johnson',
      date: '2024-01-04',
      time: '2:00 PM',
      type: 'Consultation',
      status: 'Scheduled'
    }
  ])

  const [formState, setFormState] = useState<NewAppointmentForm>({
    patientId: '',
    isOpen: false
  })

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleNewAppointment = () => {
    setFormState({ ...formState, isOpen: true })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to submit the appointment request
    console.log('Submitting appointment request for patient:', formState.patientId)
    
    // Reset form and show success message
    setFormState({ patientId: '', isOpen: false })
    setShowSuccessMessage(true)
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
        <button 
          onClick={handleNewAppointment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Appointment
        </button>
      </div>

      {/* New Appointment Form Modal */}
      {formState.isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">New Appointment Request</h3>
              <button 
                onClick={() => setFormState({ ...formState, isOpen: false })}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Patient ID
                </label>
                <input
                  type="text"
                  value={formState.patientId}
                  onChange={(e) => setFormState({ ...formState, patientId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, isOpen: false })}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          <p>Request submitted successfully!</p>
        </div>
      )}

      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.patientName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{appointment.doctorName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(appointment.date).toLocaleDateString()} {appointment.time}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{appointment.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${appointment.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 