import type { Metadata } from "next";

import DoctorWorkspace from "@/components/doctor/doctor-workspace";

export const metadata: Metadata = {
  title: "Doctor Portal | Anmol Health Care Lab",
  description:
    "Professional referral and laboratory collaboration workspace.",
  robots: { index: false, follow: false },
};

export default function DoctorPortalPage() {
  return <DoctorWorkspace />;
}