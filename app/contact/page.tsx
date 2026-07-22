import type { Metadata } from "next";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
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

      <div className="mx-auto mt-8 grid max-w-4xl gap-12 lg:grid-cols-5">
        <header className="lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Get in Touch</p>
          <h1 className="mt-4 font-display text-display-md text-ink">Say hello.</h1>
          <p className="mt-4 text-brown-500 leading-relaxed">
            Pitching a story, flagging a correction, exploring a partnership, or just want to say hi —
            we read every message ourselves.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-medium text-ink">Editorial &amp; pitches</dt>
              <dd className="text-brown-500">hello@nestandnurture.com</dd>
            </div>
            <div>
              <dt className="font-medium text-ink">Partnerships</dt>
              <dd className="text-brown-500">partners@nestandnurture.com</dd>
            </div>
            <div>
              <dt className="font-medium text-ink">Response time</dt>
              <dd className="text-brown-500">2–3 business days</dd>
            </div>
          </dl>
        </header>

        <div className="lg:col-span-3">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
