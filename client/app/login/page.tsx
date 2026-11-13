import type { Metadata } from "next";
import AuthForm from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Patient Sign In | Anmol Health Care Lab",
  description: "Sign in to your Anmol Health Care Lab patient account.",
};

export default function LoginPage() {
  return <AuthForm mode="login" audience="patient" />;
}