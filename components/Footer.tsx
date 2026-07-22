import Link from "next/link";
import Container from "./Container";
import Newsletter from "./Newsletter";
import { FOOTER_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-beige bg-beige-100">
      <Container className="py-16">
        <Newsletter variant="footer" />

        <div className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="font-display text-xl text-ink">
              Nest &amp; Nurture
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-brown-500">
              A calmer way to raise a family — pregnancy, newborn life, and everything after.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brown-300">Read</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.read.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-brown-500 hover:text-rose-500 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brown-300">Company</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-brown-500 hover:text-rose-500 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brown-300">Legal</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-brown-500 hover:text-rose-500 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-beige-300 pt-8 sm:flex-row">
          <p className="text-xs text-brown-300">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Instagram", "Pinterest"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-xs text-brown-300 hover:text-rose-500 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
