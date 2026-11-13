import type { Metadata } from "next";
import AdminManagement from "@/components/admin/admin-management";

export const metadata: Metadata = {
  title: "Manage Website Content | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function AdminContentPage() {
  return <AdminManagement resource="content" />;
}