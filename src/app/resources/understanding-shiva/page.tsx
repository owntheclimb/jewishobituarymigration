'use client';

import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Heart, Clock, ArrowLeft, Share2, ExternalLink } from "lucide-react";
import { AuthorBox } from "@/components/AuthorBox";
import { getAuthor } from "@/data/authors";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, schemaToString } from "@/lib/schema";

const articleSchema = generateArticleSchema({
  title: 'Shiva: A Complete Guide to the Jewish Mourning Period',
  description: 'Comprehensive guide to sitting shiva with biblical origins, Talmudic sources, denominational practices, customs explained, and visitor etiquette. Includes FAQ and expert citations.',
  url: 'https://jewishobituary.com/resources/understanding-shiva',
  datePublished: '2024-01-15',
  dateModified: '2026-01-21',
  authorName: 'Jewish Obituary Editorial Team',
  image: 'https://jewishobituary.com/og-image.jpg',
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Resources', url: 'https://jewishobituary.com/resources' },
  { name: 'Understanding Shiva', url: 'https://jewishobituary.com/resources/understanding-shiva' },
]);

const faqSchema = generateFAQSchema([
  {
    question: "How long does shiva last?",
    answer: "Shiva traditionally lasts seven days, beginning immediately after burial. Orthodox and Conservative Jews typically observe the full seven days, while Reform Jews may observe three days. Shiva is interrupted by Shabbat and major Jewish holidays."
  },
  {
    question: "What should I say when visiting a shiva house?",
    answer: "Simple expressions like 'I'm sorry for your loss' are appropriate. Share memories of the deceased if you have them. Upon leaving, the traditional phrase is 'HaMakom yenachem etchem betoch she'ar aveilei Tzion v'Yerushalayim' (May God comfort you among the mourners of Zion and Jerusalem)."
  },
  {
    question: "Should I bring flowers to a shiva house?",
    answer: "No, flowers are not appropriate for a Jewish shiva. Instead, bring food (check if the family keeps kosher), make a charitable donation in the deceased's memory, or simply offer your presence and support."
  },
  {
    question: "Why are mirrors covered during shiva?",
    answer: "Mirrors are covered to help mourners focus on inner spiritual reflection rather than physical appearance. It symbolizes that during this sacred time of grief, vanity and outward concerns are set aside to focus on the soul and memory of the deceased."
  },
  {
    question: "Can non-Jewish people attend shiva?",
    answer: "Yes, non-Jewish people are welcome and encouraged to attend shiva. Your presence shows support for the mourning family. Dress modestly, follow the lead of other visitors, and feel free to participate in prayers or simply sit quietly with the mourners."
  },
  {
    question: "What is a shiva minyan?",
    answer: "A minyan is a quorum of ten adult Jews required for certain prayers, including Kaddish. During shiva, prayer services are held at the mourner's home so they don't have to leave. In Orthodox communities, only men count; in Conservative and Reform communities, both men and women count toward the minyan."
  }
]);

export default function ArticleShivaPage() {
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
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(faqSchema) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <Badge className="mb-4">Jewish Mourning Traditions</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shiva: A Complete Guide to the Jewish Mourning Period
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              18 min read
            </span>
            <span>Updated January 2026</span>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            A comprehensive guide to the seven-day Jewish mourning period, including biblical origins,
            Talmudic sources, customs and their meanings, denominational variations, and practical
            guidance for both mourners and visitors.
          </p>

          <AuthorBox author={author} />
        </div>
      </section>

      {/* Table of Contents */}
      <div className="py-8 px-4 bg-[hsl(var(--background-warm))]">
        <div className="max-w-4xl mx-auto">
          <div className="toc">
            <p className="toc-title">In This Article</p>
            <div className="grid md:grid-cols-2 gap-x-8">
              <div>
                <a href="#what-is-shiva">What is Shiva?</a>
                <a href="#biblical-origins">Biblical and Talmudic Origins</a>
                <a href="#who-observes">Who Observes Shiva?</a>
                <a href="#customs-explained">Customs and Their Meanings</a>
              </div>
              <div>
                <a href="#denominational-differences">Denominational Differences</a>
                <a href="#visitor-etiquette">Visitor Etiquette</a>
                <a href="#virtual-shiva">Virtual Shiva</a>
                <a href="#faq">Frequently Asked Questions</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">

            {/* What is Shiva */}
            <section id="what-is-shiva">
              <h2 className="text-3xl font-bold mb-4">What is Shiva?</h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                <strong>Shiva</strong> (Hebrew: שִׁבְעָה, pronounced "shih-VAH") is the week-long mourning period
                in Judaism observed for first-degree relatives. The word comes from the Hebrew word for "seven,"
                referring to the seven days of intensive mourning that begin immediately after burial.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-6">
                During shiva, mourners remain at home while friends, family, and community members visit to offer
                condolences, share memories of the deceased, and provide practical support. This practice—often
                called "sitting shiva"—creates a sacred container for grief, allowing mourners to experience the
                full range of emotions while being held by their community.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-8">
                The custom is observed for a parent, spouse, sibling, or child. Rather than rushing through grief
                or returning immediately to normal life, Jewish tradition acknowledges that mourning is holy work
                that requires time, presence, and community.
              </p>
            </section>

            {/* Biblical Origins */}
            <section id="biblical-origins" className="mt-12">
              <h2 className="text-3xl font-bold mb-4">Biblical and Talmudic Origins</h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                The practice of shiva has deep roots in Jewish scripture and rabbinic literature. Understanding
                these origins helps us appreciate how this tradition has been shaped over millennia.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Genesis 50:10 — Joseph Mourning Jacob</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                The primary Torah source for seven-day mourning appears in Genesis 50:10, where Joseph
                "observed a mourning period of seven days" (וַיַּעַשׂ לְאָבִיו אֵבֶל שִׁבְעַת יָמִים) after his
                father Jacob's death. According to the Talmud Yerushalmi (Kesubos 1:1), it was Moses who
                later instituted that all Jews should mourn for seven days following Joseph's example.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">An Even Earlier Source: Mourning for Methuselah</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                The Talmud (Sanhedrin 108b) traces the practice even earlier—to before the biblical Flood.
                The rabbis interpret Genesis 7:10, "And it came to pass, after the seven days, that the
                waters of the Flood were upon the earth," as referring to a seven-day mourning period for
                Methuselah, the oldest man who ever lived, before the Flood began.
              </p>

              <Card className="p-6 bg-[hsl(var(--background-soft))] border-primary/20 my-8">
                <p className="text-foreground/90 leading-relaxed italic mb-2">
                  "God will turn your festivals into mourning."
                </p>
                <p className="text-sm text-muted-foreground">
                  — Amos 8:10. The Talmud (Moed Katan 20a) notes that the festivals of Pesach and Sukkot are
                  each seven days, drawing a connection to the seven-day mourning period.
                </p>
              </Card>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Consoling Mourners as Divine Imitation</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                The Talmud (Sotah 14a) teaches that consoling mourners was originally an act of God Himself.
                This tractate cites Genesis 25:11: "After the death of Abraham, God brought blessing to
                Isaac his son." Just as God comforted Isaac after Abraham's death, so too are we commanded
                to bring comfort to mourners with our presence.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Later Codification</h3>
              <p className="text-foreground/90 leading-relaxed mb-8">
                Jewish mourning practices were first comprehensively codified by Maimonides (Rabbi Moses
                ben Maimon, 1138-1204) in his <em>Mishneh Torah</em>, specifically in the Laws of Mourning.
                The practices were further clarified in the <em>Shulchan Aruch</em> (Code of Jewish Law)
                written by Rabbi Joseph Caro in the 16th century, particularly in the Yoreh De'ah section.
              </p>
            </section>

            {/* Who Observes */}
            <section id="who-observes" className="mt-12">
              <h2 className="text-3xl font-bold mb-4">Who Observes Shiva?</h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                According to Jewish law (halacha), shiva is observed by seven categories of first-degree relatives:
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Relationship</th>
                      <th className="px-4 py-3 text-left font-semibold">Hebrew Term</th>
                      <th className="px-4 py-3 text-left font-semibold">Obligation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3">Father</td>
                      <td className="px-4 py-3 italic">Av</td>
                      <td className="px-4 py-3">Required</td>
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="px-4 py-3">Mother</td>
                      <td className="px-4 py-3 italic">Em</td>
                      <td className="px-4 py-3">Required</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3">Son</td>
                      <td className="px-4 py-3 italic">Ben</td>
                      <td className="px-4 py-3">Required</td>
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="px-4 py-3">Daughter</td>
                      <td className="px-4 py-3 italic">Bat</td>
                      <td className="px-4 py-3">Required</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3">Brother</td>
                      <td className="px-4 py-3 italic">Ach</td>
                      <td className="px-4 py-3">Required</td>
                    </tr>
                    <tr className="border-t border-border bg-muted/30">
                      <td className="px-4 py-3">Sister</td>
                      <td className="px-4 py-3 italic">Achot</td>
                      <td className="px-4 py-3">Required</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-4 py-3">Spouse</td>
                      <td className="px-4 py-3 italic">Ish/Isha</td>
                      <td className="px-4 py-3">Required</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-foreground/90 leading-relaxed mb-8">
                These individuals are considered <em>aveilim</em> (mourners) and observe specific customs during
                the seven-day period. Extended family members, close friends, and community members typically
                visit to offer support but are not bound by the same restrictions.
              </p>
            </section>

            {/* Customs Explained */}
            <section id="customs-explained" className="mt-12">
              <h2 className="text-3xl font-bold mb-4">Customs and Their Meanings</h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Each shiva custom carries deep symbolic meaning, connecting mourners to generations of
                Jewish practice while providing a framework for processing grief.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Sitting on Low Chairs</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Mourners traditionally sit on low stools, boxes, or the floor during shiva. This practice
                likely derives from the story of Job, whose friends "sat with him on the ground" (Job 2:13)
                during his time of grief. In Ashkenazi tradition, mourners sit on low-cut chairs; in
                Sephardic tradition, they may sit on the floor or on pillows.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-6">
                The symbolism is powerful: sitting lower represents being brought low by grief, humility
                before God, and—as some rabbis explain—being closer to the earth where the loved one is
                now buried.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Covering Mirrors</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                All mirrors in the shiva house are traditionally covered with cloth or paper. While folk
                tradition held that this prevented the dead from reaching out "from the other side,"
                rabbis reinterpret the custom as encouraging inner reflection rather than concern with
                physical appearance.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Shiva is a time for focusing on the soul—both the soul of the departed and the inner
                spiritual state of the mourner. Covering mirrors removes the distraction of vanity and
                self-consciousness.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">The Shiva Candle (Ner Daluk)</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                A large memorial candle is lit at the beginning of shiva and burns continuously for seven
                days. This <em>ner daluk</em> (burning light) symbolizes both the soul of the deceased and
                the divine presence. As Proverbs 20:27 states: "The soul of man is the lamp of God."
              </p>
              <p className="text-foreground/90 leading-relaxed mb-6">
                While some scholars trace this custom to 13th-century Germany, others believe it emerged
                from Italian Kabbalists in the 17th century. Regardless of its exact origins, the flame
                serves as a constant reminder of the eternal nature of the soul.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">The Meal of Condolence (S'udat Havra'ah)</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Upon returning from the cemetery, mourners are served the <em>s'udat havra'ah</em> (meal
                of condolence)—the first meal they eat after the burial. The Talmud directs that this
                meal must be provided by others, not prepared by the mourners themselves.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Traditional foods include hard-boiled eggs (symbolizing the cycle of life, with no
                beginning or end), lentils (which are round for the same reason), and bread (the staff
                of life). This meal, prepared with love by neighbors and friends, helps the mourner
                begin to accept sustenance and, symbolically, life itself again.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Not Leaving the House</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Mourners traditionally remain at home for the entire seven days, withdrawing from the
                world to focus on their grief. The community comes to them—bringing food, participating
                in prayer services, and offering presence.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Refraining from Work and Personal Care</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                During shiva, mourners abstain from work, shaving, haircuts, bathing for pleasure,
                wearing leather shoes (a sign of comfort and luxury), marital relations, and studying
                Torah (except for books of mourning). These restrictions create space for grief and
                remove the distractions of ordinary life.
              </p>

              <Card className="p-6 bg-primary/5 border-primary/20 my-8">
                <p className="text-foreground/90 leading-relaxed italic mb-3">
                  "Mourning is an in-depth experience of loneliness. The ties that bind one soul to
                  another have been severed, and there is a gnawing sense of solitude. To remain
                  incommunicado is to express grief over the disruption of communication with someone
                  we love. At certain times every person has a right, even an obligation, to be alone.
                  This is such a time."
                </p>
                <p className="text-sm text-muted-foreground">
                  — Rabbi Maurice Lamm, <em>The Jewish Way in Death and Mourning</em>
                </p>
              </Card>
            </section>

            {/* Denominational Differences */}
            <section id="denominational-differences" className="mt-12">
              <h2 className="text-3xl font-bold mb-4">Denominational Differences</h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                While the core concept of shiva is shared across Jewish movements, practices vary
                between Orthodox, Conservative, and Reform communities.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Orthodox Judaism</h3>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-foreground/90">
                <li>Full seven days observed (except for Shabbat and holidays)</li>
                <li>All traditional restrictions strictly observed</li>
                <li>Only men count toward the prayer minyan</li>
                <li>Men do not shave during shiva</li>
                <li>Sitting on low chairs required</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Conservative Judaism</h3>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-foreground/90">
                <li>Full seven days traditionally observed</li>
                <li>Both men and women count in the minyan (egalitarian)</li>
                <li>Most traditional customs observed, with some flexibility</li>
                <li>Greater openness to individual family practices</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Reform Judaism</h3>
              <ul className="list-disc pl-8 mb-8 space-y-2 text-foreground/90">
                <li>Often observed for three days rather than seven</li>
                <li>Customs like sitting low and covering mirrors are optional</li>
                <li>Emphasis on personal meaning over strict observance</li>
                <li>Acceptance of cremation (prohibited in Orthodox/Conservative)</li>
                <li>Both men and women count in minyan</li>
              </ul>

              <p className="text-foreground/90 leading-relaxed mb-8">
                Regardless of denomination, the fundamental purpose remains the same: creating sacred
                space for grief and surrounding mourners with community support.
              </p>
            </section>

            {/* Visitor Etiquette */}
            <section id="visitor-etiquette" className="mt-12">
              <h2 className="text-3xl font-bold mb-4">Visitor Etiquette: Paying a Shiva Call</h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Visiting a shiva house—often called "paying a shiva call"—is a mitzvah (commandment) and
                an important way to support mourners. Here's how to do it with sensitivity and respect.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Before You Arrive</h3>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-foreground/90">
                <li>Check the posted shiva hours—families often designate specific visiting times</li>
                <li>Find out if the family keeps kosher before bringing food</li>
                <li>Dress modestly and appropriately</li>
                <li>Men should bring a kippah (yarmulke) or be prepared to wear one provided</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Entering the Shiva House</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Traditionally, visitors do not knock or ring the doorbell—you simply enter the house
                (the door is often left unlocked). This custom exists so mourners aren't disturbed or
                required to act as hosts. If you're uncomfortable with this, it's acceptable to try
                the door first, then knock gently if needed.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">What to Say</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                The traditional practice is to wait silently until the mourner speaks to you first—a
                custom based on Job's friends who "sat with him on the ground seven days and seven
                nights, and none spoke a word to him" (Job 2:13). This acknowledges that there are
                no words adequate for profound loss.
              </p>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Once acknowledged, simple expressions are best:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-foreground/90">
                <li>"I'm so sorry for your loss."</li>
                <li>"I'm here for you."</li>
                <li>Share a specific memory of the deceased if you have one</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Avoid clichés like "they're in a better place" or "I know how you feel"—these often
                don't comfort and can feel dismissive.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">What to Bring</h3>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-foreground/90">
                <li><strong>Food:</strong> Prepared meals, deli platters, fruit baskets (check if kosher needed)</li>
                <li><strong>Donations:</strong> Make a charitable donation in the deceased's memory</li>
                <li><strong>Your presence:</strong> Simply being there is the greatest gift</li>
                <li><strong>Do NOT bring flowers</strong>—this is not a Jewish mourning custom</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-8">When Leaving</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Keep your visit brief—typically 20-30 minutes unless invited to stay longer. As you
                leave, the traditional farewell is:
              </p>
              <Card className="p-6 bg-muted my-6">
                <p className="text-foreground italic mb-2">
                  "HaMakom yenachem etchem betoch she'ar aveilei Tzion v'Yerushalayim"
                </p>
                <p className="text-foreground/80">
                  "May God comfort you among the other mourners of Zion and Jerusalem"
                </p>
              </Card>
            </section>

            {/* Virtual Shiva */}
            <section id="virtual-shiva" className="mt-12">
              <h2 className="text-3xl font-bold mb-4">Virtual Shiva: A Modern Adaptation</h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                The COVID-19 pandemic transformed many aspects of Jewish mourning practice. When
                gathering in person became impossible, communities turned to technology to maintain
                the essential function of shiva: bringing comfort to mourners.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">How Virtual Shiva Works</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                Virtual shiva typically uses video conferencing platforms like Zoom. Families set
                specific times when visitors can "drop in" to the video call, share memories, offer
                condolences, and participate in prayer services.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Benefits of Virtual Shiva</h3>
              <ul className="list-disc pl-8 mb-6 space-y-2 text-foreground/90">
                <li>Enables participation from distant relatives who cannot travel</li>
                <li>Allows immunocompromised individuals to participate safely</li>
                <li>Creates recordings that families can revisit</li>
                <li>Reaches community members who might not attend in person</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Limitations</h3>
              <p className="text-foreground/90 leading-relaxed mb-6">
                As Rabbi Miriam Herscher, a chaplain specializing in grief counseling, noted:
                "Zoom shiva, despite its challenges, has been a source of comfort for many
                mourners—but it still can't replace a hug."
              </p>
              <p className="text-foreground/90 leading-relaxed mb-8">
                Virtual shiva cannot fully replicate the nonverbal comfort of physical presence.
                However, grief counselors recommend supplementing virtual visits with handwritten
                letters, meal deliveries, and phone calls to provide more complete support.
              </p>

              <h3 className="text-2xl font-semibold mb-3 mt-8">Post-Pandemic: The Hybrid Model</h3>
              <p className="text-foreground/90 leading-relaxed mb-8">
                Many families now use a hybrid approach: in-person shiva for local community members,
                with virtual sessions at specific times for those who cannot attend in person. This
                model has become a lasting innovation in Jewish mourning practice.
              </p>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div className="faq-item">
                  <h3 className="faq-question">How long does shiva last?</h3>
                  <p className="faq-answer">
                    Shiva traditionally lasts seven days, beginning immediately after burial. Orthodox and
                    Conservative Jews typically observe the full seven days, while Reform Jews may observe
                    three days. Shiva is interrupted by Shabbat (mourners don't sit shiva publicly on
                    Saturday) and is ended by major Jewish holidays if they fall during the seven days.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">What should I say when visiting a shiva house?</h3>
                  <p className="faq-answer">
                    Simple expressions like "I'm sorry for your loss" are perfectly appropriate. If you
                    have a memory of the deceased, share it—mourners often find comfort in hearing how
                    their loved one touched others' lives. Avoid clichés like "they're in a better place."
                    Upon leaving, the traditional phrase is "HaMakom yenachem etchem betoch she'ar aveilei
                    Tzion v'Yerushalayim" (May God comfort you among the mourners of Zion and Jerusalem).
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">Should I bring flowers to a shiva house?</h3>
                  <p className="faq-answer">
                    No, flowers are not appropriate for a Jewish shiva. Instead, bring food (check if the
                    family keeps kosher), make a charitable donation in the deceased's memory, or simply
                    offer your presence and support. Food gifts are especially helpful since mourners are
                    not supposed to cook for themselves.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">Why are mirrors covered during shiva?</h3>
                  <p className="faq-answer">
                    Mirrors are covered to help mourners focus on inner spiritual reflection rather than
                    physical appearance. It symbolizes that during this sacred time of grief, vanity and
                    outward concerns are set aside to focus on the soul and memory of the deceased. Some
                    also interpret it as removing any distraction from the mourning process.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">Can non-Jewish people attend shiva?</h3>
                  <p className="faq-answer">
                    Absolutely. Non-Jewish people are welcome and encouraged to attend shiva. Your presence
                    shows support for the mourning family regardless of your own religious background.
                    Dress modestly, follow the lead of other visitors, and feel free to participate in
                    prayers or simply sit quietly with the mourners.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">What is a shiva minyan?</h3>
                  <p className="faq-answer">
                    A minyan is a quorum of ten adult Jews required for certain prayers, including Kaddish.
                    During shiva, prayer services are held at the mourner's home so they don't have to
                    leave. In Orthodox communities, only men count toward the minyan; in Conservative and
                    Reform communities, both men and women count.
                  </p>
                </div>

                <div className="faq-item">
                  <h3 className="faq-question">What happens after shiva ends?</h3>
                  <p className="faq-answer">
                    After shiva, a 30-day period called <em>sheloshim</em> begins. Mourners gradually
                    return to normal activities but continue to avoid celebrations and entertainment.
                    For a parent, mourning continues for eleven months with daily Kaddish recitation.
                    After the first year, the <em>yahrzeit</em> (anniversary of death) is observed
                    annually with candle lighting and Kaddish.
                  </p>
                </div>
              </div>
            </section>

            {/* Further Reading */}
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Recommended Reading</h2>
              <p className="text-foreground/90 leading-relaxed mb-6">
                For those seeking deeper understanding of Jewish mourning practices:
              </p>

              <div className="space-y-4">
                <Card className="p-4 bg-[hsl(var(--background-warm))]">
                  <h4 className="font-semibold text-foreground">The Jewish Way in Death and Mourning</h4>
                  <p className="text-sm text-muted-foreground mb-2">Rabbi Maurice Lamm (Jonathan David Publishers, Revised Edition 2000)</p>
                  <p className="text-foreground/80 text-sm">
                    The definitive guide from an Orthodox perspective. Selected by The New York Times as one
                    of the ten best religious books of the year when first published. Comprehensive,
                    authoritative, and deeply compassionate.
                  </p>
                  <a
                    href="https://www.amazon.com/Jewish-Death-Mourning-Revised-Expanded/dp/0824604237"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-sm mt-2 hover:underline"
                  >
                    View on Amazon <ExternalLink className="h-3 w-3" />
                  </a>
                </Card>

                <Card className="p-4 bg-[hsl(var(--background-warm))]">
                  <h4 className="font-semibold text-foreground">Saying Kaddish: How to Comfort the Dying, Bury the Dead, and Mourn as a Jew</h4>
                  <p className="text-sm text-muted-foreground mb-2">Anita Diamant (Schocken Books, 1998)</p>
                  <p className="text-foreground/80 text-sm">
                    An inclusive guide for Jews of all backgrounds. Covers mourning practices with
                    sensitivity to modern questions, including mourning for non-Jewish relatives,
                    miscarriage, and children as mourners.
                  </p>
                  <a
                    href="https://www.penguinrandomhouse.com/books/40274/saying-kaddish-by-anita-diamant/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-sm mt-2 hover:underline"
                  >
                    View on Penguin Random House <ExternalLink className="h-3 w-3" />
                  </a>
                </Card>
              </div>
            </section>

            {/* Article Footer */}
            <div className="article-footer mt-12">
              <p>Last reviewed: January 2026</p>
              <p className="mt-2">
                Sources: Talmud Sanhedrin 108b, Sotah 14a, Moed Katan 20a; Mishneh Torah, Laws of Mourning;
                Shulchan Aruch, Yoreh De'ah; Reform Judaism Movement; Chabad.org; My Jewish Learning.
              </p>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "The Mourner's Kaddish",
                  href: "/resources/kaddish-mourners-prayer",
                  category: "Jewish Prayer",
                  time: "12 min read",
                },
                {
                  title: "Jewish Funeral Traditions",
                  href: "/resources/jewish-funeral-traditions",
                  category: "Traditions",
                  time: "15 min read",
                },
                {
                  title: "The Unveiling Ceremony",
                  href: "/resources/unveiling-ceremony",
                  category: "Customs",
                  time: "8 min read",
                },
              ].map((article, i) => (
                <Link key={i} href={article.href}>
                  <Card className="p-4 hover:shadow-elegant transition-all duration-300 h-full">
                    <Badge variant="outline" className="mb-2">{article.category}</Badge>
                    <h4 className="font-semibold mb-2">{article.title}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.time}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 flex items-center justify-between p-6 bg-muted rounded-lg">
            <div>
              <p className="font-semibold mb-1">Was this article helpful?</p>
              <p className="text-sm text-muted-foreground">Share it with others who might benefit</p>
            </div>
            <Button className="gap-2">
              <Share2 className="h-4 w-4" />
              Share Article
            </Button>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Support?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Explore our comprehensive grief support resources and connect with your community.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/grief-support">
                <Heart className="mr-2 h-5 w-5" />
                Grief Support
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/resources">
                <BookOpen className="mr-2 h-5 w-5" />
                More Articles
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
