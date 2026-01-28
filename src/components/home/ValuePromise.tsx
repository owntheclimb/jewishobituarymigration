'use client';

import Link from 'next/link';
import { Check, FileText, Search, Users } from 'lucide-react';
import { TrackedLink } from '@/components/TrackedLink';
import { ANALYTICS_EVENTS } from '@/lib/analytics';
import { Card } from '@/components/ui/card';

const ValuePromise = () => {
  return (
    <section className="py-24 px-4 bg-[hsl(var(--background-warm))]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3 animate-fade-in">
            <p className="text-sm font-semibold text-primary mb-4 tracking-widest uppercase">
              Our Promise
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-cormorant leading-tight">
              Everything you need to honor their memory
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              From creating meaningful tributes to planning services, we guide you through every step with care and compassion.
            </p>

            <ul className="space-y-5 mb-10">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Create beautiful obituaries with AI assistance</h3>
                  <p className="text-muted-foreground">
                    Our thoughtful tools help you write meaningful tributes that capture a life well-lived.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Find and honor those who have passed</h3>
                  <p className="text-muted-foreground">
                    Search our database to discover and pay tribute to loved ones in the Jewish community.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Plan services with trusted resources</h3>
                  <p className="text-muted-foreground">
                    Connect with funeral homes, cemeteries, and community services that understand Jewish traditions.
                  </p>
                </div>
              </li>
            </ul>

            <TrackedLink
              href="/create-obituary"
              eventName={ANALYTICS_EVENTS.CTA_GET_STARTED}
              eventProperties={{ location: 'value_promise' }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl h-12 rounded-xl px-8 text-lg"
            >
              Get Started
            </TrackedLink>
          </div>

          {/* Right Column - 40% - Elegant Memorial Preview Card */}
          <div className="lg:col-span-2">
            {/* Floating elegant card with subtle glow - NO browser chrome */}
            <div className="relative">
              {/* Subtle glow effect behind the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-2xl rounded-3xl transform scale-105" />

              <Card className="relative overflow-hidden shadow-elegant border border-primary/10 bg-white">
                {/* Elegant header with gradient accent */}
                <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    {/* Photo placeholder with warm gradient */}
                    <div className="w-20 h-24 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                      <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-primary/60 uppercase tracking-wide mb-1">Memorial Preview</p>
                      <h4 className="font-bold text-xl text-foreground font-cormorant">Your Loved One</h4>
                      <p className="text-sm text-primary/70 mb-1">Hebrew name ז״ל</p>
                      <p className="text-sm text-muted-foreground">
                        Date of birth - Date of passing
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      Share their story, their values, and the impact they had on everyone they met. Create a lasting tribute that honors their memory...
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Shiva Information
                      </span>
                      <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        Light a Candle
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-muted/20 px-6 py-4 border-t border-muted/30">
                  <p className="text-sm text-muted-foreground text-center">
                    Your memorial will be beautifully preserved forever
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePromise;
