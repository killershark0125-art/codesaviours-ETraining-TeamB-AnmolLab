
import SiteHeader from "@/components/layout/site-header";
import CellularBackground from "@/components/home/cellular-background";
import TestFinder from "@/components/home/test-finder";
import BrandInfoTicker from "@/components/home/brand-info-ticker";
import BranchDirectory from "@/components/home/branch-directory";
import PackageDirectory from "@/components/packages/package-directory";
import AboutLab from "@/components/home/about-lab";
import PatientGuide from "@/components/home/patient-guide";
import HomeSampling from "@/components/home/home-sampling";
import PatientReports from "@/components/home/patient-reports";
import GetInTouch from "@/components/home/get-in-touch";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const whatsappUrl = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}`
    : null;

  return (
    <>
      <SiteHeader />

      <main>
        {/* FULL-SCREEN EDITORIAL HERO */}
        <section
          id="home"
          className="cinema-hero"
          aria-labelledby="cinema-hero-title"
        >
          <CellularBackground />

          <div className="cinema-hero-shade" aria-hidden="true" />

          <div className="container cinema-hero-inner">
            <div className="cinema-hero-copy">
              <div className="cinema-hero-brand" role="group" aria-label="Anmol Health Care Lab">
                <span className="cinema-hero-brand-name">ANMOL</span>
                <span className="cinema-hero-brand-subtitle">HEALTH CARE LAB</span>
              </div>

              <h1 id="cinema-hero-title" className="cinema-hero-title">
                Detailed diagnostics.
              </h1>

              <p className="cinema-hero-subtitle">
                A clearer view of your health.
              </p>
            </div>

            <div className="cinema-hero-bottom">
              <div className="cinema-hero-actions">
                <a href="#tests" className="hero-action-primary">
                  Book a Test
                </a>

                <a href="#reports" className="hero-action-secondary">
                  Download Report
                </a>
              </div>

              <a href="#about" className="cinema-hero-explore">
                Explore the lab
              </a>
            </div>            
          </div>
        </section>

        <BrandInfoTicker />

        {/* TEST SEARCH — SEPARATE FROM HERO */}
        <section id="tests" className="catalogue-search-section">
          <div className="container catalogue-search-layout">

            <div className="catalogue-search-intro">
              <span className="section-number">
                01 / TEST CATALOGUE
              </span>

<h2 className="catalogue-search-title">
  Find a test.
</h2>

<p>
  Search for a test by its name.
</p>
            </div>

            <div className="catalogue-search">
              <TestFinder />
            </div>
          </div>
        </section>

        {/* ABOUT */}
<AboutLab />

        {/* HOW IT WORKS */}
<PatientGuide />

        {/* PACKAGES */}
<PackageDirectory variant="preview" />

        {/* HOME SAMPLING */}

<HomeSampling />

        {/* BRANCHES */}
        <BranchDirectory />

        {/* REPORTS */}
<PatientReports />

        {/* CONTACT */}
      <GetInTouch />
      </main>

      {/* Only enabled once the laboratory confirms its WhatsApp number */}
      {whatsappUrl && (
        <a
          href={whatsappUrl}
          className="whatsapp-quick-action"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Anmol Lab on WhatsApp"
        >
          WhatsApp <span aria-hidden="true">↗</span>
        </a>
      )}

<SiteFooter />
    </>
  );
}
