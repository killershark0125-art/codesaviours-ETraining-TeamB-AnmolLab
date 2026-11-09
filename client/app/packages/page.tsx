
import type { Metadata } from "next";

import SiteHeader from "@/components/layout/site-header";
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

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-brand">
            ANMOL HEALTH CARE LAB
          </span>



          <span className="footer-muted">
            © 2026 Anmol Lab
          </span>
        </div>
      </footer>
    </>
  );
}
