'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import PatientRecordClient from './PatientRecordClient'

interface Visit {
  date: string;
  diagnosis: string;
  prescription: string;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  medications?: string[];
  notes?: string;
}

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  medicalHistory: string;
  visits: Visit[];
}

export default function PatientRecordPage() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.patientId as string
  
  const [patient, setPatient] = useState<PatientRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Simulated patient data - replace with actual API call
      const mockPatients: Record<string, PatientRecord> = {
        'P001': {
          id: 'P001',
          name: "Rekha Pathrose",
          age: 35,
          gender: "Female",
          contact: "+1 234-567-8901",
          medicalHistory: "Asthma, Seasonal Allergies",
          visits: [
            {
              date: "2024-03-15",
              diagnosis: "Acute bronchitis",
              prescription: "Amoxicillin 500mg\nCough syrup",
              bloodPressure: "120/80",
              heartRate: "72",
              temperature: "37.2"
            },
            {
              date: "2024-01-02",
              diagnosis: "Regular checkup",
              prescription: "Ventolin inhaler\nAntihistamines",
              bloodPressure: "118/75",
              heartRate: "70",
              temperature: "36.8"
            }
          ]
        },
        'P002': {
          id: 'P002',
          name: "Rajan Nair",
          age: 42,
          gender: "Male",
          contact: "+1 345-678-9012",
          medicalHistory: "Hypertension",
          visits: [
            {
              date: "2024-03-10",
              diagnosis: "Follow-up",
              prescription: "Amlodipine 5mg\nLisinopril 10mg",
              bloodPressure: "140/90",
              heartRate: "75",
              temperature: "36.9"
            }
          ]
        },
        'P003': {
          id: 'P003',
          name: "Vivek Gopinath",
          age: 28,
          gender: "Male",
          contact: "+1 456-789-0123",
          medicalHistory: "None",
          visits: [
            {
              date: "2024-03-13",
              diagnosis: "Consultation",
              prescription: "Paracetamol 500mg",
              bloodPressure: "122/82",
              heartRate: "68",
              temperature: "37.0"
            }
          ]
        }
      }

      // Simulate API call
      setTimeout(() => {
        const patientData = mockPatients[patientId]
        if (patientData) {
          setPatient(patientData)
        } else {
          setError('Patient not found')
        }
        setLoading(false)
      }, 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }, [patientId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0D6C7E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error || 'Patient record not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-[40px] h-[40px] flex-shrink-0">
            <Image
              src="/medib.png"
              alt="MediConnect Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-[#0D6C7E]">Patient Record</h1>
        </div>
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

      {/* Bottom buttons */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => router.push(`/doctors/patient-records/${patientId}/new-visit`)}
          className="p-4 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#0A5A6A] 
                   transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Record New Visit</span>
        </button>
        <button
          onClick={() => window.print()}
          className="p-4 bg-[#F4A261] text-white rounded-lg hover:bg-[#E76F51] 
                   transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Print Record</span>
        </button>
        <button
          onClick={() => router.push('/doctors/dashboard')}
          className="p-4 bg-[#04282E] text-white rounded-lg hover:bg-[#031D22] 
                   transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  )
} 