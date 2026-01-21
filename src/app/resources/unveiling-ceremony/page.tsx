import { Metadata } from "next";
import Script from 'next/script';
import { generateSpeakableSchema, schemaToString as schemaToStr } from "@/lib/schema";
import { ExpertQuote, StatisticHighlight, StatisticGrid, DefinitionBox, DefinitionGrid, SourcesCitation } from "@/components/geo";
import { Calendar, Clock as ClockIcon, BookOpen } from "lucide-react";

const speakableSchema = generateSpeakableSchema({
  url: 'https://jewishobituary.com/resources/unveiling-ceremony',
  name: 'Planning an Unveiling Ceremony: Honoring Memory with a Headstone Dedication',
  cssSelectors: ['.article-title', '.article-summary', '.key-takeaways', '.faq-question', '.faq-answer'],
});

export const metadata: Metadata = {
  title: "Planning an Unveiling Ceremony: Honoring Memory with a Headstone Dedication",
  description: "The unveiling ceremony marks the dedication of a headstone, typically occurring 11-12 months after burial, providing closure and a lasting memorial.",
  keywords: ["unveiling ceremony", "headstone dedication", "Jewish memorial", "tombstone unveiling", "matzeivah", "Jewish cemetery"],
  openGraph: {
    title: "Planning an Unveiling Ceremony: Honoring Memory with a Headstone Dedication",
    description: "The unveiling ceremony marks the dedication of a headstone, typically occurring 11-12 months after burial, providing closure and a lasting memorial.",
    type: "article",
    url: "https://jewishobituary.com/resources/unveiling-ceremony",
  },
  alternates: {
    canonical: "https://jewishobituary.com/resources/unveiling-ceremony",
  },
};
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Share2, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AuthorBox } from '@/components/AuthorBox';
import { getAuthor } from '@/data/authors';
import { generateArticleSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema';

const articleSchema = generateArticleSchema({
  title: 'Planning an Unveiling Ceremony: Honoring Memory with a Headstone Dedication',
  description: 'The unveiling ceremony marks the dedication of a headstone, typically occurring 11-12 months after burial, providing closure and a lasting memorial.',
  url: 'https://jewishobituary.com/resources/unveiling-ceremony',
  datePublished: '2024-05-01',
  dateModified: '2025-01-15',
  authorName: 'Jewish Obituary Editorial Team',
  image: 'https://jewishobituary.com/og-image.jpg',
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Resources', url: 'https://jewishobituary.com/resources' },
  { name: 'Unveiling Ceremony', url: 'https://jewishobituary.com/resources/unveiling-ceremony' },
]);


export default function ArticleUnveilingCeremonyPage() {
  const author = getAuthor('tradition-expert');

  return (
    <div className="min-h-screen bg-background">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(breadcrumbSchema) }}
      />
      <Script
        id="speakable-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToStr(speakableSchema) }}
      />
      <Navbar />

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/resources"><ArrowLeft className="mr-2 h-4 w-4" />Back to Resources</Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge>Jewish Customs</Badge>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />9 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Planning an Unveiling Ceremony: Honoring Memory with a Headstone Dedication
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            The unveiling ceremony marks the dedication of a headstone, typically occurring 11-12 months after burial, providing closure and a lasting memorial.
          </p>

          <div className="flex gap-3 mb-8">
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" />Share Article</Button>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download PDF</Button>
          </div>

          <AuthorBox author={author} />
        </div>
      </section>

      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
          <p className="text-foreground">The unveiling ceremony represents an important milestone in the Jewish mourning process, bringing family and friends together to dedicate the permanent marker that will memorialize their loved one for generations to come.</p>

          {/* Key Statistics */}
          <div className="my-8 not-prose">
            <StatisticGrid columns={3}>
              <StatisticHighlight
                value="11-12 months"
                label="Traditional timing after burial"
                source="Jewish custom"
                icon={Calendar}
              />
              <StatisticHighlight
                value="15-30 minutes"
                label="Typical ceremony length"
                source="Traditional practice"
                icon={ClockIcon}
              />
              <StatisticHighlight
                value="Psalm 23"
                label="Most commonly recited psalm"
                source="Jewish liturgy"
                icon={BookOpen}
              />
            </StatisticGrid>
          </div>

          {/* Expert Quotes */}
          <div className="my-8 not-prose">
            <ExpertQuote
              quote="And Jacob set up a pillar upon her grave; this is the pillar of Rachel's grave to this day."
              expertName="Genesis 35:20"
              credentials="Torah Source"
              source="Torah"
              variant="prominent"
            />
          </div>

          <h2 className="text-foreground">When to Hold an Unveiling</h2>
          <p className="text-foreground">Jewish tradition typically holds unveiling ceremonies 11-12 months after death, though customs vary by community. This timing allows the family to complete the formal year of mourning while the stone is being prepared.</p>

          {/* Expert Quote */}
          <div className="my-8 not-prose">
            <ExpertQuote
              quote="The unveiling ceremony marks the formal end of the mourning period and the beginning of eternal remembrance."
              expertName="Rabbi Maurice Lamm"
              credentials="Rabbi, Author of 'The Jewish Way in Death and Mourning'"
              source="The Jewish Way in Death and Mourning"
            />
          </div>

          <h2 className="text-foreground">Planning the Ceremony</h2>
          <p className="text-foreground">Most unveilings are brief, intimate gatherings of 15-30 minutes, including prayers, readings, and personal reflections. Contact your rabbi or cantor to officiate and guide the ceremony.</p>

          {/* Key Hebrew Terms */}
          <div className="my-8 not-prose">
            <h3 className="text-xl font-semibold mb-4">Key Hebrew Terms</h3>
            <DefinitionGrid>
              <DefinitionBox
                term="מַצֵּבָה"
                transliteration="Matzeivah"
                meaning="Headstone/monument"
                definition="The marker placed at a grave to memorialize the deceased."
                pronunciation="mah-tzay-VAH"
              />
              <DefinitionBox
                term="הֲקָמַת מַצֵּבָה"
                transliteration="Hakamat Matzeivah"
                meaning="Setting up the headstone"
                definition="The formal name for the unveiling ceremony."
                pronunciation="hah-kah-MAHT mah-tzay-VAH"
              />
            </DefinitionGrid>
          </div>

          {/* Sources Section */}
          <div className="not-prose">
            <SourcesCitation
              sources={[
                { title: 'Genesis 35:20', type: 'talmud', section: 'Jacob\'s pillar for Rachel' },
                { title: 'Yoreh De\'ah 364', type: 'halacha', author: 'Shulchan Aruch' },
                { title: 'The Jewish Way in Death and Mourning', type: 'book', author: 'Rabbi Maurice Lamm', section: 'Jonathan David Publishers' },
                { title: 'Unveiling Guide', type: 'website', author: 'Chabad.org', url: 'https://www.chabad.org/library/article_cdo/aid/281556/jewish/Unveiling.htm' },
              ]}
            />
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
