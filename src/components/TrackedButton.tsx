'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { trackButtonClick, AnalyticsEvent } from '@/lib/analytics';
import { forwardRef } from 'react';

export interface TrackedButtonProps extends ButtonProps {
  /**
   * The analytics event name to track when clicked
   */
  eventName: AnalyticsEvent | string;
  /**
   * Additional properties to include in the event
   */
  eventProperties?: Record<string, unknown>;
}

/**
 * A Button component that automatically tracks clicks to analytics
 */
export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({ eventName, eventProperties, onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Track the click
      trackButtonClick(
        eventName,
        typeof children === 'string' ? children : undefined,
        eventProperties
      );

      // Call the original onClick if provided
      onClick?.(e);
    };

    return (
      <Button ref={ref} onClick={handleClick} {...props}>
        {children}
      </Button>
    );
  }
);

TrackedButton.displayName = 'TrackedButton';
