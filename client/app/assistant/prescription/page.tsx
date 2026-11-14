
import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import PrescriptionUpload from "@/components/ai/prescription-upload";

import styles from "../assistant-page.module.css";

export const metadata: Metadata = {
  title: "Prescription Review | Anmol Health Care Lab",
  description:
    "Select a prescription and review matching tests from the Anmol Health Care Lab catalogue.",
};

export default function PrescriptionPage() {
  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.ambient} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/assistant">Anmol Assistant</Link>
            <span aria-hidden="true">/</span>
            <span>Prescription review</span>
          </div>

          <header className={styles.heading}>
            <div>
              <span className={styles.eyebrow}>
                PATIENT SUPPORT / PRESCRIPTION
              </span>

              <h1>
                Your test list,
                <br />
                <em>carefully reviewed.</em>
              </h1>

              <p>
                Start with your doctor&apos;s prescription, then review the
                laboratory catalogue before making your selection.
              </p>
            </div>
          </header>

          <PrescriptionUpload />

          <div className={styles.bottomNote}>
            <span>ANMOL HEALTH CARE LAB</span>
            <p>
              Only select tests prescribed or approved by your treating
              healthcare professional.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
