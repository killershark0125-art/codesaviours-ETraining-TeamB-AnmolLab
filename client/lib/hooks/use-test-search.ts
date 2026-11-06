"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  MAX_QUERY_LENGTH,
  MIN_QUERY_LENGTH,
  normalizeQuery,
  getTestCategories,
  searchTests,
} from "@/lib/api/tests";

import type {
  CategoryOption,
  TestSearchResult,
} from "@/lib/types";

const DEBOUNCE_MS = 300;

type Settled =
  | { key: string; result: TestSearchResult; error: null }
  | { key: string; result: null; error: string };

export type SearchStatus = "idle" | "loading" | "success" | "error";

export function useTestSearch() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [settled, setSettled] = useState<Settled | null>(null);
  const [attempt, setAttempt] = useState(0);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = query.length >= MIN_QUERY_LENGTH || category !== null;

  const requestKey = isActive
    ? `${attempt}|${category ?? ""}|${query}|${page}`
    : null;

  // Load category options separately from test search results.
  useEffect(() => {
    const controller = new AbortController();

    getTestCategories(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setCategories(result);
        setCategoriesError(null);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setCategoriesError("Categories could not be loaded.");
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setCategoriesLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  // Search tests when the query, category, page, or retry attempt changes.
  useEffect(() => {
    if (requestKey === null) return;

    const controller = new AbortController();

    searchTests(
      {
        query,
        category,
        page,
      },
      controller.signal,
    )
      .then((result) => {
        if (controller.signal.aborted) return;

        setSettled({
          key: requestKey,
          result,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setSettled({
          key: requestKey,
          result: null,
          error:
            error instanceof Error
              ? error.message
              : "The test catalogue could not be reached.",
        });
      });

    return () => controller.abort();
  }, [requestKey, query, category, page]);

  // Clear pending debounce timers on unmount.
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const updateInput = useCallback((value: string) => {
    const next = value.slice(0, MAX_QUERY_LENGTH);

    setInput(next);
    setPage(1);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (!next.trim()) {
      setQuery("");
      return;
    }

    timer.current = setTimeout(() => {
      setQuery(normalizeQuery(next));
    }, DEBOUNCE_MS);
  }, []);

  const submit = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setPage(1);
    setQuery(normalizeQuery(input));
  }, [input]);

  const applySuggestion = useCallback((value: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setInput(value);
    setPage(1);
    setQuery(normalizeQuery(value));
  }, []);

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setInput("");
    setQuery("");
    setPage(1);
  }, []);

  const selectCategory = useCallback((value: string | null) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    setCategory(value);
    setPage(1);
  }, []);

  const changePage = useCallback((nextPage: number) => {
    setPage((current) => {
      const safePage = Math.floor(nextPage);
      return Number.isFinite(safePage) && safePage >= 1
        ? safePage
        : current;
    });
  }, []);

  const retry = useCallback(() => {
    setAttempt((value) => value + 1);
  }, []);

  let status: SearchStatus = "idle";

  if (requestKey !== null) {
    if (settled?.key !== requestKey) {
      status = "loading";
    } else {
      status = settled.error ? "error" : "success";
    }
  }

  return {
    input,
    query,
    category,
    categories,
    categoriesLoading,
    categoriesError,
    page,
    status,
    result: status === "success" ? (settled?.result ?? null) : null,
    errorMessage: status === "error" ? (settled?.error ?? null) : null,
    updateInput,
    submit,
    applySuggestion,
    clear,
    selectCategory,
    changePage,
    retry,
  };
}