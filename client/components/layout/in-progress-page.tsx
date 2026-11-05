import Link from "next/link";
import type { ReactNode } from "react";

type InProgressPageProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
};

export default function InProgressPage({
  eyebrow = "ANMOL HEALTH CARE LAB",
  title = "This page is being prepared.",
  description = "This section is not available yet. Please contact the laboratory directly for assistance.",
  backHref = "/",
  backLabel = "Return to homepage",
  className,
  children,
}: InProgressPageProps) {
  return (
    <main
      className={
        className ??
        "flex min-h-[65vh] items-center justify-center px-6 py-24"
      }
    >
      <section className="w-full max-w-2xl text-center">
        <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-[#7D7E80]">
          {eyebrow}
        </p>

        <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight text-[#22285C] sm:text-5xl">
          {title}
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#7D7E80] sm:text-base">
          {description}
        </p>

        {children}

        <Link
          href={backHref}
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#22285C] px-6 text-sm font-semibold text-white transition hover:bg-[#303875] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22285C]"
        >
          {backLabel}
        </Link>
      </section>
    </main>
  );
}