'use client'

import { useState } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Analytics() {
  const [data] = useState({
    totalPatients: 150,
    totalAppointments: 200,
    doctorPerformance: {
      labels: ['Dr. Emily White', 'Dr. Michael Brown', 'Dr. Sarah Johnson', 'Dr. John Doe'],
      data: [50, 40, 30, 20]
    },
    departmentEfficiency: {
      labels: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'],
      data: [60, 50, 40, 30]
    },
    bedOccupancyRate: 75,
    averageTreatmentDuration: 5, // in days
    patientSatisfactionScore: 85 // percentage
  })

  const patientFlowData = {
    labels: ['Admitted', 'Discharged', 'Under Care'],
    datasets: [
      {
        label: 'Patient Flow',
        data: [100, 80, 50],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  }

  const departmentPerformanceData = {
    labels: data.departmentEfficiency.labels,
    datasets: [
      {
        label: 'Patients Treated',
        data: data.departmentEfficiency.data,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  }

  const recoveryRatesData = {
    labels: ['Successful', 'Unsuccessful'],
    datasets: [
      {
        data: [data.patientSatisfactionScore, 100 - data.patientSatisfactionScore],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Total Patients</h3>
          <p className="text-lg">{data.totalPatients}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Total Appointments</h3>
          <p className="text-lg">{data.totalAppointments}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Bed Occupancy Rate</h3>
          <p className="text-lg">{data.bedOccupancyRate}%</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Average Treatment Duration</h3>
          <p className="text-lg">{data.averageTreatmentDuration} days</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Patient Satisfaction Score</h3>
          <p className="text-lg">{data.patientSatisfactionScore}%</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Patient Flow</h3>
      <Line data={patientFlowData} />

      <h3 className="text-xl font-semibold mb-4">Department Performance</h3>
      <Bar data={departmentPerformanceData} />

      <h3 className="text-xl font-semibold mb-4">Recovery Rates</h3>
      <Pie data={recoveryRatesData} />
    </div>
  )
} 