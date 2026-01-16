'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Clock, Share2, Download, ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';


export default function ArticleHolocaustSurvivorObituaryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/resources"><ArrowLeft className="mr-2 h-4 w-4" />Back to Resources</Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge>Writing Guide</Badge>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />13 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Writing Obituaries for Holocaust Survivors: Honoring Their Testimony
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Creating meaningful tributes for Holocaust survivors requires sensitivity, respect, and an understanding of how to honor both their suffering and their resilience.
          </p>

          <div className="flex gap-3">
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" />Share</Button>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download</Button>
          </div>
        </div>
      </section>

      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
          <h2 className="text-foreground">Why Holocaust Survivor Obituaries Matter Differently</h2>
          <p className="text-foreground">Holocaust survivors carry extraordinary histories. Their obituaries serve not only as personal tributes but also as historical documents, bearing witness to one of humanity's darkest chapters while celebrating the triumph of survival and resilience.</p>

          <Card className="p-6 my-8 bg-primary/5">
            <div className="flex items-start gap-3">
              <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Key Principles</h3>
                <ul className="space-y-2 text-foreground mb-0">
                  <li><strong>Honor Their Testimony:</strong> Their survival story is part of their legacy</li>
                  <li><strong>Balance Pain and Life:</strong> Include Holocaust experience without letting it overshadow their full life</li>
                  <li><strong>Respect Privacy:</strong> Some survivors chose not to speak about their experiences</li>
                  <li><strong>Celebrate Resilience:</strong> Emphasize how they rebuilt their lives</li>
                </ul>
              </div>
            </div>
          </Card>

          <h2 className="text-foreground">Structure for Holocaust Survivor Obituaries</h2>

          <h3 className="text-foreground">1. Opening (First Paragraph)</h3>
          <p className="text-foreground">Begin with basic information, and consider mentioning their survivor status early if it was a central part of their identity.</p>
          <div className="bg-muted/50 p-6 rounded-lg my-4">
            <p className="text-foreground italic mb-2">Example Opening:</p>
            <p className="text-foreground">"Miriam Sarah Levy, a Holocaust survivor who dedicated her life to education and remembrance, passed away peacefully on January 15, 2025, at age 91, surrounded by three generations of the family she built from the ashes of tragedy."</p>
          </div>

          <h3 className="text-foreground">2. Holocaust Experience</h3>
          <p className="text-foreground">Include their Holocaust history respectfully, mentioning:</p>
          <ul className="text-foreground">
            <li>Camps or ghettos they survived</li>
            <li>Family members lost</li>
            <li>Liberation details if known</li>
            <li>How they came to their post-war home</li>
          </ul>

          <h3 className="text-foreground">3. Life After the Holocaust</h3>
          <p className="text-foreground">This is crucial - show how they rebuilt:</p>
          <ul className="text-foreground">
            <li>Where and how they started over</li>
            <li>Education, career, family they built</li>
            <li>Community involvement</li>
            <li>Testimony and education work</li>
          </ul>

          <h3 className="text-foreground">4. Personal Qualities and Legacy</h3>
          <p className="text-foreground">Highlight character traits that defined them beyond being a survivor - their humor, generosity, strength, wisdom, love.</p>

          <h2 className="text-foreground">Sensitive Language Considerations</h2>
          <Card className="p-6 my-6">
            <h4 className="font-semibold text-foreground mb-4">Use This Language:</h4>
            <ul className="text-foreground space-y-2">
              <li>+ "Holocaust survivor"</li>
              <li>+ "Liberated from [camp]"</li>
              <li>+ "Lost family members in the Shoah"</li>
              <li>+ "Bore witness to..."</li>
              <li>+ "Rebuilt life with courage"</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-4 mt-6">Avoid This Language:</h4>
            <ul className="text-foreground space-y-2">
              <li>- "Victim" (unless they self-identified this way)</li>
              <li>- Graphic descriptions of atrocities</li>
              <li>- "The past is behind them" (trauma is lifelong)</li>
              <li>- Minimizing their experience</li>
            </ul>
          </Card>

          <h2 className="text-foreground">Including Testimony Work</h2>
          <p className="text-foreground">Many survivors became educators. If applicable, mention:</p>
          <ul className="text-foreground">
            <li>Speaking engagements at schools, museums, or community events</li>
            <li>Recorded testimonies (USC Shoah Foundation, Yad Vashem, etc.)</li>
            <li>Books or memoirs written</li>
            <li>Educational foundations or causes supported</li>
          </ul>

          <h2 className="text-foreground">Sample Complete Obituary</h2>
          <div className="bg-card border rounded-lg p-6 my-6">
            <p className="text-foreground mb-4">
              <strong>Isaac Rosenbaum, 95, Holocaust Survivor and Educator</strong>
            </p>
            <p className="text-foreground mb-4">
              Isaac Rosenbaum, who survived Bergen-Belsen and dedicated his life to ensuring the Holocaust would never be forgotten, died peacefully on February 20, 2025, in his home in Chicago, surrounded by his children, grandchildren, and great-grandchildren - a family he built from the ashes of unimaginable loss.
            </p>
            <p className="text-foreground mb-4">
              Born in Warsaw in 1930, Isaac was 15 when the Nazis liberated Bergen-Belsen in April 1945. He had survived the Warsaw Ghetto, deportation, and the camp, though he lost his parents and younger sister. That he emerged with his humanity intact - and with hope for the future - spoke to an indomitable spirit that would define the next eight decades of his life.
            </p>
            <p className="text-foreground mb-4">
              After recovering in a displaced persons camp, Isaac immigrated to the United States in 1947, arriving with $20 and determination. He learned English, earned his GED, and eventually graduated from Northwestern University with a degree in education. For 40 years, he taught history at Chicago public schools, ensuring that every student understood the dangers of hatred and indifference.
            </p>
            <p className="text-foreground">
              Isaac spoke at over 200 schools, museums, and community events, sharing his testimony with tens of thousands of people. His message was always the same: "Remember, so it never happens again. Choose kindness. Choose to stand up."
            </p>
          </div>

          <h2 className="text-foreground">Special Considerations</h2>

          <h3 className="text-foreground">If They Didn't Speak Publicly</h3>
          <p className="text-foreground">Respect their privacy while acknowledging their experience:</p>
          <div className="bg-muted/50 p-6 rounded-lg my-4">
            <p className="text-foreground italic">"Though she rarely spoke of her wartime experiences, those who knew her understood that her strength, compassion, and dedication to family were forged in the crucible of survival."</p>
          </div>

          <h3 className="text-foreground">Multiple Generations</h3>
          <p className="text-foreground">Emphasize the triumph of family continuity:</p>
          <div className="bg-muted/50 p-6 rounded-lg my-4">
            <p className="text-foreground italic">"She is survived by her children, 12 grandchildren, and 18 great-grandchildren - a vibrant, loving family that stands as her greatest victory over those who sought to destroy her people."</p>
          </div>

          <h2 className="text-foreground">Additional Resources</h2>
          <p className="text-foreground">Consider linking to:</p>
          <ul className="text-foreground">
            <li>Recorded testimonies (if publicly available)</li>
            <li>Holocaust museums or education centers they supported</li>
            <li>Memorial funds in their name</li>
            <li>Organizations continuing their educational work</li>
          </ul>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 my-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Need Help?</h3>
            <p className="text-foreground mb-6">
              Writing an obituary for a Holocaust survivor is an honor and a responsibility. If you need assistance, our team can help you craft a tribute that properly honors their memory and legacy.
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/create-obituary">Start Writing</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/holocaust-memorial">View Holocaust Memorial</Link>
              </Button>
            </div>
          </Card>
        </div>
      </article>

      <Footer />
    </div>
  );
}
