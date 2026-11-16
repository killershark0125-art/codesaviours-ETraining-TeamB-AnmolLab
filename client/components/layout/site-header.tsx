
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

import { useCart } from "@/lib/cart-store";

import styles from "./site-header.module.css";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Tests", href: "/tests" },
  { label: "AI Assistant", href: "/assistant" },
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
  const cart = useCart();

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
  const isCartPage = isActive("/cart");
  const isAccessPage = isActive("/access");

  const cartCount = cart.length;
  const cartLabel =
    cartCount === 1 ? "1 selected test" : `${cartCount} selected tests`;

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
            href="/cart"
            className={`${styles.utilityAction} ${
              isCartPage ? styles.utilityActionActive : ""
            }`}
            aria-current={isCartPage ? "page" : undefined}
            aria-label={`Shopping cart, ${cartLabel}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 8H6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1.2" fill="currentColor" />
              <circle cx="18" cy="20" r="1.2" fill="currentColor" />
            </svg>

            <span>Cart</span>

            {cartCount > 0 && (
              <span className={styles.cartBadge} aria-hidden="true">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/access"
            className={`${styles.utilityAction} ${
              isAccessPage ? styles.utilityActionActive : ""
            }`}
            aria-current={isAccessPage ? "page" : undefined}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="8"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M5 20c0-3.4 2.9-5.5 7-5.5s7 2.1 7 5.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

            <span>Sign in</span>
          </Link>

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

            <div className={styles.mobileUtilityActions}>
              <Link
                href="/cart"
                className={styles.mobileUtilityLink}
                onClick={closeMenu}
                aria-current={isCartPage ? "page" : undefined}
              >
                <span>
                  Cart
                  {cartCount > 0 && (
                    <span className={styles.mobileCartCount}>
                      {cartCount}
                    </span>
                  )}
                </span>
                <span aria-hidden="true">↗</span>
              </Link>

              <Link
                href="/access"
                className={styles.mobileUtilityLink}
                onClick={closeMenu}
                aria-current={isAccessPage ? "page" : undefined}
              >
                Sign in
                <span aria-hidden="true">↗</span>
              </Link>
            </div>

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
