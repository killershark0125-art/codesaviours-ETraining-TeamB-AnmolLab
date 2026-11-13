"use client";

import { useState } from "react";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import styles from "./admin-management.module.css";

export type AdminResource =
  | "tests"
  | "packages"
  | "bookings"
  | "branches"
  | "users"
  | "content";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "textarea";
  placeholder: string;
  required?: boolean;
};

type ResourceConfig = {
  eyebrow: string;
  title: string;
  description: string;
  columns: string[];
  fields: Field[];
  createLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  canCreate: boolean;
};

const config: Record<AdminResource, ResourceConfig> = {
  tests: {
    eyebrow: "CATALOGUE / LABORATORY TESTS",
    title: "Test catalogue",
    description:
      "Manage published laboratory tests, categories, sample information and pricing.",
    columns: ["Test name", "Code", "Category", "Price", "Status"],
    createLabel: "Add new test",
    canCreate: true,
    emptyTitle: "Your test catalogue will appear here.",
    emptyDescription:
      "Published and inactive laboratory tests will load from the admin API. No sample records are displayed.",
    fields: [
      {
        name: "name",
        label: "Test name",
        placeholder: "Enter test name",
        required: true,
      },
      {
        name: "code",
        label: "Test code",
        placeholder: "Enter laboratory test code",
      },
      {
        name: "category",
        label: "Category",
        placeholder: "Enter or select a category identifier",
        required: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter the verified test description",
      },
      {
        name: "sampleType",
        label: "Sample type",
        placeholder: "Enter sample type",
      },
      {
        name: "preparationInstructions",
        label: "Preparation instructions",
        type: "textarea",
        placeholder: "Enter laboratory-confirmed instructions",
      },
      {
        name: "turnaroundTime",
        label: "Turnaround time",
        placeholder: "Enter confirmed report turnaround",
      },
      {
        name: "price",
        label: "Price",
        type: "number",
        placeholder: "Enter price",
      },
    ],
  },

  packages: {
    eyebrow: "CATALOGUE / HEALTH PACKAGES",
    title: "Health packages",
    description:
      "Manage laboratory packages, their included tests and approved pricing.",
    columns: ["Package", "Included tests", "Regular price", "Package price", "Status"],
    createLabel: "Create package",
    canCreate: true,
    emptyTitle: "Your health packages will appear here.",
    emptyDescription:
      "Package records and their included tests will be retrieved from the admin API. Pricing must be calculated and validated by the backend.",
    fields: [
      {
        name: "name",
        label: "Package name",
        placeholder: "Enter package name",
        required: true,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter package description",
      },
      {
        name: "includedTests",
        label: "Included test identifiers",
        type: "textarea",
        placeholder: "Enter test identifiers supplied by the catalogue",
        required: true,
      },
      {
        name: "discountPercentage",
        label: "Discount percentage",
        type: "number",
        placeholder: "Enter discount percentage",
      },
    ],
  },

  bookings: {
    eyebrow: "OPERATIONS / APPOINTMENTS",
    title: "Booking management",
    description:
      "Review patient booking requests, collection methods and appointment status.",
    columns: ["Booking reference", "Patient", "Collection", "Date", "Status"],
    createLabel: "Bookings are created through patient checkout",
    canCreate: false,
    emptyTitle: "No booking records loaded.",
    emptyDescription:
      "Patient bookings, collection details and appointment statuses will appear here once the protected booking API is connected.",
    fields: [],
  },

  branches: {
    eyebrow: "OPERATIONS / LOCATIONS",
    title: "Branch management",
    description:
      "Manage verified laboratory location and contact information.",
    columns: ["Branch", "Address", "Contact", "Availability", "Status"],
    createLabel: "Add branch",
    canCreate: true,
    emptyTitle: "Your branch directory will appear here.",
    emptyDescription:
      "Only client-approved branch information will be displayed. No unverified locations or opening hours are pre-populated.",
    fields: [
      {
        name: "name",
        label: "Branch name",
        placeholder: "Enter verified branch name",
        required: true,
      },
      {
        name: "address",
        label: "Address",
        type: "textarea",
        placeholder: "Enter complete verified address",
        required: true,
      },
      {
        name: "phone",
        label: "Contact number",
        type: "tel",
        placeholder: "Enter contact number",
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        placeholder: "Enter branch email",
      },
    ],
  },

  users: {
    eyebrow: "ACCESS / ACCOUNTS",
    title: "User management",
    description:
      "Review patient, doctor and staff accounts and their authorized roles.",
    columns: ["Name", "Email", "Phone", "Role", "Account status"],
    createLabel: "Invite user",
    canCreate: true,
    emptyTitle: "No user records loaded.",
    emptyDescription:
      "Accounts and assigned roles will be retrieved from the protected user-management API. Never assign administrative privileges through the frontend alone.",
    fields: [
      {
        name: "name",
        label: "Full name",
        placeholder: "Enter full name",
        required: true,
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        placeholder: "Enter email address",
        required: true,
      },
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        placeholder: "Enter phone number",
      },
      {
        name: "role",
        label: "Requested role",
        placeholder: "Patient, doctor or staff",
        required: true,
      },
    ],
  },

  content: {
    eyebrow: "WEBSITE / CONTENT",
    title: "Content management",
    description:
      "Manage approved articles, FAQs and website enquiry content.",
    columns: ["Title", "Content type", "Last updated", "Publication status"],
    createLabel: "Create content",
    canCreate: true,
    emptyTitle: "Website content will appear here.",
    emptyDescription:
      "Blog posts and frequently asked questions will be loaded from the content-management API.",
    fields: [
      {
        name: "title",
        label: "Content title",
        placeholder: "Enter title",
        required: true,
      },
      {
        name: "slug",
        label: "URL slug",
        placeholder: "Enter URL slug",
        required: true,
      },
      {
        name: "contentType",
        label: "Content type",
        placeholder: "Blog article or FAQ",
        required: true,
      },
      {
        name: "content",
        label: "Content body",
        type: "textarea",
        placeholder: "Enter approved content",
        required: true,
      },
    ],
  },
};

const navigation: { label: string; href: string; key?: AdminResource }[] = [
  { label: "Overview", href: "/admin" },
  { label: "Tests", href: "/admin/tests", key: "tests" },
  { label: "Packages", href: "/admin/packages", key: "packages" },
  { label: "Bookings", href: "/admin/bookings", key: "bookings" },
  { label: "Branches", href: "/admin/branches", key: "branches" },
  { label: "Users & roles", href: "/admin/users", key: "users" },
  { label: "Website content", href: "/admin/content", key: "content" },
];

export default function AdminManagement({
  resource,
}: {
  resource: AdminResource;
}) {
  const current = config[resource];

  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});

  function updateDraft(name: string, value: string) {
    setDraft((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function closeComposer() {
    setComposerOpen(false);
    setDraft({});
  }

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.topline}>
            <span>ANMOL HEALTH CARE LAB</span>
            <span>ADMINISTRATION / MANAGEMENT</span>
          </div>

          <section className={styles.heading}>
            <div>
              <span className={styles.eyebrow}>{current.eyebrow}</span>
              <h1>{current.title}</h1>
              <p>{current.description}</p>
            </div>

            {current.canCreate && (
              <button
                type="button"
                className={styles.createButton}
                onClick={() => setComposerOpen(true)}
              >
                <span aria-hidden="true">+</span>
                {current.createLabel}
              </button>
            )}
          </section>

          <div className={styles.connectionNotice} role="status">
            <span>i</span>
            <div>
              <strong>Management API connection pending</strong>
              <p>
                This interface is ready for integration. No records have
                been fabricated, and changes cannot be saved until the
                corresponding authorized backend endpoint is available.
              </p>
            </div>
          </div>

          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <span className={styles.sidebarLabel}>ADMIN WORKSPACE</span>

              <nav aria-label="Admin management navigation">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      item.key === resource
                        ? styles.activeLink
                        : styles.navLink
                    }
                    aria-current={
                      item.key === resource ? "page" : undefined
                    }
                  >
                    {item.label}
                    {item.key === resource && (
                      <span aria-hidden="true">●</span>
                    )}
                  </Link>
                ))}
              </nav>

              <Link href="/" className={styles.exitLink}>
                ← Return to public website
              </Link>
            </aside>

            <section className={styles.content}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.sectionEyebrow}>
                    RECORD DIRECTORY
                  </span>
                  <h2>{current.title}</h2>
                </div>

                <span className={styles.status}>AWAITING API</span>
              </div>

              <div className={styles.toolbar}>
                <input
                  type="search"
                  placeholder="Search will activate after API integration"
                  disabled
                  aria-label="Search records"
                />

                <button type="button" disabled>
                  Filters
                </button>

                <button type="button" disabled>
                  Export
                </button>
              </div>

              <div className={styles.tableWrap}>
                <table>
                  <thead>
                    <tr>
                      {current.columns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                </table>

                <div className={styles.emptyState}>
                  <span className={styles.emptyIcon} aria-hidden="true">
                    ◇
                  </span>
                  <h3>{current.emptyTitle}</h3>
                  <p>{current.emptyDescription}</p>
                  <span className={styles.emptyStatus}>
                    LIVE RECORDS NOT CONNECTED
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {composerOpen && (
          <div
            className={styles.modalBackdrop}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeComposer();
              }
            }}
          >
            <section
              className={styles.modal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="composer-title"
            >
              <div className={styles.modalHeader}>
                <div>
                  <span className={styles.eyebrow}>NEW RECORD / DRAFT</span>
                  <h2 id="composer-title">{current.createLabel}</h2>
                </div>

                <button
                  type="button"
                  onClick={closeComposer}
                  aria-label="Close form"
                  className={styles.closeButton}
                >
                  ×
                </button>
              </div>

              <p className={styles.modalNotice}>
                You can prepare the form layout here, but submitting
                records is disabled until the authorized admin API
                is connected.
              </p>

              <div className={styles.formGrid}>
                {current.fields.map((field) => (
                  <div
                    className={
                      field.type === "textarea"
                        ? styles.fullField
                        : styles.field
                    }
                    key={field.name}
                  >
                    <label htmlFor={`admin-${field.name}`}>
                      {field.label}
                      {field.required && <span> *</span>}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        id={`admin-${field.name}`}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={4}
                        value={draft[field.name] ?? ""}
                        onChange={(event) =>
                          updateDraft(field.name, event.target.value)
                        }
                      />
                    ) : (
                      <input
                        id={`admin-${field.name}`}
                        name={field.name}
                        type={field.type ?? "text"}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={draft[field.name] ?? ""}
                        onChange={(event) =>
                          updateDraft(field.name, event.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={closeComposer}
                >
                  Close
                </button>

                <button
                  type="button"
                  className={styles.disabledSave}
                  disabled
                  title="Admin API connection required"
                >
                  Save unavailable
                </button>
              </div>
            </section>
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}