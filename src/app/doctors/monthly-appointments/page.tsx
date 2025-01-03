'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'missed' | 'rescheduled';
}

export default function MonthlyAppointments() {
  const router = useRouter()
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)) // YYYY-MM format
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    history: Appointment[];
  } | null>(null)

  // Example appointments data
  useEffect(() => {
    // This would be replaced with actual API call
    setAppointments([
      {
        id: '1',
        patientId: 'P001',
        patientName: 'Alice Johnson',
        date: '2024-03-20',
        time: '09:00 AM',
        reason: 'Regular Checkup',
        status: 'upcoming'
      },
      {
        id: '2',
        patientId: 'P001',
        patientName: 'Alice Johnson',
        date: '2024-02-15',
        time: '10:30 AM',
        reason: 'Follow-up',
        status: 'completed'
      },
      {
        id: '3',
        patientId: 'P002',
        patientName: 'Bob Smith',
        date: '2024-03-22',
        time: '11:00 AM',
        reason: 'Consultation',
        status: 'upcoming'
      }
    ])
  }, [selectedMonth])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'missed':
        return 'bg-yellow-100 text-yellow-800'
      case 'rescheduled':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const viewPatientHistory = (patientId: string, patientName: string) => {
    const patientAppointments = appointments.filter(apt => apt.patientId === patientId)
    setSelectedPatient({
      id: patientId,
      name: patientName,
      history: patientAppointments
    })
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative w-[40px] h-[40px] flex-shrink-0">
                <Image
                  src="/medib.png"
                  alt="MediConnect Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold text-[#0D6C7E]">Monthly Appointments</h1>
            </div>
            
            <Link 
              href="/doctors/dashboard"
              className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E0E0E0] p-6">
          {/* Month Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#04282E] mb-2">
              Select Month
            </label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-[#E0E0E0] rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
            />
          </div>

          {/* Appointments List */}
          <div className="space-y-6">
            {appointments
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((appointment) => (
                <div 
                  key={appointment.id}
                  className="bg-white rounded-lg border border-[#E0E0E0] p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#04282E]">{appointment.patientName}</h3>
                      <p className="text-sm text-[#ADADAD]">{appointment.reason}</p>
                      <p className="text-sm text-[#04282E] mt-1">
                        {new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })} at {appointment.time}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <button
                        onClick={() => viewPatientHistory(appointment.patientId, appointment.patientName)}
                        className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
                      >
                        View History
                      </button>
                      <button
                        onClick={() => router.push(`/doctors/patient-records/${appointment.patientId}/visits/${appointment.id}`)}
                        className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            {appointments.length === 0 && (
              <div className="text-center py-8 text-[#ADADAD]">
                No appointments found for this month
              </div>
            )}
          </div>
        </div>

        {/* Patient History Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#0D6C7E]">
                    Appointment History - {selectedPatient.name}
                  </h2>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedPatient.history
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((apt) => (
                      <div
                        key={apt.id}
                        className="border-b border-gray-200 pb-4 last:border-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-[#ADADAD]">{apt.reason}</p>
                            <p className="text-sm text-[#04282E]">
                              {new Date(apt.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })} at {apt.time}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                              {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                            </span>
                            <button
                              onClick={() => {
                                setSelectedPatient(null)
                                router.push(`/doctors/patient-records/${apt.patientId}/visits/${apt.id}`)
                              }}
                              className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 