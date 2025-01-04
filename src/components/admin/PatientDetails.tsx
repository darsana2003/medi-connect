'use client'

import { useState } from 'react'

interface PatientDetailsProps {
  patient: {
    id: string;
    name: string;
    date: string;
    department: string;
    doctor: string;
    age: number;
    gender: string;
    contactInfo: string;
    medicalHistory: string;
    upcomingAppointments: {
      date: string;
      doctor: string;
      type: string;
    }[];
    recentPrescriptions: {
      medication: string;
      dosage: string;
      frequency: string;
    }[];
  };
  onClose: () => void;
}

export default function PatientDetails({ patient, onClose }: PatientDetailsProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Patient Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Name:</span> {patient.name}</p>
                <p><span className="font-medium">Age:</span> {patient.age}</p>
                <p><span className="font-medium">Gender:</span> {patient.gender}</p>
                <p><span className="font-medium">Contact:</span> {patient.contactInfo}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Medical Information</h3>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Department:</span> {patient.department}</p>
                <p><span className="font-medium">Primary Doctor:</span> {patient.doctor}</p>
                <p><span className="font-medium">Medical History:</span> {patient.medicalHistory}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Upcoming Appointments</h3>
              <div className="mt-2 space-y-2">
                {patient.upcomingAppointments.map((appointment, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded">
                    <p><span className="font-medium">Date:</span> {appointment.date}</p>
                    <p><span className="font-medium">Doctor:</span> {appointment.doctor}</p>
                    <p><span className="font-medium">Type:</span> {appointment.type}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Recent Prescriptions</h3>
              <div className="mt-2 space-y-2">
                {patient.recentPrescriptions.map((prescription, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded">
                    <p><span className="font-medium">Medication:</span> {prescription.medication}</p>
                    <p><span className="font-medium">Dosage:</span> {prescription.dosage}</p>
                    <p><span className="font-medium">Frequency:</span> {prescription.frequency}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Print Details
          </button>
        </div>
      </div>
    </div>
  );
} 