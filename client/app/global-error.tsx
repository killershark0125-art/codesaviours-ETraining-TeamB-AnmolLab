"use client";

import { useEffect } from "react";

import "./globals.css";
import styles from "./system-state.module.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error("Root application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className={styles.globalCanvas}>
          <section className={styles.errorPanel} role="alert">
            <span className={styles.errorMark} aria-hidden="true">
              !
            </span>

            <span className={styles.eyebrow}>
              ANMOL HEALTH CARE LAB
            </span>

            <h1 className={styles.title}>
              We're having a little <em>technical trouble.</em>
            </h1>

            <p className={styles.description}>
              The application encountered an unexpected problem.
              Please try reloading this experience.
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.retryButton}
                onClick={reset}
              >
                Reload experience
                <span aria-hidden="true">↻</span>
              </button>

              <a href="/" className={styles.secondaryAction}>
                Go to homepage
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}