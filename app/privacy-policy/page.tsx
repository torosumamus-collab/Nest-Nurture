import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 22, 2026">
      <p>
        {SITE.name} ("we," "us," or "our") respects your privacy. This policy explains what
        information we collect when you visit {SITE.url}, how we use it, and the choices you have.
        This is a template and should be reviewed by a qualified attorney before publishing, as
        requirements vary by jurisdiction (e.g. GDPR, CCPA/CPRA).
      </p>

      <h2>Information We Collect</h2>
      <p>We collect information in a few different ways:</p>
      <ul>
        <li>
          <strong>Information you provide directly</strong> — such as your name and email address
          when you subscribe to our newsletter, submit a contact form, or leave a comment.
        </li>
        <li>
          <strong>Automatically collected information</strong> — including IP address, browser type,
          device information, pages visited, and referring URLs, gathered via cookies and similar
          technologies (e.g. analytics tools).
        </li>
        <li>
          <strong>Cookies</strong> — small data files used to remember preferences, understand site
          usage, and, where applicable, serve relevant content or ads.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To deliver the newsletter and respond to inquiries you send us</li>
        <li>To understand how our site is used and improve content and performance</li>
        <li>To detect, prevent, and address technical issues or abuse</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>Sharing of Information</h2>
      <p>
        We do not sell your personal information. We may share limited data with trusted service
        providers who help us operate the site (e.g. email delivery, hosting, analytics), each bound
        by their own confidentiality and data-protection obligations, or when required by law.
      </p>

      <h2>Your Choices</h2>
      <ul>
        <li>Unsubscribe from our newsletter at any time via the link in every email</li>
        <li>Adjust cookie preferences through your browser settings</li>
        <li>Request access to, correction of, or deletion of your personal data by contacting us</li>
      </ul>

      <h2>Children's Privacy</h2>
      <p>
        {SITE.name} is intended for adult readers. We do not knowingly collect personal information
        from children under 13 (or the relevant age of digital consent in your jurisdiction).
      </p>

      <h2>Data Retention &amp; Security</h2>
      <p>
        We retain personal data only as long as needed for the purposes described above and use
        reasonable technical and organizational measures to protect it. No method of transmission or
        storage is completely secure.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy periodically. Material changes will be reflected by an updated
        "Last updated" date above.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href="mailto:hello@nestandnurture.com">hello@nestandnurture.com</a>.
      </p>
    </LegalPage>
  );
}
