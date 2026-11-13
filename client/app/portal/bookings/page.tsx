import type { Metadata } from "next";
import PatientWorkspace from "@/components/patient/patient-workspace";

export const metadata: Metadata = {
  title: "My Bookings | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function PatientBookingsPage() {
  return <PatientWorkspace resource="bookings" />;
}