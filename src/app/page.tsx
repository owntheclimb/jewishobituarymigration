'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Heart, BookOpen } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { TrackedButton } from "@/components/TrackedButton";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
// Stable hero image URL from /public folder

// New consolidated homepage components
import ValuePromise from "@/components/home/ValuePromise";
import JewishWisdom from "@/components/home/JewishWisdom";
import NeshamaStories from "@/components/NeshamaStories";
import CommunityResources from "@/components/home/CommunityResources";
import QuietClose from "@/components/home/QuietClose";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ====== SECTION 1: HERO ====== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/images/hero-cemetery.jpg)` }}
        />

        {/* Warm gradient overlay for dignified feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        <div className="text-center text-white max-w-4xl px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-cormorant">
            Honor Their{" "}
            <span className="text-primary">Legacy</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Create a lasting memorial in the Jewish tradition
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <TrackedLink
              href="/create-obituary"
              eventName={ANALYTICS_EVENTS.CTA_CREATE_OBITUARY}
              eventProperties={{ location: 'hero' }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl h-12 rounded-xl px-8 text-lg"
            >
              <Heart className="mr-2 h-5 w-5" />
              Create an Obituary
            </TrackedLink>
            <TrackedLink
              href="/search"
              eventName={ANALYTICS_EVENTS.CTA_SEARCH}
              eventProperties={{ location: 'hero' }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 h-12 rounded-xl px-8 text-lg bg-white/10 text-white border border-white/20 hover:bg-white/20"
            >
              <Search className="mr-2 h-5 w-5" />
              Find an Obituary
            </TrackedLink>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    trackEvent(ANALYTICS_EVENTS.CTA_SEARCH, { query: searchQuery, location: 'hero' });
                    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                  }
                }}
              />
              <TrackedButton
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10"
                eventName={ANALYTICS_EVENTS.CTA_SEARCH}
                eventProperties={{ query: searchQuery, location: 'hero' }}
                onClick={() => {
                  if (searchQuery.trim()) {
                    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                  }
                }}
              >
                Search
              </TrackedButton>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 2: VALUE PROMISE ====== */}
      {/* Consolidated from "Everything You Need" + "We help you honor" + "How It Works" */}
      <ValuePromise />

      {/* ====== SECTION 3: JEWISH WISDOM (E-E-A-T) ====== */}
      {/* NEW section to establish authority and surface scholarly content */}
      <JewishWisdom />

      {/* ====== SECTION 4: LIVES REMEMBERED ====== */}
      {/* Notable Jewish figures - ALL 6 people, NO duplicates */}
      <NeshamaStories />

      {/* ====== SECTION 5: COMMUNITY & RESOURCES ====== */}
      {/* Consolidated from "Browse Our Growing Community" + "Find Your Community" + "We're Here to Help" + "Need Help Getting Started" */}
      <CommunityResources />

      {/* ====== SECTION 6: QUIET CLOSE ====== */}
      {/* Dignified pre-footer with final CTA */}
      <QuietClose />

      {/* ====== SECTION 7: FOOTER ====== */}
      <Footer />
    </div>
  );
};

export default Index;
