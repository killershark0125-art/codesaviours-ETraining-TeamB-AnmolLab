import type { Metadata } from "next";

import EditorialPage from "@/components/public-pages/editorial-page";

export const metadata: Metadata = {
  title: "Health Articles & Guides | Anmol Health Care Lab",
  description:
    "Explore health education articles and laboratory test preparation guides from Anmol Health Care Lab.",
};

export default function BlogPage() {
  return (
    <EditorialPage
      hero={{
        eyebrow: "KNOWLEDGE & INFORMATION",
        title: (
          <>
            Understand more.
            <br />
            <em>Make informed choices.</em>
          </>
        ),
        description:
          "A space for health education, laboratory test preparation guides and clear explanations of common diagnostic tests.",
        imageSrc: "/images/test-catalogue-hero.jpg",
        imageAlt:
          "Automated laboratory analyzer used for processing diagnostic samples",
       
        primaryHref: "#editorial-details-title",
        primaryLabel: "Explore articles",
        secondaryHref: "/faq",
        secondaryLabel: "Browse FAQs",
      }}
      overview={{
        eyebrow: "THE KNOWLEDGE JOURNAL",
        title: (
          <>
            Information made
            <em> easier to understand.</em>
          </>
        ),
        description:
          "The journal is intended to bring together educational material about test preparation, common laboratory tests and patient information.",
      }}
      details={{
        eyebrow: "LATEST FROM THE JOURNAL",
        title: (
          <>
            Read, explore
            <em> and learn.</em>
          </>
        ),
        description:
          "Only published articles should appear here. Articles will be displayed once the published content feed is connected.",
        emptyState: {
          eyebrow: "ARTICLE LIBRARY",
          title: "The journal is being prepared.",
          description:
            "There are no connected articles to display yet. Please check back when the laboratory's educational content has been published.",
        },
      }}
      closing={{
        eyebrow: "EXPLORE THE LABORATORY",
        title: (
          <>
            Looking for
            <em> test information?</em>
          </>
        ),
        description:
          "Explore the available test catalogue or browse common questions about laboratory services.",
        actions: [
          {
            label: "Explore tests",
            href: "/tests",
            variant: "primary",
          },
          {
            label: "Frequently asked questions",
            href: "/faq",
            variant: "secondary",
          },
        ],
      }}
    />
  );
}