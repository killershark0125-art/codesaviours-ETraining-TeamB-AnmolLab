
"use client";

import { useState, type FormEvent } from "react";
import { MIN_QUERY_LENGTH } from "@/lib/api/tests";
import { useTestSearch } from "@/lib/hooks/use-test-search";
import { formatPrice } from "@/lib/format";

export default function TestFinder() {
  const search = useTestSearch();
  const [validationError, setValidationError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (search.input.trim().length < MIN_QUERY_LENGTH) {
      setValidationError("Enter at least two characters to search.");
      return;
    }

    setValidationError("");
    search.submit();
  }

  return (
    <section className="finder" aria-label="Diagnostic test search">
      <div className="finder-heading">
        <label htmlFor="test-search">
          Search diagnostic tests
        </label>

        <span>TEST CATALOGUE / 01</span>
      </div>

      <form className="finder-form" onSubmit={handleSubmit}>
        <input
          id="test-search"
          className="finder-input"
          type="search"
          placeholder="Try CBC, Lipid Profile, HbA1c..."
          value={search.input}
          onChange={(event) => {
            setValidationError("");
            search.updateInput(event.target.value);
          }}
          maxLength={80}
          autoComplete="off"
        />

        <button
          className="finder-submit"
          type="submit"
          disabled={search.input.trim().length < MIN_QUERY_LENGTH}
        >
          SEARCH ↗
        </button>
      </form>

      {search.categories.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <label htmlFor="test-category" className="finder-hint">
            Filter by category
          </label>

          <select
            id="test-category"
            value={search.category ?? ""}
            onChange={(event) =>
              search.selectCategory(event.target.value || null)
            }
            style={{
              width: "100%",
              minHeight: 42,
              marginTop: 7,
              padding: "0 10px",
              border: "1px solid rgba(34,40,92,.2)",
              background: "white",
              color: "#22285C",
              fontSize: 11,
            }}
          >
            <option value="">All categories</option>
            {search.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {validationError && (
        <p className="finder-status" role="alert">
          {validationError}
        </p>
      )}

      {search.status === "loading" && (
        <p className="finder-status" role="status">
          Searching the catalogue...
        </p>
      )}

      {search.status === "error" && (
        <div className="finder-status" role="alert">
          {search.errorMessage}
          <button
            type="button"
            onClick={search.retry}
            style={{
              marginLeft: 12,
              border: 0,
              background: "transparent",
              color: "#22285C",
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            Try again
          </button>
        </div>
      )}

      {search.status === "success" && search.result && (
        <div className="finder-results" aria-live="polite">
          {search.result.source === "sample" && (
            <div className="finder-notice">
              Development preview only. These are not confirmed
              Anmol Lab offerings or a verified price list.
            </div>
          )}

          {search.result.source === "api" && (
            <p className="finder-status">
              Official catalogue results
            </p>
          )}

          {search.result.items.length === 0 ? (
            <p className="finder-status">
              No matching tests were found.
            </p>
          ) : (
            search.result.items.map((test) => (
              <article className="finder-result" key={test.id}>
                <div>
                  <div className="finder-result-name">
                    {test.name}
                  </div>

                  <div className="finder-result-meta">
                    {test.category}
                    {test.code ? ` · ${test.code}` : ""}
                  </div>
                </div>

                <div className="finder-result-price">
                  {formatPrice(test.price)}
                </div>
              </article>
            ))
          )}

          <p className="finder-status">
            Always confirm availability, preparation requirements
            and final pricing with the laboratory.
          </p>
        </div>
      )}

      {search.status === "idle" && (
        <p className="finder-hint">
          Search by test name, code or category.
        </p>
      )}
    </section>
  );
}

