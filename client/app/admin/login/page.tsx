import type { Metadata } from "next";
import AuthForm from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Administrator Sign In | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AuthForm mode="login" audience="admin" />;
}