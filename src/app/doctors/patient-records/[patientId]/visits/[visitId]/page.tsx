import { use } from 'react'
import VisitDetailsClient from './VisitDetailsClient'

export default function DetailedVisitView({ 
  params 
}: { 
  params: { patientId: string; visitId: string } 
}) {
  const resolvedParams = use(Promise.resolve(params))
  return (
    <VisitDetailsClient 
      patientId={resolvedParams.patientId} 
      visitId={resolvedParams.visitId} 
    />
  )
} 