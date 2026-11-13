import type { Metadata } from "next";
import PatientWorkspace from "@/components/patient/patient-workspace";

export const metadata: Metadata = {
  title: "Family Members | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function PatientFamilyPage() {
  return <PatientWorkspace resource="family" />;
}