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

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          New Appointment
        </button>
      </div>

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