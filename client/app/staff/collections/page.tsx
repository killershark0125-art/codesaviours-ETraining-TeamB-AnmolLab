import type { Metadata } from "next";
import StaffOperations from "@/components/staff/staff-operations";

export const metadata: Metadata = {
  title: "Home Collection Coordination | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function StaffCollectionsPage() {
  return <StaffOperations resource="collections" />;
}