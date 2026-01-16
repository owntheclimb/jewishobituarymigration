'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Share2, Bookmark } from "lucide-react";
import Link from "next/link";


export default function ArticleJewishFuneralPage() {
  return (
    <div className="min-h-screen bg-background">
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

        <div className="aspect-video bg-muted rounded-lg mb-12 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&h=600&fit=crop"
            alt="Jewish cemetery"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Introduction to Jewish Funeral Practices</h2>
          <p>
            Jewish funeral traditions are rooted in thousands of years of history and are guided by the principles of kavod ha-met (honoring the deceased) and nichum aveilim (comforting the mourners). These practices provide a framework for dealing with death and grief that emphasizes dignity, simplicity, and community support.
          </p>

          <h2>The Principle of Simplicity</h2>
          <p>
            Jewish tradition emphasizes equality in death. Regardless of wealth or status in life, all are equal before God. This is reflected in:
          </p>
          <ul>
            <li>Simple wooden caskets</li>
            <li>Plain white shrouds (tachrichim)</li>
            <li>Prompt burial without embalming</li>
            <li>Earth burial rather than above-ground vaults</li>
          </ul>

          <h2>Immediately After Death</h2>
          <p>
            <strong>Shemirah (Watching):</strong> From death until burial, the body is never left alone. Volunteers from the community or Chevra Kadisha (burial society) sit with the deceased, often reciting Psalms.
          </p>
          <p>
            <strong>Taharah (Purification):</strong> The Chevra Kadisha performs a ritual washing and dressing of the body in simple white shrouds. This sacred act is considered one of the greatest mitzvot (commandments) because it cannot be repaid.
          </p>

          <h2>Timing of the Funeral</h2>
          <p>
            Jewish law requires burial as soon as possible, typically within 24 hours of death. Delays may occur for:
          </p>
          <ul>
            <li>Shabbat or major Jewish holidays</li>
            <li>Waiting for immediate family to arrive</li>
            <li>Legal requirements (autopsies, death certificates)</li>
          </ul>

          <h2>The Casket and Burial</h2>
          <p>
            Traditional Jewish caskets are simple wooden boxes, often made of pine. Some communities use caskets with holes drilled in the bottom to facilitate the return to earth ("for dust you are, and to dust you shall return").
          </p>
          <p>
            <strong>No flowers:</strong> Unlike many Western funerals, flowers are not used at traditional Jewish funerals. Instead, charitable donations are made in memory of the deceased.
          </p>

          <blockquote>
            <p>
              "Adonai natan, v'Adonai lakach; y'hi shem Adonai m'vorach" - "The Lord has given, and the Lord has taken away; blessed be the name of the Lord." (Job 1:21)
            </p>
          </blockquote>

          <h2>The Funeral Service</h2>
          <p>
            A Jewish funeral service is relatively brief and typically includes:
          </p>
          <ul>
            <li><strong>Psalms</strong> - Usually Psalm 23 ("The Lord is my shepherd")</li>
            <li><strong>Eulogy (Hesped)</strong> - Honoring the life and character of the deceased</li>
            <li><strong>El Malei Rachamim</strong> - Prayer for the soul of the deceased</li>
            <li><strong>Kaddish</strong> - The mourner's prayer recited by immediate family</li>
          </ul>

          <h2>Kriah: The Tearing of Garments</h2>
          <p>
            Before or during the funeral, immediate family members perform kriah - tearing a piece of clothing or a black ribbon. This symbolizes the tearing apart of the family unit. For parents, the tear is made over the heart; for other relatives, over the right side.
          </p>

          <h2>At the Graveside</h2>
          <p>
            Jewish tradition emphasizes active participation in the burial:
          </p>
          <ul>
            <li>Mourners and attendees take turns shoveling earth into the grave</li>
            <li>Some communities form two lines for mourners to pass through as they leave</li>
            <li>Hands are ritually washed before leaving the cemetery</li>
            <li>The phrase "May you be comforted among the mourners of Zion and Jerusalem" is often said</li>
          </ul>

          <h2>Variations Among Denominations</h2>
          <p>
            <strong>Orthodox:</strong> Strict adherence to traditional practices; gender separation at funerals; only men participate in burial.
          </p>
          <p>
            <strong>Conservative:</strong> Generally follows traditional practices with some modern adaptations; women may participate in all aspects.
          </p>
          <p>
            <strong>Reform:</strong> More flexibility; may allow cremation; services can be held in funeral homes or synagogues.
          </p>
          <p>
            <strong>Reconstructionist:</strong> Similar to Reform with emphasis on community customs and personal meaning.
          </p>

          <h2>What to Expect as an Attendee</h2>
          <p>
            If you're attending a Jewish funeral:
          </p>
          <ul>
            <li><strong>Dress modestly</strong> in dark, conservative clothing</li>
            <li><strong>Arrive on time</strong> - services begin promptly</li>
            <li><strong>Men should wear a kippah</strong> (head covering) - usually provided</li>
            <li><strong>Participate in filling the grave</strong> if comfortable doing so</li>
            <li><strong>Don't approach mourners</strong> to offer condolences; let them speak first</li>
            <li><strong>No flowers</strong> - make a charitable donation instead</li>
          </ul>

          <h2>After the Burial</h2>
          <p>
            Immediately following burial, the period of intense mourning called shiva begins. Mourners return to a designated shiva house where the community gathers to comfort them.
          </p>

          <h2>Special Considerations</h2>
          <p>
            <strong>Kohanim (Priests):</strong> Descendants of the priestly class traditionally may not enter cemeteries or be in close proximity to the deceased, except for immediate family.
          </p>
          <p>
            <strong>Pregnancy:</strong> Some traditions advise pregnant women to avoid funerals and cemeteries, though this is not universally observed.
          </p>

          <h2>Conclusion</h2>
          <p>
            Jewish funeral traditions provide a time-tested framework for honoring the deceased and supporting the bereaved. These practices recognize that death is part of life while affirming the value of every human being. Whether you're planning a funeral or attending one, understanding these customs helps create a meaningful and respectful experience.
          </p>
        </div>

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
