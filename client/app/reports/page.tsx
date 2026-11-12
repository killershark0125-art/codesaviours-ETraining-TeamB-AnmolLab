import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";

import styles from "./reports.module.css";

export const metadata: Metadata = {
  title: "Download report",
  description: "Information about accessing your laboratory reports.",
};

export default function ReportsPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />

      <section className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>
                PATIENT SERVICES / REPORTS
              </p>

              <h1 className={styles.title}>
                Your results.
                <br />
                Your information.
              </h1>

              <p className={styles.lead}>
                Your health information deserves to be handled with care.
                Online report access is being prepared. Until then, please
                contact our laboratory for assistance with your results.
              </p>

              <div className={styles.contactList}>
                {siteConfig.phones.map((phone, index) => (
                  <div className={styles.contactItem} key={phone.href}>
                    <a
                      href={phone.href}
                      className={styles.contactAction}
                      aria-label={`${index === 0 ? "Contact the laboratory" : "Call the alternative number"} at ${phone.display}`}
                    >
                      <span className={styles.actionLabel}>
                        {index === 0
                          ? "Contact the laboratory"
                          : "Call the alternative number"}
                      </span>
                    </a>

                    <span className={styles.actionNumber}>
                      {phone.display}
                    </span>
                  </div>
                ))}
              </div>

              <a
                className={styles.emailLink}
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
                <span aria-hidden="true">↗</span>
              </a>

              <Link href="/" className={styles.backLink}>
                <span aria-hidden="true">←</span>
                Back to homepage
              </Link>
            </div>

            <div className={styles.portal}>
              <div className={styles.portalHeader}>
                <span className={styles.portalLabel}>
                  PATIENT REPORT PORTAL
                </span>

                <span className={styles.portalStatus}>
                  <span className={styles.statusDot} />
                  Access in preparation
                </span>
              </div>

              <div className={styles.documentIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 7.5H37L49 19.5V53C49 55.2 47.2 57 45 57H18C15.8 57 14 55.2 14 53V11.5C14 9.3 15.8 7.5 18 7.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M37 8V20H49"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M23 31H40M23 38H40M23 45H34"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className={styles.portalBody}>
                <p className={styles.portalEyebrow}>
                  SECURE ONLINE ACCESS
                </p>

                <h2 className={styles.portalTitle}>
                  Download your report
                </h2>

                <p className={styles.portalDescription}>
                  Secure report retrieval is not available yet. We are
                  preparing the online service so patients can access their
                  reports through a protected process.
                </p>

                <button
                  type="button"
                  className={styles.downloadButton}
                  disabled
                  title="Secure report access is not available yet"
                >
                  Download report
                  <span aria-hidden="true">↗</span>
                </button>

                <p className={styles.downloadHint}>
                  Online report access will become available once the secure
                  system is connected.
                </p>
              </div>

              <div className={styles.portalFooter}>
                <span>ANMOL HEALTH CARE LAB</span>
                <span>YOUR INFORMATION, PROTECTED</span>
              </div>
            </div>
          </div>

          <div className={styles.bottomLine}>
            <span>{siteConfig.tagline}</span>
            <span>PRECISION · CARE · TRUST</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}