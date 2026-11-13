import type { Metadata } from "next";
import RoleDashboard from "@/components/dashboard/role-dashboard";

export const metadata: Metadata = {
  title: "Staff Workspace | Anmol Health Care Lab",
  description: "Laboratory staff operations workspace.",
  robots: { index: false, follow: false },
};

export default function StaffDashboardPage() {
  return <RoleDashboard role="staff" />;
}