import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import styles from "./route-loading.module.css";

type RouteLoadingProps = {
  label: string;
  variant?: "catalogue" | "cards" | "editorial";
};

export default function RouteLoading({
  label,
  variant = "editorial",
}: RouteLoadingProps) {
  const itemCount = variant === "catalogue" ? 5 : 3;

  return (
    <>
      <SiteHeader />

      <main
        className={styles.page}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span className={styles.srOnly}>
          Loading {label}. Please wait.
        </span>

        <div className={styles.container} aria-hidden="true">
          <div className={styles.hero}>
            <div className={`${styles.line} ${styles.eyebrow}`} />
            <div className={`${styles.line} ${styles.title}`} />
            <div className={`${styles.line} ${styles.titleShort}`} />
            <div className={`${styles.line} ${styles.description}`} />
            <div className={`${styles.line} ${styles.descriptionShort}`} />
          </div>

          <div
            className={
              variant === "catalogue"
                ? styles.catalogueGrid
                : variant === "cards"
                  ? styles.cardGrid
                  : styles.editorialGrid
            }
          >
            {Array.from({ length: itemCount }, (_, index) => (
              <div className={styles.skeletonCard} key={index}>
                <div className={`${styles.line} ${styles.cardEyebrow}`} />
                <div className={`${styles.line} ${styles.cardTitle}`} />
                <div className={`${styles.line} ${styles.cardText}`} />
                <div className={`${styles.line} ${styles.cardTextShort}`} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}