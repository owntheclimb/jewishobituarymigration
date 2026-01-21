'use client';

import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Flame, Heart, Book, Clock, Share2, Bookmark, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { AuthorBox } from '@/components/AuthorBox';
import { getAuthor } from '@/data/authors';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, schemaToString } from '@/lib/schema';

const articleSchema = generateArticleSchema({
  title: 'Yahrzeit: Complete Guide to the Jewish Death Anniversary',
  description: 'Understanding yahrzeit - the Jewish tradition of commemorating the anniversary of death. Learn about lighting memorial candles, reciting Kaddish, and honoring loved ones.',
  url: 'https://jewishobituary.com/articles/yahrzeit',
  datePublished: '2024-02-01',
  dateModified: '2026-01-21',
  authorName: 'Jewish Obituary Editorial Team',
  image: 'https://jewishobituary.com/og-image.jpg',
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Articles', url: 'https://jewishobituary.com/articles' },
  { name: 'Yahrzeit', url: 'https://jewishobituary.com/articles/yahrzeit' },
]);

const faqSchema = generateFAQSchema([
  {
    question: "What is yahrzeit and when is it observed?",
    answer: "Yahrzeit (Yiddish for 'year's time') is the annual anniversary of a death according to the Hebrew calendar. It is observed on the Hebrew date of death, beginning at sunset the evening before."
  },
  {
    question: "How do I calculate the yahrzeit date?",
    answer: "The yahrzeit is based on the Hebrew calendar date of death, not the secular date. Use a Hebrew calendar converter or your synagogue's yahrzeit notification service to determine the correct date each year."
  },
  {
    question: "What do you do on a yahrzeit?",
    answer: "Traditional observances include: lighting a 24-hour memorial candle at sunset, attending synagogue to recite Kaddish, giving tzedakah (charity), studying Torah, visiting the grave, and sharing memories with family."
  },
  {
    question: "Why is a 24-hour candle lit on yahrzeit?",
    answer: "The yahrzeit candle represents the soul of the deceased, based on Proverbs 20:27: 'The soul of man is the lamp of God.' The flame symbolizes the eternal nature of the soul and serves as a physical reminder of the departed."
  },
  {
    question: "Do I observe yahrzeit on the Hebrew or English date?",
    answer: "Traditional practice uses the Hebrew calendar date. Since the Hebrew calendar differs from the secular calendar, the secular date changes each year. Many synagogues provide annual yahrzeit notifications."
  },
  {
    question: "What happens to yahrzeit during a Hebrew leap year?",
    answer: "If the death occurred in Adar during a non-leap year, the yahrzeit is observed in Adar II (the second Adar) during leap years. For deaths on the 30th of a month that sometimes has only 29 days, observe on the 1st of the following month."
  }
]);

export default function ArticleYahrzeitPage() {
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
        {/* Hero Section with Featured Image */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background pt-8 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Jewish Customs</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                10 min read
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Yahrzeit: Honoring the Anniversary of Death
            </h1>

            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Understanding the sacred Jewish tradition of commemorating a loved one's Hebrew calendar anniversary
            </p>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>By Rabbi Sarah Cohen</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Updated January 2025</span>
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
                src="https://images.unsplash.com/photo-1518414922567-18f2ab3e2f6f?w=1200&h=600&fit=crop"
                alt="Yahrzeit memorial candle burning with prayer book"
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
                <a href="#understanding" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Understanding Yahrzeit
                </a>
                <a href="#candle" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Lighting the Memorial Candle
                </a>
                <a href="#kaddish" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Reciting Kaddish
                </a>
                <a href="#observances" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Other Observances
                </a>
                <a href="#significance" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Spiritual Significance
                </a>
                <a href="#modern" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight className="h-4 w-4" />
                  Modern Observance
                </a>
              </nav>
            </CardContent>
          </Card>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            {/* Introduction */}
            <div className="text-lg leading-relaxed space-y-4 border-l-4 border-primary pl-6 py-2">
              <p>
                <strong>Yahrzeit</strong> (Yiddish for "year's time") is the anniversary of a death according to the Hebrew calendar. It stands as one of the most sacred and enduring observances in Jewish mourning customs, providing an annual opportunity to honor, remember, and spiritually elevate a departed loved one.
              </p>
              <p className="text-muted-foreground">
                Through the lighting of a memorial candle, the recitation of Kaddish, and acts of charity and study, the yahrzeit transforms grief into remembrance and ensures that those we've lost continue to be a blessing in our lives and communities.
              </p>
            </div>

            <section id="understanding" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Calendar className="h-7 w-7 text-primary" />
                Understanding Yahrzeit
              </h2>
              <p>
                The yahrzeit is observed annually on the Hebrew calendar date of death. If the death occurred during the month of Adar in a non-leap year, the yahrzeit is observed in Adar II during leap years. For those who died on the 30th of a month that sometimes has only 29 days, the yahrzeit is observed on the first of the following month.
              </p>
              <p>
                The first yahrzeit occurs on the first anniversary of the death, and then annually thereafter. While the Hebrew date is traditionally used, some families also acknowledge the secular calendar anniversary.
              </p>
            </section>

            <section id="candle" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Flame className="h-7 w-7 text-primary" />
                Lighting the Yahrzeit Candle
              </h2>
              <p>
                The most universal yahrzeit custom is lighting a special memorial candle that burns for 24 hours. This candle is lit at sunset on the evening before the yahrzeit date, as Jewish days begin at sundown.
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20 shadow-md">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  The Yahrzeit Candle Tradition
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground"><strong>Light at sunset:</strong> Begin just before sundown on the evening before the yahrzeit date (Jewish days begin at sunset)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground"><strong>24-hour candle:</strong> Use a special memorial candle designed to burn for a full day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground"><strong>Safe placement:</strong> Position on a stable, heat-resistant surface away from flammable materials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground"><strong>Natural burning:</strong> Never extinguish the flame - let it burn out on its own</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground"><strong>Symbolic meaning:</strong> The flame represents the eternal nature of the soul</span>
                  </li>
                </ul>
              </Card>

              <p>
                The tradition of lighting a yahrzeit candle is based on the Biblical verse "The soul of man is the lamp of God" (Proverbs 20:27). The flame represents the enduring nature of the soul and serves as a physical reminder of the deceased.
              </p>
            </section>

            <section id="kaddish" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Book className="h-7 w-7 text-primary" />
                Reciting Kaddish
              </h2>
              <p>
                It's customary to attend synagogue services on the yahrzeit to recite the Mourner's Kaddish. This prayer, which praises God and affirms faith, is recited during the evening, morning, and afternoon services on the yahrzeit.
              </p>
              <p>
                Many synagogues maintain yahrzeit calendars and will notify members when a yahrzeit is approaching. Some congregations read the names of those being remembered during services.
              </p>
            </section>

            <section id="observances" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Other Yahrzeit Observances
              </h2>
              <p>
                Beyond lighting candles and reciting Kaddish, there are several other meaningful ways to observe a yahrzeit:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li><strong className="text-foreground">Study Torah:</strong> Dedicate time to studying Jewish texts in memory of the deceased</li>
                <li><strong className="text-foreground">Give Tzedakah:</strong> Make charitable donations in their name</li>
                <li><strong className="text-foreground">Visit the Grave:</strong> Many visit the cemetery to recite prayers and place stones</li>
                <li><strong className="text-foreground">Fast:</strong> Some observe a partial or full fast on the yahrzeit</li>
                <li><strong className="text-foreground">Lead Services:</strong> If qualified, serve as prayer leader at synagogue</li>
                <li><strong className="text-foreground">Share Stories:</strong> Gather family to share memories and stories</li>
              </ul>
            </section>

            <section id="significance" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Heart className="h-7 w-7 text-primary" />
                The Spiritual Significance of Remembrance
              </h2>
              <p>
                The yahrzeit provides a structured time each year for remembrance and reflection. Jewish tradition teaches that the souls of the deceased ascend to a higher spiritual level on their yahrzeit, making it an especially powerful time for prayers and good deeds in their memory.
              </p>
              <p>
                This annual observance ensures that the memory of loved ones continues across generations. When children observe their parents' yahrzeits, they model for their own children the importance of honoring those who came before, creating an unbroken chain of memory and tradition.
              </p>
            </section>

            <section id="modern" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Modern Yahrzeit Observance
              </h2>
              <p>
                Today, many families adapt yahrzeit customs to fit contemporary life while maintaining the tradition's essence. Some light virtual candles online, create social media tributes, or organize family gatherings via video call. What matters most is taking time to remember and honor those who have passed.
              </p>
              <p>
                Some families develop their own meaningful rituals, such as preparing the deceased's favorite meal, visiting a place they loved, or supporting a cause they cared about. These personal touches make the yahrzeit even more meaningful while staying true to the spirit of the tradition.
              </p>
            </section>

            <Card className="p-6 my-8 bg-accent/50 border-accent shadow-md">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Setting Up Yahrzeit Reminders
              </h3>
              <p className="text-muted-foreground">
                Many people find it helpful to receive annual reminders for yahrzeit dates, especially since the Hebrew calendar differs from the secular calendar. Consider using:
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground ml-6 list-disc">
                <li>Your synagogue's yahrzeit notification service</li>
                <li>Online Hebrew calendar converters with reminder features</li>
                <li>Memorial websites that automatically calculate dates</li>
                <li>Calendar apps that support Hebrew dates</li>
              </ul>
            </Card>

            {/* Frequently Asked Questions */}
            <section id="faq" className="scroll-mt-20 my-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">What is yahrzeit and when is it observed?</h4>
                  <p className="text-muted-foreground">Yahrzeit (Yiddish for "year's time") is the annual anniversary of a death according to the Hebrew calendar. It is observed on the Hebrew date of death, beginning at sunset the evening before.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">How do I calculate the yahrzeit date?</h4>
                  <p className="text-muted-foreground">The yahrzeit is based on the Hebrew calendar date of death, not the secular date. Use a Hebrew calendar converter or your synagogue's yahrzeit notification service to determine the correct date each year.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">What do you do on a yahrzeit?</h4>
                  <p className="text-muted-foreground">Traditional observances include: lighting a 24-hour memorial candle at sunset, attending synagogue to recite Kaddish, giving tzedakah (charity), studying Torah, visiting the grave, and sharing memories with family.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">Why is a 24-hour candle lit on yahrzeit?</h4>
                  <p className="text-muted-foreground">The yahrzeit candle represents the soul of the deceased, based on Proverbs 20:27: "The soul of man is the lamp of God." The flame symbolizes the eternal nature of the soul and serves as a physical reminder of the departed.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">Do I observe yahrzeit on the Hebrew or English date?</h4>
                  <p className="text-muted-foreground">Traditional practice uses the Hebrew calendar date. Since the Hebrew calendar differs from the secular calendar, the secular date changes each year. Many synagogues provide annual yahrzeit notifications.</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-bold mb-2 text-foreground">What happens to yahrzeit during a Hebrew leap year?</h4>
                  <p className="text-muted-foreground">If the death occurred in Adar during a non-leap year, the yahrzeit is observed in Adar II (the second Adar) during leap years. For deaths on the 30th of a month that sometimes has only 29 days, observe on the 1st of the following month.</p>
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
                  <span className="text-foreground">Yahrzeit is observed annually on the Hebrew calendar date of death, beginning at sunset</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <span className="text-foreground">Lighting a 24-hour memorial candle is the most universal yahrzeit custom</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <span className="text-foreground">Reciting Kaddish at synagogue services honors the deceased and elevates their soul</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">4</span>
                  </div>
                  <span className="text-foreground">Additional observances include Torah study, charity, cemetery visits, and sharing memories</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">5</span>
                  </div>
                  <span className="text-foreground">Yahrzeit ensures an unbroken chain of memory across generations</span>
                </li>
              </ul>
            </Card>

            <section>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Conclusion
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                The yahrzeit tradition exemplifies Judaism's profound wisdom in providing structured, meaningful ways to honor the dead while supporting the living. By observing yahrzeit annually, we affirm that our loved ones' influence continues beyond their physical presence, that their memory remains an eternal blessing, and that the bonds of love transcend even death itself.
              </p>
              <p className="text-lg leading-relaxed">
                Whether through the gentle flicker of a memorial candle casting light into the darkness, the communal recitation of ancient prayers that have comforted countless mourners, or the intimate sharing of cherished memories with family, the yahrzeit keeps our loved ones spiritually present in our lives and ensures their legacy endures for generations to come.
              </p>
            </section>
          </div>

          {/* Related Articles */}
          <Card className="mt-12 p-6 bg-muted/30">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/articles/kaddish" className="group block p-4 rounded-lg hover:bg-background transition-colors">
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Kaddish: The Mourner's Prayer
                </h4>
                <p className="text-sm text-muted-foreground">Understanding the meaning and significance of reciting Kaddish</p>
              </Link>
              <Link href="/resources/understanding-shiva" className="group block p-4 rounded-lg hover:bg-background transition-colors">
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Sitting Shiva: The Seven-Day Mourning Period
                </h4>
                <p className="text-sm text-muted-foreground">A complete guide to the Jewish practice of sitting Shiva</p>
              </Link>
              <Link href="/resources/sheloshim-mourning-period" className="group block p-4 rounded-lg hover:bg-background transition-colors">
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Sheloshim: The 30-Day Mourning Period
                </h4>
                <p className="text-sm text-muted-foreground">Understanding the transition from Shiva to Sheloshim</p>
              </Link>
              <Link href="/resources/jewish-funeral-traditions" className="group block p-4 rounded-lg hover:bg-background transition-colors">
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Jewish Funeral Traditions
                </h4>
                <p className="text-sm text-muted-foreground">Comprehensive guide to Jewish funeral customs and practices</p>
              </Link>
            </div>
          </Card>

          {/* CTA Section */}
          <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Create a Lasting Memorial</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Honor your loved one with a beautiful online memorial that includes yahrzeit reminders, photo galleries, and a space for family and friends to share memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/create-obituary">Create Memorial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/grief-support">Grief Support Resources</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
