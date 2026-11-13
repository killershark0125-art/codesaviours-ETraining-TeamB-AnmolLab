import type { Metadata } from "next";
import StaffOperations from "@/components/staff/staff-operations";

export const metadata: Metadata = {
  title: "Booking Queue | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function StaffBookingsPage() {
  return <StaffOperations resource="bookings" />;
}