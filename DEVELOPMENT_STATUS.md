# Jewish Obituary Website - Development Status & Documentation

> **Last Updated**: January 2026
> **Purpose**: This document provides complete context for continuing development in a new session.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [Admin CMS System](#admin-cms-system)
6. [API Routes](#api-routes)
7. [Completed Work](#completed-work)
8. [Pending Work](#pending-work)
9. [Key Files Reference](#key-files-reference)
10. [Development Guidelines](#development-guidelines)

---

## Project Overview

**Jewish Obituary** (jewishobituary.com) is a comprehensive platform for:
- Creating and publishing Jewish obituaries and memorials
- Finding funeral homes, florists, and service providers
- Planning shiva and mourning services
- Community directories (synagogues, schools, organizations)
- E-commerce for sympathy flowers and memorial products

**Supabase Project ID**: `pinwpummsftjsqvszchs`
**Region**: `us-east-2`

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Analytics | PostHog, Microsoft Clarity |
| Lead Tracking | RB2B |

### Key Dependencies
- `@supabase/supabase-js` - Database client
- `zod` - Form validation
- `lucide-react` - Icons
- `sonner` - Toast notifications
- `@radix-ui/*` - UI primitives (via shadcn/ui)

---

## Project Structure

```
target-repo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Admin CMS pages
│   │   │   ├── products/       # Product management
│   │   │   ├── vendors/        # Vendor management
│   │   │   ├── pages/          # Notable figures management
│   │   │   ├── settings/       # Settings (view & edit)
│   │   │   ├── analytics/      # Analytics dashboard
│   │   │   ├── clicks/         # Click tracking
│   │   │   ├── leads/          # RB2B leads
│   │   │   ├── content/        # Guestbook moderation
│   │   │   └── admins/         # Admin user management
│   │   ├── api/                # API routes
│   │   │   ├── contact/        # Contact form submissions
│   │   │   ├── analytics/      # Event tracking
│   │   │   └── webhooks/rb2b/  # RB2B webhook
│   │   ├── flowers/            # Product catalog
│   │   ├── funeral-homes/      # Vendor directory
│   │   ├── notable/            # Notable figures
│   │   ├── contact/            # Contact form
│   │   ├── faq/                # FAQ with schema markup
│   │   └── ...                 # Other public pages
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── memorial/           # Memorial-specific components
│   │   ├── cart/               # Shopping cart
│   │   └── shiva/              # Shiva planning components
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts       # Browser Supabase client
│   │       └── types.ts        # Generated TypeScript types
│   ├── data/
│   │   └── notableFigures.ts   # Fallback notable figures data
│   └── hooks/                  # Custom React hooks
├── public/                     # Static assets
└── supabase/                   # Supabase config (if using CLI)
```

---

## Database Schema

### Tables Created for CMS

#### `products`
```sql
- id: uuid (PK)
- name: text (NOT NULL)
- slug: text (UNIQUE)
- description: text
- price: decimal(10,2) (NOT NULL)
- compare_at_price: decimal(10,2)
- category_id: uuid (FK -> product_categories)
- image_url: text
- images: jsonb (array of image URLs)
- featured: boolean (default false)
- status: text ('active', 'draft', 'archived')
- stock_quantity: integer
- sku: text
- sort_order: integer
- created_at, updated_at: timestamptz
```

#### `product_categories`
```sql
- id: uuid (PK)
- name: text (NOT NULL)
- slug: text (UNIQUE)
- description: text
- image_url: text
- sort_order: integer
- active: boolean (default true)
- created_at: timestamptz
```

#### `vendors`
```sql
- id: uuid (PK)
- name: text (NOT NULL)
- slug: text (UNIQUE)
- type_id: uuid (FK -> vendor_types)
- description: text
- phone, email, website: text
- address, city, state, zip: text
- logo_url: text
- featured: boolean (default false)
- verified: boolean (default false)
- status: text ('active', 'inactive', 'pending')
- services: jsonb (array of {name: string})
- hours: jsonb
- sort_order: integer
- created_at, updated_at: timestamptz
```

#### `vendor_types`
```sql
- id: uuid (PK)
- name: text (NOT NULL)
- slug: text (UNIQUE)
- description: text
- created_at: timestamptz

-- Seeded with: funeral-home, florist, caterer, photographer,
--              monument-maker, grief-counselor, estate-lawyer, rabbi
```

#### `notable_figures`
```sql
- id: uuid (PK)
- name: text (NOT NULL)
- slug: text (UNIQUE)
- hebrew_name: text
- birth_date, death_date: text
- category: text
- bio: text
- quote: text
- image_url: text
- location: text
- achievements: jsonb (array of strings)
- candle_count, memory_count: integer
- featured: boolean (default false)
- status: text ('active', 'draft')
- sort_order: integer
- created_at, updated_at: timestamptz
```

#### `contact_submissions`
```sql
- id: uuid (PK)
- name, email, subject, message: text (NOT NULL)
- status: text ('new', 'read', 'replied', 'archived')
- ip_address, user_agent: text
- created_at, updated_at: timestamptz
```

#### `virtual_candles`
```sql
- id: uuid (PK)
- obituary_id: text (NOT NULL)
- session_id: text (for anonymous deduplication)
- user_id: uuid (optional, FK -> auth.users)
- message: text (optional)
- created_at: timestamptz
- UNIQUE(obituary_id, session_id)
```

#### `newsletter_subscribers`
```sql
- id: uuid (PK)
- email: text (UNIQUE, NOT NULL)
- status: text ('active', 'unsubscribed')
- source: text
- created_at, unsubscribed_at: timestamptz
```

#### `admin_settings`
```sql
- id: uuid (PK)
- key: text (UNIQUE, NOT NULL)
- value: jsonb
- updated_at: timestamptz
```

### Existing Tables (Already in Database)
- `profiles` - User profiles
- `obituaries` - Main obituary content
- `guestbook_entries` - Memorial guestbook
- `memories` - Shared memories
- `analytics_events` - Event tracking
- `rb2b_leads` - RB2B identified visitors

---

## Admin CMS System

### Access
- URL: `/admin`
- Protected by Supabase Auth
- Requires `is_admin: true` in `profiles` table

### Admin Pages

| Route | Purpose | Features |
|-------|---------|----------|
| `/admin` | Dashboard | Metrics overview |
| `/admin/analytics` | Analytics | Page views, events, time filters |
| `/admin/clicks` | Click Tracking | Event tracking data |
| `/admin/leads` | Leads | RB2B lead management |
| `/admin/content` | Content Moderation | Guestbook & memories moderation |
| `/admin/products` | **Product Management** | CRUD for products, categories |
| `/admin/vendors` | **Vendor Management** | CRUD for funeral homes, florists, etc. |
| `/admin/pages` | **Notable Figures** | CRUD for notable Jewish figures |
| `/admin/settings` | Settings Overview | View integrations & config |
| `/admin/settings/edit` | **Settings Editor** | Edit site name, contact, social, SEO |
| `/admin/admins` | Admin Users | Manage admin access |

### Admin Layout
Located at: `src/app/admin/layout.tsx`
- Sidebar navigation
- Auth protection (redirects non-admins)
- Mobile responsive

---

## API Routes

### `/api/contact` (POST)
**Purpose**: Save contact form submissions

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response**: `{ success: true, message: "...", id: "uuid" }`

**Validation**: Uses Zod schema (same as frontend)

### `/api/analytics` (POST)
**Purpose**: Track analytics events

**Request Body**:
```json
{
  "event_name": "string",
  "event_properties": {},
  "session_id": "string"
}
```

### `/api/webhooks/rb2b` (POST)
**Purpose**: Receive RB2B visitor identification webhooks

---

## Completed Work

### Phase 1: Database Migrations
- [x] Created `products` and `product_categories` tables
- [x] Created `vendors` and `vendor_types` tables
- [x] Created `notable_figures` table
- [x] Created `contact_submissions` table
- [x] Created `virtual_candles` table
- [x] Created `newsletter_subscribers` table
- [x] Seeded vendor types and sample products
- [x] Set up RLS policies for all tables

### Phase 2: Admin CMS Pages
- [x] `/admin/products/page.tsx` - Full CRUD with search, filter, category management
- [x] `/admin/vendors/page.tsx` - Full CRUD with type filter, status management
- [x] `/admin/pages/page.tsx` - Notable figures management
- [x] `/admin/settings/edit/page.tsx` - Site settings editor
- [x] Updated admin layout navigation

### Phase 3: Database Integration (Frontend)
- [x] `/flowers/page.tsx` - Fetches products from DB, falls back to hardcoded
- [x] `/funeral-homes/page.tsx` - Fetches vendors from DB, falls back to hardcoded
- [x] `/notable/page.tsx` - Fetches notable figures from DB, falls back to hardcoded

### Phase 4: Fixed Broken Features
- [x] Contact form now saves to database via `/api/contact`
- [x] Virtual candles persist to database (not just localStorage)
- [x] Session-based deduplication for candle lighting

### Phase 5: SEO Fixes
- [x] Expanded sitemap with all pages
- [x] Added FAQPage schema markup to `/faq`
- [x] Verified robots.txt with AI crawler support
- [x] Commented out placeholder Google verification

---

## Pending Work

### Payment Integration (DO NOT IMPLEMENT YET)
The following features are ready for payment but not connected:

| Feature | Location | Notes |
|---------|----------|-------|
| Checkout | `/checkout` | Form works, payment simulated |
| Flower Purchases | `/flowers`, `/product/[id]` | Cart works, needs Stripe |
| Memorial Trees | `/memorial-trees` | UI only |
| Memorial Donations | Memorial pages | Toast only |
| Premium Obituaries | `/pricing` | Tiers displayed, no purchase |

**When ready to add payments**:
1. Set up Stripe account
2. Create `/api/checkout` for payment intents
3. Create `/api/orders` for order management
4. Add Stripe Elements to checkout form
5. Set up Resend for order confirmations

### Other Pending Items
- [ ] Newsletter signup form in Footer
- [ ] Newsletter API route (`/api/newsletter`)
- [ ] Email notifications for contact form (via Resend)
- [ ] Media library admin page (`/admin/media`)
- [ ] Article schema markup for `/articles/*` pages
- [ ] LocalBusiness schema for funeral homes

---

## Key Files Reference

### Database & Types
- `src/integrations/supabase/client.ts` - Supabase browser client
- `src/integrations/supabase/types.ts` - TypeScript types (regenerate with `supabase gen types`)

### Admin Components
- `src/app/admin/layout.tsx` - Admin layout with sidebar
- `src/app/admin/products/page.tsx` - Product CRUD
- `src/app/admin/vendors/page.tsx` - Vendor CRUD
- `src/app/admin/pages/page.tsx` - Notable figures CRUD
- `src/app/admin/settings/edit/page.tsx` - Settings editor

### API Routes
- `src/app/api/contact/route.ts` - Contact form handler
- `src/app/api/analytics/route.ts` - Analytics event handler

### Frontend Data-Driven Pages
- `src/app/flowers/page.tsx` - Products from DB
- `src/app/funeral-homes/page.tsx` - Vendors from DB
- `src/app/notable/page.tsx` - Notable figures from DB

### SEO
- `src/app/sitemap.ts` - Dynamic sitemap
- `src/app/robots.ts` - Robots.txt with AI crawlers
- `src/app/faq/page.tsx` - Has FAQPage schema

### Fallback Data
- `src/data/notableFigures.ts` - Hardcoded notable figures (used if DB empty)

---

## Development Guidelines

### Adding New Products/Vendors/Figures
1. Go to admin panel (`/admin`)
2. Use the respective management page
3. Data automatically shows on public pages

### Database Pattern for New Features
```typescript
// Fetch with fallback pattern (used throughout)
const [dbData, setDbData] = useState([]);

useEffect(() => {
  async function fetchData() {
    const { data, error } = await supabase
      .from('table_name')
      .select('*')
      .eq('status', 'active');

    if (data && data.length > 0) {
      setDbData(data);
    }
  }
  fetchData();
}, []);

// Use DB data if available, otherwise fallback
const displayData = dbData.length > 0 ? dbData : fallbackData;
```

### API Route Pattern
```typescript
// src/app/api/[route]/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-side only
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  // Validate with Zod
  // Insert to database
  // Return response
}
```

### Environment Variables Required
```env
NEXT_PUBLIC_SUPABASE_URL=https://pinwpummsftjsqvszchs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (server only)
NEXT_PUBLIC_CLARITY_ID=v46eh408ed
NEXT_PUBLIC_POSTHOG_KEY=phc_Y38x...LBEB
NEXT_PUBLIC_RB2B_KEY=LNKLDHE30DOJ
```

---

## Quick Start for New Session

1. **Read this document** to understand project state
2. **Check Supabase** for current table data: Project ID `pinwpummsftjsqvszchs`
3. **Run dev server**: `npm run dev` or `pnpm dev`
4. **Test admin**: Go to `/admin` (requires admin user)

### Common Tasks

**Add a new product**:
1. Go to `/admin/products`
2. Click "Add Product"
3. Fill form and save

**Add a new vendor**:
1. Go to `/admin/vendors`
2. Click "Add Vendor"
3. Select type (funeral-home, florist, etc.)
4. Fill form and save

**View contact submissions**:
Check `contact_submissions` table in Supabase dashboard

**Regenerate TypeScript types**:
```bash
supabase gen types typescript --project-id pinwpummsftjsqvszchs > src/integrations/supabase/types.ts
```

---

## Architecture Decisions

1. **Fallback Pattern**: All data-driven pages fetch from DB but fall back to hardcoded data if empty. This ensures the site works even if DB tables are empty.

2. **Server-side API Routes**: Contact form and other mutations use Next.js API routes with `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS when needed.

3. **Client Components**: Most pages are client components (`'use client'`) due to interactivity needs. SEO handled via metadata exports and JSON-LD scripts.

4. **Admin Auth**: Uses `useAuth` hook that checks `profiles.is_admin`. Admin layout redirects non-admins.

5. **Virtual Candles**: Uses session ID (stored in localStorage) for anonymous deduplication while persisting to database for cross-browser counts.

---

*This document should be read at the start of any new development session to ensure continuity.*
