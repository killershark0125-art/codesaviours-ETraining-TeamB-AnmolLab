import type { Metadata } from "next";

import PatientWorkspace from "@/components/patient/patient-workspace";

export const metadata: Metadata = {
  title: "Patient Portal | Anmol Health Care Lab",
  description: "Patient workspace for Anmol Health Care Lab.",
  robots: { index: false, follow: false },
};

export default function PatientPortalPage() {
  return <PatientWorkspace resource="overview" />;
}