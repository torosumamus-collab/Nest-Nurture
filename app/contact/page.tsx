import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE.name} team — pitches, partnerships, corrections, or just to say hello.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Get in Touch</p>
        <h1 className="mt-4 font-display text-display-md text-ink">Say hello.</h1>
        <p className="mt-4 text-brown-500 leading-relaxed">
          Pitching a story, flagging a correction, exploring a partnership, or just want to say hi —
          we read every message ourselves.
        </p>

        <div className="mt-10 inline-flex flex-col items-center gap-2 rounded-xl2 bg-warm-white px-10 py-8 shadow-card">
          <span className="text-sm font-medium text-ink">Email us</span>
          <a
            href="mailto:nestnurturemums@gmail.com"
            className="font-display text-2xl text-brown-700 hover:text-brown-500"
          >
            nestnurturemums@gmail.com
          </a>
          <span className="mt-2 text-xs text-brown-400">We typically respond within 2-3 business days.</span>
        </div>
      </div>
    </Container>
  );
}
