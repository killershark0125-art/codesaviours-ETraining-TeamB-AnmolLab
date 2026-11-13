import type { Metadata } from "next";
import AdminManagement from "@/components/admin/admin-management";

export const metadata: Metadata = {
  title: "Manage Branches | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function AdminBranchesPage() {
  return <AdminManagement resource="branches" />;
}