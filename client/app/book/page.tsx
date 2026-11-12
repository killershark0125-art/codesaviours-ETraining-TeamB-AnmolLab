import type { Metadata } from "next";

import BookTestPageClient from "./book-test-page";

export const metadata: Metadata = {
  title: "Book a Test | Anmol Health Care Lab",
  description:
    "Choose laboratory tests and prepare a booking request with Anmol Health Care Lab in Faisalabad.",
};

export default function BookTestPage() {
  return <BookTestPageClient />;
}