
"use client";

import Link from "next/link";
import {
  useId,
  useState,
  type FormEvent,
} from "react";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import { getApiBaseUrl } from "@/lib/api/http";
import { RESULT_LIMIT } from "@/lib/api/tests";
import { formatPrice } from "@/lib/format";
import { useTestSearch } from "@/lib/hooks/use-test-search";
import { siteConfig } from "@/lib/site";

import type { TestSummary } from "@/lib/types";

import styles from "./book-test.module.css";

type CollectionMethod = "branch" | "home";

type BookingForm = {
  name: string;
  phone: string;
  email: string;
  date: string;
  timePreference: string;
  method: CollectionMethod;
  address: string;
  notes: string;
  consent: boolean;
};

const initialForm: BookingForm = {
  name: "",
  phone: "",
  email: "",
  date: "",
  timePreference: "No preference",
  method: "branch",
  address: "",
  notes: "",
  consent: false,
};

export default function BookTestPageClient() {
  const searchId = useId();

  // Do not display fallback/sample catalogue data.
  const apiConfigured = Boolean(getApiBaseUrl());

  const search = useTestSearch({
    initialLoad: true,
    initialQuery: "",
    limit: RESULT_LIMIT,
  });

  const [selectedTests, setSelectedTests] = useState<TestSummary[]>([]);
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [selectionError, setSelectionError] = useState("");

  const result = search.result;
  const isLoading = search.status === "loading";

  const currentPage =
    result?.pagination.currentPage ?? search.page;

  const totalPages =
    result?.pagination.totalPages ?? 0;

  function updateField<K extends keyof BookingForm>(
    field: K,
    value: BookingForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleTest(test: TestSummary) {
    setSelectionError("");

    setSelectedTests((current) => {
      const alreadySelected = current.some(
        (item) => item.id === test.id,
      );

      if (alreadySelected) {
        return current.filter((item) => item.id !== test.id);
      }

      return [...current, test];
    });
  }

  function removeTest(testId: string) {
    setSelectedTests((current) =>
      current.filter((test) => test.id !== testId),
    );
  }

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
        <section
          className={styles.bookingSection}
          aria-labelledby="booking-title"
        >
          <div className={styles.container}>
            <div className={styles.sectionMeta}>
              <span>ANMOL HEALTH CARE LAB</span>
              <span>TEST SELECTION · BOOKING</span>
            </div>

            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.eyebrow}>
                  BOOK A TEST
                </span>

                <h1 id="booking-title">
                  Your tests,
                  <br />
                  your <em>next step.</em>
                </h1>
              </div>

              <p>
                Begin by selecting tests from the laboratory
                catalogue. Then review your selection and
                provide your preferred collection details.
              </p>
            </div>

            <div className={styles.bookingLayout}>
              {/* LIVE TEST SELECTOR */}

              <section
                id="test-selector"
                className={styles.cataloguePanel}
                aria-labelledby="selector-heading"
              >
                <div className={styles.panelHeader}>
                  <div>
                    <span className={styles.panelEyebrow}>
                      STEP 01 / CATALOGUE
                    </span>

                    <h2 id="selector-heading">
                      Select your tests.
                    </h2>
                  </div>

                  <span className={styles.stepNumber}>01</span>
                </div>

                <p className={styles.panelDescription}>
                  Search by test name or short code, then add
                  the tests you require.
                </p>

                {!apiConfigured ? (
                  <div className={styles.statePanel} role="status">
                    <span className={styles.stateMark}>i</span>

                    <strong>Catalogue connection pending.</strong>

                    <p>
                      The live test catalogue will appear here
                      when the backend API is configured.
                      No sample or placeholder tests are displayed.
                    </p>
                  </div>
                ) : (
                  <>
                    <form
                      className={styles.searchForm}
                      role="search"
                      onSubmit={handleSearch}
                      aria-busy={isLoading}
                    >
                      <label
                        htmlFor={searchId}
                        className={styles.srOnly}
                      >
                        Search available tests
                      </label>

                      <input
                        id={searchId}
                        type="search"
                        value={search.input}
                        maxLength={80}
                        autoComplete="off"
                        placeholder="Search tests by name or code..."
                        onChange={(event) =>
                          search.updateInput(event.target.value)
                        }
                      />

                      {search.input.length > 0 && (
                        <button
                          type="button"
                          className={styles.clearSearch}
                          onClick={search.clear}
                          aria-label="Clear test search"
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

                    <div className={styles.resultsMeta}>
                      <span>
                        {isLoading
                          ? "UPDATING CATALOGUE"
                          : result
                            ? `${result.total} ${
                                result.total === 1 ? "TEST" : "TESTS"
                              } IN RESULTS`
                            : "TEST DIRECTORY"}
                      </span>

                      {result && totalPages > 1 && (
                        <span>
                          PAGE {currentPage} / {totalPages}
                        </span>
                      )}
                    </div>

                    <div
                      className={styles.testResults}
                      aria-live="polite"
                      aria-busy={isLoading}
                    >
                      {isLoading && (
                        <div className={styles.statePanel}>
                          <span className={styles.spinner} />
                          <strong>Loading tests</strong>
                          <p>
                            Retrieving the live laboratory catalogue.
                          </p>
                        </div>
                      )}

                      {search.status === "error" && (
                        <div
                          className={styles.statePanel}
                          role="alert"
                        >
                          <span className={styles.stateMark}>!</span>

                          <strong>
                            Tests could not be loaded.
                          </strong>

                          <p>
                            {search.errorMessage ??
                              "The catalogue is temporarily unavailable."}
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
                        result &&
                        result.items.length === 0 && (
                          <div className={styles.statePanel}>
                            <strong>
                              No matching tests found.
                            </strong>

                            <p>
                              Try another test name or code.
                            </p>
                          </div>
                        )}

                      {search.status === "success" &&
                        result &&
                        result.items.length > 0 && (
                          <div className={styles.testGrid}>
                            {result.items.map((test) => {
                              const isSelected = selectedTests.some(
                                (item) => item.id === test.id,
                              );

                              return (
                                <button
                                  key={test.id}
                                  type="button"
                                  className={
                                    isSelected
                                      ? `${styles.testOption} ${styles.testOptionSelected}`
                                      : styles.testOption
                                  }
                                  aria-pressed={isSelected}
                                  onClick={() => toggleTest(test)}
                                >
                                  <span className={styles.optionTop}>
                                    <span>{test.category}</span>

                                    <span className={styles.optionAction}>
                                      {isSelected ? "ADDED ✓" : "+ ADD"}
                                    </span>
                                  </span>

                                  <strong>{test.name}</strong>

                                  <span className={styles.testCode}>
                                    {test.code
                                      ? `TEST CODE · ${test.code}`
                                      : "LABORATORY TEST"}
                                  </span>

                                  <span className={styles.testPrice}>
                                    {test.price === null
                                      ? "Price to be confirmed"
                                      : formatPrice(test.price)}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                    </div>

                    {result && totalPages > 1 && (
                      <nav
                        className={styles.pagination}
                        aria-label="Test result pages"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            search.changePage(currentPage - 1)
                          }
                          disabled={currentPage <= 1 || isLoading}
                        >
                          ← Previous
                        </button>

                        <span>
                          {currentPage} / {totalPages}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            search.changePage(currentPage + 1)
                          }
                          disabled={
                            currentPage >= totalPages || isLoading
                          }
                        >
                          Next →
                        </button>
                      </nav>
                    )}
                  </>
                )}

                {selectionError && (
                  <p className={styles.selectionError} role="alert">
                    {selectionError}
                  </p>
                )}
              </section>

              {/* SELECTED TESTS */}

              <aside
                className={styles.selectionPanel}
                aria-labelledby="selection-heading"
              >
                <div className={styles.panelHeader}>
                  <div>
                    <span className={styles.panelEyebrow}>
                      YOUR SELECTION
                    </span>

                    <h2 id="selection-heading">
                      Selected tests.
                    </h2>
                  </div>

                  <span className={styles.selectionCount}>
                    {String(selectedTests.length).padStart(2, "0")}
                  </span>
                </div>

                {selectedTests.length === 0 ? (
                  <div className={styles.emptySelection}>
                    <span className={styles.emptyMark}>+</span>

                    <strong>Your list starts here.</strong>

                    <p>
                      Add tests from the live catalogue and
                      they will appear here.
                    </p>
                  </div>
                ) : (
                  <div className={styles.selectedList}>
                    {selectedTests.map((test, index) => (
                      <div
                        className={styles.selectedItem}
                        key={test.id}
                      >
                        <span className={styles.selectedIndex}>
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className={styles.selectedInfo}>
                          <strong>{test.name}</strong>

                          <span>
                            {test.code || test.category}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeTest(test.id)}
                          aria-label={`Remove ${test.name}`}
                          title="Remove test"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className={styles.selectionFooter}>
                  <span>SELECTED ITEMS</span>
                  <strong>{selectedTests.length}</strong>
                </div>

                <p className={styles.selectionHint}>
                  Final availability and pricing are confirmed
                  by the laboratory.
                </p>

                <Link
                  href="/tests"
                  className={styles.catalogueLink}
                >
                  View full catalogue
                  <span aria-hidden="true">↗</span>
                </Link>
              </aside>
            </div>

            {/* PATIENT AND COLLECTION DETAILS */}

            <section
              id="booking-request"
              className={styles.requestSection}
              aria-labelledby="request-heading"
            >
              <div className={styles.requestIntro}>
                <span className={styles.eyebrow}>
                  STEP 02 / YOUR DETAILS
                </span>

                <h2 id="request-heading">
                  Tell us how you would
                  <br />
                  like to <em>visit.</em>
                </h2>

                <p>
                  Provide your preferred details below. Live
                  appointment availability and submission
                  will be connected when the corresponding
                  backend endpoints are ready.
                </p>
              </div>

              <div className={styles.requestPanel}>
                <div className={styles.formSectionTitle}>
                  <span>01</span>
                  <h3>Patient information</h3>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label htmlFor="booking-name">
                      Full name
                    </label>

                    <input
                      id="booking-name"
                      autoComplete="name"
                      type="text"
                      minLength={2}
                      maxLength={80}
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="booking-phone">
                      Phone number
                    </label>

                    <input
                      id="booking-phone"
                      autoComplete="tel"
                      type="tel"
                      inputMode="tel"
                      maxLength={25}
                      placeholder="Your contact number"
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="booking-email">
                      Email address
                    </label>

                    <input
                      id="booking-email"
                      autoComplete="email"
                      type="email"
                      maxLength={120}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="booking-date">
                      Preferred date
                    </label>

                    <input
                      id="booking-date"
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        updateField("date", event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className={styles.formDivider} />

                <div className={styles.formSectionTitle}>
                  <span>02</span>
                  <h3>Collection preference</h3>
                </div>

                <div className={styles.methodGrid}>
                  <label
                    className={
                      form.method === "branch"
                        ? `${styles.methodOption} ${styles.methodActive}`
                        : styles.methodOption
                    }
                  >
                    <input
                      type="radio"
                      name="collectionMethod"
                      value="branch"
                      checked={form.method === "branch"}
                      onChange={() =>
                        updateField("method", "branch")
                      }
                    />

                    <span className={styles.methodNumber}>01</span>

                    <span className={styles.methodContent}>
                      <strong>Visit the laboratory</strong>
                      <span>{siteConfig.address}</span>
                    </span>
                  </label>

                  <label
                    className={
                      form.method === "home"
                        ? `${styles.methodOption} ${styles.methodActive}`
                        : styles.methodOption
                    }
                  >
                    <input
                      type="radio"
                      name="collectionMethod"
                      value="home"
                      checked={form.method === "home"}
                      onChange={() =>
                        updateField("method", "home")
                      }
                    />

                    <span className={styles.methodNumber}>02</span>

                    <span className={styles.methodContent}>
                      <strong>Request home sampling</strong>
                      <span>
                        Subject to coverage and confirmation
                      </span>
                    </span>
                  </label>
                </div>

                {form.method === "home" && (
                  <div className={styles.field}>
                    <label htmlFor="booking-address">
                      Home collection address
                    </label>

                    <textarea
                      id="booking-address"
                      rows={3}
                      maxLength={300}
                      placeholder="Enter your complete address and area..."
                      value={form.address}
                      onChange={(event) =>
                        updateField("address", event.target.value)
                      }
                    />

                    <span className={styles.fieldHint}>
                      Coverage and any additional charges will
                      need to be confirmed by the laboratory.
                    </span>
                  </div>
                )}

                <div className={styles.field}>
                  <label htmlFor="booking-time">
                    Preferred time
                  </label>

                  <select
                    id="booking-time"
                    value={form.timePreference}
                    onChange={(event) =>
                      updateField("timePreference", event.target.value)
                    }
                  >
                    <option>No preference</option>
                    <option>Morning preference</option>
                    <option>Afternoon preference</option>
                    <option>
                      Please contact me to arrange a time
                    </option>
                  </select>

                  <span className={styles.fieldHint}>
                    These are preferences, not live appointment slots.
                  </span>
                </div>

                <div className={styles.field}>
                  <label htmlFor="booking-notes">
                    Additional notes
                  </label>

                  <textarea
                    id="booking-notes"
                    rows={3}
                    maxLength={800}
                    placeholder="Additional information..."
                    value={form.notes}
                    onChange={(event) =>
                      updateField("notes", event.target.value)
                    }
                  />
                </div>

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) =>
                      updateField("consent", event.target.checked)
                    }
                  />

                  <span>
                    I understand that appointment availability
                    and collection arrangements must be confirmed
                    by the laboratory.
                  </span>
                </label>

                <div className={styles.submitArea}>
                  <div>
                    <span className={styles.submitEyebrow}>
                      BOOKING API
                    </span>

                    <p>
                      Booking submission will be enabled when
                      the backend booking and slot endpoints
                      are implemented and connected.
                    </p>
                  </div>

                  <button
                    type="button"
                    className={styles.submitButton}
                    disabled
                    aria-disabled="true"
                    title="Booking API is not connected yet"
                  >
                    Booking unavailable
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>

                <p className={styles.requestNotice} role="status">
                  No booking has been submitted or reserved.
                  This form is awaiting backend integration.
                </p>
              </div>
            </section>

            <div className={styles.disclaimer}>
              <span aria-hidden="true">i</span>

              <p>
                Test availability, preparation requirements,
                pricing, home sampling coverage and appointment
                arrangements must be confirmed by Anmol Health
                Care Lab.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
