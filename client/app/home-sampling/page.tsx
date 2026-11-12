
import type { Metadata } from "next";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import VisualPageHero from "@/components/layout/visual-page-hero";
import HomeSampling from "@/components/home/home-sampling";

export const metadata: Metadata = {
  title: "Home Sampling | Anmol Health Care Lab",
  description:
    "Request a home sample collection from Anmol Health Care Lab and learn how to arrange your preferred collection time.",
};

export default function HomeSamplingPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <VisualPageHero
          eyebrow="AT-HOME COLLECTION"
          title={
            <>
              Sample collection,
              <br />
              <em>closer to home.</em>
            </>
          }
          description="Request a sample collection at your address. Share a preferred time and the laboratory will confirm availability and guide you through the next steps."
          imageSrc="/images/home-sampling-hero.jpg"
          imageAlt="Healthcare professional providing care during a home visit"
imagePosition="center center"
mobileImagePosition="center center"
          primaryHref="#home-sampling"
          primaryLabel="Explore the process"
          secondaryHref="/#contact"
          secondaryLabel="Contact the laboratory"
        />

        <HomeSampling />
      </main>

      <SiteFooter />
    </>
  );
}
