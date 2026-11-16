
"use client";

import { useState, type ChangeEvent } from "react";
import Link from "next/link";

import styles from "./report-explainer.module.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isSupportedFile(file: File): boolean {
  const supportedType =
    file.type === "application/pdf" ||
    file.type === "image/jpeg" ||
    file.type === "image/png";

  const supportedExtension = /\.(pdf|jpe?g|png)$/i.test(file.name);

  return supportedType || supportedExtension;
}

export default function ReportExplainer() {
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.currentTarget.files?.[0] ?? null;

    setError("");
    setConsent(false);
    setFile(null);

    if (!selectedFile) return;

    if (!isSupportedFile(selectedFile)) {
      setError("Please select a PDF, JPG or PNG report.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("The selected report exceeds the 10 MB file limit.");
      return;
    }

    setFile(selectedFile);
  }

  function removeFile() {
    setFile(null);
    setConsent(false);
    setError("");
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            ANMOL HEALTH CARE LAB / PATIENT SUPPORT
          </span>

          <h1>
            Understand your
            <br />
            <em>laboratory report.</em>
          </h1>

          <p>
            A future report explanation service designed to help
            patients understand laboratory parameters and the
            reference ranges displayed on their reports.
          </p>

          <span className={styles.status}>
            <span className={styles.statusDot} />
            Secure explanation service awaiting integration
          </span>
        </div>
      </section>

      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/assistant">AI Assistant</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Report explainer</span>
        </nav>

        <div className={styles.sectionIntro}>
          <span className={styles.sectionNumber}>
            01 / REPORT EXPLANATION
          </span>

          <h2>
            Start with your <em>report.</em>
          </h2>

          <p>
            Select a laboratory report and review the information
            about privacy and consent before proceeding.
          </p>
        </div>

        <div className={styles.workspace}>
          <section className={styles.uploadPanel}>
            <div className={styles.panelHeading}>
              <div>
                <span className={styles.panelEyebrow}>
                  YOUR DOCUMENT
                </span>
                <h3>Select a report</h3>
              </div>

              <span className={styles.stepNumber}>01</span>
            </div>

            {!file ? (
              <label className={styles.uploadArea} htmlFor="report-file">
                <span className={styles.uploadIcon} aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none">
                    <path d="M16 21V5m0 0-6 6m6-6 6 6" />
                    <path d="M6 19v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7" />
                  </svg>
                </span>

                <strong>Choose a report from your device</strong>

                <span className={styles.uploadDescription}>
                  PDF, JPG or PNG · Maximum file size 10 MB
                </span>

                <span className={styles.chooseButton}>
                  Select report
                </span>

                <input
                  id="report-file"
                  className={styles.fileInput}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className={styles.selectedFile}>
                <div className={styles.fileIcon} aria-hidden="true">
                  {file.name.toLowerCase().endsWith(".pdf")
                    ? "PDF"
                    : "IMG"}
                </div>

                <div className={styles.fileInformation}>
                  <strong>{file.name}</strong>
                  <span>
                    {formatFileSize(file.size)} · Selected locally
                  </span>
                </div>

                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={removeFile}
                  aria-label="Remove selected report"
                >
                  Remove
                </button>
              </div>
            )}

            {error && (
              <p className={styles.errorMessage} role="alert">
                {error}
              </p>
            )}

            <p className={styles.localNotice}>
              Your selected file stays in this browser. This page
              does not upload or transmit your report.
            </p>
          </section>

          <section className={styles.consentPanel}>
            <div className={styles.panelHeading}>
              <div>
                <span className={styles.panelEyebrow}>
                  PATIENT PRIVACY
                </span>
                <h3>Review consent</h3>
              </div>

              <span className={styles.stepNumber}>02</span>
            </div>

            <div className={styles.consentInformation}>
              <span className={styles.consentIcon} aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="13" width="20" height="15" rx="3" />
                  <path d="M11 13V9a5 5 0 0 1 10 0v4" />
                  <path d="M16 19v4" />
                </svg>
              </span>

              <div>
                <strong>Your report is sensitive information.</strong>
                <p>
                  Laboratory reports can contain personal health
                  information. They should only be processed through
                  an authorized, secure service with your permission.
                </p>
              </div>
            </div>

            <label className={styles.consentLabel}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                disabled={!file}
              />

              <span>
                I understand that my selected report contains
                sensitive information. I agree to its processing
                only when the laboratory&apos;s secure report
                explanation service becomes available.
              </span>
            </label>

            <div className={styles.scopeNotice}>
              <strong>What the explanation will cover</strong>

              <ul>
                <li>Laboratory parameter names</li>
                <li>Reference ranges shown on the report</li>
                <li>Plain-language explanations of report terminology</li>
              </ul>

              <p>
                It will not provide a diagnosis, prescribe treatment
                or replace advice from a qualified healthcare professional.
              </p>
            </div>

            <button
              type="button"
              className={styles.submitButton}
              disabled
              aria-describedby="integration-status"
            >
              Secure explanation not yet available
            </button>

            <p className={styles.integrationMessage} id="integration-status">
              {file && consent
                ? "Your file is selected and consent is recorded locally. Secure backend processing is still required."
                : "Select a report and review consent. Secure backend processing is still required."}
            </p>
          </section>
        </div>

        <section className={styles.bottomNotice}>
          <span className={styles.bottomMark} aria-hidden="true">
            i
          </span>

          <div>
            <h3>Your health deserves careful interpretation.</h3>
            <p>
              Do not delay a medical consultation or make treatment
              decisions based on an automated explanation. Discuss
              your results with your doctor.
            </p>
          </div>
        </section>

        <div className={styles.bottomLinks}>
          <Link href="/reports">Return to patient reports</Link>
          <Link href="/assistant">Back to AI assistant</Link>
        </div>
      </div>
    </main>
  );
}
