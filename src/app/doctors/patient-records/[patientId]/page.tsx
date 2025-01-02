'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Visit {
  date: string;
  diagnosis: string;
  prescription: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
}

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  medicalHistory: string;
  visits: Visit[];
}

export default function PatientRecordPage({ params }: { params: { patientId: string } }) {
  const router = useRouter()
  const [patient, setPatient] = useState<PatientRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated patient data - replace with actual API call
    const mockPatient: PatientRecord = {
      id: params.patientId,
      name: "John Doe",
      age: 45,
      gender: "Male",
      contact: "+91 9876543210",
      medicalHistory: "Diabetes Type 2, Hypertension",
      visits: [
        {
          date: "2024-02-01",
          diagnosis: "Acute bronchitis",
          prescription: "Antibiotics - Amoxicillin 500mg\nCough syrup",
          bloodPressure: "120/80",
          heartRate: "72",
          temperature: "37.2"
        },
        {
          date: "2024-01-15",
          diagnosis: "Regular checkup",
          prescription: "Metformin 500mg\nAmlodipine 5mg",
          bloodPressure: "130/85",
          heartRate: "75",
          temperature: "36.8"
        }
      ]
    };

    // Simulate API call
    setTimeout(() => {
      setPatient(mockPatient)
      setLoading(false)
    }, 1000)
  }, [params.patientId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0D6C7E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Patient record not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D6C7E]">Patient Record</h1>
        <Link 
          href="/doctors/dashboard"
          className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Patient Information Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-[#04282E] font-medium">Name: <span className="font-normal text-black">{patient.name}</span></p>
            <p className="text-[#04282E] font-medium">Age: <span className="font-normal text-black">{patient.age} years</span></p>
            <p className="text-[#04282E] font-medium">Gender: <span className="font-normal text-black">{patient.gender}</span></p>
          </div>
          <div>
            <p className="text-[#04282E] font-medium">Contact: <span className="font-normal text-black">{patient.contact}</span></p>
            <p className="text-[#04282E] font-medium">Medical History: <span className="font-normal text-black">{patient.medicalHistory}</span></p>
          </div>
        </div>
      </div>

      {/* Visit History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Visit History</h2>
        <div className="space-y-6">
          {patient.visits.map((visit, index) => (
            <div 
              key={index}
              className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#0D6C7E]">
                  Visit Date: <span className="text-black">{new Date(visit.date).toLocaleDateString()}</span>
                </h3>
                <Link 
                  href={`/doctors/patient-records/${patient.id}/visits/${visit.date}`}
                  className="text-sm text-[#0D6C7E] hover:text-[#0A5A6A] font-medium"
                >
                  View Details
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[#04282E] font-medium">Vital Signs:</p>
                  <ul className="ml-4 space-y-1 text-black">
                    <li>Blood Pressure: {visit.bloodPressure}</li>
                    <li>Heart Rate: {visit.heartRate} bpm</li>
                    <li>Temperature: {visit.temperature}°C</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[#04282E] font-medium">Diagnosis:</p>
                  <p className="ml-4 text-black">{visit.diagnosis}</p>
                  <p className="text-[#04282E] font-medium mt-2">Prescription:</p>
                  <p className="ml-4 whitespace-pre-line text-black">{visit.prescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Visit Button */}
      <div className="mt-6">
        <Link
          href={`/doctors/patient-records/${patient.id}/new-visit`}
          className="inline-block bg-[#0D6C7E] text-white px-6 py-3 rounded-lg hover:bg-[#0A5A6A] transition-colors duration-200"
        >
          Add New Visit
        </Link>
      </div>
    </div>
  )
} 