import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import Breadcrumbs from "@/components/Breadcrumbs";
import Newsletter from "@/components/Newsletter";
import { AUTHORS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${SITE.name} — why we started it, what we believe, and who's writing.`,
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Evidence-informed, never alarmist",
    body: "We fact-check our health and development content and have it reviewed by qualified professionals. We aim to inform, not frighten.",
  },
  {
    title: "No single 'right' way to parent",
    body: "We write from experience and research, not dogma. What works for one family may not work for yours, and that's fine.",
  },
  {
    title: "Your time is limited — we respect it",
    body: "Clear, well-edited writing without padding. If an article doesn't earn its length, we cut it.",
  },
  {
    title: "Calm over clickbait",
    body: "No fear-based headlines, no manufactured urgency. Parenting is hard enough without a website adding to the noise.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <header className="mx-auto mt-8 max-w-content text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Our Story</p>
          <h1 className="mt-4 font-display text-display-lg text-ink">
            Parenting writing that feels like a trusted friend.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-brown-500">
            {SITE.name} started in a rocking chair at 4 a.m., during the kind of newborn fog that makes
            every parenting website feel like it's shouting. We wanted something else: writing that was
            honest, well-researched, and calm enough to actually read while exhausted. That's still the
            only editorial standard we hold ourselves to.
          </p>
        </header>
      </Container>

      <section className="bg-beige-100 py-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl2 bg-warm-white p-8 shadow-card">
                <h2 className="font-display text-xl text-ink">{v.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-brown-500">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-center font-display text-display-md text-ink">Who's Writing</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-brown-500">
            A small team of writers, one medical reviewer, and a strict "would we send this to a friend"
            editorial bar.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {AUTHORS.map((author) => (
              <div key={author.slug} className="text-center">
                <span className="relative mx-auto block h-24 w-24 overflow-hidden rounded-full bg-sage-100">
                  <Image src={author.avatar} alt="" fill className="object-cover" />
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">{author.name}</h3>
                <p className="text-xs uppercase tracking-wide text-rose-500">{author.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-brown-500">{author.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container narrow>
          <Newsletter />
        </Container>
      </section>
    </>
  );
}
