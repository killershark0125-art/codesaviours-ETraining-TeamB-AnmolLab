
"use client";

import Link from "next/link";
import { useId, type FormEvent } from "react";

import { MIN_QUERY_LENGTH } from "@/lib/api/tests";
import { formatPrice } from "@/lib/format";
import { useTestSearch } from "@/lib/hooks/use-test-search";

/**
 * Homepage test search.
 * Retrieves results through the shared backend API hook.
 */
export default function TestFinder() {
  const search = useTestSearch();
  const inputId = useId();
  const hintId = useId();

  const query = search.input.trim();
  const canSearch = query.length >= MIN_QUERY_LENGTH;
  const isLoading = search.status === "loading";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSearch || isLoading) return;

    search.submit();
  }

  function handleClear() {
    search.clear();
  }

  return (
    <div className="test-finder">
      <div className="test-finder__panel">
        <form
          className="test-finder__form"
          role="search"
          onSubmit={handleSubmit}
          aria-busy={isLoading}
          aria-describedby={hintId}
        >
          <label
            className="test-finder__sr-only"
            htmlFor={inputId}
          >
            Search diagnostic tests by name
          </label>

          <span
            className="test-finder__search-icon"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="10.8" cy="10.8" r="6.7" />
              <path d="m15.8 15.8 4.1 4.1" />
            </svg>
          </span>

          <input
            id={inputId}
            className="test-finder__input"
            type="search"
            value={search.input}
            maxLength={80}
            autoComplete="off"
            placeholder="Enter a test name"
            onChange={(event) =>
              search.updateInput(event.target.value)
            }
            aria-describedby={hintId}
          />

          <button
            className="test-finder__clear"
            type="button"
            onClick={handleClear}
            disabled={search.input.length === 0}
            aria-label="Clear test search"
            title="Clear search"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>

          <button
            className="test-finder__submit"
            type="submit"
            disabled={!canSearch || isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        <p className="test-finder__hint" id={hintId}>
          Search by test name. Examples: CBC, HbA1c, Thyroid Profile.
        </p>

        <div
          className="test-finder__feedback"
          aria-live="polite"
          aria-atomic="true"
        >
          {search.status === "loading" && (
            <p className="test-finder__status">
              <span
                className="test-finder__spinner"
                aria-hidden="true"
              />
              Searching the laboratory catalogue...
            </p>
          )}

          {search.status === "error" && (
            <div
              className="test-finder__state test-finder__state--error"
              role="alert"
            >
              <div>
                <strong>Search couldn&apos;t be completed.</strong>
                <p>
                  {search.errorMessage ??
                    "The laboratory catalogue is currently unavailable."}
                </p>
              </div>

              <button
                type="button"
                onClick={search.retry}
              >
                Try again
              </button>
            </div>
          )}

          {search.status === "success" && search.result && (
            <div className="test-finder__results">
              <div className="test-finder__results-heading">
                <span>Matching tests</span>

                <span>
                  {search.result.total.toLocaleString()} found
                </span>
              </div>

              {search.result.items.length === 0 ? (
                <div className="test-finder__empty">
                  <strong>No matching tests found</strong>

                  <p>
                    Check the spelling or try another test name.
                  </p>
                </div>
              ) : (
                <div className="test-finder__list">
                  {search.result.items.slice(0, 5).map((test) => {
                    const testHref = `/tests?search=${encodeURIComponent(
                      test.name,
                    )}`;

                    const priceLabel =
                      test.price === null
                        ? "Pending confirmation"
                        : formatPrice(test.price);

                    return (
                      <Link
                        className="test-finder__result"
                        href={testHref}
                        key={test.id}
                      >
                        <span className="test-finder__result-copy">
                          <strong>{test.name}</strong>

                          <small>
                            {test.category}
                            {test.code ? ` · ${test.code}` : ""}
                          </small>
                        </span>

                        <span className="test-finder__result-price">
                          {priceLabel}
                        </span>

                        <span
                          className="test-finder__result-arrow"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}

              <Link
                className="test-finder__all-results"
                href={`/tests?search=${encodeURIComponent(query)}`}
              >
                View all matching tests

                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
