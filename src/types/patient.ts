export interface Patient {
  id: string;
  hospitalId: string;
  name: string;
  phone: string;
  email: string;
  aadharId: string;
  age: number;
  gender: string;
  address: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
  appointments: {
    id: string;
    date: string;
    doctorName: string;
    department: string;
    status: string;
    notes?: string;
    prescription?: string[];
  }[];
  treatmentPlan: {
    description: string;
    startDate: string;
    endDate?: string;
    goals: string[];
  };
  status: 'admitted' | 'discharged' | 'under_observation' | 'regular';
  department?: string;
  doctorName?: string;
  lastVisit?: string;
  nextVisit?: string;
  registrationDate: string;
}