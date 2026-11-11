
"use client";

import { useEffect, useState } from "react";

import type { Branch } from "@/lib/types";
import { getBranches } from "@/lib/api/branches";

import styles from "./branch-directory.module.css";

type RequestStatus = "loading" | "success" | "error";

function getPhoneHref(phone: string) {
  const sanitizedPhone = phone.replace(/[^\d+]/g, "");

  return /\d/.test(sanitizedPhone)
    ? `tel:${sanitizedPhone}`
    : null;
}

function getSafeExternalUrl(value: string | null | undefined) {
  if (!value) return null;

  try {
    const url = new URL(value);

    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export default function BranchDirectory() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [status, setStatus] = useState<RequestStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getBranches(controller.signal)
      .then((items) => {
        if (controller.signal.aborted) return;

        setBranches(items);
        setStatus("success");
        setErrorMessage("");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load laboratory locations.",
        );

        setStatus("error");
      });

    return () => controller.abort();
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setErrorMessage("");
    setAttempt((current) => current + 1);
  }

  return (
    <section
      id="branches"
      className={styles.section}
      aria-labelledby="branches-title"
    >
      <div className={styles.container}>
        <div className={styles.meta}>
          <span>06 / OUR LOCATIONS</span>
          <span>VISIT ANMOL LAB</span>
        </div>

        <header className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>
              FIND US NEAR YOU
            </span>

            <h2
              id="branches-title"
              className={styles.headingTitle}
            >
              Find your way to
              <em> Anmol Lab.</em>
            </h2>
          </div>

          <p className={styles.intro}>
            Explore our laboratory locations and find the
            information you need before planning your visit.
          </p>
        </header>

        {status === "loading" && (
          <div
            className={styles.state}
            role="status"
            aria-live="polite"
          >
            <span
              className={styles.spinner}
              aria-hidden="true"
            />

            <strong>Loading laboratory locations</strong>

            <p>
              Retrieving current branch information.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className={styles.state} role="alert">
            <span className={styles.stateEyebrow}>
              LOCATION INFORMATION
            </span>

            <h3>Locations are temporarily unavailable.</h3>

            <p>{errorMessage}</p>

            <button
              type="button"
              className={styles.retryButton}
              onClick={retry}
            >
              Try again
            </button>
          </div>
        )}

        {status === "success" && branches.length === 0 && (
          <div className={styles.state}>
            <span className={styles.stateEyebrow}>
              LOCATION INFORMATION
            </span>

            <h3>No active branches are listed.</h3>

            <p>
              Laboratory location information is currently
              unavailable. Please check again later.
            </p>
          </div>
        )}

        {status === "success" && branches.length > 0 && (
          <div className={styles.branchGrid}>
            {branches.map((branch, index) => {
              const phoneHref = getPhoneHref(branch.phone);
              const directionsUrl = getSafeExternalUrl(
                branch.directionsUrl,
              );
              const mapEmbedUrl = getSafeExternalUrl(
                branch.mapEmbedUrl,
              );

              return (
                <article
                  className={styles.branchCard}
                  key={branch.id}
                >
                  <div className={styles.cardTop}>
                    <span className={styles.branchIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={styles.cardEyebrow}>
                      LABORATORY LOCATION
                    </span>
                  </div>

                  <div className={styles.cardContent}>
                    <h3>{branch.name}</h3>

                    <div className={styles.details}>
                      <div className={styles.detail}>
                        <span className={styles.detailLabel}>
                          ADDRESS
                        </span>

                        <p>{branch.address}</p>
                      </div>

                      {branch.phone && (
                        <div className={styles.detail}>
                          <span className={styles.detailLabel}>
                            CONTACT
                          </span>

                          {phoneHref ? (
                            <a href={phoneHref}>
                              {branch.phone}
                            </a>
                          ) : (
                            <p>{branch.phone}</p>
                          )}
                        </div>
                      )}

                      {branch.timings && (
                        <div className={styles.detail}>
                          <span className={styles.detailLabel}>
                            HOURS
                          </span>

                          <p>{branch.timings}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    {directionsUrl ? (
                      <a
                        className={styles.directionsLink}
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get directions to ${branch.name}`}
                      >
                        Get directions
                      </a>
                    ) : (
                      <span className={styles.noDirections}>
                        Directions not available
                      </span>
                    )}
                  </div>

                  {mapEmbedUrl && (
                    <div className={styles.mapFrame}>
                      <iframe
                        src={mapEmbedUrl}
                        title={`Map showing ${branch.name}`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
