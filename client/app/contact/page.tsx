import type { Metadata } from "next";

import ContactPageClient from "./contact-page";

export const metadata: Metadata = {
  title: "Contact Anmol Lab | Get in Touch",
  description:
    "Contact Anmol Health Care Lab in Faisalabad for test information, booking enquiries and laboratory directions.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}