import type { Metadata } from "next";
import StaffOperations from "@/components/staff/staff-operations";

export const metadata: Metadata = {
  title: "Report Management | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function StaffReportsPage() {
  return <StaffOperations resource="reports" />;
}