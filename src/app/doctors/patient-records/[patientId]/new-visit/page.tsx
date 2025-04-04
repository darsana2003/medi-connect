import { use } from "react";
import NewVisitClient from "./NewVisitClient";

export default function NewVisitPage({
  params,
}: {
  params: { patientId: string };
}) {
  const resolvedParams = use(Promise.resolve(params));
  return <NewVisitClient patientId={resolvedParams.patientId} />;
}
