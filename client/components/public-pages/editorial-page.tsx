import type { ReactNode } from "react";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import VisualPageHero from "@/components/layout/visual-page-hero";

import styles from "./editorial-page.module.css";

export type EditorialCard = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

export type EditorialTextSection = {
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type EditorialFaq = {
  question: string;
  answer: string;
};

export type EditorialAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type EditorialPageProps = {
  hero: {
    eyebrow: string;
    title: ReactNode;
    description: string;
    imageSrc: string;
    imageAlt: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref: string;
    secondaryLabel: string;
  };

  overview: {
    eyebrow: string;
    title: ReactNode;
    description: string;
  };

  details: {
    eyebrow: string;
    title: ReactNode;
    description: string;
    cards?: EditorialCard[];
    sections?: EditorialTextSection[];
    faqs?: EditorialFaq[];
    emptyState?: {
      eyebrow: string;
      title: string;
      description: string;
    };
  };

  closing: {
    eyebrow: string;
    title: ReactNode;
    description: string;
    actions: EditorialAction[];
  };

  notice?: string;
};

export default function EditorialPage({
  hero,
  overview,
  details,
  closing,
  notice,
}: EditorialPageProps) {
  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <VisualPageHero
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
          imageSrc={hero.imageSrc}
          imageAlt={hero.imageAlt}
          imagePosition="center center"
          mobileImagePosition="center center"
          primaryHref={hero.primaryHref}
          primaryLabel={hero.primaryLabel}
          secondaryHref={hero.secondaryHref}
          secondaryLabel={hero.secondaryLabel}
        />

        <section
          className={styles.overview}
          aria-labelledby="editorial-overview-title"
        >
          <div className={styles.container}>
            <div className={styles.sectionMeta}>
              <span>01 / ANMOL HEALTH CARE LAB</span>
              <span>INFORMATION & SERVICES</span>
            </div>

            <div className={styles.overviewHeading}>
              <div>
                <span className={styles.eyebrow}>
                  {overview.eyebrow}
                </span>

                <h2 id="editorial-overview-title">
                  {overview.title}
                </h2>
              </div>

              <p>{overview.description}</p>
            </div>
          </div>
        </section>

        <section
          className={styles.details}
          aria-labelledby="editorial-details-title"
        >
          <div className={styles.container}>
            <div className={styles.sectionMeta}>
              <span>02 / EXPLORE</span>
              <span>PRECISION & CARE</span>
            </div>

            <header className={styles.detailsHeading}>
              <span className={styles.darkEyebrow}>
                {details.eyebrow}
              </span>

              <h2 id="editorial-details-title">
                {details.title}
              </h2>

              <p>{details.description}</p>
            </header>

            {details.cards && details.cards.length > 0 && (
              <div className={styles.cardGrid}>
                {details.cards.map((card) => (
                  <article
                    className={styles.card}
                    key={card.number}
                  >
                    <span className={styles.cardNumber}>
                      {card.number}
                    </span>

                    <div className={styles.cardContent}>
                      <span className={styles.cardEyebrow}>
                        {card.eyebrow}
                      </span>

                      <h3>{card.title}</h3>

                      <p>{card.description}</p>
                    </div>

                    {card.href && card.linkLabel && (
                      <Link
                        href={card.href}
                        className={styles.cardLink}
                      >
                        {card.linkLabel}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            )}

            {details.faqs && details.faqs.length > 0 && (
              <div className={styles.faqList}>
                {details.faqs.map((faq, index) => (
                  <details
                    className={styles.faqItem}
                    key={faq.question}
                  >
                    <summary>
                      <span className={styles.faqNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className={styles.faqQuestion}>
                        {faq.question}
                      </span>

                      <span
                        className={styles.faqIcon}
                        aria-hidden="true"
                      />
                    </summary>

                    <div className={styles.faqAnswer}>
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            )}

            {details.sections && details.sections.length > 0 && (
              <div className={styles.textGrid}>
                {details.sections.map((section) => (
                  <article
                    className={styles.textCard}
                    key={section.number}
                  >
                    <span className={styles.cardNumber}>
                      {section.number}
                    </span>

                    <h3>{section.title}</h3>

                    <div className={styles.textContent}>
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={`${section.number}-${index}`}>
                          {paragraph}
                        </p>
                      ))}

                      {section.bullets && (
                        <ul>
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {details.emptyState && (
              <div className={styles.emptyState} role="status">
                <span className={styles.cardEyebrow}>
                  {details.emptyState.eyebrow}
                </span>

                <h3>{details.emptyState.title}</h3>

                <p>{details.emptyState.description}</p>
              </div>
            )}

            {notice && (
              <p className={styles.notice}>
                <span aria-hidden="true">i</span>
                {notice}
              </p>
            )}
          </div>
        </section>

        <section className={styles.closing}>
          <div className={styles.container}>
            <div className={styles.closingCard}>
              <span className={styles.eyebrow}>
                {closing.eyebrow}
              </span>

              <h2>{closing.title}</h2>

              <p>{closing.description}</p>

              <div className={styles.closingActions}>
                {closing.actions.map((action) => (
                  <Link
                    href={action.href}
                    className={
                      action.variant === "primary"
                        ? styles.primaryAction
                        : styles.secondaryAction
                    }
                    key={`${action.href}-${action.label}`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}