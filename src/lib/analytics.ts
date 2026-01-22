import posthog from 'posthog-js';

/**
 * Analytics event names - use these constants for consistency
 */
export const ANALYTICS_EVENTS = {
  // CTA Clicks
  CTA_CREATE_OBITUARY: 'cta_create_obituary_clicked',
  CTA_WRITING_HELP: 'cta_writing_help_clicked',
  CTA_SEARCH: 'cta_search_submitted',
  CTA_SHOP_FLOWERS: 'cta_shop_flowers_clicked',
  CTA_PLANT_TREE: 'cta_plant_tree_clicked',
  CTA_VIEW_MEMORIAL: 'cta_view_memorial_clicked',
  CTA_GET_STARTED: 'cta_get_started_clicked',
  CTA_CONTACT: 'cta_contact_clicked',
  CTA_BROWSE_COMMUNITIES: 'cta_browse_communities_clicked',
  CTA_VIEW_RESOURCES: 'cta_view_resources_clicked',

  // Navigation
  NAV_SYNAGOGUES: 'nav_synagogues_clicked',
  NAV_SCHOOLS: 'nav_schools_clicked',
  NAV_ORGANIZATIONS: 'nav_organizations_clicked',
  NAV_CITIES: 'nav_cities_clicked',
  NAV_FUNERAL_HOMES: 'nav_funeral_homes_clicked',
  NAV_RESOURCES: 'nav_resources_clicked',

  // Page Views (enriched)
  PAGE_VIEW_OBITUARY: 'obituary_viewed',
  PAGE_VIEW_NOTABLE: 'notable_figure_viewed',
  PAGE_VIEW_ARTICLE: 'article_viewed',
  PAGE_VIEW_SEARCH_RESULTS: 'search_results_viewed',

  // User Actions
  SEARCH_PERFORMED: 'search_performed',
  FILTER_APPLIED: 'filter_applied',
  GUESTBOOK_SIGNED: 'guestbook_signed',
  MEMORY_SHARED: 'memory_shared',
  CANDLE_LIT: 'candle_lit',

  // Conversions
  OBITUARY_STARTED: 'obituary_creation_started',
  OBITUARY_STEP_COMPLETED: 'obituary_step_completed',
  OBITUARY_COMPLETED: 'obituary_creation_completed',
  CHECKOUT_STARTED: 'checkout_started',
  CHECKOUT_COMPLETED: 'checkout_completed',

  // Engagement
  TIME_ON_PAGE: 'time_on_page',
  SCROLL_DEPTH: 'scroll_depth_reached',
} as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: AnalyticsEvent | string,
  properties?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;

  const enrichedProperties = {
    ...properties,
    page_url: window.location.pathname,
    page_title: document.title,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
  };

  // Send to PostHog
  posthog.capture(eventName, enrichedProperties);

  // Also send to our Supabase endpoint for full data ownership
  sendToSupabase(eventName, enrichedProperties);
}

/**
 * Track a button click with standard properties
 */
export function trackButtonClick(
  eventName: AnalyticsEvent | string,
  buttonText?: string,
  additionalProperties?: Record<string, unknown>
) {
  trackEvent(eventName, {
    button_text: buttonText,
    element_type: 'button',
    ...additionalProperties,
  });
}

/**
 * Track a link click with standard properties
 */
export function trackLinkClick(
  eventName: AnalyticsEvent | string,
  linkText?: string,
  linkHref?: string,
  additionalProperties?: Record<string, unknown>
) {
  trackEvent(eventName, {
    link_text: linkText,
    link_href: linkHref,
    element_type: 'link',
    ...additionalProperties,
  });
}

/**
 * Track search events
 */
export function trackSearch(query: string, resultsCount?: number) {
  trackEvent(ANALYTICS_EVENTS.SEARCH_PERFORMED, {
    search_query: query,
    results_count: resultsCount,
  });
}

/**
 * Identify a user (call after login)
 */
export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  posthog.identify(userId, traits);
}

/**
 * Reset user identity (call after logout)
 */
export function resetUser() {
  if (typeof window === 'undefined') return;

  posthog.reset();
}

/**
 * Send event to our own Supabase for data ownership
 */
async function sendToSupabase(
  eventName: string,
  properties: Record<string, unknown>
) {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_properties: properties,
        session_id: getSessionId(),
      }),
    });
  } catch (error) {
    // Silently fail - don't break the user experience for analytics
    console.debug('Analytics send failed:', error);
  }
}

/**
 * Get or create a session ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  const SESSION_KEY = 'jo_session_id';
  let sessionId = sessionStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
}

/**
 * Funnel steps for conversion tracking
 */
export const FUNNEL_STEPS = {
  // Main Conversion Funnel
  VISIT: 'funnel_visit',
  SEARCH: 'funnel_search',
  OBITUARY_VIEW: 'funnel_obituary_view',
  ENGAGEMENT: 'funnel_engagement', // guestbook, memory, candle
  CONTACT: 'funnel_contact',

  // Obituary Creation Funnel
  CREATE_START: 'funnel_create_start',
  CREATE_INFO: 'funnel_create_info',
  CREATE_BIO: 'funnel_create_bio',
  CREATE_PREVIEW: 'funnel_create_preview',
  CREATE_COMPLETE: 'funnel_create_complete',

  // Vendor Funnel
  VENDOR_VIEW: 'funnel_vendor_view',
  VENDOR_CONTACT: 'funnel_vendor_contact',
  VENDOR_CLAIM: 'funnel_vendor_claim',
} as const;

export type FunnelStep = (typeof FUNNEL_STEPS)[keyof typeof FUNNEL_STEPS];

/**
 * Track a funnel step
 */
export function trackFunnelStep(
  step: FunnelStep,
  properties?: Record<string, unknown>
) {
  trackEvent(step, {
    funnel_step: step,
    ...properties,
  });
}

/**
 * Track scroll depth
 * Call this with a cleanup function in useEffect
 */
export function trackScrollDepth(thresholds: number[] = [25, 50, 75, 100]) {
  if (typeof window === 'undefined') return () => {};

  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    thresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackEvent(ANALYTICS_EVENTS.SCROLL_DEPTH, {
          scroll_depth: threshold,
          page_url: window.location.pathname,
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Track time on page
 * Call this with a cleanup function in useEffect
 */
export function trackTimeOnPage(intervals: number[] = [30, 60, 120, 300]) {
  if (typeof window === 'undefined') return () => {};

  const startTime = Date.now();
  const tracked = new Set<number>();
  const timers: NodeJS.Timeout[] = [];

  intervals.forEach((seconds) => {
    const timer = setTimeout(() => {
      if (!tracked.has(seconds)) {
        tracked.add(seconds);
        trackEvent(ANALYTICS_EVENTS.TIME_ON_PAGE, {
          time_seconds: seconds,
          page_url: window.location.pathname,
        });
      }
    }, seconds * 1000);
    timers.push(timer);
  });

  // Track final time on page when leaving
  const handleBeforeUnload = () => {
    const totalTime = Math.round((Date.now() - startTime) / 1000);
    trackEvent(ANALYTICS_EVENTS.TIME_ON_PAGE, {
      time_seconds: totalTime,
      is_final: true,
      page_url: window.location.pathname,
    });
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    timers.forEach(clearTimeout);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}

/**
 * Hook-friendly analytics tracker
 * Use in components to track engagement
 */
export function createEngagementTracker(pageName: string) {
  return {
    trackView: () => trackFunnelStep(FUNNEL_STEPS.VISIT, { page_name: pageName }),
    trackSearch: (query: string, results: number) => {
      trackFunnelStep(FUNNEL_STEPS.SEARCH, { query, results_count: results });
    },
    trackObituaryView: (obituaryId: string, name?: string) => {
      trackFunnelStep(FUNNEL_STEPS.OBITUARY_VIEW, { obituary_id: obituaryId, name });
    },
    trackEngagement: (type: 'guestbook' | 'memory' | 'candle') => {
      trackFunnelStep(FUNNEL_STEPS.ENGAGEMENT, { engagement_type: type });
    },
    trackContact: (method: 'form' | 'email' | 'phone') => {
      trackFunnelStep(FUNNEL_STEPS.CONTACT, { contact_method: method });
    },
  };
}
