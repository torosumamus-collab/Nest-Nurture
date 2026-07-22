import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `How ${SITE.name} uses affiliate links and how we choose what to recommend.`,
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage title="Affiliate Disclosure" updated="July 22, 2026">
      <p>
        {SITE.name} is reader-supported. Some links on this Site — in articles, resource lists, or
        product roundups — are affiliate links, which means we may earn a small commission if you
        make a purchase through them, at no additional cost to you. This is disclosed here in
        accordance with the FTC's guidelines on endorsements and testimonials.
      </p>

      <h2>How This Works</h2>
      <p>
        When you click an affiliate link and complete a qualifying purchase, the retailer or brand
        pays us a small referral fee. This helps support the research, writing, and editing that goes
        into our content, and allows us to keep {SITE.name} free to read.
      </p>

      <h2>Our Editorial Standards</h2>
      <p>
        Affiliate relationships never influence our editorial opinions or recommendations. We only
        recommend products, services, or resources we genuinely believe are useful, and our writers
        do not know which links are monetized while drafting an article's actual guidance. If we
        haven't tried something ourselves, we say so.
      </p>

      <h2>Where You'll See These Links</h2>
      <p>
        Affiliate links may appear in product recommendations, gift guides, gear reviews, and
        occasionally within regular articles when a specific product is relevant to the topic. Posts
        containing affiliate links include a short reminder near the end of the article, alongside a
        link back to this page.
      </p>

      <h2>Questions</h2>
      <p>
        If you have questions about a specific link or partnership, reach out at{" "}
        <a href="mailto:hello@nestandnurture.com">hello@nestandnurture.com</a>.
      </p>
    </LegalPage>
  );
}
