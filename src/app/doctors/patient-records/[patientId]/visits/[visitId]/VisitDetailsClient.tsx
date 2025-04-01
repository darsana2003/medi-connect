'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import NotificationBell from '@/components/NotificationBell'
import { 
  DEMO_APPOINTMENTS, 
  DEMO_PATIENTS,
  type Appointment, 
  type VisitDetail,
  type PatientRecord 
} from '@/lib/types/constants'

export default function VisitDetailsClient({ 
  patientId,
  visitId
}: { 
  patientId: string;
  visitId: string;
}) {
  const router = useRouter()
  const [visitData, setVisitData] = useState<VisitDetail | null>(null)
  const [patientData, setPatientData] = useState<PatientRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<{
    url: string;
    type: 'image' | 'pdf';
    name: string;
  } | null>(null)

  useEffect(() => {
    const patient = DEMO_PATIENTS.find(p => p.id === patientId)
    const appointment = DEMO_APPOINTMENTS.find(apt => apt.id === visitId)
    
    if (patient) {
      setPatientData(patient)
    }
    
    if (appointment?.visitDetails) {
      setVisitData(appointment.visitDetails)
    }
    
    setLoading(false)
  }, [patientId, visitId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0D6C7E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!visitData || !patientData) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Visit details not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Vital Signs</h2>
          <div className="space-y-2">
            <p className="text-[#04282E] font-medium">
              Blood Pressure: <span className="text-black">{visitData.vitalSigns.bloodPressure}</span>
            </p>
            <p className="text-[#04282E] font-medium">
              Heart Rate: <span className="text-black">{visitData.vitalSigns.heartRate}</span>
            </p>
            <p className="text-[#04282E] font-medium">
              Temperature: <span className="text-black">{visitData.vitalSigns.temperature}</span>
            </p>
            <p className="text-[#04282E] font-medium">
              Oxygen Saturation: <span className="text-black">{visitData.vitalSigns.oxygenSaturation}</span>
            </p>
            <p className="text-[#04282E] font-medium">
              Respiratory Rate: <span className="text-black">{visitData.vitalSigns.respiratoryRate}</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Lab Results</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Blood Sugar</h3>
              <div className="ml-4 space-y-1">
                <p className="text-[#04282E] font-medium">
                  Fasting: <span className="text-black">{visitData.labResults.bloodSugar.fasting}</span>
                </p>
                <p className="text-[#04282E] font-medium">
                  Post Prandial: <span className="text-black">{visitData.labResults.bloodSugar.postPrandial}</span>
                </p>
                {visitData.labResults.bloodSugar.hba1c && (
                  <p className="text-[#04282E] font-medium">
                    HbA1c: <span className="text-black">{visitData.labResults.bloodSugar.hba1c}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Cholesterol</h3>
              <div className="ml-4 space-y-1">
                <p className="text-[#04282E] font-medium">
                  Total: <span className="text-black">{visitData.labResults.cholesterol.total}</span>
                </p>
                <p className="text-[#04282E] font-medium">
                  HDL: <span className="text-black">{visitData.labResults.cholesterol.hdl}</span>
                </p>
                <p className="text-[#04282E] font-medium">
                  LDL: <span className="text-black">{visitData.labResults.cholesterol.ldl}</span>
                </p>
                <p className="text-[#04282E] font-medium">
                  Triglycerides: <span className="text-black">{visitData.labResults.cholesterol.triglycerides}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 