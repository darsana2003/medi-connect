'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

interface DoctorData {
  name: string;
  email: string;
  role: string;
  specialization?: string;
  hospitalName?: string;
  createdAt: string;
  hospitals?: { name: string }[];
}

interface AppointmentData extends Appointment {
  doctorId: string;
  [key: string]: any;
}

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
  const { user, getUserData, logout } = useAuth()
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null)
  const [appointments, setAppointments] = useState<AppointmentData[]>([])

  useEffect(() => {
    if (!user) {
      router.replace('/doctors/login')
      return
    }

    const fetchData = async () => {
      try {
        const userData = await getUserData()
        setDoctorData(userData as DoctorData)

        // Get today's date at midnight
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        // Fetch today's appointments
        const appointmentsQuery = query(
          collection(db, 'appointments'),
          where('doctorId', '==', user.uid),
          where('date', '>=', today.toISOString()),
          where('date', '<', tomorrow.toISOString()),
          orderBy('date'),
          orderBy('time')
        )
        const appointmentsSnapshot = await getDocs(appointmentsQuery)
        const appointmentsData = appointmentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AppointmentData[]
        setAppointments(appointmentsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user, router])

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/doctors/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
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
                <h1 className="text-2xl font-bold text-[#0D6C7E]">
                  Welcome, {doctorData?.name}
                </h1>
                <p className="text-[#04282E]">{doctorData?.hospitals?.[0]?.name || 'Loading...'}</p>
              </div>
            </div>
            
            <button
              onClick={async () => {
                try {
                  await handleLogout()
                } catch (error) {
                  console.error('Logout failed:', error)
                }
              }}
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
            <h2 className="text-2xl font-bold text-[#0D6C7E]">Welcome back, {doctorData?.name}!</h2>
            <p className="text-[#04282E] mt-2">Today is {getCurrentDate()}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#0D6C7E] mb-4">Today's Appointments</h3>
            <div className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
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
              onClick={() => router.push('/doctors/monthly-appointments')}
              className="p-4 bg-[#0D6C7E] hover:bg-[#08505D] text-white rounded-lg 
                       transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Monthly Appointments</span>
            </button>
            <button
              onClick={() => router.push('/doctors/schedule')}
              className="p-4 bg-[#F4A261] hover:bg-[#E76F51] text-white rounded-lg 
                       transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Update Schedule</span>
            </button>
            <button
              onClick={() => router.push('/doctors/settings')}
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