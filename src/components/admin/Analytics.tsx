'use client'

import { useState } from 'react'
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const analyticsData = {
  overview: {
    totalPatients: 1250,
    totalDoctors: 45,
    totalAppointments: 3200,
    pendingAppointments: 120,
    completedAppointments: 2950,
    cancelledAppointments: 130
  },
  patientFlow: [
    { month: 'Jan', admitted: 65, discharged: 45, current: 20 },
    { month: 'Feb', admitted: 75, discharged: 55, current: 40 },
    { month: 'Mar', admitted: 85, discharged: 65, current: 60 },
    { month: 'Apr', admitted: 95, discharged: 75, current: 80 },
    { month: 'May', admitted: 90, discharged: 70, current: 100 },
    { month: 'Jun', admitted: 110, discharged: 85, current: 125 }
  ],
  appointmentTrends: [
    { time: '8 AM', appointments: 10 },
    { time: '9 AM', appointments: 15 },
    { time: '10 AM', appointments: 25 },
    { time: '11 AM', appointments: 28 },
    { time: '12 PM', appointments: 30 },
    { time: '1 PM', appointments: 22 },
    { time: '2 PM', appointments: 28 },
    { time: '3 PM', appointments: 20 },
    { time: '4 PM', appointments: 15 },
    { time: '5 PM', appointments: 8 }
  ]
}

export default function Analytics() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black">Analytics Dashboard</h2>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Patients</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-blue-600">{analyticsData.overview.totalPatients}</p>
            <div className="text-sm text-green-600 font-medium">+12% ↑</div>
          </div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Appointments</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-green-600">{analyticsData.overview.totalAppointments}</p>
            <div className="text-sm text-green-600 font-medium">+8% ↑</div>
          </div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Doctors</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-purple-600">{analyticsData.overview.totalDoctors}</p>
            <div className="text-sm text-green-600 font-medium">+5% ↑</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Patient Flow Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Patient Flow</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData.patientFlow}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="admitted" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="discharged" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="current" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Trends */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Appointment Trends by Hour</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analyticsData.appointmentTrends}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="appointments" stroke="#0D6C7E" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
} 