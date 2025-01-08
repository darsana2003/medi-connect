'use client'

import { useState } from 'react'
import Analytics from '@/components/admin/Analytics'
import DoctorList from '@/components/admin/DoctorList'
import PatientList from '@/components/admin/PatientList'
import DepartmentList from '@/components/admin/DepartmentList'
import AppointmentList from '@/components/admin/AppointmentList'
import IncomingRequests from '@/components/admin/IncomingRequests'

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
    { name: 'Dr. Emily White', consultations: 45, rating: 4.8 },
    { name: 'Dr. Michael Brown', consultations: 38, rating: 4.6 },
    { name: 'Dr. Sarah Johnson', consultations: 42, rating: 4.9 },
    { name: 'Dr. John Doe', consultations: 36, rating: 4.7 }
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
  const [activeTab, setActiveTab] = useState('appointments')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Profile Header */}
      <div className="bg-white shadow mb-6">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white text-xl font-semibold">
              S
            </div>
            <div className="ml-4">
              <h1 className="text-lg font-semibold">Sarah Johnson</h1>
              <p className="text-sm text-gray-500">sarah.johnson@mediconnect.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow mb-6">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`${activeTab === 'appointments'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                } px-3 py-4 text-sm font-medium`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('incoming')}
              className={`${activeTab === 'incoming'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                } px-3 py-4 text-sm font-medium`}
            >
              Incoming Requests
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`${activeTab === 'patients'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                } px-3 py-4 text-sm font-medium`}
            >
              Patients
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`${activeTab === 'doctors'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                } px-3 py-4 text-sm font-medium`}
            >
              Doctors
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`${activeTab === 'departments'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                } px-3 py-4 text-sm font-medium`}
            >
              Departments
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`${activeTab === 'analytics'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                } px-3 py-4 text-sm font-medium`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
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