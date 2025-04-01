'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { auth, db } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore'

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface DoctorInfo {
  name: string;
  hospital: string;
}

export default function DoctorDashboard() {
  const router = useRouter()
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>({
    name: '',
    hospital: ''
  })
  
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/doctors/login')
        return
      }

      const fetchDoctorData = async () => {
        try {
          // Fetch doctor info
          const doctorDoc = await getDoc(doc(db, 'doctors', user.uid))
          if (doctorDoc.exists()) {
            const data = doctorDoc.data()
            setDoctorInfo({
              name: data?.name || '',
              hospital: data?.hospital || ''
            })
          }

          // Fetch today's appointments
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const tomorrow = new Date(today)
          tomorrow.setDate(tomorrow.getDate() + 1)

          const appointmentsQuery = query(
            collection(db, 'appointments'),
            where('doctorId', '==', user.uid),
            where('date', '>=', today),
            where('date', '<', tomorrow)
          )

          const appointmentsSnap = await getDocs(appointmentsQuery)
          const appointments: Appointment[] = []

          for (const doc of appointmentsSnap.docs) {
            const data = doc.data()
            appointments.push({
              id: doc.id,
              patientId: data.patientId,
              patientName: data.patientName,
              time: data.time,
              reason: data.reason,
              status: data.status
            })
          }

          setTodayAppointments(appointments)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchDoctorData()
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.replace('/doctors/login')
    } catch (error) {
      console.error('Error signing out:', error)
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

  const getStatusColor = (status: Appointment['status']) => {
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

  const viewPatientRecords = (patientId: string) => {
    try {
      router.push(`/doctors/patient-records/${patientId}`)
    } catch (error) {
      console.error('Error navigating to patient records:', error)
    }
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
                <h1 className="text-2xl font-bold text-[#0D6C7E]">Welcome, {doctorInfo.name}</h1>
                <p className="text-[#04282E]">{doctorInfo.hospital}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
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
            <h2 className="text-2xl font-bold text-[#0D6C7E]">Welcome back, {doctorInfo.name}!</h2>
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
                        onClick={() => viewPatientRecords(appointment.patientId)}
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