'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackScrollDepth,
  trackTimeOnPage,
  trackFunnelStep,
  FUNNEL_STEPS,
  trackEvent,
  ANALYTICS_EVENTS,
} from '@/lib/analytics';

/**
 * Hook to track page engagement (scroll depth + time on page)
 * Use on key pages like obituaries, articles, etc.
 */
export function usePageEngagement(options?: {
  trackScroll?: boolean;
  trackTime?: boolean;
  scrollThresholds?: number[];
  timeIntervals?: number[];
}) {
  const {
    trackScroll = true,
    trackTime = true,
    scrollThresholds = [25, 50, 75, 100],
    timeIntervals = [30, 60, 120, 300],
  } = options || {};

  const pathname = usePathname();

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    if (trackScroll) {
      cleanups.push(trackScrollDepth(scrollThresholds));
    }

    if (trackTime) {
      cleanups.push(trackTimeOnPage(timeIntervals));
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname, trackScroll, trackTime, scrollThresholds, timeIntervals]);
}

/**
 * Hook for obituary funnel tracking
 */
export function useObituaryFunnel() {
  const hasTrackedView = useRef(false);

  const trackView = (obituaryId: string, name?: string) => {
    if (!hasTrackedView.current) {
      hasTrackedView.current = true;
      trackFunnelStep(FUNNEL_STEPS.OBITUARY_VIEW, {
        obituary_id: obituaryId,
        name,
      });
    }
  };

  const trackGuestbookSign = (obituaryId: string) => {
    trackFunnelStep(FUNNEL_STEPS.ENGAGEMENT, {
      engagement_type: 'guestbook',
      obituary_id: obituaryId,
    });
    trackEvent(ANALYTICS_EVENTS.GUESTBOOK_SIGNED, { obituary_id: obituaryId });
  };

  const trackMemoryShare = (obituaryId: string) => {
    trackFunnelStep(FUNNEL_STEPS.ENGAGEMENT, {
      engagement_type: 'memory',
      obituary_id: obituaryId,
    });
    trackEvent(ANALYTICS_EVENTS.MEMORY_SHARED, { obituary_id: obituaryId });
  };

  const trackCandleLit = (obituaryId: string) => {
    trackFunnelStep(FUNNEL_STEPS.ENGAGEMENT, {
      engagement_type: 'candle',
      obituary_id: obituaryId,
    });
    trackEvent(ANALYTICS_EVENTS.CANDLE_LIT, { obituary_id: obituaryId });
  };

  return {
    trackView,
    trackGuestbookSign,
    trackMemoryShare,
    trackCandleLit,
  };
}

/**
 * Hook for search funnel tracking
 */
export function useSearchFunnel() {
  const trackSearchPerformed = (query: string, resultsCount: number) => {
    trackFunnelStep(FUNNEL_STEPS.SEARCH, {
      query,
      results_count: resultsCount,
    });
    trackEvent(ANALYTICS_EVENTS.SEARCH_PERFORMED, {
      search_query: query,
      results_count: resultsCount,
    });
  };

  const trackFilterApplied = (filterType: string, filterValue: string) => {
    trackEvent(ANALYTICS_EVENTS.FILTER_APPLIED, {
      filter_type: filterType,
      filter_value: filterValue,
    });
  };

  const trackResultClicked = (obituaryId: string, position: number) => {
    trackEvent('search_result_clicked', {
      obituary_id: obituaryId,
      result_position: position,
    });
  };

  return {
    trackSearchPerformed,
    trackFilterApplied,
    trackResultClicked,
  };
}

/**
 * Hook for obituary creation funnel tracking
 */
export function useCreateObituaryFunnel() {
  const trackStart = () => {
    trackFunnelStep(FUNNEL_STEPS.CREATE_START);
    trackEvent(ANALYTICS_EVENTS.OBITUARY_STARTED);
  };

  const trackStep = (step: 'info' | 'bio' | 'preview' | 'complete') => {
    const stepMap = {
      info: FUNNEL_STEPS.CREATE_INFO,
      bio: FUNNEL_STEPS.CREATE_BIO,
      preview: FUNNEL_STEPS.CREATE_PREVIEW,
      complete: FUNNEL_STEPS.CREATE_COMPLETE,
    };

    trackFunnelStep(stepMap[step]);
    trackEvent(ANALYTICS_EVENTS.OBITUARY_STEP_COMPLETED, { step });

    if (step === 'complete') {
      trackEvent(ANALYTICS_EVENTS.OBITUARY_COMPLETED);
    }
  };

  return {
    trackStart,
    trackStep,
  };
}

/**
 * Hook for vendor funnel tracking
 */
export function useVendorFunnel() {
  const trackVendorView = (vendorId: string, vendorName: string, vendorType: string) => {
    trackFunnelStep(FUNNEL_STEPS.VENDOR_VIEW, {
      vendor_id: vendorId,
      vendor_name: vendorName,
      vendor_type: vendorType,
    });
  };

  const trackVendorContact = (vendorId: string, contactType: 'phone' | 'email' | 'website' | 'form') => {
    trackFunnelStep(FUNNEL_STEPS.VENDOR_CONTACT, {
      vendor_id: vendorId,
      contact_type: contactType,
    });
  };

  const trackVendorClaim = (vendorId?: string) => {
    trackFunnelStep(FUNNEL_STEPS.VENDOR_CLAIM, {
      vendor_id: vendorId,
    });
  };

  return {
    trackVendorView,
    trackVendorContact,
    trackVendorClaim,
  };
}
