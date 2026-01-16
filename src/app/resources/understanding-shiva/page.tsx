'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Heart, Clock, ArrowLeft, Share2 } from "lucide-react";


export default function ArticleShivaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <Badge className="mb-4">Jewish Customs</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Understanding the Jewish Practice of Sitting Shiva
          </h1>

          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              8 min read
            </span>
            <span>Updated January 2025</span>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed">
            When a Jewish person loses a close family member, the community gathers to provide comfort during a sacred time called "sitting Shiva." Learn about this ancient tradition rooted in Torah and thousands of years of Jewish practice.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-4">What is Shiva?</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              Shiva (from the Hebrew word שבעה, meaning "seven") is a seven-day period of mourning observed after the burial of a parent, spouse, sibling, or child. During this time, mourners remain at home while friends, family, and community members visit to offer condolences and support.
            </p>

            <p className="text-foreground/90 leading-relaxed mb-8">
              This practice creates a structured time and space for grief, providing mourners with both privacy and community. Rather than being alone with their sorrow, mourners are surrounded by loved ones who share memories, bring meals, and simply sit in solidarity with those who are grieving.
            </p>

            <h2 className="text-3xl font-bold mb-4 mt-12">The Origins of Shiva</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              The tradition of sitting shiva dates back to biblical times. The Torah mentions seven-day mourning periods for important figures, and the Talmud later codified the practice for all Jews. Over centuries, specific customs and rituals developed around this sacred time.
            </p>

            <Card className="p-6 bg-primary/5 border-primary/20 my-8">
              <p className="text-foreground/90 leading-relaxed italic">
                "In Jewish tradition, mourning is not a sign of weakness but an acknowledgment of love. We sit shiva to honor the deceased and to acknowledge that grief is a sacred and necessary process."
              </p>
            </Card>

            <h2 className="text-3xl font-bold mb-4 mt-12">When Does Shiva Begin?</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              Shiva begins immediately after the burial and continues for seven days, though it is interrupted by Shabbat and major Jewish holidays. The first meal after the burial, called the "seudat havra'ah" (meal of consolation), traditionally includes round foods like eggs and bagels, symbolizing the cycle of life.
            </p>

            <h2 className="text-3xl font-bold mb-4 mt-12">Who Sits Shiva?</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              According to Jewish law, seven relatives are required to sit shiva:
            </p>

            <ul className="list-disc pl-8 mb-8 space-y-2 text-foreground/90">
              <li>Father</li>
              <li>Mother</li>
              <li>Sister</li>
              <li>Brother</li>
              <li>Son</li>
              <li>Daughter</li>
              <li>Spouse</li>
            </ul>

            <p className="text-foreground/90 leading-relaxed mb-8">
              These individuals are considered "mourners" and observe specific customs during the seven-day period. Other relatives and close friends may also participate in the shiva gathering to offer support.
            </p>

            <h2 className="text-3xl font-bold mb-4 mt-12">Customs During Shiva</h2>

            <h3 className="text-2xl font-semibold mb-3 mt-8">Covering Mirrors</h3>
            <p className="text-foreground/90 leading-relaxed mb-6">
              Mirrors in the shiva house are traditionally covered. This practice helps mourners focus on the soul rather than physical appearance and encourages inward reflection rather than vanity.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-8">Sitting on Low Stools</h3>
            <p className="text-foreground/90 leading-relaxed mb-6">
              Mourners often sit on low stools or boxes during shiva visits. This physical lowering represents the emotional state of grief and humility in the face of loss.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-8">Lighting a Candle</h3>
            <p className="text-foreground/90 leading-relaxed mb-6">
              A memorial candle burns continuously throughout the seven days. The flame represents the soul of the deceased and the eternal nature of memory.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-8">Refraining from Work</h3>
            <p className="text-foreground/90 leading-relaxed mb-6">
              Mourners traditionally abstain from work during shiva. This allows them to fully focus on their grief and the memory of their loved one without the distractions of daily responsibilities.
            </p>

            <h3 className="text-2xl font-semibold mb-3 mt-8">Prayer Services</h3>
            <p className="text-foreground/90 leading-relaxed mb-6">
              Daily prayer services are often held at the shiva house, allowing mourners to recite Kaddish (the mourner's prayer) with a minyan (quorum of ten adults). The community's presence provides spiritual comfort and support.
            </p>

            <h2 className="text-3xl font-bold mb-4 mt-12">Making a Shiva Call</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              Visiting a shiva house is a mitzvah (good deed) and an important way to support mourners. Here are some guidelines for making a shiva call:
            </p>

            <ul className="list-disc pl-8 mb-8 space-y-2 text-foreground/90">
              <li><strong>Let the mourner lead:</strong> Allow them to speak first and share memories if they wish</li>
              <li><strong>Listen more than you speak:</strong> Your presence is more important than finding the "right words"</li>
              <li><strong>Avoid cliches:</strong> Phrases like "they're in a better place" may not be comforting to everyone</li>
              <li><strong>Bring food:</strong> Many visitors bring prepared meals or groceries to help the family</li>
              <li><strong>Keep visits brief:</strong> Unless invited to stay longer, a 20-30 minute visit is appropriate</li>
              <li><strong>Dress modestly:</strong> Show respect through appropriate attire</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4 mt-12">After Shiva: Sheloshim</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              When shiva ends, a period called sheloshim (thirty) begins, lasting until the 30th day after burial. During this time, mourners gradually return to normal activities while still observing certain restrictions, such as avoiding celebrations and entertainment.
            </p>

            <p className="text-foreground/90 leading-relaxed mb-8">
              For a parent, the mourning period extends to eleven months, during which the mourner recites Kaddish daily. After the first year, the annual yahrzeit (anniversary of death) is observed with the lighting of a memorial candle and recitation of Kaddish.
            </p>

            <h2 className="text-3xl font-bold mb-4 mt-12">The Comfort of Community</h2>
            <p className="text-foreground/90 leading-relaxed mb-6">
              The Jewish approach to mourning recognizes that grief cannot be rushed. Shiva provides a sacred container for sorrow, allowing mourners to feel their pain while being held by community. Visitors don't come to "cheer up" the mourners but to share in their grief, acknowledge their loss, and offer the comfort of presence.
            </p>

            <p className="text-foreground/90 leading-relaxed mb-8">
              In a world that often encourages us to "get over" loss quickly, shiva reminds us that mourning is holy work. It honors both the deceased and the relationship we shared with them. Through this ancient practice, we learn that grief, when shared, becomes more bearable, and memory, when honored, becomes eternal.
            </p>

            <Card className="p-6 bg-muted my-8">
              <p className="text-foreground font-semibold mb-2">Traditional Phrase of Comfort:</p>
              <p className="text-foreground/90 italic">
                "HaMakom yenachem etchem betoch she'ar aveilei Tzion v'Yerushalayim"
                <br />
                <span className="text-sm">(May God comfort you among the other mourners of Zion and Jerusalem)</span>
              </p>
            </Card>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "What to Bring to a Shiva House",
                  category: "Etiquette",
                  time: "5 min read",
                },
                {
                  title: "The Meaning of Kaddish",
                  category: "Jewish Customs",
                  time: "7 min read",
                },
                {
                  title: "Yahrzeit: Annual Remembrance",
                  category: "Jewish Customs",
                  time: "6 min read",
                },
              ].map((article, i) => (
                <Card key={i} className="p-4 hover:shadow-elegant transition-all duration-300">
                  <Badge variant="outline" className="mb-2">{article.category}</Badge>
                  <h4 className="font-semibold mb-2">{article.title}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.time}
                  </p>
                </Card>
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
