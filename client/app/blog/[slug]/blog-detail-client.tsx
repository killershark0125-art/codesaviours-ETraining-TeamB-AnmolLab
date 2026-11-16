
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

import {
  fetchJson,
  getApiBaseUrl,
} from "@/lib/api/http";

import styles from "./blog-detail.module.css";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string | null;
  category: string;
  author: string;
  publishedAt: string | null;
};

type LoadStatus = "loading" | "success" | "error" | "not-found";

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function readText(value: unknown): string {
  if (typeof value === "string") return value.trim();

  if (typeof value === "number") return String(value);

  if (Array.isArray(value)) {
    return value.map(readText).filter(Boolean).join("\n\n");
  }

  if (isRecord(value)) {
    for (const key of ["text", "content", "value", "name", "url"]) {
      const result = readText(value[key]);
      if (result) return result;
    }
  }

  return "";
}

function firstText(
  record: Record<string, unknown>,
  keys: string[],
): string {
  for (const key of keys) {
    const value = readText(record[key]);
    if (value) return value;
  }

  return "";
}

function getPosts(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  if (!isRecord(payload)) return [];

  const candidates = [
    payload.data,
    payload.posts,
    payload.items,
    payload.results,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;

    if (isRecord(candidate)) {
      for (const key of ["posts", "items", "results"]) {
        if (Array.isArray(candidate[key])) {
          return candidate[key] as unknown[];
        }
      }
    }
  }

  return [];
}

function normalizePost(value: unknown): BlogPost | null {
  if (!isRecord(value)) return null;

  const slug = firstText(value, ["slug"]);
  const title = firstText(value, ["title", "name"]);

  if (!slug || !title) return null;

  const image = firstText(value, [
    "imageUrl",
    "coverImage",
    "featuredImage",
    "thumbnail",
    "image",
  ]);

  return {
    id: firstText(value, ["_id", "id"]) || slug,
    slug,
    title,
    excerpt: firstText(value, [
      "excerpt",
      "summary",
      "description",
    ]),
    content: firstText(value, [
      "content",
      "body",
      "article",
      "description",
    ]),
    imageUrl: image || null,
    category: firstText(value, ["category", "categoryName"]) ||
      "LAB JOURNAL",
    author: firstText(value, ["author", "authorName"]) ||
      "Anmol Health Care Lab",
    publishedAt: firstText(value, [
      "publishedAt",
      "createdAt",
      "date",
    ]) || null,
  };
}

function formatDate(value: string | null): string | null {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function splitContent(content: string): string[] {
  return content
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function BlogDetailClient({
  slug,
}: {
  slug: string;
}) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const baseUrl = getApiBaseUrl();
    const controller = new AbortController();

    if (!baseUrl) {
      setError("The blog service is not configured.");
      setStatus("error");
      return () => controller.abort();
    }

    setStatus("loading");
    setError("");
    setPost(null);

    const url = new URL("/api/posts/getAllPosts", baseUrl);

    fetchJson(url, controller.signal)
      .then((payload: unknown) => {
        if (controller.signal.aborted) return;

        const posts = getPosts(payload)
          .map(normalizePost)
          .filter((item): item is BlogPost => item !== null);

        const matchingPost = posts.find(
          (item) => item.slug === slug,
        );

        if (!matchingPost) {
          setStatus("not-found");
          return;
        }

        setPost(matchingPost);
        setStatus("success");
      })
      .catch((requestError: unknown) => {
        if (controller.signal.aborted) return;

        setError(
          requestError instanceof Error
            ? requestError.message
            : "The article could not be loaded.",
        );

        setStatus("error");
      });

    return () => controller.abort();
  }, [slug]);

  const publishedDate = formatDate(post?.publishedAt ?? null);
  const readingTime = post
    ? getReadingTime(post.content)
    : null;

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <div className={styles.shell}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">Journal</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">
              {post?.title ?? "Article"}
            </span>
          </nav>

          {status === "loading" && (
            <section className={styles.state} role="status">
              <span className={styles.spinner} />
              <h1>Loading article</h1>
              <p>Retrieving the article from the laboratory journal.</p>
            </section>
          )}

          {status === "error" && (
            <section className={styles.state} role="alert">
              <span className={styles.stateEyebrow}>
                JOURNAL UNAVAILABLE
              </span>
              <h1>We couldn't load this article.</h1>
              <p>{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
              <Link href="/blog">Return to journal</Link>
            </section>
          )}

          {status === "not-found" && (
            <section className={styles.state}>
              <span className={styles.stateEyebrow}>
                ARTICLE NOT FOUND
              </span>
              <h1>This page isn't available.</h1>
              <p>
                The article may have been removed, unpublished or
                the address may be incorrect.
              </p>
              <Link href="/blog">Explore the journal</Link>
            </section>
          )}

          {status === "success" && post && (
            <article className={styles.article}>
              <header className={styles.articleHeader}>
                <span className={styles.eyebrow}>
                  {post.category}
                </span>

                <h1>{post.title}</h1>

                {post.excerpt && (
                  <p className={styles.excerpt}>
                    {post.excerpt}
                  </p>
                )}

                <div className={styles.metadata}>
                  <span>{post.author}</span>

                  {publishedDate && (
                    <>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.publishedAt ?? undefined}>
                        {publishedDate}
                      </time>
                    </>
                  )}

                  {readingTime !== null && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{readingTime} min read</span>
                    </>
                  )}
                </div>
              </header>

              {post.imageUrl &&
                /^https?:\/\//i.test(post.imageUrl) && (
                  <div
                    className={styles.cover}
                    role="img"
                    aria-label={`Cover image for ${post.title}`}
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(15, 20, 55, 0.45), rgba(15, 20, 55, 0.04)), url("${encodeURI(post.imageUrl)}")`,
                    }}
                  />
                )}

              <div className={styles.articleLayout}>
                <div className={styles.articleBody}>
                  {post.content ? (
                    splitContent(post.content).map(
                      (paragraph, index) => (
                        <p key={`${post.id}-${index}`}>
                          {paragraph}
                        </p>
                      ),
                    )
                  ) : (
                    <p className={styles.emptyContent}>
                      The article does not have published content yet.
                    </p>
                  )}
                </div>

                <aside className={styles.articleAside}>
                  <span>ANMOL HEALTH CARE LAB</span>
                  <p>
                    Precision in every test. Care in every patient.
                  </p>
                  <Link href="/contact">Contact the laboratory →</Link>
                </aside>
              </div>

              <footer className={styles.articleFooter}>
                <Link href="/blog">← Back to all articles</Link>
                <Link href="/tests">Explore laboratory tests →</Link>
              </footer>
            </article>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
