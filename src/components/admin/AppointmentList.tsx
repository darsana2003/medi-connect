'use client'

import { useState } from 'react'

const mockAppointments = [
    {
        id: '1',
        patientName: 'John Doe',
        doctorName: 'Dr. Sarah Johnson',
        date: '2023-06-15',
        time: '10:00 AM',
        status: 'Scheduled',
    },
    {
        id: '2',
        patientName: 'Jane Smith',
        doctorName: 'Dr. Michael Brown',
        date: '2023-06-16',
        time: '2:30 PM',
        status: 'Completed',
    },
    {
        id: '3',
        patientName: 'Robert Johnson',
        doctorName: 'Dr. Emily Davis',
        date: '2023-06-17',
        time: '11:15 AM',
        status: 'Cancelled',
    },
]

export default function AppointmentList() {
    const [appointments] = useState(mockAppointments)

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Appointments</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{appointment.patientName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{appointment.doctorName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{appointment.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{appointment.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                        {appointment.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 