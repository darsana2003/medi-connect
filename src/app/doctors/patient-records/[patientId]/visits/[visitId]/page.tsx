'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import NotificationBell from '@/components/NotificationBell'

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
    other: string;
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
    images?: Array<{
      url: string;
      caption: string;
    }>;
    files?: Array<{
      id: string;
      name: string;
      url: string;
      type: 'image' | 'pdf';
      uploadedAt: string;
    }>;
  }>;
}

interface TestReport {
  name: string;
  date: string;
  result: string;
  normalRange?: string;
  notes?: string;
  images?: Array<{
    url: string;
    caption: string;
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
  const [selectedFile, setSelectedFile] = useState<{
    url: string;
    type: 'image' | 'pdf';
    name: string;
  } | null>(null)
  const [otherReportType, setOtherReportType] = useState('')

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
        other: "Dust, Pollen"
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
          notes: "All parameters within normal range",
          files: [
            {
              id: "1",
              name: "CBC_Report.pdf",
              url: "/sample-reports/cbc.pdf",
              type: "pdf",
              uploadedAt: "2024-02-01T10:30:00Z"
            }
          ]
        },
        {
          name: "Chest X-Ray",
          date: "2024-02-01",
          result: "Clear",
          notes: "No significant findings",
          files: [
            {
              id: "2",
              name: "Chest_XRay_Front.jpg",
              url: "/sample-xray.jpg",
              type: "image",
              uploadedAt: "2024-02-01T11:15:00Z"
            },
            {
              id: "3",
              name: "Chest_XRay_Side.jpg",
              url: "/sample-xray-side.jpg",
              type: "image",
              uploadedAt: "2024-02-01T11:15:00Z"
            }
          ]
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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
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
              <h1 className="text-2xl font-bold text-[#0D6C7E]">Patient Visit Details</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <div className="flex space-x-4">
                <Link 
                  href={`/doctors/patient-records/${params.patientId}`}
                  className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
                >
                  Back to Patient Records
                </Link>
                <Link 
                  href="/doctors/dashboard"
                  className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

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
              <p className="ml-4 text-black">{visitData.allergies.other}</p>
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

        {/* Display Uploaded Reports and Images */}
        {visitData.testReports.map((report, index) => (
          report.images && report.images.length > 0 && (
            <div key={`images-${index}`} className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-4">{report.name} - Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {report.images.map((image: { url: string; caption: string }, imgIndex: number) => (
                  <div key={imgIndex} className="relative">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.caption}
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <p className="mt-2 text-sm text-[#04282E]">{image.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {/* Add this new Prescription Card after Test Reports */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Prescription</h2>
          <div className="space-y-4">
            {visitData.prescription.medications.map((medication, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-[#0D6C7E] mb-2">
                      {medication.name}
                    </h3>
                    <div className="ml-4 space-y-1">
                      <p className="text-[#04282E] font-medium">
                        Dosage: <span className="text-black">{medication.dosage}</span>
                      </p>
                      <p className="text-[#04282E] font-medium">
                        Frequency: <span className="text-black">{medication.frequency}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-[#04282E] font-medium">
                      Duration: <span className="text-black">{medication.duration}</span>
                    </p>
                    <p className="text-[#04282E] font-medium">
                      Instructions: <span className="text-black">{medication.instructions}</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <svg 
                      className="w-5 h-5 text-[#0D6C7E]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm text-[#0D6C7E]">Prescribed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Download/Print Prescription Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 bg-[#0D6C7E] text-white px-4 py-2 rounded-lg hover:bg-[#0A5A6A] transition-colors duration-200"
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
              <span>Download Prescription</span>
            </button>
          </div>
        </div>

        {/* Previous Test Reports Viewer */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Previous Test Reports</h2>
          <div className="space-y-6">
            {visitData.testReports.map((report, reportIndex) => (
              report.files && report.files.length > 0 && (
                <div key={reportIndex} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-medium text-[#0D6C7E] mb-3">{report.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {report.files.map((file, fileIndex) => (
                      <div 
                        key={fileIndex}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        {/* File Preview */}
                        <div 
                          className="aspect-w-16 aspect-h-9 mb-3 cursor-pointer"
                          onClick={() => setSelectedFile(file)}
                        >
                          {file.type === 'image' ? (
                            <Image
                              src={file.url}
                              alt={file.name}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg"
                            />
                          ) : (
                            <div className="flex items-center justify-center bg-gray-100 rounded-lg">
                              <svg
                                className="w-12 h-12 text-[#0D6C7E]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* File Info */}
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-[#04282E] truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-3 flex space-x-2">
                          <button
                            onClick={() => setSelectedFile(file)}
                            className="flex items-center space-x-1 text-[#0D6C7E] hover:text-[#0A5A6A] text-sm"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            <span>View</span>
                          </button>
                          <a
                            href={file.url}
                            download={file.name}
                            className="flex items-center space-x-1 text-[#0D6C7E] hover:text-[#0A5A6A] text-sm"
                          >
                            <svg
                              className="w-4 h-4"
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
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* File Preview Modal */}
        {selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium text-[#04282E]">{selectedFile.name}</h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4">
                {selectedFile.type === 'image' ? (
                  <div className="relative h-[60vh]">
                    <Image
                      src={selectedFile.url}
                      alt={selectedFile.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                ) : (
                  <iframe
                    src={selectedFile.url}
                    className="w-full h-[60vh]"
                    title={selectedFile.name}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 