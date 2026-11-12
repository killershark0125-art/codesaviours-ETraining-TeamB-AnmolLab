
import Link from "next/link";
import Image from "next/image";
import styles from "./site-footer.module.css";

const exploreLinks = [
  { label: "Find a Test", href: "/tests" },
  { label: "Health Packages", href: "/packages" },
  { label: "Patient Guide", href: "/#how-it-works" },
  { label: "Home Sampling", href: "/#home-sampling" },
];

const patientLinks = [
  { label: "Our Locations", href: "/#branches" },
  { label: "Patient Reports", href: "/reports" },
  { label: "Get in Touch", href: "/#contact" },
];

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

export default function SiteFooter() {
  

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerMain}>
          <div className={styles.brand}>
<Link
  href="/"
  className={styles.brandLogoLink}
  aria-label="Anmol Health Care Lab home"
>
  <Image
    src="/brand/logo-full-white.png"
    alt=""
    width={88}
    height={88}
    className={styles.brandLogo}
  />
</Link>

            <p className={styles.brandDescription}>
              Precision in every test.
              <br />
              Care in every patient.
            </p>

            <div className={styles.actions}>
              <Link
                href="/book"
                className={styles.primaryAction}
              >
                Book a Test
              </Link>

              <Link
                href="/reports"
                className={styles.secondaryAction}
              >
                Download Report
              </Link>
            </div>
          </div>

          <nav
            className={styles.linkGroup}
            aria-label="Explore"
          >
            <h2>EXPLORE</h2>

            {exploreLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav
            className={styles.linkGroup}
            aria-label="Patient services"
          >
            <h2>PATIENT SERVICES</h2>

            {patientLinks.map((link) => (
              <Link href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.contactGroup}>
            <h2>CONTACT</h2>

            <a
              className={styles.address}
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {address}
            </a>

            <div className={styles.contactLinks}>
              {phoneNumbers.map((phone) => (
                <a href={phone.href} key={phone.href}>
                  {phone.label}
                </a>
              ))}

              <a href={`mailto:${email}`}>
                {email}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>
            © 2026 Anmol Health Care Lab.
            All rights reserved.
          </span>

          <Link href="/" className={styles.backHome}>
            Back to home
          </Link>
        </div>
      </div>
    </footer>
  );
}
