
import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import VisualPageHero from "@/components/layout/visual-page-hero";

import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Anmol Health Care Lab",
  description:
    "Get to know Anmol Health Care Lab, explore available laboratory services and find information to plan your visit in Faisalabad.",
};

const labServices = [
  {
    number: "01",
    eyebrow: "TEST CATALOGUE",
    title: "Explore available tests.",
    description:
      "Browse the laboratory test catalogue and review the published information for individual tests.",
    href: "/tests",
    linkLabel: "Explore tests",
  },
  {
    number: "02",
    eyebrow: "HEALTH PACKAGES",
    title: "Review package options.",
    description:
      "Explore available health packages and the diagnostic tests included in each.",
    href: "/packages",
    linkLabel: "View packages",
  },
  {
    number: "03",
    eyebrow: "PATIENT SERVICES",
    title: "Find your next step.",
    description:
      "Access patient reports, learn about home sampling requests and find laboratory locations.",
    href: "/reports",
    linkLabel: "Patient reports",
  },
];

const approachCards = [
  {
    number: "01",
    title: "Clarity",
    description:
      "Find relevant test, package and laboratory information before planning your visit.",
  },
  {
    number: "02",
    title: "Accessibility",
    description:
      "Explore the available ways to access laboratory information and patient services.",
  },
  {
    number: "03",
    title: "Connection",
    description:
      "Reach the laboratory for questions, booking enquiries and further assistance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <VisualPageHero
          eyebrow="ABOUT THE LABORATORY"
          title={
            <>
              The work behind
              <br />
              <em>every test.</em>
            </>
          }
          description="Get to know Anmol Health Care Lab, explore the services available to patients and find the information you need before your visit."
          imageSrc="/images/about-lab-hero.jpg"
          imageAlt="Blood sample collection tubes arranged in a laboratory rack"
          imagePosition="center center"
          mobileImagePosition="center center"
          primaryHref="/tests"
          primaryLabel="Explore available tests"
          secondaryHref="/#contact"
          secondaryLabel="Get in touch"
        />

        <section
          className={styles.overview}
          aria-labelledby="overview-title"
        >
          <div className={styles.container}>
            <div className={styles.overviewMeta}>
              <span>01 / ABOUT ANMOL</span>
              <span>LABORATORY INFORMATION</span>
            </div>

            <div className={styles.overviewHeading}>
              <div>
                <span className={styles.eyebrow}>A CLOSER LOOK</span>

                <h2 id="overview-title">
                  A clearer place
                  <em> to begin.</em>
                </h2>
              </div>

              <p>
                Anmol Health Care Lab is located in Faisalabad. This space
                brings together useful information about the laboratory,
                its available testing catalogue and the services patients
                can explore.
              </p>
            </div>

            <div className={styles.serviceGrid}>
              {labServices.map((service) => (
                <article
                  className={styles.serviceCard}
                  key={service.number}
                >
                  <span className={styles.cardNumber}>
                    {service.number}
                  </span>

                  <div className={styles.serviceContent}>
                    <span className={styles.cardEyebrow}>
                      {service.eyebrow}
                    </span>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>
                  </div>

                  <Link
                    href={service.href}
                    className={styles.cardAction}
                  >
                    {service.linkLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.approach}
          aria-labelledby="approach-title"
        >
          <div className={styles.container}>
            <div className={styles.overviewMeta}>
              <span>02 / OUR APPROACH</span>
              <span>PRECISION & CARE</span>
            </div>

            <header className={styles.approachHeading}>
              <span className={styles.darkEyebrow}>WHAT MATTERS</span>

              <h2 id="approach-title">
                Precision in every test.
                <em> Care in every patient.</em>
              </h2>

              <p>
                Finding the right information should feel straightforward.
                From exploring tests to getting in touch, the next step
                should be clear.
              </p>
            </header>

            <div className={styles.approachGrid}>
              {approachCards.map((card) => (
                <article
                  className={styles.approachCard}
                  key={card.number}
                >
                  <span className={styles.approachNumber}>
                    {card.number}
                  </span>

                  <div className={styles.approachContent}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className={styles.nextStep}
          aria-labelledby="next-step-title"
        >
          <div className={styles.container}>
            <div className={styles.nextStepCard}>
              <span className={styles.eyebrow}>TAKE THE NEXT STEP</span>

              <h2 id="next-step-title">
                Have something
                <em> in mind?</em>
              </h2>

              <p>
                Explore the available tests or contact the laboratory for
                assistance with your enquiry.
              </p>

              <div className={styles.nextStepActions}>
                <Link
                  href="/tests"
                  className={styles.primaryAction}
                >
                  Explore tests
                </Link>

                <Link
                  href="/#contact"
                  className={styles.secondaryAction}
                >
                  Contact the laboratory
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
