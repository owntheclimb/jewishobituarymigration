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

          {/* Right Column - 40% - Memorial Preview Card */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-elegant border-0">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6">
                <div className="flex items-center gap-2 text-white/60 text-xs mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="bg-white rounded-lg p-5 shadow-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-20 rounded bg-gradient-to-br from-slate-200 to-slate-300 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-foreground">Sarah Goldman</h4>
                      <p className="text-sm text-muted-foreground">שרה גאָלדמאַן ז״ל</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        March 15, 1942 - January 8, 2025
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="leading-relaxed">
                      Beloved mother, grandmother, and community leader who touched countless lives through her dedication to education and tzedakah...
                    </p>
                    <div className="flex gap-2 pt-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        Shiva Information
                      </span>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        Light a Candle
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 px-6 py-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Your memorial will be beautifully preserved forever
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePromise;
