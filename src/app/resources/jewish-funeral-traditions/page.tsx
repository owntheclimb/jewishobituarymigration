import { Metadata } from "next";
import Script from "next/script";
import { generateSpeakableSchema, schemaToString as schemaToStr } from "@/lib/schema";
import { ExpertQuote, StatisticHighlight, StatisticGrid, DefinitionBox, DefinitionGrid, SourcesCitation } from "@/components/geo";
import { Clock as ClockIcon, Scale, Droplets } from "lucide-react";

const speakableSchema = generateSpeakableSchema({
  url: 'https://jewishobituary.com/resources/jewish-funeral-traditions',
  name: 'Jewish Funeral Traditions: Complete Guide to Customs and Practices',
  cssSelectors: ['.article-title', '.article-summary', '.key-takeaways', '.faq-question', '.faq-answer'],
});

export const metadata: Metadata = {
  title: "Jewish Funeral Traditions: Complete Guide to Customs and Practices",
  description: "Comprehensive guide to Jewish funeral traditions including preparation, burial customs, Chevra Kadisha, and what to expect. With sources from Torah and Talmud.",
  keywords: ["Jewish funeral", "Jewish burial", "tahara", "chevra kadisha", "Jewish customs", "shiva", "funeral traditions"],
  openGraph: {
    title: "Jewish Funeral Traditions: Complete Guide to Customs and Practices",
    description: "Comprehensive guide to Jewish funeral traditions including preparation, burial customs, Chevra Kadisha, and what to expect.",
    type: "article",
    url: "https://jewishobituary.com/resources/jewish-funeral-traditions",
  },
  alternates: {
    canonical: "https://jewishobituary.com/resources/jewish-funeral-traditions",
  },
};
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { AuthorBox } from "@/components/AuthorBox";
import { getAuthor } from "@/data/authors";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, schemaToString } from "@/lib/schema";

const articleSchema = generateArticleSchema({
  title: 'Jewish Funeral Traditions: Complete Guide to Customs and Practices',
  description: 'Comprehensive guide to Jewish funeral traditions including preparation, burial customs, Chevra Kadisha, and what to expect. With sources from Torah and Talmud.',
  url: 'https://jewishobituary.com/resources/jewish-funeral-traditions',
  datePublished: '2024-01-20',
  dateModified: '2026-01-21',
  authorName: 'Jewish Obituary Editorial Team',
  image: 'https://jewishobituary.com/og-image.jpg',
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Resources', url: 'https://jewishobituary.com/resources' },
  { name: 'Jewish Funeral Traditions', url: 'https://jewishobituary.com/resources/jewish-funeral-traditions' },
]);

const faqSchema = generateFAQSchema([
  {
    question: "Why are Jewish funerals held so quickly after death?",
    answer: "Jewish law (Deuteronomy 21:23) requires burial as soon as possible, typically within 24 hours. This honors the deceased by not leaving the body unburied and allows mourning to begin promptly. Delays are permitted for Shabbat, holidays, or to allow close family to arrive."
  },
  {
    question: "Why don't Jews bring flowers to funerals?",
    answer: "Traditional Jewish funerals emphasize simplicity and equality in death. Flowers are seen as adornment that detracts from this principle. Instead, making a charitable donation in the deceased's memory is the customary way to honor them."
  },
  {
    question: "What is a Chevra Kadisha?",
    answer: "The Chevra Kadisha (Holy Society) is a group of volunteers who prepare the body for burial through taharah (ritual washing) and dressing in white shrouds. This is considered one of the greatest mitzvot because the deceased cannot repay the kindness."
  },
  {
    question: "Can non-Jews attend Jewish funerals?",
    answer: "Yes, non-Jews are welcome at Jewish funerals. Men should wear a kippah (head covering, usually provided), dress modestly in dark colors, and may participate in shoveling earth onto the grave if comfortable doing so."
  },
  {
    question: "Is cremation allowed in Judaism?",
    answer: "Orthodox and Conservative Judaism prohibit cremation, based on the principle that the body should return to the earth naturally (Genesis 3:19). Reform Judaism permits cremation as a personal choice, though traditional burial is still encouraged."
  },
  {
    question: "What is kriah and why is it performed?",
    answer: "Kriah is the ritual tearing of a garment (or black ribbon) by immediate family members, symbolizing their grief and the 'tear' in the family. For a parent, the tear is made over the heart (left side); for other relatives, on the right side."
  }
]);


export default function ArticleJewishFuneralPage() {
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

      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge>Jewish Customs</Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              12 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Understanding Jewish Funeral Traditions
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            A comprehensive guide to Jewish funeral customs, from preparation to burial
          </p>

          <div className="flex items-center gap-4">
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

        <div className="aspect-video bg-muted rounded-lg mb-8 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&h=600&fit=crop"
            alt="Jewish cemetery"
            className="w-full h-full object-cover"
          />
        </div>

        <AuthorBox author={author} className="mb-12" />

        {/* Table of Contents */}
        <Card className="p-6 mb-8 bg-muted/30">
          <h2 className="text-lg font-bold mb-4">In This Guide</h2>
          <nav className="space-y-2 text-sm">
            <a href="#introduction" className="block hover:text-primary transition-colors">Introduction: Kavod HaMet</a>
            <a href="#torah-sources" className="block hover:text-primary transition-colors">Torah and Talmudic Sources</a>
            <a href="#chevra-kadisha" className="block hover:text-primary transition-colors">The Chevra Kadisha (Holy Society)</a>
            <a href="#tahara" className="block hover:text-primary transition-colors">Tahara: The Ritual Purification</a>
            <a href="#timing" className="block hover:text-primary transition-colors">Why Jewish Funerals Happen Quickly</a>
            <a href="#shrouds-casket" className="block hover:text-primary transition-colors">Shrouds and the Simple Casket</a>
            <a href="#kriah" className="block hover:text-primary transition-colors">Kriah: The Tearing of Garments</a>
            <a href="#funeral-service" className="block hover:text-primary transition-colors">The Funeral Service</a>
            <a href="#graveside" className="block hover:text-primary transition-colors">At the Graveside</a>
            <a href="#denominations" className="block hover:text-primary transition-colors">Denominational Variations</a>
            <a href="#attending" className="block hover:text-primary transition-colors">What to Expect as an Attendee</a>
            <a href="#special-considerations" className="block hover:text-primary transition-colors">Special Considerations</a>
            <a href="#faq" className="block hover:text-primary transition-colors">Frequently Asked Questions</a>
            <a href="#further-reading" className="block hover:text-primary transition-colors">Further Reading</a>
          </nav>
        </Card>

        <div className="prose prose-lg max-w-none">
          <h2 id="introduction">Introduction: Kavod HaMet and the Jewish Approach to Death</h2>
          <p>
            Jewish funeral traditions are guided by two foundational principles that have shaped mourning practices for over three millennia: <em>kavod ha-met</em> (כבוד המת, honoring the deceased) and <em>nichum aveilim</em> (נחום אבלים, comforting the mourners). These practices provide what Rabbi Maurice Lamm, author of the seminal work <em>The Jewish Way in Death and Mourning</em>, calls "a framework for dealing with death and grief that emphasizes dignity, simplicity, and community support."
          </p>

          {/* Key Statistics */}
          <div className="my-8 not-prose">
            <StatisticGrid columns={3}>
              <StatisticHighlight
                value="24 hours"
                label="Traditional burial timeframe (Deuteronomy 21:23)"
                source="Torah"
                icon={ClockIcon}
              />
              <StatisticHighlight
                value="613 mitzvot"
                label="Burial counted among Torah commandments"
                source="Talmud"
                icon={Scale}
              />
              <StatisticHighlight
                value="9 kavim"
                label="Water (24+ quarts) for tahara purification"
                source="Shulchan Aruch"
                icon={Droplets}
              />
            </StatisticGrid>
          </div>

          <p>
            The Talmudic sages considered care for the dead to be the purest form of <em>gemilut chasadim</em> (acts of loving-kindness). Why purest? Because unlike other acts of kindness, the deceased cannot repay or even acknowledge what is done for them. This concept is called <em>chesed shel emet</em>—"true kindness" (Bereishit Rabbah 96:5).
          </p>

          {/* Expert Quote */}
          <div className="my-8 not-prose">
            <ExpertQuote
              quote="Just as the Holy One, blessed be He, buries the dead—as it is written, 'And He buried him in the valley'—so too should you bury the dead."
              expertName="Talmud Sotah 14a"
              credentials="Talmudic Source"
              source="Talmud Bavli"
              variant="prominent"
            />
          </div>

          <p>
            As Lord Immanuel Jakobovits, former Chief Rabbi of the British Empire, observed: "That a book on death should today be a Jewish best-seller of all times testifies to the pre-eminence of rites connected with death among the most widely kept Jewish observances."
          </p>

          <h2 id="torah-sources">Torah and Talmudic Sources</h2>
          <p>
            Jewish burial laws are rooted in explicit Torah commandments, elaborated upon extensively in the Talmud and later codified in the Shulchan Aruch. The primary sources include:
          </p>

          <h3>The Biblical Mandate for Prompt Burial</h3>
          <p>
            The Torah states in Deuteronomy 21:23: <em>"You shall not leave his corpse hanging on the tree overnight, but you shall surely bury him on that day."</em> While this verse addresses a specific context, the Rabbis derived from it the general obligation of prompt burial for all deceased.
          </p>
          <p>
            This commandment is counted among the 613 mitzvot of the Torah—both a positive commandment to bury the dead and a prohibition against leaving a body unburied overnight (Sanhedrin 46b).
          </p>

          <h3>Talmudic Elaboration</h3>
          <p>
            The discussions in the Talmud provide extensive detail on mourning practices:
          </p>
          <ul>
            <li><strong>Moed Katan 14b–28b</strong> — The primary tractate dealing with mourning laws, including the seven days of shiva, the thirty days of sheloshim, and year-long mourning</li>
            <li><strong>Sanhedrin 46b</strong> — Establishes the mitzvah of burial and discusses the prohibition of leaving a body unburied</li>
            <li><strong>Sotah 14a</strong> — Teaches that just as God buried Moses, we are obligated to bury the dead, and just as God comforted Isaac after Abraham's death, we comfort mourners</li>
            <li><strong>Berakhot 6b</strong> — Discusses the merit of accompanying the deceased to burial and comforting mourners</li>
          </ul>

          <h3>The Example of Moses</h3>
          <p>
            The Talmud (Sotah 14a) notes that Moses personally attended to the remains of Joseph during the Exodus from Egypt—and as a reward, God Himself attended to Moses's burial. This teaches that caring for the dead is so meritorious that even the greatest leader would not delegate it.
          </p>

          <blockquote>
            <p>
              "Just as the Holy One, blessed be He, buries the dead, as it is written: 'And He buried him in the valley' (Deut. 34:6), so too should you bury the dead."
            </p>
            <cite>— Talmud Sotah 14a</cite>
          </blockquote>

          <h2 id="chevra-kadisha">The Chevra Kadisha: A Holy Society</h2>
          <p>
            Throughout Jewish history, every Jewish community established a <em>Chevra Kadisha</em> (חברא קדישא, "Holy Society")—a group of volunteers who prepare the deceased for burial. The Roman historian Tacitus described the Jewish practice of burying rather than burning the dead as "a distinguishing characteristic" of the Jewish people.
          </p>
          <p>
            Members of the Chevra Kadisha perform what is considered one of the highest mitzvot. Their work is referred to as <em>chesed shel emet</em>—a "true act of kindness"—because it is performed for someone who can never repay the favor.
          </p>

          <h3>The Responsibilities of the Chevra Kadisha</h3>
          <ul>
            <li><strong>Shemirah (Watching)</strong> — Ensuring the body is never left alone from death until burial. A <em>shomer</em> (watchman) sits with the deceased, often reciting Psalms</li>
            <li><strong>Tahara (Purification)</strong> — Performing the ritual washing and purification of the body</li>
            <li><strong>Halbashah (Dressing)</strong> — Clothing the deceased in simple white shrouds</li>
            <li><strong>Preparation of the casket</strong> — Ensuring proper burial according to Jewish law</li>
          </ul>
          <p>
            Many burial societies observe the 7th of Adar—the traditional date of Moses's death—as a special day, often with fasting and additional Torah study related to burial laws.
          </p>

          <h2 id="tahara">Tahara: The Ritual Purification</h2>
          <p>
            The <em>tahara</em> (טהרה) is a sacred ritual that prepares the body for its final rest. As Chabad.org explains, "There is no mystery to the Tahara. It is a simple, yet dignified ritual that allows the person to meet his Maker with the utmost respect and dignity."
          </p>

          <h3>The Three Stages of Tahara</h3>
          <ol>
            <li>
              <strong>Rechitzah (Washing)</strong> — The body is carefully and respectfully washed. All jewelry is removed. The beard, if present, is not shaved. Any blood is preserved and buried with the deceased, as it is considered part of the person.
            </li>
            <li>
              <strong>Tahara (Purification)</strong> — The body is ritually purified with water, either by immersion in a mikveh or by pouring a continuous stream of at least 9 <em>kavim</em> (approximately 24 quarts, usually using 3 buckets) over the body in a prescribed manner.
            </li>
            <li>
              <strong>Halbashah (Dressing)</strong> — The body is dried and dressed in <em>tachrichim</em> (white burial shrouds). A sash (<em>avnet</em>) is tied around the clothing in the shape of the Hebrew letter shin (ש), representing Shaddai, one of God's names.
            </li>
          </ol>
          <p>
            Throughout the tahara, participants recite special prayers beseeching God to lift the soul into the heavens. The tahara is performed by members of the same gender as the deceased.
          </p>

          <h2 id="timing">Why Jewish Funerals Happen Quickly</h2>
          <p>
            Jewish law requires burial as soon as possible, typically within 24 hours of death. This is based on the Torah's command not to leave a body unburied overnight (Deuteronomy 21:23) and is considered both a sign of respect and a kindness to the deceased.
          </p>
          <p>
            The Shulchan Aruch (Yoreh De'ah 357:1) clarifies that delays are permitted—and do not violate the prohibition—when they serve the honor of the deceased, such as:
          </p>
          <ul>
            <li><strong>Shabbat or major Jewish holidays</strong> — Burial does not take place on these days</li>
            <li><strong>Waiting for close family members</strong> to arrive from a distance</li>
            <li><strong>Obtaining a proper casket or shrouds</strong></li>
            <li><strong>Legal requirements</strong> such as death certificates or, when absolutely necessary, autopsies</li>
          </ul>
          <p>
            The quick burial also serves a spiritual purpose: it allows the soul to begin its journey and prevents unnecessary suffering for both the deceased and the mourners during the liminal period before burial.
          </p>

          <h2 id="shrouds-casket">Shrouds and the Simple Casket: Equality in Death</h2>
          <p>
            One of the most distinctive aspects of Jewish burial is its emphasis on simplicity and equality. The Talmud (Moed Katan 27b) records that the sage Rabban Gamliel II, who lived in the 1st century CE, requested to be buried in simple linen garments rather than expensive ones. His example established the practice that has continued for two thousand years.
          </p>

          <h3>The Tachrichim (Shrouds)</h3>
          <p>
            All Jews are buried in similar white shrouds called <em>tachrichim</em>. These garments are:
          </p>
          <ul>
            <li><strong>Simple white linen or muslin</strong> — representing purity and equality</li>
            <li><strong>Without pockets</strong> — symbolizing that we take nothing material with us</li>
            <li><strong>Hand-sewn</strong> — traditionally with weak stitches that will decompose quickly</li>
            <li><strong>The same for everyone</strong> — rich and poor alike are dressed identically</li>
          </ul>
          <p>
            Men are often buried with their tallit (prayer shawl), with one of its fringes (<em>tzitzit</em>) cut to indicate it is no longer used for the mitzvah.
          </p>

          <h3>The Aron (Casket)</h3>
          <p>
            Traditional Jewish caskets are simple wooden boxes, often made of pine, with no metal parts. Some communities use caskets with holes drilled in the bottom to facilitate the body's return to the earth, fulfilling Genesis 3:19: <em>"For dust you are, and to dust you shall return."</em>
          </p>
          <p>
            In Israel, many Jews are buried without a casket at all, wrapped only in shrouds, allowing the most direct return to the earth.
          </p>

          <h3>Why No Flowers</h3>
          <p>
            Unlike Western funeral customs, traditional Jewish funerals do not include flowers. Flowers are seen as adornment that detracts from the principle of simplicity. Instead, the customary way to honor the deceased is through charitable donations in their memory—continuing their legacy through acts of kindness.
          </p>

          <blockquote>
            <p>
              "Adonai natan, v'Adonai lakach; y'hi shem Adonai m'vorach"<br />
              "The Lord has given, and the Lord has taken away; blessed be the name of the Lord."
            </p>
            <cite>— Job 1:21</cite>
          </blockquote>

          <h2 id="kriah">Kriah: The Tearing of Garments</h2>
          <p>
            <em>Kriah</em> (קריעה, "tearing") is the ritual tearing of a garment by mourners, symbolizing the rending of their hearts and the tear in the family fabric caused by death. The laws of kriah occupy an entire section of the Shulchan Aruch—39 subdivisions in Yoreh De'ah 340—demonstrating their importance and complexity.
          </p>

          <h3>How Kriah is Performed</h3>
          <ul>
            <li>The tear must be at least a <em>tefach</em> (handbreadth, approximately 3.5 inches/9 cm) in length</li>
            <li><strong>For a parent:</strong> The tear is made on the left side, over the heart, and all garments must be torn until the heart is exposed. This tear may never be fully mended (Shulchan Aruch, Yoreh De'ah 340:15)</li>
            <li><strong>For other relatives</strong> (siblings, children, spouse): The tear is made on the right side, and only one garment needs to be torn</li>
            <li>The tear is made while standing, reciting the blessing: <em>"Baruch atah Adonai, Eloheinu melech ha'olam, dayan ha'emet"</em> (Blessed are You, Lord our God, King of the universe, the true Judge)</li>
          </ul>
          <p>
            Women are also required to perform kriah, as explicitly stated in the Talmud (Moed Katan 22b) and codified in the Shulchan Aruch (Yoreh De'ah 340:11).
          </p>
          <p>
            Today, many mourners tear a black ribbon attached to their clothing rather than the garment itself, though traditional practice calls for tearing actual clothing.
          </p>

          <h2 id="funeral-service">The Funeral Service</h2>
          <p>
            Jewish funeral services (<em>levayah</em>, meaning "accompaniment") are typically brief, focusing on honoring the deceased and beginning the mourning process. The service usually includes:
          </p>

          <h3>Components of the Service</h3>
          <ul>
            <li><strong>Psalm 23</strong> — "The Lord is my shepherd; I shall not want..." This psalm of comfort is almost universally recited</li>
            <li><strong>Psalm 91</strong> — "He who dwells in the shelter of the Most High..." Another psalm of faith and comfort</li>
            <li><strong>Hesped (Eulogy)</strong> — A speech honoring the life, character, and deeds of the deceased. Multiple eulogies may be given by family members and close friends</li>
            <li><strong>El Malei Rachamim</strong> — The memorial prayer asking God to grant perfect rest to the soul of the deceased "under the wings of the Divine Presence"</li>
            <li><strong>Tzidduk HaDin</strong> — A prayer accepting God's just decree, including the verse from Job quoted above</li>
            <li><strong>Kaddish</strong> — The mourner's prayer, recited by immediate family members. Despite common misconception, Kaddish does not mention death but rather affirms God's greatness</li>
          </ul>

          <h2 id="graveside">At the Graveside</h2>
          <p>
            The graveside service represents the final act of <em>chesed shel emet</em>—the opportunity to personally participate in the burial.
          </p>

          <h3>Filling the Grave</h3>
          <p>
            Perhaps the most distinctive element of Jewish burial is that mourners and attendees actively participate in filling the grave. This mitzvah of <em>levayat ha-met</em> (accompanying the deceased) is considered so important that the Talmud (Moed Katan 27b) states that even Torah study may be interrupted to participate.
          </p>
          <ul>
            <li>Each person takes a turn with the shovel, using the back of the shovel for the first three scoops (to show reluctance)</li>
            <li>The shovel is not passed hand to hand but placed down for the next person to pick up</li>
            <li>The grave is filled completely—mourners do not leave until the mound is formed</li>
          </ul>

          <h3>Leaving the Cemetery</h3>
          <ul>
            <li>Attendees form two parallel lines through which the mourners walk, receiving the traditional words of comfort: <em>"HaMakom y'nachem etchem b'toch sh'ar aveilei Tziyon v'Yerushalayim"</em> — "May the Omnipresent comfort you among the mourners of Zion and Jerusalem"</li>
            <li>Before leaving the cemetery grounds, hands are ritually washed. This is done without a blessing, and hands are traditionally not dried</li>
            <li>Some have the custom of plucking grass and throwing it behind them while reciting: "And they shall blossom out of the city like the grass of the field" (Psalms 72:16)</li>
          </ul>

          <h2 id="denominations">Denominational Variations</h2>
          <p>
            While the core practices remain consistent across Jewish denominations, there are notable variations:
          </p>

          <h3>Orthodox Judaism</h3>
          <ul>
            <li>Strict adherence to traditional halachic practices</li>
            <li>Tahara performed by Chevra Kadisha</li>
            <li>Gender separation during services</li>
            <li>Earth burial only; cremation prohibited</li>
            <li>Embalming and viewing prohibited</li>
          </ul>

          <h3>Conservative Judaism</h3>
          <ul>
            <li>Generally follows traditional practices with some modern adaptations</li>
            <li>Women may participate in all aspects of the service</li>
            <li>Cremation generally discouraged but some leniency in burial of cremated remains</li>
            <li>Organ donation often encouraged</li>
          </ul>

          <h3>Reform Judaism</h3>
          <ul>
            <li>Greater flexibility in practices</li>
            <li>Cremation permitted as a personal choice</li>
            <li>Services may be held in funeral homes or synagogues</li>
            <li>Traditional elements like tahara may be optional</li>
            <li>Emphasis on personal meaning and family wishes</li>
          </ul>

          <h3>Reconstructionist Judaism</h3>
          <ul>
            <li>Similar to Reform with emphasis on community customs</li>
            <li>Focus on creating meaningful rituals that honor tradition while allowing personal expression</li>
          </ul>

          <h2 id="attending">What to Expect as an Attendee</h2>
          <p>
            Non-Jews and those unfamiliar with Jewish customs are welcome at Jewish funerals. Here's what to know:
          </p>

          <h3>Dress and Behavior</h3>
          <ul>
            <li><strong>Dress modestly</strong> in dark, conservative clothing (no bright colors)</li>
            <li><strong>Men should wear a kippah</strong> (head covering)—these are usually provided at the entrance</li>
            <li><strong>Arrive on time</strong>—Jewish services begin promptly</li>
            <li><strong>Silence your phone</strong> completely</li>
          </ul>

          <h3>During the Service</h3>
          <ul>
            <li>You may sit or stand when others do, even if you cannot follow the Hebrew prayers</li>
            <li>Participation in shoveling earth at the graveside is appropriate for anyone who feels comfortable doing so</li>
          </ul>

          <h3>What NOT to Do</h3>
          <ul>
            <li><strong>Don't bring flowers</strong>—make a charitable donation instead</li>
            <li><strong>Don't approach mourners first</strong>—let them initiate conversation. Traditional practice is to let mourners speak first</li>
            <li><strong>Don't say "I know how you feel"</strong>—instead, share a memory of the deceased or simply say "I'm sorry for your loss"</li>
          </ul>

          <h2 id="special-considerations">Special Considerations</h2>

          <h3>Kohanim (Descendants of the Priestly Class)</h3>
          <p>
            According to Leviticus 21:1-4, Kohanim are prohibited from coming into contact with or proximity to the dead, with exceptions only for immediate family members (parents, children, siblings, spouse). At funerals, Kohanim may need to remain outside the building or at a distance from the grave.
          </p>

          <h3>Cremation</h3>
          <p>
            Traditional Jewish law prohibits cremation based on several principles: the body belongs to God, it should return naturally to the earth, and cremation may interfere with the future resurrection of the dead. Orthodox and Conservative Judaism maintain this prohibition. Reform Judaism permits cremation as a personal choice, though traditional burial is still encouraged.
          </p>

          <h3>Autopsies and Organ Donation</h3>
          <p>
            Jewish law generally prohibits autopsies except when required by civil law or when it could save another specific life. Organ donation to save lives is increasingly accepted across denominations, with many rabbis considering it a mitzvah of <em>pikuach nefesh</em> (saving a life).
          </p>

          <h2 id="faq">Frequently Asked Questions</h2>
          <div className="space-y-6 not-prose">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-bold mb-2">Why are Jewish funerals held so quickly after death?</h4>
              <p className="text-muted-foreground">Jewish law (Deuteronomy 21:23) requires burial as soon as possible, typically within 24 hours. This honors the deceased by not leaving the body unburied and allows mourning to begin promptly. Delays are permitted for Shabbat, holidays, or to allow close family to arrive.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-bold mb-2">Why don't Jews bring flowers to funerals?</h4>
              <p className="text-muted-foreground">Traditional Jewish funerals emphasize simplicity and equality in death. Flowers are seen as adornment that detracts from this principle. Instead, making a charitable donation in the deceased's memory is the customary way to honor them.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-bold mb-2">What is a Chevra Kadisha?</h4>
              <p className="text-muted-foreground">The Chevra Kadisha (Holy Society) is a group of volunteers who prepare the body for burial through tahara (ritual washing) and dressing in white shrouds. This is considered one of the greatest mitzvot because the deceased cannot repay the kindness.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-bold mb-2">Can non-Jews attend Jewish funerals?</h4>
              <p className="text-muted-foreground">Yes, non-Jews are welcome at Jewish funerals. Men should wear a kippah (head covering, usually provided), dress modestly in dark colors, and may participate in shoveling earth onto the grave if comfortable doing so.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-bold mb-2">Is cremation allowed in Judaism?</h4>
              <p className="text-muted-foreground">Orthodox and Conservative Judaism prohibit cremation, based on the principle that the body should return to the earth naturally (Genesis 3:19). Reform Judaism permits cremation as a personal choice, though traditional burial is still encouraged.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-bold mb-2">What is kriah and why is it performed?</h4>
              <p className="text-muted-foreground">Kriah is the ritual tearing of a garment (or black ribbon) by immediate family members, symbolizing their grief and the 'tear' in the family. For a parent, the tear is made over the heart (left side); for other relatives, on the right side.</p>
            </div>
          </div>

          <h2 id="further-reading" className="mt-12">Further Reading</h2>
          <p>
            For those seeking deeper understanding of Jewish death and mourning practices, these authoritative works are recommended:
          </p>
          <ul>
            <li>
              <strong><em>The Jewish Way in Death and Mourning</em></strong> by Rabbi Maurice Lamm — The definitive guide, selected by The New York Times as one of the ten best religious books of the year when first published in 1969. Rabbi Lamm founded the National Institute for Jewish Hospice and served as Professor at Yeshiva University.
            </li>
            <li>
              <strong><em>Saying Kaddish: How to Comfort the Dying, Bury the Dead, and Mourn as a Jew</em></strong> by Anita Diamant — An accessible, comprehensive guide for contemporary Jews navigating loss.
            </li>
            <li>
              <strong><em>A Time to Mourn, A Time to Comfort</em></strong> by Dr. Ron Wolfson — A practical guide to the Jewish way of mourning with contemporary insights.
            </li>
            <li>
              <strong>Shulchan Aruch, Yoreh De'ah</strong> sections 335-403 — The authoritative halachic code on mourning, for those who wish to study the source texts.
            </li>
          </ul>

          {/* Key Hebrew Terms */}
          <div className="my-8 not-prose">
            <h3 className="text-xl font-semibold mb-4">Key Hebrew Terms</h3>
            <DefinitionGrid>
              <DefinitionBox
                term="כָּבוֹד הַמֵּת"
                transliteration="Kavod HaMet"
                meaning="Honor of the deceased"
                definition="The foundational principle that the deceased must be treated with dignity and respect."
                pronunciation="kah-VOHD hah-MET"
              />
              <DefinitionBox
                term="חֶסֶד שֶׁל אֱמֶת"
                transliteration="Chesed Shel Emet"
                meaning="True kindness"
                definition="Kindness shown to the deceased, who cannot repay the favor."
                pronunciation="KHEH-sed shel eh-MET"
              />
              <DefinitionBox
                term="טָהֳרָה"
                transliteration="Tahara"
                meaning="Purification"
                definition="The ritual washing and purification of the body before burial."
                pronunciation="tah-hah-RAH"
              />
              <DefinitionBox
                term="תַּכְרִיכִין"
                transliteration="Tachrichim"
                meaning="Burial shrouds"
                definition="Simple white garments without pockets, symbolizing equality in death."
                pronunciation="tahkh-ree-KHEEN"
              />
              <DefinitionBox
                term="קְרִיעָה"
                transliteration="Kriah"
                meaning="Tearing"
                definition="The ritual tearing of a garment by mourners to symbolize grief."
                pronunciation="kree-AH"
              />
              <DefinitionBox
                term="לְוָיָה"
                transliteration="Levayah"
                meaning="Accompaniment"
                definition="The funeral procession, accompanying the deceased to burial."
                pronunciation="leh-vah-YAH"
              />
            </DefinitionGrid>
          </div>

          <h2>Conclusion</h2>
          <p>
            Jewish funeral traditions provide a time-tested framework for honoring the deceased and supporting the bereaved. From the moment of death through the burial, every practice serves to affirm the dignity of the human being created in God's image, the equality of all people in death, and the importance of community in times of grief.
          </p>
          <p>
            These practices have sustained Jewish communities through millennia of joy and sorrow. Whether you're planning a funeral, preparing to attend one, or simply seeking to understand these ancient customs, the principles of kavod ha-met and chesed shel emet offer profound wisdom about how to face death with dignity and compassion.
          </p>

          {/* Expert Quote */}
          <div className="my-8 not-prose">
            <ExpertQuote
              quote="Caring for the dead is called chesed shel emet—true kindness—because the deceased can never repay the favor."
              expertName="Rabbi Maurice Lamm"
              credentials="Rabbi, Author of 'The Jewish Way in Death and Mourning'"
              source="The Jewish Way in Death and Mourning"
            />
          </div>
        </div>

        {/* Sources Section */}
        <SourcesCitation
          sources={[
            { title: 'Deuteronomy 21:23', type: 'talmud', section: 'Mandate for prompt burial' },
            { title: 'Moed Katan 27b', type: 'talmud', section: 'Equality in burial' },
            { title: 'Sanhedrin 46b', type: 'talmud', section: 'Mitzvah of burial' },
            { title: 'Sotah 14a', type: 'talmud', section: 'Divine example of burial' },
            { title: 'Yoreh De\'ah 335-403', type: 'halacha', author: 'Shulchan Aruch' },
            { title: 'Mishneh Torah, Hilchot Avel', type: 'halacha', author: 'Maimonides' },
            { title: 'The Jewish Way in Death and Mourning', type: 'book', author: 'Rabbi Maurice Lamm', section: 'Jonathan David Publishers, 1969' },
          ]}
        />

        <Card className="mt-12 p-6 bg-muted/30">
          <h3 className="text-xl font-bold mb-4">Related Articles</h3>
          <div className="space-y-3">
            <Link href="/resources/understanding-shiva" className="block hover:text-primary transition-colors">
              → Understanding the Jewish Practice of Sitting Shiva
            </Link>
            <Link href="/resources/kaddish-mourners-prayer" className="block hover:text-primary transition-colors">
              → Kaddish: The Mourner's Prayer Explained
            </Link>
            <Link href="/resources/jewish-cemetery" className="block hover:text-primary transition-colors">
              → Jewish Cemetery Customs and Etiquette
            </Link>
          </div>
        </Card>
      </article>

      <Footer />
    </div>
  );
}
