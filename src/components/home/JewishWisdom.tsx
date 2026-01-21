'use client';

import Link from 'next/link';
import { BookOpen, Clock, ScrollText, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GuideCard {
  title: string;
  description: string;
  readTime: string;
  badge: string;
  href: string;
  icon: React.ElementType;
}

const guideCards: GuideCard[] = [
  {
    title: 'Understanding Shiva',
    description: 'The seven-day mourning period and how to support grieving families with compassion.',
    readTime: '18 min read',
    badge: 'Biblical Sources',
    href: '/resources/shiva',
    icon: Heart,
  },
  {
    title: 'The Mourner\'s Kaddish',
    description: 'Full Aramaic text with transliteration and the profound meaning behind this ancient prayer.',
    readTime: '12 min read',
    badge: 'Torah Sources',
    href: '/resources/kaddish',
    icon: ScrollText,
  },
  {
    title: 'Jewish Funeral Traditions',
    description: 'Kavod ha-met (honoring the dead) and the sacred practices of Jewish burial customs.',
    readTime: '15 min read',
    badge: 'Halachic Guide',
    href: '/resources/funeral-traditions',
    icon: BookOpen,
  },
  {
    title: 'Chevra Kadisha',
    description: 'The Holy Society\'s sacred work preparing the deceased for burial with dignity.',
    readTime: '10 min read',
    badge: 'Community Guide',
    href: '/resources/chevra-kadisha',
    icon: Heart,
  },
];

const JewishWisdom = () => {
  return (
    <section className="py-24 px-4 bg-[#262523]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Label */}
        <p className="text-sm font-semibold text-amber-400/80 mb-4 tracking-[0.2em] uppercase">
          Rooted in Tradition
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-cormorant text-white leading-tight">
          3,000 years of Jewish wisdom<br className="hidden md:block" /> on remembrance
        </h2>

        {/* Body Paragraph */}
        <p className="text-lg text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
          Jewish tradition teaches that honoring the dead—<em>kavod ha-met</em>—is one of the highest
          mitzvot, for the deceased cannot offer thanks. From the washing of the body by
          the Chevra Kadisha to the comforting words of the Mourner's Kaddish, our practices
          transform grief into sacred connection across generations.
        </p>

        {/* Quote */}
        <blockquote className="relative max-w-2xl mx-auto mb-16 py-6">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400/60 via-amber-400/40 to-transparent rounded-full" />
          <p className="text-xl text-white/80 italic font-cormorant pl-6 text-left">
            "Whoever accompanies the dead to the grave, escorts the deceased and returns—
            it is said of them: 'They walk in righteousness, and speak uprightly.'"
          </p>
          <footer className="text-sm text-amber-400/70 mt-4 pl-6 text-left">
            — Talmud Bavli, Berakhot 18a
          </footer>
        </blockquote>

        {/* Decorative Line */}
        <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mb-12" />

        {/* Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group text-left"
              >
                <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs border-amber-400/30 text-amber-400/80 bg-transparent">
                            {card.badge}
                          </Badge>
                          <span className="text-xs text-white/40 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {card.readTime}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                          {card.description}
                        </p>
                        <span className="inline-flex items-center text-sm text-amber-400/70 mt-3 group-hover:text-amber-400 transition-colors">
                          Read Guide
                          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-10">
          <Link
            href="/resources"
            className="inline-flex items-center text-amber-400/70 hover:text-amber-400 font-medium transition-colors"
          >
            Explore All Jewish Resources
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JewishWisdom;
