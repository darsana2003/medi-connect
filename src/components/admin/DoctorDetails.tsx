'use client'

import Image from 'next/image'

export default function DoctorDetails({ doctor, onClose }: { doctor: any, onClose: () => void }) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center mb-6">
              <div className="h-24 w-24 flex-shrink-0">
                <Image
                  className="h-24 w-24 rounded-full"
                  src={doctor.photo}
                  alt=""
                  width={96}
                  height={96}
                />
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-gray-500">{doctor.employeeId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Gender</dt>
                    <dd className="text-sm font-medium text-gray-900">{doctor.gender}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Age</dt>
                    <dd className="text-sm font-medium text-gray-900">{doctor.age} years</dd>
                  </div>
                </dl>
              </div>

              {/* Specialization */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Specialization</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Department</dt>
                    <dd className="text-sm font-medium text-gray-900">{doctor.department}</dd>
                  </div>
                  {doctor.subSpecialty && (
                    <div>
                      <dt className="text-sm text-gray-500">Sub-specialty</dt>
                      <dd className="text-sm font-medium text-gray-900">{doctor.subSpecialty}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Professional Information */}
              <div className="col-span-2">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h4>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Qualifications</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {doctor.qualifications.join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Experience</dt>
                    <dd className="text-sm font-medium text-gray-900">{doctor.experience} years</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Previous Workplaces</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {doctor.previousWorkplaces.join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Current Position</dt>
                    <dd className="text-sm font-medium text-gray-900">{doctor.position}</dd>
                  </div>
                </dl>
              </div>

              {/* Work Schedule */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Work Schedule</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Available Days</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {doctor.availability.days.join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Time Slots</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {doctor.availability.timeSlots.join(', ')}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">On-Call Status</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {doctor.onCall ? 'Available for Emergency' : 'Not Available'}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Patient Statistics */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Patient Statistics</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Total Patients</dt>
                    <dd className="text-sm font-medium text-gray-900">{doctor.statistics.totalPatients}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Active Patients</dt>
                    <dd className="text-sm font-medium text-gray-900">{doctor.statistics.activePatients}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 