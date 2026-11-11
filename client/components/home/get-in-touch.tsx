
import styles from "./get-in-touch.module.css";

const phoneNumbers = [
  {
    label: "0316-6474766",
    href: "tel:+923166474766",
  },
  {
    label: "0321-6671476",
    href: "tel:+92321667476",
  },
];

const email = "anmollaboratory@gmail.com";

const address =
  "Sultani Chowk, Gulshan Muhammad Abad, Faisalabad";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Anmol%20Health%20Care%20Lab%2C%20Sultani%20Chowk%2C%20Gulshan%20Muhammad%20Abad%2C%20Faisalabad";

export default function GetInTouch() {
  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className={styles.container}>
        <div className={styles.meta}>
          <span>08 / GET IN TOUCH</span>
          <span>WE'RE HERE TO HELP</span>
        </div>

        <header className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>
              LET'S CONNECT
            </span>

            <h2 id="contact-heading" className={styles.headingTitle}>
              A conversation
              <em> starts here.</em>
            </h2>
          </div>

          <p className={styles.intro}>
            Have a question about a test, need help with
            a booking, or simply want to learn more?
            Get in touch with our laboratory team.
          </p>
        </header>

        <div className={styles.contactGrid}>
          <article className={styles.contactCard}>
            <span className={styles.cardNumber}>01</span>

            <div className={styles.cardContent}>
              <span className={styles.cardEyebrow}>
                CALL THE LAB
              </span>

              <h3>Speak with our team.</h3>

              <p>
                Reach out directly for assistance
                and general enquiries.
              </p>

              <div className={styles.contactLinks}>
                {phoneNumbers.map((phone) => (
                  <a href={phone.href} key={phone.href}>
                    {phone.label}
                  </a>
                ))}
              </div>
            </div>
          </article>

          <article className={styles.contactCard}>
            <span className={styles.cardNumber}>02</span>

            <div className={styles.cardContent}>
              <span className={styles.cardEyebrow}>
                EMAIL THE LAB
              </span>

              <h3>Send us a message.</h3>

              <p>
                Write to us for questions and
                laboratory-related enquiries.
              </p>

              <div className={styles.contactLinks}>
                <a href={`mailto:${email}`}>
                  {email}
                </a>
              </div>
            </div>
          </article>

          <article className={styles.contactCard}>
            <span className={styles.cardNumber}>03</span>

            <div className={styles.cardContent}>
              <span className={styles.cardEyebrow}>
                VISIT THE LAB
              </span>

              <h3>Find your way here.</h3>

              <p>{address}</p>

              <div className={styles.contactLinks}>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
