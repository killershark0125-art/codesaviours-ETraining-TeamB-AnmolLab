
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { searchTests } from "@/lib/api/tests";
import { addTestToCart, useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import type { TestSummary } from "@/lib/types";

import styles from "./ai-assistant.module.css";

type MessageRole = "guide" | "user" | "catalogue" | "error";

type AssistantMessage = {
  id: string;
  role: MessageRole;
  text: string;
  tests?: TestSummary[];
};

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getPriceLabel(test: TestSummary) {
  if (test.priceStatus !== "confirmed" || test.price === null) {
    return "Price to be confirmed";
  }

  return formatPrice(test.price);
}

export default function AiAssistant() {
  const cart = useCart();
  const messageEndRef = useRef<HTMLDivElement>(null);

  const [question, setQuestion] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "welcome",
      role: "guide",
      text:
        "Welcome to Anmol Lab. I can help you find entries in the laboratory test catalogue. Search using a test name or code to see matching tests and their published pricing.",
    },
  ]);

  const cartCount = cart.length;

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isSearching]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = question.trim().slice(0, 80);

    if (!query || isSearching) return;

    setQuestion("");
    setMessages((current) => [
      ...current,
      {
        id: createMessageId(),
        role: "user",
        text: query,
      },
    ]);

    setIsSearching(true);

    try {
      const result = await searchTests({
        query,
        category: null,
        page: 1,
        limit: 6,
      });

      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "catalogue",
          text:
            result.items.length > 0
              ? `Here are the catalogue entries matching "${query}". Review each entry before adding it to your cart. A catalogue match is not a medical recommendation.`
              : `No matching catalogue entries were returned for "${query}". Try a shorter test name or its code, or consult the laboratory for assistance.`,
          tests: result.items,
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "error",
          text:
            error instanceof Error
              ? error.message
              : "The laboratory catalogue could not be reached. Please try again.",
        },
      ]);
    } finally {
      setIsSearching(false);
    }
  }

  function handleAddToCart(test: TestSummary) {
    addTestToCart(test);
  }

  return (
    <section className={styles.workspace} aria-label="Anmol Lab assistant">
      <div className={styles.chatPanel}>
        <div className={styles.chatHeader}>
          <div className={styles.assistantIdentity}>
<div className={styles.assistantMark}>
  <Image
    src="/brand/microscope-icon-white.png"
    alt=""
    width={32}
    height={38}
    priority
  />
</div>

            <div>
              <span className={styles.panelEyebrow}>ANMOL HEALTH CARE LAB</span>
              <h2>Anmol Assistant</h2>
              <p>Laboratory catalogue guide</p>
            </div>
          </div>

          <span className={styles.connectionState}>
            Catalogue lookup
          </span>
        </div>

        <div
          className={styles.messages}
          aria-live="polite"
          aria-label="Conversation"
        >
          <div className={styles.dateDivider}>
            <span>CONVERSATION</span>
          </div>

          {messages.map((message) => (
            <article
              key={message.id}
              className={`${styles.message} ${
                message.role === "user"
                  ? styles.userMessage
                  : message.role === "error"
                    ? styles.errorMessage
                    : styles.guideMessage
              }`}
            >
              {message.role !== "user" && (
                <span className={styles.messageLabel}>
                  {message.role === "error"
                    ? "CONNECTION NOTICE"
                    : message.role === "catalogue"
                      ? "CATALOGUE RESULTS"
                      : "ANMOL LAB GUIDE"}
                </span>
              )}

              <p>{message.text}</p>

              {message.tests && message.tests.length > 0 && (
                <div className={styles.resultList}>
                  {message.tests.map((test) => {
                    const alreadyAdded = cart.some(
                      (item) => item.id === test.id,
                    );

                    return (
                      <div className={styles.resultCard} key={test.id}>
                        <div className={styles.resultCopy}>
                          <span className={styles.resultCategory}>
                            {test.category}
                          </span>

                          <h3>{test.name}</h3>

                          {test.code && (
                            <span className={styles.resultCode}>
                              Code: {test.code}
                            </span>
                          )}
                        </div>

                        <div className={styles.resultAction}>
                          <strong>{getPriceLabel(test)}</strong>

                          <button
                            type="button"
                            className={styles.addButton}
                            onClick={() => handleAddToCart(test)}
                            disabled={alreadyAdded}
                          >
                            {alreadyAdded ? "In cart" : "Add to cart"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {message.role === "catalogue" &&
                message.tests?.length === 0 && (
                  <Link href="/tests" className={styles.inlineLink}>
                    Browse the complete test catalogue
                  </Link>
                )}
            </article>
          ))}

          {isSearching && (
            <div className={styles.loadingMessage} role="status">
              <span className={styles.loadingDots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>Searching the laboratory catalogue...</span>
            </div>
          )}

          <div ref={messageEndRef} />
        </div>

        <div className={styles.composerArea}>
          <form className={styles.composer} onSubmit={handleSubmit}>
            <label className={styles.srOnly} htmlFor="assistant-question">
              Search the test catalogue
            </label>

            <input
              id="assistant-question"
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Enter a test name or code..."
              maxLength={80}
              disabled={isSearching}
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={!question.trim() || isSearching}
              aria-label="Search catalogue"
            >
              <span aria-hidden="true">↑</span>
            </button>
          </form>

          <p className={styles.composerHint}>
            Search the published catalogue. Do not enter sensitive medical
            information here.
          </p>
        </div>
      </div>

      <aside className={styles.sidePanel}>
        <div className={styles.sideSection}>
          <span className={styles.panelEyebrow}>YOUR NEXT STEP</span>
          <h2>Continue with confidence.</h2>
          <p>
            Review available catalogue entries, check your selected tests and
            continue when you are ready.
          </p>

          <Link href="/cart" className={styles.cartAction}>
            <span>Open your cart</span>
            <span className={styles.cartCount}>{cartCount}</span>
          </Link>

          <Link href="/tests" className={styles.secondaryAction}>
            Browse all tests
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className={styles.sideDivider} />

        <div className={styles.sideSection}>
          <span className={styles.panelEyebrow}>PRESCRIPTION ASSISTANCE</span>
          <h3>Have a doctor&apos;s test slip?</h3>
          <p>
            Select a prescription image or PDF and review the available
            catalogue entries manually while automated recognition is being
            connected.
          </p>

          <Link
            href="/assistant/prescription"
            className={styles.prescriptionAction}
          >
            Review a prescription
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className={styles.safetyNote}>
          <span className={styles.safetyIcon} aria-hidden="true">
            i
          </span>
          <div>
            <strong>Important health notice</strong>
            <p>
              This assistant does not give medical advice, diagnose conditions
              or recommend which tests you need. Please consult your doctor
              about medical decisions.
            </p>
          </div>
        </div>

        <div className={styles.integrationNote}>
          <span className={styles.integrationDot} />
          AI conversation service awaits backend integration
        </div>
      </aside>
    </section>
  );
}
