import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import styles from "./role-dashboard.module.css";

export type DashboardRole = "patient" | "staff" | "admin";

type DashboardLink = {
  label: string;
  href: string;
  description: string;
};

type DashboardSection = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  previewHref?: string;
  previewLabel?: string;
};

type DashboardConfig = {
  label: string;
  title: string;
  accent: string;
  description: string;
  quickLinks: DashboardLink[];
  sections: DashboardSection[];
};

const dashboardContent: Record<DashboardRole, DashboardConfig> = {
  patient: {
    label: "PATIENT PORTAL",
    title: "Your healthcare, in one place.",
    accent: "Patient workspace",
    description:
      "Your space for keeping track of laboratory bookings, reports and patient information.",
    quickLinks: [
      {
        label: "Book a test",
        href: "/book",
        description: "Start a test booking request",
      },
      {
        label: "Explore tests",
        href: "/tests",
        description: "Browse the laboratory catalogue",
      },
      {
        label: "Patient reports",
        href: "/reports",
        description: "Get help with your results",
      },
      {
  label: "Booking operations",
  href: "/staff/bookings",
  description: "Review incoming booking requests",
},
{
  label: "Home collections",
  href: "/staff/collections",
  description: "Coordinate sample collection requests",
},
{
  label: "Report management",
  href: "/staff/reports",
  description: "Prepare laboratory report documents",
},
    ],
    sections: [
      {
        id: "appointments",
        number: "01",
        eyebrow: "BOOKING ACTIVITY",
        title: "Your appointments",
        description:
          "Review your upcoming and previous laboratory bookings.",
        emptyTitle: "Your booking history will appear here.",
        emptyDescription:
          "Once patient booking services are connected, your confirmed appointments and their current status will be shown in this section.",
        previewHref: "/book",
        previewLabel: "Start a booking",
      },
      {
        id: "reports",
        number: "02",
        eyebrow: "RESULTS & DOCUMENTS",
        title: "Your reports",
        description:
          "Access laboratory report information associated with your account.",
        emptyTitle: "No report records are available here yet.",
        emptyDescription:
          "Secure report access requires patient authentication and ownership verification. The report service will appear here once those backend services are connected.",
        previewHref: "/reports",
        previewLabel: "Report assistance",
      },
      {
        id: "profile",
        number: "03",
        eyebrow: "ACCOUNT INFORMATION",
        title: "Your patient profile",
        description:
          "Your registered contact and patient information.",
        emptyTitle: "Your profile will appear after sign-in integration.",
        emptyDescription:
          "Personal details will be loaded from your authenticated patient account. This preview does not store or display personal records.",
        previewHref: "/contact",
        previewLabel: "Get account assistance",
      },
    ],
  },

  staff: {
    label: "LABORATORY STAFF",
    title: "A clearer workspace for daily operations.",
    accent: "Staff workspace",
    description:
      "A central workspace for reviewing booking activity, coordinating sample collection and handling laboratory workflows.",
    quickLinks: [
      {
        label: "Public booking page",
        href: "/book",
        description: "View the patient booking experience",
      },
      {
        label: "Test catalogue",
        href: "/tests",
        description: "Review published tests",
      },
      {
        label: "Contact information",
        href: "/contact",
        description: "View laboratory contact details",
      },
    ],
    sections: [
      {
        id: "booking-queue",
        number: "01",
        eyebrow: "BOOKING OPERATIONS",
        title: "Booking queue",
        description:
          "Review incoming booking requests and their processing status.",
        emptyTitle: "The booking queue is awaiting live data.",
        emptyDescription:
          "Confirmed booking requests, patient details and status updates will be displayed here after the staff API and access permissions are connected.",
      },
      {
        id: "collections",
        number: "02",
        eyebrow: "SAMPLE COLLECTION",
        title: "Collection coordination",
        description:
          "Coordinate branch visits and home sample collection requests.",
        emptyTitle: "No collection schedule is connected.",
        emptyDescription:
          "Collection addresses, assigned staff and confirmed time slots must come from the booking and scheduling services. No sample appointments are displayed.",
        previewHref: "/home-sampling",
        previewLabel: "View home sampling information",
      },
      {
        id: "patients",
        number: "03",
        eyebrow: "PATIENT SERVICES",
        title: "Patient records",
        description:
          "Access patient information needed for authorized laboratory operations.",
        emptyTitle: "Patient records are not connected.",
        emptyDescription:
          "Authorized patient records will only load after Hammad's role-based API and access controls are integrated.",
      },
      {
        id: "reports",
        number: "04",
        eyebrow: "REPORT WORKFLOW",
        title: "Report management",
        description:
          "Manage the report workflow for authorized staff.",
        emptyTitle: "The report workflow is awaiting integration.",
        emptyDescription:
          "Secure report uploads, processing status and patient access must be connected to the protected backend before this workspace can be used.",
        previewHref: "/reports",
        previewLabel: "View patient report page",
      },
    ],
  },

  admin: {
    label: "ADMINISTRATION",
    title: "An overview of laboratory operations.",
    accent: "Administration console",
    description:
      "A central interface for managing the laboratory catalogue, bookings, packages, locations and website content.",
    quickLinks: [
      {
        label: "Test catalogue",
        href: "/tests",
        description: "Preview published laboratory tests",
      },
      {
        label: "Health packages",
        href: "/packages",
        description: "Preview published packages",
      },
      {
        label: "Branch directory",
        href: "/branches",
        description: "Preview public locations",
      },
      {
        label: "Website content",
        href: "/blog",
        description: "Preview public articles",
      },
    ],
    sections: [
      {
        id: "catalogue",
        number: "01",
        eyebrow: "CATALOGUE MANAGEMENT",
        title: "Tests and categories",
        description:
          "Manage laboratory test information and catalogue categories.",
        emptyTitle: "Catalogue management is awaiting its API.",
        emptyDescription:
          "Test creation, editing, activation, category management and CSV imports will be connected to the protected admin endpoints. This preview does not contain editable sample records.",
        previewHref: "/tests",
        previewLabel: "View public test catalogue",
      },
      {
        id: "bookings",
        number: "02",
        eyebrow: "PATIENT OPERATIONS",
        title: "Bookings and appointments",
        description:
          "Review booking requests, collection methods and appointment status.",
        emptyTitle: "No live booking records are loaded.",
        emptyDescription:
          "Booking review, confirmation, status changes and capacity management require the backend booking service and admin authorization.",
      },
      {
        id: "packages",
        number: "03",
        eyebrow: "PRICING & PACKAGES",
        title: "Health packages",
        description:
          "Manage package contents, pricing and published availability.",
        emptyTitle: "Package management is awaiting integration.",
        emptyDescription:
          "Package creation, included tests, price calculation and publication status will use the backend package-management endpoints.",
        previewHref: "/packages",
        previewLabel: "View public packages",
      },
      {
        id: "branches",
        number: "04",
        eyebrow: "LABORATORY LOCATIONS",
        title: "Branches and services",
        description:
          "Manage branch information and service-related details.",
        emptyTitle: "Branch management is not connected.",
        emptyDescription:
          "Only verified branch records, confirmed contact information and approved service details will appear after API integration.",
        previewHref: "/branches",
        previewLabel: "View public locations",
      },
      {
        id: "content",
        number: "05",
        eyebrow: "WEBSITE CONTENT",
        title: "Articles and enquiries",
        description:
          "Manage published articles and review submitted website enquiries.",
        emptyTitle: "Content management is awaiting integration.",
        emptyDescription:
          "Article publishing, editing and enquiry management require their respective protected backend endpoints.",
        previewHref: "/blog",
        previewLabel: "View public blog",
      },
      {
        id: "team",
        number: "06",
        eyebrow: "ACCESS MANAGEMENT",
        title: "Staff access",
        description:
          "Manage authorized staff accounts and their assigned roles.",
        emptyTitle: "Staff management is not connected.",
        emptyDescription:
          "Staff invitations, account status and role permissions must be handled by the secured administration API.",
        previewHref: "/staff/login",
        previewLabel: "Staff sign-in screen",
      },
    ],
  },
};

type RoleDashboardProps = {
  role: DashboardRole;
};

export default function RoleDashboard({ role }: RoleDashboardProps) {
  const content = dashboardContent[role];

  return (
    <>
      <SiteHeader />

      <main className={styles.page} data-role={role}>
        <div className={styles.container}>
          <div className={styles.topline}>
            <span>ANMOL HEALTH CARE LAB</span>
            <span>{content.label}</span>
          </div>

          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>
                {content.accent}
              </span>

              <h1>{content.title}</h1>

              <p>{content.description}</p>
            </div>

            <div className={styles.heroAside}>
              <span className={styles.heroAsideLabel}>
                WORKSPACE
              </span>
              <strong>
                {role === "patient"
                  ? "01 / PATIENT"
                  : role === "staff"
                    ? "02 / STAFF"
                    : "03 / ADMIN"}
              </strong>
              <span>ANMOL / PORTAL</span>
            </div>
          </section>

          <div className={styles.previewNotice} role="status">
            <span className={styles.noticeIcon}>i</span>
            <div>
              <strong>Frontend preview — backend connection pending</strong>
              <p>
                Authentication, role authorization and live records have
                not been connected yet. No real patient or operational
                data is displayed here. Do not use this preview for
                confidential or production operations.
              </p>
            </div>
          </div>

          <div className={styles.workspace}>
            <aside className={styles.sidebar}>
              <span className={styles.sidebarLabel}>
                WORKSPACE MENU
              </span>

              <nav aria-label={`${content.label} sections`}>
                <a href="#overview" className={styles.sideLinkActive}>
                  <span>00</span>
                  Overview
                </a>

                {content.sections.map((section) => (
                  <a
                    href={`#${section.id}`}
                    className={styles.sideLink}
                    key={section.id}
                  >
                    <span>{section.number}</span>
                    {section.title}
                  </a>
                ))}
              </nav>

              <div className={styles.sidebarBottom}>
                <Link href="/">
                  <span aria-hidden="true">←</span>
                  Return to website
                </Link>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <section
                id="overview"
                className={styles.overview}
                aria-labelledby="overview-title"
              >
                <div className={styles.sectionHeading}>
                  <div>
                    <span className={styles.sectionEyebrow}>
                      WORKSPACE OVERVIEW
                    </span>
                    <h2 id="overview-title">Quick access</h2>
                  </div>
                  <span className={styles.sectionIndex}>00 / 03</span>
                </div>

                <div className={styles.quickGrid}>
                  {content.quickLinks.map((item, index) => (
                    <Link
                      className={styles.quickCard}
                      href={item.href}
                      key={item.href}
                    >
                      <span className={styles.quickNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <strong>{item.label}</strong>
                      <span className={styles.quickDescription}>
                        {item.description}
                      </span>

                      <span className={styles.quickArrow} aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section
                className={styles.modules}
                aria-label="Workspace modules"
              >
                {content.sections.map((section) => (
                  <article
                    id={section.id}
                    className={styles.module}
                    key={section.id}
                  >
                    <div className={styles.moduleHeading}>
                      <div>
                        <span className={styles.moduleEyebrow}>
                          {section.number} / {section.eyebrow}
                        </span>
                        <h2>{section.title}</h2>
                        <p>{section.description}</p>
                      </div>

                      <span className={styles.moduleStatus}>
                        AWAITING API
                      </span>
                    </div>

                    <div className={styles.emptyState}>
                      <span className={styles.emptyIcon} aria-hidden="true">
                        <svg
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="7"
                            y="6"
                            width="26"
                            height="29"
                            rx="3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M13 14H27M13 20H27M13 26H22"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>

                      <div>
                        <h3>{section.emptyTitle}</h3>
                        <p>{section.emptyDescription}</p>

                        {section.previewHref && section.previewLabel && (
                          <Link
                            href={section.previewHref}
                            className={styles.moduleLink}
                          >
                            {section.previewLabel}
                            <span aria-hidden="true">↗</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}