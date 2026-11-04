
import SiteHeader from "@/components/layout/site-header";
import CellularBackground from "@/components/home/cellular-background";
import TestFinder from "@/components/home/test-finder";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const whatsappUrl = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}`
    : null;

  return (
    <>
      <SiteHeader />

      <main>
        {/* HERO — FULL-WIDTH CELLS BACKGROUND */}
        <section id="home" className="cinema-hero">

          <CellularBackground />

          <div className="cinema-hero-shade" />

          <div className="container cinema-hero-inner">
            <div className="cinema-hero-copy">

              <div className="cinema-hero-kicker">
                <span />
                ANMOL HEALTH CARE LAB
                <span className="kicker-divider">/</span>
                FAISALABAD
              </div>

              <h1 className="cinema-hero-title">
                Detailed
                <br />
                diagnostics.
                <br />
                <em>A clearer view of your health.</em>
              </h1>

              <p className="cinema-hero-description">
                Precision in every test. Care in every patient.
                Explore diagnostic information and connect with
                Anmol Health Care Lab.
              </p>

              <div className="cinema-hero-actions">
                <a href="#tests" className="hero-action-primary">
                  Book a Test
                  <span aria-hidden="true">↗</span>
                </a>

                <a href="#reports" className="hero-action-secondary">
                  Download Report
                </a>
              </div>
            </div>

            <div className="cinema-hero-meta">
              <span>01 — DIAGNOSTIC INFORMATION</span>
              <span>PRECISION / CARE / SCIENCE</span>
              <a href="#tests">
                EXPLORE THE LAB ↓
              </a>
            </div>
          </div>
        </section>

        {/* TEST SEARCH — SEPARATE FROM HERO */}
        <section id="tests" className="catalogue-search-section">
          <div className="container catalogue-search-layout">

            <div className="catalogue-search-intro">
              <span className="section-number">
                01 / TEST CATALOGUE
              </span>

              <h2 className="catalogue-search-title">
                Find what
                <br />
                you're looking for.
              </h2>

              <p>
                Search diagnostic tests by name, short code
                or category.
              </p>
            </div>

            <div className="catalogue-search">
              <TestFinder />
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="editorial-section">
          <div className="container section-intro">
            <div>
              <span className="section-number">
                02 / ABOUT THE LAB
              </span>
            </div>

            <div>
              <h2 className="section-heading">
                Clarity is part of <em>care.</em>
              </h2>

              <p className="section-copy">
                Anmol Health Care Lab is based in Faisalabad,
                Pakistan. This website brings laboratory information,
                diagnostic test discovery and patient resources
                together in one place.
              </p>

              <p className="section-copy">
                Explore the information currently available and
                contact the laboratory directly to confirm
                test availability and service arrangements.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="process-section">
          <div className="container">
            <span className="section-number">
              03 / PATIENT GUIDE
            </span>

            <h2 className="process-heading">
              A straightforward place to begin.
            </h2>

            <div className="process-list">
              <article className="process-item">
                <span className="process-number">01</span>
                <h3>Find your test</h3>
                <p>
                  Explore available tests and their verified
                  laboratory information.
                </p>
              </article>

              <article className="process-item">
                <span className="process-number">02</span>
                <h3>Confirm the details</h3>
                <p>
                  Contact the laboratory to confirm availability,
                  preparation instructions and pricing.
                </p>
              </article>

              <article className="process-item">
                <span className="process-number">03</span>
                <h3>Connect with the lab</h3>
                <p>
                  Discuss the next steps and service arrangements
                  directly with the laboratory.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section id="packages" className="packages-section container">
          <div>
            <span className="section-number">
              04 / HEALTH PACKAGES
            </span>
          </div>

          <div className="packages-copy">
            <h2 className="section-heading">
              A considered approach to
              <em> preventive health.</em>
            </h2>

            <div className="packages-note">
              The laboratory's official package names, included
              tests and prices are awaiting confirmation.
              Verified information will be published here.
            </div>
          </div>
        </section>

        {/* HOME SAMPLING */}
        <section
          id="home-sampling"
          className="home-sampling-section"
        >
          <div className="container section-intro">
            <div>
              <span className="section-number">
                05 / HOME SAMPLING
              </span>
            </div>

            <div>
              <h2 className="section-heading">
                Laboratory information,
                <em> made accessible.</em>
              </h2>

              <p className="section-copy">
                Home sample collection availability, coverage
                areas and additional charges are awaiting
                confirmation from the laboratory.
              </p>
            </div>
          </div>
        </section>

        {/* BRANCHES */}
        <section id="branches" className="branches-section">
          <div className="container branches-layout">
            <div>
              <span className="section-number">
                06 / OUR LOCATION
              </span>

              <h2 className="section-heading">
                Find your way to <em>Anmol Lab.</em>
              </h2>
            </div>

            <div className="branch-information">
              <span>CLIENT-PROVIDED ADDRESS</span>

              <h3>{siteConfig.address}</h3>

              <p>
                The official map pin, operating hours and
                additional branch details are awaiting
                confirmation.
              </p>

              <a
                href={siteConfig.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Search this address on Maps ↗
              </a>
            </div>
          </div>
        </section>

        {/* REPORTS */}
        <section id="reports" className="report-section">
          <div className="container report-layout">
            <div>
              <span className="eyebrow">
                07 / PATIENT REPORTS
              </span>

              <h2 className="report-title">
                Your reports.
                <br />
                Your information.
              </h2>

              <p className="report-description">
                Online report access and verification are part
                of the planned patient experience.
              </p>
            </div>

            <div className="report-side-note">
              The online report download workflow is not
              available yet. Please contact the laboratory
              directly for information about obtaining reports.
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section container">
          <div>
            <span className="section-number">
              08 / GET IN TOUCH
            </span>

            <h2 className="section-heading">
              Start a conversation with <em>Anmol Lab.</em>
            </h2>
          </div>

          <div className="contact-details">
            <div className="contact-detail">
              <span>Telephone</span>

              {siteConfig.phones.map((phone) => (
                <a href={phone.href} key={phone.href}>
                  {phone.display}
                </a>
              ))}
            </div>

            <div className="contact-detail">
              <span>Email</span>

              <a href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>

            <div className="contact-detail">
              <span>Address</span>

              <strong>{siteConfig.address}</strong>
            </div>

            <div className="contact-detail">
              <span>Laboratory directions</span>

              <a
                href={siteConfig.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find the location ↗
              </a>
            </div>
          </div>
        </section>
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

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-brand">
            ANMOL HEALTH CARE LAB
          </span>

          <span className="footer-muted">
            {siteConfig.tagline}
          </span>

          <span className="footer-muted">
            © 2026 Anmol Lab
          </span>
        </div>
      </footer>
    </>
  );
}
