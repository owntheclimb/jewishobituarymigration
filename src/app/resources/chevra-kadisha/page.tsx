'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Share2, Download, ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';
import JewishWisdom from '@/components/JewishWisdom';


export default function ArticleChevraKadishaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/resources">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge>Jewish Customs</Badge>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              14 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            What is a Chevra Kadisha? Understanding the Holy Society
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            The chevra kadisha, or "holy society," performs one of Judaism's most sacred acts: preparing the deceased for burial with dignity, respect, and adherence to ancient traditions.
          </p>

          <div className="flex gap-3">
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop"
              alt="Hands performing sacred work"
              className="w-full rounded-xl shadow-elegant mb-8"
            />

            <h2 className="text-3xl font-bold mb-4 text-foreground">What Does Chevra Kadisha Mean?</h2>
            <p className="text-foreground leading-relaxed mb-6">
              <strong>Chevra Kadisha</strong> literally translates to "holy society" or "sacred fellowship." It refers to a group of Jewish community volunteers who perform <em>taharah</em> (ritual purification) and prepare deceased members of the Jewish community for burial according to Jewish law and tradition.
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              This mitzvah is considered one of the highest acts of loving-kindness (<em>chesed shel emet</em>) because it's performed for someone who can never repay the kindness. Members serve with the understanding that they're honoring the deceased and fulfilling a sacred obligation to the community.
            </p>

            <div className="my-8">
              <JewishWisdom
                title="The Ultimate Act of Kindness"
                content="Jewish tradition considers caring for the deceased as chesed shel emet - true loving-kindness - because the deceased cannot repay or thank those who care for them. This selfless act is viewed as one of the most noble mitzvot a person can perform."
                source="Talmud, Tractate Berachot"
                variant="tradition"
              />
            </div>

            <h2 className="text-3xl font-bold mb-4 text-foreground">The Sacred Work of the Chevra Kadisha</h2>

            <h3 className="text-2xl font-semibold mb-3 text-foreground">What They Do</h3>
            <p className="text-foreground leading-relaxed mb-6">
              The chevra kadisha performs several crucial functions:
            </p>

            <Card className="p-6 bg-card border my-6">
              <h4 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Primary Responsibilities
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-foreground mb-2">1. Shemira (Guarding)</h5>
                  <p className="text-foreground">Ensuring the deceased is never left alone from death until burial. Traditionally, someone sits with the body, often reciting Psalms.</p>
                </div>

                <div>
                  <h5 className="font-semibold text-foreground mb-2">2. Taharah (Purification)</h5>
                  <p className="text-foreground">Ritually cleansing the body with water in a specific, respectful manner. This process symbolically purifies the body before it returns to the earth.</p>
                </div>

                <div>
                  <h5 className="font-semibold text-foreground mb-2">3. Dressing (Tachrichim)</h5>
                  <p className="text-foreground">Dressing the deceased in simple white linen shrouds, ensuring dignity and equality in death regardless of wealth or status.</p>
                </div>

                <div>
                  <h5 className="font-semibold text-foreground mb-2">4. Placement in Casket</h5>
                  <p className="text-foreground">Carefully placing the body in a simple wooden casket (in accordance with traditional practice).</p>
                </div>

                <div>
                  <h5 className="font-semibold text-foreground mb-2">5. Coordination</h5>
                  <p className="text-foreground">Working with families, funeral homes, and cemeteries to ensure all Jewish burial customs are properly observed.</p>
                </div>
              </div>
            </Card>

            <h2 className="text-3xl font-bold mb-4 text-foreground">The Taharah Ceremony</h2>
            <p className="text-foreground leading-relaxed mb-6">
              The taharah is performed with utmost respect and according to precise traditions:
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3">The Taharah Process:</h4>
                <ol className="list-decimal pl-6 text-foreground space-y-3">
                  <li><strong>Team Assembly:</strong> Usually 4-6 volunteers of the same gender as the deceased</li>
                  <li><strong>Opening Prayer:</strong> Asking for permission to perform this sacred duty</li>
                  <li><strong>Initial Preparation:</strong> Respectful removal of clothing and jewelry</li>
                  <li><strong>Cleansing:</strong> Thorough washing of the entire body</li>
                  <li><strong>Pouring:</strong> Continuous pouring of water over the body, similar to immersion in a mikvah</li>
                  <li><strong>Drying:</strong> Gently drying with clean linens</li>
                  <li><strong>Dressing:</strong> Clothing in tachrichim (traditional burial shrouds)</li>
                  <li><strong>Positioning:</strong> Placing in the casket with soil from Israel if available</li>
                  <li><strong>Closing Words:</strong> Prayers asking for forgiveness and peace</li>
                </ol>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-6 my-6 rounded-r-lg">
              <p className="text-foreground mb-2">
                <strong>Important:</strong> Throughout the entire process, the deceased is treated with the utmost dignity. Members speak only about the task at hand, maintain modest conduct, and work with reverence.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-foreground">Who Can Join a Chevra Kadisha?</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Chevra kadisha membership is open to committed members of the Jewish community, though specific requirements vary:
            </p>

            <Card className="p-6 my-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Typical Requirements:</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Jewish Community Member:</strong> Active in Jewish life</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Training:</strong> Willingness to undergo training and mentorship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Commitment:</strong> Available when called, often on short notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Emotional Maturity:</strong> Able to handle the sacred but difficult work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Discretion:</strong> Maintaining confidentiality about what they see and do</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Physical Ability:</strong> Capable of the physical aspects of the work</span>
                </li>
              </ul>
            </Card>

            <h3 className="text-2xl font-semibold mb-3 text-foreground">Gender Considerations</h3>
            <p className="text-foreground leading-relaxed mb-6">
              Traditional practice requires that taharah be performed by members of the same gender as the deceased. Most chevra kadishas have both men's and women's teams operating independently.
            </p>

            <h2 className="text-3xl font-bold mb-4 text-foreground">Why This Work Matters</h2>
            <p className="text-foreground leading-relaxed mb-6">
              The chevra kadisha embodies several core Jewish values:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-6">
              <Card className="p-6">
                <h4 className="font-semibold text-primary mb-2">Kavod HaMet</h4>
                <p className="text-sm text-foreground">Honoring the deceased with dignity and respect</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold text-primary mb-2">Chesed Shel Emet</h4>
                <p className="text-sm text-foreground">True kindness that expects nothing in return</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold text-primary mb-2">Community Responsibility</h4>
                <p className="text-sm text-foreground">Taking care of our own with compassion</p>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold text-primary mb-2">Equality in Death</h4>
                <p className="text-sm text-foreground">Same treatment regardless of status or wealth</p>
              </Card>
            </div>

            <div className="my-8">
              <JewishWisdom
                title="The Impact of Sacred Service"
                content="Studies of chevra kadisha members show that this sacred work profoundly impacts their own perspective on life and death. Members often report feeling more grounded, appreciative of life, and connected to their Jewish community and traditions."
                source="Contemporary Jewish Life Studies"
                variant="research"
              />
            </div>

            <h2 className="text-3xl font-bold mb-4 text-foreground">Modern Chevra Kadisha</h2>
            <p className="text-foreground leading-relaxed mb-6">
              Today's chevra kadisha organizations continue ancient practices while adapting to modern realities:
            </p>

            <ul className="list-disc pl-6 mb-6 text-foreground space-y-2">
              <li>Formal training programs with experienced mentors</li>
              <li>Written procedures ensuring consistency and respect</li>
              <li>Coordination with medical examiners and modern funeral practices</li>
              <li>Support systems for members dealing with the emotional impact</li>
              <li>Inclusion of Jews by choice and LGBTQ+ individuals in many communities</li>
              <li>Educational outreach to help communities understand their work</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Do families pay for chevra kadisha services?</h3>
                <p className="text-foreground">Traditionally, no. Chevra kadisha is a volunteer service. However, some communities accept donations to cover supplies and maintain facilities.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Can family members be present during taharah?</h3>
                <p className="text-foreground">Generally, no. This sacred work is performed privately by trained chevra kadisha members to maintain the deceased's dignity.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">What happens if there's no chevra kadisha in my community?</h3>
                <p className="text-foreground">Larger communities may have regional chevra kadishas that travel. Some funeral homes employ trained staff. Alternatively, families can work to establish a chevra kadisha in their community.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Are chevra kadisha members professionals?</h3>
                <p className="text-foreground">They are trained volunteers, not medical professionals. However, they work closely with funeral homes and follow established protocols meticulously.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">How can I ensure my community has this service?</h3>
                <p className="text-foreground">Contact your synagogue or Jewish community center. Many communities actively recruit and train new members. It's considered a great honor to join.</p>
              </div>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
              <p className="text-lg text-foreground italic leading-relaxed mb-2">
                "In serving the chevra kadisha, we don't just honor the deceased - we affirm the sanctity of every human life and the eternal bonds of our community. This is Judaism at its most beautiful: practical compassion rooted in ancient wisdom."
              </p>
              <p className="text-sm text-muted-foreground text-right">-- Rabbi Simkha Weintraub</p>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 my-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Interested in Joining?</h3>
              <p className="text-foreground mb-6">
                If you're interested in this sacred service, reach out to your local synagogue or Jewish community organization. Most communities welcome dedicated individuals willing to undergo training.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/communities">Find Your Community</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/resources">Learn More</Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-4 hover:shadow-elegant transition-all">
                <Badge className="mb-2">Jewish Customs</Badge>
                <h4 className="font-semibold mb-2">Jewish Burial Traditions</h4>
                <p className="text-sm text-muted-foreground mb-3">Complete guide to Jewish funerals</p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/resources/jewish-funeral-traditions">Read More</Link>
                </Button>
              </Card>

              <Card className="p-4 hover:shadow-elegant transition-all">
                <Badge className="mb-2">Jewish Customs</Badge>
                <h4 className="font-semibold mb-2">Cemetery Customs</h4>
                <p className="text-sm text-muted-foreground mb-3">Etiquette and traditions</p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/resources/jewish-cemetery">Read More</Link>
                </Button>
              </Card>

              <Card className="p-4 hover:shadow-elegant transition-all">
                <Badge className="mb-2">Jewish Customs</Badge>
                <h4 className="font-semibold mb-2">Understanding Shiva</h4>
                <p className="text-sm text-muted-foreground mb-3">The seven-day mourning period</p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/resources/understanding-shiva">Read More</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
