import type { Metadata } from "next";

import EditorialPage from "@/components/public-pages/editorial-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Anmol Health Care Lab",
  description:
    "Preliminary privacy information for visitors using the Anmol Health Care Lab website.",
};

export default function PrivacyPage() {
  return (
    <EditorialPage
      hero={{
        eyebrow: "PRIVACY & INFORMATION",
        title: (
          <>
            Your information.
            <br />
            <em>Handled with care.</em>
          </>
        ),
        description:
          "Understand the privacy principles that should guide the handling of information through the Anmol Health Care Lab website.",
        imageSrc: "/images/about-lab-hero.jpg",
        imageAlt:
          "Blood sample collection tubes arranged in a laboratory rack",
        primaryHref: "#editorial-details-title",
        primaryLabel: "Read privacy information",
        secondaryHref: "/contact",
        secondaryLabel: "Contact the laboratory",
      }}
      overview={{
        eyebrow: "A RESPONSIBLE APPROACH",
        title: (
          <>
            Privacy is part of
            <em> patient trust.</em>
          </>
        ),
        description:
          "Patient contact details, booking information and laboratory reports require careful handling. The laboratory's final privacy arrangements must be confirmed before online services are made available.",
      }}
      details={{
        eyebrow: "PRELIMINARY PRIVACY NOTICE",
        title: (
          <>
            Information &
            <em> responsible handling.</em>
          </>
        ),
        description:
          "The following sections describe the information areas that the completed website may involve. They are not a substitute for the laboratory's approved privacy policy.",
        sections: [
          {
            number: "01",
            title: "Information you provide",
            paragraphs: [
              "Depending on the services enabled, the website may request information such as your name, contact details, booking information and details needed to identify a report request.",
              "Only information necessary for the relevant service should be requested. The laboratory must confirm its actual collection and processing practices.",
            ],
          },
          {
            number: "02",
            title: "Patient reports",
            paragraphs: [
              "Laboratory reports contain sensitive medical information and require stronger protection than ordinary website content.",
              "The intended report service must verify the identity and authorization of a person before making a report available. Reports must not be exposed through public folders or guessable file links.",
            ],
          },
          {
            number: "03",
            title: "Storage and retention",
            paragraphs: [
              "The laboratory must confirm where patient information and uploaded reports are stored, who can access them and how long they are retained.",
              "Specific storage locations, retention periods and deletion procedures have not been confirmed for publication in this preliminary notice.",
            ],
          },
          {
            number: "04",
            title: "Sharing and service providers",
            paragraphs: [
              "The laboratory must identify any service providers that may process website information, including hosting, database, email or other service providers.",
              "The approved policy should explain what information may be shared, why it is shared and the safeguards used.",
            ],
          },
          {
            number: "05",
            title: "Your privacy questions",
            paragraphs: [
              "For questions about information submitted through the website, contact Anmol Health Care Lab using its published contact details.",
              "The laboratory must confirm the appropriate procedure for requests to access, correct or otherwise manage personal information before this notice is finalized.",
            ],
          },
        ],
      }}
      notice="PRELIMINARY NOTICE — This page is not a finalized privacy policy. Data-retention periods, applicable privacy requirements, service providers and patient request procedures must be supplied and approved by Anmol Health Care Lab before public release."
      closing={{
        eyebrow: "PRIVACY ENQUIRIES",
        title: (
          <>
            Have a question about
            <em> your information?</em>
          </>
        ),
        description:
          "Contact the laboratory for assistance with privacy-related enquiries and questions about its services.",
        actions: [
          {
            label: "Contact the laboratory",
            href: "/contact",
            variant: "primary",
          },
          {
            label: "Back to homepage",
            href: "/",
            variant: "secondary",
          },
        ],
      }}
    />
  );
}