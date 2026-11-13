import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import styles from "./system-state.module.css";

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <section className={styles.shell}>
          <span className={styles.eyebrow}>
            ANMOL HEALTH CARE LAB
          </span>

          <span className={styles.code} aria-hidden="true">
            404
          </span>

          <h1 className={styles.title}>
            This page seems to have <em>gone missing.</em>
          </h1>

          <p className={styles.description}>
            The page you are looking for may have moved, no longer
            exists, or the address may have been entered incorrectly.
            Let's help you find your way back.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.primaryAction}>
              Return home
              <span aria-hidden="true">↗</span>
            </Link>

            <Link href="/tests" className={styles.secondaryAction}>
              Explore test catalogue
            </Link>
          </div>

          <div className={styles.divider} />

          <p className={styles.supportText}>
            Need assistance?{" "}
            <a href="tel:+923166474766">
              Contact Anmol Lab
            </a>
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}