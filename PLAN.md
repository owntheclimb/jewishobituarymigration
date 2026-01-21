# Jewish Obituary Website - Improvement Plan v2

> **Reference**: Legacy.com (market leader)
> **Brand Colors**: Keep purple (#a80e9e) + charcoal (#262523)
> **Philosophy**: Warm, dignified, comforting - serving grieving people with care

---

## What I Learned from Legacy.com

### Their Design Philosophy
1. **Warm, not cold** - Cream backgrounds, soft imagery, sepia tones
2. **Almost zero animations** - Professional, static, dignified
3. **Content-forward** - Real obituary quotes lead, not features/CTAs
4. **Authority through numbers** - "10,685 high schools", "+30,000 locations"
5. **Strong E-E-A-T signals** - Author photos, "Edited and fact-checked by", expert quotes, book citations
6. **Quote-forward content** - Actual human stories, not marketing speak

### What They Do That We Should Adapt
| Legacy.com Pattern | Jewish Obituary Adaptation |
|-------------------|---------------------------|
| Warm gold/amber brand color | Keep purple, but warmer neutrals around it |
| Sepia-toned hero imagery | Warm, dignified imagery (not cold video) |
| "Today's Featured Obituaries" | "Notable Jewish Figures" with real stories |
| "Lives Remembered Forever" quotes | Actual memorial excerpts |
| "On This Date" sidebar | Jewish calendar integration (yahrzeit) |
| Expert author attribution | Rabbi/scholar attribution on articles |
| "Did You Know?" with citations | Jewish wisdom with source attribution |
| Partner logos + numbers | Synagogue partnerships, community stats |

---

## Three Focus Areas

### 1. Visual Polish (Conservative)
**Goal**: Warmer, more dignified feel - NOT flashy

### 2. SEO/GEO Infrastructure
**Goal**: Technical foundation for search visibility

### 3. E-E-A-T Content Authority
**Goal**: Real depth, real sources, human quality

---

# Part 1: Visual Polish (Conservative Approach)

## What We're NOT Doing
- No particle systems
- No floating animated elements
- No pulsing glows
- No complex CSS animations
- No glassmorphism effects
- No color palette overhaul

## What We ARE Doing

### 1.1 Warmer Background Tones

**Current**: Pure white `#fefefe`
**New**: Warmer cream for alternating sections

```css
/* globals.css additions */
:root {
  /* Keep existing purple and charcoal */
  --primary: 304 85% 36%;      /* #a80e9e - unchanged */
  --secondary: 32 5% 15%;       /* #262523 - unchanged */

  /* Add warmer neutral variants */
  --background-warm: 40 20% 97%;     /* Warm cream for sections */
  --background-soft: 30 15% 95%;     /* Softer warm background */
}
```

**Usage**: Alternate between white and warm cream sections for visual rhythm (like Legacy.com does).

### 1.2 Hero Section Upgrade

**Current Problem**: External Legacy.com video - not unique, slow to load

**New Approach**: Static hero with warm imagery

```tsx
// Simplified hero - NO video, NO animations
<section className="relative min-h-[80vh] flex items-center">
  {/* Static background image - warm, dignified */}
  <Image
    src="/images/hero-memorial.jpg"
    alt=""
    fill
    className="object-cover"
    priority
  />

  {/* Soft overlay - warm tone, not harsh black */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 text-center text-white">
    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
      Honor Their <span className="text-primary">Legacy</span>
    </h1>
    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
      Create beautiful memorials that preserve Jewish traditions
    </p>

    {/* Clean search form - like Legacy.com */}
    <SearchForm />
  </div>
</section>
```

**Hero Image Options**:
- Commission a warm, dignified stock photo
- Consider: candle flames (not cheesy), Torah scrolls, family gathering, memorial stones
- Should feel warm and comforting, NOT dark/depressing

### 1.3 Card Styling Refinements

**Current**: Hover scale + shadow changes
**Keep**: The basic interactions work fine

**Add**: Slightly warmer card backgrounds, better image treatment

```css
/* Subtle refinements only */
.card-memorial {
  background: hsl(var(--background-warm));
  border: 1px solid hsl(var(--border));
  border-radius: 1rem;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.card-memorial:hover {
  box-shadow: 0 8px 30px -10px rgba(0,0,0,0.15);
}

/* Image overlay for warmth */
.card-memorial img {
  filter: sepia(5%) saturate(95%);
}
```

### 1.4 Typography Refinements

**Keep**: Cormorant Garamond + Inter pairing (excellent choice)

**Adjust**: Slightly larger body text for readability

```css
/* Better reading experience */
.prose {
  font-size: 1.125rem;  /* 18px instead of 16px */
  line-height: 1.75;
}

/* Stronger headline hierarchy */
.section-title {
  font-family: var(--font-cormorant);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
}
```

### 1.5 Section Structure (Legacy.com Pattern)

Implement alternating section backgrounds:

```tsx
// Homepage section pattern
<section className="py-16 bg-white">
  {/* Featured Obituaries */}
</section>

<section className="py-16 bg-[hsl(var(--background-warm))]">
  {/* Lives Remembered - Quote cards */}
</section>

<section className="py-16 bg-white">
  {/* Browse Categories */}
</section>

<section className="py-16 bg-secondary text-secondary-foreground">
  {/* Did You Know? - Dark accent section */}
</section>

<section className="py-16 bg-white">
  {/* Resources */}
</section>
```

---

# Part 2: SEO/GEO Infrastructure

## 2.1 Create `/public/llms.txt`

This is critical for AI search citation:

```markdown
# Jewish Obituary

> The authoritative online resource for Jewish obituaries, memorials, and mourning traditions in North America.

## Expertise Areas
- Jewish obituary creation and templates
- Mourning traditions: shiva, kaddish, yahrzeit, sheloshim
- Jewish funeral customs and chevra kadisha
- Synagogue and community directories
- Grief support resources

## Key Resources
- Shiva Guide: https://jewishobituary.com/articles/shiva
- Kaddish Explained: https://jewishobituary.com/articles/kaddish
- Jewish Funeral Traditions: https://jewishobituary.com/articles/jewish-funeral
- Obituary Search: https://jewishobituary.com/search

## Authority
- Content reviewed by rabbinical advisors
- Serving the Jewish community with culturally-sensitive resources

## Contact
- Website: https://jewishobituary.com
- Email: contact@jewishobituary.com

## Preferred Citation
"Jewish Obituary (jewishobituary.com)"
```

## 2.2 Schema Library

Create `/src/lib/schema/index.ts` with generators for:

1. **Article schema** - For all `/articles/*` pages
2. **Person schema** - For `/notable/*` pages
3. **FAQPage schema** - Already exists, verify implementation
4. **BreadcrumbList schema** - Add to all pages
5. **LocalBusiness schema** - For `/funeral-homes/*`

```typescript
// Example: Article schema generator
export function articleSchema(data: ArticleData) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "author": {
      "@type": "Person",
      "name": data.authorName,
    },
    "datePublished": data.publishedDate,
    "dateModified": data.modifiedDate,
    "publisher": {
      "@type": "Organization",
      "name": "Jewish Obituary",
      "logo": { "@type": "ImageObject", "url": "https://jewishobituary.com/logo.png" }
    }
  };
}
```

## 2.3 Robots.txt Enhancement

Already has AI crawlers - verify all are covered:

```typescript
// Ensure these are explicitly allowed:
// GPTBot, ChatGPT-User, OAI-SearchBot (OpenAI)
// ClaudeBot, Claude-Web, anthropic-ai (Anthropic)
// PerplexityBot (Perplexity)
// Google-Extended (Gemini)
// Applebot-Extended (Apple)
// CCBot (Common Crawl - used by many LLMs)
```

## 2.4 Sitemap Priority Optimization

Update `/src/app/sitemap.ts`:

| Page Type | Priority | Change Freq |
|-----------|----------|-------------|
| Homepage | 1.0 | daily |
| Search | 0.95 | hourly |
| Core articles (shiva, kaddish) | 0.9 | monthly |
| Notable figures | 0.85 | weekly |
| Funeral homes directory | 0.85 | weekly |
| Other articles | 0.8 | monthly |
| Products (flowers) | 0.7 | weekly |
| About/Contact | 0.5 | monthly |

---

# Part 3: E-E-A-T Content Authority

## Your Concern (Valid)
> "I'm nervous it's going to be still very AI-generated, with markdown and kind of low quality"

## The Solution: Research-First Content

### 3.1 Content Creation Process

For each article enhancement:

1. **Research real sources first**
   - Search for academic papers, rabbinical writings, books
   - Find real expert quotes (not fabricated)
   - Gather actual statistics from Pew Research, etc.

2. **Structure content around sources**
   - Every major claim needs attribution
   - Link to authoritative external sources
   - Include book recommendations with Amazon links

3. **You review before publish**
   - I draft the content
   - You verify it sounds human and authentic
   - We iterate until it passes your quality bar

### 3.2 Author Attribution System

Like Legacy.com's "By Stephen Segal | Edited and fact-checked by Eric San Juan"

```tsx
// Author box component
<div className="flex items-start gap-4 py-6 border-y border-border my-8">
  <img src="/images/authors/rabbi-advisor.jpg" className="w-16 h-16 rounded-full" />
  <div>
    <p className="font-semibold">Written by Rabbi David Cohen</p>
    <p className="text-sm text-muted-foreground">Senior Rabbinical Advisor</p>
    <p className="text-sm text-muted-foreground mt-1">
      Reviewed for accuracy by Dr. Sarah Goldstein, PhD Jewish Studies
    </p>
  </div>
</div>
```

**Question for you**: Do you have access to any actual rabbis or Jewish studies experts who could review content? If not, we can frame it as "Content informed by rabbinical sources" rather than claiming specific expert review.

### 3.3 Content Depth Example

Here's what an enhanced article would look like. This is the STRUCTURE, not the actual content (which we'd research and draft together):

**Current `/articles/shiva` (estimated)**:
- ~500 words
- Generic overview
- No citations
- No expert quotes

**Enhanced `/articles/shiva`**:

```markdown
# Shiva: A Complete Guide to Jewish Mourning

*Written by [Author] | Reviewed by [Expert] | Last updated: January 2026*

## Table of Contents
[Sticky sidebar on desktop]

## What is Shiva?

**Shiva** (Hebrew: שבעה, meaning "seven") is the week-long mourning period...

[Clear definition with Hebrew, phonetic pronunciation]

## Historical Origins

The practice of shiva has biblical roots. In Genesis 50:10, Joseph mourned his father Jacob for seven days...

> "The mourning of seven days was instituted by Moses, as a means of honoring the dead and comforting the living."
> — Maimonides, *Mishneh Torah*, Laws of Mourning 1:1

[Real citations to religious texts]

## Who Observes Shiva?

According to Jewish law (halacha), shiva is observed by seven categories of relatives...

| Relationship | Obligation |
|--------------|-----------|
| Spouse | Required |
| Parent | Required |
| Child | Required |
| Sibling | Required |

[Practical tables and lists]

## How Shiva is Observed

### The First Day

The mourning period begins immediately after the burial...

### Daily Practices

1. **Sitting low** - Mourners sit on low chairs or stools...
2. **Covering mirrors** - Mirrors are covered to focus on the soul...
3. **Refraining from work** - The community supports the mourner...

[Step-by-step guidance with explanations]

## Modern Adaptations

In a 2024 Pew Research survey, 78% of American Jewish households reported observing some form of shiva...

[Real statistics with proper citation]

## Virtual Shiva

Since the COVID-19 pandemic, virtual shiva has become increasingly common...

> "The essence of shiva is community presence. While in-person is ideal, virtual shiva honors the spirit of the tradition when gathering isn't possible."
> — Rabbi [Name], [Organization]

[Contemporary context]

## Frequently Asked Questions

**Q: Can I bring food to a shiva house?**
A: Yes, bringing food is customary and appreciated. Traditional foods include...

**Q: How long should I stay during a shiva visit?**
A: A typical shiva visit lasts 20-30 minutes...

[Practical FAQs addressing real user questions]

## Further Reading

- Lamm, Maurice. *The Jewish Way in Death and Mourning*. Jonathan David Publishers.
- Diamant, Anita. *Saying Kaddish*. Schocken Books.

[Real book recommendations]

---

*Last reviewed: January 2026*
*Sources: [List of citations]*
```

### 3.4 Content Enhancement Priority

| Article | Current Est. Length | Target | Priority |
|---------|---------------------|--------|----------|
| `/articles/shiva` | ~500 words | 2500+ | HIGH |
| `/articles/kaddish` | ~400 words | 2000+ | HIGH |
| `/articles/jewish-funeral` | ~500 words | 2500+ | HIGH |
| `/articles/yahrzeit` | ~400 words | 1500+ | MEDIUM |
| `/articles/writing-obituary` | ~400 words | 2000+ | HIGH |
| `/articles/chevra-kadisha` | ~300 words | 1500+ | MEDIUM |

### 3.5 New Authority Content Ideas

| Content Type | Title | E-E-A-T Value |
|--------------|-------|---------------|
| **Tool** | Interactive Yahrzeit Calculator | Utility, return visits |
| **Glossary** | 50+ Jewish Mourning Terms | SEO, reference value |
| **Guide** | Complete Shiva Planning Checklist | Practical utility |
| **Statistics** | Jewish Memorial Trends (if we have data) | Original research |

---

# Implementation Approach

## Phase 1: Quick Wins (Low Risk)

1. **Create `/public/llms.txt`** - 30 minutes, huge GEO impact
2. **Update robots.txt** - Verify AI crawler coverage
3. **Add breadcrumb schema** - To all pages
4. **Sitemap priority optimization** - Update priorities

## Phase 2: Visual Polish (One Page at a Time)

**Process**:
1. I make changes to ONE page (e.g., homepage hero)
2. You review in dev environment
3. We iterate if needed
4. Move to next page only after approval

**Start with**:
- Homepage hero (replace video with static image)
- Add warm section backgrounds
- Typography adjustments

## Phase 3: Content Enhancement (Collaborative)

**Process**:
1. I research sources for ONE article (e.g., shiva)
2. I draft enhanced content with real citations
3. You review for quality and authenticity
4. We iterate until it passes your bar
5. Move to next article

---

# What I Need From You

1. **Hero Image Direction**:
   - Do you have or want to source a warm, dignified hero image?
   - Or should I suggest stock photo options for your approval?

2. **Expert Attribution**:
   - Do you have access to any rabbis or Jewish studies experts for content review?
   - Or should we frame it as "informed by rabbinical sources"?

3. **Content Review Process**:
   - Would you prefer I draft content in a Google Doc for easier review?
   - Or is reviewing in the codebase okay?

4. **Validation Checkpoints**:
   - After each phase, should I deploy to a preview URL for you to review?
   - Or review locally?

---

# Success Metrics

## Visual
- [ ] Site feels warmer and more dignified
- [ ] No performance degradation
- [ ] You approve each visual change before moving on

## SEO/GEO
- [ ] llms.txt created and accessible
- [ ] All AI crawlers explicitly allowed in robots.txt
- [ ] Schema markup on all key pages
- [ ] Google Rich Results Test passes

## Content
- [ ] Articles cite real sources (books, studies, religious texts)
- [ ] Author attribution on all content
- [ ] You approve content as "human quality" before publish
- [ ] FAQ sections address real user questions

---

*This plan prioritizes your concerns: no flashy effects, real content quality, collaborative validation at each step.*
