'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'
import Analytics from '@/components/admin/Analytics'
import DoctorList from '@/components/admin/DoctorList'
import PatientList from '@/components/admin/PatientList'
import DepartmentList from '@/components/admin/DepartmentList'
import IncomingRequests from '@/components/admin/IncomingRequests'
import Patients from '@/components/admin/Patients'
import Doctors from '@/components/admin/Doctors'
import Departments from '@/components/admin/Departments'
import { FaUserCircle } from 'react-icons/fa'

interface AdminInfo {
  hospitalName: string;
  email: string;
  state: string;
  district: string;
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('requests')
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [adminInfo, setAdminInfo] = useState<AdminInfo>({
    hospitalName: '',
    email: '',
    state: '',
    district: ''
  })
  const [analyticsData, setAnalyticsData] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/admin/login')
        return
      }

      try {
        // Fetch admin info
        const adminDoc = await getDoc(doc(db, 'admins', user.uid))
        if (adminDoc.exists()) {
          const data = adminDoc.data()
          setAdminInfo({
            hospitalName: data.hospitalName || '',
            email: data.email || '',
            state: data.state || '',
            district: data.district || ''
          })
        }

        // Fetch analytics data
        const [patientsSnap, doctorsSnap, appointmentsSnap] = await Promise.all([
          getDocs(collection(db, 'patients')),
          getDocs(collection(db, 'doctors')),
          getDocs(collection(db, 'appointments'))
        ])

        setAnalyticsData({
          totalPatients: patientsSnap.size,
          totalDoctors: doctorsSnap.size,
          totalAppointments: appointmentsSnap.size
        })

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      await auth.signOut()
      router.replace('/admin/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end items-center mb-8">
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-black hover:text-[#0D6C7E]"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <FaUserCircle className="h-6 w-6 text-[#0D6C7E]" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-black">{adminInfo.hospitalName}</span>
                <span className="text-xs text-black">{adminInfo.email}</span>
              </div>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('requests')}
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'requests'
                  ? 'text-[#0D6C7E] border-b-2 border-[#0D6C7E]'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Incoming Requests
              </button>
              <button
                onClick={() => setActiveTab('patients')}
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'patients'
                  ? 'text-[#0D6C7E] border-b-2 border-[#0D6C7E]'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Patients
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'doctors'
                  ? 'text-[#0D6C7E] border-b-2 border-[#0D6C7E]'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Doctors
              </button>
              <button
                onClick={() => setActiveTab('departments')}
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'departments'
                  ? 'text-[#0D6C7E] border-b-2 border-[#0D6C7E]'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Departments
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-4 text-sm font-medium ${activeTab === 'analytics'
                  ? 'text-[#0D6C7E] border-b-2 border-[#0D6C7E]'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'patients' && <PatientList />}
            {activeTab === 'doctors' && <DoctorList />}
            {activeTab === 'departments' && <DepartmentList />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'requests' && <IncomingRequests />}
          </div>
        </div>
      </div>
    </div>
  )
} 