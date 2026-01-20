'use client';

import Link, { LinkProps } from 'next/link';
import { trackLinkClick, AnalyticsEvent } from '@/lib/analytics';
import { forwardRef, AnchorHTMLAttributes } from 'react';

export interface TrackedLinkProps
  extends LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  /**
   * The analytics event name to track when clicked
   */
  eventName: AnalyticsEvent | string;
  /**
   * Additional properties to include in the event
   */
  eventProperties?: Record<string, unknown>;
  children: React.ReactNode;
}

/**
 * A Link component that automatically tracks clicks to analytics
 */
export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  ({ eventName, eventProperties, onClick, children, href, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Track the click
      trackLinkClick(
        eventName,
        typeof children === 'string' ? children : undefined,
        typeof href === 'string' ? href : (href.pathname ?? undefined),
        eventProperties
      );

      // Call the original onClick if provided
      onClick?.(e);
    };

    return (
      <Link ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }
);

TrackedLink.displayName = 'TrackedLink';
