# Jewish Obituary Website - Complete Implementation Plan

**Date:** January 28, 2026
**Status:** Planning Phase
**Goal:** Transform this site from a mock-data shell into a fully functional, production-ready Jewish obituary platform that rivals Legacy.com

---

## Executive Summary

### Current State
The site has a solid technical foundation (Next.js, Supabase, Tailwind) but is filled with **mock/placeholder data** that makes it unusable for real users. The database schema exists but many tables are empty, and the frontend falls back to hardcoded arrays.

### Target State
A real, authoritative Jewish obituary website with:
- Real obituaries from RSS feeds, web scraping, and user submissions
- Real synagogues, funeral homes, schools from curated data sources
- User-generated content with moderation
- World-class SEO making this the go-to resource for Jewish obituaries
- Security features preventing abuse

---

## PART 1: MOCK DATA AUDIT

### Pages Using Mock Data (Must Be Fixed)

| Page | Mock Data Location | Lines | Items | Severity |
|------|-------------------|-------|-------|----------|
| `/synagogues` | `mockSynagogues` array | 15-82 | 6 fake synagogues | CRITICAL |
| `/funeral-homes` | `mockFuneralHomes` array | 34-156 | 7 fake funeral homes | CRITICAL |
| `/schools` | `mockSchools` array | 14-75 | 6 fake schools | CRITICAL |
| `/cities` | `mockCities` array | 14-105 | 10 fake cities | HIGH |
| `/organizations` | `mockOrganizations` array | 13-78 | 8 fake organizations | HIGH |
| `/charities` | `jewishCharities`, `generalCharities` | 16-108 | 11 fake charities | MEDIUM |
| `/grief-support` | Multiple arrays | 12-100 | Multiple resources | MEDIUM |
| `/flowers` | `fallbackProducts` array | 146-201 | 6 fake products | MEDIUM |
| Homepage | `ValuePromise.tsx` | 94 | "Sarah Goldman" fake person | LOW |
| Product Reviews | `ProductReviews.tsx` | 37-68 | 3 fake reviews | LOW |
| Communities | Inline testimonials | 282-326 | 3 fake testimonials | LOW |

### Fake Contact Information (Must Be Updated)

| Location | Fake Data | Real Replacement Needed |
|----------|-----------|------------------------|
| `/contact` | `(555) 123-4567` | Real phone or remove |
| `/contact` | `123 Memorial Avenue` | Real address or generic |
| `/faq` | `(555) 123-4567` | Real phone or remove |
| `/flowers` | `(555) 123-FLOWERS` | Real phone or remove |
| `/planning` | `(555) 123-4567` | Real phone or remove |
| `/grief-support` | `1-800-567-JEWISH` | Remove (fake number) |

---

## PART 2: DATABASE STATUS

### Tables That Exist and Are Used

| Table | Purpose | Has Data | Frontend Connection |
|-------|---------|----------|---------------------|
| `obituaries` | User-created obituaries | Empty (awaiting users) | `/create-obituary`, `/obituary/[id]` |
| `obits` | RSS feed obituaries | Depends on cron job | `/obituaries`, `/search` |
| `scraped_obituaries` | Web-scraped obituaries | Depends on scraper | `/obituaries`, `/search` |
| `obit_sources` | RSS feed configurations | YES (~25 sources) | Backend only |
| `scraped_sources` | Scraper configurations | YES (~15 sources) | Admin only |
| `communities` | Community affiliations | Some sample data | `/communities` |
| `vendors` | Funeral homes/services | Empty | `/funeral-homes` (falls back to mock) |
| `products` | E-commerce products | Empty | `/flowers` (falls back to mock) |
| `cemeteries` | Cemetery directory | 5 samples | `/cemetery-directory` |
| `profiles` | User profiles | Empty (awaiting users) | `/account` |
| `contact_submissions` | Contact form | Working | `/contact` |
| `guestbook_entries` | Obituary guestbooks | Working | Obituary pages |

### Tables That Need Creation

| Table | Purpose | Priority |
|-------|---------|----------|
| `synagogues` | Synagogue directory | HIGH |
| `jewish_schools` | School directory | HIGH |
| `jewish_organizations` | Organization directory | MEDIUM |

---

## PART 3: SCRAPING STATUS

### RSS Feed Ingestion
- **Infrastructure:** Edge function exists (`sync-obituaries`, `parse-rss-feed`)
- **Cron Job:** `refresh_obits_15m` configured to run every 15 minutes
- **Sources Configured:** ~25 RSS feeds across FL, NY, MD, PA, CO, CT, AZ, MA, GA, VA, MN, WI, MO
- **Status:** NEEDS VERIFICATION - Check if cron job is running and data is flowing

### Web Scraping
- **Infrastructure:** `scraped_sources` table with scraper configs
- **Sources Configured:** ~15 funeral home websites
- **Status:** NEEDS VERIFICATION - Check if scraper is executing

### Action Items
1. Verify Supabase cron job is enabled and running
2. Check `obits` table for recent data
3. Check `scraped_obituaries` table for recent data
4. If empty, manually trigger sync function
5. Debug any scraper failures

---

## PART 4: WHAT'S ACTUALLY WORKING

### Fully Functional Features
- User authentication (email + Google OAuth)
- User account management
- Obituary creation form
- Individual obituary pages with guestbook
- Community pages
- Admin dashboard with analytics
- Admin content management
- Contact form
- Notable figures (intentionally static)
- Educational articles/resources

### Partially Functional Features
- Search (works, but may not include all sources)
- Funeral homes directory (has DB code, falls back to mock)
- Flowers shop (has DB code, falls back to mock)

### Completely Broken/Shell Features
- Synagogues (100% mock)
- Schools (100% mock)
- Organizations (100% mock)
- Charities (100% mock)
- Cities (100% mock)

---

## PART 5: IMPLEMENTATION PLAN

### Phase 1: Fix Critical Publishing Bug (Day 1)
**Priority:** BLOCKER - Site can't function if obituaries can't be created

Tasks:
1. Debug why "Publishing..." gets stuck
2. Check Supabase RLS policies on `obituaries` table
3. Check `update_community_stats` RPC function
4. Add proper error handling and logging
5. Test full publish flow

### Phase 2: Verify Scraping Pipeline (Day 1)
**Priority:** HIGH - This is how we get real obituary data

Tasks:
1. Check Supabase cron job status
2. Manually trigger `sync-obituaries` edge function
3. Verify RSS feeds are returning data
4. Check `obits` table for new entries
5. Check `scraped_obituaries` table for new entries
6. Fix any broken feed URLs
7. Add monitoring/alerting for failed syncs

### Phase 3: Remove All Mock Data (Day 2-3)
**Priority:** HIGH - No more fake data ever

For each mock data page:
1. Create database table if doesn't exist
2. Remove hardcoded mock array
3. Replace with database query
4. Show proper empty state if no data
5. Add admin interface to manage data

Order of implementation:
1. Funeral Homes (table exists, just needs data)
2. Synagogues (need new table)
3. Schools (need new table)
4. Organizations (need new table)
5. Cities (connect to communities or remove)
6. Charities (need new table or remove page)

### Phase 4: Populate Real Data (Day 3-5)
**Priority:** HIGH - Need real data to replace mock

#### Funeral Homes
Strategy: Curate list of real Jewish funeral homes
- Source: Google search, Chevra Kadisha directories
- Data needed: Name, address, phone, website, services, denomination
- Start with major metro areas (NY, LA, Chicago, Miami, etc.)
- Target: 100+ funeral homes

#### Synagogues
Strategy: Use public directories
- Source: URJ (Reform), USCJ (Conservative), OU (Orthodox) directories
- Data needed: Name, address, denomination, website, rabbi
- Start with top 50 US cities by Jewish population
- Target: 500+ synagogues

#### Schools
Strategy: Use Jewish school associations
- Source: RAVSAK, Torah Umesorah, PJA directories
- Data needed: Name, address, type (day school, yeshiva, etc.), grades
- Target: 200+ schools

#### Organizations
Strategy: Curate major national organizations
- Source: Wikipedia, JTA, organizational websites
- Data needed: Name, mission, website, contact
- Target: 50+ organizations

### Phase 5: Build User Submission System (Day 5-7)
**Priority:** MEDIUM - Allow community to add data

For each directory type, build:
1. Submission form (logged-in users only)
2. Pending submissions queue
3. Admin approval workflow
4. Edit request system
5. Claim business system

Security features:
- Rate limiting: Max 5 submissions per day per user
- Email verification required
- Admin approval required for new entries
- Edit requests require approval
- Ban system for bad actors

### Phase 6: SEO Optimization (Day 7-10)
**Priority:** HIGH - Be the primary source for Jewish obituaries

#### Technical SEO
- Verify all pages have proper meta tags
- Add structured data (Person, Article, LocalBusiness schemas)
- Create XML sitemap with all obituaries
- Submit to Google Search Console
- Implement proper canonical URLs

#### Content SEO
- Each obituary page optimized for full name + location
- Each synagogue page optimized for "[name] + synagogue + [city]"
- Each funeral home page optimized for "Jewish funeral home [city]"
- Educational content targeting mourning-related searches

#### E-E-A-T Signals
- Add author bios to articles
- Add "About Us" with credentials
- Add sources/citations where appropriate
- Build backlinks from Jewish organizations
- Display trust signals (established date, community size)

### Phase 7: Admin & Security (Day 10-12)
**Priority:** HIGH - Protect against abuse

#### Admin Features
- One-click delete for any content
- Bulk moderation tools
- User ban system
- Content flagging system
- Audit log of all changes

#### Security Features
- Rate limiting on all forms
- CAPTCHA on public submissions
- Content filtering for hate speech
- IP blocking for repeat offenders
- Email alerts for flagged content

### Phase 8: Polish & Testing (Day 12-14)
**Priority:** MEDIUM - Final quality checks

Tasks:
1. Remove all remaining placeholder content
2. Update contact information
3. Test all forms end-to-end
4. Mobile responsiveness check
5. Accessibility audit
6. Performance optimization
7. Final QA pass

---

## PART 6: SUCCESS CRITERIA

### Minimum Viable Product (MVP)
- [ ] Obituary publishing works end-to-end
- [ ] Scraping pipeline running and populating data
- [ ] No mock data arrays anywhere
- [ ] Funeral homes directory with 50+ real entries
- [ ] Synagogues directory with 100+ real entries
- [ ] User submissions possible with moderation
- [ ] Admin can delete any content with one click
- [ ] Rate limiting on all user actions

### Full Launch Criteria
- [ ] 500+ synagogues in database
- [ ] 100+ funeral homes in database
- [ ] 100+ schools in database
- [ ] 1000+ obituaries from scraping
- [ ] SEO optimized for all major Jewish communities
- [ ] Appearing in Google for "[city] Jewish obituary" searches
- [ ] Zero mock data remaining
- [ ] Full admin moderation tools
- [ ] Email notifications working

---

## PART 7: FILE CHANGES REQUIRED

### Files to Delete
None - all files can be modified in place

### Files to Create
- `supabase/migrations/YYYYMMDD_create_synagogues_table.sql`
- `supabase/migrations/YYYYMMDD_create_schools_table.sql`
- `supabase/migrations/YYYYMMDD_create_organizations_table.sql`
- `src/app/admin/synagogues/page.tsx`
- `src/app/admin/schools/page.tsx`
- `src/app/admin/organizations/page.tsx`
- `src/app/submit/synagogue/page.tsx`
- `src/app/submit/school/page.tsx`
- `src/scripts/seed-synagogues.ts`
- `src/scripts/seed-schools.ts`
- `src/scripts/seed-funeral-homes.ts`

### Files to Modify Heavily
- `src/app/synagogues/page.tsx` - Remove mock, add DB query
- `src/app/funeral-homes/page.tsx` - Remove mock fallback
- `src/app/schools/page.tsx` - Remove mock, add DB query
- `src/app/organizations/page.tsx` - Remove mock, add DB query
- `src/app/cities/page.tsx` - Remove mock, connect to communities
- `src/app/charities/page.tsx` - Remove mock or remove page
- `src/app/grief-support/page.tsx` - Verify phone numbers or remove
- `src/app/contact/page.tsx` - Update contact info
- `src/app/create-obituary/page.tsx` - Fix publishing bug
- `src/components/home/ValuePromise.tsx` - Replace fake person
- `src/components/product/ProductReviews.tsx` - Remove fake reviews

---

## PART 8: DATA SOURCES FOR REAL CONTENT

### Synagogues
1. **URJ Congregation Directory** (Reform) - https://urj.org/congregations
2. **USCJ Directory** (Conservative) - https://www.uscj.org/find-a-kehila
3. **Orthodox Union Directory** - https://www.ou.org/synagogue-finder/
4. **Chabad Directory** - https://www.chabad.org/centers/
5. **Independent synagogue listings** via Google

### Funeral Homes
1. **Jewish Funeral Directors of America** - membership list
2. **Chevra Kadisha directories** by city
3. **Google search** for "Jewish funeral home [city]"
4. **Yelp** Jewish funeral home category
5. **Manual curation** of known providers

### Schools
1. **RAVSAK** (Community Day Schools) - https://prizmah.org/
2. **Torah Umesorah** (Orthodox Day Schools)
3. **PJA** (Progressive Jewish Day Schools)
4. **JDS directories** by state

### Obituaries (Scraping)
Already configured:
- Jewish news sites (Yeshiva World, Matzav, Jewish Press)
- Jewish community newspapers
- Jewish funeral home websites
- Jewish cemetery records (where available)

---

## PART 9: SECURITY ARCHITECTURE

### Authentication Requirements
| Action | Auth Required | Additional Checks |
|--------|--------------|-------------------|
| View obituaries | No | None |
| Create obituary | Yes | Email verified |
| Edit own obituary | Yes | Owner check |
| Delete own obituary | Yes | Owner check |
| Submit synagogue | Yes | Email verified, rate limited |
| Edit synagogue | Yes | Claim verified OR admin |
| Admin actions | Yes | Admin role check |

### Rate Limiting
| Action | Limit | Window |
|--------|-------|--------|
| Create obituary | 3 | Per day |
| Submit directory entry | 5 | Per day |
| Edit requests | 10 | Per day |
| Contact form | 3 | Per hour |
| Search queries | 100 | Per minute |
| API calls | 1000 | Per hour |

### Content Moderation
1. **Automated filters** for hate speech, spam
2. **Admin queue** for new submissions
3. **Community flagging** for inappropriate content
4. **One-click delete** for admins
5. **IP banning** for repeat offenders
6. **Audit log** of all moderation actions

---

## PART 10: TIMELINE ESTIMATE

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Fix Publishing | 2-4 hours | None |
| Phase 2: Verify Scraping | 2-4 hours | None |
| Phase 3: Remove Mock Data | 8-12 hours | Phase 1-2 |
| Phase 4: Populate Real Data | 12-24 hours | Phase 3 |
| Phase 5: User Submissions | 8-12 hours | Phase 3-4 |
| Phase 6: SEO Optimization | 6-8 hours | Phase 4 |
| Phase 7: Admin & Security | 6-8 hours | Phase 5 |
| Phase 8: Polish & Testing | 4-6 hours | All |

**Total Estimated Time:** 48-78 hours of focused work

---

## Approval Checklist

Before starting implementation:
- [ ] User approves this plan
- [ ] User confirms no more mock data ever
- [ ] User confirms real contact info to use
- [ ] User confirms priority order
- [ ] User confirms security requirements

---

## Notes

This plan prioritizes:
1. **Functionality** - Make the core product work
2. **Authenticity** - Real data only, no mock
3. **Security** - Protect against abuse
4. **SEO** - Become the authority on Jewish obituaries
5. **Scalability** - Build for growth

The site already has excellent infrastructure. We're not rebuilding - we're completing and populating with real data.
