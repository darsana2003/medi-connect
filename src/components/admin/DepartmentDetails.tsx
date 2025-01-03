'use client'

import Image from 'next/image'

export default function DepartmentDetails({ department, onClose }: { department: any, onClose: () => void }) {
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

            <div className="space-y-6">
              {/* Department Header */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{department.name}</h3>
                <p className="mt-1 text-gray-500">{department.description}</p>
              </div>

              {/* Head of Department */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Head of Department</h4>
                <div className="flex items-center">
                  <Image
                    className="h-16 w-16 rounded-full"
                    src={department.hod.photo}
                    alt=""
                    width={64}
                    height={64}
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{department.hod.name}</p>
                    <p className="text-sm text-gray-500">{department.hod.specialization}</p>
                    <p className="text-sm text-gray-500">{department.hod.yearsOfService} years of service</p>
                  </div>
                </div>
              </div>

              {/* Staff Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Staff Information</h4>
                <dl className="grid grid-cols-3 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Doctors</dt>
                    <dd className="text-sm font-medium text-gray-900">{department.staff.doctors}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Nurses</dt>
                    <dd className="text-sm font-medium text-gray-900">{department.staff.nurses}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Support Staff</dt>
                    <dd className="text-sm font-medium text-gray-900">{department.staff.support}</dd>
                  </div>
                </dl>
              </div>

              {/* Facilities */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Facilities & Equipment</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Equipment</h5>
                    <ul className="grid grid-cols-2 gap-4">
                      {department.facilities.equipment.map((item: any) => (
                        <li key={item.name} className="text-sm text-gray-600">
                          {item.name} ({item.quantity}) - {item.status}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Special Treatment Areas</h5>
                    <ul className="grid grid-cols-2 gap-2">
                      {department.facilities.specialTreatmentAreas.map((area: string) => (
                        <li key={area} className="text-sm text-gray-600">{area}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Operational Hours */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Operational Hours</h4>
                <dl className="grid grid-cols-3 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Weekdays</dt>
                    <dd className="text-sm font-medium text-gray-900">{department.operationalHours.weekdays}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Weekends</dt>
                    <dd className="text-sm font-medium text-gray-900">{department.operationalHours.weekends}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Emergency</dt>
                    <dd className="text-sm font-medium text-gray-900">{department.operationalHours.emergency}</dd>
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