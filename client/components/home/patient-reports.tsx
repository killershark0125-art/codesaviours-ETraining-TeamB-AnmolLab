
import Link from "next/link";

import styles from "./patient-reports.module.css";

const reportSteps = [
  {
    number: "01",
    title: "Access your reports",
    description:
      "Visit the patient reports page to get started.",
  },
  {
    number: "02",
    title: "Keep your details ready",
    description:
      "Have your laboratory visit information available.",
  },
  {
    number: "03",
    title: "Need assistance?",
    description:
      "Contact Anmol Lab if you need help accessing a report.",
  },
];

export default function PatientReports() {
  return (
    <section
      id="patient-reports"
      className={styles.section}
      aria-labelledby="reports-heading"
    >
      <div className={styles.container}>
        <div className={styles.meta}>
          <span>07 / PATIENT REPORTS</span>
          <span>YOUR RESULTS</span>
        </div>

        <header className={styles.header}>
          <span className={styles.eyebrow}>
            REPORT ACCESS
          </span>

          <h2 id="reports-heading" className={styles.heading}>
            Your reports, within
            <em> reach.</em>
          </h2>
        </header>

        <div className={styles.cards}>
          {reportSteps.map((step) => (
            <article className={styles.card} key={step.number}>
              <span className={styles.cardNumber}>
                {step.number}
              </span>

              <div className={styles.cardContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.actionRow}>
          <Link href="/reports" className={styles.action}>
            Access patient reports
          </Link>
        </div>
      </div>
    </section>
  );
}
