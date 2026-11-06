import { sampleTests } from "@/lib/data/sample";
import type {
  TestSearchParams,
  TestSearchResult,
  TestSummary,
} from "@/lib/types";

import { ApiError, fetchJson, getApiBaseUrl } from "./http";

export const MIN_QUERY_LENGTH = 2;
export const MAX_QUERY_LENGTH = 80;
export const RESULT_LIMIT = 8;

/** Trims, collapses whitespace, strips control characters and caps length. */
export function normalizeQuery(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/\p{Cc}/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_QUERY_LENGTH);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseTest(value: unknown): TestSummary | null {
  if (!isRecord(value)) return null;

  const { id, slug, name, code, category, price } = value;

  if (
    typeof id !== "string" ||
    typeof slug !== "string" ||
    typeof name !== "string" ||
    typeof category !== "string"
  ) {
    return null;
  }

  return {
    id,
    slug,
    name,
    code: typeof code === "string" && code ? code : null,
    category,
    price: typeof price === "number" && Number.isFinite(price) ? price : null,
  };
}

function parseSearchResponse(payload: unknown): TestSearchResult {
  if (!isRecord(payload) || !Array.isArray(payload.items)) {
    throw new ApiError("Unexpected response from the test catalogue");
  }

  const items = payload.items
    .map(parseTest)
    .filter((item): item is TestSummary => item !== null);

  const categories = Array.isArray(payload.categories)
    ? payload.categories.filter(
        (category): category is string => typeof category === "string",
      )
    : [];

  const total =
    typeof payload.total === "number" && Number.isFinite(payload.total)
      ? payload.total
      : items.length;

  return { items, total, categories, source: "api" };
}

function searchSample({
  query,
  category,
  limit = RESULT_LIMIT,
}: TestSearchParams): TestSearchResult {
  const needle = query.toLowerCase();

  const matches = sampleTests.filter((test) => {
    if (category && test.category !== category) return false;
    if (!needle) return true;

    return (
      test.name.toLowerCase().includes(needle) ||
      test.code?.toLowerCase().includes(needle) ||
      test.category.toLowerCase().includes(needle)
    );
  });

  return {
    items: matches.slice(0, limit),
    total: matches.length,
    categories: [...new Set(sampleTests.map((test) => test.category))].sort(),
    source: "sample",
  };
}

/**
 * Searches the test catalogue. Uses the backend when NEXT_PUBLIC_API_URL is
 * set, and the clearly labelled sample listing otherwise.
 */
export async function searchTests(
  params: TestSearchParams,
  signal?: AbortSignal,
): Promise<TestSearchResult> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return searchSample(params);
  }

  const url = new URL("/api/tests", baseUrl);

  if (params.query) url.searchParams.set("q", params.query);
  if (params.category) url.searchParams.set("category", params.category);
  url.searchParams.set("limit", String(params.limit ?? RESULT_LIMIT));

  return parseSearchResponse(await fetchJson(url, signal));
}
