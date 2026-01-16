'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, Share2, BookOpen, Heart, ArrowLeft } from 'lucide-react';
import DOMPurify from 'dompurify';

// This is a template component - in production, you'd fetch article data based on route params
export default function ArticleDetailPage() {
  const article = {
    title: 'Understanding the Practice of Sitting Shiva',
    subtitle: 'A comprehensive guide for families and friends during the Jewish mourning period',
    category: 'Jewish Customs',
    author: 'Jewish Obits Editorial Team',
    publishDate: 'March 15, 2024',
    readTime: '10 min read',
    excerpt: 'When a Jewish person loses a close family member, the community gathers to provide comfort during a sacred time called "sitting Shiva." This ancient tradition, rooted in Torah and thousands of years of Jewish practice, creates a structured period for mourning and remembrance.',
    content: `
## What is Shiva?

Shiva (from the Hebrew word for "seven") is a seven-day period of mourning observed after the burial of a parent, spouse, sibling, or child. During this time, mourners remain at home while friends, family, and community members visit to offer condolences and support.

### The Origins of Shiva

The practice of sitting shiva has its roots in the Torah and has been observed for thousands of years. The number seven holds deep significance in Jewish tradition – from the seven days of creation to the seven branches of the menorah.

## When Does Shiva Begin?

Shiva begins immediately following the burial of the deceased. The first day of shiva is the day of burial, regardless of what time of day the burial occurs. Shiva is observed for seven days, though there are some exceptions:

- **Interrupted by Major Holidays**: If a major Jewish holiday (such as Passover, Rosh Hashanah, or Yom Kippur) falls during the shiva period, the shiva ends when the holiday begins.
- **Sabbath Observance**: While shiva continues through the Sabbath, public mourning practices are suspended from Friday evening until Saturday night.

## Who Sits Shiva?

The following immediate family members traditionally sit shiva:
- Spouse
- Parents
- Siblings
- Children

Extended family members and close friends may be present to support the mourners, but they are not required to observe all the shiva customs.

## Shiva Customs and Practices

### For the Mourners:

1. **Staying Home**: Mourners remain in the house where shiva is being observed, traditionally not leaving except for Sabbath services.

2. **Sitting Low**: Mourners sit on low stools or cushions, symbolizing their emotional state and humbling themselves before God.

3. **Covering Mirrors**: Mirrors in the home are covered to discourage vanity and self-focus during this time of grief.

4. **No Work**: Mourners refrain from work, business, and everyday responsibilities.

5. **Grooming Restrictions**: Traditional mourners do not shave, cut hair, or engage in personal grooming beyond basic hygiene.

6. **Wearing Torn Garment**: Mourners may wear a torn black ribbon or garment (kriah) symbolizing their grief.

7. **Prayer Services**: Daily prayer services (minyan) are often held at the shiva house, allowing mourners to recite the Kaddish prayer.

### For Visitors:

Making a shiva call is a mitzvah (good deed) and an important way to support grieving families. Here's what to know:

1. **Timing**: Check with the family about visiting hours. Traditionally, the first three days are reserved for close family.

2. **What to Bring**: Food is always appreciated – particularly ready-to-eat meals, baked goods, or fruit. Flowers are generally not brought to Jewish homes during shiva.

3. **What to Say**: Traditional greetings include:
   - "May you be comforted among the mourners of Zion and Jerusalem"
   - "I wish you long life"
   - Simply: "I'm so sorry for your loss"

4. **What NOT to Say**: Avoid:
   - "I know how you feel"
   - "They're in a better place"
   - "Everything happens for a reason"
   - "At least they lived a long life"

5. **Listen More Than You Speak**: Let mourners guide the conversation. If they want to talk about the deceased, listen with your full attention. If they're quiet, it's okay to sit in silence.

6. **Keep Visits Brief**: Unless you're very close to the family, 15-30 minutes is appropriate.

## The Shiva Meal

The first meal after returning from the burial is called the "meal of condolence" or "seudat havra'ah." This meal is traditionally prepared by friends or neighbors, not the mourners, and includes:

- Round foods (eggs, bagels, lentils) symbolizing the circle of life
- Simple, comforting dishes
- Foods that require no preparation by the mourners

Throughout shiva, the community often organizes a meal train to ensure the family has food without needing to cook.

## Modern Variations

While traditional shiva lasts seven days, modern observance varies:

- **Conservative and Reform Jews**: May observe a shorter shiva period (three days) or adapt customs to fit work schedules.
- **Virtual Shiva**: During COVID-19, many families held virtual shiva gatherings via video call, a practice that continues for distant family and friends.
- **Modified Customs**: Some families adapt traditional restrictions to modern life, such as working part-time or maintaining essential responsibilities.

## After Shiva: Sheloshim

After the seven days of shiva, a less intense mourning period called "sheloshim" (thirty) begins. During sheloshim:

- Mourners return to work and normal activities
- Some grooming and celebratory restrictions continue
- For parents, mourning continues for eleven months

## Yahrzeit: Annual Remembrance

On the Hebrew calendar anniversary of a death (yahrzeit), Jews:
- Light a 24-hour memorial candle
- Recite Kaddish at services
- Visit the grave
- Make charitable donations in memory of the deceased

## Supporting Someone Sitting Shiva

### What to Do:
- ✓ Make a shiva call in person if possible
- ✓ Bring food that's ready to serve
- ✓ Offer specific help: "Can I walk your dog?" "May I pick up groceries?"
- ✓ Share happy memories of the deceased
- ✓ Follow the family's lead on conversation
- ✓ Respect their privacy and customs
- ✓ Send a sympathy card with a personal message
- ✓ Make a charitable donation in the deceased's memory

### What to Avoid:
- ✗ Don't greet mourners with "hello" or "goodbye"
- ✗ Don't bring flowers
- ✗ Don't make it about yourself
- ✗ Don't pressure mourners to talk
- ✗ Don't overstay your welcome
- ✗ Don't discuss business or trivial matters
- ✗ Don't photograph or video the shiva

## The Wisdom of Shiva

Sitting shiva is not just about the mourners – it's about the entire community coming together to support those who are grieving. This ancient practice recognizes several profound truths:

1. **Grief Needs Time**: By setting aside seven days, shiva acknowledges that grief can't be rushed.

2. **Community Heals**: Having people physically present provides comfort that no words can match.

3. **Structure Helps**: When everything feels chaotic, the rituals of shiva provide grounding and purpose.

4. **Memory Honors**: Sharing stories about the deceased keeps their memory alive and helps mourners process their loss.

## For Non-Jewish Friends

If you're not Jewish but want to support a Jewish friend sitting shiva:

- Your presence and support are deeply appreciated
- You don't need to be Jewish to make a shiva call
- Follow the family's lead on customs
- Your kindness transcends religious differences
- Simply being there speaks volumes

## Conclusion

Sitting shiva is one of Judaism's most beautiful traditions – a week when the community surrounds the bereaved with love, support, and presence. While customs may vary, the core purpose remains constant: ensuring that no one grieves alone.

Whether you're sitting shiva yourself or supporting someone who is, remember that there's no "right" way to grieve. The rituals and community of shiva provide a framework, but each person's journey through loss is unique.

**May the memories of those we've lost be a blessing, and may their souls be bound up in the bond of eternal life.**

---

*Zichronam livracha* – May their memory be a blessing.
    `
  };

  const relatedArticles = [
    {
      title: 'Kaddish: The Mourner\'s Prayer Explained',
      category: 'Jewish Customs',
      readTime: '7 min read',
      excerpt: 'Understanding the meaning and significance of reciting Kaddish'
    },
    {
      title: 'What to Expect at a Jewish Funeral',
      category: 'Jewish Customs',
      readTime: '8 min read',
      excerpt: 'A guide to Jewish funeral traditions and customs'
    },
    {
      title: 'Yahrzeit: Honoring the Anniversary',
      category: 'Jewish Customs',
      readTime: '6 min read',
      excerpt: 'How to observe your loved one\'s Hebrew calendar anniversary'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Article Header */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <Link href="/resources" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
              </Link>

              {/* Article Meta */}
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">{article.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {article.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {article.subtitle}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border py-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{article.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                  <p className="text-lg italic m-0">
                    {article.excerpt}
                  </p>
                </div>

                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      article.content.replace(/\n/g, '<br />'),
                      { ALLOWED_TAGS: ['br', 'p', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h2', 'h3', 'h4'], ALLOWED_ATTR: ['href', 'target', 'rel'] }
                    )
                  }}
                />
              </div>

              {/* Was This Helpful? */}
              <Card className="mb-12">
                <CardContent className="text-center py-8">
                  <h3 className="text-xl font-semibold mb-4">Was this article helpful?</h3>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Yes, helpful
                    </Button>
                    <Button variant="outline">
                      Share Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <Badge variant="secondary" className="w-fit mb-2">
                          {relatedArticle.category}
                        </Badge>
                        <CardTitle className="text-lg leading-tight">
                          {relatedArticle.title}
                        </CardTitle>
                        <CardDescription>{relatedArticle.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{relatedArticle.readTime}</span>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/resources/article">
                              Read
                              <BookOpen className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Support CTA */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="text-center py-8">
                  <h3 className="text-2xl font-bold mb-4">Need More Support?</h3>
                  <p className="text-muted-foreground mb-6">
                    Our compassionate team is here to help guide you through Jewish mourning customs
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <Link href="/grief-support">Visit Grief Support</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
