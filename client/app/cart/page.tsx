"use client";

import Link from "next/link";
import { useId, useMemo, type FormEvent } from "react";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import {
  addTestToCart,
  clearCart,
  removeTestFromCart,
  useCart,
} from "@/lib/cart-store";

import { getApiBaseUrl } from "@/lib/api/http";
import { RESULT_LIMIT } from "@/lib/api/tests";
import { useTestSearch } from "@/lib/hooks/use-test-search";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";

import styles from "./cart.module.css";

export default function CartPage() {
  const searchId = useId();
  const cart = useCart();

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

  const pricing = useMemo(() => {
    const confirmedItems = cart.filter(
      (item) => item.price !== null && item.priceStatus === "confirmed",
    );

    const pendingItems = cart.length - confirmedItems.length;

    const confirmedSubtotal = confirmedItems.reduce(
      (total, item) => total + (item.price ?? 0),
      0,
    );

    return {
      confirmedItems: confirmedItems.length,
      pendingItems,
      confirmedSubtotal,
      hasPending: pendingItems > 0,
    };
  }, [cart]);

  const emailBody = [
    "Hello Anmol Health Care Lab,",
    "",
    "I would like to enquire about the following selected tests:",
    "",
    ...cart.map(
      (test, index) =>
        `${index + 1}. ${test.name}${
          test.code ? ` (${test.code})` : ""
        }`,
    ),
    "",
    "Please confirm their current availability and prices.",
    "",
    "Thank you.",
  ].join("\n");

  const emailHref =
    `mailto:${siteConfig.email}` +
    `?subject=${encodeURIComponent("Test selection enquiry")}` +
    `&body=${encodeURIComponent(emailBody)}`;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (apiConfigured && !isLoading) {
      search.submit();
    }
  }

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.topline}>
            <span>ANMOL HEALTH CARE LAB</span>
            <span>PATIENT SERVICES / TEST CART</span>
          </div>

          <header className={styles.heading}>
            <div>
              <span className={styles.eyebrow}>
                YOUR TEST SELECTION
              </span>

              <h1>
                A considered
                <br />
                <em>selection.</em>
              </h1>

              <p>
                Review your selected laboratory tests and prepare
                an enquiry for the laboratory.
              </p>
            </div>

            <div className={styles.countCard}>
              <span>SELECTED TESTS</span>
              <strong>{cart.length.toString().padStart(2, "0")}</strong>
              <span>
                {cart.length === 1 ? "TEST IN CART" : "TESTS IN CART"}
              </span>
            </div>
          </header>

          <div className={styles.layout}>
            <section className={styles.mainColumn}>
              <div className={styles.panel}>
                <div className={styles.panelHeading}>
                  <div>
                    <span className={styles.panelEyebrow}>
                      01 / ADD TESTS
                    </span>
                    <h2>Find a test</h2>
                  </div>

                  <Link href="/tests" className={styles.textLink}>
                    Full catalogue ↗
                  </Link>
                </div>

                {!apiConfigured ? (
                  <div className={styles.state} role="status">
                    <strong>Live catalogue connection unavailable.</strong>
                    <p>
                      Configure the backend connection to search
                      and add published tests. No sample tests are
                      shown here.
                    </p>
                  </div>
                ) : (
                  <>
                    <form
                      className={styles.searchForm}
                      onSubmit={handleSearch}
                      role="search"
                    >
                      <label className={styles.srOnly} htmlFor={searchId}>
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
                                      {test.price === null
                                        ? "Price pending"
                                        : formatPrice(test.price)}
                                    </strong>

                                    <button
                                      type="button"
                                      onClick={() => addTestToCart(test)}
                                      disabled={isAdded}
                                    >
                                      {isAdded ? "Added ✓" : "+ Add"}
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

              <div className={styles.panel}>
                <div className={styles.panelHeading}>
                  <div>
                    <span className={styles.panelEyebrow}>
                      02 / YOUR SELECTION
                    </span>
                    <h2>Selected tests</h2>
                  </div>

                  {cart.length > 0 && (
                    <button
                      type="button"
                      className={styles.clearCart}
                      onClick={clearCart}
                    >
                      Clear selection
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className={styles.emptyCart}>
                    <span className={styles.emptyIcon} aria-hidden="true">
                      +
                    </span>

                    <h3>Your selection is empty.</h3>

                    <p>
                      Search the live catalogue above and add the
                      tests you would like to enquire about.
                    </p>

                    <Link href="/tests">
                      Explore the test catalogue ↗
                    </Link>
                  </div>
                ) : (
                  <div className={styles.selectedList}>
                    {cart.map((test, index) => (
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
                          {test.price === null
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
                  </div>
                )}
              </div>
            </section>

            <aside className={styles.summary}>
              <span className={styles.panelEyebrow}>
                SELECTION SUMMARY
              </span>

              <h2>Your enquiry.</h2>

              <div className={styles.summaryRow}>
                <span>Selected tests</span>
                <strong>{cart.length}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Prices confirmed</span>
                <strong>{pricing.confirmedItems}</strong>
              </div>

              <div className={styles.summaryRow}>
                <span>Prices pending</span>
                <strong>{pricing.pendingItems}</strong>
              </div>

              <div className={styles.summaryTotal}>
                <span>
                  {pricing.hasPending
                    ? "CONFIRMED ITEMS SUBTOTAL"
                    : "CONFIRMED TOTAL"}
                </span>

                <strong>
                  {cart.length === 0
                    ? "—"
                    : formatPrice(pricing.confirmedSubtotal)}
                </strong>
              </div>

              {pricing.hasPending && cart.length > 0 && (
                <p className={styles.pendingNote}>
                  Some test prices are not confirmed. The amount
                  shown is only the subtotal of tests with confirmed
                  prices, not the complete selection total.
                </p>
              )}

              <a
                href={
                  cart.length > 0
                    ? emailHref
                    : `mailto:${siteConfig.email}`
                }
                className={
                  cart.length > 0
                    ? styles.emailAction
                    : `${styles.emailAction} ${styles.disabledAction}`
                }
                aria-disabled={cart.length === 0}
                onClick={(event) => {
                  if (cart.length === 0) event.preventDefault();
                }}
              >
                Email test selection
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href={siteConfig.phones[0].href}
                className={styles.callAction}
              >
                Call to confirm booking
              </a>

              <p className={styles.summaryDisclaimer}>
                This cart prepares an enquiry only. It does not
                reserve a collection slot or confirm a booking.
                Confirm availability and final pricing with the
                laboratory.
              </p>

              <Link href="/book" className={styles.bookingLink}>
                Open booking form
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}