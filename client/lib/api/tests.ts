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

function requireApiBaseUrl(): string {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new ApiError(
      "The laboratory API is not configured. Please try again later.",
    );
  }

  return baseUrl;
}

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

function getString(value: unknown, fallback = ""): string {
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
    throw new ApiError("Unexpected response from the test catalogue.");
  }

  const data = payload.data;
  const pagination = data.pagination;

  if (!Array.isArray(data.tests) || !isRecord(pagination)) {
    throw new ApiError("The test catalogue returned invalid data.");
  }

  const totalTests = pagination.totalTests;
  const currentPage = pagination.currentPage;
  const totalPages = pagination.totalPages;
  const limit = pagination.limit;

  if (
    typeof totalTests !== "number" ||
    !Number.isInteger(totalTests) ||
    totalTests < 0 ||
    typeof currentPage !== "number" ||
    !Number.isInteger(currentPage) ||
    currentPage < 1 ||
    typeof totalPages !== "number" ||
    !Number.isInteger(totalPages) ||
    totalPages < 0 ||
    typeof limit !== "number" ||
    !Number.isInteger(limit) ||
    limit < 1
  ) {
    throw new ApiError("The test catalogue returned invalid pagination data.");
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

export async function getTestCategories(
  signal?: AbortSignal,
): Promise<CategoryOption[]> {
  const baseUrl = requireApiBaseUrl();

  const url = new URL("/api/categories/getAllCategories", baseUrl);
  const payload = await fetchJson(url, signal);

  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    throw new ApiError("Unexpected response from the category catalogue.");
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

export async function searchTests(
  params: TestSearchParams,
  signal?: AbortSignal,
): Promise<TestSearchResult> {
  const baseUrl = requireApiBaseUrl();

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