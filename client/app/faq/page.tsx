import type { Metadata } from "next";

import EditorialPage from "@/components/public-pages/editorial-page";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Anmol Health Care Lab",
  description:
    "Find general information about laboratory tests, preparation, home sampling, payments and patient reports.",
};

const questions = [
  {
    question: "How can I find a particular laboratory test?",
    answer:
      "Visit the Tests page to search the published catalogue by test name or category. The catalogue may not represent every service currently available, so confirm availability directly with the laboratory.",
  },
  {
    question: "Do I need to fast before a test?",
    answer:
      "Preparation requirements depend on the individual test and your clinician's instructions. Do not assume that every blood test requires fasting. Check the instructions provided by your doctor and confirm the requirements with the laboratory before your visit.",
  },
  {
    question: "How long does it take to receive a report?",
    answer:
      "Report turnaround times vary by test and laboratory processing requirements. Contact the laboratory with the name of your test to confirm the expected reporting time.",
  },
  {
    question: "Can I request a home sample collection?",
    answer:
      "Visit the Home Sampling page for information about the collection service. Available areas, appointment times and any additional charges should be confirmed with the laboratory before placing a request.",
  },
  {
    question: "How do I book a laboratory test?",
    answer:
      "Use the Book a Test page to explore the booking process. The complete online booking experience depends on the availability of confirmed branches, appointment slots and patient booking services.",
  },
  {
    question: "Can I pay online?",
    answer:
      "Online payment is not part of the current project booking requirements. Confirm the accepted payment arrangements directly with the laboratory before your appointment.",
  },
  {
    question: "How can I download my laboratory report?",
    answer:
      "The secure online report service is being prepared. Until patient authentication and protected report access are connected, contact the laboratory for assistance with your report.",
  },
  {
    question: "Can I use the website to diagnose a medical condition?",
    answer:
      "No. The website provides general laboratory and service information, not a diagnosis or treatment plan. Discuss test selection and results with your qualified healthcare professional.",
  },
];

export default function FAQPage() {
  return (
    <EditorialPage
      hero={{
        eyebrow: "HELP & INFORMATION",
        title: (
          <>
            Good questions.
            <br />
            <em>Clearer answers.</em>
          </>
        ),
        description:
          "Find general information about laboratory tests, preparation, home sampling, booking and patient reports.",
        imageSrc: "/images/test-catalogue-hero.jpg",
        imageAlt:
          "Automated laboratory analyzer used for processing diagnostic samples",
        primaryHref: "#editorial-details-title",
        primaryLabel: "Explore common questions",
        secondaryHref: "/contact",
        secondaryLabel: "Ask the laboratory",
      }}
      overview={{
        eyebrow: "HOW CAN WE HELP?",
        title: (
          <>
            Start with the
            <em> information you need.</em>
          </>
        ),
        description:
          "Explore common questions before planning a laboratory visit. For test-specific instructions or confirmation of services, contact the laboratory directly.",
      }}
      details={{
        eyebrow: "PATIENT INFORMATION",
        title: (
          <>
            Frequently asked
            <em> questions.</em>
          </>
        ),
        description:
          "Select a question to read its answer. Information about specific tests and services should always be confirmed with the laboratory.",
        faqs: questions,
      }}
      closing={{
        eyebrow: "STILL HAVE A QUESTION?",
        title: (
          <>
            Let's find the
            <em> right information.</em>
          </>
        ),
        description:
          "Contact Anmol Health Care Lab for assistance with test availability, preparation instructions or patient services.",
        actions: [
          {
            label: "Contact the laboratory",
            href: "/contact",
            variant: "primary",
          },
          {
            label: "Browse tests",
            href: "/tests",
            variant: "secondary",
          },
        ],
      }}
    />
  );
}