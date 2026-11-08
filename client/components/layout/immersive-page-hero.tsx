
import Link from "next/link";

import CellularBackground from "@/components/home/cellular-background";

import styles from "./immersive-page-hero.module.css";

type HeroAction = {
  label: string;
  href: string;
};

type HeroVariant =
  | "about"
  | "tests"
  | "packages"
  | "sampling"
  | "branches"
  | "contact"
  | "reports";

type ImmersivePageHeroProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  variant: HeroVariant;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
};

export default function ImmersivePageHero({
  eyebrow,
  title,
  accent,
  description,
  variant,
  primaryAction,
  secondaryAction,
}: ImmersivePageHeroProps) {
  return (
    <section
      className={`${styles.hero} ${styles[variant]}`}
      aria-labelledby={`${variant}-hero-title`}
    >
      <CellularBackground />

      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.breadcrumb}>
            <span>ANMOL HEALTH CARE LAB</span>
            <span aria-hidden="true">/</span>
            <span>{eyebrow}</span>
          </Link>

          <span className={styles.topIndex}>
            LABORATORY / {variant.toUpperCase()}
          </span>
        </div>

        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            {eyebrow}
          </span>

          <h1 id={`${variant}-hero-title`}>
            {title}
            <br />
            <em>{accent}</em>
          </h1>

          <p>{description}</p>

          {(primaryAction || secondaryAction) && (
            <div className={styles.actions}>
              {primaryAction && (
                <Link
                  href={primaryAction.href}
                  className={styles.primaryAction}
                >
                  {primaryAction.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              )}

              {secondaryAction && (
                <Link
                  href={secondaryAction.href}
                  className={styles.secondaryAction}
                >
                  {secondaryAction.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              )}
            </div>
          )}
        </div>

        <div className={styles.bottom}>
          <span>ANMOL HEALTH CARE LAB</span>
          <span>DETAILED DIAGNOSTICS</span>
          <span>DISCOVER MORE ↓</span>
        </div>
      </div>
    </section>
  );
}
