'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { DEMO_PATIENTS, type PatientRecord } from '@/lib/types/constants'

export default function PatientRecordClient({ patientId }: { patientId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [patient, setPatient] = useState<PatientRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundPatient = DEMO_PATIENTS.find(p => p.id === patientId)
    if (foundPatient) {
      setPatient(foundPatient)
    }
    setLoading(false)
  }, [patientId])

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#0D6C7E]">Visit History</h2>
          <Link
            href={`/doctors/patient-records/${patient.id}/new-visit`}
            className="inline-flex items-center px-4 py-2 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#0A5A6A] transition-colors duration-200"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Visit
          </Link>
        </div>
        
        <div className="space-y-6">
          {patient.visits && patient.visits.length > 0 ? (
            patient.visits.map((visit, index) => (
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
                    className="text-sm text-[#0D6C7E] hover:text-[#0A5A6A] font-medium flex items-center"
                  >
                    <span>View Details</span>
                    <svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No visit history available
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => router.push(`/doctors/patient-records/${patient.id}/new-visit`)}
          className="p-4 bg-[#0D6C7E] hover:bg-[#0A5A6A] text-white rounded-lg 
                   transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Record New Visit</span>
        </button>

        <button
          onClick={() => window.print()}
          className="p-4 bg-[#F4A261] hover:bg-[#E76F51] text-white rounded-lg 
                   transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>Print Record</span>
        </button>

        <button
          onClick={() => router.push('/doctors/dashboard')}
          className="p-4 bg-[#04282E] hover:bg-[#031D22] text-white rounded-lg 
                   transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  )
} 