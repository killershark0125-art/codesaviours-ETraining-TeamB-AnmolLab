
import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import AiAssistant from "@/components/ai/ai-assistant";

import styles from "./assistant-page.module.css";

export const metadata: Metadata = {
  title: "Anmol Assistant | Anmol Health Care Lab",
  description:
    "Search the Anmol Health Care Lab test catalogue and review available laboratory tests.",
};

export default function AssistantPage() {
  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.ambient} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Anmol Assistant</span>
          </div>

          <header className={styles.heading}>
            <div>
              <span className={styles.eyebrow}>
                PATIENT SUPPORT / DIGITAL GUIDE
              </span>

              <h1>
                A clearer way to
                <br />
                <em>find your tests.</em>
              </h1>

              <p>
                Explore the laboratory catalogue, review published test
                information and move your selected tests into your cart.
              </p>
            </div>

            <Link href="/assistant/prescription" className={styles.headingLink}>
              <span>Have a prescription?</span>
              <strong>Review a test slip ↗</strong>
            </Link>
          </header>

          <AiAssistant />

          <div className={styles.bottomNote}>
            <span>ANMOL HEALTH CARE LAB</span>
            <p>
              This assistant does not give medical advice. Test selection
              should be guided by your treating doctor.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
