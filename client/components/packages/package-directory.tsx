
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import CellularBackground from "@/components/home/cellular-background";
import { getHealthPackages } from "@/lib/api/packages";
import { formatPrice } from "@/lib/format";
import type { HealthPackage } from "@/lib/types";

import styles from "./package-directory.module.css";

type PackageDirectoryProps = {
  variant?: "preview" | "full";
};

type RequestStatus = "loading" | "success" | "error";

export default function PackageDirectory({
  variant = "full",
}: PackageDirectoryProps) {
  const [packages, setPackages] = useState<HealthPackage[]>([]);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempt, setAttempt] = useState(0);

  const isPreview = variant === "preview";

  const visiblePackages = isPreview
    ? packages.slice(0, 3)
    : packages;

  useEffect(() => {
    const controller = new AbortController();

    getHealthPackages(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;

        setPackages(result.items);
        setStatus("success");
        setErrorMessage("");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "The package catalogue could not be loaded.",
        );

        setStatus("error");
      });

    return () => controller.abort();
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setErrorMessage("");
    setAttempt((current) => current + 1);
  }

  return (
    <section
      id="packages"
      className={`${styles.section} ${
        isPreview ? styles.preview : styles.full
      }`}
      aria-labelledby="packages-title"
    >
      {isPreview ? (
        <div className={styles.container}>
          <div className={styles.previewHeading}>
            <div>
              <span className={styles.sectionLabel}>
                04 / HEALTH PACKAGES
              </span>

              <h2 id="packages-title">
                A considered approach to
                <em> preventive health.</em>
              </h2>
            </div>

            <p>
              Explore the laboratory&apos;s currently available
              health packages and their included diagnostic tests.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.fullHero}>
          <CellularBackground />

          <div
            className={styles.heroShade}
            aria-hidden="true"
          />

          <div className={styles.heroInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Health packages</span>
            </div>

            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>
                ANMOL HEALTH CARE LAB
                <span className={styles.eyebrowLine} />
                HEALTH PACKAGES
              </span>

              <h1 id="packages-title">
                Thoughtful testing.
                <br />
                <em>Clearer choices.</em>
              </h1>

              <p>
                Explore laboratory packages, their included
                tests and verified pricing information.
              </p>

              <Link
                href="#package-list"
                className={styles.heroAction}
              >
                Explore packages
                <span aria-hidden="true">↓</span>
              </Link>
            </div>

            <div className={styles.heroFoot}>
              <span>ANMOL HEALTH CARE LAB</span>
              <span>DETAILED DIAGNOSTICS</span>
              <span>DISCOVER MORE ↓</span>
            </div>
          </div>
        </div>
      )}

      <div
        id="package-list"
        className={styles.container}
      >
        <div className={styles.resultsHeading}>
          <div>
            <span className={styles.resultsEyebrow}>
              AVAILABLE PACKAGES
            </span>

            <p>
              {status === "loading"
                ? "Retrieving package information..."
                : status === "success"
                  ? `${packages.length} ${
                      packages.length === 1
                        ? "package"
                        : "packages"
                    } available`
                  : "Package information"}
            </p>
          </div>

          {isPreview &&
            status === "success" &&
            packages.length > 3 && (
              <Link
                href="/packages"
                className={styles.viewAll}
              >
                View all packages
                <span aria-hidden="true">↗</span>
              </Link>
            )}
        </div>

        {status === "loading" && (
          <div
            className={styles.state}
            role="status"
            aria-live="polite"
          >
            <span className={styles.spinner} aria-hidden="true" />
            <strong>Loading health packages</strong>
            <p>Retrieving current package information.</p>
          </div>
        )}

        {status === "error" && (
          <div className={styles.state} role="alert">
            <span className={styles.stateEyebrow}>
              PACKAGE INFORMATION
            </span>

            <h3>Packages are temporarily unavailable.</h3>

            <p>{errorMessage}</p>

            <button
              type="button"
              className={styles.retryButton}
              onClick={retry}
            >
              Try again
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}

        {status === "success" && packages.length === 0 && (
          <div className={styles.state}>
            <span className={styles.stateEyebrow}>
              PACKAGE INFORMATION
            </span>

            <h3>No active packages are currently listed.</h3>

            <p>
              The laboratory has not published any active
              health packages. Please check again later.
            </p>
          </div>
        )}

        {status === "success" && visiblePackages.length > 0 && (
          <div className={styles.packageGrid}>
            {visiblePackages.map((item, index) => {
              const hasPackagePrice = item.packagePrice !== null;
              const hasOriginalPrice = item.originalPrice !== null;
              const hasSavings =
                item.savings !== null && item.savings > 0;

              return (
                <article
                  key={item.id}
                  className={styles.packageCard}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.cardIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {item.discountPercentage > 0 && (
                      <span className={styles.discount}>
                        {item.discountPercentage}% discount
                      </span>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <span className={styles.cardEyebrow}>
                      LABORATORY PACKAGE
                    </span>

                    <h3>{item.name}</h3>

                    {item.description && (
                      <p className={styles.description}>
                        {item.description}
                      </p>
                    )}

                    <div className={styles.includedHeading}>
                      <span>INCLUDED TESTS</span>
                      <span>
                        {item.includedTests.length} tests
                      </span>
                    </div>

                    {item.includedTests.length > 0 ? (
                      <ul className={styles.testList}>
                        {item.includedTests
                          .slice(0, 6)
                          .map((test) => (
                            <li key={test.id}>
                              <span aria-hidden="true">+</span>
                              {test.name}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className={styles.missingTests}>
                        Included test details are unavailable.
                      </p>
                    )}

                    {item.includedTests.length > 6 && (
                      <p className={styles.moreTests}>
                        And {item.includedTests.length - 6} more tests
                      </p>
                    )}
                  </div>

                  <div className={styles.pricing}>
                    <span className={styles.priceLabel}>
                      PACKAGE PRICE
                    </span>

                    <strong className={styles.packagePrice}>
                      {hasPackagePrice
                        ? formatPrice(item.packagePrice!)
                        : "Price unavailable"}
                    </strong>

                    {hasOriginalPrice && (
                      <span className={styles.originalPrice}>
                        Regular total:{" "}
                        {formatPrice(item.originalPrice!)}
                      </span>
                    )}

                    {hasSavings && (
                      <span className={styles.savings}>
                        Savings: {formatPrice(item.savings!)}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardFooter}>
                    <Link href="/tests">
                      Explore individual tests
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {isPreview &&
          status === "success" &&
          packages.length > 0 && (
            <div className={styles.mobileViewAll}>
              <Link href="/packages">
                Explore all packages
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}

        {!isPreview && (
          <div className={styles.disclaimer}>
            <span aria-hidden="true">i</span>
            <p>
              Package information and prices are displayed
              according to the published laboratory catalogue.
              Confirm package availability and details directly
              with Anmol Lab. This information is not medical advice.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
