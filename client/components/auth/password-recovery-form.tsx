"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import styles from "./password-recovery.module.css";

type PasswordRecoveryFormProps = {
  mode: "request" | "reset";
  hasToken?: boolean;
};

export default function PasswordRecoveryForm({
  mode,
  hasToken = false,
}: PasswordRecoveryFormProps) {
  const isReset = mode === "reset";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [feedback, setFeedback] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    if (isReset && password !== confirmation) {
      setFeedback("The passwords do not match.");
      return;
    }

    if (isReset) {
      setFeedback(
        "Password reset is not connected yet. Your password has not been changed.",
      );
      return;
    }

    setFeedback(
      "Password recovery is not connected yet. No recovery email has been sent.",
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          <span>A</span>
          <strong>ANMOL HEALTH CARE LAB</strong>
        </Link>

        <section className={styles.panel}>
          <span className={styles.eyebrow}>
            ACCOUNT SECURITY / {isReset ? "RESET" : "RECOVERY"}
          </span>

          {!isReset ? (
            <>
              <h1>
                Recover your <em>account.</em>
              </h1>

              <p className={styles.description}>
                Enter your registered email address to request a
                password recovery link.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="recovery-email">
                  Registered email address
                </label>

                <input
                  id="recovery-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={120}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setFeedback("");
                  }}
                />

                {feedback && (
                  <p className={styles.feedback} role="status">
                    {feedback}
                  </p>
                )}

                <button type="submit">
                  Request recovery link
                  <span aria-hidden="true">↗</span>
                </button>
              </form>
            </>
          ) : !hasToken ? (
            <>
              <h1>
                Reset your <em>password.</em>
              </h1>

              <p className={styles.description}>
                A valid password-reset link is required to continue.
                Request a new link through the recovery page.
              </p>

              <Link
                href="/forgot-password"
                className={styles.primaryLink}
              >
                Request a recovery link
                <span aria-hidden="true">↗</span>
              </Link>
            </>
          ) : (
            <>
              <h1>
                Choose a new <em>password.</em>
              </h1>

              <p className={styles.description}>
                Enter your new password and confirm it below.
              </p>

              <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="new-password">New password</label>

                <input
                  id="new-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={128}
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setFeedback("");
                  }}
                  placeholder="At least 8 characters"
                />

                <label htmlFor="confirm-password">
                  Confirm new password
                </label>

                <input
                  id="confirm-password"
                  name="confirmation"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={128}
                  required
                  value={confirmation}
                  onChange={(event) => {
                    setConfirmation(event.target.value);
                    setFeedback("");
                  }}
                  placeholder="Enter your password again"
                />

                {feedback && (
                  <p className={styles.feedback} role="status">
                    {feedback}
                  </p>
                )}

                <button type="submit">
                  Update password
                  <span aria-hidden="true">↗</span>
                </button>
              </form>
            </>
          )}

          <Link href="/login" className={styles.backLink}>
            ← Return to patient sign in
          </Link>
        </section>

        <p className={styles.footer}>
          Anmol Health Care Lab · Account assistance
        </p>
      </div>
    </main>
  );
}