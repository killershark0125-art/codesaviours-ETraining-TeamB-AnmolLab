import type { Metadata } from "next";

import PasswordRecoveryForm from "@/components/auth/password-recovery-form";

export const metadata: Metadata = {
  title: "Forgot Password | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <PasswordRecoveryForm mode="request" />;
}