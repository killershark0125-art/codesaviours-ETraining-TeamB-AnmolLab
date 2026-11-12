
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import styles from "./visual-page-hero.module.css";

type VisualPageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  mobileImagePosition?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export default function VisualPageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  mobileImagePosition = "center",
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: VisualPageHeroProps) {
  const imageStyle = {
    "--hero-image-position": imagePosition,
    "--hero-mobile-image-position": mobileImagePosition,
  } as CSSProperties;

  return (
    <section
      className={styles.hero}
      aria-labelledby="visual-page-hero-title"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className={styles.image}
        style={imageStyle}
      />

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{eyebrow}</span>

          <h1 id="visual-page-hero-title" className={styles.title}>
            {title}
          </h1>

          <p className={styles.description}>{description}</p>

          <div className={`cinema-hero-actions ${styles.actions}`}>
            <Link href={primaryHref} className="hero-action-primary">
              {primaryLabel}
            </Link>

            <Link href={secondaryHref} className="hero-action-secondary">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
