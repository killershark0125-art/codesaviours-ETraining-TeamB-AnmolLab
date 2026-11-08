
"use client";

import { useEffect, useState } from "react";
import type { Branch } from "@/lib/types";
import { getBranches } from "@/lib/api/branches";

import styles from "./branch-directory.module.css";

type RequestStatus = "loading" | "success" | "error";

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

    return () => {
      controller.abort();
    };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setErrorMessage("");
    setAttempt((current) => current + 1);
  }

  function getPhoneHref(phone: string) {
    return `tel:${phone.replace(/[^\d+]/g, "")}`;
  }

  return (
    <section
      id="branches"
      className={styles.section}
      aria-labelledby="branches-title"
    >
      <div className="container">
        <div className={styles.heading}>
          <div>
            <span className="section-number">
              06 / OUR LOCATIONS
            </span>

            <h2
              id="branches-title"
              className="section-heading"
            >
              Find your way to <em>Anmol Lab.</em>
            </h2>
          </div>

          <p className={styles.intro}>
            Explore our laboratory locations and find the
            information you need before planning your visit.
          </p>
        </div>

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
              <span aria-hidden="true">↗</span>
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
            {branches.map((branch, index) => (
              <article
                className={styles.branchCard}
                key={branch.id}
              >
                <div className={styles.cardTop}>
                  <span className={styles.branchIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.activeLabel}>
                    Active location
                  </span>
                </div>

                <div className={styles.cardContent}>
                  <span className={styles.cardEyebrow}>
                    LABORATORY LOCATION
                  </span>

                  <h3>{branch.name}</h3>

                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>
                      ADDRESS
                    </span>

                    <p>{branch.address}</p>
                  </div>

                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>
                      CONTACT
                    </span>

                    <a href={getPhoneHref(branch.phone)}>
                      {branch.phone}
                    </a>
                  </div>

                  <div className={styles.detail}>
                    <span className={styles.detailLabel}>
                      OPERATING HOURS
                    </span>

                    <p>{branch.timings}</p>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  {branch.directionsUrl ? (
                    <a
                      className={styles.directionsLink}
                      href={branch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get directions
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className={styles.noDirections}>
                      Directions not available
                    </span>
                  )}
                </div>

                {branch.mapEmbedUrl && (
                  <div className={styles.mapFrame}>
                    <iframe
                      src={branch.mapEmbedUrl}
                      title={`Map showing ${branch.name}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
