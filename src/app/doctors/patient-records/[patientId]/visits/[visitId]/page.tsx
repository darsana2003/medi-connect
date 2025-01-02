'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface VisitDetail {
  date: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    oxygenSaturation: string;
    respiratoryRate: string;
  };
  labResults: {
    bloodSugar: {
      fasting: string;
      postPrandial: string;
      hba1c?: string;
    };
    cholesterol: {
      total: string;
      hdl: string;
      ldl: string;
      triglycerides: string;
    };
    other?: {
      name: string;
      value: string;
      unit: string;
    }[];
  };
  doctorFindings: {
    symptoms: string[];
    diagnosis: string;
    notes: string;
  };
  allergies: {
    medications: string[];
    food: string[];
    other: string[];
  };
  prescription: {
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      instructions: string;
    }>;
  };
  testReports: Array<{
    name: string;
    date: string;
    result: string;
    normalRange?: string;
    notes?: string;
  }>;
}

export default function DetailedVisitView({ 
  params 
}: { 
  params: { patientId: string; visitId: string } 
}) {
  const router = useRouter()
  const [visitData, setVisitData] = useState<VisitDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulated data - replace with actual API call
    const mockVisitData: VisitDetail = {
      date: params.visitId,
      vitalSigns: {
        bloodPressure: "120/80 mmHg",
        heartRate: "72 bpm",
        temperature: "37.2°C",
        oxygenSaturation: "98%",
        respiratoryRate: "16/min"
      },
      labResults: {
        bloodSugar: {
          fasting: "95 mg/dL",
          postPrandial: "120 mg/dL",
          hba1c: "5.7%"
        },
        cholesterol: {
          total: "180 mg/dL",
          hdl: "50 mg/dL",
          ldl: "110 mg/dL",
          triglycerides: "150 mg/dL"
        },
        other: [
          {
            name: "Hemoglobin",
            value: "14.5",
            unit: "g/dL"
          },
          {
            name: "Creatinine",
            value: "0.9",
            unit: "mg/dL"
          }
        ]
      },
      doctorFindings: {
        symptoms: [
          "Persistent cough",
          "Mild fever",
          "Fatigue"
        ],
        diagnosis: "Acute bronchitis",
        notes: "Patient shows signs of upper respiratory infection. Recommend rest and increased fluid intake."
      },
      allergies: {
        medications: ["Penicillin", "Sulfa drugs"],
        food: ["Peanuts"],
        other: ["Dust", "Pollen"]
      },
      prescription: {
        medications: [
          {
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "Twice daily",
            duration: "7 days",
            instructions: "Take with food"
          },
          {
            name: "Cough Syrup",
            dosage: "10ml",
            frequency: "Three times daily",
            duration: "5 days",
            instructions: "Take after meals"
          }
        ]
      },
      testReports: [
        {
          name: "Complete Blood Count",
          date: "2024-02-01",
          result: "Normal",
          normalRange: "WBC: 4.5-11.0 × 10⁹/L",
          notes: "All parameters within normal range"
        },
        {
          name: "Chest X-Ray",
          date: "2024-02-01",
          result: "Clear",
          notes: "No significant findings"
        }
      ]
    };

    setTimeout(() => {
      setVisitData(mockVisitData)
      setLoading(false)
    }, 1000)
  }, [params.visitId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#0D6C7E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!visitData) {
    return (
      <div className="min-h-screen bg-[#F4F4F4] p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Visit details not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D6C7E]">Visit Details</h1>
        <Link 
          href={`/doctors/patient-records/${params.patientId}`}
          className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
        >
          Back to Patient Record
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vital Signs Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Vital Signs</h2>
          <div className="space-y-2">
            <p className="text-[#04282E] font-medium">Blood Pressure: <span className="text-black">{visitData.vitalSigns.bloodPressure}</span></p>
            <p className="text-[#04282E] font-medium">Heart Rate: <span className="text-black">{visitData.vitalSigns.heartRate}</span></p>
            <p className="text-[#04282E] font-medium">Temperature: <span className="text-black">{visitData.vitalSigns.temperature}</span></p>
            <p className="text-[#04282E] font-medium">Oxygen Saturation: <span className="text-black">{visitData.vitalSigns.oxygenSaturation}</span></p>
            <p className="text-[#04282E] font-medium">Respiratory Rate: <span className="text-black">{visitData.vitalSigns.respiratoryRate}</span></p>
          </div>
        </div>

        {/* Lab Results Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Lab Results</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Blood Sugar</h3>
              <div className="ml-4 space-y-1">
                <p className="text-[#04282E] font-medium">Fasting: <span className="text-black">{visitData.labResults.bloodSugar.fasting}</span></p>
                <p className="text-[#04282E] font-medium">Post Prandial: <span className="text-black">{visitData.labResults.bloodSugar.postPrandial}</span></p>
                {visitData.labResults.bloodSugar.hba1c && (
                  <p className="text-[#04282E] font-medium">HbA1c: <span className="text-black">{visitData.labResults.bloodSugar.hba1c}</span></p>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Cholesterol</h3>
              <div className="ml-4 space-y-1">
                <p className="text-[#04282E] font-medium">Total: <span className="text-black">{visitData.labResults.cholesterol.total}</span></p>
                <p className="text-[#04282E] font-medium">HDL: <span className="text-black">{visitData.labResults.cholesterol.hdl}</span></p>
                <p className="text-[#04282E] font-medium">LDL: <span className="text-black">{visitData.labResults.cholesterol.ldl}</span></p>
                <p className="text-[#04282E] font-medium">Triglycerides: <span className="text-black">{visitData.labResults.cholesterol.triglycerides}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor's Findings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Doctor's Findings</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Symptoms</h3>
              <ul className="ml-4 list-disc text-black">
                {visitData.doctorFindings.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Diagnosis</h3>
              <p className="ml-4 text-black">{visitData.doctorFindings.diagnosis}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Notes</h3>
              <p className="ml-4 text-black">{visitData.doctorFindings.notes}</p>
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Allergies</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Medications</h3>
              <ul className="ml-4 list-disc text-black">
                {visitData.allergies.medications.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Food</h3>
              <ul className="ml-4 list-disc text-black">
                {visitData.allergies.food.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">Other</h3>
              <ul className="ml-4 list-disc text-black">
                {visitData.allergies.other.map((allergy, index) => (
                  <li key={index}>{allergy}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Test Reports */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Test Reports</h2>
          <div className="space-y-4">
            {visitData.testReports.map((report, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">{report.name}</h3>
                <div className="ml-4 space-y-1">
                  <p className="text-[#04282E] font-medium">Date: <span className="text-black">{report.date}</span></p>
                  <p className="text-[#04282E] font-medium">Result: <span className="text-black">{report.result}</span></p>
                  {report.normalRange && (
                    <p className="text-[#04282E] font-medium">Normal Range: <span className="text-black">{report.normalRange}</span></p>
                  )}
                  {report.notes && (
                    <p className="text-[#04282E] font-medium">Notes: <span className="text-black">{report.notes}</span></p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 