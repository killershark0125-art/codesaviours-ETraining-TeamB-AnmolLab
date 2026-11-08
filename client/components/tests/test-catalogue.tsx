
"use client";

import Link from "next/link";
import { useId, type FormEvent } from "react";

import CellularBackground from "@/components/home/cellular-background";
import { RESULT_LIMIT } from "@/lib/api/tests";
import { formatPrice } from "@/lib/format";
import { useTestSearch } from "@/lib/hooks/use-test-search";

import styles from "./test-catalogue.module.css";

type TestCatalogueProps = {
  initialQuery?: string;
};

export default function TestCatalogue({
  initialQuery = "",
}: TestCatalogueProps) {
  const inputId = useId();
  const categoryId = useId();

  const search = useTestSearch({
    initialLoad: true,
    initialQuery,
    limit: RESULT_LIMIT,
  });

  const isLoading = search.status === "loading";
  const result = search.result;

  const totalPages = result?.pagination.totalPages ?? 0;
  const currentPage = result?.pagination.currentPage ?? search.page;

  const hasFilters = Boolean(
    search.input.trim() || search.category,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLoading) {
      search.submit();
    }
  }

  function handleReset() {
    search.clear();
    search.selectCategory(null);
  }

  return (
    <div className={styles.page}>
      <section
        className={styles.hero}
        aria-labelledby="catalogue-title"
      >
        <CellularBackground />

        <div
          className={styles.heroShade}
          aria-hidden="true"
        />

        <div className={styles.heroInner}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Test catalogue</span>
          </div>

          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              DIAGNOSTIC CATALOGUE
              <span className={styles.eyebrowLine} />
              TEST DIRECTORY
            </span>

            <h1 id="catalogue-title">
              Find the test.
              <br />
              <em>Know what comes next.</em>
            </h1>

            <p>
              Explore the laboratory test catalogue by name or category.
              Confirm availability, preparation instructions and pricing
              directly with the laboratory before your visit.
            </p>

            <Link
              href="#catalogue-results-title"
              className={styles.heroAction}
            >
              Explore the catalogue
              <span aria-hidden="true">↓</span>
            </Link>
          </div>

          <div className={styles.heroFoot}>
            <span>TEST DISCOVERY</span>
            <span>LABORATORY INFORMATION</span>
            <span>EXPLORE MORE ↓</span>
          </div>
        </div>
      </section>

      <section
        className={styles.catalogueSection}
        aria-labelledby="catalogue-results-title"
      >
        <div className={styles.catalogueInner}>
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionNumber}>
                01 / EXPLORE TESTS
              </span>

              <h2 id="catalogue-results-title">
                The test <em>directory.</em>
              </h2>
            </div>

            <p>
              Search the available catalogue or narrow your results
              by laboratory category.
            </p>
          </div>

          <div className={styles.filterPanel}>
            <form
              className={styles.searchForm}
              role="search"
              onSubmit={handleSubmit}
              aria-busy={isLoading}
            >
              <label
                className={styles.srOnly}
                htmlFor={inputId}
              >
                Search tests by name
              </label>

              <span
                className={styles.searchIcon}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="10.8" cy="10.8" r="6.7" />
                  <path d="m15.8 15.8 4.1 4.1" />
                </svg>
              </span>

              <input
                id={inputId}
                type="search"
                value={search.input}
                maxLength={80}
                autoComplete="off"
                placeholder="Search by test name..."
                onChange={(event) =>
                  search.updateInput(event.target.value)
                }
              />

              {search.input.length > 0 && (
                <button
                  className={styles.clearButton}
                  type="button"
                  onClick={search.clear}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="m5 5 10 10M15 5 5 15" />
                  </svg>
                </button>
              )}

              <button
                className={styles.searchButton}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
                <span aria-hidden="true">↗</span>
              </button>
            </form>

            <div className={styles.filterControls}>
              <div className={styles.categoryControl}>
                <label htmlFor={categoryId}>
                  Filter by category
                </label>

                <select
                  id={categoryId}
                  value={search.category ?? ""}
                  onChange={(event) =>
                    search.selectCategory(
                      event.target.value || null,
                    )
                  }
                  disabled={search.categoriesLoading}
                >
                  <option value="">
                    {search.categoriesLoading
                      ? "Loading categories..."
                      : "All categories"}
                  </option>

                  {search.categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {hasFilters && (
                <button
                  className={styles.resetButton}
                  type="button"
                  onClick={handleReset}
                >
                  Reset filters
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>

            {search.categoriesError && (
              <p
                className={styles.categoryWarning}
                role="status"
              >
                Category filters are temporarily unavailable.
                You can still search the test catalogue.
              </p>
            )}
          </div>

          <div className={styles.resultsBar}>
            <div>
              <span className={styles.resultsEyebrow}>
                CATALOGUE RESULTS
              </span>

              <p>
                {isLoading
                  ? "Updating the catalogue..."
                  : result
                    ? `${result.total.toLocaleString()} ${
                        result.total === 1 ? "test" : "tests"
                      } found`
                    : "Loading available tests"}
              </p>
            </div>

            <span className={styles.resultsPage}>
              {result && totalPages > 0
                ? `PAGE ${currentPage} OF ${totalPages}`
                : "TEST DIRECTORY"}
            </span>
          </div>

          <div
            className={styles.resultsArea}
            aria-live="polite"
            aria-busy={isLoading}
          >
            {isLoading && (
              <div className={styles.loadingState}>
                <span
                  className={styles.spinner}
                  aria-hidden="true"
                />
                <strong>Loading the test catalogue</strong>
                <p>Retrieving available laboratory tests.</p>
              </div>
            )}

            {search.status === "error" && (
              <div
                className={styles.statePanel}
                role="alert"
              >
                <span className={styles.stateIndex}>
                  01 / CONNECTION
                </span>

                <h3>The catalogue could not be loaded.</h3>

                <p>
                  {search.errorMessage ??
                    "Please check your connection and try again."}
                </p>

                <button
                  type="button"
                  onClick={search.retry}
                >
                  Try again
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            )}

            {search.status === "success" &&
              result &&
              result.items.length === 0 && (
                <div className={styles.statePanel}>
                  <span className={styles.stateIndex}>
                    02 / NO MATCHES
                  </span>

                  <h3>
                    {hasFilters
                      ? "No matching tests found."
                      : "No tests are listed yet."}
                  </h3>

                  <p>
                    {hasFilters
                      ? "Try a different test name or category, or reset your filters."
                      : "The laboratory catalogue has not published any active tests yet. Please contact the laboratory for assistance."}
                  </p>

                  {hasFilters && (
                    <button
                      type="button"
                      onClick={handleReset}
                    >
                      Clear filters
                      <span aria-hidden="true">↗</span>
                    </button>
                  )}
                </div>
              )}

            {search.status === "success" &&
              result &&
              result.items.length > 0 && (
                <div className={styles.testGrid}>
                  {result.items.map((test, index) => {
                    const priceLabel =
                      test.price === null
                        ? "Pending confirmation"
                        : formatPrice(test.price);

                    return (
                      <article
                        className={styles.testCard}
                        key={test.id}
                      >
                        <div className={styles.cardTop}>
                          <span className={styles.cardIndex}>
                            {String(
                              (currentPage - 1) * search.limit +
                                index +
                                1,
                            ).padStart(2, "0")}
                          </span>

                          <span className={styles.categoryBadge}>
                            {test.category}
                          </span>
                        </div>

                        <div className={styles.cardBody}>
                          <h3>{test.name}</h3>

                          {test.code && (
                            <p className={styles.testCode}>
                              TEST CODE
                              <strong>{test.code}</strong>
                            </p>
                          )}
                        </div>

                        <div className={styles.cardBottom}>
                          <div>
                            <span className={styles.priceLabel}>
                              TEST PRICE
                            </span>

                            <strong className={styles.priceValue}>
                              {priceLabel}
                            </strong>
                          </div>

                          <span
                            className={styles.cardMark}
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
          </div>

          {result && totalPages > 1 && (
            <nav
              className={styles.pagination}
              aria-label="Test catalogue pages"
            >
              <button
                type="button"
                onClick={() =>
                  search.changePage(currentPage - 1)
                }
                disabled={currentPage <= 1 || isLoading}
              >
                <span aria-hidden="true">←</span>
                Previous
              </button>

              <span>
                <strong>{currentPage}</strong>
                <span className={styles.pageDivider}>/</span>
                {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  search.changePage(currentPage + 1)
                }
                disabled={currentPage >= totalPages || isLoading}
              >
                Next
                <span aria-hidden="true">→</span>
              </button>
            </nav>
          )}

          <div className={styles.catalogueDisclaimer}>
            <span aria-hidden="true">i</span>

            <p>
              Test availability, preparation requirements, sample
              details and prices should be confirmed directly with
              the laboratory. Do not use this catalogue as a
              substitute for medical advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
