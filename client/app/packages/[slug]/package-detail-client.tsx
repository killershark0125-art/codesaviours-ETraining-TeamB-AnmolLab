
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getHealthPackages } from "@/lib/api/packages";
import { formatPrice } from "@/lib/format";
import type { HealthPackage } from "@/lib/types";

type PackageDetailClientProps = {
  slug: string;
};

type SettledRequest = {
  key: string;
  packageData: HealthPackage | null;
  error: string | null;
};

export default function PackageDetailClient({
  slug,
}: PackageDetailClientProps) {
  const [settled, setSettled] = useState<SettledRequest | null>(null);
  const [attempt, setAttempt] = useState(0);

  const requestKey = `${attempt}:${slug}`;

  useEffect(() => {
    const controller = new AbortController();

    getHealthPackages(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;

        const packageData =
          result.items.find((item) => item.slug === slug) ?? null;

        setSettled({
          key: requestKey,
          packageData,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setSettled({
          key: requestKey,
          packageData: null,
          error:
            error instanceof Error
              ? error.message
              : "The package information could not be loaded.",
        });
      });

    return () => controller.abort();
  }, [requestKey, slug]);

  // The current request is loading until a matching response arrives.
  const isLoading = settled?.key !== requestKey;

  const packageData = isLoading ? null : settled?.packageData ?? null;
  const errorMessage = isLoading ? null : settled?.error ?? null;

  function retry() {
    setAttempt((current) => current + 1);
  }

  return (
    <main className="min-h-screen bg-[#0c1020] text-[#f1f4fa]">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_80%_10%,rgba(64,112,112,0.18),transparent_42%),linear-gradient(145deg,#10172a,#0c1020)] px-[5.5%] pb-16 pt-32">
        <div className="relative mx-auto max-w-7xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-3 text-xs text-slate-400"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link
              href="/packages"
              className="transition hover:text-white"
            >
              Health packages
            </Link>

            <span aria-hidden="true">/</span>

            <span className="text-slate-300">Package details</span>
          </nav>

          <span className="text-[10px] font-bold tracking-[0.18em] text-[#91bdb4]">
            ANMOL HEALTH CARE LAB / HEALTH PACKAGES
          </span>

          {isLoading ? (
            <div className="mt-7 max-w-2xl" role="status">
              <div className="mb-4 h-3 w-36 animate-pulse rounded bg-white/10" />
              <div className="mb-3 h-12 w-3/4 animate-pulse rounded bg-white/10" />
              <div className="h-4 w-full animate-pulse rounded bg-white/10" />
              <p className="mt-5 text-sm text-slate-400">
                Loading package information...
              </p>
            </div>
          ) : errorMessage ? (
            <div className="mt-8 max-w-xl" role="alert">
              <h1 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl">
                Package information is unavailable.
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={retry}
                className="mt-7 rounded-xl border border-[#91bdb4]/40 bg-[#497f78]/20 px-5 py-3 text-sm font-semibold text-[#c8e5dc] transition hover:bg-[#497f78]/35"
              >
                Try again
              </button>
            </div>
          ) : !packageData ? (
            <div className="mt-8 max-w-xl">
              <span className="text-[10px] font-bold tracking-[0.16em] text-[#91bdb4]">
                PACKAGE NOT FOUND
              </span>

              <h1 className="mt-4 font-serif text-4xl font-normal tracking-tight sm:text-5xl">
                This package is not available.
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                The requested package could not be found in the published
                laboratory catalogue.
              </p>

              <Link
                href="/packages"
                className="mt-7 inline-flex rounded-xl border border-[#91bdb4]/40 bg-[#497f78]/20 px-5 py-3 text-sm font-semibold text-[#c8e5dc] transition hover:bg-[#497f78]/35"
              >
                Browse available packages
              </Link>
            </div>
          ) : (
            <div className="mt-7 max-w-3xl">
              <h1 className="font-serif text-5xl font-normal leading-[1.03] tracking-[-0.045em] sm:text-7xl">
                {packageData.name}
              </h1>

              {packageData.description && (
                <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-300">
                  {packageData.description}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/book"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#91bdb4]/40 bg-[#497f78]/25 px-6 text-sm font-semibold text-[#d5eee5] transition hover:bg-[#497f78]/40"
                >
                  Continue to booking
                  <span className="ml-3" aria-hidden="true">
                    ↗
                  </span>
                </Link>

                <Link
                  href="/packages"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-6 text-sm font-medium text-slate-300 transition hover:bg-white/5"
                >
                  All packages
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {packageData && !isLoading && !errorMessage && (
        <section className="px-[5.5%] py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.7fr)]">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.17em] text-[#91bdb4]">
                    PACKAGE CONTENTS
                  </span>

                  <h2 className="mt-2 font-serif text-3xl font-normal text-slate-100">
                    Included tests
                  </h2>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300">
                  {packageData.includedTests.length}{" "}
                  {packageData.includedTests.length === 1 ? "test" : "tests"}
                </span>
              </div>

              {packageData.includedTests.length > 0 ? (
                <ul className="mt-3 divide-y divide-white/[0.08]">
                  {packageData.includedTests.map((test, index) => (
                    <li
                      key={test.id}
                      className="flex items-center justify-between gap-4 py-5"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="text-xs tabular-nums text-slate-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-slate-100">
                            {test.name}
                          </h3>

                          <span className="mt-1 block text-[10px] text-slate-500">
                            {test.priceStatus === "confirmed" &&
                            test.price !== null
                              ? "Published catalogue price"
                              : "Price pending confirmation"}
                          </span>
                        </div>
                      </div>

                      <span className="shrink-0 text-xs text-slate-300">
                        {test.priceStatus === "confirmed" &&
                        test.price !== null
                          ? formatPrice(test.price)
                          : "Not confirmed"}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-8 text-sm leading-7 text-slate-400">
                  Included test details have not been published for this
                  package yet. Please contact Anmol Lab for confirmation.
                </p>
              )}
            </div>

            <aside className="h-fit rounded-3xl border border-white/10 bg-[linear-gradient(145deg,rgba(31,39,66,0.78),rgba(15,20,36,0.92))] p-6 sm:p-7">
              <span className="text-[10px] font-bold tracking-[0.17em] text-[#91bdb4]">
                PACKAGE PRICING
              </span>

              <h2 className="mt-3 font-serif text-3xl font-normal text-slate-100">
                Package overview
              </h2>

              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="text-xs text-slate-400">
                    Regular total
                  </span>

                  <strong className="text-sm font-medium text-slate-200">
                    {packageData.originalPrice !== null
                      ? formatPrice(packageData.originalPrice)
                      : "Unavailable"}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="text-xs text-slate-400">
                    Package price
                  </span>

                  <strong className="text-sm font-semibold text-[#c8e5dc]">
                    {packageData.packagePrice !== null
                      ? formatPrice(packageData.packagePrice)
                      : "Price unavailable"}
                  </strong>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-400">
                    Published discount
                  </span>

                  <strong className="text-sm font-medium text-slate-200">
                    {packageData.discountPercentage > 0
                      ? `${packageData.discountPercentage}%`
                      : "—"}
                  </strong>
                </div>
              </div>

              {packageData.savings !== null && packageData.savings > 0 && (
                <div className="mt-7 rounded-xl border border-[#91bdb4]/20 bg-[#497f78]/10 px-4 py-3">
                  <span className="text-[10px] font-bold tracking-[0.13em] text-[#91bdb4]">
                    PACKAGE SAVINGS
                  </span>

                  <strong className="mt-1 block text-lg font-semibold text-[#d2eae1]">
                    {formatPrice(packageData.savings)}
                  </strong>
                </div>
              )}

              <p className="mt-7 text-[11px] leading-7 text-slate-400">
                Prices are displayed according to the published laboratory
                catalogue. Confirm package availability and details with
                Anmol Lab before booking.
              </p>

              <Link
                href="/book"
                className="mt-6 flex min-h-12 items-center justify-center rounded-xl border border-[#91bdb4]/40 bg-[#497f78]/25 px-4 text-sm font-semibold text-[#d5eee5] transition hover:bg-[#497f78]/40"
              >
                Continue to booking
              </Link>

              <Link
                href="/contact"
                className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-white/10 px-4 text-xs font-medium text-slate-300 transition hover:bg-white/5"
              >
                Ask the laboratory
              </Link>
            </aside>
          </div>

          <div className="mx-auto mt-7 max-w-7xl border-t border-white/10 pt-5">
            <p className="text-[10px] leading-6 text-slate-500">
              Package information is provided for general reference and is
              not medical advice. Discuss test selection with your treating
              healthcare professional.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
