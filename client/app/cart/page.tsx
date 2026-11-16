
"use client";

import Link from "next/link";
import { useId, useMemo, type FormEvent } from "react";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import {
  addTestToCart,
  clearCart,
  removePackageFromCart,
  removeTestFromCart,
  useCart,
  usePackageCart,
} from "@/lib/cart-store";

import { calculateCartPricing } from "@/lib/cart-pricing";
import { getApiBaseUrl } from "@/lib/api/http";
import { RESULT_LIMIT } from "@/lib/api/tests";
import { useTestSearch } from "@/lib/hooks/use-test-search";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";

import styles from "./cart.module.css";

export default function CartPage() {
  const searchId = useId();

  const cart = useCart();
  const packageCart = usePackageCart();

  const apiConfigured = Boolean(getApiBaseUrl());

  const search = useTestSearch({
    initialLoad: true,
    initialQuery: "",
    limit: RESULT_LIMIT,
  });

  const isLoading = search.status === "loading";

  const currentPage =
    search.result?.pagination.currentPage ?? search.page;

  const totalPages =
    search.result?.pagination.totalPages ?? 0;

  const pricing = useMemo(
    () => calculateCartPricing(cart, packageCart),
    [cart, packageCart],
  );

  const selectionCount = cart.length + packageCart.length;
  const pendingCount =
    pricing.pendingPackageCount + pricing.pendingTestCount;

  const emailBody = [
    "Hello Anmol Health Care Lab,",
    "",
    "I would like to enquire about the following selection:",
    "",
    ...packageCart.flatMap((healthPackage, index) => [
      `${index + 1}. HEALTH PACKAGE: ${healthPackage.name}`,
      ...healthPackage.includedTests.map(
        (test) => `   - ${test.name}`,
      ),
    ]),
    ...pricing.standaloneTests.map(
      (test, index) =>
        `${packageCart.length + index + 1}. TEST: ${test.name}${
          test.code ? ` (${test.code})` : ""
        }`,
    ),
    "",
    "Please confirm availability and final pricing.",
    "",
    "Thank you.",
  ].join("\n");

  const emailHref =
    `mailto:${siteConfig.email}` +
    `?subject=${encodeURIComponent("Laboratory selection enquiry")}` +
    `&body=${encodeURIComponent(emailBody)}`;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (apiConfigured && !isLoading) {
      search.submit();
    }
  }

  function isCoveredByPackage(testId: string, testSlug: string) {
    return packageCart.some((healthPackage) =>
      healthPackage.includedTests.some(
        (includedTest) =>
          includedTest.id === testId ||
          (Boolean(testSlug) && includedTest.slug === testSlug),
      ),
    );
  }

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.topline}>
            <span>ANMOL HEALTH CARE LAB</span>
            <span>PATIENT SERVICES / YOUR SELECTION</span>
          </div>

          <header className={styles.heading}>
            <div>
              <span className={styles.eyebrow}>
                YOUR LABORATORY SELECTION
              </span>

              <h1>
                A considered
                <br />
                <em>selection.</em>
              </h1>

              <p>
                Review your chosen health packages and individual
                tests before continuing with your enquiry.
              </p>
            </div>

            <div className={styles.countCard}>
              <span>SELECTION ITEMS</span>
              <strong>
                {String(selectionCount).padStart(2, "0")}
              </strong>
              <span>
                {packageCart.length}{" "}
                {packageCart.length === 1 ? "PACKAGE" : "PACKAGES"}
                {" · "}
                {cart.length} {cart.length === 1 ? "TEST" : "TESTS"}
              </span>
            </div>
          </header>

          <div className={styles.layout}>
            <section className={styles.mainColumn}>
              {/* Add individual tests */}
              <div className={styles.panel}>
                <div className={styles.panelHeading}>
                  <div>
                    <span className={styles.panelEyebrow}>
                      01 / ADD TESTS
                    </span>
                    <h2>Find a test</h2>
                  </div>

                  <Link href="/tests" className={styles.textLink}>
                    Full catalogue →
                  </Link>
                </div>

                {!apiConfigured ? (
                  <div className={styles.state} role="status">
                    <strong>Live catalogue connection unavailable.</strong>
                    <p>
                      Configure the backend connection to search
                      and add published tests. No sample tests are
                      displayed here.
                    </p>
                  </div>
                ) : (
                  <>
                    <form
                      className={styles.searchForm}
                      onSubmit={handleSearch}
                      role="search"
                    >
                      <label
                        className={styles.srOnly}
                        htmlFor={searchId}
                      >
                        Search tests
                      </label>

                      <input
                        id={searchId}
                        type="search"
                        value={search.input}
                        maxLength={80}
                        placeholder="Search by test name or code..."
                        onChange={(event) =>
                          search.updateInput(event.target.value)
                        }
                      />

                      {search.input && (
                        <button
                          type="button"
                          className={styles.clearSearch}
                          onClick={search.clear}
                          aria-label="Clear search"
                        >
                          ×
                        </button>
                      )}

                      <button
                        type="submit"
                        className={styles.searchButton}
                        disabled={isLoading}
                      >
                        {isLoading ? "Searching..." : "Search"}
                      </button>
                    </form>

                    <div
                      className={styles.searchResults}
                      aria-live="polite"
                      aria-busy={isLoading}
                    >
                      {isLoading && (
                        <div className={styles.state} role="status">
                          <span className={styles.spinner} />
                          <strong>Loading laboratory tests</strong>
                        </div>
                      )}

                      {search.status === "error" && (
                        <div className={styles.state} role="alert">
                          <strong>Could not load the catalogue.</strong>
                          <p>
                            {search.errorMessage ??
                              "Please try again."}
                          </p>
                          <button
                            type="button"
                            onClick={search.retry}
                          >
                            Try again
                          </button>
                        </div>
                      )}

                      {search.status === "success" &&
                        search.result?.items.length === 0 && (
                          <div className={styles.state}>
                            <strong>No matching tests.</strong>
                            <p>
                              Try a different name or test code.
                            </p>
                          </div>
                        )}

                      {search.status === "success" &&
                        search.result &&
                        search.result.items.length > 0 && (
                          <div className={styles.availableList}>
                            {search.result.items.map((test) => {
                              const isAdded = cart.some(
                                (item) => item.id === test.id,
                              );

                              const isCovered = isCoveredByPackage(
                                test.id,
                                test.slug,
                              );

                              return (
                                <article
                                  className={styles.availableItem}
                                  key={test.id}
                                >
                                  <div>
                                    <span className={styles.testCategory}>
                                      {test.category}
                                    </span>

                                    <h3>{test.name}</h3>

                                    <p>
                                      {test.code
                                        ? `Code: ${test.code}`
                                        : "Laboratory test"}
                                    </p>
                                  </div>

                                  <div className={styles.availableAction}>
                                    <strong>
                                      {test.price === null ||
                                      test.priceStatus !== "confirmed"
                                        ? "Price pending"
                                        : formatPrice(test.price)}
                                    </strong>

                                    <button
                                      type="button"
                                      onClick={() => addTestToCart(test)}
                                      disabled={isAdded || isCovered}
                                    >
                                      {isCovered
                                        ? "Included ✓"
                                        : isAdded
                                          ? "Added ✓"
                                          : "+ Add"}
                                    </button>
                                  </div>
                                </article>
                              );
                            })}
                          </div>
                        )}

                      {search.result && totalPages > 1 && (
                        <nav
                          className={styles.pagination}
                          aria-label="Search results pages"
                        >
                          <button
                            type="button"
                            disabled={currentPage <= 1 || isLoading}
                            onClick={() =>
                              search.changePage(currentPage - 1)
                            }
                          >
                            Previous
                          </button>

                          <span>
                            Page {currentPage} of {totalPages}
                          </span>

                          <button
                            type="button"
                            disabled={
                              currentPage >= totalPages || isLoading
                            }
                            onClick={() =>
                              search.changePage(currentPage + 1)
                            }
                          >
                            Next
                          </button>
                        </nav>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Selected packages and tests */}
              <div className={styles.panel}>
                <div className={styles.panelHeading}>
                  <div>
                    <span className={styles.panelEyebrow}>
                      02 / YOUR SELECTION
                    </span>
                    <h2>Selected items</h2>
                  </div>

                  {selectionCount > 0 && (
                    <button
                      type="button"
                      className={styles.clearCart}
                      onClick={clearCart}
                    >
                      Clear selection
                    </button>
                  )}
                </div>

                {selectionCount === 0 ? (
                  <div className={styles.emptyCart}>
                    <span
                      className={styles.emptyIcon}
                      aria-hidden="true"
                    >
                      +
                    </span>

                    <h3>Your selection is empty.</h3>

                    <p>
                      Explore the laboratory catalogue or browse
                      available health packages to get started.
                    </p>

                    <Link href="/tests">
                      Explore the test catalogue →
                    </Link>

                    <Link href="/packages">
                      Browse health packages →
                    </Link>
                  </div>
                ) : (
                  <div className={styles.selectedList}>
                    {packageCart.map((healthPackage, index) => (
                      <article
                        className={styles.selectedItem}
                        key={healthPackage.id}
                      >
                        <span className={styles.selectedNumber}>
                          P{String(index + 1).padStart(2, "0")}
                        </span>

                        <div className={styles.selectedDetails}>
                          <strong>{healthPackage.name}</strong>

                          <span>
                            HEALTH PACKAGE ·{" "}
                            {healthPackage.includedTests.length} included{" "}
                            {healthPackage.includedTests.length === 1
                              ? "test"
                              : "tests"}
                          </span>

                          {healthPackage.includedTests.length > 0 && (
                            <span>
                              {healthPackage.includedTests
                                .map((test) => test.name)
                                .join(", ")}
                            </span>
                          )}
                        </div>

                        <strong className={styles.selectedPrice}>
                          {healthPackage.packagePrice === null
                            ? "Pending"
                            : formatPrice(healthPackage.packagePrice)}
                        </strong>

                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() =>
                            removePackageFromCart(healthPackage.id)
                          }
                          aria-label={`Remove ${healthPackage.name} from selection`}
                        >
                          ×
                        </button>
                      </article>
                    ))}

                    {pricing.standaloneTests.map((test, index) => (
                      <article
                        className={styles.selectedItem}
                        key={test.id}
                      >
                        <span className={styles.selectedNumber}>
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className={styles.selectedDetails}>
                          <strong>{test.name}</strong>
                          <span>
                            {test.code
                              ? `${test.category} · ${test.code}`
                              : test.category}
                          </span>
                        </div>

                        <strong className={styles.selectedPrice}>
                          {test.price === null ||
                          test.priceStatus !== "confirmed"
                            ? "Pending"
                            : formatPrice(test.price)}
                        </strong>

                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => removeTestFromCart(test.id)}
                          aria-label={`Remove ${test.name} from selection`}
                        >
                          ×
                        </button>
                      </article>
                    ))}

                    {pricing.coveredTestCount > 0 && (
                      <p className={styles.pendingNote}>
                        {pricing.coveredTestCount} separately selected{" "}
                        {pricing.coveredTestCount === 1 ? "test is" : "tests are"}{" "}
                        already included in your selected package
                        {packageCart.length === 1 ? "" : "s"}. They are
                        not counted twice in the subtotal.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Pricing summary */}
            <aside className={styles.summary}>
              <span className={styles.panelEyebrow}>
                SELECTION SUMMARY
              </span>

              <h2>Your enquiry.</h2>

              <div className={styles.summaryRow}>
                <span>Health packages</span>
                <strong>{pricing.packageCount}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Individual test selections</span>
                <strong>{pricing.testCount}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Tests covered by packages</span>
                <strong>{pricing.coveredTestCount}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Prices confirmed</span>
                <strong>
                  {pricing.confirmedPackages.length +
                    pricing.confirmedTests.length}
                </strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Prices pending</span>
                <strong>{pendingCount}</strong>
              </div>

              <div className={styles.summaryTotal}>
                <span>
                  {pricing.hasPending
                    ? "CONFIRMED ITEMS SUBTOTAL"
                    : "CONFIRMED TOTAL"}
                </span>

                <strong>
                  {selectionCount === 0
                    ? "—"
                    : formatPrice(pricing.confirmedSubtotal)}
                </strong>
              </div>

              {pricing.hasPending && selectionCount > 0 && (
                <p className={styles.pendingNote}>
                  Some prices are not confirmed. The amount shown
                  includes only packages and tests with confirmed
                  prices. It is not the complete selection total.
                </p>
              )}

              <a
                href={emailHref}
                className={
                  selectionCount > 0
                    ? styles.emailAction
                    : `${styles.emailAction} ${styles.disabledAction}`
                }
                aria-disabled={selectionCount === 0}
                onClick={(event) => {
                  if (selectionCount === 0) {
                    event.preventDefault();
                  }
                }}
              >
                Email selection
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href={siteConfig.phones[0].href}
                className={styles.callAction}
              >
                Call to confirm
              </a>

              <p className={styles.summaryDisclaimer}>
                This selection prepares an enquiry only. It does not
                reserve a collection slot or confirm a booking.
                Final availability and pricing must be confirmed
                by the laboratory.
              </p>

              <Link href="/book" className={styles.bookingLink}>
                Continue to booking
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
