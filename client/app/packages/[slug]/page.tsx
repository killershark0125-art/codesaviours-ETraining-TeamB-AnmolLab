import type { Metadata } from "next";

import PackageDetailClient from "./package-detail-client";

export const metadata: Metadata = {
  title: "Health Package Details | Anmol Health Care Lab",
  description:
    "Explore included laboratory tests and pricing information for health packages at Anmol Health Care Lab.",
};

type PackagePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PackageDetailsPage({
  params,
}: PackagePageProps) {
  const { slug } = await params;

  return <PackageDetailClient slug={slug} />;
}