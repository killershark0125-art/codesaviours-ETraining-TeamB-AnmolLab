
"use client";

import Link from "next/link";

import {
  removePackageFromCart,
  usePackageCart,
} from "@/lib/cart-store";

import { formatPrice } from "@/lib/format";

import styles from "./package-selection-panel.module.css";

export default function PackageSelectionPanel() {
  const packages = usePackageCart();

  if (packages.length === 0) return null;

  return (
    <section
      className={styles.panel}
      aria-labelledby="selected-packages-heading"
    >
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            YOUR EXISTING SELECTION
          </span>
          <h2 id="selected-packages-heading">
            Selected health packages
          </h2>
        </div>

        <Link href="/cart">Review cart →</Link>
      </div>

      <div className={styles.list}>
        {packages.map((healthPackage) => (
          <article className={styles.package} key={healthPackage.id}>
            <div className={styles.packageInfo}>
              <h3>{healthPackage.name}</h3>

              <p>
                {healthPackage.includedTests.length} included{" "}
                {healthPackage.includedTests.length === 1
                  ? "test"
                  : "tests"}
              </p>

              {healthPackage.includedTests.length > 0 && (
                <ul>
                  {healthPackage.includedTests.map((test) => (
                    <li key={test.id}>{test.name}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.packageActions}>
              <strong>
                {healthPackage.packagePrice === null
                  ? "Price pending"
                  : formatPrice(healthPackage.packagePrice)}
              </strong>

              <button
                type="button"
                onClick={() =>
                  removePackageFromCart(healthPackage.id)
                }
                aria-label={`Remove ${healthPackage.name}`}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
