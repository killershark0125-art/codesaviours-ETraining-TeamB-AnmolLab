
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";

import { searchTests } from "@/lib/api/tests";
import { addTestToCart, useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import type { TestSummary } from "@/lib/types";

import styles from "./prescription-upload.module.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

type LookupStatus = "idle" | "loading" | "success" | "error";

function isSupportedFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  return (
    ["image/jpeg", "image/png", "application/pdf"].includes(file.type) ||
    ["jpg", "jpeg", "png", "pdf"].includes(extension ?? "")
  );
}

function isImageFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  return (
    file.type.startsWith("image/") ||
    ["jpg", "jpeg", "png"].includes(extension ?? "")
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getPriceLabel(test: TestSummary) {
  if (test.priceStatus !== "confirmed" || test.price === null) {
    return "Price to be confirmed";
  }

  return formatPrice(test.price);
}

export default function PrescriptionUpload() {
  const cart = useCart();

  const previewUrlRef = useRef<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisNotice, setAnalysisNotice] = useState("");

  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<TestSummary[]>([]);
  const [lookupStatus, setLookupStatus] = useState<LookupStatus>("idle");
  const [lookupError, setLookupError] = useState("");

  // Revoke the temporary image URL when this component unmounts.
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
  }, []);

  function selectFile(nextFile: File | undefined) {
    if (!nextFile) return;

    // Release the previous preview before changing the selection.
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setPreviewUrl(null);
    setFileError("");
    setAnalysisNotice("");
    setMatches([]);
    setQuery("");
    setLookupStatus("idle");
    setLookupError("");

    if (!isSupportedFile(nextFile)) {
      setFile(null);
      setFileError("Choose a JPG, PNG or PDF file.");
      return;
    }

    if (nextFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setFileError("The selected file is larger than the 10 MB limit.");
      return;
    }

    if (isImageFile(nextFile)) {
      const objectUrl = URL.createObjectURL(nextFile);

      previewUrlRef.current = objectUrl;
      setPreviewUrl(objectUrl);
    }

    setFile(nextFile);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    selectFile(event.target.files?.[0]);

    // Allows selecting the same file again after removing it.
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    selectFile(event.dataTransfer.files?.[0]);
  }

  function handleRemoveFile() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    setFile(null);
    setPreviewUrl(null);
    setFileError("");
    setAnalysisNotice("");
  }

  function handleAnalyseRequest() {
    if (!file) return;

    setAnalysisNotice(
      "Prescription recognition is awaiting the secure backend service. Your file has not been uploaded or processed. You can search the live catalogue below and manually confirm tests with your doctor.",
    );
  }

  async function handleCatalogueLookup(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const normalizedQuery = query.trim().slice(0, 80);

    if (!normalizedQuery || lookupStatus === "loading") return;

    setLookupStatus("loading");
    setLookupError("");
    setMatches([]);

    try {
      const result = await searchTests({
        query: normalizedQuery,
        category: null,
        page: 1,
        limit: 8,
      });

      setMatches(result.items);
      setLookupStatus("success");
    } catch (error) {
      setLookupError(
        error instanceof Error
          ? error.message
          : "The test catalogue could not be reached.",
      );

      setLookupStatus("error");
    }
  }

  function handleAddTest(test: TestSummary) {
    addTestToCart(test);
  }

  return (
    <div className={styles.layout}>
      <section className={styles.mainPanel}>
        <div className={styles.panelHeading}>
          <span className={styles.eyebrow}>PRESCRIPTION REVIEW</span>

          <h2>Start with your doctor&apos;s test slip.</h2>

          <p>
            Choose a clear image or PDF of the prescription. You can preview
            the file here and search the current test catalogue while
            prescription recognition is being integrated.
          </p>
        </div>

        <div className={styles.uploadSection}>
          <label
            className={`${styles.dropzone} ${file ? styles.hasFile : ""}`}
            htmlFor="prescription-file"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              id="prescription-file"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              onChange={handleFileChange}
              className={styles.fileInput}
            />

            <span className={styles.uploadIcon} aria-hidden="true">
              ↑
            </span>

            <strong>
              {file ? "Replace selected file" : "Choose a prescription file"}
            </strong>

            <span className={styles.uploadHint}>
              Browse from your device or drag and drop here
            </span>

            <span className={styles.fileFormats}>
              JPG, PNG or PDF · Maximum 10 MB
            </span>
          </label>

          {fileError && (
            <p className={styles.fileError} role="alert">
              {fileError}
            </p>
          )}

          {file && (
            <div className={styles.fileCard}>
              <div className={styles.filePreview}>
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview of selected prescription"
                    width={180}
                    height={140}
                    unoptimized
                  />
                ) : (
                  <span className={styles.pdfMark}>PDF</span>
                )}
              </div>

              <div className={styles.fileDetails}>
                <strong>{file.name}</strong>

                <span>
                  {formatFileSize(file.size)} ·{" "}
                  {isImageFile(file) ? "Image" : "PDF document"}
                </span>

                <span className={styles.localFileNote}>
                  Selected locally in this browser
                </span>
              </div>

              <button
                type="button"
                className={styles.removeFile}
                onClick={handleRemoveFile}
                aria-label="Remove selected prescription"
              >
                ×
              </button>
            </div>
          )}

          {file && (
            <div className={styles.analysisAction}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleAnalyseRequest}
              >
                Request prescription analysis
                <span aria-hidden="true">↗</span>
              </button>

              <p>
                Automated recognition is not active yet. This action does not
                upload your file.
              </p>
            </div>
          )}

          {analysisNotice && (
            <div className={styles.pendingNotice} role="status">
              <span aria-hidden="true">i</span>
              <p>{analysisNotice}</p>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        <section className={styles.manualSection}>
          <div className={styles.manualHeading}>
            <span className={styles.eyebrow}>MANUAL TEST REVIEW</span>

            <h3>Find a test in the catalogue.</h3>

            <p>
              Search for a test written on your prescription. Confirm with
              your doctor before adding it to your cart.
            </p>
          </div>

          <form
            className={styles.searchForm}
            onSubmit={handleCatalogueLookup}
          >
            <label htmlFor="prescription-test-search">
              Search by test name or code
            </label>

            <div className={styles.searchControl}>
              <input
                id="prescription-test-search"
                type="search"
                value={query}
                maxLength={80}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter a test name or code..."
                disabled={lookupStatus === "loading"}
              />

              <button
                type="submit"
                disabled={!query.trim() || lookupStatus === "loading"}
              >
                {lookupStatus === "loading" ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {lookupStatus === "error" && (
            <p className={styles.lookupError} role="alert">
              {lookupError}
            </p>
          )}

          {lookupStatus === "success" && matches.length === 0 && (
            <div className={styles.emptyResults}>
              No matching tests were found in the current catalogue. Try
              another spelling or contact the laboratory.
            </div>
          )}

          {matches.length > 0 && (
            <div className={styles.matches}>
              <div className={styles.matchesHeading}>
                <span>CATALOGUE MATCHES</span>
                <span>{matches.length} found</span>
              </div>

              {matches.map((test) => {
                const alreadyAdded = cart.some(
                  (item) => item.id === test.id,
                );

                return (
                  <article className={styles.testRow} key={test.id}>
                    <div className={styles.testInfo}>
                      <span>{test.category}</span>

                      <h4>{test.name}</h4>

                      {test.code && <small>Code: {test.code}</small>}
                    </div>

                    <div className={styles.testAction}>
                      <strong>{getPriceLabel(test)}</strong>

                      <button
                        type="button"
                        onClick={() => handleAddTest(test)}
                        disabled={alreadyAdded}
                      >
                        {alreadyAdded ? "In cart" : "Confirm & add"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </section>

      <aside className={styles.aside}>
        <div className={styles.stepBlock}>
          <span className={styles.eyebrow}>HOW THIS WILL WORK</span>

          <ol className={styles.steps}>
            <li>
              <span>01</span>

              <div>
                <strong>Select your prescription</strong>
                <p>Choose a clear photo or PDF of the test slip.</p>
              </div>
            </li>

            <li>
              <span>02</span>

              <div>
                <strong>Review detected tests</strong>
                <p>
                  Recognition will identify catalogue matches and unmatched
                  names.
                </p>
              </div>
            </li>

            <li>
              <span>03</span>

              <div>
                <strong>Confirm your selection</strong>
                <p>
                  You decide which matched tests should go into your cart.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className={styles.privacyCard}>
          <span className={styles.privacyIcon} aria-hidden="true">
            i
          </span>

          <div>
            <strong>Your prescription is private.</strong>

            <p>
              The selected file currently stays in this browser. Secure
              authenticated upload and automated recognition will be enabled
              only after backend integration.
            </p>
          </div>
        </div>

        <div className={styles.cartCard}>
          <div>
            <span className={styles.eyebrow}>YOUR SELECTION</span>
            <strong>{cart.length} tests in your cart</strong>
          </div>

          <Link href="/cart">Review cart ↗</Link>
        </div>

        <Link href="/assistant" className={styles.backLink}>
          ← Back to Anmol Assistant
        </Link>
      </aside>
    </div>
  );
}
