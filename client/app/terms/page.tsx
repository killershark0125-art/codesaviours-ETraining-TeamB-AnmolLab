import type { Metadata } from "next";

import EditorialPage from "@/components/public-pages/editorial-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Anmol Health Care Lab",
  description:
    "Preliminary terms information for visitors using the Anmol Health Care Lab website.",
};

export default function TermsPage() {
  return (
    <EditorialPage
      hero={{
        eyebrow: "WEBSITE TERMS",
        title: (
          <>
            Clear information.
            <br />
            <em>Responsible use.</em>
          </>
        ),
        description:
          "Read the preliminary terms and usage information for the Anmol Health Care Lab website.",
        imageSrc: "/images/about-lab-hero.jpg",
        imageAlt:
          "Blood sample collection tubes arranged in a laboratory rack",
        primaryHref: "#editorial-details-title",
        primaryLabel: "Read website terms",
        secondaryHref: "/contact",
        secondaryLabel: "Contact the laboratory",
      }}
      overview={{
        eyebrow: "USING THIS WEBSITE",
        title: (
          <>
            Helpful information.
            <em> Clear expectations.</em>
          </>
        ),
        description:
          "The website is intended to help visitors explore laboratory information and patient services. The laboratory must review and approve its final terms before public use.",
      }}
      details={{
        eyebrow: "PRELIMINARY WEBSITE TERMS",
        title: (
          <>
            Terms for using
            <em> this website.</em>
          </>
        ),
        description:
          "These sections outline important usage considerations. They are preliminary information and require review by the laboratory before being treated as binding terms.",
        sections: [
          {
            number: "01",
            title: "Website information",
            paragraphs: [
              "The website provides general information about laboratory services, published tests, packages and patient support.",
              "Service availability, prices, preparation requirements and reporting times may change. Confirm relevant details directly with the laboratory before arranging a visit.",
            ],
          },
          {
            number: "02",
            title: "Medical information",
            paragraphs: [
              "Website content is for general information and is not a substitute for professional medical advice, diagnosis or treatment.",
              "Test selection and interpretation of results should be discussed with a qualified healthcare professional.",
            ],
          },
          {
            number: "03",
            title: "Bookings and appointments",
            paragraphs: [
              "Submitting a booking request should not be treated as confirmation until the website or laboratory has explicitly confirmed the appointment.",
              "The laboratory must provide its final rules for cancellations, rescheduling, appointment availability and any applicable charges.",
            ],
          },
          {
            number: "04",
            title: "Patient reports and accounts",
            paragraphs: [
              "A patient or doctor must only access reports they are authorized to view. Account credentials and report access must not be shared with unauthorized people.",
              "Online report access should only be enabled after identity verification, role authorization and protected file delivery have been implemented and tested.",
            ],
          },
          {
            number: "05",
            title: "Website availability",
            paragraphs: [
              "Some website services may be unavailable during maintenance or while a feature is being prepared.",
              "Where an online feature is not available, contact the laboratory through its published contact channels for assistance.",
            ],
          },
          {
            number: "06",
            title: "Final terms and approval",
            paragraphs: [
              "The laboratory must approve its final terms, including its legal identity, applicable jurisdiction, liability provisions, cancellation rules and contact procedure.",
              "This preliminary page should not be treated as the laboratory's final legal agreement.",
            ],
          },
        ],
      }}
      notice="PRELIMINARY TERMS — This page requires review and approval by Anmol Health Care Lab before public release. Final legal terms, cancellation conditions, applicable jurisdiction and other client-specific provisions have not yet been confirmed."
      closing={{
        eyebrow: "NEED MORE INFORMATION?",
        title: (
          <>
            Speak with
            <em> the laboratory.</em>
          </>
        ),
        description:
          "For questions about laboratory services, website information or appointments, contact Anmol Health Care Lab.",
        actions: [
          {
            label: "Contact the laboratory",
            href: "/contact",
            variant: "primary",
          },
          {
            label: "Explore services",
            href: "/tests",
            variant: "secondary",
          },
        ],
      }}
    />
  );
}