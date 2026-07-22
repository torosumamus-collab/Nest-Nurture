import { ReactNode } from "react";
import Container from "./Container";
import Breadcrumbs from "./Breadcrumbs";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <header className="mx-auto mt-8 max-w-content">
        <h1 className="font-display text-display-lg text-ink">{title}</h1>
        <p className="mt-3 text-sm text-brown-300">Last updated: {updated}</p>
      </header>
      <div className="article-content mx-auto mt-10 max-w-content">{children}</div>
    </Container>
  );
}
