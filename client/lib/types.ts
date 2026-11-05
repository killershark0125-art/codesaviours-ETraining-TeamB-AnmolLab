/**
 * Shapes shared between the UI and the API layer. The API contract these
 * mirror is documented in lib/api/README.md and must be agreed with the
 * backend before the endpoints go live.
 */

export type DataSource = "api" | "sample";

export type TestSummary = {
  id: string;
  slug: string;
  name: string;
  code: string | null;
  category: string;
  /** PKR. null until the laboratory confirms a price. */
  price: number | null;
};

export type TestSearchParams = {
  query: string;
  category: string | null;
  limit?: number;
};

export type TestSearchResult = {
  items: TestSummary[];
  total: number;
  categories: string[];
  source: DataSource;
};

export type HealthPackage = {
  id: string;
  slug: string;
  name: string;
  includedTests: string[];
  /** PKR. null until the laboratory confirms a price. */
  regularPrice: number | null;
  packagePrice: number | null;
};

export type HealthPackagesResult = {
  items: HealthPackage[];
  source: DataSource;
};
