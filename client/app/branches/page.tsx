
import type { Metadata } from "next";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import VisualPageHero from "@/components/layout/visual-page-hero";
import BranchDirectory from "@/components/home/branch-directory";

export const metadata: Metadata = {
  title: "Our Branches | Anmol Health Care Lab",
  description:
    "Explore Anmol Health Care Lab locations and review available branch addresses, contact details, timings and directions.",
};

export default function BranchesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <VisualPageHero
          eyebrow="OUR LOCATIONS"
          title={
            <>
              Your next visit,
              <br />
              <em>starts right here.</em>
            </>
          }
          description="Explore the available laboratory locations, review each branch's information and open directions before planning your visit."
          imageSrc="/images/branches-hero.jpg"
          imageAlt="Medical professionals at a contemporary clinic reception"
imagePosition="center center"
mobileImagePosition="10% center"
          primaryHref="#branches"
          primaryLabel="Explore our locations"
          secondaryHref="/#contact"
          secondaryLabel="Contact the laboratory"
        />

        <BranchDirectory />
      </main>

      <SiteFooter />
    </>
  );
}
