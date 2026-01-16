'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Share2, Bookmark, Book, Users, Heart, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";


export default function ArticleKaddishPage() {
  return (
    <div className="min-h-screen bg-background">
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
              <span>By Rabbi David Goldstein</span>
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
          <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1518414922567-18f2ab3e2f6f?w=1200&h=600&fit=crop"
              alt="Jewish prayer book opened to Kaddish with tallit"
              className="w-full h-full object-cover"
            />
          </div>
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
          </section>

          <section id="origins" className="scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6">The Origins of Kaddish</h2>
            <p>
              The Kaddish prayer dates back to the Talmudic period, originally serving as a concluding prayer for study sessions. Over time, it evolved into various forms, with the Mourner's Kaddish becoming a central part of Jewish mourning rituals. The prayer is written in Aramaic, the common language of Jews during the Talmudic era, rather than Hebrew.
            </p>
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
              The Text and Meaning
            </h2>
            <p>
              The prayer consists of several key phrases:
            </p>
            <ul>
              <li>Exaltation of God's name</li>
              <li>Prayer for the coming of God's kingdom</li>
              <li>Request for peace</li>
            </ul>
            <p>
              While the prayer doesn't mention death, its recitation honors the deceased by affirming faith and sanctifying God's name, which brings merit to the soul of the departed.
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

          {/* Key Takeaways */}
          <Card className="p-6 my-8 bg-primary/5 border-primary/20 shadow-lg">
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
