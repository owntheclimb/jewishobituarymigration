import { Metadata } from "next";
import Script from 'next/script';
import { generateSpeakableSchema, schemaToString as schemaToStr } from "@/lib/schema";
import { ExpertQuote, StatisticHighlight, StatisticGrid, DefinitionBox, DefinitionGrid, SourcesCitation } from "@/components/geo";
import { Users, Calendar, Ruler } from "lucide-react";

const speakableSchema = generateSpeakableSchema({
  url: 'https://jewishobituary.com/resources/jewish-cemetery',
  name: 'Jewish Cemetery Customs and Etiquette',
  cssSelectors: ['.article-title', '.article-summary', '.key-takeaways', '.faq-question', '.faq-answer'],
});

export const metadata: Metadata = {
  title: "Jewish Cemetery Customs and Etiquette",
  description: "Understanding the customs and etiquette of Jewish cemeteries helps visitors show proper respect while connecting with cherished memories.",
  keywords: ["Jewish cemetery", "cemetery etiquette", "placing stones", "Jewish burial ground", "visiting graves", "beit olam"],
  openGraph: {
    title: "Jewish Cemetery Customs and Etiquette",
    description: "Understanding the customs and etiquette of Jewish cemeteries helps visitors show proper respect while connecting with cherished memories.",
    type: "article",
    url: "https://jewishobituary.com/resources/jewish-cemetery",
  },
  alternates: {
    canonical: "https://jewishobituary.com/resources/jewish-cemetery",
  },
};
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Heart, TreePine, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { AuthorBox } from '@/components/AuthorBox';
import { getAuthor } from '@/data/authors';
import { generateArticleSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema';

const articleSchema = generateArticleSchema({
  title: 'Jewish Cemetery Customs and Etiquette',
  description: 'Understanding the customs and etiquette of Jewish cemeteries helps visitors show proper respect while connecting with cherished memories.',
  url: 'https://jewishobituary.com/resources/jewish-cemetery',
  datePublished: '2024-02-15',
  dateModified: '2026-02-09',
  authorName: 'Jewish Obituary Editorial Team',
  image: 'https://jewishobituary.com/og-image.jpg',
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Resources', url: 'https://jewishobituary.com/resources' },
  { name: 'Jewish Cemetery', url: 'https://jewishobituary.com/resources/jewish-cemetery' },
]);


export default function ArticleJewishCemeteryPage() {
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
        id="speakable-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToStr(speakableSchema) }}
      />
      <Navbar />

      <main className="flex-1">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Jewish Cemetery Customs and Etiquette
            </h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm mb-6">
              <span>12 min read</span>
              <span>-</span>
              <span>Jewish Traditions</span>
            </div>

            <AuthorBox author={author} />
          </header>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Jewish cemeteries are sacred spaces known as Beit HaChaim (House of Life) or Beit Olam (House of Eternity). Understanding the customs and etiquette of these holy grounds helps visitors show proper respect while connecting with cherished memories.
            </p>

            {/* Key Statistics */}
            <div className="my-8 not-prose">
              <StatisticGrid columns={3}>
                <StatisticHighlight
                  value="4 amot"
                  label="Distance (6-8 feet) kohanim must maintain from graves"
                  source="Shulchan Aruch"
                  icon={Ruler}
                />
                <StatisticHighlight
                  value="30 days"
                  label="Minimum wait before unveiling (some traditions)"
                  source="Custom varies"
                  icon={Calendar}
                />
                <StatisticHighlight
                  value="1+ years"
                  label="Common unveiling timing after burial"
                  source="Traditional practice"
                  icon={Users}
                />
              </StatisticGrid>
            </div>

            {/* Expert Quote */}
            <div className="my-8 not-prose">
              <ExpertQuote
                quote="Why do we visit cemeteries? So that the deceased may intercede for mercy on our behalf."
                expertName="Talmud Ta'anit 16a"
                credentials="Talmudic Source"
                source="Talmud Bavli"
                variant="prominent"
              />
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                The Sanctity of Jewish Cemeteries
              </h2>
              <p>
                In Jewish tradition, cemeteries are considered holy ground. The Hebrew term "Beit HaChaim" - House of Life - reflects the Jewish belief in the eternal nature of the soul and the ultimate resurrection of the dead. This sacredness requires visitors to conduct themselves with respect and reverence.
              </p>
              <p>
                Jewish cemeteries have been integral to Jewish communities throughout history, often among the first institutions established in new settlements. They serve not just as burial grounds but as historical records, genealogical resources, and tangible connections to Jewish heritage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Cemetery Organization and Layout
              </h2>
              <p>
                Traditional Jewish cemeteries often feature distinctive organizational principles:
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">Common Cemetery Sections</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Kohanim Section:</strong> Descendants of the priestly class buried separately</li>
                  <li><strong className="text-foreground">Family Plots:</strong> Multiple generations of families buried together</li>
                  <li><strong className="text-foreground">Community Leaders:</strong> Rabbis and scholars often in prominent locations</li>
                  <li><strong className="text-foreground">Children's Section:</strong> Dedicated area for young children</li>
                  <li><strong className="text-foreground">Holocaust Survivors:</strong> Special sections in some cemeteries</li>
                </ul>
              </Card>

              <p>
                Graves typically face Jerusalem when possible, symbolizing the deceased's spiritual orientation toward the Holy Land. Walking paths are designed to provide access while minimizing the need to step over graves.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Visiting Etiquette
              </h2>
              <p>
                When visiting a Jewish cemetery, certain customs and courtesies help maintain the sanctity of the space:
              </p>

              <div className="my-6 space-y-4">
                <Card className="p-5 border-l-4 border-l-primary">
                  <h3 className="font-semibold text-foreground mb-2">Before Entering</h3>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>- Men should cover their heads (kippah or hat)</li>
                    <li>- Dress modestly and respectfully</li>
                    <li>- Wash hands at the basin when leaving (if available)</li>
                    <li>- Check cemetery hours and any special restrictions</li>
                  </ul>
                </Card>

                <Card className="p-5 border-l-4 border-l-accent">
                  <h3 className="font-semibold text-foreground mb-2">While Visiting</h3>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>- Walk respectfully - avoid stepping on graves</li>
                    <li>- Keep voices low and conversations reverent</li>
                    <li>- Turn off cell phones or keep on silent</li>
                    <li>- Do not eat, drink, or smoke on cemetery grounds</li>
                    <li>- Stay on designated paths when possible</li>
                    <li>- Be mindful of other visitors' privacy</li>
                  </ul>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                The Tradition of Placing Stones
              </h2>
              <p>
                One of the most recognizable Jewish cemetery customs is leaving small stones on headstones. This ancient practice has multiple interpretations:
              </p>

              <ul className="space-y-3 ml-6 list-disc text-muted-foreground mt-4">
                <li><strong className="text-foreground">Permanence:</strong> Unlike flowers, stones don't wither, symbolizing the permanence of memory</li>
                <li><strong className="text-foreground">Ancient Origins:</strong> In desert regions, stones kept wild animals from disturbing graves</li>
                <li><strong className="text-foreground">Mark of Visitation:</strong> Stones show that someone has visited and remembered</li>
                <li><strong className="text-foreground">Connection to Torah:</strong> Stones represent eternal words and the solid foundation of tradition</li>
                <li><strong className="text-foreground">Personal Monument:</strong> Each visitor adds to a growing memorial</li>
              </ul>

              <Card className="p-6 my-6 bg-accent/50 border-accent">
                <h3 className="font-semibold text-foreground mb-3">How to Place a Stone</h3>
                <p className="text-muted-foreground mb-3">
                  The act is simple but meaningful:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                  <li>Choose a small stone from the cemetery grounds</li>
                  <li>Place it gently on top of the headstone</li>
                  <li>Take a quiet moment for reflection or prayer</li>
                  <li>Some people say a short prayer or share a memory</li>
                </ul>
              </Card>

              <p>
                There's no requirement for the size or type of stone - the gesture itself is what matters. Some families develop their own traditions, using special stones or placing them in particular patterns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                When to Visit
              </h2>
              <p>
                Jewish tradition provides guidance on appropriate times for cemetery visits:
              </p>

              <div className="my-4 space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Traditional Visiting Times:</strong></p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>During the 11-month mourning period for parents</li>
                  <li>On the yahrzeit (anniversary of death)</li>
                  <li>During the month of Elul (before Rosh Hashanah)</li>
                  <li>Between Rosh Hashanah and Yom Kippur</li>
                  <li>On fast days, particularly Tisha B'Av</li>
                </ul>

                <p className="mt-4"><strong className="text-foreground">Times Generally Avoided:</strong></p>
                <ul className="ml-6 list-disc space-y-1">
                  <li>Shabbat and major holidays</li>
                  <li>At night (both for safety and tradition)</li>
                  <li>Some avoid visiting in the first year except during designated times</li>
                </ul>
              </div>

              <p className="mt-4">
                That said, visiting a loved one's grave whenever one feels the need is generally acceptable. The structured times are traditional recommendations, not absolute prohibitions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Prayers at the Gravesite
              </h2>
              <p>
                Several prayers are traditionally recited when visiting a grave:
              </p>

              <Card className="p-6 my-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-3">Common Prayers</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">El Malei Rachamim:</strong> Memorial prayer asking for God's mercy on the deceased's soul
                  </li>
                  <li>
                    <strong className="text-foreground">Kaddish:</strong> The mourner's prayer praising God
                  </li>
                  <li>
                    <strong className="text-foreground">Psalm 119:</strong> Verses corresponding to the Hebrew letters of the deceased's name
                  </li>
                  <li>
                    <strong className="text-foreground">Personal Prayers:</strong> Speaking from the heart to God and to the deceased
                  </li>
                </ul>
              </Card>

              <p>
                Some visitors also study a bit of Torah in memory of the deceased, as Torah study is considered one of the greatest merits one can provide for a departed soul.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <TreePine className="h-6 w-6 text-primary" />
                Jewish Cemetery Regulations
              </h2>
              <p>
                Jewish cemeteries maintain specific rules rooted in halacha (Jewish law):
              </p>

              <ul className="space-y-3 ml-6 list-disc text-muted-foreground mt-4">
                <li><strong className="text-foreground">Permanent Graves:</strong> Graves are never reused; burial is permanent</li>
                <li><strong className="text-foreground">Ground Burial Only:</strong> Traditional Jewish law requires burial directly in the earth</li>
                <li><strong className="text-foreground">No Cremation:</strong> Most traditional cemeteries do not allow burial of cremated remains</li>
                <li><strong className="text-foreground">Jewish Burial Only:</strong> Only Jews may be buried in Jewish cemeteries (with some exceptions for non-Jewish spouses)</li>
                <li><strong className="text-foreground">Modest Monuments:</strong> Headstones should be respectful but not ostentatious</li>
                <li><strong className="text-foreground">No Live Flowers:</strong> Many prohibit live flowers as they represent decay; artificial flowers vary by cemetery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Headstone Unveiling
              </h2>
              <p>
                The dedication of a headstone typically occurs within the first year after burial, often around the end of the 11-month mourning period or on the first yahrzeit. While not a religious requirement, this ceremony has become a cherished tradition.
              </p>

              <Card className="p-6 my-6 bg-accent/50 border-accent">
                <h3 className="font-semibold text-foreground mb-3">The Unveiling Ceremony</h3>
                <p className="text-muted-foreground mb-3">
                  This brief gathering typically includes:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6 list-disc">
                  <li>Recitation of Psalms</li>
                  <li>Removal of a cloth covering the headstone</li>
                  <li>Reading of the headstone inscription</li>
                  <li>Recitation of El Malei Rachamim and Kaddish</li>
                  <li>Opportunity for family members to share memories</li>
                  <li>Placing of stones on the monument</li>
                </ul>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Special Cemetery Considerations
              </h2>

              <p><strong className="text-foreground mb-2 block">Kohanim (Priests) and Cemetery Visits:</strong></p>
              <p className="mb-4">
                Jewish law prohibits kohanim (descendants of the priestly class) from coming into contact with the dead or entering cemeteries, except for their closest relatives. Modern kohanim often stand at cemetery gates or use special pathways.
              </p>

              <p><strong className="text-foreground mb-2 block">Pregnant Women:</strong></p>
              <p className="mb-4">
                Some traditions suggest pregnant women avoid cemeteries, though many rabbis consider this folk custom rather than law. Families should consult their own rabbi for guidance.
              </p>

              <p><strong className="text-foreground mb-2 block">Bringing Children:</strong></p>
              <p>
                While there's no prohibition against children visiting cemeteries, parents should consider the child's age and ability to behave appropriately in a sacred space. Educational visits can help children understand death and heritage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Hand Washing Upon Leaving
              </h2>
              <p>
                Many Jewish cemeteries have a washing station near the exit. The custom is to wash hands before leaving the cemetery as a ritual purification. The water is often poured three times alternating between hands, though methods vary.
              </p>
              <p>
                This practice symbolizes leaving death behind and returning to life. Some traditions also include not drying hands with a towel, allowing them to air dry naturally.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Cemetery Preservation and Volunteering
              </h2>
              <p>
                Many Jewish communities organize cemetery cleanup days and preservation projects. Volunteering to maintain cemetery grounds is considered a mitzvah (good deed) of great merit, as it honors those who have no one to care for their graves.
              </p>
              <p>
                Historical Jewish cemeteries, particularly in Europe, often need preservation efforts. Organizations worldwide work to document, restore, and protect these irreplaceable links to Jewish history.
              </p>
            </section>

            {/* Key Hebrew Terms */}
            <div className="my-8 not-prose">
              <h3 className="text-xl font-semibold mb-4">Key Hebrew Terms</h3>
              <DefinitionGrid>
                <DefinitionBox
                  term="בֵּית הַחַיִּים"
                  transliteration="Beit HaChaim"
                  meaning="House of Life"
                  definition="A euphemism for cemetery, reflecting belief in the eternal soul."
                  pronunciation="BAYT hah-khah-YEEM"
                />
                <DefinitionBox
                  term="בֵּית עוֹלָם"
                  transliteration="Beit Olam"
                  meaning="House of Eternity"
                  definition="Another name for cemetery, emphasizing eternal rest."
                  pronunciation="BAYT oh-LAHM"
                />
                <DefinitionBox
                  term="מַצֵּבָה"
                  transliteration="Matzeivah"
                  meaning="Headstone"
                  definition="The monument placed at a grave to mark the burial site."
                  pronunciation="mah-tzay-VAH"
                />
                <DefinitionBox
                  term="כֹּהֵן"
                  transliteration="Kohen"
                  meaning="Priest"
                  definition="Descendants of the priestly class with special cemetery restrictions."
                  pronunciation="koh-HAYN"
                />
              </DefinitionGrid>
            </div>

            {/* Expert Quote */}
            <div className="my-8 not-prose">
              <ExpertQuote
                quote="The Jewish cemetery is called Beit HaChaim—the House of Life—expressing belief in the eternal nature of the soul."
                expertName="Rabbi Maurice Lamm"
                credentials="Rabbi, Author of 'The Jewish Way in Death and Mourning'"
                source="The Jewish Way in Death and Mourning"
              />
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Conclusion
              </h2>
              <p>
                Jewish cemetery customs reflect deep respect for the deceased while providing meaningful ways for the living to honor memory and maintain connection. Whether visiting a loved one's grave or paying respects at a historic Jewish cemetery, understanding these traditions enriches the experience and ensures proper reverence.
              </p>
              <p>
                The simple act of placing a stone on a headstone connects us to thousands of years of Jewish tradition and to all who came before us. In these sacred spaces, memory becomes tangible, heritage is preserved, and love transcends the boundary between life and death.
              </p>
            </section>

            {/* Sources Section */}
            <div className="not-prose">
              <SourcesCitation
                sources={[
                  { title: 'Ta\'anit 16a', type: 'talmud', section: 'Visiting cemeteries' },
                  { title: 'Yoreh De\'ah 364-376', type: 'halacha', author: 'Shulchan Aruch' },
                  { title: 'The Jewish Way in Death and Mourning', type: 'book', author: 'Rabbi Maurice Lamm', section: 'Jonathan David Publishers' },
                  { title: 'Jewish Cemetery Customs', type: 'website', author: 'Chabad.org', url: 'https://www.chabad.org/library/article_cdo/aid/510876/jewish/Cemetery.htm' },
                ]}
              />
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
