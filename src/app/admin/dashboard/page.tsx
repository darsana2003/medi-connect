'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import Analytics from '@/components/admin/Analytics'
import DoctorList from '@/components/admin/DoctorList'
import PatientList from '@/components/admin/PatientList'
import DepartmentList from '@/components/admin/DepartmentList'
import AppointmentList from '@/components/admin/AppointmentList'
import IncomingRequests from '@/components/admin/IncomingRequests'

interface AdminData {
  hospitalName: string
  adminId: string
  state: string
  district: string
  email: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const { user, getUserData, logout } = useAuth()
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [activeTab, setActiveTab] = useState('appointments')
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  useEffect(() => {
    if (!user) {
      router.replace('/admin/login')
      return
    }

    const fetchData = async () => {
      try {
        // Fetch admin data from web_admin_users collection
        const adminDoc = await getUserData()
        setAdminData(adminDoc as AdminData)

        // Fetch analytics data
        const stats = await fetchAnalyticsData()
        setAnalyticsData(stats)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user, router])

  const fetchAnalyticsData = async () => {
    try {
      // Get counts from different collections
      const patientsSnapshot = await getDocs(collection(db, 'patients'))
      const appointmentsSnapshot = await getDocs(collection(db, 'appointments'))
      const doctorsSnapshot = await getDocs(
        query(collection(db, 'web_users'), where('role', '==', 'doctor'))
      )

      return {
        overview: {
          totalPatients: patientsSnapshot.size,
          totalAppointments: appointmentsSnapshot.size,
          totalDoctors: doctorsSnapshot.size,
          // Add more metrics as needed
        }
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return null
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {adminData?.hospitalName || 'Loading...'}
              </h1>
              <p className="text-sm text-gray-600">
                {adminData?.district}, {adminData?.state}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['appointments', 'incoming', 'patients', 'doctors', 'departments', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-4 text-sm font-medium capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'appointments' && <AppointmentList />}
        {activeTab === 'incoming' && <IncomingRequests />}
        {activeTab === 'patients' && <PatientList />}
        {activeTab === 'doctors' && <DoctorList />}
        {activeTab === 'departments' && <DepartmentList />}
        {activeTab === 'analytics' && <Analytics data={analyticsData} />}
      </div>
    </div>
  )
} 