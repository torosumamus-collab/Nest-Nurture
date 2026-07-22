import Link from "next/link";
import Container from "./Container";
import { NAV_LINKS, SITE } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-beige/70 bg-cream/90 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl tracking-tight text-ink hover:text-brown transition-colors"
            aria-label={`${SITE.name} home`}
          >
            <span className="italic">Nest</span>
            <span className="mx-1 text-rose-400" aria-hidden="true">
              &amp;
            </span>
            Nurture
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-brown-700 hover:text-rose-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-sage-300 hover:bg-sage-400 transition-colors px-5 py-2.5 text-sm font-medium text-white shadow-soft"
            >
              Say Hello
            </Link>
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
