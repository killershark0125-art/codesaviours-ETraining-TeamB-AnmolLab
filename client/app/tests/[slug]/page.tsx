
import type { Metadata } from "next";

import TestDetailClient from "@/components/tests/test-detail-client";

export const metadata: Metadata = {
  title: "Test Details | Anmol Health Care Lab",
  description:
    "View available test catalogue information and add a test to your booking.",
};

type TestDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TestDetailPage({
  params,
}: TestDetailPageProps) {
  const { slug } = await params;

  return <TestDetailClient slug={slug} />;
}

