import type { Metadata } from "next";
import AuthForm from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Patient Registration | Anmol Health Care Lab",
  description: "Prepare your patient account registration with Anmol Health Care Lab.",
};

export default function SignupPage() {
  return <AuthForm mode="signup" audience="patient" />;
}