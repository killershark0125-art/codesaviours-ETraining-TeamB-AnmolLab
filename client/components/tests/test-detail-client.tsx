
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import { searchTests } from "@/lib/api/tests";
import { formatPrice } from "@/lib/format";
import { addTestToCart } from "@/lib/cart-store";

import type { TestSummary } from "@/lib/types";

import styles from "./test-detail-client.module.css";

type SettledRequest = {
  key: string;
  test: TestSummary | null;
  error: string | null;
};

type TestDetailClientProps = {
  slug: string;
};

function getSearchTerms(slug: string): string[] {
  const words = slug
    .replace(/[-_]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((word) => word.length >= 2);

  return Array.from(
    new Set([words.join(" "), ...words]),
  ).filter(Boolean).slice(0, 5);
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "We couldn't load this test right now. Please try again.";
}

export default function TestDetailClient({
  slug,
}: TestDetailClientProps) {
  const [settled, setSettled] = useState<SettledRequest | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [cartMessage, setCartMessage] = useState("");

  const requestKey = `${slug}:${retryCount}`;
  const isLoading = settled?.key !== requestKey;

  const test = isLoading ? null : settled?.test ?? null;
  const error = isLoading ? null : settled?.error ?? null;

  useEffect(() => {
    const controller = new AbortController();

    async function loadTest() {
      try {
        const searchTerms = getSearchTerms(slug);
        let matchedTest: TestSummary | null = null;

        for (const query of searchTerms) {
          if (controller.signal.aborted) return;

const result = await searchTests(
  {
    query,
    category: "",
    page: 1,
    limit: 100,
  },
  controller.signal,
);

          matchedTest =
            result.items.find(
              (item) => item.slug.toLowerCase() === slug.toLowerCase(),
            ) ?? null;

          if (matchedTest) break;
        }

        if (controller.signal.aborted) return;

        setSettled({
          key: requestKey,
          test: matchedTest,
          error: null,
        });
      } catch (requestError) {
        if (controller.signal.aborted) return;

        setSettled({
          key: requestKey,
          test: null,
          error: getErrorMessage(requestError),
        });
      }
    }

    void loadTest();

    return () => controller.abort();
  }, [slug, retryCount, requestKey]);

  function handleAddToCart() {
    if (!test) return;

    const added = addTestToCart(test);

    setCartMessage(
      added
        ? `${test.name} has been added to your cart.`
        : `${test.name} is already in your cart.`,
    );
  }

  function handleRetry() {
    setCartMessage("");
    setRetryCount((current) => current + 1);
  }

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>
              ANMOL HEALTH CARE LAB
            </p>

            <h1>
              Test <span>details</span>
            </h1>

            <p className={styles.heroDescription}>
              Review the available catalogue information before
              adding a test to your booking.
            </p>
          </div>
        </section>

        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/tests">Tests</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Details</span>
          </nav>

          {isLoading && (
            <section
              className={styles.stateCard}
              aria-live="polite"
              aria-busy="true"
            >
              <span className={styles.spinner} aria-hidden="true" />
              <h2>Loading test information</h2>
              <p>
                Retrieving the latest available catalogue record.
              </p>
            </section>
          )}

          {!isLoading && error && (
            <section className={styles.stateCard} role="alert">
              <span className={styles.stateIcon} aria-hidden="true">
                !
              </span>

              <h2>Unable to load this test</h2>
              <p>{error}</p>

              <div className={styles.stateActions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleRetry}
                >
                  Try again
                </button>

                <Link href="/tests" className={styles.textLink}>
                  Browse all tests
                </Link>
              </div>
            </section>
          )}

          {!isLoading && !error && !test && (
            <section className={styles.stateCard}>
              <span className={styles.stateIcon} aria-hidden="true">
                ?
              </span>

              <h2>Test not found</h2>
              <p>
                This test could not be matched to an active catalogue
                record. It may have been removed or the link may be
                incorrect.
              </p>

              <Link href="/tests" className={styles.primaryButton}>
                Browse available tests
              </Link>
            </section>
          )}

          {!isLoading && !error && test && (
            <>
              <section className={styles.detailLayout}>
                <article className={styles.detailCard}>
                  <div className={styles.detailTop}>
                    <span className={styles.category}>
                      {test.category}
                    </span>

                    {test.code && (
                      <span className={styles.testCode}>
                        Code: {test.code}
                      </span>
                    )}
                  </div>

                  <p className={styles.detailEyebrow}>
                    LABORATORY TEST
                  </p>

                  <h2 className={styles.testName}>
                    {test.name}
                  </h2>

                  <p className={styles.description}>
                    This test is listed in the Anmol Health Care Lab
                    catalogue. Contact the laboratory for any
                    test-specific preparation or sample requirements
                    not displayed here.
                  </p>

                  <div className={styles.informationList}>
                    <div className={styles.informationRow}>
                      <span>Category</span>
                      <strong>{test.category}</strong>
                    </div>

                    {test.code && (
                      <div className={styles.informationRow}>
                        <span>Test code</span>
                        <strong>{test.code}</strong>
                      </div>
                    )}

                    <div className={styles.informationRow}>
                      <span>Catalogue status</span>
                      <strong className={styles.activeStatus}>
                        Available in catalogue
                      </strong>
                    </div>
                  </div>
                </article>

                <aside className={styles.bookingCard}>
                  <p className={styles.bookingEyebrow}>
                    BOOKING INFORMATION
                  </p>

                  <h2>Test pricing</h2>

                  {test.priceStatus === "confirmed" &&
                  test.price !== null ? (
                    <p className={styles.price}>
                      {formatPrice(test.price)}
                    </p>
                  ) : (
                    <div className={styles.pendingPrice}>
                      <strong>Price confirmation required</strong>
                      <span>
                        Contact the laboratory for the latest price.
                      </span>
                    </div>
                  )}

                  <p className={styles.bookingDescription}>
                    Add this test to your cart to continue with your
                    booking.
                  </p>

                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                    <span aria-hidden="true">→</span>
                  </button>

                  {cartMessage && (
                    <p
                      className={styles.cartMessage}
                      role="status"
                      aria-live="polite"
                    >
                      {cartMessage}
                    </p>
                  )}

                  <Link href="/cart" className={styles.cartLink}>
                    View your cart
                  </Link>

                  <div className={styles.bookingDivider} />

                  <p className={styles.helpText}>
                    Need help before booking?
                  </p>

                  <Link href="/contact" className={styles.contactLink}>
                    Contact the laboratory
                  </Link>
                </aside>
              </section>

              <section className={styles.notice}>
                <span className={styles.noticeMark} aria-hidden="true">
                  i
                </span>

                <div>
                  <h2>Before your visit</h2>
                  <p>
                    Preparation, sample requirements and other
                    instructions can vary by test. Please confirm
                    the correct instructions with the laboratory
                    before your appointment.
                  </p>
                </div>
              </section>

              <div className={styles.bottomNavigation}>
                <Link href="/tests" className={styles.textLink}>
                  ← Back to test catalogue
                </Link>

                <Link href="/book" className={styles.textLink}>
                  Continue to booking →
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
