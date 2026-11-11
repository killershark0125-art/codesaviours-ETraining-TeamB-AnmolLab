
import styles from "./about-lab.module.css";

export default function AboutLab() {
  return (
    <section
      id="about"
      className={styles.section}
      aria-labelledby="about-heading"
    >
      <div className={styles.container}>
        <div className={styles.meta}>
          <span>02 / ABOUT THE LAB</span>
          <span>FAISALABAD, PAKISTAN</span>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            ANMOL HEALTH CARE LAB
          </span>

          <h2 id="about-heading" className={styles.heading}>
            Clarity is part of <em>care.</em>
          </h2>

          <div className={styles.description}>
            <p>
              Anmol Health Care Lab is based in Faisalabad,
              Pakistan. This website brings laboratory
              information, diagnostic test discovery and
              patient resources together in one place.
            </p>

            <p>
              Explore the information currently available
              and contact the laboratory directly to confirm
              test availability and service arrangements.
            </p>
          </div>

          <div className={styles.actionRow}>
            <a
              href="#how-it-works"
              className={`hero-action-secondary ${styles.action}`}
            >
              <span>Explore the patient guide</span>
              
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
