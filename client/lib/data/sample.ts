import type { HealthPackage, TestSummary } from "@/lib/types";

/**
 * Placeholder listing used only while no backend is configured. It contains
 * names and categories but deliberately no prices or clinical details: those
 * must come from the laboratory. Delete this file once the API is live.
 */

function sampleTest(
  name: string,
  category: string,
  code: string | null = null,
): TestSummary {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return { id: `sample-${slug}`, slug, name, code, category, price: null };
}

export const sampleTests: TestSummary[] = [
  sampleTest("Complete Blood Count", "Haematology", "CBC"),
  sampleTest("Erythrocyte Sedimentation Rate", "Haematology", "ESR"),
  sampleTest("Haemoglobin", "Haematology", "Hb"),
  sampleTest("Glycated Haemoglobin", "Diabetes", "HbA1c"),
  sampleTest("Fasting Blood Glucose", "Diabetes", "FBS"),
  sampleTest("Random Blood Glucose", "Diabetes", "RBS"),
  sampleTest("Lipid Profile", "Cardiac", "LP"),
  sampleTest("Liver Function Tests", "Liver", "LFT"),
  sampleTest("Renal Function Tests", "Kidney", "RFT"),
  sampleTest("Serum Creatinine", "Kidney"),
  sampleTest("Urine Complete Examination", "Urine", "Urine R/E"),
  sampleTest("Thyroid Stimulating Hormone", "Thyroid", "TSH"),
  sampleTest("Vitamin D", "Vitamins", "25-OH"),
  sampleTest("Serum Ferritin", "Haematology"),
  sampleTest("C-Reactive Protein", "Inflammation", "CRP"),
];

function samplePackage(
  name: string,
  includedTests: string[],
): HealthPackage {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    id: `sample-${slug}`,
    slug,
    name,
    includedTests,
    regularPrice: null,
    packagePrice: null,
  };
}

export const samplePackages: HealthPackage[] = [
  samplePackage("Full Body", [
    "Complete Blood Count",
    "Lipid Profile",
    "Liver Function Tests",
    "Renal Function Tests",
    "Urine Complete Examination",
  ]),
  samplePackage("Diabetes", [
    "Glycated Haemoglobin",
    "Fasting Blood Glucose",
    "Renal Function Tests",
    "Urine Complete Examination",
  ]),
  samplePackage("Heart", [
    "Lipid Profile",
    "C-Reactive Protein",
    "Fasting Blood Glucose",
  ]),
  samplePackage("Women’s Health", [
    "Complete Blood Count",
    "Serum Ferritin",
    "Thyroid Stimulating Hormone",
    "Vitamin D",
  ]),
  samplePackage("Senior Citizen", [
    "Complete Blood Count",
    "Lipid Profile",
    "Renal Function Tests",
    "Glycated Haemoglobin",
    "Vitamin D",
  ]),
];
