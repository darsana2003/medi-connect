'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface PatientRecord {
  id: string;
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
  };
}

interface AppointmentUpdate {
  diagnosis: string;
  prescription: string;
  notes: string;
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
  };
}

export default function PatientRecords({ params }: { params: { patientId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientName = searchParams.get('name') || 'Patient'
  const [records, setRecords] = useState<PatientRecord[]>([
    {
      id: '1',
      date: '2024-03-15',
      diagnosis: 'Common Cold',
      prescription: 'Paracetamol 500mg - 1 tablet every 6 hours\nVitamin C 500mg - 1 tablet daily',
      notes: 'Patient reported fever and sore throat for 2 days. Follow-up recommended after 3 days if symptoms persist.',
      vitals: {
        bloodPressure: '120/80',
        heartRate: '72',
        temperature: '38.2'
      }
    },
    {
      id: '2',
      date: '2024-02-28',
      diagnosis: 'Seasonal Allergies',
      prescription: 'Cetirizine 10mg - 1 tablet daily\nNasal spray - 2 sprays each nostril twice daily',
      notes: 'Patient experiencing seasonal allergies. Advised to avoid outdoor activities during high pollen count.',
      vitals: {
        bloodPressure: '118/78',
        heartRate: '76',
        temperature: '37.0'
      }
    }
  ])
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateForm, setUpdateForm] = useState<AppointmentUpdate>({
    diagnosis: '',
    prescription: '',
    notes: '',
    vitals: {
      bloodPressure: '',
      heartRate: '',
      temperature: ''
    }
  })

  const getVitalColor = (type: string, value: string) => {
    switch (type) {
      case 'bloodPressure':
        const [systolic] = value.split('/')
        return parseInt(systolic) > 140 ? 'text-red-600' : 'text-green-600'
      case 'heartRate':
        return parseInt(value) > 100 ? 'text-red-600' : 'text-green-600'
      case 'temperature':
        return parseFloat(value) > 37.5 ? 'text-red-600' : 'text-green-600'
      default:
        return 'text-[#04282E]'
    }
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your API call here to save the appointment update
    
    // Add new record to the list
    setRecords(prev => [{
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...updateForm
    }, ...prev])

    // Reset form and close update panel
    setIsUpdating(false)
    setUpdateForm({
      diagnosis: '',
      prescription: '',
      notes: '',
      vitals: {
        bloodPressure: '',
        heartRate: '',
        temperature: ''
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/medib.jpg"
                alt="MediConnect Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <h1 className="ml-4 text-2xl font-bold text-[#0D6C7E]">Patient Records</h1>
            </div>
            <button
              onClick={() => router.back()}
              className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E0E0E0] p-6">
          <div className="mb-8 border-b border-[#E0E0E0] pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0D6C7E]">{patientName}</h2>
              <p className="text-[#04282E] mt-2 text-lg">
                Patient ID: <span className="font-medium">{params.patientId}</span>
              </p>
            </div>
            <button
              onClick={() => setIsUpdating(true)}
              className="bg-[#0D6C7E] text-white px-6 py-3 rounded-lg hover:bg-[#08505D] 
                       transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Update Current Visit</span>
            </button>
          </div>

          {isUpdating && (
            <div className="mb-8">
              <div className="bg-[#F8FAFC] p-6 rounded-xl border-2 border-[#0D6C7E] mb-8">
                <h3 className="text-xl font-bold text-[#0D6C7E] mb-6">Update Current Visit</h3>
                <form onSubmit={handleUpdateSubmit} className="space-y-6">
                  {/* Vitals Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#04282E] mb-2">
                        Blood Pressure (mmHg)
                      </label>
                      <input
                        type="text"
                        value={updateForm.vitals.bloodPressure}
                        onChange={(e) => setUpdateForm({
                          ...updateForm,
                          vitals: { ...updateForm.vitals, bloodPressure: e.target.value }
                        })}
                        className="w-full px-4 py-3 text-lg border border-[#E0E0E0] rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                        placeholder="e.g., 120/80"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#04282E] mb-2">
                        Heart Rate (bpm)
                      </label>
                      <input
                        type="number"
                        value={updateForm.vitals.heartRate}
                        onChange={(e) => setUpdateForm({
                          ...updateForm,
                          vitals: { ...updateForm.vitals, heartRate: e.target.value }
                        })}
                        className="w-full px-4 py-3 text-lg border border-[#E0E0E0] rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                        placeholder="e.g., 72"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#04282E] mb-2">
                        Temperature (°C)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={updateForm.vitals.temperature}
                        onChange={(e) => setUpdateForm({
                          ...updateForm,
                          vitals: { ...updateForm.vitals, temperature: e.target.value }
                        })}
                        className="w-full px-4 py-3 text-lg border border-[#E0E0E0] rounded-lg 
                                 focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                        placeholder="e.g., 37.0"
                        required
                      />
                    </div>
                  </div>

                  {/* Diagnosis */}
                  <div>
                    <label className="block text-sm font-semibold text-[#04282E] mb-2">
                      Diagnosis
                    </label>
                    <input
                      type="text"
                      value={updateForm.diagnosis}
                      onChange={(e) => setUpdateForm({ ...updateForm, diagnosis: e.target.value })}
                      className="w-full px-4 py-3 text-lg border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                      placeholder="Enter diagnosis"
                      required
                    />
                  </div>

                  {/* Prescription */}
                  <div>
                    <label className="block text-sm font-semibold text-[#04282E] mb-2">
                      Prescription
                    </label>
                    <textarea
                      value={updateForm.prescription}
                      onChange={(e) => setUpdateForm({ ...updateForm, prescription: e.target.value })}
                      className="w-full px-4 py-3 text-lg border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                      placeholder="Enter prescription details (one per line)"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-semibold text-[#04282E] mb-2">
                      Clinical Notes
                    </label>
                    <textarea
                      value={updateForm.notes}
                      onChange={(e) => setUpdateForm({ ...updateForm, notes: e.target.value })}
                      className="w-full px-4 py-3 text-lg border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                      placeholder="Enter clinical notes"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsUpdating(false)}
                      className="px-6 py-3 border border-[#0D6C7E] text-[#0D6C7E] rounded-lg 
                               hover:bg-[#F8FAFC] transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#0D6C7E] text-white rounded-lg 
                               hover:bg-[#08505D] transition-colors duration-200"
                    >
                      Save & Close Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="space-y-8">
            {records.map((record) => (
              <div 
                key={record.id}
                className="border-2 border-[#E0E0E0] rounded-lg p-6 space-y-6 hover:border-[#0D6C7E] transition-colors duration-200"
              >
                <div className="flex justify-between items-start border-b border-[#E0E0E0] pb-4">
                  <h3 className="text-xl font-bold text-[#0D6C7E]">
                    Visit Date: {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#F8FAFC] p-6 rounded-xl border-2 border-[#E0E0E0] hover:border-[#0D6C7E] transition-all duration-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-[#0D6C7E] uppercase tracking-wider">Blood Pressure</p>
                      <span className="bg-[#0D6C7E] text-white text-xs px-2 py-1 rounded">mmHg</span>
                    </div>
                    <p className={`text-4xl font-bold ${getVitalColor('bloodPressure', record.vitals.bloodPressure)}`}>
                      {record.vitals.bloodPressure}
                    </p>
                    <p className="text-xs text-[#ADADAD] mt-2">Normal range: 90/60 - 120/80</p>
                  </div>

                  <div className="bg-[#F8FAFC] p-6 rounded-xl border-2 border-[#E0E0E0] hover:border-[#0D6C7E] transition-all duration-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-[#0D6C7E] uppercase tracking-wider">Heart Rate</p>
                      <span className="bg-[#0D6C7E] text-white text-xs px-2 py-1 rounded">bpm</span>
                    </div>
                    <p className={`text-4xl font-bold ${getVitalColor('heartRate', record.vitals.heartRate)}`}>
                      {record.vitals.heartRate}
                    </p>
                    <p className="text-xs text-[#ADADAD] mt-2">Normal range: 60-100</p>
                  </div>

                  <div className="bg-[#F8FAFC] p-6 rounded-xl border-2 border-[#E0E0E0] hover:border-[#0D6C7E] transition-all duration-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-[#0D6C7E] uppercase tracking-wider">Temperature</p>
                      <span className="bg-[#0D6C7E] text-white text-xs px-2 py-1 rounded">°C</span>
                    </div>
                    <p className={`text-4xl font-bold ${getVitalColor('temperature', record.vitals.temperature)}`}>
                      {record.vitals.temperature}
                    </p>
                    <p className="text-xs text-[#ADADAD] mt-2">Normal range: 36.1-37.2</p>
                  </div>
                </div>

                <div className="space-y-6 bg-white p-6 rounded-lg">
                  <div>
                    <h4 className="text-lg font-semibold text-[#0D6C7E] mb-2">Diagnosis</h4>
                    <p className="text-lg text-[#04282E] bg-[#F8FAFC] p-3 rounded-lg">
                      {record.diagnosis}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#0D6C7E] mb-2">Prescription</h4>
                    <div className="bg-[#F8FAFC] p-3 rounded-lg">
                      {record.prescription.split('\n').map((line, index) => (
                        <p key={index} className="text-lg text-[#04282E] mb-2 last:mb-0">
                          • {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#0D6C7E] mb-2">Clinical Notes</h4>
                    <p className="text-lg text-[#04282E] bg-[#F8FAFC] p-3 rounded-lg whitespace-pre-line">
                      {record.notes}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 