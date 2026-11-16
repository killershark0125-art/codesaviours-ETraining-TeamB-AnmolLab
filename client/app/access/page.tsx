
import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import styles from "./access.module.css";

export const metadata: Metadata = {
  title: "Portal Access | Anmol Health Care Lab",
  description:
    "Choose your secure account access route for Anmol Health Care Lab.",
};

const portals = [
  {
    number: "01",
    name: "Patient portal",
    description:
      "Access your bookings, laboratory reports, family members and account details.",
    href: "/login",
    action: "Patient sign in",
    type: "PATIENT ACCESS",
  },
  {
    number: "02",
    name: "Doctor portal",
    description:
      "Sign in to access the doctor workspace and referred-patient services.",
    href: "/doctors/login",
    action: "Doctor sign in",
    type: "DOCTOR ACCESS",
  },
  {
    number: "03",
    name: "Staff workspace",
    description:
      "Access laboratory booking operations, collections and report workflows.",
    href: "/staff/login",
    action: "Staff sign in",
    type: "LABORATORY TEAM",
  },
  {
    number: "04",
    name: "Administration",
    description:
      "Access administrative management for laboratory operations and content.",
    href: "/admin/login",
    action: "Administrator sign in",
    type: "RESTRICTED ACCESS",
  },
];

export default function AccessPage() {
  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Portal Access</span>
          </div>

          <header className={styles.heading}>
            <span className={styles.eyebrow}>
              ANMOL HEALTH CARE LAB / ACCOUNT ACCESS
            </span>

            <h1>
              The right access.
              <br />
              <em>For every role.</em>
            </h1>

            <p>
              Choose the appropriate sign-in area for your relationship
              with Anmol Health Care Lab.
            </p>
          </header>

          <section
            className={styles.portalGrid}
            aria-label="Choose your portal"
          >
            {portals.map((portal) => (
              <article className={styles.portalCard} key={portal.number}>
                <div className={styles.cardTop}>
                  <span>{portal.number}</span>
                  <span>{portal.type}</span>
                </div>

                <div className={styles.cardBody}>
                  <h2>{portal.name}</h2>
                  <p>{portal.description}</p>
                </div>

                <Link href={portal.href} className={styles.cardAction}>
                  {portal.action}
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </section>

          <div className={styles.registration}>
            <div>
              <strong>New to Anmol Lab?</strong>
              <p>Create a patient account to access patient services.</p>
            </div>

            <Link href="/signup">Create patient account ↗</Link>
          </div>

          <div className={styles.notice}>
            Portal access is intended for authorized users. Account
            permissions and protected records must be verified by the
            laboratory server.
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
