import type { Metadata } from "next";
import RoleDashboard from "@/components/dashboard/role-dashboard";

export const metadata: Metadata = {
  title: "Administration | Anmol Health Care Lab",
  description: "Administration workspace for Anmol Health Care Lab.",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <RoleDashboard role="admin" />;
}