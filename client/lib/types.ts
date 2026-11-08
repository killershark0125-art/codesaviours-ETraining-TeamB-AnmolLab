export type DataSource = "api";

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
  price: number | null;
  priceStatus: "pending" | "confirmed";
};

export type TestSearchParams = {
  query: string;
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

export type PackageTestSummary = {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  priceStatus: "pending" | "confirmed";
};

export type HealthPackage = {
  id: string;
  slug: string;
  name: string;
  description: string;
  includedTests: PackageTestSummary[];
  discountPercentage: number;
  originalPrice: number | null;
  packagePrice: number | null;
  savings: number | null;
  isActive: boolean;
};

export type HealthPackagesResult = {
  items: HealthPackage[];
  source: DataSource;
};

export type Branch = {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  timings: string;
  mapEmbedUrl: string | null;
  directionsUrl: string | null;
  isActive: boolean;
};