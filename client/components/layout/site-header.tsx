"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

const navigation = [
  { label: "About", href: "/#about" },
  { label: "Tests", href: "/#tests" },
  { label: "Packages", href: "/#packages" },
  { label: "Home Sampling", href: "/#home-sampling" },
  { label: "Branches", href: "/#branches" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  const whatsappUrl = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}`
    : null;

  return (
    <header className="glass-site-header">
      <div className="container glass-nav-inner">
        <Link
          href="/"
          className="brand-lockup"
          aria-label="Anmol Health Care Lab homepage"
          onClick={closeMenu}
        >
          <Image
            src="/brand/anmol-lab-logo.png"
            alt="Anmol Health Care Lab"
            width={210}
            height={70}
            priority
            className="brand-logo-image"
          />
        </Link>

        <nav className="glass-nav-links" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="glass-nav-actions">
          {/* Point these at /book once that route exists */}
          <Link href="/#tests" className="nav-book-button">
            Book a Test
          </Link>
          <Link href="/reports" className="nav-report-button">
            Download Report
          </Link>
        </div>

        <button
          type="button"
          className="glass-nav-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className={menuOpen ? "menu-line menu-line-open" : "menu-line"} />
          <span className={menuOpen ? "menu-line menu-line-open" : "menu-line"} />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="glass-mobile-panel">
          <nav className="container glass-mobile-links" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}

            <div className="glass-mobile-actions">
              <Link href="/#tests" className="nav-book-button" onClick={closeMenu}>
                Book a Test
              </Link>
              <Link href="/reports" className="nav-report-button" onClick={closeMenu}>
                Download Report
              </Link>
            </div>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Contact on WhatsApp
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}