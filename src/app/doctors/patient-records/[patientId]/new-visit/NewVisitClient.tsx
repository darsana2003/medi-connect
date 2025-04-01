'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function NewVisitClient({ patientId }: { patientId: string }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      oxygenSaturation: '',
      respiratoryRate: ''
    },
    labResults: {
      bloodSugar: {
        fasting: '',
        postPrandial: '',
        hba1c: ''
      },
      cholesterol: {
        total: '',
        hdl: '',
        ldl: '',
        triglycerides: ''
      }
    },
    doctorFindings: {
      symptoms: [''],
      diagnosis: '',
      notes: ''
    },
    prescription: {
      medications: [{
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      }]
    },
    allergies: {
      medications: [''],
      food: [''],
      other: ''
    },
    testReports: [{
      name: '',
      date: '',
      result: '',
      normalRange: '',
      notes: '',
      files: [] as File[]
    }]
  })

  const addSymptom = () => {
    setFormData({
      ...formData,
      doctorFindings: {
        ...formData.doctorFindings,
        symptoms: [...formData.doctorFindings.symptoms, '']
      }
    })
  }

  const removeSymptom = (index: number) => {
    const newSymptoms = formData.doctorFindings.symptoms.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      doctorFindings: {
        ...formData.doctorFindings,
        symptoms: newSymptoms
      }
    })
  }

  const addMedication = () => {
    setFormData({
      ...formData,
      prescription: {
        medications: [
          ...formData.prescription.medications,
          { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
        ]
      }
    })
  }

  const removeMedication = (index: number) => {
    const newMedications = formData.prescription.medications.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      prescription: {
        medications: newMedications
      }
    })
  }

  const addAllergy = (type: 'medications' | 'food') => {
    setFormData({
      ...formData,
      allergies: {
        ...formData.allergies,
        [type]: [...formData.allergies[type], '']
      }
    })
  }

  const removeAllergy = (type: 'medications' | 'food', index: number) => {
    const newAllergies = formData.allergies[type].filter((_, i) => i !== index)
    setFormData({
      ...formData,
      allergies: {
        ...formData.allergies,
        [type]: newAllergies
      }
    })
  }

  const addTestReport = () => {
    setFormData({
      ...formData,
      testReports: [
        ...formData.testReports,
        {
          name: '',
          date: '',
          result: '',
          normalRange: '',
          notes: '',
          files: []
        }
      ]
    })
  }

  const removeTestReport = (index: number) => {
    const newTestReports = formData.testReports.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      testReports: newTestReports
    })
  }

  const handleFileUpload = (index: number, files: FileList | null) => {
    if (!files) return

    const newTestReports = [...formData.testReports]
    newTestReports[index] = {
      ...newTestReports[index],
      files: [...newTestReports[index].files, ...Array.from(files)]
    }
    setFormData({
      ...formData,
      testReports: newTestReports
    })
  }

  const removeFile = (reportIndex: number, fileIndex: number) => {
    const newTestReports = [...formData.testReports]
    newTestReports[reportIndex] = {
      ...newTestReports[reportIndex],
      files: newTestReports[reportIndex].files.filter((_, i) => i !== fileIndex)
    }
    setFormData({
      ...formData,
      testReports: newTestReports
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    router.push(`/doctors/patient-records/${patientId}`)
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-8">
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
          <h1 className="text-3xl font-bold text-[#0D6C7E]">New Visit Record</h1>
        </div>
        <Link 
          href={`/doctors/patient-records/${patientId}`}
          className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
        >
          Back to Patient Record
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vital Signs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(formData.vitalSigns).map(([key, value]) => (
              <div key={key}>
                <label className="block text-[#04282E] font-medium mb-2">
                  {key.split(/(?=[A-Z])/).join(' ')}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-black"
                  placeholder={key === 'bloodPressure' ? '120/80 mmHg' : ''}
                  value={value}
                  onChange={(e) => setFormData({
                    ...formData,
                    vitalSigns: { ...formData.vitalSigns, [key]: e.target.value }
                  })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Lab Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Lab Results</h2>
          
          {/* Blood Sugar */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-[#0D6C7E] mb-3">Blood Sugar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(formData.labResults.bloodSugar).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-[#04282E] font-medium mb-2">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg text-black"
                    value={value}
                    onChange={(e) => setFormData({
                      ...formData,
                      labResults: {
                        ...formData.labResults,
                        bloodSugar: { ...formData.labResults.bloodSugar, [key]: e.target.value }
                      }
                    })}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Cholesterol */}
          <div>
            <h3 className="text-lg font-medium text-[#0D6C7E] mb-3">Cholesterol</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(formData.labResults.cholesterol).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-[#04282E] font-medium mb-2">
                    {key.toUpperCase()}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg text-black"
                    value={value}
                    onChange={(e) => setFormData({
                      ...formData,
                      labResults: {
                        ...formData.labResults,
                        cholesterol: { ...formData.labResults.cholesterol, [key]: e.target.value }
                      }
                    })}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor's Findings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Doctor's Findings</h2>
          
          {/* Symptoms */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-[#0D6C7E]">Symptoms</h3>
              <button
                type="button"
                onClick={addSymptom}
                className="text-[#0D6C7E] hover:text-[#0A5A6A]"
              >
                + Add Symptom
              </button>
            </div>
            {formData.doctorFindings.symptoms.map((symptom, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg text-black"
                  value={symptom}
                  onChange={(e) => {
                    const newSymptoms = [...formData.doctorFindings.symptoms]
                    newSymptoms[index] = e.target.value
                    setFormData({
                      ...formData,
                      doctorFindings: {
                        ...formData.doctorFindings,
                        symptoms: newSymptoms
                      }
                    })
                  }}
                />
                {formData.doctorFindings.symptoms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSymptom(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Diagnosis */}
          <div className="mb-4">
            <label className="block text-[#04282E] font-medium mb-2">Diagnosis</label>
            <textarea
              className="w-full p-2 border rounded-lg text-black"
              rows={3}
              value={formData.doctorFindings.diagnosis}
              onChange={(e) => setFormData({
                ...formData,
                doctorFindings: {
                  ...formData.doctorFindings,
                  diagnosis: e.target.value
                }
              })}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[#04282E] font-medium mb-2">Notes</label>
            <textarea
              className="w-full p-2 border rounded-lg text-black"
              rows={4}
              value={formData.doctorFindings.notes}
              onChange={(e) => setFormData({
                ...formData,
                doctorFindings: {
                  ...formData.doctorFindings,
                  notes: e.target.value
                }
              })}
            />
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Allergies</h2>
          
          {/* Medication Allergies */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-[#0D6C7E]">Medication Allergies</h3>
              <button
                type="button"
                onClick={() => addAllergy('medications')}
                className="text-[#0D6C7E] hover:text-[#0A5A6A]"
              >
                + Add Medication Allergy
              </button>
            </div>
            {formData.allergies.medications.map((allergy, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg text-black"
                  value={allergy}
                  onChange={(e) => {
                    const newAllergies = [...formData.allergies.medications]
                    newAllergies[index] = e.target.value
                    setFormData({
                      ...formData,
                      allergies: {
                        ...formData.allergies,
                        medications: newAllergies
                      }
                    })
                  }}
                />
                {formData.allergies.medications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAllergy('medications', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Food Allergies */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium text-[#0D6C7E]">Food Allergies</h3>
              <button
                type="button"
                onClick={() => addAllergy('food')}
                className="text-[#0D6C7E] hover:text-[#0A5A6A]"
              >
                + Add Food Allergy
              </button>
            </div>
            {formData.allergies.food.map((allergy, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg text-black"
                  value={allergy}
                  onChange={(e) => {
                    const newAllergies = [...formData.allergies.food]
                    newAllergies[index] = e.target.value
                    setFormData({
                      ...formData,
                      allergies: {
                        ...formData.allergies,
                        food: newAllergies
                      }
                    })
                  }}
                />
                {formData.allergies.food.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAllergy('food', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Other Allergies */}
          <div>
            <label className="block text-[#04282E] font-medium mb-2">Other Allergies</label>
            <textarea
              className="w-full p-2 border rounded-lg text-black"
              rows={2}
              placeholder="e.g., Dust, Pollen, etc."
              value={formData.allergies.other}
              onChange={(e) => setFormData({
                ...formData,
                allergies: {
                  ...formData.allergies,
                  other: e.target.value
                }
              })}
            />
          </div>
        </div>

        {/* Prescription */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#0D6C7E]">Prescription</h2>
            <button
              type="button"
              onClick={addMedication}
              className="text-[#0D6C7E] hover:text-[#0A5A6A]"
            >
              + Add Medication
            </button>
          </div>
          
          {formData.prescription.medications.map((medication, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-[#0D6C7E]">Medication {index + 1}</h3>
                {formData.prescription.medications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(medication).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-[#04282E] font-medium mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg text-black"
                      value={value}
                      onChange={(e) => {
                        const newMedications = [...formData.prescription.medications]
                        newMedications[index] = {
                          ...newMedications[index],
                          [key]: e.target.value
                        }
                        setFormData({
                          ...formData,
                          prescription: {
                            medications: newMedications
                          }
                        })
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Test Reports */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#0D6C7E]">Test Reports</h2>
            <button
              type="button"
              onClick={addTestReport}
              className="text-[#0D6C7E] hover:text-[#0A5A6A]"
            >
              + Add Test Report
            </button>
          </div>

          {formData.testReports.map((report, index) => (
            <div key={index} className="mb-8 last:mb-0 border-b last:border-0 pb-6 last:pb-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#0D6C7E]">Report {index + 1}</h3>
                {formData.testReports.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTestReport(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#04282E] font-medium mb-2">Test Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg text-black"
                    placeholder="e.g., Complete Blood Count"
                    value={report.name}
                    onChange={(e) => {
                      const newTestReports = [...formData.testReports]
                      newTestReports[index] = { ...report, name: e.target.value }
                      setFormData({ ...formData, testReports: newTestReports })
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[#04282E] font-medium mb-2">Test Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg text-black"
                    value={report.date}
                    onChange={(e) => {
                      const newTestReports = [...formData.testReports]
                      newTestReports[index] = { ...report, date: e.target.value }
                      setFormData({ ...formData, testReports: newTestReports })
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[#04282E] font-medium mb-2">Result</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg text-black"
                    value={report.result}
                    onChange={(e) => {
                      const newTestReports = [...formData.testReports]
                      newTestReports[index] = { ...report, result: e.target.value }
                      setFormData({ ...formData, testReports: newTestReports })
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[#04282E] font-medium mb-2">Normal Range</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg text-black"
                    placeholder="e.g., 4.5-11.0 × 10⁹/L"
                    value={report.normalRange}
                    onChange={(e) => {
                      const newTestReports = [...formData.testReports]
                      newTestReports[index] = { ...report, normalRange: e.target.value }
                      setFormData({ ...formData, testReports: newTestReports })
                    }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[#04282E] font-medium mb-2">Notes</label>
                <textarea
                  className="w-full p-2 border rounded-lg text-black"
                  rows={2}
                  value={report.notes}
                  onChange={(e) => {
                    const newTestReports = [...formData.testReports]
                    newTestReports[index] = { ...report, notes: e.target.value }
                    setFormData({ ...formData, testReports: newTestReports })
                  }}
                />
              </div>

              <div>
                <label className="block text-[#04282E] font-medium mb-2">Upload Files</label>
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(index, e.target.files)}
                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#0D6C7E] file:text-white
                      hover:file:bg-[#0A5A6A] text-black"
                  />
                  {report.files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-[#04282E] mb-1">Uploaded Files:</p>
                      <ul className="space-y-2">
                        {report.files.map((file, fileIndex) => (
                          <li 
                            key={fileIndex} 
                            className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                          >
                            <span className="text-sm text-gray-600">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, fileIndex)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Delete file"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0D6C7E] text-white px-6 py-2 rounded-lg hover:bg-[#0A5A6A] transition-colors duration-200"
          >
            Save Visit Record
          </button>
        </div>
      </form>
    </div>
  )
} 