'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PenTool, Heart, Users, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function ArticleWritingObituaryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              How to Write a Meaningful Jewish Obituary
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span>By Rachel Levine</span>
              <span>-</span>
              <span>15 min read</span>
              <span>-</span>
              <span>Writing Guide</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Writing an obituary is an act of love and remembrance. A well-crafted obituary honors the deceased's life, provides essential information, and offers comfort to those who mourn. This guide will help you create a meaningful tribute that blends traditional Jewish elements with personal touches.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <PenTool className="h-6 w-6 text-primary" />
                Essential Elements of a Jewish Obituary
              </h2>
              <p>
                While styles vary, most Jewish obituaries include these core components:
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">Key Components</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Full Name:</strong> English and Hebrew names (including maiden name for women)</li>
                  <li><strong className="text-foreground">Age:</strong> At time of death</li>
                  <li><strong className="text-foreground">Date of Death:</strong> Including Hebrew date when applicable</li>
                  <li><strong className="text-foreground">Place of Death:</strong> City or specific location if appropriate</li>
                  <li><strong className="text-foreground">Survivors:</strong> Immediate family members</li>
                  <li><strong className="text-foreground">Predeceased:</strong> Family members who died previously</li>
                  <li><strong className="text-foreground">Life Story:</strong> Biographical highlights and achievements</li>
                  <li><strong className="text-foreground">Service Information:</strong> Funeral and shiva details</li>
                  <li><strong className="text-foreground">Memorial Contributions:</strong> Preferred charities in lieu of flowers</li>
                </ul>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Opening Lines: Setting the Tone
              </h2>
              <p>
                The opening sentence establishes the obituary's tone. Traditional Jewish obituaries often begin with formal language:
              </p>

              <div className="my-6 space-y-4">
                <Card className="p-5 border-l-4 border-l-primary">
                  <h3 className="font-semibold text-foreground mb-2">Traditional Openings</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>"[Name], beloved [relationship], passed away peacefully on [date]"</li>
                    <li>"With heavy hearts, the family of [Name] announces their passing on [date]"</li>
                    <li>"[Name], z"l (zichrono/zichrona livracha - of blessed memory), died on [date]"</li>
                  </ul>
                </Card>

                <Card className="p-5 border-l-4 border-l-accent">
                  <h3 className="font-semibold text-foreground mb-2">Contemporary Openings</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>"[Name] embraced life with joy and passed surrounded by family on [date]"</li>
                    <li>"The world lost a remarkable soul when [Name] died on [date]"</li>
                    <li>"After a life well-lived, [Name] passed peacefully on [date]"</li>
                  </ul>
                </Card>
              </div>

              <p>
                The abbreviation "z"l" after a name signifies "may their memory be for a blessing" and is commonly used in Jewish obituaries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Listing Family Members
              </h2>
              <p>
                Jewish obituaries typically list survivors in a specific order, though conventions have evolved to reflect modern family structures:
              </p>

              <div className="my-4 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Traditional Order:</strong></p>
                <ol className="ml-6 list-decimal space-y-1">
                  <li>Spouse</li>
                  <li>Children (often listed eldest to youngest)</li>
                  <li>Grandchildren (sometimes listed by family group)</li>
                  <li>Great-grandchildren (if numerous, may say "X great-grandchildren")</li>
                  <li>Siblings</li>
                  <li>Other close relatives (nieces, nephews, cousins)</li>
                </ol>

                <p className="mt-4"><strong className="text-foreground">Modern Considerations:</strong></p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Include step-family members and their relationships</li>
                  <li>List partners of adult children</li>
                  <li>Consider using "survived by" for living relatives and "predeceased by" for those who died previously</li>
                  <li>Some families list grandchildren and great-grandchildren by number rather than by name</li>
                </ul>
              </div>

              <Card className="p-6 my-6 bg-accent/50 border-accent">
                <h3 className="font-semibold text-foreground mb-3">Example Family Listing</h3>
                <p className="text-muted-foreground text-sm">
                  "[Name] is survived by her devoted husband of 52 years, David; children Sarah (Michael) Goldberg, Rabbi Joshua (Rebecca) Cohen, and Daniel (Emily) Cohen; grandchildren Maya, Jacob, Hannah, Noah, and Leah; sister Ruth (Mark) Levine; and numerous nieces, nephews, and cousins. She was predeceased by her parents, Abraham and Miriam Rothstein, and her brother, Samuel Rothstein."
                </p>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Crafting the Life Story
              </h2>
              <p>
                The biographical section is where you paint a picture of who the person was. Focus on what made them unique:
              </p>

              <div className="my-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What to Include:</h3>
                  <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                    <li><strong className="text-foreground">Birth and Early Life:</strong> Where born, family background, immigration story if applicable</li>
                    <li><strong className="text-foreground">Education:</strong> Schools attended, degrees earned, significant academic achievements</li>
                    <li><strong className="text-foreground">Career:</strong> Professional accomplishments, businesses owned, impact in field</li>
                    <li><strong className="text-foreground">Jewish Life:</strong> Synagogue membership, communal involvement, religious practices</li>
                    <li><strong className="text-foreground">Community Service:</strong> Volunteer work, board memberships, charitable causes</li>
                    <li><strong className="text-foreground">Hobbies and Interests:</strong> Passions, talents, what brought them joy</li>
                    <li><strong className="text-foreground">Personal Qualities:</strong> Character traits, how they touched others' lives</li>
                    <li><strong className="text-foreground">Military Service:</strong> Branch, years served, honors received</li>
                  </ul>
                </div>

                <Card className="p-5 bg-primary/5 border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Pro Tips for Storytelling</h3>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>- Use specific details and anecdotes rather than generic descriptions</li>
                    <li>- Let their personality shine through the writing</li>
                    <li>- Include quotes or favorite sayings if meaningful</li>
                    <li>- Balance professional achievements with personal qualities</li>
                    <li>- Consider what legacy they'd want remembered</li>
                  </ul>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                Jewish-Specific Elements
              </h2>
              <p>
                Incorporating Jewish elements makes the obituary culturally authentic:
              </p>

              <div className="my-4 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Hebrew Names:</strong></p>
                <p>
                  Include the Hebrew name, especially for those active in Jewish life. Format: "[English name], known in Hebrew as [Hebrew name] bat/ben [father's Hebrew name]"
                </p>

                <p className="mt-3"><strong className="text-foreground">Hebrew Dates:</strong></p>
                <p>
                  List both secular and Hebrew dates of death: "She passed away on January 15, 2024, corresponding to the 4th of Shevat, 5784"
                </p>

                <p className="mt-3"><strong className="text-foreground">Communal Roles:</strong></p>
                <p>
                  Mention positions in synagogues, Jewish organizations, or Holocaust survivor status if relevant
                </p>

                <p className="mt-3"><strong className="text-foreground">Traditions Observed:</strong></p>
                <p>
                  Reference keeping kosher, Shabbat observance, or other practices central to their identity
                </p>

                <p className="mt-3"><strong className="text-foreground">Israel Connection:</strong></p>
                <p>
                  Note Israel visits, family there, or support for Israeli causes if significant
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Service and Shiva Information
              </h2>
              <p>
                Provide clear, complete details about funeral services and shiva:
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">What to Include</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Funeral Service:</strong> Date, time, location, cemetery</li>
                  <li><strong className="text-foreground">Shiva Observance:</strong> Dates, times, address(es)</li>
                  <li><strong className="text-foreground">Minyan Times:</strong> If hosting daily services</li>
                  <li><strong className="text-foreground">Private vs. Public:</strong> Specify if services are private</li>
                  <li><strong className="text-foreground">Livestream Info:</strong> If services will be broadcast</li>
                  <li><strong className="text-foreground">Meal Arrangements:</strong> If community members should bring food</li>
                </ul>
              </Card>

              <p className="mt-4">
                Example: "Funeral services will be held Tuesday, January 16, at 11:00 AM at Temple Beth Shalom, 123 Main Street. Interment will follow at Mount Olive Cemetery. The family will receive visitors at their home, 456 Oak Avenue, from Wednesday evening through Sunday morning, with services at 7:00 PM each evening."
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Memorial Contributions
              </h2>
              <p>
                Jewish tradition encourages charitable giving in memory of the deceased. Guide well-wishers by suggesting specific organizations:
              </p>

              <div className="my-4 space-y-2 text-muted-foreground">
                <p>
                  "In lieu of flowers, memorial contributions may be made to [Charity Name], [Address or Website]."
                </p>
                <p>
                  Consider listing 2-3 charities that were meaningful to the deceased, such as:
                </p>
                <ul className="ml-6 list-disc space-y-1 mt-2">
                  <li>Their synagogue</li>
                  <li>Jewish Federation</li>
                  <li>Disease research foundations</li>
                  <li>Educational institutions</li>
                  <li>Israel-related organizations</li>
                  <li>Local Jewish social services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Length and Style Guidelines
              </h2>

              <div className="my-4 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Length:</strong></p>
                <ul className="ml-6 list-disc space-y-1">
                  <li><strong>Brief:</strong> 150-250 words - basic facts, limited biography</li>
                  <li><strong>Standard:</strong> 250-500 words - most common, good balance</li>
                  <li><strong>Comprehensive:</strong> 500-800 words - detailed life story</li>
                </ul>

                <p className="mt-4"><strong className="text-foreground">Style Tips:</strong></p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Write in past tense</li>
                  <li>Use respectful, dignified language</li>
                  <li>Avoid cliches when possible ("passed away peacefully" is acceptable, but try for specific details)</li>
                  <li>Be honest but kind - focus on positive qualities</li>
                  <li>Proofread carefully - names, dates, and titles must be accurate</li>
                  <li>Consider having family members review before publication</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Common Mistakes to Avoid
              </h2>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li><strong className="text-foreground">Incomplete Information:</strong> Missing service details or contact information</li>
                <li><strong className="text-foreground">Name Errors:</strong> Misspelled names or incorrect relationships</li>
                <li><strong className="text-foreground">Omitting Family:</strong> Accidentally leaving out a child or grandchild</li>
                <li><strong className="text-foreground">Too Generic:</strong> Using vague descriptions instead of specific details</li>
                <li><strong className="text-foreground">Inappropriate Humor:</strong> Jokes or casual language that seems disrespectful</li>
                <li><strong className="text-foreground">Privacy Violations:</strong> Including sensitive information the deceased wouldn't want shared</li>
                <li><strong className="text-foreground">Rushing:</strong> Publishing without proper review and accuracy checking</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Sample Jewish Obituary
              </h2>

              <Card className="p-6 my-6 bg-accent/50 border-accent">
                <div className="text-sm text-muted-foreground space-y-3">
                  <p className="font-semibold text-foreground">
                    Miriam Ruth Cohen, z"l
                  </p>
                  <p>
                    Miriam Ruth Cohen, known in Hebrew as Miriam Rivka bat Avraham, passed away peacefully on January 15, 2024 (4th of Shevat, 5784), surrounded by her loving family. She was 87 years old.
                  </p>
                  <p>
                    Born in Brooklyn, New York, to immigrant parents Abraham and Sarah Weinstein, Miriam grew up steeped in Jewish tradition and values. She graduated from Brooklyn College in 1958 with a degree in education and dedicated 35 years to teaching second grade in the New York City public schools, where she touched countless young lives with her patience, creativity, and unwavering belief in every child's potential.
                  </p>
                  <p>
                    Miriam married her beloved husband, Rabbi David Cohen, in 1960, and together they built a life centered on family, faith, and community service. She was an active member of Temple Beth Shalom for over 50 years, serving on the Sisterhood board and coordinating the synagogue's meals for mourners program. Her legendary challah, baked fresh every Friday, was shared generously with neighbors, newcomers, and anyone in need of comfort.
                  </p>
                  <p>
                    An avid reader and lifelong learner, Miriam participated in weekly Torah study groups well into her 80s. She traveled to Israel seven times and maintained close relationships with family there. Her home was always open, her table always welcoming, and her warmth touched all who knew her.
                  </p>
                  <p>
                    Miriam is survived by her devoted husband of 63 years, Rabbi David Cohen; her children, Sarah (Michael) Goldberg, Rabbi Joshua (Rebecca) Cohen, and Daniel (Emily) Cohen; five adoring grandchildren, Maya, Jacob, Hannah, Noah, and Leah; her sister, Ruth (Mark) Levine; and numerous nieces, nephews, and cousins who treasured her wisdom and love. She was predeceased by her parents and her brother, Samuel Weinstein.
                  </p>
                  <p>
                    Funeral services will be held Wednesday, January 17, at 11:00 AM at Temple Beth Shalom, 789 Main Street. Interment will follow at Mount Sinai Cemetery. The family will sit shiva at their home, 456 Oak Avenue, from Wednesday evening through Sunday morning, with services at 7:00 PM each evening.
                  </p>
                  <p>
                    In lieu of flowers, memorial contributions may be made to Temple Beth Shalom or the Alzheimer's Association. May her memory be for a blessing.
                  </p>
                </div>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Getting Help
              </h2>
              <p>
                Writing an obituary during a time of grief can be overwhelming. Don't hesitate to ask for help:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground mt-3">
                <li>Many funeral homes offer writing assistance</li>
                <li>Family members can collaborate on drafts</li>
                <li>Rabbis or cantors often provide guidance</li>
                <li>Professional obituary writers are available</li>
                <li>Online tools and templates can provide structure</li>
              </ul>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">Need Help Writing?</h3>
                <p className="text-muted-foreground mb-4">
                  Our interactive obituary helper guides you through the process step-by-step, making it easier to create a meaningful tribute during a difficult time.
                </p>
                <Button asChild>
                  <Link href="/obituary-helper">
                    Try Our Obituary Helper
                  </Link>
                </Button>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Conclusion
              </h2>
              <p>
                A well-written obituary is more than an announcement - it's a lasting tribute that honors a life lived and provides comfort to those who mourn. By blending factual information with personal touches and Jewish tradition, you create a meaningful memorial that celebrates your loved one's unique legacy.
              </p>
              <p>
                Take your time, involve family members, and remember that there's no single "right" way to write an obituary. What matters most is that it authentically represents the person you're honoring and provides the information mourners need to pay their respects.
              </p>
              <p className="italic text-muted-foreground mt-4">
                May the memory of your loved one be for a blessing
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
