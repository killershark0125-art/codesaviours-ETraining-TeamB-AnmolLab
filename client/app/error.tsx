"use client";

import { useEffect } from "react";
import Link from "next/link";

import styles from "./system-state.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    // Keep technical details in the developer console, not on the public page.
    console.error("Application route error:", error);
  }, [error]);

  return (
    <main className={styles.errorPage}>
      <section className={styles.errorPanel} role="alert">
        <span className={styles.errorMark} aria-hidden="true">
          !
        </span>

        <span className={styles.eyebrow}>
          ANMOL HEALTH CARE LAB
        </span>

        <h1 className={styles.title}>
          Something didn't go <em>as expected.</em>
        </h1>

        <p className={styles.description}>
          An unexpected problem stopped this page from loading
          correctly. You can try again or return to the homepage.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.retryButton}
            onClick={reset}
          >
            Try again
            <span aria-hidden="true">↻</span>
          </button>

          <Link href="/" className={styles.secondaryAction}>
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}