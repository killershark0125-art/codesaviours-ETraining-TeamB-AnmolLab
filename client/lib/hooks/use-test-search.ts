"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  MAX_QUERY_LENGTH,
  MIN_QUERY_LENGTH,
  normalizeQuery,
  searchTests,
} from "@/lib/api/tests";
import type { TestSearchResult } from "@/lib/types";

const DEBOUNCE_MS = 300;

type Settled =
  | { key: string; result: TestSearchResult; error: null }
  | { key: string; result: null; error: string };

export type SearchStatus = "idle" | "loading" | "success" | "error";

export function useTestSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [settled, setSettled] = useState<Settled | null>(null);
  const [attempt, setAttempt] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = query.length >= MIN_QUERY_LENGTH || category !== null;
  const requestKey = isActive ? `${attempt}|${category ?? ""}|${query}` : null;

  useEffect(() => {
    if (requestKey === null) return;

    const controller = new AbortController();

    searchTests({ query, category }, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setSettled({ key: requestKey, result, error: null });
        setCategories((current) =>
          result.categories.length > 0 ? result.categories : current,
        );
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setSettled({
          key: requestKey,
          result: null,
          error: "The test catalogue could not be reached.",
        });
      });

    return () => controller.abort();
  }, [requestKey, query, category]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const updateInput = useCallback((value: string) => {
    const next = value.slice(0, MAX_QUERY_LENGTH);
    setInput(next);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setQuery(normalizeQuery(next)),
      DEBOUNCE_MS,
    );
  }, []);

  const submit = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setQuery(normalizeQuery(input));
  }, [input]);

  const applySuggestion = useCallback((value: string) => {
    if (timer.current) clearTimeout(timer.current);
    setInput(value);
    setQuery(normalizeQuery(value));
  }, []);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setInput("");
    setQuery("");
  }, []);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  let status: SearchStatus = "idle";
  if (requestKey !== null) {
    if (settled?.key !== requestKey) status = "loading";
    else status = settled.error ? "error" : "success";
  }

  return {
    input,
    query,
    category,
    categories,
    status,
    result: status === "success" ? (settled?.result ?? null) : null,
    errorMessage: status === "error" ? (settled?.error ?? null) : null,
    updateInput,
    submit,
    applySuggestion,
    clear,
    selectCategory: setCategory,
    retry,
  };
}
