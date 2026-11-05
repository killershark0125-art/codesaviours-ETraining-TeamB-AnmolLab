import { samplePackages } from "@/lib/data/sample";
import type { HealthPackage, HealthPackagesResult } from "@/lib/types";

import { ApiError, fetchJson, getApiBaseUrl } from "./http";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parsePrice(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function parsePackage(value: unknown): HealthPackage | null {
  if (!isRecord(value)) return null;

  const { id, slug, name, includedTests, regularPrice, packagePrice } = value;

  if (
    typeof id !== "string" ||
    typeof slug !== "string" ||
    typeof name !== "string"
  ) {
    return null;
  }

  return {
    id,
    slug,
    name,
    includedTests: Array.isArray(includedTests)
      ? includedTests.filter((test): test is string => typeof test === "string")
      : [],
    regularPrice: parsePrice(regularPrice),
    packagePrice: parsePrice(packagePrice),
  };
}

/**
 * Loads the health packages. Uses the backend when NEXT_PUBLIC_API_URL is set,
 * and the clearly labelled sample listing otherwise.
 */
export async function getHealthPackages(
  signal?: AbortSignal,
): Promise<HealthPackagesResult> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return { items: samplePackages, source: "sample" };
  }

  const payload = await fetchJson(new URL("/api/packages", baseUrl), signal);

  if (!isRecord(payload) || !Array.isArray(payload.items)) {
    throw new ApiError("Unexpected response from the packages endpoint");
  }

  const items = payload.items
    .map(parsePackage)
    .filter((item): item is HealthPackage => item !== null);

  return { items, source: "api" };
}
