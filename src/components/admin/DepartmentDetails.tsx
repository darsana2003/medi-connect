'use client'

interface DepartmentDetailsProps {
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
}

export default function DepartmentDetails({ department, onClose }: DepartmentDetailsProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Department Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
            <p><span className="font-medium">Department ID:</span> {department.departmentId}</p>
            <p><span className="font-medium">Name:</span> {department.name}</p>
            <p><span className="font-medium">Description:</span> {department.description}</p>
          </div>

          {/* Head of Department */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Head of Department</h3>
            <p><span className="font-medium">Name:</span> {department.headOfDepartment.name}</p>
            <p><span className="font-medium">Years of Service:</span> {department.headOfDepartment.yearsOfService}</p>
            <p><span className="font-medium">Specialization:</span> {department.headOfDepartment.specialization}</p>
            <p><span className="font-medium">Contact:</span></p>
            <ul className="ml-4">
              <li>Email: {department.headOfDepartment.contact.email}</li>
              <li>Phone: {department.headOfDepartment.contact.phone}</li>
              <li>Office: {department.headOfDepartment.contact.office}</li>
            </ul>
          </div>

          {/* Staff Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Staff Details</h3>
            <p><span className="font-medium">Total Doctors:</span> {department.staff.totalDoctors}</p>
            <p><span className="font-medium">Total Nurses:</span> {department.staff.totalNurses}</p>
            <p><span className="font-medium">Support Staff:</span> {department.staff.totalSupportStaff}</p>
            <div className="mt-2">
              <p className="font-medium">Key Staff Members:</p>
              <ul className="ml-4">
                {department.staff.keyStaffMembers.map((member, index) => (
                  <li key={index}>
                    {member.name} - {member.role} ({member.specialization})
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Facilities and Services */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Facilities and Services</h3>
            <p className="font-medium">Equipment:</p>
            <ul className="ml-4 mb-2">
              {department.facilities.equipment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="font-medium">Special Treatment Areas:</p>
            <ul className="ml-4 mb-2">
              {department.facilities.specialTreatmentAreas.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
            <p className="font-medium">Ongoing Projects:</p>
            <ul className="ml-4">
              {department.facilities.ongoingProjects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
            <p><span className="font-medium">Success Rate:</span> {department.performance.successRate}%</p>
            <p><span className="font-medium">Monthly Patient Turnover:</span> {department.performance.monthlyTurnover}</p>
            <p><span className="font-medium">Patient Feedback Rating:</span> {department.performance.patientFeedback}/5</p>
          </div>

          {/* Operational Hours */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Operational Hours</h3>
            <p><span className="font-medium">Weekdays:</span> {department.operationalHours.weekdays}</p>
            <p><span className="font-medium">Weekends:</span> {department.operationalHours.weekends}</p>
            <p><span className="font-medium">Emergency Contact:</span> {department.operationalHours.emergencyContact}</p>
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