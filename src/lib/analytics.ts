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
