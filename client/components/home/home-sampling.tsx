
import Link from "next/link";

import styles from "./home-sampling.module.css";

const steps = [
  {
    number: "01",
    title: "Share your address",
    description: "Tell us where you would like your sample collected.",
  },
  {
    number: "02",
    title: "Choose a preferred time",
    description: "Let the laboratory know when a collection would suit you.",
  },
  {
    number: "03",
    title: "Receive confirmation",
    description: "The laboratory will confirm availability and the next steps.",
  },
];

export default function HomeSampling() {
  return (
    <section
      id="home-sampling"
      className={styles.section}
      aria-labelledby="home-sampling-title"
    >
      <div className={styles.container}>
        <div className={styles.meta}>
          <span>05 / HOME SAMPLING</span>
          <span>AT-HOME COLLECTION</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>
              CARE BEYOND THE LAB
            </span>

            <h2 id="home-sampling-title" className={styles.heading}>
              Testing, a little
              <em> closer to home.</em>
            </h2>

            <p className={styles.description}>
              Visiting the laboratory isn't always convenient.
              Request a home sample collection by sharing your
              address and preferred time. The team will confirm
              availability and guide you through the next steps.
            </p>

            <div className={styles.actionRow}>
              <Link href="#contact" className={styles.action}>
                Request home sampling
              </Link>
            </div>
          </div>

          <aside
            className={styles.panel}
            aria-labelledby="sampling-process-title"
          >
            <div className={styles.panelHeading}>
              <span className={styles.panelEyebrow}>
                HOME COLLECTION
              </span>

              <h3 id="sampling-process-title">
                How it works.
              </h3>
            </div>

            <ol className={styles.steps}>
              {steps.map((step) => (
                <li className={styles.step} key={step.number}>
                  <span className={styles.stepNumber}>
                    {step.number}
                  </span>

                  <div className={styles.stepContent}>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
