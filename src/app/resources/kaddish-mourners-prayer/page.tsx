import { Metadata } from "next";
import Script from "next/script";
import { generateSpeakableSchema, schemaToString as schemaToStr } from "@/lib/schema";
import { ExpertQuote, StatisticHighlight, StatisticGrid, DefinitionBox, DefinitionGrid, SourcesCitation } from "@/components/geo";
import { Calendar as CalendarIcon, Users as UsersIcon, BookText } from "lucide-react";

const speakableSchema = generateSpeakableSchema({
  url: 'https://jewishobituary.com/resources/kaddish-mourners-prayer',
  name: 'Kaddish: Complete Guide to the Mourner\'s Prayer',
  cssSelectors: ['.article-title', '.article-summary', '.key-takeaways', '.faq-question', '.faq-answer'],
});

export const metadata: Metadata = {
  title: "Kaddish: Complete Guide to the Mourner's Prayer",
  description: "Comprehensive guide to the Mourner's Kaddish including the full text with transliteration, historical origins, when and how to recite it, and denominational practices.",
  keywords: ["kaddish", "mourner's prayer", "Jewish prayer", "kaddish text", "kaddish transliteration", "minyan", "Jewish mourning"],
  openGraph: {
    title: "Kaddish: Complete Guide to the Mourner's Prayer",
    description: "Comprehensive guide to the Mourner's Kaddish including the full text with transliteration, historical origins, when and how to recite it, and denominational practices.",
    type: "article",
    url: "https://jewishobituary.com/resources/kaddish-mourners-prayer",
  },
  alternates: {
    canonical: "https://jewishobituary.com/resources/kaddish-mourners-prayer",
  },
};
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Share2, Bookmark, Book, Users, Heart, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AuthorBox } from "@/components/AuthorBox";
import { getAuthor } from "@/data/authors";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, schemaToString } from "@/lib/schema";

const articleSchema = generateArticleSchema({
  title: 'Kaddish: Complete Guide to the Mourner\'s Prayer',
  description: 'Comprehensive guide to the Mourner\'s Kaddish including the full text with transliteration, historical origins, when and how to recite it, and denominational practices.',
  url: 'https://jewishobituary.com/resources/kaddish-mourners-prayer',
  datePublished: '2024-02-01',
  dateModified: '2026-01-21',
  authorName: 'Jewish Obituary Editorial Team',
  image: 'https://jewishobituary.com/og-image.jpg',
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Resources', url: 'https://jewishobituary.com/resources' },
  { name: 'Kaddish Prayer', url: 'https://jewishobituary.com/resources/kaddish-mourners-prayer' },
]);

const faqSchema = generateFAQSchema([
  {
    question: "Why is Kaddish recited for 11 months instead of 12?",
    answer: "According to tradition, the soul's judgment period is a maximum of 12 months. By reciting Kaddish for only 11 months, we demonstrate confidence that our loved one was righteous and does not require the full judgment period."
  },
  {
    question: "Can women say Kaddish?",
    answer: "In Conservative, Reform, and Reconstructionist Judaism, women equally recite Kaddish and are counted in the minyan. In Modern Orthodox communities, women may say Kaddish though this varies by congregation. In Haredi communities, women typically do not recite Kaddish publicly."
  },
  {
    question: "Why doesn't the Mourner's Kaddish mention death?",
    answer: "The Kaddish is a prayer of praise and faith, not a prayer for the dead. By affirming faith and sanctifying God's name during a time of grief, the mourner brings merit to the deceased's soul while also finding healing through an act of faith rather than despair."
  },
  {
    question: "What is a minyan and why is it required for Kaddish?",
    answer: "A minyan is a quorum of 10 adult Jews required for certain communal prayers, including Kaddish. This requirement emphasizes that mourning is supported by community, not experienced in isolation. The congregation's responses ('Amen' and 'Y'hei sh'mei raba') complete the prayer."
  },
  {
    question: "Can someone else say Kaddish on my behalf?",
    answer: "Yes, if you cannot attend services, you can arrange for someone else to say Kaddish on your behalf. Many synagogues offer this service, and there are organizations dedicated to ensuring Kaddish is recited for those who have no one to say it for them."
  }
]);


export default function ArticleKaddishPage() {
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
      <Script
        id="speakable-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToStr(speakableSchema) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background pt-8 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Jewish Customs</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              12 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Kaddish: The Mourner's Prayer Explained
          </h1>

          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            Understanding one of Judaism's most sacred prayers and its profound role in the mourning process
          </p>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By Jewish Obituary Editorial Team</span>
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
          <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg mb-8">
            <img
              src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1200&h=600&fit=crop"
              alt="Jewish prayer book opened to Kaddish with tallit"
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
              <a href="#what-is" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronRight className="h-4 w-4" />
                What is Kaddish?
              </a>
              <a href="#origins" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronRight className="h-4 w-4" />
                Origins & History
              </a>
              <a href="#when" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronRight className="h-4 w-4" />
                When It's Recited
              </a>
              <a href="#who" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronRight className="h-4 w-4" />
                Who Can Say Kaddish
              </a>
              <a href="#minyan" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronRight className="h-4 w-4" />
                The Significance of Minyan
              </a>
              <a href="#text" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronRight className="h-4 w-4" />
                Text & Meaning
              </a>
              <a href="#denominations" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronRight className="h-4 w-4" />
                Different Denominations
              </a>
              <a href="#journey" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ChevronRight className="h-4 w-4" />
                Emotional Journey
              </a>
            </nav>
          </CardContent>
        </Card>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <div className="text-lg leading-relaxed space-y-4 border-l-4 border-primary pl-6 py-2">
            <p>
              The <strong>Mourner's Kaddish</strong> stands as one of the most recognizable and emotionally resonant prayers in all of Judaism. Yet paradoxically, this prayer recited by those in mourning contains no mention of death, grief, or loss. Instead, it is a profound affirmation of faith, a sanctification of God's name, and a declaration of hope for the coming of God's kingdom.
            </p>
            <p className="text-muted-foreground">
              Written in Aramaic—the common language of Jews during the Talmudic era—this ancient prayer has been recited by countless mourners across centuries and continents, serving as a powerful spiritual bridge between the living and those who have passed, between grief and healing, between this world and the world to come.
            </p>
          </div>

          <section id="what-is" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6">What is Kaddish?</h2>
            <p>
              At its core, the Mourner's Kaddish (Kaddish Yatom in Hebrew) is a doxology—a hymn of praise to God. Despite being forever associated with mourning, the prayer's text focuses entirely on glorifying and sanctifying God's name, expressing hope for peace, and affirming faith in divine providence.
            </p>
            <p>
              The prayer serves multiple spiritual functions: it honors the deceased by affirming faith in the face of loss, it elevates the soul of the departed through righteous actions of the living, and it provides structure and communal support during the intensely personal experience of grief.
            </p>

            {/* Key Statistics */}
            <div className="my-8">
              <StatisticGrid columns={3}>
                <StatisticHighlight
                  value="11 months"
                  label="Kaddish recitation period for parents (not 12, to show confidence in parent's righteousness)"
                  source="Jewish Law"
                  icon={CalendarIcon}
                />
                <StatisticHighlight
                  value="10 adults"
                  label="Minyan required for Kaddish recitation"
                  source="Talmud"
                  icon={UsersIcon}
                />
                <StatisticHighlight
                  value="5 forms"
                  label="Half Kaddish, Whole Kaddish, Mourner's Kaddish, Rabbi's Kaddish, Burial Kaddish"
                  source="Siddur"
                  icon={BookText}
                />
              </StatisticGrid>
            </div>

            {/* Expert Quote */}
            <ExpertQuote
              quote="The Kaddish does not mention death. It is a hymn of praise to God, and an affirmation of faith in the face of tragedy."
              expertName="Rabbi Maurice Lamm"
              credentials="Rabbi, Author of 'The Jewish Way in Death and Mourning'"
              source="The Jewish Way in Death and Mourning"
              variant="prominent"
            />
          </section>

          <section id="origins" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6">The Origins of Kaddish</h2>
            <p>
              The Kaddish prayer has a rich history spanning nearly two millennia. The opening phrase—"May His great
              name be exalted and sanctified"—echoes Ezekiel 38:23: "Thus will I magnify Myself, and sanctify Myself,
              and I will make Myself known in the eyes of many nations."
            </p>
            <p>
              The oldest written version of Kaddish appears in the <em>Siddur of Rab Amram Gaon</em> (circa 900 CE).
              Originally, Kaddish was not a prayer for mourners at all—it was recited by rabbis at the conclusion
              of public Torah study sessions and sermons.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Why Aramaic Instead of Hebrew?</h3>
            <p>
              The Kaddish was composed in Aramaic, the spoken language of Jews in ancient Babylonia and Israel
              during the Talmudic period. Rabbis wanted everyone to understand this important prayer, not just
              scholars who knew Hebrew. Some scholars, including Professor Yoel Elitzur, argue that Kaddish was
              originally written in Hebrew and later translated to Aramaic.
            </p>

            {/* Talmudic Quote */}
            <ExpertQuote
              quote="When Israel enters synagogues and study halls and responds 'May His great Name be blessed,' the Holy One shakes His head and says: 'Happy is the King who is praised in His house.'"
              expertName="Talmud Berakhot 3a"
              credentials="Talmudic Source"
              source="Talmud Bavli"
            />

            <h3 className="text-xl font-semibold mt-6 mb-3">The Legend of Rabbi Akiva</h3>
            <p>
              The association of Kaddish with mourning began in the 12th-13th centuries, linked to a medieval legend
              about Rabbi Akiva. According to this story, Rabbi Akiva encountered the tormented soul of a dead man
              who told him his suffering could only be relieved if his son would recite Kaddish and lead the
              congregation in prayer. Rabbi Akiva found the man's son, taught him, and when the boy recited Kaddish,
              his father's soul was elevated.
            </p>
            <p>
              The first halakhic mention of mourners reciting Kaddish appears in the 13th-century work <em>Or Zarua</em>
              by Rabbi Isaac ben Moses of Vienna. From there, the practice spread throughout the Jewish world.
            </p>

            {/* Historical Source Quote */}
            <ExpertQuote
              quote="Or Zarua was the first halachic source requiring mourners to recite Kaddish, establishing the practice that spread throughout the Jewish world."
              expertName="Or Zarua (13th century)"
              credentials="Rabbi Isaac ben Moses of Vienna"
              source="Halachic Codex"
            />
          </section>

          <section id="when" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="h-7 w-7 text-primary" />
              When Kaddish is Recited
            </h2>
            <p>
              Mourners recite Kaddish at specific times during Jewish services:
            </p>
            <ul>
              <li><strong>During the 11-month mourning period</strong> for parents (some traditions observe 12 months)</li>
              <li><strong>During the 30-day Sheloshim period</strong> for other immediate family members</li>
              <li><strong>On the Yahrzeit</strong> (annual anniversary) of a loved one's death</li>
              <li><strong>During Yizkor services</strong> on major holidays</li>
            </ul>
          </section>

          <section id="who" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="h-7 w-7 text-primary" />
              Who Can Say Kaddish?
            </h2>
            <p>
              Traditionally, Kaddish was recited only by sons. However, in many modern Jewish communities, daughters, spouses, and other relatives also say Kaddish. Some communities even have "Kaddish groups" where community members ensure that Kaddish is recited for those who have no one to say it for them.
            </p>

            <blockquote>
              <p>
                "Yitgadal v'yitkadash sh'mei raba..." - "May His great name be exalted and sanctified..."
              </p>
            </blockquote>
          </section>

          <section id="minyan" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="h-7 w-7 text-primary" />
              The Significance of the Minyan
            </h2>
            <p>
              Kaddish is recited only in the presence of a minyan (a quorum of ten Jewish adults). This requirement emphasizes that mourning is not a solitary experience but one supported by the community. The congregation responds "Amen" and "Y'hei sh'mei raba..." affirming the mourner's words.
            </p>
          </section>

          <section id="text" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Book className="h-7 w-7 text-primary" />
              The Full Text of the Mourner's Kaddish
            </h2>
            <p className="mb-6">
              The Kaddish is written in Aramaic, the everyday language of Jews during the Talmudic period.
              Below is the complete text with transliteration and translation.
            </p>

            <Card className="p-6 bg-muted/50 my-6">
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">יִתְגַּדַּל וְיִתְקַדַּשׁ שְׁמֵהּ רַבָּא</p>
                  <p className="text-primary italic">Yitgadal v'yitkadash sh'mei raba</p>
                  <p className="text-muted-foreground">May His great name be exalted and sanctified</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">בְּעָלְמָא דִּי בְרָא כִרְעוּתֵהּ</p>
                  <p className="text-primary italic">B'alma di v'ra chirutei</p>
                  <p className="text-muted-foreground">In the world which He created according to His will</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">וְיַמְלִיךְ מַלְכוּתֵהּ בְּחַיֵּיכוֹן וּבְיוֹמֵיכוֹן</p>
                  <p className="text-primary italic">V'yamlich malchutei b'chayeichon uv'yomeichon</p>
                  <p className="text-muted-foreground">May He establish His kingdom during your lifetime and during your days</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">וּבְחַיֵּי דְכָל בֵּית יִשְׂרָאֵל</p>
                  <p className="text-primary italic">Uv'chayei d'chol beit Yisrael</p>
                  <p className="text-muted-foreground">And during the lifetimes of all the House of Israel</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">בַּעֲגָלָא וּבִזְמַן קָרִיב. וְאִמְרוּ אָמֵן</p>
                  <p className="text-primary italic">Ba'agala uvizman kariv, v'imru amen</p>
                  <p className="text-muted-foreground">Speedily and in the near future, and say Amen</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg border-b">
                  <p className="text-sm text-muted-foreground mb-1">Congregation responds:</p>
                  <p className="text-lg font-semibold text-right" dir="rtl">יְהֵא שְׁמֵהּ רַבָּא מְבָרַךְ לְעָלַם וּלְעָלְמֵי עָלְמַיָּא</p>
                  <p className="text-primary italic font-semibold">Y'hei sh'mei raba m'varach l'alam ul'almei almaya</p>
                  <p className="text-muted-foreground">May His great name be blessed forever and for all eternity</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">יִתְבָּרַךְ וְיִשְׁתַּבַּח וְיִתְפָּאַר וְיִתְרוֹמַם וְיִתְנַשֵּׂא</p>
                  <p className="text-primary italic">Yitbarach v'yishtabach v'yitpaar v'yitromam v'yitnasei</p>
                  <p className="text-muted-foreground">Blessed and praised and glorified and exalted and extolled</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">וְיִתְהַדָּר וְיִתְעַלֶּה וְיִתְהַלָּל שְׁמֵהּ דְּקֻדְשָׁא בְּרִיךְ הוּא</p>
                  <p className="text-primary italic">V'yit'hadar v'yit'aleh v'yit'halal sh'mei d'kudsha b'rich hu</p>
                  <p className="text-muted-foreground">And honored and elevated and praised be the name of the Holy One, Blessed is He</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">לְעֵלָּא מִן כָּל בִּרְכָתָא וְשִׁירָתָא תֻּשְׁבְּחָתָא וְנֶחֱמָתָא</p>
                  <p className="text-primary italic">L'eila min kol birchata v'shirata tushb'chata v'nechemata</p>
                  <p className="text-muted-foreground">Above all blessings and songs, praises and consolations</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">דַּאֲמִירָן בְּעָלְמָא. וְאִמְרוּ אָמֵן</p>
                  <p className="text-primary italic">Da'amiran b'alma, v'imru amen</p>
                  <p className="text-muted-foreground">Which are uttered in the world, and say Amen</p>
                </div>
                <div className="border-b pb-4">
                  <p className="text-lg font-semibold text-right" dir="rtl">יְהֵא שְׁלָמָא רַבָּא מִן שְׁמַיָּא וְחַיִּים עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל. וְאִמְרוּ אָמֵן</p>
                  <p className="text-primary italic">Y'hei sh'lama raba min sh'maya v'chayim aleinu v'al kol Yisrael, v'imru amen</p>
                  <p className="text-muted-foreground">May there be abundant peace from heaven, and life, upon us and upon all Israel, and say Amen</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-right" dir="rtl">עוֹשֶׂה שָׁלוֹם בִּמְרוֹמָיו הוּא יַעֲשֶׂה שָׁלוֹם עָלֵינוּ וְעַל כָּל יִשְׂרָאֵל. וְאִמְרוּ אָמֵן</p>
                  <p className="text-primary italic">Oseh shalom bimromav, hu ya'aseh shalom aleinu v'al kol Yisrael, v'imru amen</p>
                  <p className="text-muted-foreground">May He who makes peace in His high places make peace upon us and upon all Israel, and say Amen</p>
                </div>
              </div>
            </Card>

            <p className="mt-6">
              Notice that the prayer never mentions death. Instead, it is a powerful affirmation of faith—a declaration
              that even in the depths of grief, the mourner sanctifies God's name and affirms hope for the coming
              of His kingdom. This act of faith is believed to bring merit to the soul of the departed.
            </p>
          </section>

          <section id="denominations" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6">Kaddish in Different Denominations</h2>
            <p>
              <strong>Orthodox:</strong> Traditionally only males recite Kaddish, though this is evolving in some communities.
            </p>
            <p>
              <strong>Conservative:</strong> Men and women equally recite Kaddish.
            </p>
            <p>
              <strong>Reform and Reconstructionist:</strong> Full egalitarian approach to Kaddish recitation.
            </p>
          </section>

          <section id="journey" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Heart className="h-7 w-7 text-primary" />
              The Emotional Journey of Kaddish
            </h2>
            <p>
              Many mourners find that the daily commitment to recite Kaddish provides structure during grief. The requirement to attend services ensures community support and prevents isolation. Over the months, the rhythm of the prayer becomes a meditation, a daily reminder of the loved one, and eventually, a path toward healing.
            </p>

            <h2>Kaddish in Modern Times</h2>
            <p>
              Today, technology has made it possible for those unable to attend daily services to participate in virtual minyans. Some communities offer Kaddish livestreams, ensuring that mourners everywhere can fulfill this sacred obligation.
            </p>

            <h2>Learning to Say Kaddish</h2>
            <p>
              If you're not familiar with the prayer, don't let that stop you. Most synagogues provide:
            </p>
            <ul>
              <li>Transliterated texts for easy reading</li>
              <li>Audio recordings to practice pronunciation</li>
              <li>Classes on Jewish mourning practices</li>
              <li>Support from the community during services</li>
            </ul>
          </section>

          {/* Key Hebrew Terms */}
          <div className="my-8">
            <h3 className="text-xl font-semibold mb-4">Key Hebrew Terms</h3>
            <DefinitionGrid>
              <DefinitionBox
                term="קַדִּישׁ"
                transliteration="Kaddish"
                meaning="Sanctification"
                definition="Prayer sanctifying God's name, recited by mourners to honor the deceased."
                pronunciation="kah-DISH"
              />
              <DefinitionBox
                term="מִנְיָן"
                transliteration="Minyan"
                meaning="Quorum of ten"
                definition="The minimum number of adult Jews required for public prayer and Kaddish."
                pronunciation="min-YAHN"
              />
              <DefinitionBox
                term="יָתוֹם"
                transliteration="Yatom"
                meaning="Orphan"
                definition="The Mourner's Kaddish is also called Kaddish Yatom (Orphan's Kaddish)."
                pronunciation="yah-TOME"
              />
              <DefinitionBox
                term="יְהֵא שְׁמֵהּ רַבָּא"
                transliteration="Y'hei Sh'mei Raba"
                meaning="May His great Name be blessed"
                definition="The congregation's response, considered the most important part of Kaddish."
                pronunciation="yeh-HAY sheh-MAY rah-BAH"
              />
            </DefinitionGrid>
          </div>

          {/* Key Takeaways */}
          <Card className="p-6 my-8 bg-primary/5 border-primary/20 shadow-lg key-takeaways">
            <h3 className="text-xl font-bold text-foreground mb-4">Key Takeaways</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <span className="text-foreground">Kaddish contains no mention of death—it's an affirmation of faith and praise of God</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <span className="text-foreground">Traditionally recited for 11 months for parents, 30 days for other relatives</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <span className="text-foreground">Requires a minyan (10 Jewish adults) emphasizing community support</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">4</span>
                </div>
                <span className="text-foreground">Written in Aramaic, the common language of Jews in the Talmudic era</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-sm">5</span>
                </div>
                <span className="text-foreground">Modern communities increasingly adopt egalitarian approaches to Kaddish recitation</span>
              </li>
            </ul>
          </Card>

          <section>
            <h2 className="text-3xl font-bold mb-6">Conclusion</h2>
            <p className="text-lg leading-relaxed mb-4">
              The Mourner's Kaddish is far more than a prayer—it is a profound spiritual bridge connecting grief and healing, the individual and the community, this world and the world to come. Through its daily recitation, mourners find not only comfort but structure, not only words but meaning, not only solitude but communal embrace.
            </p>
            <p className="text-lg leading-relaxed">
              By affirming faith even in the depths of loss, by sanctifying God's name through our grief, and by joining our voices with generations of mourners who have spoken these same ancient words, we transform personal sorrow into a sacred act. In doing so, we honor those we've lost while finding the strength to continue living, ensuring that their memory remains forever a blessing.
            </p>
          </section>
        </div>

        {/* Sources Section */}
        <SourcesCitation
          sources={[
            { title: 'Berakhot 3a', type: 'talmud', section: 'The Power of Responding Amen' },
            { title: 'Sotah 49a', type: 'talmud', section: 'Importance of Kaddish' },
            { title: 'Siddur of Rav Amram Gaon (c. 900 CE)', type: 'halacha', section: 'Earliest written Kaddish' },
            { title: 'Or Zarua', type: 'halacha', author: 'Rabbi Isaac ben Moses of Vienna (13th century)', section: 'First halachic source for mourners reciting Kaddish' },
            { title: 'The Jewish Way in Death and Mourning', type: 'book', author: 'Rabbi Maurice Lamm', section: 'Jonathan David Publishers' },
            { title: 'Kaddish Guide', type: 'website', author: 'Chabad.org', url: 'https://www.chabad.org/library/article_cdo/aid/562222/jewish/Kaddish.htm' },
          ]}
        />

        {/* Related Articles */}
        <Card className="mt-12 p-6 bg-muted/30">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/articles/yahrzeit" className="group block p-4 rounded-lg hover:bg-background transition-colors">
              <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Yahrzeit: Honoring the Anniversary
              </h4>
              <p className="text-sm text-muted-foreground">Learn about annual memorial observance and yahrzeit candles</p>
            </Link>
            <Link href="/resources/understanding-shiva" className="group block p-4 rounded-lg hover:bg-background transition-colors">
              <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                Sitting Shiva: The Seven-Day Period
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
              <p className="text-sm text-muted-foreground">Comprehensive guide to Jewish funeral customs</p>
            </Link>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Need Support During Your Mourning Period?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Access comprehensive grief support resources, connect with others who understand your journey, and learn more about Jewish mourning traditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/grief-support">Grief Support Resources</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/resources">More Articles</Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
