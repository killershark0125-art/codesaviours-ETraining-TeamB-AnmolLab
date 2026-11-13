import type { Metadata } from "next";
import PatientWorkspace from "@/components/patient/patient-workspace";

export const metadata: Metadata = {
  title: "My Profile | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function PatientProfilePage() {
  return <PatientWorkspace resource="profile" />;
}