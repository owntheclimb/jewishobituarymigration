'use client';

import Script from "next/script";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ClipboardList, DollarSign, Users, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { generateArticleSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema';

const articleSchema = generateArticleSchema({
  title: 'Planning a Jewish Funeral Service: Complete Step-by-Step Guide',
  description: 'Comprehensive guide to planning a Jewish funeral. Covers choosing funeral homes, working with Chevra Kadisha, selecting caskets, cemetery options, service planning, and costs.',
  url: 'https://jewishobituary.com/articles/planning-funeral',
  datePublished: '2024-01-15',
  dateModified: '2026-01-22',
  authorName: 'Rabbi Jonathan Feldman',
  image: 'https://jewishobituary.com/og-image.jpg',
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Articles', url: 'https://jewishobituary.com/articles' },
  { name: 'Planning a Jewish Funeral', url: 'https://jewishobituary.com/articles/planning-funeral' },
]);

export default function ArticlePlanningFuneralPage() {
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
      <Navbar />

      <main className="flex-1">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Planning a Jewish Funeral Service
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span>By Rabbi Jonathan Feldman</span>
              <span>-</span>
              <span>18 min read</span>
              <span>-</span>
              <span>Practical Guide</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Planning a funeral is one of life's most difficult tasks, especially while coping with grief. This comprehensive guide will help you navigate Jewish funeral traditions, make necessary arrangements, and ensure your loved one receives a dignified final tribute that honors both Jewish law and their unique life.
            </p>

            <Card className="p-6 my-6 bg-primary/5 border-primary/20">
              <h3 className="font-semibold text-foreground mb-3">Quick Action Checklist</h3>
              <p className="text-muted-foreground mb-3">If you need to act immediately:</p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>- Contact a Jewish funeral home or Chevra Kadisha</li>
                <li>- Notify your rabbi</li>
                <li>- Obtain death certificate</li>
                <li>- Notify immediate family</li>
                <li>- Arrange for body care according to Jewish law</li>
              </ul>
            </Card>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-primary" />
                Immediate First Steps
              </h2>
              <p>
                Jewish tradition requires burial as soon as possible, typically within 24 hours of death. While this timeline may be adjusted for practical reasons (distant family, Shabbat, holidays), prompt action is still important.
              </p>

              <div className="my-6 space-y-4">
                <Card className="p-5 border-l-4 border-l-primary">
                  <h3 className="font-semibold text-foreground mb-2">Within the First Hour</h3>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>- Contact Jewish funeral home (they can guide you through everything)</li>
                    <li>- Notify your synagogue and rabbi</li>
                    <li>- If death occurred at home, don't move the body until funeral home arrives</li>
                    <li>- Begin notifying immediate family members</li>
                  </ul>
                </Card>

                <Card className="p-5 border-l-4 border-l-accent">
                  <h3 className="font-semibold text-foreground mb-2">Within the First Few Hours</h3>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>- Meet with funeral director to make arrangements</li>
                    <li>- Obtain death certificates (order multiple copies)</li>
                    <li>- Select cemetery plot if not pre-arranged</li>
                    <li>- Begin planning service details with rabbi</li>
                    <li>- Contact Chevra Kadisha for ritual preparation</li>
                  </ul>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Choosing a Funeral Home
              </h2>
              <p>
                Selecting a funeral home experienced in Jewish traditions is crucial. Jewish funeral homes understand halacha (Jewish law) and can ensure all religious requirements are met.
              </p>

              <div className="my-4 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">What to Look For:</strong></p>
                <ul className="ml-6 list-disc space-y-2">
                  <li><strong className="text-foreground">Jewish Expertise:</strong> Staff knowledgeable about Jewish funeral customs</li>
                  <li><strong className="text-foreground">Chevra Kadisha Coordination:</strong> Works with local burial society for ritual preparation</li>
                  <li><strong className="text-foreground">Cemetery Relationships:</strong> Established relationships with Jewish cemeteries</li>
                  <li><strong className="text-foreground">Transparent Pricing:</strong> Clear, itemized pricing with no hidden fees</li>
                  <li><strong className="text-foreground">Compassionate Service:</strong> Patient staff who respect your grief</li>
                  <li><strong className="text-foreground">24/7 Availability:</strong> Can respond immediately when death occurs</li>
                </ul>

                <p className="mt-4"><strong className="text-foreground">Questions to Ask:</strong></p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Do you have experience with [your denomination - Orthodox, Conservative, Reform]?</li>
                  <li>What is included in your basic service fee?</li>
                  <li>Do you coordinate with our synagogue and Chevra Kadisha?</li>
                  <li>Can you arrange burial on short notice?</li>
                  <li>What are your payment options?</li>
                </ul>
              </div>

              <Card className="p-6 my-6 bg-accent/50 border-accent">
                <h3 className="font-semibold text-foreground mb-3">Find a Jewish Funeral Home</h3>
                <p className="text-muted-foreground mb-4">
                  Our directory lists experienced Jewish funeral homes in your area who understand and respect Jewish traditions.
                </p>
                <Button asChild variant="outline">
                  <Link href="/funeral-homes">
                    Browse Funeral Homes
                  </Link>
                </Button>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                The Chevra Kadisha (Burial Society)
              </h2>
              <p>
                The Chevra Kadisha is a volunteer organization that performs the sacred duty of preparing the deceased for burial according to Jewish law. This includes tahara (ritual washing and purification) and dressing the body in traditional shrouds (tachrichim).
              </p>

              <p className="mt-3">
                This service is usually provided by your synagogue or local Jewish community at no charge, though donations are often accepted. The work of the Chevra Kadisha is considered one of the highest forms of chesed (kindness) as it's a mitzvah that can never be repaid by its recipient.
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">What Happens During Tahara</h3>
                <p className="text-muted-foreground mb-3">
                  The Chevra Kadisha performs these sacred rituals:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>- Ritual washing and cleansing of the body</li>
                  <li>- Dressing in simple white linen shrouds</li>
                  <li>- Recitation of prayers throughout the process</li>
                  <li>- Placing the body in a simple wooden casket</li>
                  <li>- Treating the deceased with utmost dignity and respect</li>
                </ul>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Selecting a Casket
              </h2>
              <p>
                Jewish tradition emphasizes simplicity and equality in death. Traditional Jewish law requires:
              </p>

              <ul className="space-y-2 ml-6 list-disc text-muted-foreground mt-3">
                <li><strong className="text-foreground">All-Wood Construction:</strong> No metal parts, nails, or hardware</li>
                <li><strong className="text-foreground">Simple Design:</strong> Unadorned, without fancy finishes</li>
                <li><strong className="text-foreground">Biodegradable:</strong> Allows natural return to earth</li>
                <li><strong className="text-foreground">Equality:</strong> Rich and poor buried in same type of casket</li>
              </ul>

              <p className="mt-4">
                Reform and some Conservative communities may permit other casket types, but many families choose traditional wooden caskets regardless of denomination, appreciating the simplicity and environmental consciousness.
              </p>

              <div className="my-4 p-5 bg-accent/30 rounded-lg border border-accent/50">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note on Costs:</strong> While some caskets can be very expensive, a traditional simple wooden casket is often among the most affordable options. Don't feel pressured to purchase elaborate caskets that conflict with Jewish values of simplicity.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Cemetery Selection and Burial Plot
              </h2>
              <p>
                If your family doesn't already own a cemetery plot, you'll need to select one quickly. Consider:
              </p>

              <div className="my-4 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Jewish Cemetery:</strong></p>
                <p>
                  Traditional Jewish law requires burial in a Jewish cemetery. These cemeteries maintain perpetual care and follow Jewish burial practices.
                </p>

                <p className="mt-3"><strong className="text-foreground">Location Considerations:</strong></p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Proximity to family members for visiting</li>
                  <li>Cemetery rules regarding headstones and decorations</li>
                  <li>Availability of family plots for future burials</li>
                  <li>Cost and payment options</li>
                  <li>Perpetual care provisions</li>
                </ul>

                <p className="mt-3"><strong className="text-foreground">Synagogue Cemeteries:</strong></p>
                <p>
                  Many synagogues maintain their own cemeteries or have sections in larger cemeteries. These often offer preferred pricing for members.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Planning the Funeral Service
              </h2>
              <p>
                Work with your rabbi to plan a meaningful service. Jewish funeral services are typically brief (20-45 minutes) and focus on honoring the deceased while providing comfort to mourners.
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">Typical Service Components</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Psalm Readings:</strong> Traditionally Psalm 23 and others</li>
                  <li><strong className="text-foreground">Eulogy (Hesped):</strong> Delivered by rabbi and/or family members</li>
                  <li><strong className="text-foreground">El Malei Rachamim:</strong> Memorial prayer for the deceased</li>
                  <li><strong className="text-foreground">Kaddish:</strong> Mourner's prayer recited by family</li>
                  <li><strong className="text-foreground">Keriah:</strong> Ritual tearing of garments (often done with ribbon)</li>
                </ul>
              </Card>

              <div className="my-6 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Decisions to Make:</strong></p>
                <ul className="ml-6 list-disc space-y-2">
                  <li><strong className="text-foreground">Location:</strong> Funeral home chapel, synagogue, or graveside only</li>
                  <li><strong className="text-foreground">Who Will Speak:</strong> Rabbi, family members, friends (keep eulogies brief and appropriate)</li>
                  <li><strong className="text-foreground">Open or Closed Casket:</strong> Jewish tradition typically prefers closed</li>
                  <li><strong className="text-foreground">Music:</strong> Some traditions permit certain Jewish songs or niggunim</li>
                  <li><strong className="text-foreground">Timing:</strong> Coordinate with family travel, but keep as prompt as possible</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                The Burial Service
              </h2>
              <p>
                The graveside service is the final farewell. Key elements include:
              </p>

              <ul className="space-y-3 ml-6 list-disc text-muted-foreground mt-4">
                <li>
                  <strong className="text-foreground">Lowering the Casket:</strong> The casket is lowered into the grave. In many communities, family members and mourners participate in filling the grave with earth, which is considered a great mitzvah.
                </li>
                <li>
                  <strong className="text-foreground">Filling the Grave:</strong> Mourners take turns shoveling earth into the grave. Traditionally, the shovel is not passed hand-to-hand but placed in the ground for the next person, symbolizing that we don't "pass along" death.
                </li>
                <li>
                  <strong className="text-foreground">Kaddish:</strong> The Mourner's Kaddish is recited at the graveside.
                </li>
                <li>
                  <strong className="text-foreground">Comforting the Mourners:</strong> Attendees form two lines through which the mourners walk, while being greeted with "May God comfort you among all the mourners of Zion and Jerusalem."
                </li>
                <li>
                  <strong className="text-foreground">Hand Washing:</strong> Before leaving the cemetery, people wash hands as a ritual purification.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                Understanding Costs
              </h2>
              <p>
                Jewish funeral costs vary widely by location and choices made. Being informed helps you make appropriate decisions without financial pressure during an emotional time.
              </p>

              <Card className="p-6 my-6 bg-accent/50 border-accent">
                <h3 className="font-semibold text-foreground mb-3">Typical Cost Breakdown</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li><strong className="text-foreground">Funeral Home Basic Services:</strong> $2,000 - $4,000</li>
                  <li><strong className="text-foreground">Casket:</strong> $1,000 - $8,000 (simple wooden: $1,000-$2,500)</li>
                  <li><strong className="text-foreground">Cemetery Plot:</strong> $1,000 - $15,000 (varies greatly by region)</li>
                  <li><strong className="text-foreground">Opening/Closing Grave:</strong> $1,000 - $3,000</li>
                  <li><strong className="text-foreground">Headstone:</strong> $1,500 - $5,000</li>
                  <li><strong className="text-foreground">Death Certificates:</strong> $10 - $25 each</li>
                  <li><strong className="text-foreground">Newspaper Obituaries:</strong> $200 - $1,000+</li>
                </ul>
                <p className="mt-4 text-sm text-foreground font-semibold">
                  Total Range: $7,000 - $35,000+
                </p>
              </Card>

              <div className="my-6 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Ways to Manage Costs:</strong></p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Choose traditional simple wooden casket (often less expensive and preferred)</li>
                  <li>Ask about synagogue member discounts on cemetery plots</li>
                  <li>Compare prices between funeral homes (required by law)</li>
                  <li>Consider pre-owned family plots if available</li>
                  <li>Publish obituary online rather than in print newspapers</li>
                  <li>Ask about Jewish communal assistance funds if needed</li>
                </ul>

                <div className="mt-4 p-5 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-sm">
                    <strong className="text-foreground">Financial Assistance:</strong> Many Jewish communities have gemilut chasadim (free loan) societies or burial assistance funds to help families who cannot afford funeral costs. Speak confidentially with your rabbi or local Jewish Family Services.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Preparing for Shiva
              </h2>
              <p>
                The funeral home and your community will help you prepare for the shiva period following the burial:
              </p>

              <div className="my-4 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Before Returning Home:</strong></p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Arrange for the "meal of condolence" (typically prepared by friends/community)</li>
                  <li>Set up low chairs or stools for mourners</li>
                  <li>Cover mirrors (traditional custom)</li>
                  <li>Light shiva candle (burns for seven days)</li>
                  <li>Arrange daily minyan if you'll be hosting services</li>
                  <li>Notify friends about shiva times and address</li>
                </ul>

                <p className="mt-4"><strong className="text-foreground">Community Support:</strong></p>
                <p>
                  Many synagogues coordinate meal preparation, minyan attendance, and practical help during shiva. Don't hesitate to accept this support - it's a mitzvah for the community to provide it.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Phone className="h-6 w-6 text-primary" />
                Administrative Tasks
              </h2>
              <p>
                While overwhelming during grief, certain administrative tasks require attention:
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">Essential Notifications</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>- Social Security Administration (funeral home often does this)</li>
                  <li>- Life insurance companies</li>
                  <li>- Employer/pension plans</li>
                  <li>- Banks and financial institutions</li>
                  <li>- Credit card companies</li>
                  <li>- Utilities and subscriptions</li>
                  <li>- Veterans Affairs (if applicable)</li>
                  <li>- Attorney (if estate planning is needed)</li>
                </ul>
              </Card>

              <p className="mt-4">
                Don't feel you must handle everything immediately. Focus on the funeral and shiva first. Other administrative matters can wait a few weeks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Special Circumstances
              </h2>

              <div className="my-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Death on Shabbat or Holidays:</h3>
                  <p className="text-muted-foreground">
                    Burial cannot occur on Shabbat or major holidays. The body will be kept until after Shabbat/holiday ends. Your funeral home and rabbi will coordinate timing. For consecutive holidays, burial may be delayed several days.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Out-of-Town Family:</h3>
                  <p className="text-muted-foreground">
                    While Jewish tradition emphasizes prompt burial, reasonable accommodation for close family to attend is acceptable. Discuss timing with your rabbi.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Autopsy or Organ Donation:</h3>
                  <p className="text-muted-foreground">
                    Traditional Jewish law has reservations about autopsy and organ donation, but many rabbis permit these under certain circumstances. If relevant, consult your rabbi immediately as time is often critical.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Death Away From Home:</h3>
                  <p className="text-muted-foreground">
                    If death occurs while traveling, a Jewish funeral home can coordinate transport of the body to your home community. Airlines have specific procedures for this, which the funeral home will handle.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Taking Care of Yourself
              </h2>
              <p>
                Planning a funeral while grieving is exhausting. Remember:
              </p>

              <ul className="space-y-2 ml-6 list-disc text-muted-foreground mt-3">
                <li>Accept help from family, friends, and community</li>
                <li>You don't need to make every decision alone</li>
                <li>It's okay to take breaks and step away</li>
                <li>Lean on professionals - they're there to guide you</li>
                <li>There's no "perfect" funeral - focus on honoring your loved one</li>
                <li>Grief is individual - allow yourself to feel what you feel</li>
              </ul>

              <p className="mt-4">
                The period after a death is one of the most challenging times in life. Jewish tradition provides structure, community support, and wisdom accumulated over millennia to help you through it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Conclusion
              </h2>
              <p>
                Planning a Jewish funeral means honoring tradition while celebrating a unique life. With guidance from your rabbi, funeral home, and community, you'll create a meaningful tribute that provides comfort to mourners and respects both Jewish values and your loved one's memory.
              </p>
              <p>
                Remember that the rituals and customs of Jewish mourning exist not just to honor the dead, but to support the living through grief. Allow yourself to be supported, lean on tradition, and trust that the path outlined by Jewish wisdom will help you through this difficult time.
              </p>
              <p className="italic text-muted-foreground mt-4">
                May you be comforted among the mourners of Zion and Jerusalem
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
