'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Appointments from '@/components/admin/Appointments'
import IncomingRequests from '@/components/admin/IncomingRequests'
import PatientList from '@/components/admin/PatientList'
import DoctorList from '@/components/admin/DoctorList'
import DepartmentList from '@/components/admin/DepartmentList'
import Analytics from '@/components/admin/Analytics'
import { Bar, Line, Pie } from 'react-chartjs-2'

type TabType = 'appointments' | 'requests' | 'patients' | 'doctors' | 'departments' | 'analytics'

interface Patient {
  name: string;
  date: string;
  department: string;
  doctor: string;
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('appointments')
  const [adminName, setAdminName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    // In a real app, you'd get this from an auth context or API
    const name = localStorage.getItem('adminName')
    const email = localStorage.getItem('adminEmail')
    if (!name || !email) {
      router.push('/admin/login')
    } else {
      setAdminName(name)
      setAdminEmail(email)
    }
  }, [router])

  const tabs: { id: TabType; name: string }[] = [
    { id: 'appointments', name: 'Appointments' },
    { id: 'requests', name: 'Incoming Requests' },
    { id: 'patients', name: 'Patients' },
    { id: 'doctors', name: 'Doctors' },
    { id: 'departments', name: 'Departments' },
    { id: 'analytics', name: 'Analytics' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#0D6C7E] flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {adminName.split(' ')[0][0]}
                </span>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">{adminName}</h1>
                <p className="text-sm text-gray-500">{adminEmail}</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <Image
                src="/LOGO_NO_BG.png"
                alt="Settings"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
                  ? 'border-[#0D6C7E] text-[#0D6C7E]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'appointments' && <Appointments />}
        {activeTab === 'requests' && <IncomingRequests />}
        {activeTab === 'patients' && <PatientList />}
        {activeTab === 'doctors' && <DoctorList />}
        {activeTab === 'departments' && <DepartmentList />}
        {activeTab === 'analytics' && <Analytics />}
        {/* Other tab content remains the same */}
      </main>
    </div>
  )
} 