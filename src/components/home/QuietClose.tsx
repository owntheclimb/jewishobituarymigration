'use client';

import { Flame } from 'lucide-react';
import { TrackedLink } from '@/components/TrackedLink';
import { ANALYTICS_EVENTS } from '@/lib/analytics';

const QuietClose = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white via-[hsl(var(--background-warm))/30] to-white">
      <div className="max-w-3xl mx-auto text-center">
        {/* Subtle Eternal Flame Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 border border-amber-200/50">
            <Flame className="h-8 w-8 text-amber-500/70" strokeWidth={1.5} />
          </div>
        </div>

        {/* Heading - Cormorant for gravitas */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-cormorant leading-tight text-foreground">
          Every life deserves<br />to be remembered
        </h2>

        {/* Optional subtle subtext */}
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          Create a lasting memorial that honors their story, preserves their memory, and brings comfort to those who loved them.
        </p>

        {/* Single CTA */}
        <TrackedLink
          href="/create-obituary"
          eventName={ANALYTICS_EVENTS.CTA_CREATE_OBITUARY}
          eventProperties={{ location: 'quiet_close' }}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl h-12 rounded-xl px-8 text-lg"
        >
          Create a Memorial
        </TrackedLink>

        {/* Decorative element */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            זכר צדיק לברכה
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
        </div>
      </div>
    </section>
  );
};

export default QuietClose;
