import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";

import styles from "./doctor-workspace.module.css";

const sections = [
  {
    id: "referrals",
    number: "01",
    label: "REFERRAL MANAGEMENT",
    title: "Referred patients",
    description: "Review patients referred to the laboratory.",
    empty: "Your referral list will appear here.",
    detail:
      "Patient referrals will be retrieved from your authenticated doctor account. No patient records are displayed in this preview.",
  },
  {
    id: "reports",
    number: "02",
    label: "LABORATORY RESULTS",
    title: "Patient reports",
    description: "Access reports for patients you are authorized to view.",
    empty: "No report records are connected.",
    detail:
      "Report access will require doctor authentication, patient referral authorization and server-side ownership checks.",
  },
  {
    id: "referral-activity",
    number: "03",
    label: "ACTIVITY",
    title: "Referral activity",
    description: "Follow the status of your submitted referrals.",
    empty: "Your referral activity will appear here.",
    detail:
      "Referral status updates and activity history will be loaded from the laboratory's API.",
  },
  {
    id: "profile",
    number: "04",
    label: "ACCOUNT",
    title: "Professional profile",
    description: "Your registered professional account information.",
    empty: "Your profile is not connected yet.",
    detail:
      "Your name, credentials, contact information and account permissions will be retrieved from your verified doctor account.",
  },
];

export default function DoctorWorkspace() {
  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.topline}>
            <span>{siteConfig.name}</span>
            <span>DOCTOR PORTAL / PROFESSIONAL ACCESS</span>
          </div>

          <section className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>
                PROFESSIONAL WORKSPACE
              </span>

              <h1>
                Laboratory collaboration,
                <br />
                with <em>clarity.</em>
              </h1>

              <p>
                A dedicated workspace for managing referrals and
                accessing authorized laboratory report information.
              </p>

              <div className={styles.heroActions}>
                <Link href="/tests" className={styles.primaryAction}>
                  Explore test catalogue
                  <span aria-hidden="true">↗</span>
                </Link>

                <Link href="/contact" className={styles.secondaryAction}>
                  Contact laboratory
                </Link>
              </div>
            </div>

            <div className={styles.heroCard}>
              <span>PROFESSIONAL ACCESS</span>
              <strong>DOCTOR / 01</strong>
              <small>ANMOL HEALTH CARE LAB</small>
              <div className={styles.cardRule} />
              <p>
                Secure professional features will become available
                after doctor authentication is integrated.
              </p>
            </div>
          </section>

          <div className={styles.notice} role="status">
            <span aria-hidden="true">i</span>
            <div>
              <strong>Doctor portal preview</strong>
              <p>
                Login, referral records and report permissions are
                not connected yet. This page does not display real
                patient information or provide report access.
              </p>
            </div>
          </div>

          <section className={styles.quickSection}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>
                  01 / QUICK ACCESS
                </span>
                <h2>Professional resources.</h2>
              </div>
            </div>

            <div className={styles.quickGrid}>
              <Link href="/tests" className={styles.quickCard}>
                <span>01</span>
                <strong>Test catalogue</strong>
                <small>Explore available laboratory tests</small>
                <b aria-hidden="true">↗</b>
              </Link>

              <Link href="/packages" className={styles.quickCard}>
                <span>02</span>
                <strong>Health packages</strong>
                <small>Explore published packages</small>
                <b aria-hidden="true">↗</b>
              </Link>

              <Link href="/contact" className={styles.quickCard}>
                <span>03</span>
                <strong>Contact the laboratory</strong>
                <small>Find professional contact information</small>
                <b aria-hidden="true">↗</b>
              </Link>
            </div>
          </section>

          <section className={styles.modules}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>
                  02 / DOCTOR WORKSPACE
                </span>
                <h2>Your workspace.</h2>
              </div>
              <span className={styles.moduleCount}>04 MODULES</span>
            </div>

            <div className={styles.moduleGrid}>
              {sections.map((section) => (
                <article
                  id={section.id}
                  className={styles.module}
                  key={section.id}
                >
                  <div className={styles.moduleTop}>
                    <span>{section.number} / {section.label}</span>
                    <span className={styles.pending}>NOT CONNECTED</span>
                  </div>

                  <h3>{section.title}</h3>
                  <p className={styles.moduleDescription}>
                    {section.description}
                  </p>

                  <div className={styles.emptyState}>
                    <span className={styles.emptyIcon} aria-hidden="true">
                      ◇
                    </span>
                    <strong>{section.empty}</strong>
                    <p>{section.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.support}>
            <div>
              <span className={styles.sectionLabel}>
                PROFESSIONAL SUPPORT
              </span>
              <h2>Need assistance?</h2>
              <p>
                Contact Anmol Health Care Lab for professional
                enquiries and account access assistance.
              </p>
            </div>

            <div className={styles.supportDetails}>
              {siteConfig.phones.map((phone) => (
                <a href={phone.href} key={phone.href}>
                  {phone.display}
                </a>
              ))}
              <a href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}