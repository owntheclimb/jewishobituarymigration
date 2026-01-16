'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Users, Heart, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';


export default function ArticleSheloshimPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Sheloshim: The 30-Day Mourning Period
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span>By Rabbi David Goldstein</span>
              <span>-</span>
              <span>10 min read</span>
              <span>-</span>
              <span>Jewish Mourning</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sheloshim (Hebrew for "thirty") is the 30-day mourning period that begins immediately after the burial of a loved one. This structured time helps mourners gradually transition from intense grief back to regular life while maintaining their connection to the deceased.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                Understanding the Timeline
              </h2>
              <p>
                Jewish mourning observance follows a structured progression designed to support the bereaved through different stages of grief:
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">The Mourning Timeline</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong className="text-foreground">Days 1-7 (Shiva):</strong> The most intense mourning period, staying home and receiving visitors</li>
                  <li><strong className="text-foreground">Days 8-30 (Sheloshim):</strong> Gradual return to routine with continued restrictions</li>
                  <li><strong className="text-foreground">Days 31-365 (Year of Mourning):</strong> For parents only, extended observance</li>
                </ul>
              </Card>

              <p>
                The sheloshim period includes the seven days of shiva but extends for 30 days total from the burial. This gradual approach reflects Judaism's psychological insight that grief requires time and shouldn't be rushed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Who Observes Sheloshim?
              </h2>
              <p>
                The full sheloshim mourning customs apply to those mourning the seven immediate relatives:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li>Parents (father and mother)</li>
                <li>Siblings (brother and sister)</li>
                <li>Spouse (husband or wife)</li>
                <li>Children (son and daughter)</li>
              </ul>
              <p className="mt-4">
                For other relatives and close friends, while not traditionally obligated to observe sheloshim, many choose to maintain some practices out of respect and personal grief.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Sheloshim Customs and Restrictions
              </h2>
              <p>
                During sheloshim, mourners gradually reintegrate into daily life while maintaining certain restrictions that mark their mourning status:
              </p>

              <div className="my-6 space-y-4">
                <Card className="p-5 border-l-4 border-l-primary">
                  <h3 className="font-semibold text-foreground mb-2">What Continues During Sheloshim</h3>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>- Reciting Kaddish at daily services</li>
                    <li>- Avoiding celebrations, parties, and weddings</li>
                    <li>- Refraining from live music and entertainment</li>
                    <li>- Not cutting hair or shaving (for some traditions)</li>
                    <li>- Not purchasing or wearing new clothes</li>
                  </ul>
                </Card>

                <Card className="p-5 border-l-4 border-l-accent">
                  <h3 className="font-semibold text-foreground mb-2">What Changes After Shiva</h3>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>- Returning to work and regular activities</li>
                    <li>- Leaving the home freely</li>
                    <li>- Studying Torah without restriction</li>
                    <li>- Wearing regular clothes (not necessarily new)</li>
                    <li>- Engaging in business and commerce</li>
                  </ul>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Attending Synagogue
              </h2>
              <p>
                After shiva ends, mourners return to synagogue for daily or Shabbat services. Reciting Kaddish during this period is a central practice. Many synagogues provide special recognition for those in sheloshim, and the community continues to offer support.
              </p>
              <p>
                The experience of saying Kaddish regularly creates a community of mourners supporting one another. Many people find deep meaning in this daily rhythm and the connection to Jewish tradition it provides.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Social Interactions During Sheloshim
              </h2>
              <p>
                While mourners return to work and normal activities after shiva, they continue to avoid joyous celebrations:
              </p>

              <div className="my-4 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Attending Events:</strong> Mourners typically do not attend weddings, bar/bat mitzvahs, or other celebrations during sheloshim. However, some authorities permit attending these events without participating in festive aspects like dancing.</p>

                <p><strong className="text-foreground">Hosting Events:</strong> Mourners should not host parties or celebrations during this period.</p>

                <p><strong className="text-foreground">Business Functions:</strong> Necessary business meetings and professional obligations are generally permitted.</p>

                <p><strong className="text-foreground">Religious Celebrations:</strong> Opinions vary on participation in religious events like brit milah or pidyon haben - consult with a rabbi for specific guidance.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Music and Entertainment
              </h2>
              <p>
                During sheloshim, mourners traditionally refrain from listening to live music or attending concerts and performances. The restriction on recorded music varies by tradition:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground mt-3">
                <li>Some authorities prohibit all music, even recorded</li>
                <li>Others permit background music or music for work purposes</li>
                <li>Many permit music for young children's needs</li>
                <li>Most agree on avoiding festive or joyous music</li>
              </ul>
              <p className="mt-4">
                These restrictions help maintain awareness of one's mourning status and honor the deceased's memory during this significant period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Special Considerations
              </h2>

              <Card className="p-6 my-6 bg-accent/50 border-accent">
                <h3 className="font-semibold text-foreground mb-3">When Sheloshim Is Extended</h3>
                <p className="text-muted-foreground mb-3">
                  For those mourning a parent, many restrictions continue beyond 30 days for a full Hebrew year:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                  <li>Reciting Kaddish continues for 11 months</li>
                  <li>Avoiding celebrations may extend longer</li>
                  <li>Not wearing new clothes for 12 months (some customs)</li>
                  <li>Special prayers and customs on the yahrzeit</li>
                </ul>
              </Card>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">When Holidays Interrupt Sheloshim</h3>
                <p className="text-muted-foreground">
                  Major Jewish holidays affect sheloshim observance. Generally, a major holiday (Pesach, Shavuot, Sukkot) terminates shiva but not the restrictions of sheloshim. However, complex rules apply - consult a rabbi when holidays fall during mourning periods.
                </p>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                The Psychological Wisdom of Sheloshim
              </h2>
              <p>
                Modern psychology affirms what Jewish tradition has understood for millennia: grief requires time and structured support. The sheloshim period provides:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground mt-3">
                <li><strong className="text-foreground">Gradual Reintegration:</strong> Easing back into normal life prevents overwhelming the mourner</li>
                <li><strong className="text-foreground">Continued Recognition:</strong> Society acknowledges the mourner's loss beyond the first week</li>
                <li><strong className="text-foreground">Permission to Grieve:</strong> Restrictions validate that one month is a reasonable time for intense mourning</li>
                <li><strong className="text-foreground">Community Support:</strong> Daily Kaddish connects mourners with community</li>
                <li><strong className="text-foreground">Meaningful Structure:</strong> Specific practices give purpose to the mourning period</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Supporting Someone in Sheloshim
              </h2>
              <p>
                If you know someone observing sheloshim, here's how to provide meaningful support:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground mt-3">
                <li>Continue checking in - don't assume they're "fine" because shiva ended</li>
                <li>Offer practical help with errands, meals, or childcare</li>
                <li>Invite them to join you for services if they're saying Kaddish</li>
                <li>Remember that grief doesn't follow a schedule - be patient</li>
                <li>Share memories of the deceased</li>
                <li>Be understanding about their social limitations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Conclusion
              </h2>
              <p>
                The sheloshim period represents Judaism's profound understanding of grief as a process requiring both time and structure. By providing clear guidelines for the first month after loss, Jewish tradition supports mourners through one of life's most challenging transitions while honoring the memory of the deceased.
              </p>
              <p>
                Whether observed strictly according to traditional law or adapted to contemporary circumstances, sheloshim offers a framework for mourning that acknowledges pain while gently guiding toward healing.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
