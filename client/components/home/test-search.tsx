
"use client";

import { useMemo, useState } from "react";

const exampleTests = [
  "CBC",
  "Lipid Profile",
  "HbA1c",
  "LFT",
  "RFT",
  "Urine Complete Examination",
];

export default function TestSearch() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const matchingExamples = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return exampleTests;
    }

    return exampleTests.filter((test) =>
      test.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function selectExample(test: string) {
    setQuery(test);
    setSubmitted(false);
  }

  return (
    <div className="search-panel">
      <label
        className="search-panel-label"
        htmlFor="test-search"
      >
        Find a diagnostic test
      </label>

      <form
        className="search-form"
        onSubmit={handleSearch}
        role="search"
      >
        <div className="search-input-wrap">
          <span aria-hidden="true">⌕</span>

          <input
            id="test-search"
            name="test"
            type="search"
            className="search-input"
            placeholder="Search CBC, Lipid Profile, HbA1c..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSubmitted(false);
            }}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="button button-primary"
          disabled={!query.trim()}
        >
          Search tests
          <span aria-hidden="true">↗</span>
        </button>
      </form>

      <div className="search-examples">
        <span>Examples:</span>

        {matchingExamples.map((test) => (
          <button
            key={test}
            type="button"
            className="search-example"
            onClick={() => selectExample(test)}
          >
            {test}
          </button>
        ))}
      </div>

      {submitted && (
        <p className="search-status" role="status">
          Search term: <strong>{query}</strong>. The live laboratory
          catalogue is not connected yet. Please contact the lab
          to confirm test availability and pricing.
        </p>
      )}

      {!submitted && (
        <p className="search-status">
          Test availability, preparation instructions and prices
          will be displayed after the verified catalogue is connected.
        </p>
      )}
    </div>
  );
}
