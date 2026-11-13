import type { Metadata } from "next";

import PasswordRecoveryForm from "@/components/auth/password-recovery-form";

export const metadata: Metadata = {
  title: "Reset Password | Anmol Health Care Lab",
  robots: { index: false, follow: false },
};

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string | string[];
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  const token =
    typeof params.token === "string" ? params.token : "";

  return (
    <PasswordRecoveryForm
      mode="reset"
      hasToken={token.trim().length > 0}
    />
  );
}