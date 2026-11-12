
import type { Metadata } from "next";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import PackageDirectory from "@/components/packages/package-directory";

export const metadata: Metadata = {
  title: "Health Packages | Anmol Health Care Lab",
  description:
    "Explore available health packages and their included diagnostic tests from Anmol Health Care Lab.",
};

export default function PackagesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <PackageDirectory variant="full" />
      </main>

      <SiteFooter />
    </>
  );
}
