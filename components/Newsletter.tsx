"use client";

import { useState, FormEvent } from "react";

export default function Newsletter({ variant = "inline" }: { variant?: "inline" | "footer" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Wire this up to your ESP of choice (Mailchimp, ConvertKit, Klaviyo, etc.)
    // via an API route at /app/api/subscribe/route.ts.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
    setEmail("");
  }

  const isFooter = variant === "footer";

  return (
    <div
      className={
        isFooter
          ? "rounded-xl2 bg-warm-white px-6 py-10 sm:px-12 sm:py-12 shadow-soft"
          : "rounded-xl2 bg-sage-50 px-6 py-10 sm:px-12 sm:py-14"
      }
    >
      <div className="mx-auto max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
          The Sunday Letter
        </p>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ink">
          One thoughtful email a week, not a hundred.
        </h2>
        <p className="mt-3 text-sm text-brown-500">
          Our favorite reads, gentle reminders, and nothing that will make you feel behind.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row" noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full flex-1 rounded-full border border-beige-400 bg-warm-white px-5 py-3 text-sm text-ink placeholder:text-brown-300 focus:border-sage-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="whitespace-nowrap rounded-full bg-brown px-6 py-3 text-sm font-medium text-warm-white transition-colors hover:bg-brown-700 disabled:opacity-60"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>

        <div role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm">
          {status === "success" && (
            <span className="text-sage-600">You're in. Welcome to the letter.</span>
          )}
          {status === "error" && (
            <span className="text-rose-500">Please enter a valid email address.</span>
          )}
        </div>

        <p className="mt-2 text-xs text-brown-300">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
