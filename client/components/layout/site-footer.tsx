import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/lib/site";
import styles from "./site-footer.module.css";

const exploreLinks = [
  { label: "About the laboratory", href: "/about" },
  { label: "Find a test", href: "/tests" },
  { label: "Health packages", href: "/packages" },
  { label: "For doctors", href: "/doctors" },
  { label: "Latest articles", href: "/blog" },
  { label: "Frequently asked questions", href: "/faq" },
];

const patientLinks = [
  { label: "Book a test", href: "/book" },
  { label: "Home sampling", href: "/home-sampling" },
  { label: "Our locations", href: "/branches" },
  { label: "Patient reports", href: "/reports" },
  { label: "Contact the laboratory", href: "/contact" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerMain}>
          <div className={styles.brand}>
            <Link
              href="/"
              className={styles.brandLogoLink}
              aria-label={`${siteConfig.name} home`}
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
            aria-label="Explore the laboratory"
          >
            <h2>EXPLORE</h2>

            {exploreLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <nav
            className={styles.linkGroup}
            aria-label="Patient services and information"
          >
            <h2>PATIENT SERVICES</h2>

            {patientLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.contactGroup}>
            <h2>CONTACT</h2>

            <a
              className={styles.address}
              href={siteConfig.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.address}
            </a>

            <div className={styles.contactLinks}>
              {siteConfig.phones.map((phone) => (
                <a href={phone.href} key={phone.href}>
                  {phone.display}
                </a>
              ))}

              <a href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>
            © 2026 {siteConfig.name}.
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