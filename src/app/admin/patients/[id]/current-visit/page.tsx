'use client';
import { useState } from 'react';
import Link from 'next/link';

interface CurrentVisit {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  diagnosis: string;
  prescription: string;
  status: 'ongoing' | 'completed' | 'rescheduled';
  rescheduleTime?: string;
}

export default function CurrentVisitPage({ params }: { params: { id: string } }) {
  const [visitData, setVisitData] = useState<CurrentVisit>({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    diagnosis: '',
    prescription: '',
    status: 'ongoing',
    rescheduleTime: ''
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVisitData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsUpdated(false);
  };

  const handleCompleteAppointment = () => {
    setVisitData(prev => ({
      ...prev,
      status: 'completed'
    }));
    handleSubmit();
  };

  const handleReschedule = () => {
    if (!visitData.rescheduleTime) {
      alert('Please select a reschedule time');
      return;
    }
    setVisitData(prev => ({
      ...prev,
      status: 'rescheduled'
    }));
    handleSubmit();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Here you would typically save to your backend
    console.log('Saving visit data:', visitData);
    setIsUpdated(true);
    if (visitData.status === 'completed') {
      // Redirect to completed appointment summary or dashboard
      console.log('Appointment completed');
    } else if (visitData.status === 'rescheduled') {
      // Handle rescheduling logic
      console.log('Appointment rescheduled to:', visitData.rescheduleTime);
    }
  };

  return (
    <div className="p-8 bg-[#F4F4F4] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0D6C7E]">Patient Records</h1>
          <p className="text-lg text-gray-600">Patient ID: {params.id}</p>
        </div>
        <Link 
          href="/admin/patients" 
          className="text-[#0D6C7E] hover:text-[#0A5A6A]"
        >
          Back to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#0D6C7E]">Update Current Visit</h2>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowReschedule(true)}
              className="px-4 py-2 text-[#0D6C7E] border border-[#0D6C7E] rounded-md hover:bg-[#0D6C7E] hover:text-white transition-colors"
            >
              Reschedule
            </button>
            <button
              type="button"
              onClick={handleCompleteAppointment}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Complete Appointment
            </button>
          </div>
        </div>

        {/* Reschedule Modal */}
        {showReschedule && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-semibold text-[#0D6C7E] mb-4">Reschedule Appointment</h3>
              <div className="mb-4">
                <label className="block text-[#0D6C7E] font-medium mb-2">Select New Time</label>
                <input
                  type="time"
                  name="rescheduleTime"
                  value={visitData.rescheduleTime}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md text-black font-semibold text-lg"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReschedule(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReschedule}
                  className="px-4 py-2 bg-[#0D6C7E] text-white rounded-md hover:bg-[#0A5A6A]"
                >
                  Confirm Reschedule
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-[#0D6C7E] font-medium mb-2">Blood Pressure (mmHg)</label>
            <input
              type="text"
              name="bloodPressure"
              value={visitData.bloodPressure}
              onChange={handleChange}
              placeholder="e.g., 120/80"
              className="w-full p-2 border rounded-md focus:border-[#0D6C7E] focus:ring-1 focus:ring-[#0D6C7E] text-black font-bold text-lg placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-[#0D6C7E] font-medium mb-2">Heart Rate (bpm)</label>
            <input
              type="text"
              name="heartRate"
              value={visitData.heartRate}
              onChange={handleChange}
              placeholder="e.g., 72"
              className="w-full p-2 border rounded-md focus:border-[#0D6C7E] focus:ring-1 focus:ring-[#0D6C7E] text-black font-bold text-lg placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-[#0D6C7E] font-medium mb-2">Temperature (°C)</label>
            <input
              type="text"
              name="temperature"
              value={visitData.temperature}
              onChange={handleChange}
              placeholder="e.g., 37.0"
              className="w-full p-2 border rounded-md focus:border-[#0D6C7E] focus:ring-1 focus:ring-[#0D6C7E] text-black font-bold text-lg placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[#0D6C7E] font-medium mb-2">Diagnosis</label>
            <textarea
              name="diagnosis"
              value={visitData.diagnosis}
              onChange={handleChange}
              placeholder="Enter diagnosis"
              rows={3}
              className="w-full p-2 border rounded-md focus:border-[#0D6C7E] focus:ring-1 focus:ring-[#0D6C7E] text-black font-bold text-lg placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-[#0D6C7E] font-medium mb-2">Prescription</label>
            <textarea
              name="prescription"
              value={visitData.prescription}
              onChange={handleChange}
              placeholder="Enter prescription details (one per line)"
              rows={4}
              className="w-full p-2 border rounded-md focus:border-[#0D6C7E] focus:ring-1 focus:ring-[#0D6C7E] text-black font-bold text-lg placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Status Display */}
        {visitData.status !== 'ongoing' && (
          <div className={`mt-4 p-4 rounded-md ${
            visitData.status === 'completed' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {visitData.status === 'completed' 
              ? 'Appointment completed successfully!'
              : `Appointment rescheduled to: ${visitData.rescheduleTime}`
            }
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-[#0D6C7E] text-white px-6 py-2 rounded-md hover:bg-[#0A5A6A] transition-colors"
          >
            Update Current Visit
          </button>
        </div>

        {isUpdated && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
            Visit details updated successfully!
          </div>
        )}
      </form>

      {/* Display entered data with updated styling */}
      {(visitData.bloodPressure || visitData.heartRate || visitData.temperature || visitData.diagnosis || visitData.prescription) && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-[#0D6C7E] mb-4">Current Visit Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {visitData.bloodPressure && (
              <div>
                <p className="font-medium text-[#0D6C7E]">Blood Pressure:</p>
                <p className="text-[#04282E] font-medium text-lg">{visitData.bloodPressure} mmHg</p>
              </div>
            )}
            {visitData.heartRate && (
              <div>
                <p className="font-medium text-[#0D6C7E]">Heart Rate:</p>
                <p className="text-[#04282E] font-medium text-lg">{visitData.heartRate} bpm</p>
              </div>
            )}
            {visitData.temperature && (
              <div>
                <p className="font-medium text-[#0D6C7E]">Temperature:</p>
                <p className="text-[#04282E] font-medium text-lg">{visitData.temperature} °C</p>
              </div>
            )}
          </div>
          {visitData.diagnosis && (
            <div className="mb-4">
              <p className="font-medium text-[#0D6C7E]">Diagnosis:</p>
              <p className="whitespace-pre-wrap text-[#04282E] font-medium">{visitData.diagnosis}</p>
            </div>
          )}
          {visitData.prescription && (
            <div>
              <p className="font-medium text-[#0D6C7E]">Prescription:</p>
              <p className="whitespace-pre-wrap text-[#04282E] font-medium">{visitData.prescription}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 