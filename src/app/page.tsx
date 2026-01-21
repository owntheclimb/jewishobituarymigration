'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Heart, Clock, Users, BookOpen, MapPin, User, ArrowRight, Flame } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { TrackedButton } from "@/components/TrackedButton";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { notableFigures } from "@/data/notableFigures";
import heroImage from "@/assets/hero-image.jpg";
import legacyMemorialUI from "@/assets/legacy-memorial-ui.jpg";
import obituaryPortrait from "@/assets/obituary-portrait-realistic.jpg";
import flowersBouquet from "@/assets/flowers-bouquet.jpg";
import memorialTree from "@/assets/memorial-tree.jpg";
import stepCreate from "@/assets/step-create.png";
import stepPublish from "@/assets/step-publish.png";
import stepRemember from "@/assets/step-remember.png";
import stepSupport from "@/assets/step-support.png";
import OnThisDate from "@/components/OnThisDate";
import NeshamaStories from "@/components/NeshamaStories";
import BrowseStatistics from "@/components/BrowseStatistics";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Warm, professional aesthetic */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        />

        {/* Warm gradient overlay for dignified feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>

        <div className="text-center text-white max-w-4xl px-4 animate-fade-in relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Honor Their{" "}
            <span className="text-primary">Legacy</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Create beautiful, lasting tributes and help others find peace in remembrance
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
              href="/help"
              eventName={ANALYTICS_EVENTS.CTA_WRITING_HELP}
              eventProperties={{ location: 'hero' }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 h-12 rounded-xl px-8 text-lg bg-white/10 text-white border border-white/20 hover:bg-white/20"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Writing Help
            </TrackedLink>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Find an obituary by name..."
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

      {/* Features Section */}
      <section className="py-20 px-4 bg-[hsl(var(--background-warm))]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From creating meaningful tributes to planning services, we're here to support you through every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Create Obituary */}
            <div className="text-center p-6 rounded-lg border border-border shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Obituaries</h3>
              <p className="text-muted-foreground mb-4">
                Easy-to-use tools and templates to create beautiful, personalized obituaries that honor your loved one's memory.
              </p>
              <TrackedLink
                href="/create-obituary"
                eventName={ANALYTICS_EVENTS.CTA_GET_STARTED}
                eventProperties={{ location: 'features', section: 'create_obituaries' }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Get Started
              </TrackedLink>
            </div>

            {/* Find Obituaries */}
            <div className="text-center p-6 rounded-lg border border-border shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Obituaries</h3>
              <p className="text-muted-foreground mb-4">
                Search our comprehensive database by name, location, school, or funeral home to find and honor those who have passed.
              </p>
              <TrackedLink
                href="/search"
                eventName={ANALYTICS_EVENTS.CTA_SEARCH}
                eventProperties={{ location: 'features', section: 'find_obituaries' }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Search Now
              </TrackedLink>
            </div>

            {/* Planning Services */}
            <div className="text-center p-6 rounded-lg border border-border shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Funeral Planning</h3>
              <p className="text-muted-foreground mb-4">
                Find funeral homes, compare services, and access resources for estate planning and grief support.
              </p>
              <TrackedLink
                href="/planning"
                eventName="cta_learn_more_clicked"
                eventProperties={{ location: 'features', section: 'funeral_planning' }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Learn More
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Promise Section */}
      <section className="py-20 px-4" id="promise" aria-labelledby="promise-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-sm font-semibold text-primary mb-4 tracking-widest uppercase">
              THE JEWISH OBITS PROMISE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" id="promise-heading">
              We help you honor a beautiful life
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Left Column - Memorial + Bottom Row */}
            <div className="flex flex-col gap-8">
              {/* Legacy Memorial - Featured Card */}
              <Link
                href="/memorial"
                className="group relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 p-8 rounded-3xl shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] block overflow-hidden"
                aria-labelledby="memorial-title"
                aria-describedby="memorial-desc"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <h3 id="memorial-title" className="text-2xl font-bold text-foreground mb-3">
                      Legacy Memorial
                    </h3>
                    <p id="memorial-desc" className="text-muted-foreground mb-4 leading-relaxed">
                      A lasting online space where family & friends share memories of a loved one.
                    </p>
                    <span className="inline-flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                      Get Started
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="flex-shrink-0 w-48 h-32 relative">
                    <img
                      src={legacyMemorialUI.src}
                      alt=""
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Link>

              {/* Bottom Row - Flowers & Trees */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Flowers & Gifts */}
                <Link
                  href="/flowers"
                  className="group relative bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-950/30 dark:to-rose-900/30 p-6 rounded-3xl shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] block overflow-hidden"
                >
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Flowers & Gifts
                    </h3>
                    <span className="inline-flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all text-sm">
                      Shop Flowers
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="mt-4 w-full h-32 relative">
                    <img
                      src={flowersBouquet.src}
                      alt=""
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Memorial Trees */}
                <Link
                  href="/memorial-trees"
                  className="group relative bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-900/30 p-6 rounded-3xl shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] block overflow-hidden"
                >
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Memorial Trees
                    </h3>
                    <span className="inline-flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all text-sm">
                      Plant a Tree
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="mt-4 w-full h-32 relative">
                    <img
                      src={memorialTree.src}
                      alt=""
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Column - The Obituary (Tall Card) */}
            <Link
              href="/create-obituary"
              className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/30 p-8 rounded-3xl shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] block overflow-hidden min-h-[500px] flex flex-col"
              aria-labelledby="obit-title"
              aria-describedby="obit-desc"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 id="obit-title" className="text-2xl font-bold text-foreground mb-3">
                The Obituary
              </h3>
              <p id="obit-desc" className="text-muted-foreground mb-6 leading-relaxed">
                Your loved one's life story, published & preserved as a precious tribute for generations to come.
              </p>
              <span className="inline-flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all mb-8">
                Create an Obituary
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>

              <div className="flex-1 relative mt-auto">
                <img
                  src={obituaryPortrait.src}
                  alt=""
                  className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center text-xs font-semibold text-foreground shadow-lg">
                  <div>MARCH</div>
                  <div className="text-lg">23</div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-foreground shadow-lg group-hover:translate-x-1 transition-transform">
                  Sign Guestbook
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--primary-rgb),0.03),transparent_50%)]" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <p className="text-sm font-semibold text-primary mb-4 tracking-[0.2em] uppercase font-inter">
              HOW IT WORKS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-cormorant">
              Creating a Lasting Tribute is Simple
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We guide you through every step of honoring your loved one's memory
            </p>
            <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          {/* Steps */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Step 1: Create */}
              <div className="text-center group relative">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ease-out group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:scale-105 overflow-hidden border-2 border-background shadow-elegant">
                    <img src={stepCreate.src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/30 ring-4 ring-background">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 font-cormorant text-2xl">Create</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Use our AI-powered tool to write a meaningful obituary in minutes
                </p>
              </div>

              {/* Step 2: Publish */}
              <div className="text-center group relative">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ease-out group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:scale-105 overflow-hidden border-2 border-background shadow-elegant">
                    <img src={stepPublish.src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/30 ring-4 ring-background">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 font-cormorant text-2xl">Publish</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Share with your community and publish in local newspapers
                </p>
              </div>

              {/* Step 3: Remember */}
              <div className="text-center group relative">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ease-out group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:scale-105 overflow-hidden border-2 border-background shadow-elegant">
                    <img src={stepRemember.src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/30 ring-4 ring-background">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 font-cormorant text-2xl">Remember</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Create a lasting memorial page for family and friends to visit
                </p>
              </div>

              {/* Step 4: Support */}
              <div className="text-center group relative">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ease-out group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:scale-105 overflow-hidden border-2 border-background shadow-elegant">
                    <img src={stepSupport.src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shadow-lg shadow-primary/30 ring-4 ring-background">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 font-cormorant text-2xl">Support</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Send flowers, plant trees, and make memorial donations
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <TrackedLink
              href="/obituary-helper"
              eventName={ANALYTICS_EVENTS.CTA_GET_STARTED}
              eventProperties={{ location: 'how_it_works' }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl h-11 rounded-md px-8 text-base"
            >
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Neshama Stories - Featured Obituaries */}
      <NeshamaStories />

      {/* Browse Statistics */}
      <BrowseStatistics />

      {/* Recent Obituaries Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Tributes</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Honoring the lives and legacies of those we've recently lost
                </p>
                <TrackedLink
                  href="/search"
                  eventName="cta_view_all_obituaries_clicked"
                  eventProperties={{ location: 'recent_tributes' }}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  View All Obituaries →
                </TrackedLink>
              </div>
            </div>
            <div className="lg:col-span-1">
              <OnThisDate />
            </div>
          </div>
        </div>
      </section>

      {/* Notable Figures Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Remembering Notable Figures</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Celebrating the lives of prominent Jewish figures who made lasting impacts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Elie Wiesel */}
            <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                <img
                  src={notableFigures[1].image}
                  alt={notableFigures[1].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <Badge className="mb-3 text-xs">{notableFigures[1].category}</Badge>
                <h3 className="text-xl font-bold mb-1">{notableFigures[1].name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{notableFigures[1].hebrewName}</p>
                <p className="text-sm text-muted-foreground mb-3">{notableFigures[1].dates}</p>
                <p className="text-sm text-foreground mb-4 line-clamp-3">{notableFigures[1].excerpt}</p>

                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {notableFigures[1].candles.toLocaleString()} candles
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {notableFigures[1].memories.toLocaleString()} memories
                  </span>
                </div>

                <TrackedLink
                  href={`/notable/${notableFigures[1].id}`}
                  eventName={ANALYTICS_EVENTS.CTA_VIEW_MEMORIAL}
                  eventProperties={{ location: 'notable_figures', figure_id: notableFigures[1].id, figure_name: notableFigures[1].name }}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 w-full"
                >
                  View Memorial
                </TrackedLink>
              </div>
            </Card>

            {/* Ruth Bader Ginsburg */}
            <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                <img
                  src={notableFigures[0].image}
                  alt={notableFigures[0].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <Badge className="mb-3 text-xs">{notableFigures[0].category}</Badge>
                <h3 className="text-xl font-bold mb-1">{notableFigures[0].name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{notableFigures[0].hebrewName}</p>
                <p className="text-sm text-muted-foreground mb-3">{notableFigures[0].dates}</p>
                <p className="text-sm text-foreground mb-4 line-clamp-3">{notableFigures[0].excerpt}</p>

                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {notableFigures[0].candles.toLocaleString()} candles
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {notableFigures[0].memories.toLocaleString()} memories
                  </span>
                </div>

                <TrackedLink
                  href={`/notable/${notableFigures[0].id}`}
                  eventName={ANALYTICS_EVENTS.CTA_VIEW_MEMORIAL}
                  eventProperties={{ location: 'notable_figures', figure_id: notableFigures[0].id, figure_name: notableFigures[0].name }}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 w-full"
                >
                  View Memorial
                </TrackedLink>
              </div>
            </Card>

            {/* Leonard Nimoy */}
            <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                <img
                  src={notableFigures[2].image}
                  alt={notableFigures[2].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <Badge className="mb-3 text-xs">{notableFigures[2].category}</Badge>
                <h3 className="text-xl font-bold mb-1">{notableFigures[2].name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{notableFigures[2].hebrewName}</p>
                <p className="text-sm text-muted-foreground mb-3">{notableFigures[2].dates}</p>
                <p className="text-sm text-foreground mb-4 line-clamp-3">{notableFigures[2].excerpt}</p>

                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {notableFigures[2].candles.toLocaleString()} candles
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {notableFigures[2].memories.toLocaleString()} memories
                  </span>
                </div>

                <TrackedLink
                  href={`/notable/${notableFigures[2].id}`}
                  eventName={ANALYTICS_EVENTS.CTA_VIEW_MEMORIAL}
                  eventProperties={{ location: 'notable_figures', figure_id: notableFigures[2].id, figure_name: notableFigures[2].name }}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 w-full"
                >
                  View Memorial
                </TrackedLink>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <TrackedLink
              href="/notable"
              eventName="cta_explore_notable_figures_clicked"
              eventProperties={{ location: 'notable_figures' }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-muted/50 text-foreground shadow-sm hover:bg-muted h-11 px-8"
            >
              Explore All Notable Figures →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Community Connections Section */}
      <section className="py-16 bg-[hsl(var(--background-warm))]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Community</h2>
            <p className="text-lg text-muted-foreground">
              Connect with obituaries from synagogues, schools, and organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <TrackedLink href="/synagogues" eventName={ANALYTICS_EVENTS.NAV_SYNAGOGUES} eventProperties={{ location: 'community_section' }} className="group">
              <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <Users className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">Synagogues</h3>
                <p className="text-xs text-muted-foreground">50+ communities</p>
              </Card>
            </TrackedLink>

            <TrackedLink href="/schools" eventName={ANALYTICS_EVENTS.NAV_SCHOOLS} eventProperties={{ location: 'community_section' }} className="group">
              <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">Schools</h3>
                <p className="text-xs text-muted-foreground">Alumni memorials</p>
              </Card>
            </TrackedLink>

            <TrackedLink href="/organizations" eventName={ANALYTICS_EVENTS.NAV_ORGANIZATIONS} eventProperties={{ location: 'community_section' }} className="group">
              <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">Organizations</h3>
                <p className="text-xs text-muted-foreground">Member tributes</p>
              </Card>
            </TrackedLink>

            <TrackedLink href="/communities" eventName={ANALYTICS_EVENTS.NAV_CITIES} eventProperties={{ location: 'community_section' }} className="group">
              <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-1">Cities</h3>
                <p className="text-xs text-muted-foreground">Browse by location</p>
              </Card>
            </TrackedLink>
          </div>

          <div className="text-center">
            <TrackedLink
              href="/communities"
              eventName={ANALYTICS_EVENTS.CTA_BROWSE_COMMUNITIES}
              eventProperties={{ location: 'community_section' }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              Browse All Communities
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* Resources & Support Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">We're Here to Help</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive resources for planning, writing, and healing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrackedLink href="/help" eventName={ANALYTICS_EVENTS.CTA_WRITING_HELP} eventProperties={{ location: 'resources_section' }} className="group">
              <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <FileText className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Writing Guides</h3>
                <p className="text-sm text-muted-foreground">
                  Expert tips for crafting meaningful obituaries
                </p>
              </Card>
            </TrackedLink>

            <TrackedLink href="/funeral-homes" eventName={ANALYTICS_EVENTS.NAV_FUNERAL_HOMES} eventProperties={{ location: 'resources_section' }} className="group">
              <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <MapPin className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Funeral Homes</h3>
                <p className="text-sm text-muted-foreground">
                  Find trusted Jewish funeral service providers
                </p>
              </Card>
            </TrackedLink>

            <TrackedLink href="/grief-support" eventName="nav_grief_support_clicked" eventProperties={{ location: 'resources_section' }} className="group">
              <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <Heart className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Grief Support</h3>
                <p className="text-sm text-muted-foreground">
                  Resources and community for healing
                </p>
              </Card>
            </TrackedLink>

            <TrackedLink href="/resources" eventName={ANALYTICS_EVENTS.NAV_RESOURCES} eventProperties={{ location: 'resources_section' }} className="group">
              <Card className="p-6 hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <BookOpen className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">Jewish Customs</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about mourning traditions
                </p>
              </Card>
            </TrackedLink>
          </div>

          <div className="mt-12 text-center">
            <Card className="p-8 bg-background inline-block">
              <h3 className="text-xl font-bold mb-2">Featured Article</h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                "Understanding the Practice of Sitting Shiva: A Guide for Families and Friends"
              </p>
              <TrackedLink
                href="/resources"
                eventName={ANALYTICS_EVENTS.CTA_VIEW_RESOURCES}
                eventProperties={{ location: 'featured_article', article: 'shiva_guide' }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Read Article
              </TrackedLink>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-[hsl(var(--background-soft))]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need Help Getting Started?</h2>
            <p className="text-lg text-muted-foreground">
              We're here to guide you through creating the perfect tribute
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-subtle hover:shadow-elegant transition-all duration-300 group">
              <BookOpen className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Writing Tips</h3>
              <p className="text-sm text-muted-foreground mb-3">Learn how to write meaningful obituaries</p>
              <TrackedLink href="/help" eventName={ANALYTICS_EVENTS.CTA_WRITING_HELP} eventProperties={{ location: 'quick_links' }} className="text-primary text-sm font-medium hover:underline">
                Read Guide →
              </TrackedLink>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-subtle hover:shadow-elegant transition-all duration-300 group">
              <FileText className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Templates</h3>
              <p className="text-sm text-muted-foreground mb-3">Professional templates to get you started</p>
              <TrackedLink href="/obituary-helper" eventName="cta_view_templates_clicked" eventProperties={{ location: 'quick_links' }} className="text-primary text-sm font-medium hover:underline">
                View Templates →
              </TrackedLink>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-subtle hover:shadow-elegant transition-all duration-300 group">
              <Users className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Examples</h3>
              <p className="text-sm text-muted-foreground mb-3">See beautiful obituary examples</p>
              <TrackedLink href="/search" eventName="cta_browse_examples_clicked" eventProperties={{ location: 'quick_links' }} className="text-primary text-sm font-medium hover:underline">
                Browse Examples →
              </TrackedLink>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-subtle hover:shadow-elegant transition-all duration-300 group">
              <Clock className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-sm text-muted-foreground mb-3">Get help when you need it most</p>
              <TrackedLink href="/contact" eventName={ANALYTICS_EVENTS.CTA_CONTACT} eventProperties={{ location: 'quick_links' }} className="text-primary text-sm font-medium hover:underline">
                Contact Us →
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
