'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'missed';
  date: string;
}

export default function UpdateSchedule() {
  const router = useRouter()
  const [doctorName, setDoctorName] = useState('')
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientId: 'P001',
      patientName: 'Alice Johnson',
      time: '09:00 AM',
      date: '2024-03-20',
      reason: 'Regular Checkup',
      status: 'missed'
    },
    {
      id: '2',
      patientId: 'P002',
      patientName: 'Bob Smith',
      time: '10:30 AM',
      date: '2024-03-20',
      reason: 'Follow-up',
      status: 'upcoming'
    }
  ])

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedDoctorName = localStorage.getItem('doctorName')
    if (!storedDoctorName) {
      router.replace('/doctors/login')
      return
    }
    setDoctorName(storedDoctorName)
  }, [router])

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
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setNewDate(appointment.date)
    setNewTime(appointment.time)
  }

  const handleUpdateSchedule = () => {
    if (!selectedAppointment || !newDate || !newTime) return

    setAppointments(prev => prev.map(apt => {
      if (apt.id === selectedAppointment.id) {
        return {
          ...apt,
          date: newDate,
          time: newTime,
          status: 'upcoming'
        }
      }
      return apt
    }))

    setMessage(`Appointment rescheduled for ${newDate} at ${newTime}`)
    setSelectedAppointment(null)
    setNewDate('')
    setNewTime('')

    setTimeout(() => setMessage(''), 3000)
  }

  const availableTimeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ]

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/medib.jpg"
              alt="MediConnect Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <h1 className="ml-4 text-2xl font-bold text-[#0D6C7E]">Update Schedule</h1>
          </div>
          <button
            onClick={() => router.back()}
            className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E0E0E0] p-6">
          {message && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg">
              <p className="font-medium">{message}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Missed/Cancelled Appointments */}
            <div>
              <h3 className="text-xl font-semibold text-[#0D6C7E] mb-4">Appointments to Reschedule</h3>
              <div className="space-y-4">
                {appointments.filter(apt => apt.status === 'missed' || apt.status === 'cancelled').map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="bg-white rounded-lg border border-[#E0E0E0] p-4 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium text-[#04282E]">{appointment.patientName}</h4>
                      <p className="text-sm text-[#ADADAD]">{appointment.reason}</p>
                      <p className="text-sm text-[#04282E]">
                        Originally scheduled for: {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <button
                        onClick={() => handleReschedule(appointment)}
                        className="px-4 py-2 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#08505D] 
                                 transition-colors duration-200"
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reschedule Form */}
            {selectedAppointment && (
              <div className="mt-8 p-6 bg-[#F8FAFC] rounded-xl border-2 border-[#0D6C7E]">
                <h4 className="text-lg font-semibold text-[#0D6C7E] mb-4">
                  Reschedule Appointment for {selectedAppointment.patientName}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#04282E] mb-2">
                      New Date
                    </label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#04282E] mb-2">
                      New Time
                    </label>
                    <select
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                      required
                    >
                      <option value="">Select Time</option>
                      {availableTimeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="px-6 py-3 border border-[#0D6C7E] text-[#0D6C7E] rounded-lg 
                             hover:bg-[#F8FAFC] transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateSchedule}
                    className="px-6 py-3 bg-[#0D6C7E] text-white rounded-lg 
                             hover:bg-[#08505D] transition-colors duration-200"
                  >
                    Update Schedule
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 