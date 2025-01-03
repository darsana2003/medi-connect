'use client';
import { useState } from 'react';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    // Sample data - replace with actual API call
    {
      id: '1',
      patientName: 'John Doe',
      date: '2024-03-20',
      time: '10:00',
      type: 'Regular Checkup',
      status: 'scheduled',
      notes: 'First time visit'
    },
    // Add more sample appointments as needed
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  return (
    <div className="p-8 bg-[#F4F4F4] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D6C7E]">Appointments</h1>
        <button 
          onClick={() => {/* Add new appointment logic */}}
          className="bg-[#0D6C7E] text-white px-4 py-2 rounded-md hover:bg-[#0A5A6A] transition-colors"
        >
          New Appointment
        </button>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
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
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.date} {appointment.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' : 
                      appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setSelectedAppointment(appointment)}
                    className="text-[#0D6C7E] hover:text-[#0A5A6A] mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {/* Edit logic */}}
                    className="text-[#0D6C7E] hover:text-[#0A5A6A] mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {/* Cancel logic */}}
                    className="text-red-600 hover:text-red-900"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#0D6C7E]">
                Appointment Details
              </h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Patient Name
                </label>
                <p>{selectedAppointment.patientName}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Date & Time
                </label>
                <p>{selectedAppointment.date} {selectedAppointment.time}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Type
                </label>
                <p>{selectedAppointment.type}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Status
                </label>
                <p className="capitalize">{selectedAppointment.status}</p>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Notes
                </label>
                <p>{selectedAppointment.notes}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {/* Update appointment logic */}}
                className="px-4 py-2 bg-[#0D6C7E] text-white rounded-md hover:bg-[#0A5A6A]"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 