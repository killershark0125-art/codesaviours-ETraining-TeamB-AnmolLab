
import type {
  HealthPackage,
  TestSummary,
} from "@/lib/types";

function isValidPrice(value: number | null): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0
  );
}

export function calculateCartPricing(
  tests: TestSummary[],
  packages: HealthPackage[],
) {
  const includedTestIds = new Set<string>();
  const includedTestSlugs = new Set<string>();

  for (const healthPackage of packages) {
    for (const test of healthPackage.includedTests) {
      if (test.id) {
        includedTestIds.add(test.id);
      }

      if (test.slug) {
        includedTestSlugs.add(test.slug);
      }
    }
  }

  const coveredTests = tests.filter(
    (test) =>
      includedTestIds.has(test.id) ||
      includedTestSlugs.has(test.slug),
  );

  const standaloneTests = tests.filter(
    (test) =>
      !includedTestIds.has(test.id) &&
      !includedTestSlugs.has(test.slug),
  );

  const confirmedPackages = packages.filter(
    (healthPackage) =>
      isValidPrice(healthPackage.packagePrice),
  );

  const pendingPackages = packages.filter(
    (healthPackage) =>
      !isValidPrice(healthPackage.packagePrice),
  );

  const confirmedTests = standaloneTests.filter(
    (test) =>
      test.priceStatus === "confirmed" &&
      isValidPrice(test.price),
  );

  const pendingTests = standaloneTests.filter(
    (test) =>
      test.priceStatus !== "confirmed" ||
      !isValidPrice(test.price),
  );

  const packageSubtotal = confirmedPackages.reduce(
    (total, healthPackage) =>
      total + (healthPackage.packagePrice ?? 0),
    0,
  );

  const testSubtotal = confirmedTests.reduce(
    (total, test) =>
      total + (test.price ?? 0),
    0,
  );

  const confirmedSubtotal = packageSubtotal + testSubtotal;

  return {
    coveredTests,
    standaloneTests,
    confirmedPackages,
    pendingPackages,
    confirmedTests,
    pendingTests,

    packageCount: packages.length,
    testCount: tests.length,
    coveredTestCount: coveredTests.length,

    pendingPackageCount: pendingPackages.length,
    pendingTestCount: pendingTests.length,

    packageSubtotal,
    testSubtotal,
    confirmedSubtotal,

    hasPending:
      pendingPackages.length > 0 ||
      pendingTests.length > 0,
  };
}
