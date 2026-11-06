/**
 * Shapes shared between the UI and the API layer.
 */

export type DataSource = "api" | "sample";

export type CategoryOption = {
  id: string;
  name: string;
};

export type TestSummary = {
  id: string;
  slug: string;
  name: string;
  code: string | null;
  category: string;
  /** PKR. Only populated when the laboratory has confirmed the price. */
  price: number | null;
  priceStatus?: "pending" | "confirmed";
};

export type TestSearchParams = {
  query: string;
  /** MongoDB category ID for the API; category name for sample data. */
  category: string | null;
  page?: number;
  limit?: number;
};

export type TestPagination = {
  totalTests: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};

export type TestSearchResult = {
  items: TestSummary[];
  total: number;
  categories: string[];
  pagination: TestPagination;
  source: DataSource;
};

export type HealthPackage = {
  id: string;
  slug: string;
  name: string;
  includedTests: string[];
  /** PKR. null until the laboratory confirms it. */
  regularPrice: number | null;
  packagePrice: number | null;
};

export type HealthPackagesResult = {
  items: HealthPackage[];
  source: DataSource;
};