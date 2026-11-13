"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";

import styles from "./staff-operations.module.css";

export type StaffResource = "bookings" | "collections" | "reports";

type WorkflowStep = {
  number: string;
  title: string;
  description: string;
};

type ResourceConfig = {
  eyebrow: string;
  title: string;
  description: string;
  columns: string[];
  emptyTitle: string;
  emptyDescription: string;
  workflow: WorkflowStep[];
};

const resourceConfig: Record<StaffResource, ResourceConfig> = {
  bookings: {
    eyebrow: "STAFF OPERATIONS / BOOKINGS",
    title: "Booking queue",
    description:
      "Review incoming patient booking requests, verify their details and coordinate the next stage of laboratory service.",
    columns: [
      "BOOKING REFERENCE",
      "PATIENT",
      "TEST SELECTION",
      "COLLECTION",
      "REQUESTED DATE",
      "STATUS",
    ],
    emptyTitle: "Your booking queue is ready for live records.",
    emptyDescription:
      "Incoming booking requests will appear here once the protected staff API is connected. No sample patients, appointments or statuses are displayed.",
    workflow: [
      {
        number: "01",
        title: "Review request",
        description:
          "Check the patient and requested test information.",
      },
      {
        number: "02",
        title: "Confirm arrangements",
        description:
          "Verify collection method, availability and required details.",
      },
      {
        number: "03",
        title: "Update progress",
        description:
          "Record the confirmed booking status through the authorized workflow.",
      },
    ],
  },

  collections: {
    eyebrow: "STAFF OPERATIONS / HOME COLLECTION",
    title: "Collection coordination",
    description:
      "Coordinate home sample collection requests, address verification and staff assignment.",
    columns: [
      "BOOKING REFERENCE",
      "PATIENT",
      "COLLECTION ADDRESS",
      "PREFERRED DATE",
      "ASSIGNED STAFF",
      "STATUS",
    ],
    emptyTitle: "Your collection schedule is ready for live records.",
    emptyDescription:
      "Confirmed home collection requests, addresses and assignments will load from the booking and scheduling APIs. No locations or time slots are invented.",
    workflow: [
      {
        number: "01",
        title: "Verify location",
        description:
          "Review the patient's submitted address and confirm service coverage.",
      },
      {
        number: "02",
        title: "Coordinate collection",
        description:
          "Confirm the collection arrangement and authorized staff assignment.",
      },
      {
        number: "03",
        title: "Track completion",
        description:
          "Update collection progress using the laboratory's authorized workflow.",
      },
    ],
  },

  reports: {
    eyebrow: "STAFF OPERATIONS / REPORTS",
    title: "Report management",
    description:
      "Prepare laboratory report documents for secure upload and authorized patient access.",
    columns: [],
    emptyTitle: "",
    emptyDescription: "",
    workflow: [
      {
        number: "01",
        title: "Verify patient",
        description:
          "Confirm the patient and associated booking through the authorized system.",
      },
      {
        number: "02",
        title: "Prepare report",
        description:
          "Select the approved report document and verify its association.",
      },
      {
        number: "03",
        title: "Upload securely",
        description:
          "Send the report through the protected upload service when available.",
      },
    ],
  },
};

const staffNavigation = [
  { label: "Overview", href: "/staff" },
  { label: "Bookings", href: "/staff/bookings", key: "bookings" },
  { label: "Home collections", href: "/staff/collections", key: "collections" },
  { label: "Report management", href: "/staff/reports", key: "reports" },
] as const;

export default function StaffOperations({
  resource,
}: {
  resource: StaffResource;
}) {
  const current = resourceConfig[resource];

  const [file, setFile] = useState<File | null>(null);
  const [bookingReference, setBookingReference] = useState("");
  const [reportLabel, setReportLabel] = useState("");
  const [feedback, setFeedback] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const selected = event.target.files?.[0] ?? null;

    setFeedback("");
    setFile(selected);
  }

  function clearFile() {
    setFile(null);
    setFeedback("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleReportPreparation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");

    if (!file) {
      setFeedback("Select a report PDF before continuing.");
      return;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setFeedback("Please select a PDF document.");
      return;
    }

    if (!bookingReference.trim() || !reportLabel.trim()) {
      setFeedback("Complete the booking reference and report label.");
      return;
    }

    setFeedback(
      "The report details passed local validation. The document remains in this browser and has NOT been uploaded. Secure upload will become available after backend integration.",
    );
  }

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.topline}>
            <span>{siteConfig.name}</span>
            <span>STAFF WORKSPACE / OPERATIONS</span>
          </div>

          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{current.eyebrow}</span>

              <h1>{current.title}</h1>

              <p>{current.description}</p>
            </div>

            <aside className={styles.heroCard}>
              <span>OPERATIONAL WORKSPACE</span>
              <strong>
                {resource === "bookings"
                  ? "01 / QUEUE"
                  : resource === "collections"
                    ? "02 / COLLECTION"
                    : "03 / REPORTS"}
              </strong>
              <small>ANMOL / STAFF</small>
              <div />
              <p>
                Live records and authorized actions require staff
                authentication and the corresponding backend services.
              </p>
            </aside>
          </section>

          <div className={styles.notice} role="status">
            <span aria-hidden="true">i</span>
            <div>
              <strong>Staff API connection pending</strong>
              <p>
                This is a frontend workspace preview. No patient records,
                bookings, collection assignments or uploaded reports are
                available yet. Do not use it for live laboratory operations.
              </p>
            </div>
          </div>

          <div className={styles.workspace}>
            <aside className={styles.sidebar}>
              <span className={styles.sidebarLabel}>STAFF WORKSPACE</span>

              <nav aria-label="Staff operations navigation">
                {staffNavigation.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={
                      "key" in item && item.key === resource
                        ? styles.activeLink
                        : styles.navLink
                    }
                    aria-current={
                      "key" in item && item.key === resource
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                    {"key" in item && item.key === resource && (
                      <span aria-hidden="true">●</span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className={styles.sidebarBottom}>
                <Link href="/">
                  ← Return to website
                </Link>
              </div>
            </aside>

            <section className={styles.content}>
              {resource !== "reports" ? (
                <QueueContent
                  resource={resource}
                  config={current}
                />
              ) : (
                <ReportUploadPanel
                  file={file}
                  fileInputRef={fileInputRef}
                  bookingReference={bookingReference}
                  reportLabel={reportLabel}
                  feedback={feedback}
                  onFileChange={handleFileChange}
                  onBookingReferenceChange={setBookingReference}
                  onReportLabelChange={setReportLabel}
                  onPrepare={handleReportPreparation}
                  onClearFile={clearFile}
                />
              )}
            </section>
          </div>

          <section className={styles.workflowSection}>
            <div className={styles.workflowHeading}>
              <span className={styles.sectionLabel}>
                STAFF WORKFLOW / REFERENCE
              </span>
              <h2>How this workspace fits together.</h2>
            </div>

            <div className={styles.workflowGrid}>
              {current.workflow.map((step) => (
                <article className={styles.workflowCard} key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

function QueueContent({
  resource,
  config,
}: {
  resource: "bookings" | "collections";
  config: ResourceConfig;
}) {
  return (
    <>
      <div className={styles.contentHeading}>
        <div>
          <span className={styles.sectionLabel}>RECORD DIRECTORY</span>
          <h2>{config.title}</h2>
        </div>

        <span className={styles.pendingBadge}>AWAITING API</span>
      </div>

      <div className={styles.metricGrid}>
        {[
          "Total requests",
          "Awaiting review",
          "In progress",
        ].map((label) => (
          <div className={styles.metricCard} key={label}>
            <span>{label}</span>
            <strong>—</strong>
            <small>Not loaded</small>
          </div>
        ))}
      </div>

      <div className={styles.tablePanel}>
        <div className={styles.tableHeading}>
          <div>
            <span className={styles.sectionLabel}>
              {resource === "bookings"
                ? "BOOKING REQUESTS"
                : "COLLECTION REQUESTS"}
            </span>
            <h3>All records</h3>
          </div>

          <span className={styles.pendingBadge}>LIVE DATA UNAVAILABLE</span>
        </div>

        <div className={styles.tableScroll}>
          <table>
            <thead>
              <tr>
                {config.columns.map((column) => (
                  <th scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={config.columns.length}>
                  <div className={styles.emptyState}>
                    <span aria-hidden="true">◇</span>
                    <strong>{config.emptyTitle}</strong>
                    <p>{config.emptyDescription}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ReportUploadPanel({
  file,
  fileInputRef,
  bookingReference,
  reportLabel,
  feedback,
  onFileChange,
  onBookingReferenceChange,
  onReportLabelChange,
  onPrepare,
  onClearFile,
}: {
  file: File | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  bookingReference: string;
  reportLabel: string;
  feedback: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBookingReferenceChange: (value: string) => void;
  onReportLabelChange: (value: string) => void;
  onPrepare: (event: FormEvent<HTMLFormElement>) => void;
  onClearFile: () => void;
}) {
  return (
    <>
      <div className={styles.contentHeading}>
        <div>
          <span className={styles.sectionLabel}>DOCUMENT WORKFLOW</span>
          <h2>Prepare a report.</h2>
        </div>

        <span className={styles.pendingBadge}>UPLOAD API PENDING</span>
      </div>

      <div className={styles.securityNotice}>
        <strong>Patient document security</strong>
        <p>
          Only authorized staff should prepare patient reports. This
          interface does not transmit files, store them permanently or
          grant patient access. Server-side verification and secure
          storage are required before an actual upload can take place.
        </p>
      </div>

      <form className={styles.uploadForm} onSubmit={onPrepare}>
        <div className={styles.formHeading}>
          <span className={styles.sectionLabel}>01 / REPORT DETAILS</span>
          <h3>Associate the document.</h3>
          <p>
            Enter the reference supplied by the authorized laboratory
            workflow. Do not use patient names as booking references.
          </p>
        </div>

        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <label htmlFor="staff-booking-reference">
              Booking reference
            </label>
            <input
              id="staff-booking-reference"
              name="bookingReference"
              required
              maxLength={120}
              value={bookingReference}
              onChange={(event) =>
                onBookingReferenceChange(event.target.value)
              }
              placeholder="Enter verified booking reference"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="staff-report-label">
              Report label
            </label>
            <input
              id="staff-report-label"
              name="reportLabel"
              required
              maxLength={120}
              value={reportLabel}
              onChange={(event) =>
                onReportLabelChange(event.target.value)
              }
              placeholder="Enter report label"
            />
          </div>
        </div>

        <div className={styles.fileSection}>
          <span className={styles.sectionLabel}>02 / DOCUMENT</span>

          <label htmlFor="staff-report-file" className={styles.fileDrop}>
            <span className={styles.fileIcon} aria-hidden="true">
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5.5H24L32 13.5V33C32 34.1 31.1 35 30 35H12C10.9 35 10 34.1 10 33V7.5C10 6.4 10.9 5.5 12 5.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M23.5 6V14H31.5M20 27V18M16.5 21.5L20 18L23.5 21.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <strong>
              {file ? file.name : "Choose a laboratory report"}
            </strong>

            <span>
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB · Selected locally`
                : "PDF document · File remains in this browser"}
            </span>

            <span className={styles.fileBrowse}>
              {file ? "Choose another file" : "Browse files"}
            </span>

            <input
              ref={fileInputRef}
              id="staff-report-file"
              name="report"
              type="file"
              accept=".pdf,application/pdf"
              onChange={onFileChange}
              required
            />
          </label>

          {file && (
            <button
              type="button"
              className={styles.removeFile}
              onClick={onClearFile}
            >
              Remove selected document
            </button>
          )}
        </div>

        {feedback && (
          <p className={styles.feedback} role="status">
            {feedback}
          </p>
        )}

        <div className={styles.formActions}>
          <button type="submit" className={styles.prepareButton}>
            Validate upload details
            <span aria-hidden="true">↗</span>
          </button>

          <span>
            Actual uploading will be enabled after secure API integration.
          </span>
        </div>
      </form>
    </>
  );
}