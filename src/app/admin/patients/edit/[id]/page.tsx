'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditPatient() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id;

  const [patient, setPatient] = useState({
    name: '',
    date: '',
    department: '',
    doctor: '',
  });

  useEffect(() => {
    // In a real app, fetch patient data from your API
    // For now, we'll simulate it
    const fetchPatient = async () => {
      // Replace with actual API call
      const data = {
        name: 'John Smith',
        date: '2024-01-04',
        department: 'Cardiology',
        doctor: 'Dr. Emily White',
      };
      setPatient(data);
    };

    fetchPatient();
  }, [patientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the form submission here
    // Make API call to update patient
    
    // Navigate back to patient list
    router.push('/admin/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">Edit Patient</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient Name
            </label>
            <input
              type="text"
              value={patient.name}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={patient.date}
              onChange={(e) => setPatient({ ...patient, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              value={patient.department}
              onChange={(e) => setPatient({ ...patient, department: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor
            </label>
            <input
              type="text"
              value={patient.doctor}
              onChange={(e) => setPatient({ ...patient, doctor: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 