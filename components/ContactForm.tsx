"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please share your name.";
    if (!email.includes("@")) nextErrors.email = "Please enter a valid email address.";
    if (message.length < 10) nextErrors.message = "Tell us a little more — at least 10 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      // Wire this to a real handler at /app/api/contact/route.ts
      // (e.g. forwarding to Resend, Postmark, or a CRM).
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl2 bg-sage-50 p-8 text-center" role="status">
        <p className="font-display text-xl text-ink">Message sent.</p>
        <p className="mt-2 text-sm text-brown-500">
          Thank you for reaching out — we'll get back to you within a few business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-xl2 bg-warm-white p-8 shadow-card">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="w-full rounded-lg border border-beige-400 bg-cream px-4 py-3 text-sm text-ink placeholder:text-brown-300 focus:border-sage-400 focus:outline-none"
          placeholder="Jane Doe"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs text-rose-500">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full rounded-lg border border-beige-400 bg-cream px-4 py-3 text-sm text-ink placeholder:text-brown-300 focus:border-sage-400 focus:outline-none"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-rose-500">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full rounded-lg border border-beige-400 bg-cream px-4 py-3 text-sm text-ink focus:border-sage-400 focus:outline-none"
          defaultValue="General"
        >
          <option>General</option>
          <option>Story Pitch</option>
          <option>Partnership</option>
          <option>Correction</option>
          <option>Press</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="w-full resize-none rounded-lg border border-beige-400 bg-cream px-4 py-3 text-sm text-ink placeholder:text-brown-300 focus:border-sage-400 focus:outline-none"
          placeholder="Tell us what's on your mind…"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-rose-500">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-rose-500">
          Something went wrong sending your message. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brown px-6 py-3.5 text-sm font-medium text-warm-white transition-colors hover:bg-brown-700 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
