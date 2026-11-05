export class ApiError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const DEFAULT_TIMEOUT_MS = 10_000;

/** Base URL of the backend. Empty when no backend is configured. */
export function getApiBaseUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_API_URL?.trim();
  return value ? value : null;
}

/**
 * GET a JSON document with a hard timeout. The caller's signal is honoured, so
 * superseded requests can be cancelled without leaking timers.
 */
export async function fetchJson(
  url: URL,
  signal?: AbortSignal,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<unknown> {
  const controller = new AbortController();
  const forwardAbort = () => controller.abort();

  if (signal?.aborted) {
    controller.abort();
  } else {
    signal?.addEventListener("abort", forwardAbort, { once: true });
  }

  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
      );
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", forwardAbort);
  }
}
