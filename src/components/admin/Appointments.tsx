'use client'

import { useState } from 'react'

type Appointment = {
    id: string
    patientName: string
    doctorName: string
    department: string
    date: string
    time: string
    status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
    type: 'regular' | 'follow-up' | 'emergency'
}

export default function Appointments() {
    const [showRequestForm, setShowRequestForm] = useState(false)
    const [patientId, setPatientId] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [temporaryIds] = useState(['PAT001', 'PAT002', 'PAT003']) // Changed to more intuitive IDs

    // Add sample appointments data
    const [appointments] = useState<Appointment[]>([
        {
            id: 'APT001',
            patientName: 'Sarah Johnson',
            doctorName: 'Dr. Emily White',
            department: 'Cardiology',
            date: '2024-01-02',
            time: '09:00 AM',
            status: 'scheduled',
            type: 'regular'
        },
        {
            id: 'APT002',
            patientName: 'Michael Smith',
            doctorName: 'Dr. James Wilson',
            department: 'Orthopedics',
            date: '2024-01-02',
            time: '10:30 AM',
            status: 'completed',
            type: 'follow-up'
        },
        {
            id: 'APT003',
            patientName: 'Emma Davis',
            doctorName: 'Dr. Sarah Miller',
            department: 'Pediatrics',
            date: '2024-01-02',
            time: '02:00 PM',
            status: 'scheduled',
            type: 'emergency'
        }
    ])

    // Add helper functions for status and type colors
    const getStatusColor = (status: Appointment['status']) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-800'
            case 'completed':
                return 'bg-green-100 text-green-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            case 'no-show':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getTypeColor = (type: Appointment['type']) => {
        switch (type) {
            case 'regular':
                return 'bg-green-100 text-green-800'
            case 'follow-up':
                return 'bg-purple-100 text-purple-800'
            case 'emergency':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const handleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setShowConfirmation(true)
        setTimeout(() => {
            setShowConfirmation(false)
            setPatientId('')
            setShowRequestForm(false)
        }, 3000)
    }

    return (
        <div className="space-y-4">
            {/* Request Appointment Modal */}
            {showRequestForm && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowRequestForm(false)}></div>
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-screen items-center justify-center p-4">
                            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Appointment</h3>
                                <form onSubmit={handleRequestSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                                            Patient ID
                                        </label>
                                        <input
                                            type="text"
                                            id="patientId"
                                            value={patientId}
                                            onChange={(e) => setPatientId(e.target.value)}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                                            placeholder="Enter Patient ID"
                                            required
                                        />
                                        <p className="mt-1 text-sm text-gray-500">Example ID: PAT001</p>
                                    </div>

                                    {showConfirmation ? (
                                        <div className="text-green-600 text-center mb-4">
                                            Request has been sent successfully!
                                        </div>
                                    ) : (
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowRequestForm(false)}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 text-sm font-medium text-white bg-[#0D6C7E] rounded-md hover:bg-[#0A5A6B]"
                                            >
                                                Submit Request
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Request Appointment Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => setShowRequestForm(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-[#0D6C7E] rounded-md hover:bg-[#0A5A6B]"
                >
                    Request Appointment
                </button>
            </div>

            {/* Existing Appointments Table */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
                    <p className="mt-1 text-sm text-gray-500">List of all appointments</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Doctor
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Department
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{appointment.doctorName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{appointment.department}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(appointment.date).toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-500">{appointment.time}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(appointment.type)}`}>
                                            {appointment.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-[#0D6C7E] hover:text-[#0A5A6B] mr-3">
                                            View Details
                                        </button>
                                        <button className="text-[#0D6C7E] hover:text-[#0A5A6B] mr-3">
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

