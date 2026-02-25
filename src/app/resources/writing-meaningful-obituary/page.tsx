'use client';

import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PenLine, Heart, Book, Clock, Share2, Bookmark, ChevronRight, FileText, Users, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { AuthorBox } from '@/components/AuthorBox';
import { getAuthor } from '@/data/authors';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, schemaToString } from '@/lib/schema';
import { ExpertQuote, SourcesCitation } from '@/components/geo';

const articleSchema = generateArticleSchema({
  title: 'How to Write a Meaningful Jewish Obituary',
  description: 'A comprehensive guide to writing a Jewish obituary that honors your loved one. Learn about Jewish traditions, what to include, and how to create a lasting tribute.',
  url: 'https://jewishobituary.com/resources/writing-meaningful-obituary',
  datePublished: '2024-01-25',
  dateModified: '2026-01-28',
  authorName: 'Jewish Obituary Editorial Team',
  image: 'https://jewishobituary.com/og-image.jpg',
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Resources', url: 'https://jewishobituary.com/resources' },
  { name: 'Writing a Meaningful Obituary', url: 'https://jewishobituary.com/resources/writing-meaningful-obituary' },
]);

const faqSchema = generateFAQSchema([
  {
    question: "What should be included in a Jewish obituary?",
    answer: "A Jewish obituary typically includes: the deceased's Hebrew and English names, parents' names, date of death (both secular and Hebrew), survived by list, life accomplishments, Jewish affiliations, funeral and shiva information, and charitable giving suggestions."
  },
  {
    question: "How do I write a Hebrew name in an obituary?",
    answer: "The Hebrew name format is '[Name] ben/bat [Father's name]' meaning '[Name] son/daughter of [Father]'. Some families also include the mother's name. Example: 'David ben Avraham' or 'Sarah bat Miriam v'Avraham'."
  },
  {
    question: "Should I mention how the person died?",
    answer: "This is a personal choice. Jewish tradition focuses on celebrating life rather than dwelling on death. Many families choose not to include cause of death, while others mention it briefly. Do what feels right for your family."
  },
  {
    question: "What Jewish phrases should be included?",
    answer: "Common phrases include: 'z\"l' (zichrono/a livracha - of blessed memory), 'May their memory be a blessing', and 'May you be comforted among the mourners of Zion and Jerusalem'."
  },
  {
    question: "How long should an obituary be?",
    answer: "Length varies based on the publication. Newspaper obituaries are often 150-300 words due to cost. Online memorials can be longer and more detailed. Focus on capturing the essence of the person rather than hitting a specific word count."
  }
]);

export default function WritingMeaningfulObituaryPage() {
  const author = getAuthor('tradition-expert');

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(faqSchema) }}
      />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background pt-8 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Link */}
            <Link href="/resources" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to Resources
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Writing Guide</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                10 min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              How to Write a Meaningful Jewish Obituary
            </h1>

            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              A comprehensive guide to honoring your loved one with a thoughtful tribute that reflects their life and Jewish heritage
            </p>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By Jewish Obituary Editorial Team</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Updated January 2026</span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=600&fit=crop"
                alt="Person writing with pen and paper"
                className="w-full h-full object-cover"
              />
            </div>

            <AuthorBox author={author} />
          </div>
        </section>

        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Table of Contents */}
          <Card className="mb-8 bg-accent/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                In This Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <a href="#getting-started" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Getting Started
                </a>
                <a href="#essential-elements" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Essential Elements
                </a>
                <a href="#jewish-traditions" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Jewish Traditions
                </a>
                <a href="#writing-tips" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Writing Tips
                </a>
                <a href="#sample-structure" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Sample Structure
                </a>
                <a href="#common-phrases" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Common Phrases
                </a>
              </nav>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            {/* Introduction */}
            <div className="text-lg leading-relaxed space-y-4 border-l-4 border-primary pl-6 py-2">
              <p>
                Writing an obituary for a loved one can feel overwhelming during a time of grief. Yet this act of remembrance is one of the most meaningful ways to honor someone&apos;s life and ensure their legacy endures. In the Jewish tradition, we believe that the way we remember the dead reflects our deepest values about life itself.
              </p>
              <p className="text-muted-foreground">
                This guide will walk you through every step of creating a Jewish obituary that captures the essence of your loved one while honoring timeless traditions.
              </p>
            </div>

            {/* Expert Quote */}
            <div className="my-8 not-prose">
              <ExpertQuote
                quote="An obituary is not merely an announcement of death, but a celebration of a life lived. It is the final gift we give to our loved ones—a permanent record of who they were and what they meant to those around them."
                expertName="Rabbi Maurice Lamm"
                credentials="Author of 'The Jewish Way in Death and Mourning'"
                source="The Jewish Way in Death and Mourning"
                variant="prominent"
              />
            </div>

            <section id="getting-started" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Lightbulb className="h-7 w-7 text-primary" />
                Getting Started
              </h2>
              <p>
                Before you begin writing, take some time to gather information and reflect on your loved one&apos;s life. This preparation will make the writing process smoother and result in a more complete tribute.
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20 shadow-md">
                <h3 className="text-xl font-bold text-foreground mb-4">Information to Gather</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong>Full legal name</strong> and any nicknames</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong>Hebrew name</strong> (including parents&apos; Hebrew names)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong>Date and place</strong> of birth and death</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong>Surviving family members</strong> (spouse, children, grandchildren, siblings)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong>Education and career</strong> highlights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong>Jewish affiliations</strong> (synagogue, organizations)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong>Hobbies, passions</strong>, and personal interests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span><strong>Charitable causes</strong> they supported</span>
                  </li>
                </ul>
              </Card>
            </section>

            <section id="essential-elements" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <FileText className="h-7 w-7 text-primary" />
                Essential Elements
              </h2>
              <p>
                A complete Jewish obituary typically includes several key components. While you can adapt this structure to fit your needs, these elements ensure that important information is communicated to the community.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">1. Opening Statement</h3>
              <p>
                Begin with the person&apos;s name, age, place of residence, and date of death. This establishes the basic facts and sets the tone for the tribute.
              </p>
              <div className="bg-muted p-4 rounded-lg my-4">
                <p className="italic text-muted-foreground">
                  Example: &quot;Sarah Ruth Goldman, z&quot;l, 78, of Baltimore, Maryland, passed away peacefully on January 15, 2026 (16 Tevet 5786), surrounded by her loving family.&quot;
                </p>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">2. Life Story</h3>
              <p>
                Share the narrative of their life—where they grew up, their education, career, marriage, and significant life events. Focus on what made them unique and the values they embodied.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">3. Family Information</h3>
              <p>
                List surviving family members, typically beginning with spouse, then children (and their spouses), grandchildren, and siblings. You may also mention predeceased family members.
              </p>
              <div className="bg-muted p-4 rounded-lg my-4">
                <p className="italic text-muted-foreground">
                  Example: &quot;She is survived by her beloved husband of 52 years, David; children Rachel (Michael) Levy and Benjamin (Jennifer) Goldman; grandchildren Emma, Jacob, and Sophie; and brother Morris (Helen) Stein. She was predeceased by her parents, Abraham and Miriam Stein, and sister Esther.&quot;
                </p>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">4. Service Information</h3>
              <p>
                Include details about the funeral service, burial location, and shiva arrangements. This is essential practical information for those wishing to pay their respects.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">5. Memorial Donations</h3>
              <p>
                In lieu of flowers (which are not traditional at Jewish funerals), suggest charitable organizations where donations may be made in the deceased&apos;s memory.
              </p>
            </section>

            <section id="jewish-traditions" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Heart className="h-7 w-7 text-primary" />
                Jewish Traditions in Obituaries
              </h2>
              <p>
                Jewish obituaries have unique elements that reflect our traditions and values. Understanding these customs will help you create a tribute that honors both the individual and our heritage.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Hebrew Names</h3>
              <p>
                Including the Hebrew name connects the deceased to their Jewish identity and lineage. The traditional format is:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">For men:</strong> [Name] ben [Father&apos;s name] — meaning &quot;son of&quot;</li>
                <li><strong className="text-foreground">For women:</strong> [Name] bat [Father&apos;s name] — meaning &quot;daughter of&quot;</li>
                <li><strong className="text-foreground">Some include both parents:</strong> [Name] ben/bat [Father] v&apos;[Mother]</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Hebrew Date</h3>
              <p>
                Including the Hebrew calendar date of death is traditional and helps family members observe future yahrzeits. Many obituaries include both the secular and Hebrew dates.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Traditional Honorifics</h3>
              <p>
                Use appropriate honorifics to show respect:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">z&quot;l (זִכְרוֹנוֹ לִבְרָכָה)</strong> — &quot;of blessed memory&quot; (masc: zichrono, fem: zichrona)</li>
                <li><strong className="text-foreground">a&quot;h (עָלָיו/עָלֶיהָ הַשָּׁלוֹם)</strong> — &quot;peace be upon them&quot;</li>
              </ul>
            </section>

            <section id="writing-tips" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <PenLine className="h-7 w-7 text-primary" />
                Writing Tips
              </h2>

              <Card className="p-6 my-6 bg-accent/50 border-accent shadow-md">
                <h3 className="text-xl font-bold text-foreground mb-4">Do&apos;s</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">+</span>
                    <span>Focus on what made them unique—their personality, passions, and impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">+</span>
                    <span>Include specific stories or anecdotes that capture their essence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">+</span>
                    <span>Mention their Jewish involvement and values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">+</span>
                    <span>Write in a warm, personal tone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">+</span>
                    <span>Have someone proofread for accuracy and typos</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 my-6 bg-accent/50 border-accent shadow-md">
                <h3 className="text-xl font-bold text-foreground mb-4">Don&apos;ts</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">-</span>
                    <span>Don&apos;t just list facts—tell their story</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">-</span>
                    <span>Avoid clichés like &quot;lost their battle&quot; or &quot;passed to a better place&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">-</span>
                    <span>Don&apos;t air family conflicts or mention estrangements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">-</span>
                    <span>Avoid overly formal language that doesn&apos;t reflect who they were</span>
                  </li>
                </ul>
              </Card>
            </section>

            <section id="sample-structure" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Sample Obituary Structure
              </h2>
              <Card className="p-6 my-6 bg-muted/50">
                <div className="space-y-4 text-sm">
                  <p><strong>Paragraph 1 — Opening:</strong> Name, age, residence, date of death (secular and Hebrew), circumstances (peaceful, surrounded by family, etc.)</p>
                  <p><strong>Paragraph 2 — Early Life:</strong> Birth, childhood, parents, education, formative experiences</p>
                  <p><strong>Paragraph 3 — Adult Life:</strong> Career, marriage, children, accomplishments</p>
                  <p><strong>Paragraph 4 — Character &amp; Passions:</strong> Personality, hobbies, what brought them joy, how they impacted others</p>
                  <p><strong>Paragraph 5 — Jewish Life:</strong> Synagogue affiliation, Jewish involvement, values</p>
                  <p><strong>Paragraph 6 — Survivors:</strong> List of surviving family members</p>
                  <p><strong>Paragraph 7 — Service Details:</strong> Funeral information, shiva location and times</p>
                  <p><strong>Paragraph 8 — Memorial:</strong> Donation suggestions in lieu of flowers</p>
                </div>
              </Card>
            </section>

            <section id="common-phrases" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Common Jewish Phrases for Obituaries
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold">z&quot;l (זִכְרוֹנוֹ/זִכְרוֹנָהּ לִבְרָכָה)</p>
                  <p className="text-muted-foreground">&quot;Of blessed memory&quot; — placed after the deceased&apos;s name</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold">May their memory be a blessing</p>
                  <p className="text-muted-foreground">English equivalent of z&quot;l, often used at the end of an obituary</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold">May you be comforted among the mourners of Zion and Jerusalem</p>
                  <p className="text-muted-foreground">Traditional phrase of condolence</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-bold">Baruch Dayan HaEmet</p>
                  <p className="text-muted-foreground">&quot;Blessed is the True Judge&quot; — said upon hearing of a death</p>
                </div>
              </div>
            </section>

            {/* Frequently Asked Questions */}
            <section id="faq" className="scroll-mt-20 my-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">What should be included in a Jewish obituary?</h4>
                  <p className="text-muted-foreground">A Jewish obituary typically includes: the deceased&apos;s Hebrew and English names, parents&apos; names, date of death (both secular and Hebrew), survived by list, life accomplishments, Jewish affiliations, funeral and shiva information, and charitable giving suggestions.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">How do I write a Hebrew name in an obituary?</h4>
                  <p className="text-muted-foreground">The Hebrew name format is &quot;[Name] ben/bat [Father&apos;s name]&quot; meaning &quot;[Name] son/daughter of [Father]&quot;. Some families also include the mother&apos;s name. Example: &quot;David ben Avraham&quot; or &quot;Sarah bat Miriam v&apos;Avraham&quot;.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">Should I mention how the person died?</h4>
                  <p className="text-muted-foreground">This is a personal choice. Jewish tradition focuses on celebrating life rather than dwelling on death. Many families choose not to include cause of death, while others mention it briefly. Do what feels right for your family.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">How long should an obituary be?</h4>
                  <p className="text-muted-foreground">Length varies based on the publication. Newspaper obituaries are often 150-300 words due to cost. Online memorials can be longer and more detailed. Focus on capturing the essence of the person rather than hitting a specific word count.</p>
                </div>
              </div>
            </section>

            {/* Key Takeaways */}
            <Card className="p-6 my-8 bg-primary/5 border-primary/20 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-4">Key Takeaways</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <span className="text-foreground">Gather all necessary information before you begin writing</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <span className="text-foreground">Include both Hebrew and secular names and dates</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <span className="text-foreground">Tell their story—focus on what made them unique</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">4</span>
                  </div>
                  <span className="text-foreground">Include practical information about services and shiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">5</span>
                  </div>
                  <span className="text-foreground">Suggest memorial donations in lieu of flowers</span>
                </li>
              </ul>
            </Card>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Conclusion
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                Writing an obituary is both a practical necessity and a sacred act of remembrance. By thoughtfully capturing your loved one&apos;s life story, Jewish identity, and the impact they had on others, you create a lasting tribute that will comfort mourners today and preserve their memory for generations to come.
              </p>
              <p className="text-lg leading-relaxed">
                Take your time, involve family members in the process, and remember that there&apos;s no single &quot;right&quot; way to write an obituary. What matters most is that it authentically reflects the person you loved and honors their memory in a way that feels true to who they were.
              </p>
            </section>
          </div>

          {/* Sources Section */}
          <SourcesCitation
            sources={[
              { title: 'The Jewish Way in Death and Mourning', type: 'book', author: 'Rabbi Maurice Lamm', section: 'Jonathan David Publishers' },
              { title: 'Jewish Funeral Traditions', type: 'website', author: 'MyJewishLearning.com', url: 'https://www.myjewishlearning.com' },
            ]}
          />

          {/* Related Articles */}
          <Card className="mt-12 p-6 bg-muted/30">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/resources/kaddish-mourners-prayer" className="group block p-4 rounded-lg hover:bg-background transition-colors">
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Kaddish: The Mourner&apos;s Prayer
                </h4>
                <p className="text-sm text-muted-foreground">Understanding the meaning and significance of reciting Kaddish</p>
              </Link>
              <Link href="/resources/understanding-shiva" className="group block p-4 rounded-lg hover:bg-background transition-colors">
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Sitting Shiva: The Seven-Day Mourning Period
                </h4>
                <p className="text-sm text-muted-foreground">A complete guide to the Jewish practice of sitting Shiva</p>
              </Link>
              <Link href="/resources/jewish-funeral-traditions" className="group block p-4 rounded-lg hover:bg-background transition-colors">
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Jewish Funeral Traditions
                </h4>
                <p className="text-sm text-muted-foreground">Comprehensive guide to Jewish funeral customs and practices</p>
              </Link>
              <Link href="/resources/yahrzeit-explained" className="group block p-4 rounded-lg hover:bg-background transition-colors">
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Yahrzeit: Honoring the Anniversary
                </h4>
                <p className="text-sm text-muted-foreground">Understanding the annual memorial observance</p>
              </Link>
            </div>
          </Card>

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help Writing an Obituary?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our obituary template helper can guide you through the process, suggesting language and ensuring you capture all the important details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/create-obituary">Create Obituary</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/obituary-helper">AI Obituary Helper</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
