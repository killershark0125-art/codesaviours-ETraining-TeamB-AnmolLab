
import type { Branch } from "@/lib/types";
import { ApiError, fetchJson, getApiBaseUrl } from "./http";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getId(value: Record<string, unknown>): string {
  if (typeof value._id === "string") return value._id;
  if (typeof value.id === "string") return value.id;
  return "";
}

/**
 * Accept only absolute HTTPS URLs for external map links.
 * Invalid or empty optional URLs are omitted from the UI.
 */
function getSafeExternalUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const url = new URL(value);

    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function parseBranch(value: unknown): Branch | null {
  if (!isRecord(value)) return null;

  const id = getId(value);
  const name = getString(value.name);
  const slug = getString(value.slug);
  const address = getString(value.address);
  const phone = getString(value.phone);
  const timings = getString(value.timings);

  if (
    !id ||
    !name ||
    !slug ||
    !address ||
    !phone ||
    !timings ||
    typeof value.isActive !== "boolean"
  ) {
    return null;
  }

  return {
    id,
    name,
    slug,
    address,
    phone,
    timings,
    mapEmbedUrl: getSafeExternalUrl(value.mapEmbedUrl),
    directionsUrl: getSafeExternalUrl(value.directionsUrl),
    isActive: value.isActive,
  };
}

export async function getBranches(
  signal?: AbortSignal,
): Promise<Branch[]> {
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    throw new ApiError(
      "The laboratory API is not configured. Please try again later.",
    );
  }

  const url = new URL("/api/branches/getAllBranches", baseUrl);
  const payload = await fetchJson(url, signal);

  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    throw new ApiError(
      "The laboratory returned an unexpected branch response.",
    );
  }

  return payload.data
    .map(parseBranch)
    .filter((branch): branch is Branch => branch !== null)
    .filter((branch) => branch.isActive);
}
