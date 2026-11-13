import type { Metadata } from "next";

import AuthForm from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Doctor Sign In | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function DoctorLoginPage() {
  return <AuthForm mode="login" audience="doctor" />;
}