import type { Metadata } from "next";
import AdminManagement from "@/components/admin/admin-management";

export const metadata: Metadata = {
  title: "Manage Packages | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function AdminPackagesPage() {
  return <AdminManagement resource="packages" />;
}