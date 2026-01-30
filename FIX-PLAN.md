# Comprehensive Bug Fix Plan - Jewish Obituary Website

**Date:** January 28, 2026
**Status:** Ready for Implementation

---

## Summary of Verified Bugs

| ID | Severity | Issue | Root Cause |
|----|----------|-------|------------|
| BUG-1 | CRITICAL | Dynamic resource articles show wrong content | `/resources/[id]/page.tsx` is hardcoded template |
| BUG-2 | CRITICAL | Markdown not rendering (raw `##` visible) | Using string replace instead of markdown parser |
| BUG-3 | LOW | `/create` returns 404 | Missing redirect |
| BUG-4 | LOW | `/signin` returns 404 | Missing redirect |
| BUG-5 | LOW | `/signup` returns 404 | Missing redirect |
| BUG-6 | LOW | `/dashboard` returns 404 | Missing redirect |
| BUG-7 | LOW | `/notable-figures` returns 404 | Missing redirect |
| BUG-8 | MEDIUM | React hydration errors on all pages | Date/time or localStorage SSR issues |

### Other AI's Findings - Verification Results

| Their Bug | Our Verification | Verdict |
|-----------|------------------|---------|
| BUG-001: /notable-figures 404 from footer | Footer link goes to `/notable` (correct) | PARTIALLY TRUE - URL 404s but not linked |
| BUG-002: Obituary pages return "Not Found" | Pages load correctly in modal | FALSE - Working fine |

---

## Fix Plan

### Phase 1: Critical Content Routing Fix (BUG-1 & BUG-2)

**Problem:** `/resources/[id]/page.tsx` is a hardcoded template that shows Shiva content for ALL dynamic routes.

**Affected URLs:**
- `/resources/yahrzeit-explained` - Shows Shiva instead of Yahrzeit
- `/resources/writing-meaningful-obituary` - Shows Shiva instead of Writing Guide
- Any other URL without a dedicated page file

**Solution Options:**

#### Option A: Create Static Pages for Each Article (Recommended)
Create dedicated page files for each article that should exist:
- `src/app/resources/yahrzeit-explained/page.tsx`
- `src/app/resources/writing-meaningful-obituary/page.tsx`

**Pros:** Simple, SEO-friendly, no database needed
**Cons:** More files to maintain

#### Option B: Fix Dynamic Route with Content Lookup
Modify `/resources/[id]/page.tsx` to:
1. Accept `params.id` from the route
2. Look up content from a data file or database
3. Return 404 if article not found
4. Render markdown properly

**Pros:** Single template, easier to add new articles
**Cons:** More complex, needs content data source

#### Option C: Delete the Dynamic Route
Remove `/resources/[id]/page.tsx` entirely so unknown URLs properly 404.

**Pros:** Simplest fix
**Cons:** URLs will 404 instead of showing useful content

**Recommended:** Option A (static pages) for existing articles, then Option B for future scalability.

### Phase 2: Markdown Rendering Fix (BUG-2)

**Problem:** Current code does `article.content.replace(/\n/g, '<br />')` which doesn't convert markdown headers.

**Solution:** Install and use a proper markdown parser:
```bash
npm install react-markdown remark-gfm
```

Then replace:
```tsx
// Current (broken)
dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(
    article.content.replace(/\n/g, '<br />'),
    { ALLOWED_TAGS: [...] }
  )
}}

// Fixed
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {article.content}
</ReactMarkdown>
```

### Phase 3: URL Redirects (BUG-3 to BUG-7)

**Solution:** Add redirects to `next.config.ts`:

```typescript
// next.config.ts
const nextConfig = {
  // ... existing config
  async redirects() {
    return [
      {
        source: '/create',
        destination: '/create-obituary',
        permanent: true,
      },
      {
        source: '/signin',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/account',
        permanent: true,
      },
      {
        source: '/notable-figures',
        destination: '/notable',
        permanent: true,
      },
    ];
  },
};
```

### Phase 4: React Hydration Errors (BUG-8)

**Problem:** React error #418 means server HTML doesn't match client HTML.

**Common causes to investigate:**
1. Date/time formatting (server in UTC, client in local timezone)
2. `Math.random()` or `Date.now()` in render
3. `localStorage` or `window` access during SSR
4. Browser extensions modifying DOM

**Solution approach:**
1. Add `suppressHydrationWarning` to specific elements if needed
2. Move dynamic content to `useEffect` hooks
3. Use `'use client'` directive appropriately

**Files to investigate:**
- Components using dates
- Components accessing localStorage
- Components with random values

---

## Implementation Order

1. **First:** Fix the critical content routing issue (Phase 1)
   - Create `/resources/yahrzeit-explained/page.tsx` with correct content
   - Create `/resources/writing-meaningful-obituary/page.tsx` with correct content
   - Consider removing or updating the catch-all `[id]` route

2. **Second:** Fix markdown rendering (Phase 2)
   - Install `react-markdown` and `remark-gfm`
   - Update article template to use proper markdown rendering

3. **Third:** Add URL redirects (Phase 3)
   - Update `next.config.ts` with redirects
   - Test all redirect paths

4. **Fourth:** Address hydration errors (Phase 4)
   - Investigate root cause
   - Apply appropriate fixes

---

## Files to Create/Modify

### New Files
- `src/app/resources/yahrzeit-explained/page.tsx`
- `src/app/resources/writing-meaningful-obituary/page.tsx`

### Files to Modify
- `next.config.ts` - Add redirects
- `src/app/resources/[id]/page.tsx` - Fix markdown rendering or remove
- Various components - Fix hydration issues

---

## Testing Checklist

After fixes, verify:
- [ ] `/resources/yahrzeit-explained` shows Yahrzeit content
- [ ] `/resources/writing-meaningful-obituary` shows Writing Guide content
- [ ] Markdown headers render as `<h2>`, `<h3>` etc.
- [ ] `/create` redirects to `/create-obituary`
- [ ] `/signin` redirects to `/login`
- [ ] `/signup` redirects to `/login`
- [ ] `/dashboard` redirects to `/account`
- [ ] `/notable-figures` redirects to `/notable`
- [ ] Console has no React hydration errors
- [ ] All existing functionality still works

---

## Estimated Effort

| Phase | Effort | Priority |
|-------|--------|----------|
| Phase 1 (Content Routing) | 2-3 hours | CRITICAL |
| Phase 2 (Markdown) | 30 min | HIGH |
| Phase 3 (Redirects) | 15 min | LOW |
| Phase 4 (Hydration) | 1-2 hours | MEDIUM |

**Total:** ~4-6 hours

---

## Notes

- The other AI agent's BUG-002 (obituary pages not working) was **incorrect** - they work fine
- The footer "Notable Figures" link is correct - it points to `/notable`
- These bugs don't affect core functionality (creating/viewing obituaries)
- All image 404s have been fixed in previous session
