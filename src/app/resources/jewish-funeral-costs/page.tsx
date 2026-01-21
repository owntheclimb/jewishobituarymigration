import { Metadata } from "next";
import Script from 'next/script';
import { generateSpeakableSchema, schemaToString as schemaToStr } from "@/lib/schema";
import { ExpertQuote, StatisticHighlight, StatisticGrid, DefinitionBox, DefinitionGrid, SourcesCitation } from "@/components/geo";
import { DollarSign as DollarIcon, TrendingDown, Percent } from "lucide-react";

const speakableSchema = generateSpeakableSchema({
  url: 'https://jewishobituary.com/resources/jewish-funeral-costs',
  name: 'Jewish Funeral Costs: A Complete Guide to What You\'ll Pay',
  cssSelectors: ['.article-title', '.article-summary', '.key-takeaways', '.faq-question', '.faq-answer'],
});

export const metadata: Metadata = {
  title: "Jewish Funeral Costs: A Complete Guide to What You'll Pay",
  description: "Understanding the costs of a traditional Jewish funeral helps families plan appropriately during a difficult time, with typical expenses ranging from $8,000-$15,000.",
  keywords: ["Jewish funeral cost", "funeral expenses", "burial costs", "casket prices", "cemetery plot", "shiva costs"],
  openGraph: {
    title: "Jewish Funeral Costs: A Complete Guide to What You'll Pay",
    description: "Understanding the costs of a traditional Jewish funeral helps families plan appropriately during a difficult time.",
    type: "article",
    url: "https://jewishobituary.com/resources/jewish-funeral-costs",
  },
  alternates: {
    canonical: "https://jewishobituary.com/resources/jewish-funeral-costs",
  },
};
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Share2, Download, ArrowLeft, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { AuthorBox } from '@/components/AuthorBox';
import { getAuthor } from '@/data/authors';
import { generateArticleSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema';

const articleSchema = generateArticleSchema({
  title: 'Jewish Funeral Costs: A Complete Guide to What You\'ll Pay',
  description: 'Understanding the costs of a traditional Jewish funeral helps families plan appropriately during a difficult time.',
  url: 'https://jewishobituary.com/resources/jewish-funeral-costs',
  datePublished: '2024-03-15',
  dateModified: '2025-01-15',
  authorName: 'Jewish Obituary Editorial Team',
  image: 'https://jewishobituary.com/og-image.jpg',
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Resources', url: 'https://jewishobituary.com/resources' },
  { name: 'Jewish Funeral Costs', url: 'https://jewishobituary.com/resources/jewish-funeral-costs' },
]);


export default function ArticleJewishFuneralCostsPage() {
  const author = getAuthor('editorial-team');

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
            <Badge>Planning</Badge>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />11 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Jewish Funeral Costs: A Complete Guide to What You'll Pay
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Understanding the costs of a traditional Jewish funeral helps families plan appropriately during a difficult time, with typical expenses ranging from $8,000-$15,000.
          </p>

          <div className="flex gap-3 mb-8">
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" />Share Article</Button>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download PDF</Button>
          </div>

          <AuthorBox author={author} />
        </div>
      </section>

      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Key Statistics */}
            <div className="my-8 not-prose">
              <StatisticGrid columns={3}>
                <StatisticHighlight
                  value="$8,000-$15,000"
                  label="Typical Jewish funeral total cost"
                  source="Industry average"
                  icon={DollarIcon}
                />
                <StatisticHighlight
                  value="$800-$2,500"
                  label="Simple pine casket (tradition)"
                  source="Jewish burial custom"
                  icon={TrendingDown}
                />
                <StatisticHighlight
                  value="30% lower"
                  label="Jewish funerals vs. elaborate Western funerals (due to simplicity tradition)"
                  source="Industry comparison"
                  icon={Percent}
                />
              </StatisticGrid>
            </div>

            {/* Expert Quote */}
            <div className="my-8 not-prose">
              <ExpertQuote
                quote="Originally the expense of burying the dead was harder for the family than the death itself, so that sometimes they would abandon the corpse and flee. Until Rabban Gamliel came and treated himself lightly, being carried out in linen garments."
                expertName="Talmud Moed Katan 27b"
                credentials="Talmudic Source"
                source="Talmud Bavli"
                variant="prominent"
              />
            </div>

            <h2 className="text-foreground">Typical Jewish Funeral Expenses</h2>

            <Card className="p-6 my-6 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground m-0">Basic Cost Breakdown</h3>
              </div>
              <div className="space-y-3 text-foreground">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Basic Services Fee</span>
                  <span>$2,000 - $3,500</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Simple Wooden Casket</span>
                  <span>$800 - $2,500</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Burial Plot</span>
                  <span>$1,500 - $5,000</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Opening/Closing Grave</span>
                  <span>$1,000 - $1,500</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Headstone</span>
                  <span>$1,500 - $4,000</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Shiva/Memorial Supplies</span>
                  <span>$200 - $500</span>
                </div>
                <div className="flex justify-between py-3 bg-primary/10 px-3 rounded mt-2">
                  <span className="font-bold text-lg">Typical Total</span>
                  <span className="font-bold text-lg">$8,000 - $15,000</span>
                </div>
              </div>
            </Card>

            <h2 className="text-foreground">Why Jewish Funerals Cost Less</h2>
            <p className="text-foreground">Jewish tradition actually helps reduce funeral costs through several principles: simple wooden caskets, no embalming, no elaborate viewing, and emphasis on equality. These traditions mean Jewish funerals are often less expensive than non-Jewish ones.</p>

            <h2 className="text-foreground">How to Reduce Costs</h2>
            <ul className="text-foreground">
              <li>Join a Jewish burial society offering group rates</li>
              <li>Purchase burial plots in advance</li>
              <li>Choose a simpler headstone design</li>
              <li>Use synagogue connections for funeral home recommendations</li>
              <li>Apply for assistance from Jewish social services if needed</li>
            </ul>

            {/* Expert Quote */}
            <div className="my-8 not-prose">
              <ExpertQuote
                quote="The tradition of equality in death—dressing all in simple white shrouds—ensures that the poor are not embarrassed and the rich do not display their wealth."
                expertName="Rabbi Maurice Lamm"
                credentials="Rabbi, Author of 'The Jewish Way in Death and Mourning'"
                source="The Jewish Way in Death and Mourning"
              />
            </div>

            {/* Key Hebrew Terms */}
            <div className="my-8 not-prose">
              <h3 className="text-xl font-semibold mb-4">Key Hebrew Terms</h3>
              <DefinitionGrid>
                <DefinitionBox
                  term="אָרוֹן"
                  transliteration="Aron"
                  meaning="Casket"
                  definition="Simple wooden casket used in traditional Jewish burial."
                  pronunciation="ah-ROHN"
                />
                <DefinitionBox
                  term="תַּכְרִיכִין"
                  transliteration="Tachrichim"
                  meaning="Shrouds"
                  definition="Simple white burial garments with no pockets—symbolizing we take nothing with us."
                  pronunciation="tahkh-ree-KHEEN"
                />
              </DefinitionGrid>
            </div>

            {/* Sources Section */}
            <div className="not-prose">
              <SourcesCitation
                sources={[
                  { title: 'Moed Katan 27b', type: 'talmud', section: 'Equality in burial' },
                  { title: 'Yoreh De\'ah 352', type: 'halacha', author: 'Shulchan Aruch' },
                  { title: 'The Jewish Way in Death and Mourning', type: 'book', author: 'Rabbi Maurice Lamm', section: 'Jonathan David Publishers' },
                ]}
              />
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
