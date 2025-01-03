'use client'

export default function PatientDetails({ patient, onClose }: { patient: any, onClose: () => void }) {
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

            {/* Rest of your content remains the same */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Patient Profile</h3>

            {/* Personal Information */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="text-sm font-medium text-gray-900">{patient.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-sm font-medium text-gray-900">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="text-sm font-medium text-gray-900">{patient.contactNumber}</p>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Medical History</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Conditions</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {patient.medicalHistory.conditions.map((condition: string) => (
                      <span key={condition} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Allergies</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {patient.medicalHistory.allergies.map((allergy: string) => (
                      <span key={allergy} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment History */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Appointment History</h4>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Doctor</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {patient.appointments.map((appointment: any) => (
                      <tr key={appointment.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appointment.doctorName}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{appointment.department}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Treatment Plan */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Treatment Plan</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-900 mb-2">{patient.treatmentPlan.description}</p>
                <p className="text-sm text-gray-500 mb-4">Started: {new Date(patient.treatmentPlan.startDate).toLocaleDateString()}</p>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">Goals:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    {patient.treatmentPlan.goals.map((goal: string, index: number) => (
                      <li key={index}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Doctor's Notes */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Notes & Observations</h4>
              <div className="space-y-4">
                {patient.notes.map((note: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-900">{note.doctorName}</p>
                      <p className="text-sm text-gray-500">{new Date(note.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-gray-600">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 