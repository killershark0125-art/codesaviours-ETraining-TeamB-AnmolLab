"use client";

import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";

import styles from "./patient-workspace.module.css";

export type PatientResource =
  | "overview"
  | "bookings"
  | "reports"
  | "family"
  | "profile";

const navigation = [
  { label: "Overview", href: "/portal", resource: "overview" },
  { label: "My bookings", href: "/portal/bookings", resource: "bookings" },
  { label: "My reports", href: "/portal/reports", resource: "reports" },
  { label: "Family members", href: "/portal/family", resource: "family" },
  { label: "My profile", href: "/portal/profile", resource: "profile" },
] as const;

const content: Record<
  Exclude<PatientResource, "overview">,
  { eyebrow: string; title: string; description: string }
> = {
  bookings: {
    eyebrow: "PATIENT SERVICES / MY BOOKINGS",
    title: "Your appointments.",
    description:
      "Review your laboratory booking requests, collection arrangements and appointment information.",
  },
  reports: {
    eyebrow: "PATIENT SERVICES / MY REPORTS",
    title: "Your results.",
    description:
      "Access your laboratory report information through the authorized patient report service.",
  },
  family: {
    eyebrow: "PATIENT SERVICES / FAMILY",
    title: "Care for your family.",
    description:
      "Manage the family-member information associated with your patient account.",
  },
  profile: {
    eyebrow: "ACCOUNT / PERSONAL INFORMATION",
    title: "Your patient profile.",
    description:
      "Review your registered contact information and account details.",
  },
};

const overviewActions = [
  {
    number: "01",
    title: "Book a test",
    description: "Explore the catalogue and prepare a booking request.",
    href: "/book",
  },
  {
    number: "02",
    title: "View bookings",
    description: "Access your appointment information.",
    href: "/portal/bookings",
  },
  {
    number: "03",
    title: "Patient reports",
    description: "Find information about accessing your results.",
    href: "/portal/reports",
  },
  {
    number: "04",
    title: "Family members",
    description: "Manage family information associated with your account.",
    href: "/portal/family",
  },
];

export default function PatientWorkspace({
  resource,
}: {
  resource: PatientResource;
}) {
  const current =
    resource === "overview"
      ? {
          eyebrow: "PATIENT PORTAL / PERSONAL WORKSPACE",
          title: "Your healthcare, in one place.",
          description:
            "A personal space for your laboratory bookings, reports and patient information.",
        }
      : content[resource];

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.topline}>
            <span>{siteConfig.name}</span>
            <span>PATIENT PORTAL / PERSONAL ACCESS</span>
          </div>

          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{current.eyebrow}</span>

              <h1>
                {resource === "overview" ? (
                  <>
                    Your healthcare,
                    <br />
                    in <em>one place.</em>
                  </>
                ) : (
                  current.title
                )}
              </h1>

              <p>{current.description}</p>

              {resource === "overview" && (
                <div className={styles.heroActions}>
                  <Link href="/book" className={styles.primaryAction}>
                    Book a test
                    <span aria-hidden="true">↗</span>
                  </Link>

                  <Link
                    href="/tests"
                    className={styles.secondaryAction}
                  >
                    Explore test catalogue
                  </Link>
                </div>
              )}
            </div>

            <aside className={styles.heroCard}>
              <span className={styles.heroCardLabel}>PATIENT WORKSPACE</span>
              <strong>
                {resource === "overview"
                  ? "01 / OVERVIEW"
                  : navigation.find((item) => item.resource === resource)
                      ?.label.toUpperCase()}
              </strong>
              <span className={styles.heroCardRule} />
              <p>
                Your personal information and records will be loaded
                from your authenticated patient account.
              </p>
            </aside>
          </header>

          <div className={styles.previewNotice} role="status">
            <span className={styles.noticeMark}>i</span>

            <div>
              <strong>Patient portal frontend preview</strong>
              <p>
                Patient authentication and live account data are not
                connected yet. No real bookings, reports or personal
                records are displayed. Do not enter confidential
                information into this preview.
              </p>
            </div>
          </div>

          <div className={styles.workspace}>
            <aside className={styles.sidebar}>
              <span className={styles.sidebarLabel}>MY ACCOUNT</span>

              <nav aria-label="Patient portal navigation">
                {navigation.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={
                      item.resource === resource
                        ? styles.activeLink
                        : styles.navLink
                    }
                    aria-current={
                      item.resource === resource ? "page" : undefined
                    }
                  >
                    {item.label}

                    {item.resource === resource && (
                      <span aria-hidden="true">●</span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className={styles.sidebarBottom}>
                <Link href="/">
                  <span aria-hidden="true">←</span>
                  Return to website
                </Link>

                <a href={`mailto:${siteConfig.email}`}>
                  Need assistance?
                </a>
              </div>
            </aside>

            <div className={styles.mainContent}>
              {resource === "overview" && <OverviewContent />}

              {resource === "bookings" && <BookingsContent />}

              {resource === "reports" && <ReportsContent />}

              {resource === "family" && <FamilyContent />}

              {resource === "profile" && <ProfileContent />}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <span className={styles.sectionEyebrow}>{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <span className={styles.apiStatus}>AWAITING ACCOUNT DATA</span>
    </div>
  );
}

function EmptyState({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className={styles.emptyState}>
      <span className={styles.emptyIcon} aria-hidden="true">
        ◇
      </span>

      <h3>{title}</h3>

      <p>{description}</p>

      {href && action && (
        <Link href={href} className={styles.textAction}>
          {action}
          <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );
}

function OverviewContent() {
  return (
    <>
      <SectionHeading
        eyebrow="01 / ACCOUNT OVERVIEW"
        title="Your workspace."
        description="Quick access to the main services available through the patient portal."
      />

      <div className={styles.summaryGrid}>
        {[
          { label: "MY BOOKINGS", detail: "Appointments" },
          { label: "MY REPORTS", detail: "Laboratory results" },
          { label: "FAMILY MEMBERS", detail: "Associated profiles" },
        ].map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span>{item.label}</span>
            <strong>—</strong>
            <small>{item.detail} · Not loaded</small>
          </article>
        ))}
      </div>

      <section className={styles.quickSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              02 / PATIENT SERVICES
            </span>
            <h2>Quick access.</h2>
          </div>
        </div>

        <div className={styles.quickGrid}>
          {overviewActions.map((item) => (
            <Link
              href={item.href}
              className={styles.quickCard}
              key={item.href}
            >
              <span>{item.number}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.activitySection}>
        <SectionHeading
          eyebrow="03 / RECENT ACTIVITY"
          title="Your latest updates."
        />

        <EmptyState
          title="Your account activity will appear here."
          description="Booking confirmations, report availability and important patient-account updates will be retrieved from your account when authentication and the patient API are connected."
          href="/book"
          action="Start a booking request"
        />
      </section>
    </>
  );
}

function BookingsContent() {
  return (
    <>
      <SectionHeading
        eyebrow="01 / APPOINTMENT HISTORY"
        title="My bookings."
        description="Review your booking requests and laboratory appointment information."
      />

      <div className={styles.summaryGrid}>
        {["UPCOMING", "IN PROGRESS", "COMPLETED"].map((label) => (
          <article className={styles.summaryCard} key={label}>
            <span>{label}</span>
            <strong>—</strong>
            <small>Awaiting booking records</small>
          </article>
        ))}
      </div>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              02 / BOOKING HISTORY
            </span>
            <h2>All appointments.</h2>
          </div>
          <span className={styles.apiStatus}>NOT CONNECTED</span>
        </div>

        <EmptyState
          title="Your booking history is not available yet."
          description="Your confirmed laboratory appointments, test selections, collection details and booking status will appear here after secure patient account integration."
          href="/book"
          action="Prepare a booking request"
        />
      </section>

      <div className={styles.informationCard}>
        <span className={styles.sectionEyebrow}>BOOKING ASSISTANCE</span>
        <h3>Need to arrange a laboratory visit?</h3>
        <p>
          Explore the catalogue and contact the laboratory to confirm
          your requested tests and collection arrangements.
        </p>
        <Link href="/book" className={styles.textAction}>
          Go to booking
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </>
  );
}

function ReportsContent() {
  return (
    <>
      <SectionHeading
        eyebrow="01 / PERSONAL HEALTH DOCUMENTS"
        title="My reports."
        description="Access laboratory result documents associated with your verified patient account."
      />

      <div className={styles.securityCard}>
        <span className={styles.securityIcon} aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none">
            <path
              d="M18 3.5L29 8V16C29 23.2 24.4 29.2 18 32C11.6 29.2 7 23.2 7 16V8L18 3.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <path
              d="M13 17.5L16.5 21L23.5 13.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div>
          <span className={styles.sectionEyebrow}>
            SECURE REPORT ACCESS
          </span>
          <h3>Your health information deserves protection.</h3>
          <p>
            Report retrieval must verify your authenticated identity
            and ownership of each document. A report must never be
            available through a publicly accessible file URL.
          </p>
        </div>
      </div>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              02 / AVAILABLE DOCUMENTS
            </span>
            <h2>Report library.</h2>
          </div>

          <span className={styles.apiStatus}>NOT CONNECTED</span>
        </div>

        <EmptyState
          title="Your laboratory reports will appear here."
          description="Once secure report services are connected, authorized documents will be listed with their associated booking reference, report date and verified download action."
          href="/reports"
          action="Get report assistance"
        />
      </section>

      <p className={styles.privacyNote}>
        Avoid sharing reports or personal medical information through
        public links. For help with an existing report, contact the
        laboratory through its verified contact details.
      </p>
    </>
  );
}

function FamilyContent() {
  return (
    <>
      <SectionHeading
        eyebrow="01 / FAMILY MANAGEMENT"
        title="Family members."
        description="Manage family-member information associated with your patient account."
      />

      <div className={styles.informationCard}>
        <span className={styles.sectionEyebrow}>
          FAMILY ACCOUNT MANAGEMENT
        </span>

        <h3>One account, organized family information.</h3>

        <p>
          The family-member feature will allow the primary patient
          account to manage authorized family profiles and make
          booking requests on their behalf, subject to verification
          and backend permissions.
        </p>

        <span className={styles.apiStatus}>FAMILY API NOT CONNECTED</span>
      </div>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              02 / ASSOCIATED PROFILES
            </span>
            <h2>Your family list.</h2>
          </div>

          <span className={styles.apiStatus}>NO RECORDS LOADED</span>
        </div>

        <EmptyState
          title="No family-member records are available."
          description="Family profiles will be retrieved from your authenticated account. No family members have been created or assumed in this preview."
        />
      </section>

      <div className={styles.disabledActionPanel}>
        <div>
          <h3>Add a family member</h3>
          <p>
            Profile creation and consent verification will be
            enabled when the family-member API is ready.
          </p>
        </div>

        <button type="button" disabled>
          <span aria-hidden="true">+</span>
          Add unavailable
        </button>
      </div>
    </>
  );
}

function ProfileContent() {
  const profileFields = [
    { label: "Full name", name: "name" },
    { label: "Email address", name: "email" },
    { label: "Phone number", name: "phone" },
    { label: "Patient account reference", name: "reference" },
  ];

  return (
    <>
      <SectionHeading
        eyebrow="01 / ACCOUNT INFORMATION"
        title="My profile."
        description="Your registered patient information and account preferences."
      />

      <div className={styles.informationCard}>
        <span className={styles.sectionEyebrow}>PERSONAL ACCOUNT</span>
        <h3>Your account information is private.</h3>
        <p>
          Profile details will only be loaded after the patient
          authentication service verifies your account. This
          preview does not contain or store personal account data.
        </p>
      </div>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionEyebrow}>
              02 / REGISTERED DETAILS
            </span>
            <h2>Personal information.</h2>
          </div>
          <span className={styles.apiStatus}>NOT CONNECTED</span>
        </div>

        <div className={styles.profileGrid}>
          {profileFields.map((field) => (
            <div className={styles.profileField} key={field.name}>
              <span>{field.label}</span>
              <strong>Not loaded</strong>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.disabledActionPanel}>
        <div>
          <h3>Update profile</h3>
          <p>
            Editing and saving patient information will be enabled
            after authenticated profile endpoints are connected.
          </p>
        </div>

        <button type="button" disabled>
          Edit unavailable
        </button>
      </div>
    </>
  );
}