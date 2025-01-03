'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface NewVisitForm {
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
    other?: Array<{
      name: string;
      value: string;
      unit: string;
    }>;
  };
  symptoms: string[];
  diagnosis: string;
  notes: string;
  prescription: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }>;
  allergies: {
    medications: string[];
    food: string[];
    other: string;
  };
  followUp: {
    required: boolean;
    date?: string;
    notes?: string;
  };
}

export default function NewVisit({ params }: { params: { patientId: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [symptomInput, setSymptomInput] = useState('')
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string;
    name: string;
    url: string;
    type: 'image' | 'pdf';
    reportType: string;
    description: string;
    uploadedAt: string;
  }>>([])
  const [reportType, setReportType] = useState<string>('')
  const [reportDescription, setReportDescription] = useState<string>('')
  const [otherReportType, setOtherReportType] = useState('')

  const [formData, setFormData] = useState<NewVisitForm>({
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
      },
      other: []
    },
    symptoms: [],
    diagnosis: '',
    notes: '',
    prescription: [{
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }],
    allergies: {
      medications: [],
      food: [],
      other: ''
    },
    followUp: {
      required: false
    }
  })

  const handleVitalSignsChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      vitalSigns: {
        ...prev.vitalSigns,
        [field]: value
      }
    }))
  }

  const handleAddSymptom = () => {
    if (symptomInput.trim()) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, symptomInput.trim()]
      }))
      setSymptomInput('')
    }
  }

  const handleRemoveSymptom = (index: number) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter((_, i) => i !== index)
    }))
  }

  const handleAddMedication = () => {
    setFormData(prev => ({
      ...prev,
      prescription: [...prev.prescription, {
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      }]
    }))
  }

  const handleRemoveMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prescription: prev.prescription.filter((_, i) => i !== index)
    }))
  }

  const handleMedicationChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      prescription: prev.prescription.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }))
  }

  const handleSubmit = async (closeAppointment: boolean) => {
    setLoading(true)
    try {
      // Implement your API call here
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulated API call

      if (closeAppointment) {
        // Close appointment logic
        router.push(`/doctors/patient-records/${params.patientId}`)
      } else {
        // Schedule follow-up logic
        setShowFollowUp(true)
      }
    } catch (error) {
      console.error('Error saving visit:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files)
    }
  }

  const handleDeleteFile = async (fileId: string) => {
    try {
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
      alert('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file. Please try again.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || !reportType) return;

    setUploading(true);
    try {
      // Create FormData
      const formData = new FormData();
      
      Array.from(selectedFiles).forEach((file, index) => {
        formData.append(`files`, file); // Changed from file-${index} to files
      });
      
      formData.append('reportType', reportType === 'Other' ? otherReportType : reportType);
      formData.append('description', reportDescription);

      // Here you would make your API call
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000));

      // After successful upload, create file records
      const newFiles = Array.from(selectedFiles).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' as const : 'pdf' as const,
        reportType: reportType === 'Other' ? otherReportType : reportType,
        description: reportDescription,
        uploadedAt: new Date().toISOString()
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);

      // Reset form
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSelectedFiles(null);
      setReportType('');
      setReportDescription('');
      setOtherReportType('');

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-8">
      <div className="max-w-5xl mx-auto">
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
            <h1 className="text-3xl font-bold text-[#0D6C7E]">New Visit</h1>
          </div>
          <Link 
            href={`/doctors/patient-records/${params.patientId}`}
            className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
          >
            Cancel
          </Link>
        </div>

        <form className="space-y-6">
          {/* Vital Signs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Vital Signs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#04282E] mb-1">
                  Blood Pressure
                </label>
                <input
                  type="text"
                  value={formData.vitalSigns.bloodPressure}
                  onChange={(e) => handleVitalSignsChange('bloodPressure', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  placeholder="120/80"
                />
              </div>
              {/* Add other vital signs inputs similarly */}
            </div>
          </div>

          {/* Clinical Notes Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Clinical Notes</h2>
            
            {/* Symptoms */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#04282E] mb-2">
                Symptoms
              </label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSymptom();
                    }
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  placeholder="Enter symptom and press Enter"
                />
                <button
                  type="button"
                  onClick={handleAddSymptom}
                  className="px-4 py-2 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#0A5A6A]"
                >
                  Add
                </button>
              </div>
              {formData.symptoms.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.symptoms.map((symptom, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-[#04282E]">{symptom}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSymptom(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Diagnosis */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#04282E] mb-2">
                Diagnosis
              </label>
              <textarea
                value={formData.diagnosis}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  diagnosis: e.target.value
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                rows={3}
                placeholder="Enter diagnosis details"
              />
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#04282E] mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  notes: e.target.value
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                rows={4}
                placeholder="Enter any additional notes or observations"
              />
            </div>

            {/* Allergies Section */}
            <div>
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-4">Allergies</h3>
              
              {/* Medication Allergies */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#04282E] mb-2">
                  Medication Allergies
                </label>
                <input
                  type="text"
                  placeholder="Enter medication allergy and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        setFormData(prev => ({
                          ...prev,
                          allergies: {
                            ...prev.allergies,
                            medications: [...prev.allergies.medications, value]
                          }
                        }));
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.allergies.medications.map((allergy, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full"
                    >
                      <span>{allergy}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            allergies: {
                              ...prev.allergies,
                              medications: prev.allergies.medications.filter((_, i) => i !== index)
                            }
                          }));
                        }}
                        className="ml-2 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Food Allergies */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#04282E] mb-2">
                  Food Allergies
                </label>
                <input
                  type="text"
                  placeholder="Enter food allergy and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        setFormData(prev => ({
                          ...prev,
                          allergies: {
                            ...prev.allergies,
                            food: [...prev.allergies.food, value]
                          }
                        }));
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.allergies.food.map((allergy, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full"
                    >
                      <span>{allergy}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            allergies: {
                              ...prev.allergies,
                              food: prev.allergies.food.filter((_, i) => i !== index)
                            }
                          }));
                        }}
                        className="ml-2 hover:text-red-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Allergies */}
              <div>
                <label className="block text-sm font-medium text-[#04282E] mb-2">
                  Other Allergies
                </label>
                <textarea
                  value={formData.allergies.other}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    allergies: {
                      ...prev.allergies,
                      other: e.target.value
                    }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  rows={2}
                  placeholder="Enter any other allergies"
                />
              </div>
            </div>
          </div>

          {/* Lab Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-4">Lab Results</h2>
            
            {/* Blood Sugar */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-3">Blood Sugar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#04282E] mb-1">
                    Fasting
                  </label>
                  <input
                    type="text"
                    value={formData.labResults.bloodSugar.fasting}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      labResults: {
                        ...prev.labResults,
                        bloodSugar: {
                          ...prev.labResults.bloodSugar,
                          fasting: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                    placeholder="mg/dL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#04282E] mb-1">
                    Post Prandial
                  </label>
                  <input
                    type="text"
                    value={formData.labResults.bloodSugar.postPrandial}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      labResults: {
                        ...prev.labResults,
                        bloodSugar: {
                          ...prev.labResults.bloodSugar,
                          postPrandial: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                    placeholder="mg/dL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#04282E] mb-1">
                    HbA1c
                  </label>
                  <input
                    type="text"
                    value={formData.labResults.bloodSugar.hba1c}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      labResults: {
                        ...prev.labResults,
                        bloodSugar: {
                          ...prev.labResults.bloodSugar,
                          hba1c: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                    placeholder="%"
                  />
                </div>
              </div>
            </div>

            {/* Cholesterol */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-3">Cholesterol</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#04282E] mb-1">
                    Total Cholesterol
                  </label>
                  <input
                    type="text"
                    value={formData.labResults.cholesterol.total}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      labResults: {
                        ...prev.labResults,
                        cholesterol: {
                          ...prev.labResults.cholesterol,
                          total: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                    placeholder="mg/dL"
                  />
                </div>
                {/* Add similar inputs for HDL, LDL, and Triglycerides */}
              </div>
            </div>

            {/* Other Lab Results */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-[#0D6C7E]">Other Tests</h3>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    labResults: {
                      ...prev.labResults,
                      other: [...(prev.labResults.other || []), { name: '', value: '', unit: '' }]
                    }
                  }))}
                  className="text-[#0D6C7E] hover:text-[#0A5A6A]"
                >
                  + Add Test
                </button>
              </div>
              <div className="space-y-4">
                {formData.labResults.other?.map((test, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input
                        type="text"
                        value={test.name}
                        onChange={(e) => {
                          const newOther = [...(formData.labResults.other || [])];
                          newOther[index] = { ...newOther[index], name: e.target.value };
                          setFormData(prev => ({
                            ...prev,
                            labResults: {
                              ...prev.labResults,
                              other: newOther
                            }
                          }));
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                        placeholder="Test Name"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={test.value}
                        onChange={(e) => {
                          const newOther = [...(formData.labResults.other || [])];
                          newOther[index] = { ...newOther[index], value: e.target.value };
                          setFormData(prev => ({
                            ...prev,
                            labResults: {
                              ...prev.labResults,
                              other: newOther
                            }
                          }));
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                        placeholder="Value"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={test.unit}
                        onChange={(e) => {
                          const newOther = [...(formData.labResults.other || [])];
                          newOther[index] = { ...newOther[index], unit: e.target.value };
                          setFormData(prev => ({
                            ...prev,
                            labResults: {
                              ...prev.labResults,
                              other: newOther
                            }
                          }));
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                        placeholder="Unit"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newOther = formData.labResults.other?.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            labResults: {
                              ...prev.labResults,
                              other: newOther
                            }
                          }));
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prescription */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#0D6C7E]">Prescription</h2>
              <button
                type="button"
                onClick={handleAddMedication}
                className="text-[#0D6C7E] hover:text-[#0A5A6A]"
              >
                + Add Medication
              </button>
            </div>

            <div className="space-y-6">
              {formData.prescription.map((med, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#04282E] mb-1">
                        Medication Name
                      </label>
                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                        placeholder="Enter medication name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#04282E] mb-1">
                        Dosage
                      </label>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                        placeholder="e.g., 500mg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#04282E] mb-1">
                        Frequency
                      </label>
                      <select
                        value={med.frequency}
                        onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                      >
                        <option value="">Select frequency</option>
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">Three times daily</option>
                        <option value="Four times daily">Four times daily</option>
                        <option value="Every 4 hours">Every 4 hours</option>
                        <option value="Every 6 hours">Every 6 hours</option>
                        <option value="Every 8 hours">Every 8 hours</option>
                        <option value="As needed">As needed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#04282E] mb-1">
                        Duration
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={med.duration}
                          onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                          placeholder="e.g., 7 days"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-[#04282E] mb-1">
                      Special Instructions
                    </label>
                    <textarea
                      value={med.instructions}
                      onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                      rows={2}
                      placeholder="Enter any special instructions"
                    />
                  </div>

                  {formData.prescription.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(index)}
                      className="mt-4 text-red-600 hover:text-red-700 text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove Medication
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Test Reports Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#0D6C7E]">Upload Test Reports</h2>
              {uploading && (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-[#0D6C7E] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[#0D6C7E]">Uploading...</span>
                </div>
              )}
            </div>

            {/* Report Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#04282E] mb-2">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
              >
                <option value="">Select Report Type</option>
                <option value="Complete Blood Count">Complete Blood Count</option>
                <option value="Blood Sugar">Blood Sugar</option>
                <option value="Lipid Profile">Lipid Profile</option>
                <option value="Liver Function">Liver Function</option>
                <option value="Kidney Function">Kidney Function</option>
                <option value="Thyroid Function">Thyroid Function</option>
                <option value="Chest X-Ray">Chest X-Ray</option>
                <option value="ECG">ECG</option>
                <option value="MRI">MRI</option>
                <option value="CT Scan">CT Scan</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Endoscopy">Endoscopy</option>
                <option value="Biopsy">Biopsy</option>
                <option value="Urine Analysis">Urine Analysis</option>
                <option value="Stool Analysis">Stool Analysis</option>
                <option value="Culture & Sensitivity">Culture & Sensitivity</option>
                <option value="Pathology">Pathology</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Add conditional field for "Other" report type */}
            {reportType === 'Other' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#04282E] mb-2">
                  Specify Report Type
                </label>
                <input
                  type="text"
                  value={otherReportType}
                  onChange={(e) => setOtherReportType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  placeholder="Enter specific report type"
                  required
                />
              </div>
            )}

            {/* Update the Description field label */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#04282E] mb-2">
                Report Notes
              </label>
              <textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                rows={3}
                placeholder="Enter any additional notes about the report"
              />
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div 
                className="flex flex-col items-center"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const droppedFiles = e.dataTransfer.files;
                  if (droppedFiles?.length > 0) {
                    setSelectedFiles(droppedFiles);
                  }
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept="image/*,.pdf"
                  className="hidden"
                  id="file-upload"
                  disabled={!reportType || (reportType === 'Other' && !otherReportType)}
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
                    reportType && (reportType !== 'Other' || otherReportType)
                      ? 'bg-[#0D6C7E] text-white hover:bg-[#0A5A6A]' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Browse Files
                </label>
                {!reportType ? (
                  <p className="text-red-500 text-sm mt-2">
                    Please select a report type first
                  </p>
                ) : (reportType === 'Other' && !otherReportType) && (
                  <p className="text-red-500 text-sm mt-2">
                    Please specify the report type
                  </p>
                )}
              </div>
            </div>

            {/* Display Selected Files */}
            {selectedFiles && Array.from(selectedFiles).length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-[#04282E] mb-2">Selected Files:</h4>
                <ul className="space-y-2">
                  {Array.from(selectedFiles).map((file, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {file.name}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                          setSelectedFiles(null);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Upload Button */}
            {selectedFiles && Array.from(selectedFiles).length > 0 && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading || !reportType}
                  className="px-4 py-2 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#0A5A6A] disabled:opacity-50 flex items-center space-x-2"
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                      </svg>
                      <span>Upload Files</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Display Uploaded Files Section */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium text-[#0D6C7E] mb-4">Uploaded Files</h3>
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-4">
                      {/* File Icon/Preview */}
                      <div className="flex-shrink-0">
                        {file.type === 'image' ? (
                          <div className="relative w-12 h-12">
                            <Image
                              src={file.url}
                              alt={file.name}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                        ) : (
                          <svg className="w-12 h-12 text-[#0D6C7E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                      </div>

                      {/* File Details */}
                      <div>
                        <p className="font-medium text-[#04282E]">{file.name}</p>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>Type: {file.reportType}</p>
                          {file.description && <p>Notes: {file.description}</p>}
                          <p>Uploaded: {new Date(file.uploadedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                      {/* Preview Button */}
                      <button
                        type="button"
                        onClick={() => window.open(file.url, '_blank')}
                        className="text-[#0D6C7E] hover:text-[#0A5A6A] flex items-center space-x-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-sm">View</span>
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this file?')) {
                            handleDeleteFile(file.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Close Appointment'}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="px-6 py-3 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#0A5A6A] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Schedule Follow-up'}
            </button>
          </div>
        </form>

        {/* Follow-up Modal */}
        {showFollowUp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-[#0D6C7E] mb-4">Schedule Follow-up</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#04282E] mb-1">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      followUp: {
                        ...prev.followUp,
                        required: true,
                        date: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#04282E] mb-1">
                    Notes
                  </label>
                  <textarea
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      followUp: {
                        ...prev.followUp,
                        notes: e.target.value
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                    rows={3}
                    placeholder="Add any follow-up notes"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowFollowUp(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => router.push(`/doctors/patient-records/${params.patientId}`)}
                    className="px-4 py-2 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#0A5A6A]"
                  >
                    Schedule & Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 