"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import { getHealthPackages } from "@/lib/api/packages";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";

import type { HealthPackage } from "@/lib/types";

import styles from "./package-detail.module.css";

type PageState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "not-found" }
  | { status: "success"; item: HealthPackage };

export default function PackageDetailClient({
  slug,
}: {
  slug: string;
}) {
  const [state, setState] = useState<PageState>({
    status: "loading",
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setState({ status: "loading" });

    getHealthPackages(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;

        const item = result.items.find(
          (entry) =>
            entry.slug === slug &&
            entry.isActive === true,
        );

        setState(
          item
            ? { status: "success", item }
            : { status: "not-found" },
        );
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Package information could not be loaded.",
        });
      });

    return () => controller.abort();
  }, [slug, attempt]);

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/packages">Health packages</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">
              {state.status === "success"
                ? state.item.name
                : "Package details"}
            </span>
          </nav>

          {state.status === "loading" && (
            <section className={styles.statePanel} role="status">
              <span className={styles.spinner} aria-hidden="true" />
              <h1>Loading package details</h1>
              <p>
                Retrieving the latest package information from the
                laboratory catalogue.
              </p>
            </section>
          )}

          {state.status === "error" && (
            <section className={styles.statePanel} role="alert">
              <span className={styles.stateLabel}>
                PACKAGE INFORMATION
              </span>

              <h1>We couldn't load this package.</h1>

              <p>{state.message}</p>

              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => setAttempt((current) => current + 1)}
              >
                Try again
              </button>

              <Link href="/packages" className={styles.textLink}>
                Return to packages
              </Link>
            </section>
          )}

          {state.status === "not-found" && (
            <section className={styles.statePanel}>
              <span className={styles.stateLabel}>
                PACKAGE NOT AVAILABLE
              </span>

              <h1>This package could not be found.</h1>

              <p>
                It may no longer be published, or its address may
                have changed. Browse the current package catalogue
                for available options.
              </p>

              <Link href="/packages" className={styles.primaryButton}>
                Browse health packages
              </Link>
            </section>
          )}

          {state.status === "success" && (
            <PackageContent item={state.item} />
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function PackageContent({ item }: { item: HealthPackage }) {
  const hasPackagePrice = item.packagePrice !== null;
  const hasOriginalPrice = item.originalPrice !== null;
  const hasSavings = item.savings !== null && item.savings > 0;

  const emailBody = [
    `Hello ${siteConfig.name},`,
    "",
    `I would like to enquire about the ${item.name}.`,
    "",
    "Please confirm its current availability, included tests and final price.",
    "",
    "Thank you.",
  ].join("\n");

  const emailHref =
    `mailto:${siteConfig.email}` +
    `?subject=${encodeURIComponent(`Enquiry about ${item.name}`)}` +
    `&body=${encodeURIComponent(emailBody)}`;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>
            ANMOL HEALTH CARE LAB / HEALTH PACKAGES
          </span>

          <span className={styles.category}>LABORATORY PACKAGE</span>

          <h1>{item.name}</h1>

          <p>
            {item.description ||
              "View the included tests and available pricing information for this laboratory package."}
          </p>

          <div className={styles.heroMeta}>
            <span>
              {item.includedTests.length}{" "}
              {item.includedTests.length === 1
                ? "TEST INCLUDED"
                : "TESTS INCLUDED"}
            </span>

            {item.discountPercentage > 0 && (
              <span>{item.discountPercentage}% DISCOUNT</span>
            )}
          </div>
        </div>

        <aside className={styles.priceCard}>
          <span className={styles.priceEyebrow}>PACKAGE PRICE</span>

          <strong className={styles.packagePrice}>
            {hasPackagePrice
              ? formatPrice(item.packagePrice!)
              : "Price unavailable"}
          </strong>

          {hasOriginalPrice && (
            <span className={styles.originalPrice}>
              Regular total: {formatPrice(item.originalPrice!)}
            </span>
          )}

          {hasSavings && (
            <span className={styles.savings}>
              Savings: {formatPrice(item.savings!)}
            </span>
          )}

          <p>
            Confirm the current package price and availability
            with the laboratory before your visit.
          </p>

          <a
            href={siteConfig.phones[0].href}
            className={styles.primaryButton}
          >
            Call to enquire
            <span aria-hidden="true">↗</span>
          </a>

          <a href={emailHref} className={styles.secondaryButton}>
            Email about this package
          </a>
        </aside>
      </section>

      <section className={styles.testsSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionLabel}>
              01 / PACKAGE CONTENTS
            </span>

            <h2>
              What's <em>included.</em>
            </h2>
          </div>

          <p>
            The following tests are listed in the laboratory's
            package catalogue.
          </p>
        </div>

        {item.includedTests.length > 0 ? (
          <div className={styles.testList}>
            {item.includedTests.map((test, index) => (
              <article className={styles.testItem} key={test.id}>
                <span className={styles.testNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.testInfo}>
                  <h3>{test.name}</h3>
                  <span>Included laboratory test</span>
                </div>

                <div className={styles.testPrice}>
                  <strong>
                    {test.price === null
                      ? "Price pending"
                      : formatPrice(test.price)}
                  </strong>

                  <span>
                    {test.priceStatus === "confirmed"
                      ? "CONFIRMED PRICE"
                      : "TO BE CONFIRMED"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyTests}>
            <h3>Included test details are not available.</h3>
            <p>
              Contact the laboratory for the current package
              contents and clarification.
            </p>
          </div>
        )}
      </section>

      <section className={styles.information}>
        <div className={styles.informationGrid}>
          <div>
            <span className={styles.sectionLabel}>
              02 / BEFORE YOUR VISIT
            </span>

            <h2>
              Confirm the details <em>first.</em>
            </h2>

            <p>
              Package availability, included tests, preparation
              requirements and pricing can be confirmed directly
              with the laboratory.
            </p>
          </div>

          <div className={styles.informationCard}>
            <span>NEED HELP WITH THIS PACKAGE?</span>

            <a href={siteConfig.phones[0].href}>
              {siteConfig.phones[0].display}
            </a>

            <a href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>

            <Link href="/contact">
              Contact information
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.bottomActions}>
        <Link href="/packages" className={styles.textLink}>
          ← Back to all packages
        </Link>

        <Link href="/book" className={styles.bookingLink}>
          Continue to test booking
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </>
  );
}