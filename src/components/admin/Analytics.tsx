'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface AnalyticsProps {
  data: {
    overview: {
      totalPatients: number;
      totalAppointments: number;
      bedOccupancy: number;
      avgTreatmentDuration: number;
      patientSatisfaction: number;
    };
    patientFlow: Array<{
      date: string;
      admitted: number;
      discharged: number;
      current: number;
    }>;
    departmentPerformance: Array<{
      name: string;
      patients: number;
      successRate: number;
    }>;
    appointmentTrends: Array<{
      time: string;
      appointments: number;
    }>;
    doctorPerformance: Array<{
      name: string;
      consultations: number;
      rating: number;
    }>;
    emergencyCases: Array<{
      month: string;
      cases: number;
    }>;
    departmentMetrics: Array<{
      name: string;
      waitingTime: number;
      resourceUtilization: number;
      successRate: number;
    }>;
    appointmentAnalysis: {
      noShows: number;
      cancellations: number;
      preferredTimes: Array<{
        time: string;
        count: number;
      }>;
    };
  };
}

export default function Analytics({ data }: AnalyticsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-6 p-6">
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg text-black font-semibold mb-2">Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold">{data.overview.totalPatients}</p>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <p className="text-sm text-gray-600">Total Appointments</p>
              <p className="text-2xl font-bold">{data.overview.totalAppointments}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded">
              <p className="text-sm text-gray-600">Bed Occupancy</p>
              <p className="text-2xl font-bold">{data.overview.bedOccupancy}%</p>
            </div>
            {/* <div className="bg-purple-50 p-3 rounded">
              <p className="text-sm text-gray-600">Patient Satisfaction</p>
              <p className="text-2xl font-bold">{data.overview.patientSatisfaction}%</p>
            </div> */}
          </div>
        </div>

        {/* Patient Flow Chart */}
        <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h3 className="text-lg text-black font-semibold mb-2">Patient Flow</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data.patientFlow}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="admitted" stroke="#8884d8" />
              <Line type="monotone" dataKey="discharged" stroke="#82ca9d" />
              <Line type="monotone" dataKey="current" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Performance */}

      {/* Appointment Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg text-black font-semibold mb-2">Appointment Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.appointmentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="appointments" fill="#8884d8" stroke="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Success Rates */}

      </div>

      {/* Department Metrics Table */}

    </div>
  );
} 