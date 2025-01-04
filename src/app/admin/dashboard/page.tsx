'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type TabType = 'appointments' | 'requests' | 'patients' | 'doctors' | 'departments' | 'analytics'

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
              <Image src="/settings.svg" alt="Settings" width={24} height={24} />
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
        {/* Content for each tab would go here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {tabs.find(tab => tab.id === activeTab)?.name}
          </h2>
          {/* Add your tab-specific content here */}
        </div>
      </main>
    </div>
  )
} 