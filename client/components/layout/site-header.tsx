"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

import styles from "./site-header.module.css";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Tests", href: "/tests" },
  { label: "Packages", href: "/packages" },
  { label: "Home Sampling", href: "/home-sampling" },
  { label: "Branches", href: "/branches" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <Suspense fallback={null}>
      <SiteHeaderContent />
    </Suspense>
  );
}

function SiteHeaderContent() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const isBookingPage = isActive("/book");
  const isReportsPage = isActive("/reports");

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

        <nav
          className="glass-nav-links"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href)
                  ? styles.activeLink
                  : undefined
              }
              aria-current={
                isActive(item.href) ? "page" : undefined
              }
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="glass-nav-actions">
          <Link
            href="/book"
            className={`nav-book-button ${
              isBookingPage ? styles.activeAction : ""
            }`}
            aria-current={isBookingPage ? "page" : undefined}
          >
            Book a Test
          </Link>

          <Link
            href="/reports"
            className={`nav-report-button ${
              isReportsPage ? styles.activeAction : ""
            }`}
            aria-current={isReportsPage ? "page" : undefined}
          >
            Download Report
          </Link>
        </div>

        <button
          type="button"
          className="glass-nav-toggle"
          aria-label={
            menuOpen ? "Close navigation" : "Open navigation"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span
            className={
              menuOpen
                ? "menu-line menu-line-open"
                : "menu-line"
            }
          />

          <span
            className={
              menuOpen
                ? "menu-line menu-line-open"
                : "menu-line"
            }
          />
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="glass-mobile-panel"
        >
          <nav
            className="container glass-mobile-links"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive(item.href)
                    ? styles.activeMobileLink
                    : undefined
                }
                aria-current={
                  isActive(item.href) ? "page" : undefined
                }
                onClick={closeMenu}
              >
                {item.label}

                <span aria-hidden="true">↗</span>
              </Link>
            ))}

            <div className="glass-mobile-actions">
              <Link
                href="/book"
                className="nav-book-button"
                onClick={closeMenu}
              >
                Book a Test
              </Link>

              <Link
                href="/reports"
                className="nav-report-button"
                onClick={closeMenu}
              >
                Download Report
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}