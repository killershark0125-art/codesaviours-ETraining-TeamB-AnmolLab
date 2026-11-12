
import type { Metadata } from "next";
import { Suspense } from "react";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import TestCatalogue from "@/components/tests/test-catalogue";

export const metadata: Metadata = {
  title: "Test Catalogue | Anmol Health Care Lab",
  description:
    "Explore the diagnostic test catalogue from Anmol Health Care Lab, Faisalabad. Search available tests and browse laboratory categories.",
};

type SearchParams = {
  search?: string | string[];
};

type TestsPageProps = {
  searchParams: Promise<SearchParams>;
};

async function CatalogueContent({
  searchParams,
}: TestsPageProps) {
  const params = await searchParams;
  const searchValue = params.search;

  const initialQuery = Array.isArray(searchValue)
    ? searchValue[0] ?? ""
    : searchValue ?? "";

  return <TestCatalogue initialQuery={initialQuery} />;
}

function CatalogueFallback() {
  return (
    <div
      className="container"
      role="status"
      aria-live="polite"
      style={{
        minHeight: "360px",
        display: "grid",
        placeItems: "center",
        color: "#63747a",
        fontSize: "13px",
      }}
    >
      Preparing the test catalogue...
    </div>
  );
}

export default function TestsPage({
  searchParams,
}: TestsPageProps) {
  return (
    <>
      <SiteHeader />

      <main id="tests">
        <Suspense fallback={<CatalogueFallback />}>
          <CatalogueContent searchParams={searchParams} />
        </Suspense>
      </main>

      <SiteFooter />
    </>
  );
}
