'use client'

interface DoctorDetailsProps {
  doctor: {
    id: string;
    name: string;
    employeeId: string;
    specialization: string;
    department: string;
    expertise: string[];
    qualifications: string[];
    experience: number;
    previousWorkplaces: string[];
    position: string;
    schedule: {
      days: string[];
      timeSlots: string;
    };
    contact: {
      email: string;
      phone: string;
      office: string;
    };
    statistics: {
      totalPatients: number;
      ongoingPatients: number;
      rating: number;
    };
    status: 'active' | 'inactive' | 'on-leave';
  };
  onClose: () => void;
}

export default function DoctorDetails({ doctor, onClose }: DoctorDetailsProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Doctor Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="col-span-1">
            <div className="text-center mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-semibold text-gray-600">
                  {doctor.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-semibold mt-2">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.employeeId}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <p>Email: {doctor.contact.email}</p>
              <p>Phone: {doctor.contact.phone}</p>
              <p>Office: {doctor.contact.office}</p>
            </div>
          </div>

          {/* Middle Column - Professional Info */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Specialization</h4>
                <p>Department: {doctor.department}</p>
                <p>Expertise:</p>
                <ul className="list-disc list-inside">
                  {doctor.expertise.map((exp, index) => (
                    <li key={index}>{exp}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Qualifications</h4>
                <ul className="list-disc list-inside">
                  {doctor.qualifications.map((qual, index) => (
                    <li key={index}>{qual}</li>
                  ))}
                </ul>
                <p className="mt-2">Experience: {doctor.experience} years</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Schedule</h4>
                <p>Days: {doctor.schedule.days.join(', ')}</p>
                <p>Hours: {doctor.schedule.timeSlots}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Statistics</h4>
                <p>Total Patients: {doctor.statistics.totalPatients}</p>
                <p>Current Patients: {doctor.statistics.ongoingPatients}</p>
                <p>Rating: {doctor.statistics.rating}/5</p>
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
            Print Profile
          </button>
        </div>
      </div>
    </div>
  )
} 