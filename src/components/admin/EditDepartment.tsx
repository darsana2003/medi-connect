'use client';

import { useState } from 'react';

interface EditDepartmentProps {
  department: {
    id: string;
    name: string;
    departmentId: string;
    description: string;
    headOfDepartment: {
      name: string;
      yearsOfService: number;
      specialization: string;
      contact: {
        email: string;
        phone: string;
        office: string;
      };
    };
    staff: {
      totalDoctors: number;
      totalNurses: number;
      totalSupportStaff: number;
      keyStaffMembers: Array<{
        name: string;
        role: string;
        specialization: string;
      }>;
    };
    patientInfo: {
      currentPatients: number;
      totalBeds: number;
      availableBeds: number;
    };
    facilities: {
      equipment: string[];
      specialTreatmentAreas: string[];
      ongoingProjects: string[];
    };
    operationalHours: {
      weekdays: string;
      weekends: string;
      emergencyContact: string;
    };
    performance: {
      successRate: number;
      monthlyTurnover: number;
      patientFeedback: number;
    };
  };
  onClose: () => void;
  onSave: (department: any) => void;
}

export default function EditDepartment({ department, onClose, onSave }: EditDepartmentProps) {
  const [formData, setFormData] = useState(department);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Edit Department</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Department Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department ID</label>
              <input
                type="text"
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Head of Department */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">HOD Name</label>
              <input
                type="text"
                value={formData.headOfDepartment.name}
                onChange={(e) => setFormData({
                  ...formData,
                  headOfDepartment: { ...formData.headOfDepartment, name: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Service</label>
              <input
                type="number"
                value={formData.headOfDepartment.yearsOfService}
                onChange={(e) => setFormData({
                  ...formData,
                  headOfDepartment: { ...formData.headOfDepartment, yearsOfService: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Staff Information */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Doctors</label>
              <input
                type="number"
                value={formData.staff.totalDoctors}
                onChange={(e) => setFormData({
                  ...formData,
                  staff: { ...formData.staff, totalDoctors: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Nurses</label>
              <input
                type="number"
                value={formData.staff.totalNurses}
                onChange={(e) => setFormData({
                  ...formData,
                  staff: { ...formData.staff, totalNurses: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Support Staff</label>
              <input
                type="number"
                value={formData.staff.totalSupportStaff}
                onChange={(e) => setFormData({
                  ...formData,
                  staff: { ...formData.staff, totalSupportStaff: parseInt(e.target.value) }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 