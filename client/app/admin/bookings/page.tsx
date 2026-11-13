import type { Metadata } from "next";
import AdminManagement from "@/components/admin/admin-management";

export const metadata: Metadata = {
  title: "Manage Bookings | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function AdminBookingsPage() {
  return <AdminManagement resource="bookings" />;
}