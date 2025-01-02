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
  status: 'upcoming' | 'completed' | 'cancelled';
}

export default function DoctorDashboard() {
  const router = useRouter()
  const [doctorName, setDoctorName] = useState('')
  const [hospitalName, setHospitalName] = useState('')
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientId: 'P001',
      patientName: 'Alice Johnson',
      time: '09:00 AM',
      reason: 'Regular Checkup',
      status: 'upcoming'
    },
    {
      id: '2',
      patientId: 'P002',
      patientName: 'Bob Smith',
      time: '10:30 AM',
      reason: 'Follow-up',
      status: 'upcoming'
    },
    {
      id: '3',
      patientId: 'P003',
      patientName: 'Carol White',
      time: '11:45 AM',
      reason: 'Consultation',
      status: 'upcoming'
    }
  ])

  useEffect(() => {
    const storedDoctorName = localStorage.getItem('doctorName')
    const storedHospitalName = localStorage.getItem('hospitalName')

    if (!storedDoctorName) {
      router.replace('/doctors/login')
      return
    }

    setDoctorName(storedDoctorName)
    setHospitalName(storedHospitalName || '')
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('doctorName')
    localStorage.removeItem('doctorId')
    localStorage.removeItem('hospitalName')
    router.replace('/doctors/login')
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const viewPatientRecords = (patientId: string, patientName: string) => {
    router.push(`/doctors/patient-records/${patientId}?name=${encodeURIComponent(patientName)}`)
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
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
              <div>
                <h1 className="text-2xl font-bold text-[#0D6C7E]">Welcome, Dr. John Doe</h1>
                <p className="text-[#04282E]">City Hospital</p>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/doctors/login')}
              className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E0E0E0] p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0D6C7E]">Welcome back, {doctorName}!</h2>
            <p className="text-[#04282E] mt-2">Today is {getCurrentDate()}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#0D6C7E] mb-4">Today's Appointments</h3>
            <div className="space-y-4">
              {todayAppointments.length > 0 ? (
                todayAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="bg-white rounded-lg border border-[#E0E0E0] p-4 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium text-[#04282E]">{appointment.patientName}</h4>
                      <p className="text-sm text-[#ADADAD]">{appointment.reason}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-[#04282E] font-medium">{appointment.time}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <button
                        onClick={() => viewPatientRecords(appointment.patientId, appointment.patientName)}
                        className="text-[#0D6C7E] hover:text-[#08505D] font-medium flex items-center space-x-1"
                      >
                        <span>View Records</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#ADADAD] text-center py-8">No appointments scheduled for today</p>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              className="p-4 bg-[#0D6C7E] hover:bg-[#08505D] text-white rounded-lg 
                       transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>View All Appointments</span>
            </button>
            <button
              onClick={() => router.push('/doctors/schedule')}
              className="p-4 bg-[#F4A261] hover:bg-[#E76F51] text-white rounded-lg 
                       transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Update Schedule</span>
            </button>
            <button
              className="p-4 bg-[#04282E] hover:bg-[#031D22] text-white rounded-lg 
                       transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Settings</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
} 