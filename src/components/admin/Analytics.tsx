'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Sample data for charts
const patientFlowData = [
  { month: 'Jan', admitted: 120, discharged: 100, current: 80 },
  { month: 'Feb', admitted: 150, discharged: 130, current: 100 },
  // Add more monthly data...
]

const departmentPerformanceData = [
  { name: 'Cardiology', patients: 450 },
  { name: 'Orthopedics', patients: 350 },
  { name: 'Pediatrics', patients: 300 },
  { name: 'Neurology', patients: 250 }
]

const appointmentTrendsData = [
  { time: '8:00', appointments: 10 },
  { time: '10:00', appointments: 25 },
  { time: '12:00', appointments: 15 },
  { time: '14:00', appointments: 30 },
  { time: '16:00', appointments: 20 }
]

export default function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all')

  // Overview statistics
  const statistics = {
    totalPatients: 1250,
    totalAppointments: 3500,
    bedOccupancy: '75%',
    avgTreatmentDuration: '5.2 days'
  }

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Patients</h3>
          <p className="text-3xl font-bold text-[#0D6C7E]">{statistics.totalPatients}</p>
          <p className="text-sm text-gray-500">This {selectedTimeframe}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Appointments</h3>
          <p className="text-3xl font-bold text-[#0D6C7E]">{statistics.totalAppointments}</p>
          <p className="text-sm text-gray-500">This {selectedTimeframe}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Bed Occupancy</h3>
          <p className="text-3xl font-bold text-[#0D6C7E]">{statistics.bedOccupancy}</p>
          <p className="text-sm text-gray-500">Current rate</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Avg Treatment Duration</h3>
          <p className="text-3xl font-bold text-[#0D6C7E]">{statistics.avgTreatmentDuration}</p>
          <p className="text-sm text-gray-500">Per patient</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Flow Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Flow</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patientFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="admitted" stroke="#0D6C7E" />
                <Line type="monotone" dataKey="discharged" stroke="#82ca9d" />
                <Line type="monotone" dataKey="current" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Department Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#0D6C7E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={appointmentTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="appointments" fill="#0D6C7E" stroke="#0D6C7E" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department-Specific Analytics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Department Analytics</h3>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0D6C7E] focus:ring-[#0D6C7E] sm:text-sm"
          >
            <option value="all">All Departments</option>
            <option value="cardiology">Cardiology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="neurology">Neurology</option>
          </select>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="text-xl font-semibold text-gray-900">92%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Waiting Time</p>
                <p className="text-xl font-semibold text-gray-900">15 mins</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Resource Utilization</p>
                <p className="text-xl font-semibold text-gray-900">85%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Missed Appointments</p>
                <p className="text-xl font-semibold text-gray-900">8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 