# Jewish Obituary Website - Comprehensive QA Audit Report V2
**Date:** 2026-01-28
**Session Duration:** Ongoing

---

## SUMMARY OF ISSUES

### CRITICAL ISSUES (Blocking/Major Functionality)

| Issue | Page | Description | Priority |
|-------|------|-------------|----------|
| Article detail pages 404 | /articles/* | Article links don't navigate to individual article pages | HIGH |
| Notable Figures page 404 | /notable-figures | Returns 404 error | HIGH |

### MEDIUM ISSUES (Functional but Need Fix)

| Issue | Page | Description | Priority |
|-------|------|-------------|----------|
| Broken article images | /articles | Yahrzeit and Kaddish article thumbnails show broken image placeholders | MEDIUM |
| GoTrueClient warning | All pages | "Multiple GoTrueClient instances detected" warning on every page | MEDIUM |

### LOW ISSUES (Minor/Visual)

| Issue | Page | Description | Priority |
|-------|------|-------------|----------|
| Image preload warning | /articles | "Resource was preloaded but not used" warning for Unsplash image | LOW |

---

## PAGES TESTED - STATUS

### Working Pages (No Errors)
| Page | URL | Status |
|------|-----|--------|
| Homepage | / | ✅ Working |
| Auth/Login | /auth | ✅ Working |
| About | /about | ✅ Working |
| Contact | /contact | ✅ Working |
| Pricing | /pricing | ✅ Working |
| Communities | /communities | ✅ Working |
| Synagogues | /synagogues | ✅ Working |
| Funeral Homes | /funeral-homes | ✅ Working |
| FAQ | /faq | ✅ Working |
| Search | /search | ✅ Working |
| Shiva Planner | /shiva-planner | ✅ Working |
| Resources | /resources | ✅ Working |
| Articles (list) | /articles | ✅ Working (list view) |
| Notable Memorial (Elie Wiesel) | /notable/elie-wiesel | ✅ Working |

### Broken Pages
| Page | URL | Error |
|------|-----|-------|
| Notable Figures | /notable-figures | 404 |
| Article Detail | /articles/* | 404 (individual article pages) |
| Memorial (old format) | /memorial/* | 404 |

---

## FUNCTIONALITY TESTS

### Light a Candle Button
- **Status:** ✅ WORKING
- **Location:** /notable/elie-wiesel
- **Test:** Clicked button, changed to "Candle Lit" with filled heart icon
- **Database:** Session-based candle tracking working after DB fix

### Search Functionality
- **Status:** ⚠️ NOT TESTED (needs manual testing)

### Auth Flow
- **Status:** ✅ Form displays correctly
- **Note:** Login/signup functionality not tested

### Navigation Menus
- **Status:** ✅ Dropdown menus working

---

## CONSOLE ERRORS SUMMARY

### Persistent Warnings (All Pages)
```
GoTrueClient@sb-pinwpummsftjsqvszchs-auth-token:1 (2.90.1) Multiple GoTrueClient instances detected
```

### Page-Specific Errors
- /notable-figures: 404
- /articles/*: 404 on individual articles
- /articles: Image preload warning

---

## REQUIRED FIXES

### 1. Article Detail Pages (HIGH)
- Article cards on /articles don't link to individual article pages
- Need to investigate routing configuration

### 2. Notable Figures Page (HIGH)
- /notable-figures returns 404
- Route might not be deployed or configured

### 3. Article Images (MEDIUM)
- Some article thumbnails show broken image indicators
- Images may need correct URLs or Supabase storage upload

### 4. GoTrueClient Warning (MEDIUM)
- Multiple Supabase client instances being created
- Fix: Implement singleton pattern in Supabase client initialization

---

## DATABASE STATUS

### Fixed Tables
- virtual_candles: ✅ Columns added
- obituary_settings: ✅ RLS policy fixed

### Tables to Verify
- articles (for article content)
- notable_figures (for notable figures data)

---

**Report Generated:** 2026-01-28 00:56 UTC
