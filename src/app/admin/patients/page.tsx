'use client';
import { useState } from 'react';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  medicalHistory: string;
  lastVisit: string;
}

export default function PatientRecordsPage() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      email: 'john@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      medicalHistory: 'No major issues',
      lastVisit: '2024-03-15',
    },
    // Add more sample patients as needed
  ]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setEditedPatient(patient);
    setEditMode(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedPatient(prev => prev ? {
      ...prev,
      [name]: value
    } : null);
  };

  const handleUpdate = () => {
    if (editedPatient) {
      setPatients(prev => prev.map(p => 
        p.id === editedPatient.id ? editedPatient : p
      ));
      setEditMode(false);
      setSelectedPatient(null);
      setEditedPatient(null);
    }
  };

  return (
    <div className="p-8 bg-[#F4F4F4] min-h-screen">
      <h1 className="text-3xl font-bold text-[#0D6C7E] mb-6">Patient Records</h1>

      {/* Patient List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Visit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.firstName} {patient.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.dateOfBirth}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient.lastVisit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="text-[#0D6C7E] hover:text-[#0A5A6A] mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="text-[#0D6C7E] hover:text-[#0A5A6A]"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/View Modal */}
      {(selectedPatient || editMode) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#0D6C7E]">
                {editMode ? 'Edit Patient Record' : 'Patient Details'}
              </h2>
              <button
                onClick={() => {
                  setSelectedPatient(null);
                  setEditMode(false);
                  setEditedPatient(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedPatient?.firstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p>{selectedPatient?.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedPatient?.lastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p>{selectedPatient?.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Date of Birth
                </label>
                {editMode ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editedPatient?.dateOfBirth}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p>{selectedPatient?.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Gender
                </label>
                {editMode ? (
                  <select
                    name="gender"
                    value={editedPatient?.gender}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="capitalize">{selectedPatient?.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={editedPatient?.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p>{selectedPatient?.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Phone
                </label>
                {editMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedPatient?.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                ) : (
                  <p>{selectedPatient?.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Address
                </label>
                {editMode ? (
                  <textarea
                    name="address"
                    value={editedPatient?.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                  />
                ) : (
                  <p>{selectedPatient?.address}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Medical History
                </label>
                {editMode ? (
                  <textarea
                    name="medicalHistory"
                    value={editedPatient?.medicalHistory}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                  />
                ) : (
                  <p>{selectedPatient?.medicalHistory}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedPatient(null);
                  setEditMode(false);
                  setEditedPatient(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              {editMode && (
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-[#0D6C7E] text-white rounded-md hover:bg-[#0A5A6A]"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 