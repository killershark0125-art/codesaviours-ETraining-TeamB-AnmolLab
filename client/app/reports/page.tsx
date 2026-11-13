import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";

import styles from "./reports.module.css";

export const metadata: Metadata = {
  title: "Patient Reports | Anmol Health Care Lab",
  description:
    "Find out how to request assistance with your laboratory report from Anmol Health Care Lab in Faisalabad.",
};

const reportPreparation = [
  {
    number: "01",
    title: "Patient details",
    description:
      "Keep the patient's full name and the phone number provided when arranging the laboratory visit.",
  },
  {
    number: "02",
    title: "Visit information",
    description:
      "Note the approximate date of sample collection or laboratory visit.",
  },
  {
    number: "03",
    title: "Receipt or reference",
    description:
      "Keep your laboratory receipt or reference number nearby, if one was provided.",
  },
];

export default function ReportsPage() {
  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="reports-title">
          <div className={styles.container}>
            <div className={styles.heroMeta}>
              <span>ANMOL HEALTH CARE LAB</span>
              <span>PATIENT SERVICES / 01</span>
            </div>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>
                  PATIENT REPORTS
                </span>

                <h1 id="reports-title">
                  Your results.
                  <br />
                  Your <em>information.</em>
                </h1>

                <p className={styles.lead}>
                  Laboratory reports are personal health information.
                  Contact our team for assistance accessing your results
                  while online report access is being prepared.
                </p>

                <div className={styles.heroActions}>
                  <a
                    href={siteConfig.phones[0].href}
                    className={styles.primaryAction}
                  >
                    Call the laboratory
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                      "Laboratory report assistance",
                    )}`}
                    className={styles.secondaryAction}
                  >
                    Email the laboratory
                  </a>
                </div>
              </div>

              <aside className={styles.accessCard}>
                <span className={styles.accessIndex}>REPORT ACCESS</span>

                <span className={styles.accessIcon} aria-hidden="true">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 5.5H28L37 14.5V40.5C37 41.6 36.1 42.5 35 42.5H14C12.9 42.5 12 41.6 12 40.5V7.5C12 6.4 12.9 5.5 14 5.5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M27.5 6V15H36.5M19 23H30M19 29H30M19 35H26"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <span className={styles.accessStatus}>
                  <span aria-hidden="true" />
                  Online access in preparation
                </span>

                <h2>Need a report?</h2>

                <p>
                  Please contact the laboratory directly for help with
                  your report. Online downloads are not available through
                  this website yet.
                </p>

                <a href={siteConfig.phones[0].href}>
                  {siteConfig.phones[0].display}
                  <span aria-hidden="true">↗</span>
                </a>
              </aside>
            </div>

            <div className={styles.heroFoot}>
              <span>PRIVATE HEALTH INFORMATION</span>
              <span>CONTACT THE LAB FOR ASSISTANCE</span>
            </div>
          </div>
        </section>

        <section
          className={styles.preparation}
          aria-labelledby="preparation-title"
        >
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>
                  01 / BEFORE YOU CONTACT US
                </span>

                <h2 id="preparation-title">
                  A few details to <em>keep ready.</em>
                </h2>
              </div>

              <p>
                Having some basic visit information available can help
                the laboratory team identify the correct enquiry.
              </p>
            </div>

            <div className={styles.preparationGrid}>
              {reportPreparation.map((item) => (
                <article
                  className={styles.preparationCard}
                  key={item.number}
                >
                  <span className={styles.cardNumber}>
                    {item.number}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.privacy}
          aria-labelledby="privacy-title"
        >
          <div className={styles.container}>
            <div className={styles.privacyPanel}>
              <div className={styles.privacyMark} aria-hidden="true">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 3.5L26 7.5V14.8C26 21.1 21.8 26.7 16 28.5C10.2 26.7 6 21.1 6 14.8V7.5L16 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.5 15.5L14.5 18.5L20.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <span className={styles.sectionLabel}>
                  YOUR PRIVACY MATTERS
                </span>

                <h2 id="privacy-title">
                  Share health information <em>carefully.</em>
                </h2>

                <p>
                  Reports may contain sensitive personal and medical
                  information. Avoid posting report details, identity
                  documents or medical records in public channels.
                  Use only contact methods confirmed by the laboratory,
                  and ask the team how to provide any information
                  needed to verify a report securely.
                </p>

                <Link href="/privacy" className={styles.privacyLink}>
                  Read our privacy information
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className={styles.contact}
          aria-labelledby="contact-title"
        >
          <div className={styles.container}>
            <div className={styles.contactHeading}>
              <span className={styles.sectionLabel}>
                02 / DIRECT ASSISTANCE
              </span>

              <h2 id="contact-title">
                We're here to <em>help.</em>
              </h2>

              <p>
                Contact Anmol Health Care Lab using the details below
                for report-related questions and assistance.
              </p>
            </div>

            <div className={styles.contactGrid}>
              <article className={styles.contactCard}>
                <span className={styles.contactLabel}>CALL</span>

                {siteConfig.phones.map((phone) => (
                  <a
                    className={styles.phoneLink}
                    href={phone.href}
                    key={phone.href}
                  >
                    {phone.display}
                  </a>
                ))}

                <p>Speak with the laboratory team.</p>
              </article>

              <article className={styles.contactCard}>
                <span className={styles.contactLabel}>EMAIL</span>

                <a
                  className={styles.emailLink}
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>

                <p>Prepare an email enquiry for the laboratory.</p>
              </article>

              <article className={styles.contactCard}>
                <span className={styles.contactLabel}>LOCATION</span>

                <strong>{siteConfig.city}</strong>

                <p>{siteConfig.address}</p>

                <a
                  className={styles.directionLink}
                  href={siteConfig.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View directions
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.disclaimer}>
          <div className={styles.container}>
            <p>
              Laboratory reports should be reviewed with an appropriate
              healthcare professional. Information on this website is
              not a medical diagnosis and does not replace professional
              medical advice.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}