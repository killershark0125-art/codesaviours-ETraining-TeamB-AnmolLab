import type {
  HealthPackage,
  HealthPackagesResult,
  PackageTestSummary,
} from "@/lib/types";

import { ApiError, fetchJson, getApiBaseUrl } from "./http";

function requireApiBaseUrl(): string {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new ApiError(
      "The laboratory API is not configured. Please try again later.",
    );
  }

  return baseUrl;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getId(value: Record<string, unknown>): string {
  if (typeof value._id === "string") return value._id;
  if (typeof value.id === "string") return value.id;
  return "";
}

function parsePrice(value: unknown): number | null {
  return typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0
    ? value
    : null;
}

function parseIncludedTest(value: unknown): PackageTestSummary | null {
  if (!isRecord(value)) return null;

  const id = getId(value);
  const name = getString(value.name);
  const slug = getString(value.slug);
  const priceStatus =
    value.priceStatus === "confirmed" ? "confirmed" : "pending";

  if (!id || !name) return null;

  return {
    id,
    name,
    slug,
    price:
      priceStatus === "confirmed"
        ? parsePrice(value.price)
        : null,
    priceStatus,
  };
}

function parsePackage(value: unknown): HealthPackage | null {
  if (!isRecord(value)) return null;

  const id = getId(value);
  const slug = getString(value.slug);
  const name = getString(value.name);

  if (!id || !slug || !name) return null;

  const includedTests = Array.isArray(value.includedTests)
    ? value.includedTests
        .map(parseIncludedTest)
        .filter((test): test is PackageTestSummary => test !== null)
    : [];

  return {
    id,
    slug,
    name,
    description: getString(value.description),
    includedTests,
    discountPercentage:
      typeof value.discountPercentage === "number"
        ? value.discountPercentage
        : 0,
    originalPrice: parsePrice(value.originalPrice),
    packagePrice: parsePrice(value.packagePrice),
    savings: parsePrice(value.savings),
    isActive: value.isActive === true,
  };
}

export async function getHealthPackages(
  signal?: AbortSignal,
): Promise<HealthPackagesResult> {
  const baseUrl = requireApiBaseUrl();

  const url = new URL("/api/packages/getAllPackages", baseUrl);
  const payload = await fetchJson(url, signal);

  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    throw new ApiError("Unexpected response from the packages endpoint.");
  }

  const items = payload.data
    .map(parsePackage)
    .filter((item): item is HealthPackage => item !== null)
    .filter((item) => item.isActive);

  return {
    items,
    source: "api",
  };
}