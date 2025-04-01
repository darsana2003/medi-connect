'use client'

import { useState } from 'react'
import Image from 'next/image'
import Analytics from '@/components/admin/Analytics'
import DoctorList from '@/components/admin/DoctorList'
import PatientList from '@/components/admin/PatientList'
import DepartmentList from '@/components/admin/DepartmentList'
import IncomingRequests from '@/components/admin/IncomingRequests'
import Patients from '@/components/admin/Patients'
import Doctors from '@/components/admin/Doctors'
import Departments from '@/components/admin/Departments'

type TabType = 'requests' | 'patients' | 'doctors' | 'departments' | 'analytics'

import { FaUserCircle } from 'react-icons/fa'

const analyticsData = {
  overview: {
    totalPatients: 150,
    totalAppointments: 200,
    bedOccupancy: 75,
    avgTreatmentDuration: 5,
    patientSatisfaction: 85
  },
  patientFlow: [
    { date: 'Jan', admitted: 65, discharged: 45, current: 20 },
    { date: 'Feb', admitted: 75, discharged: 55, current: 40 },
    { date: 'Mar', admitted: 85, discharged: 65, current: 60 },
    { date: 'Apr', admitted: 95, discharged: 75, current: 80 },
    { date: 'May', admitted: 90, discharged: 70, current: 100 }
  ],
  departmentPerformance: [
    { name: 'Cardiology', patients: 45, successRate: 92 },
    { name: 'Neurology', patients: 35, successRate: 88 },
    { name: 'Pediatrics', patients: 55, successRate: 95 },
    { name: 'Orthopedics', patients: 40, successRate: 90 }
  ],
  appointmentTrends: [
    { time: '8 AM', appointments: 10 },
    { time: '10 AM', appointments: 25 },
    { time: '12 PM', appointments: 30 },
    { time: '2 PM', appointments: 28 },
    { time: '4 PM', appointments: 15 }
  ],
  doctorPerformance: [
    { name: 'Dr. Radha', consultations: 45, rating: 4.8 },
    { name: 'Dr. Darsana', consultations: 38, rating: 4.6 },
    { name: 'Dr. Reghu', consultations: 42, rating: 4.9 },
    { name: 'Dr. Manmadhan', consultations: 36, rating: 4.7 }
  ],
  emergencyCases: [
    { month: 'Jan', cases: 25 },
    { month: 'Feb', cases: 30 },
    { month: 'Mar', cases: 28 },
    { month: 'Apr', cases: 35 },
    { month: 'May', cases: 32 }
  ],
  departmentMetrics: [
    {
      name: 'Cardiology',
      waitingTime: 25,
      resourceUtilization: 85,
      successRate: 92
    },
    {
      name: 'Neurology',
      waitingTime: 30,
      resourceUtilization: 80,
      successRate: 88
    },
    {
      name: 'Pediatrics',
      waitingTime: 20,
      resourceUtilization: 90,
      successRate: 95
    },
    {
      name: 'Orthopedics',
      waitingTime: 35,
      resourceUtilization: 75,
      successRate: 90
    }
  ],
  appointmentAnalysis: {
    noShows: 15,
    cancellations: 25,
    preferredTimes: [
      { time: 'Morning', count: 120 },
      { time: 'Afternoon', count: 80 },
      { time: 'Evening', count: 40 }
    ]
  }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('requests')
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end items-center mb-8">
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-[#0D6C7E]"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <FaUserCircle className="h-6 w-6 text-[#0D6C7E]" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Darsana Shabu</span>
                <span className="text-xs text-gray-500">darsana.shabu@mediconnect.com</span>
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
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
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