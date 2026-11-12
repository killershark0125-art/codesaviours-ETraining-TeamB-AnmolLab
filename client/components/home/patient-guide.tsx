
import styles from "./patient-guide.module.css";

const steps = [
  {
    number: "01",
    title: "Find a test",
    description: "Browse the available test catalogue.",
  },
  {
    number: "02",
    title: "Confirm details",
    description: "Check pricing, availability and preparation.",
  },
  {
    number: "03",
    title: "Connect with us",
    description: "Discuss booking and the next steps.",
  },
];

export default function PatientGuide() {
  return (
    <section
      id="how-it-works"
      className={styles.section}
      aria-labelledby="guide-heading"
    >
      <div className={styles.container}>
        <div className={styles.meta}>
          <span>03 / PATIENT GUIDE</span>
          <span>THREE SIMPLE STEPS</span>
        </div>

        <header className={styles.header}>
          <span className={styles.eyebrow}>YOUR NEXT STEPS</span>

          <h2 id="guide-heading" className={styles.heading}>
            A clearer way to <em>begin.</em>
          </h2>
        </header>

        <div className={styles.steps}>
          {steps.map((step) => (
            <article className={styles.step} key={step.number}>
              <span className={styles.stepNumber}>
                {step.number}
              </span>

              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.actionRow}>
          <a href="/contact" className={styles.action}>
            Contact the laboratory
            
          </a>
        </div>
      </div>
    </section>
  );
}
