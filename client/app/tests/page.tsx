import type { Metadata } from "next";
import { Suspense } from "react";

import SiteHeader from "@/components/layout/site-header";
import TestCatalogue from "@/components/tests/test-catalogue";
import { siteConfig } from "@/lib/site";

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

/**
 * This component accesses request-time search parameters.
 * It must remain inside the Suspense boundary in the page below.
 */
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
        color: "#7D7E80",
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

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-brand">
            ANMOL HEALTH CARE LAB
          </span>

          <span className="footer-muted">
            {siteConfig.tagline}
          </span>

          <span className="footer-muted">
            © 2026 Anmol Lab
          </span>
        </div>
      </footer>
    </>
  );
}