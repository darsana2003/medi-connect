'use client'
//test
import { useState } from 'react'
import Image from 'next/image'
import IncomingRequests from '@/components/admin/IncomingRequests'
import Patients from '@/components/admin/Patients'
import Doctors from '@/components/admin/Doctors'
import Departments from '@/components/admin/Departments'
import Analytics from '@/components/admin/Analytics'

type TabType = 'requests' | 'patients' | 'doctors' | 'departments' | 'analytics'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('requests')

  const adminName = "Jacob Mathew" // Changed from "Dr. John Doe"
  const adminEmail = "jacob.mathew@hospital.com" // Updated email to match new name

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#0D6C7E] flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {adminName.charAt(0)}
                </span>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">Welcome, {adminName}</h1>
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
          <div className="flex space-x-8">
            {[
              { id: 'requests', name: 'Incoming Requests' },
              { id: 'patients', name: 'Patients' },
              { id: 'doctors', name: 'Doctors' },
              { id: 'departments', name: 'Departments' },
              { id: 'analytics', name: 'Analytics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
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
        {activeTab === 'requests' && <IncomingRequests />}
        {activeTab === 'patients' && <Patients />}
        {activeTab === 'doctors' && <Doctors />}
        {activeTab === 'departments' && <Departments />}
        {activeTab === 'analytics' && <Analytics />}
      </main>
    </div>
  )
} 