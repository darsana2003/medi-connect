import { use } from 'react'
import PatientRecordClient from './PatientRecordClient'

export default function PatientRecordPage({ 
  params 
}: { 
  params: { patientId: string } 
}) {
  const resolvedParams = use(Promise.resolve(params))
  return <PatientRecordClient patientId={resolvedParams.patientId} />
} 