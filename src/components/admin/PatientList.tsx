'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PatientDetails from './PatientDetails';

interface Patient {
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
}

export default function PatientList() {
  const router = useRouter();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Updated patient data with 2 more patients
  const patients: Patient[] = [
    {
      id: '1',
      name: 'John Smith',
      date: 'January 4, 2024',
      department: 'Cardiology',
      doctor: 'Dr. Emily White',
      age: 45,
      gender: 'Male',
      contactInfo: '(555) 123-4567',
      medicalHistory: 'Hypertension, High Cholesterol',
      upcomingAppointments: [
        {
          date: '2024-01-15',
          doctor: 'Dr. Emily White',
          type: 'Follow-up'
        }
      ],
      recentPrescriptions: [
        {
          medication: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily'
        }
      ]
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      date: 'January 3, 2024',
      department: 'Neurology',
      doctor: 'Dr. Michael Brown',
      age: 35,
      gender: 'Female',
      contactInfo: '(555) 234-5678',
      medicalHistory: 'Migraine, Anxiety',
      upcomingAppointments: [
        {
          date: '2024-01-20',
          doctor: 'Dr. Michael Brown',
          type: 'Check-up'
        }
      ],
      recentPrescriptions: [
        {
          medication: 'Sumatriptan',
          dosage: '50mg',
          frequency: 'As needed'
        }
      ]
    },
    {
      id: '3',
      name: 'Michael Thompson',
      date: 'January 2, 2024',
      department: 'Orthopedics',
      doctor: 'Dr. Sarah Wilson',
      age: 52,
      gender: 'Male',
      contactInfo: '(555) 345-6789',
      medicalHistory: 'Knee Surgery, Arthritis',
      upcomingAppointments: [
        {
          date: '2024-01-18',
          doctor: 'Dr. Sarah Wilson',
          type: 'Post-surgery Follow-up'
        },
        {
          date: '2024-02-01',
          doctor: 'Dr. James Lee',
          type: 'Physical Therapy'
        }
      ],
      recentPrescriptions: [
        {
          medication: 'Ibuprofen',
          dosage: '600mg',
          frequency: 'Twice daily'
        },
        {
          medication: 'Celebrex',
          dosage: '200mg',
          frequency: 'Once daily'
        }
      ]
    },
    {
      id: '4',
      name: 'Emily Davis',
      date: 'January 1, 2024',
      department: 'Endocrinology',
      doctor: 'Dr. Robert Chen',
      age: 29,
      gender: 'Female',
      contactInfo: '(555) 456-7890',
      medicalHistory: 'Type 1 Diabetes, Thyroid Disorder',
      upcomingAppointments: [
        {
          date: '2024-01-25',
          doctor: 'Dr. Robert Chen',
          type: 'Regular Check-up'
        },
        {
          date: '2024-02-15',
          doctor: 'Dr. Lisa Wang',
          type: 'Thyroid Evaluation'
        }
      ],
      recentPrescriptions: [
        {
          medication: 'Insulin Glargine',
          dosage: '25 units',
          frequency: 'Once daily'
        },
        {
          medication: 'Levothyroxine',
          dosage: '75mcg',
          frequency: 'Once daily in the morning'
        }
      ]
    }
  ];

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleEdit = (patientId: string) => {
    router.push(`/admin/patients/edit/${patientId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold">Patient List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
        {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.doctor}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
              <button
                      onClick={() => handleView(patient)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                View Details
              </button>
                    <button
                      onClick={() => handleEdit(patient.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
            </div>
                </td>
              </tr>
        ))}
          </tbody>
        </table>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
} 