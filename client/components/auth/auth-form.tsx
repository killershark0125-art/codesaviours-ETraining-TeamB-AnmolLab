"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { siteConfig } from "@/lib/site";

import styles from "./auth.module.css";

type AuthMode = "login" | "signup";
type Audience = "patient" | "doctor" | "staff" | "admin";

type AuthFormProps = {
  mode: AuthMode;
  audience?: Audience;
};

type FormState = {
  name: string;
  emailOrPhone: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const initialForm: FormState = {
  name: "",
  emailOrPhone: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const audienceCopy: Record<
  Audience,
  { label: string; title: string; description: string }
> = {
  patient: {
    label: "PATIENT ACCESS",
    title: "Your healthcare journey, in one place.",
    description:
      "Sign in to access patient services when your account is available.",
  },
  staff: {
    label: "STAFF PORTAL",
    title: "A workspace for laboratory staff.",
    description:
      "Use your laboratory-issued staff credentials to access the staff workspace.",
  },
  admin: {
    label: "ADMINISTRATION",
    title: "Manage laboratory operations.",
    description:
      "Administrative access is restricted to authorized Anmol Health Care Lab administrators.",
  },

  doctor: {
  label: "DOCTOR PORTAL",
  title: "Professional access for referring doctors.",
  description:
    "Use your laboratory-issued doctor credentials to access referrals and authorized patient reports.",
},
};

export default function AuthForm({
  mode,
  audience = "patient",
}: AuthFormProps) {
  const isSignup = mode === "signup";
  const isPatient = audience === "patient";
  const copy = audienceCopy[audience];

  const [form, setForm] = useState<FormState>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [feedback, setFeedback] = useState("");

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setFeedback("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    if (isSignup && form.password !== form.confirmPassword) {
      setFeedback("Your passwords do not match. Please check them and try again.");
      return;
    }

    /*
     * Authentication is deliberately not simulated here.
     * Hammad's login/registration endpoints and response contract
     * must be connected before this form can create a session.
     */
    setFeedback(
      isSignup
        ? "Your registration details passed validation. Account creation is not connected yet; no account has been created."
        : "Your sign-in details passed validation. Authentication is not connected yet; no sign-in was attempted.",
    );
  }

  const title = isSignup
    ? "Create your patient account."
    : audience === "staff"
      ? "Staff sign in."
      : audience === "admin"
        ? "Administrator sign in."
        : "Welcome back.";

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/" className={styles.brand} aria-label="Anmol Lab home">
          <span className={styles.brandMark}>A</span>
          <span>
            <strong>Anmol</strong>
            <small>HEALTH CARE LAB</small>
          </span>
        </Link>

        <div className={styles.panel}>
          <section className={styles.intro}>
            <span className={styles.eyebrow}>{copy.label}</span>

            <h1>
              {copy.title.split(" ").slice(0, -2).join(" ")}{" "}
              <em>{copy.title.split(" ").slice(-2).join(" ")}</em>
            </h1>

            <p>{copy.description}</p>

            <div className={styles.introFoot}>
              <span>PRECISION IN EVERY TEST.</span>
              <span>CARE IN EVERY PATIENT.</span>
            </div>
          </section>

          <section className={styles.formSide}>
            <div className={styles.formHeading}>
              <span className={styles.formEyebrow}>
                {isSignup ? "NEW PATIENT" : "SECURE ACCESS"}
              </span>

              <h2>{title}</h2>

              <p>
                {isSignup
                  ? "Enter your details to prepare your patient registration."
                  : "Enter your credentials to continue."}
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {isSignup && (
                <div className={styles.field}>
                  <label htmlFor="auth-name">Full name</label>
                  <input
                    id="auth-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    minLength={2}
                    maxLength={80}
                    required
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                  />
                </div>
              )}

              {isSignup ? (
                <>
                  <div className={styles.field}>
                    <label htmlFor="auth-email">Email address</label>
                    <input
                      id="auth-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      maxLength={120}
                      required
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="auth-phone">Phone number</label>
                    <input
                      id="auth-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="03XX XXXXXXX"
                      maxLength={25}
                      required
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                    />
                  </div>
                </>
              ) : (
                <div className={styles.field}>
                  <label htmlFor="auth-identifier">
                    Email or phone number
                  </label>
                  <input
                    id="auth-identifier"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your registered email or phone"
                    maxLength={120}
                    required
                    value={form.emailOrPhone}
                    onChange={(event) =>
                      updateField("emailOrPhone", event.target.value)
                    }
                  />
                </div>
              )}

              <div className={styles.field}>
                <label htmlFor="auth-password">Password</label>

                <div className={styles.passwordWrap}>
                  <input
                    id="auth-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    placeholder="Enter your password"
                    minLength={8}
                    maxLength={128}
                    required
                    value={form.password}
                    onChange={(event) =>
                      updateField("password", event.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {isSignup && (
                  <span className={styles.fieldHint}>
                    Use at least 8 characters.
                  </span>
                )}
              </div>

              {isSignup && (
                <div className={styles.field}>
                  <label htmlFor="auth-confirm-password">
                    Confirm password
                  </label>

                  <div className={styles.passwordWrap}>
                    <input
                      id="auth-confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter your password again"
                      minLength={8}
                      maxLength={128}
                      required
                      value={form.confirmPassword}
                      onChange={(event) =>
                        updateField("confirmPassword", event.target.value)
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirmation password"
                          : "Show confirmation password"
                      }
                      aria-pressed={showConfirmPassword}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              )}

              {feedback && (
                <p className={styles.feedback} role="status">
                  {feedback}
                </p>
              )}

              <button type="submit" className={styles.submitButton}>
                {isSignup ? "Prepare registration" : "Continue"}
                <span aria-hidden="true">↗</span>
              </button>
            </form>

            {isPatient && (
              <div className={styles.switchMode}>
                {isSignup ? (
                  <>
                    Already registered? <Link href="/login">Sign in</Link>
                  </>
                ) : (
                  <>
                    New to Anmol Lab? <Link href="/signup">Create an account</Link>
                  </>
                )}
              </div>
            )}

<div className={styles.alternateAccess}>
  {audience === "patient" ? (
    <>
      <Link href="/doctor/login">Doctor access</Link>
      <span aria-hidden="true">·</span>
      <Link href="/staff/login">Staff access</Link>
      <span aria-hidden="true">·</span>
      <Link href="/admin/login">Administrator access</Link>
    </>
  ) : (
    <Link href="/login">Return to patient sign in</Link>
  )}
</div>

            <p className={styles.support}>
              Need assistance? <Link href="/contact">Contact the laboratory</Link>
            </p>
          </section>
        </div>

        {!isSignup && audience === "patient" && (
  <Link href="/forgot-password" className={styles.forgotPassword}>
    Forgot password?
  </Link>
)}

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <Link href="/">Return to website</Link>
        </footer>
      </div>
    </main>
  );
}