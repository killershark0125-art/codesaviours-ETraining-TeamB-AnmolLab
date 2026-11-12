
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";

import styles from "./contact.module.css";

type EnquiryForm = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: EnquiryForm = {
  name: "",
  phone: "",
  email: "",
  subject: "General enquiry",
  message: "",
};

export default function ContactPageClient() {
  const [form, setForm] = useState<EnquiryForm>(initialForm);
  const [notice, setNotice] = useState("");

  function updateField<K extends keyof EnquiryForm>(
    field: K,
    value: EnquiryForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = [
      "ANMOL HEALTH CARE LAB — WEBSITE ENQUIRY",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim() || "Not provided"}`,
      `Email: ${form.email.trim()}`,
      `Subject: ${form.subject}`,
      "",
      "Message:",
      form.message.trim(),
    ].join("\n");

    const subject = `Website enquiry — ${form.subject}`;

    const mailtoUrl =
      `mailto:${siteConfig.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    setNotice(
      "Your email application should open with the enquiry prepared. The message is sent only after you press Send in your email application.",
    );

    window.location.href = mailtoUrl;
  }

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <section
          className={styles.contactSection}
          aria-labelledby="contact-heading"
        >
          <div className={styles.container}>
            <div className={styles.sectionMeta}>
              <span>ANMOL HEALTH CARE LAB</span>
              <span>FAISALABAD · PAKISTAN</span>
            </div>

            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.eyebrow}>
                  GET IN TOUCH
                </span>

                <h1 id="contact-heading" className={styles.headingTitle}>
                  A direct line
                  <br />
                  to <em>the lab.</em>
                </h1>
              </div>

              <p className={styles.headingCopy}>
                Have a question about laboratory tests, need
                assistance or want to plan your visit? Reach
                Anmol Health Care Lab through the contact
                details or send an enquiry.
              </p>
            </div>

            <div className={styles.contactGrid}>
              <aside
                className={styles.detailsPanel}
                aria-label="Laboratory contact details"
              >
                <div className={styles.panelTop}>
                  <span className={styles.panelEyebrow}>
                    DIRECT CONTACT
                  </span>

                  <span className={styles.panelIndex}>01</span>
                </div>

                <h2>
                  Connect with
                  <br />
                  the laboratory.
                </h2>

                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      TELEPHONE
                    </span>

                    <div className={styles.detailValue}>
                      {siteConfig.phones.map((phone) => (
                        <a href={phone.href} key={phone.href}>
                          {phone.display}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      EMAIL
                    </span>

                    <div className={styles.detailValue}>
                      <a href={`mailto:${siteConfig.email}`}>
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      ADDRESS
                    </span>

                    <div className={styles.detailValue}>
                      <p>{siteConfig.address}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.locationBlock}>
                  <span className={styles.detailLabel}>
                    FIND THE LABORATORY
                  </span>

                  <p>
                    View the provided address and plan your
                    journey to Sultani Chowk.
                  </p>

                  <a
                    href={siteConfig.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.directionsLink}
                  >
                    Open directions
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <div className={styles.panelFooter}>
                  <span>ANMOL HEALTH CARE LAB</span>
                  <span>FAISALABAD</span>
                </div>
              </aside>

              <section
                className={styles.formPanel}
                aria-labelledby="form-heading"
              >
                <div className={styles.formHeader}>
                  <div>
                    <span className={styles.panelEyebrow}>
                      SEND AN ENQUIRY
                    </span>

                    <h2 id="form-heading">
                      What can we
                      <br />
                      help you with?
                    </h2>
                  </div>

                  <span className={styles.formIndex}>02</span>
                </div>

                <p className={styles.formDescription}>
                  Share a few details and prepare an email
                  addressed to the laboratory.
                </p>

                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                >
                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label htmlFor="contact-name">
                        Your name <span>*</span>
                      </label>

                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your name"
                        minLength={2}
                        maxLength={80}
                        required
                        value={form.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-phone">
                        Phone number
                      </label>

                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="Your contact number"
                        maxLength={25}
                        value={form.phone}
                        onChange={(event) =>
                          updateField("phone", event.target.value)
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-email">
                        Email address <span>*</span>
                      </label>

                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        maxLength={120}
                        required
                        value={form.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-subject">
                        Enquiry type
                      </label>

                      <select
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={(event) =>
                          updateField("subject", event.target.value)
                        }
                      >
                        <option>General enquiry</option>
                        <option>Test information</option>
                        <option>Booking assistance</option>
                        <option>Home sampling enquiry</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-message">
                      Your message <span>*</span>
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      minLength={10}
                      maxLength={1600}
                      placeholder="Write your enquiry here..."
                      required
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                    />

                    <span className={styles.characterCount}>
                      {form.message.length} / 1600
                    </span>
                  </div>

                  <div className={styles.formBottom}>
                    <p>
                      Please avoid including sensitive medical
                      information in a general enquiry.
                    </p>

                    <button
                      type="submit"
                      className={styles.submitButton}
                    >
                      Prepare email
                      <span aria-hidden="true">↗</span>
                    </button>
                  </div>

                  {notice && (
                    <p
                      className={styles.formNotice}
                      role="status"
                    >
                      {notice}
                    </p>
                  )}
                </form>
              </section>
            </div>

            <div className={styles.bookingCallout}>
              <div className={styles.calloutCopy}>
                <span className={styles.calloutEyebrow}>
                  02 / NEED TO ARRANGE A TEST?
                </span>

                <h2>
                  Have a test in <em>mind?</em>
                </h2>

                <p>
                  Explore the laboratory catalogue and start
                  your test selection from the booking page.
                </p>
              </div>

              <Link
                href="/book"
                className={styles.calloutButton}
              >
                Explore test booking
                <span aria-hidden="true">↗</span>
              </Link>

              <span className={styles.calloutIndex} aria-hidden="true">
                02
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
