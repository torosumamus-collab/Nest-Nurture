import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms governing your use of ${SITE.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="July 22, 2026">
      <p>
        By accessing or using {SITE.url} (the "Site"), you agree to these Terms of Use. If you do not
        agree, please discontinue use of the Site. This is a template and should be reviewed by a
        qualified attorney before publishing.
      </p>

      <h2>Content &amp; Intellectual Property</h2>
      <p>
        All articles, images, graphics, and design elements on this Site are the property of{" "}
        {SITE.name} or its licensors and are protected by copyright and other intellectual property
        laws. You may share links to our content and quote brief excerpts with attribution, but may
        not republish, redistribute, or reproduce substantial portions without written permission.
      </p>

      <h2>Not Medical Advice</h2>
      <p>
        Content on {SITE.name}, including articles reviewed by healthcare professionals, is provided
        for general informational and educational purposes only and does not constitute medical
        advice. It is not a substitute for professional diagnosis, treatment, or the individualized
        guidance of your own doctor, midwife, or healthcare provider. Always consult a qualified
        professional with questions about a medical condition, pregnancy, or your child's health, and
        never disregard professional advice because of something you read here.
      </p>

      <h2>User Conduct</h2>
      <p>
        If we offer comments or community features, you agree not to post content that is unlawful,
        harassing, defamatory, or infringes on the rights of others. We reserve the right to remove
        content and restrict access at our discretion.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our Site may link to third-party websites, including affiliate partners (see our{" "}
        <a href="/affiliate-disclosure">Affiliate Disclosure</a>). We are not responsible for the
        content, accuracy, or practices of external sites.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        The Site is provided "as is" without warranties of any kind, express or implied. We do not
        guarantee the Site will be error-free, uninterrupted, or that content is free of inaccuracies,
        though we make reasonable efforts to keep it accurate and current.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE.name} shall not be liable for any indirect,
        incidental, or consequential damages arising from your use of, or inability to use, the Site.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Site after changes take
        effect constitutes acceptance of the revised Terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction in which {SITE.name} operates,
        without regard to conflict-of-law principles. (Update this section with your actual
        jurisdiction.)
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms can be sent to{" "}
       <a href="mailto:nestnurturemums@gmail.com">nestnurturemums@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
