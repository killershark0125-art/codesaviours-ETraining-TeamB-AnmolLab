import { sampleTests } from "@/lib/data/sample";

import type {
  CategoryOption,
  TestSearchParams,
  TestSearchResult,
  TestSummary,
} from "@/lib/types";

import { ApiError, fetchJson, getApiBaseUrl } from "./http";

export const MIN_QUERY_LENGTH = 2;
export const MAX_QUERY_LENGTH = 80;
export const RESULT_LIMIT = 8;

/** Trims, normalizes whitespace, strips control characters and caps length. */
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

function getString(
  value: unknown,
  fallback = "",
): string {
  return typeof value === "string" ? value : fallback;
}

function getId(value: Record<string, unknown>): string {
  if (typeof value._id === "string") return value._id;
  if (typeof value.id === "string") return value.id;
  return "";
}

function parseTest(value: unknown): TestSummary | null {
  if (!isRecord(value)) return null;

  const id = getId(value);
  const name = getString(value.name);
  const slug = getString(value.slug, id);

  const categoryValue = value.category;

  const category =
    typeof categoryValue === "string"
      ? categoryValue
      : isRecord(categoryValue)
        ? getString(categoryValue.name)
        : "";

  if (!id || !name || !category) return null;

  const priceStatus =
    value.priceStatus === "confirmed" ? "confirmed" : "pending";

  const price =
    priceStatus === "confirmed" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0
      ? value.price
      : null;

  return {
    id,
    slug,
    name,
    code:
      typeof value.code === "string" && value.code.trim()
        ? value.code.trim()
        : null,
    category,
    price,
    priceStatus,
  };
}

function parseTestListResponse(payload: unknown): TestSearchResult {
  if (!isRecord(payload) || !isRecord(payload.data)) {
    throw new ApiError("Unexpected response from the test catalogue");
  }

  const data = payload.data;

  if (!Array.isArray(data.tests) || !isRecord(data.pagination)) {
    throw new ApiError("The test catalogue returned an invalid data structure");
  }

  const pagination = data.pagination;

  const totalTests =
    typeof pagination.totalTests === "number" &&
    Number.isInteger(pagination.totalTests) &&
    pagination.totalTests >= 0
      ? pagination.totalTests
      : null;

  const currentPage =
    typeof pagination.currentPage === "number" &&
    Number.isInteger(pagination.currentPage) &&
    pagination.currentPage >= 1
      ? pagination.currentPage
      : null;

  const totalPages =
    typeof pagination.totalPages === "number" &&
    Number.isInteger(pagination.totalPages) &&
    pagination.totalPages >= 0
      ? pagination.totalPages
      : null;

  const limit =
    typeof pagination.limit === "number" &&
    Number.isInteger(pagination.limit) &&
    pagination.limit >= 1
      ? pagination.limit
      : null;

  if (
    totalTests === null ||
    currentPage === null ||
    totalPages === null ||
    limit === null
  ) {
    throw new ApiError("The test catalogue returned invalid pagination data");
  }

  const items = data.tests
    .map(parseTest)
    .filter((test): test is TestSummary => test !== null);

  return {
    items,
    total: totalTests,
    categories: [],
    pagination: {
      totalTests,
      currentPage,
      totalPages,
      limit,
    },
    source: "api",
  };
}

function getSampleCategories(): CategoryOption[] {
  const names = [
    ...new Set(
      sampleTests
        .map((test) => test.category)
        .filter((name): name is string => Boolean(name)),
    ),
  ].sort((a, b) => a.localeCompare(b));

  return names.map((name) => ({
    id: name,
    name,
  }));
}

/**
 * Fetches active categories from the backend.
 * Uses sample category names when the API is not configured.
 */
export async function getTestCategories(
  signal?: AbortSignal,
): Promise<CategoryOption[]> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return getSampleCategories();
  }

  const url = new URL("/api/categories/getAllCategories", baseUrl);
  const payload = await fetchJson(url, signal);

  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    throw new ApiError("Unexpected response from the category catalogue");
  }

  return payload.data
    .filter(isRecord)
    .filter((category) => category.isActive !== false)
    .map((category): CategoryOption | null => {
      const id = getId(category);
      const name = getString(category.name);

      return id && name ? { id, name } : null;
    })
    .filter((category): category is CategoryOption => category !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function searchSample({
  query,
  category,
  page = 1,
  limit = RESULT_LIMIT,
}: TestSearchParams): TestSearchResult {
  const needle = query.toLowerCase();
  const pageSize = Math.max(1, limit);
  const pageNumber = Math.max(1, page);

  const matches = sampleTests.filter((test) => {
    if (category && test.category !== category) return false;
    if (!needle) return true;

    return (
      test.name.toLowerCase().includes(needle) ||
      test.code?.toLowerCase().includes(needle) ||
      test.category.toLowerCase().includes(needle)
    );
  });

  const total = matches.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (pageNumber - 1) * pageSize;

  return {
    items: matches.slice(start, start + pageSize),
    total,
    categories: getSampleCategories().map((item) => item.name),
    pagination: {
      totalTests: total,
      currentPage: pageNumber,
      totalPages,
      limit: pageSize,
    },
    source: "sample",
  };
}

/**
 * Fetches tests from the actual backend.
 *
 * Public catalogue requests only include active tests.
 * When NEXT_PUBLIC_API_URL is absent, clearly labelled sample data is used.
 */
export async function searchTests(
  params: TestSearchParams,
  signal?: AbortSignal,
): Promise<TestSearchResult> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return searchSample(params);
  }

  const url = new URL("/api/tests/getAllTests", baseUrl);

  const query = normalizeQuery(params.query);
  const page = Math.max(1, Math.floor(params.page ?? 1));
  const limit = Math.min(
    100,
    Math.max(1, Math.floor(params.limit ?? RESULT_LIMIT)),
  );

  if (query) {
    url.searchParams.set("search", query);
  }

  if (params.category) {
    url.searchParams.set("category", params.category);
  }

  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("isActive", "true");

  const payload = await fetchJson(url, signal);

  return parseTestListResponse(payload);
}