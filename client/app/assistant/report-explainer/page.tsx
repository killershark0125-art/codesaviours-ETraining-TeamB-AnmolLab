
import type { Metadata } from "next";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import ReportExplainer from "@/components/ai/report-explainer";

export const metadata: Metadata = {
  title: "Report Explainer | Anmol Health Care Lab",
  description:
    "Understand laboratory report terminology and reference ranges with the Anmol Health Care Lab report explanation service.",
};

export default function ReportExplainerPage() {
  return (
    <>
      <SiteHeader />
      <ReportExplainer />
      <SiteFooter />
    </>
  );
}
