import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";

import styles from "./home-sampling.module.css";

export const metadata: Metadata = {
  title: "Home Sample Collection | Anmol Health Care Lab",
  description:
    "Learn about arranging home sample collection with Anmol Health Care Lab in Faisalabad and how to request a booking.",
};

const processSteps = [
  {
    number: "01",
    title: "Choose your tests",
    description:
      "Explore the laboratory catalogue and identify the tests you need before beginning your booking request.",
  },
  {
    number: "02",
    title: "Select home collection",
    description:
      "On the booking page, choose the home collection option and provide your contact and address details.",
  },
  {
    number: "03",
    title: "Await confirmation",
    description:
      "Contact the laboratory to confirm service availability for your address, collection arrangements and any applicable charges.",
  },
];

const preparationItems = [
  {
    number: "01",
    title: "Patient information",
    description:
      "Keep the patient's name and a reachable contact number ready.",
  },
  {
    number: "02",
    title: "Complete address",
    description:
      "Provide your area, street, house or building number and a useful nearby landmark.",
  },
  {
    number: "03",
    title: "Test requirements",
    description:
      "Know which tests you need. Ask the laboratory about any preparation required before sample collection.",
  },
  {
    number: "04",
    title: "Preferred date",
    description:
      "Share your preferred collection date and discuss an available arrangement with the laboratory team.",
  },
];

export default function HomeSamplingPage() {
  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="sampling-title">
          <div className={styles.heroGlow} aria-hidden="true" />

          <div className={styles.container}>
            <div className={styles.heroMeta}>
              <span>ANMOL HEALTH CARE LAB</span>
              <span>PATIENT SERVICES / HOME COLLECTION</span>
            </div>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>
                  HOME SAMPLE COLLECTION
                </span>

                <h1 id="sampling-title">
                  Laboratory care,
                  <br />
                  closer to <em>home.</em>
                </h1>

                <p className={styles.heroDescription}>
                  Explore the home sample collection option and
                  arrange your request with Anmol Health Care Lab.
                  Contact our team to confirm availability and
                  collection details for your location.
                </p>

                <div className={styles.heroActions}>
                  <Link href="/book" className={styles.primaryAction}>
                    Start a booking request
                    <span aria-hidden="true">↗</span>
                  </Link>

                  <a
                    href={siteConfig.phones[0].href}
                    className={styles.secondaryAction}
                  >
                    Speak to the laboratory
                  </a>
                </div>

                <p className={styles.heroFootnote}>
                  Collection arrangements are subject to confirmation
                  by the laboratory.
                </p>
              </div>

              <div className={styles.visual} aria-hidden="true">
 <div className={`${styles.visualOrbit} ${styles.visualOrbitOuter}`} />
<div className={`${styles.visualOrbit} ${styles.visualOrbitInner}`} />

                <div className={styles.visualCircle}>
                  <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M60 13.5C60 13.5 30 49.2 30 72.8C30 89.4 43.4 103 60 103C76.6 103 90 89.4 90 72.8C90 49.2 60 13.5 60 13.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M43 73C43 82.4 50.6 90 60 90"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M74 53L83 44M79 44H83V48"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className={styles.visualCaption}>
                  <span>01 / PATIENT CONVENIENCE</span>
                  <strong>Home collection</strong>
                  <span>Arrange directly with our team</span>
                </div>

                <span className={styles.visualIndex}>AHL / 01</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionLabel}>
                  01 / HOW IT WORKS
                </span>

                <h2 id="process-title">
                  Three steps to <em>get started.</em>
                </h2>
              </div>

              <p>
                Start with your test requirements, share your
                collection details and confirm the arrangement
                with the laboratory.
              </p>
            </div>

            <div className={styles.processGrid}>
              {processSteps.map((step) => (
                <article className={styles.processCard} key={step.number}>
                  <span className={styles.stepNumber}>{step.number}</span>

                  <span className={styles.stepLine} aria-hidden="true" />

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.preparation}
          aria-labelledby="preparation-title"
        >
          <div className={styles.container}>
            <div className={styles.preparationGrid}>
              <div className={styles.preparationIntro}>
                <span className={styles.sectionLabel}>
                  02 / BEFORE YOU BOOK
                </span>

                <h2 id="preparation-title">
                  A little preparation.
                  <br />
                  <em>A smoother request.</em>
                </h2>

                <p>
                  Keep these details ready when contacting the
                  laboratory or submitting your booking request.
                </p>

                <Link href="/tests" className={styles.textLink}>
                  Browse available tests
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className={styles.checklist}>
                {preparationItems.map((item) => (
                  <article className={styles.checkItem} key={item.number}>
                    <span className={styles.checkNumber}>
                      {item.number}
                    </span>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <span className={styles.checkMark} aria-hidden="true">
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 10.5L8 14L16 6"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.noticeSection}>
          <div className={styles.container}>
            <div className={styles.noticePanel}>
              <span className={styles.noticeIcon} aria-hidden="true">
                i
              </span>

              <div>
                <span className={styles.sectionLabel}>
                  IMPORTANT INFORMATION
                </span>

                <h2>Confirm the details before your collection.</h2>

                <p>
                  Home collection availability, address coverage,
                  collection timing and applicable charges must be
                  confirmed directly with Anmol Health Care Lab.
                  Preparation requirements can vary by test, so
                  check with the laboratory before your collection.
                </p>

                <a href={siteConfig.phones[0].href}>
                  Call {siteConfig.phones[0].display}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.container}>
            <div className={styles.closingCard}>
              <span className={styles.closingEyebrow}>
                ANMOL HEALTH CARE LAB / FAISALABAD
              </span>

              <h2 id="closing-title">
                Ready to arrange your <em>collection?</em>
              </h2>

              <p>
                Begin with your test selection, then choose the
                appropriate collection method in the booking form.
                The laboratory team can help confirm the details.
              </p>

              <div className={styles.closingActions}>
                <Link href="/book" className={styles.primaryAction}>
                  Continue to booking
                  <span aria-hidden="true">↗</span>
                </Link>

                <Link href="/contact" className={styles.closingSecondary}>
                  Contact and location
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}