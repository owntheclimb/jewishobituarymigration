'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, BookOpen, Heart, Users, Star, FileText, GraduationCap, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HomepageStats {
  totalMemorials: number;
  funeralHomeSources: number;
  notableFigures: number;
  synagogues: number;
  schools: number;
  organizations: number;
}

interface ResourceLink {
  label: string;
  href: string;
}

interface ResourceColumn {
  title: string;
  icon: React.ElementType;
  links: ResourceLink[];
}

const resourceColumns: ResourceColumn[] = [
  {
    title: 'Planning',
    icon: MapPin,
    links: [
      { label: 'Funeral Homes', href: '/funeral-homes' },
      { label: 'Cemeteries', href: '/cemetery-directory' },
      { label: 'Shiva Planner', href: '/resources/shiva' },
    ],
  },
  {
    title: 'Learning',
    icon: BookOpen,
    links: [
      { label: 'Writing Help', href: '/help' },
      { label: 'Jewish Customs', href: '/resources' },
      { label: 'Grief Support', href: '/grief-support' },
    ],
  },
  {
    title: 'Community',
    icon: Users,
    links: [
      { label: 'Synagogues', href: '/synagogues' },
      { label: 'Schools', href: '/schools' },
      { label: 'Organizations', href: '/organizations' },
    ],
  },
];

const CommunityResources = () => {
  const [stats, setStats] = useState<HomepageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats/homepage', { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch homepage stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Format number for display - only show if we have real data
  const formatStat = (value: number | undefined, showPlus = false): string => {
    if (value === undefined || value === 0) return '—';
    if (showPlus && value > 0) return `${value}+`;
    return value.toString();
  };

  return (
    <section className="py-24 px-4 bg-[hsl(var(--background-warm))]">
      <div className="max-w-6xl mx-auto">
        {/* Statistics Area */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-4 tracking-widest uppercase">
            Our Growing Community
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-cormorant">
            Honoring Jewish lives together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connecting families, synagogues, and communities across the country
          </p>
        </div>

        {/* Stats Grid - Only show real numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <Card className="text-center shadow-subtle hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">
                {loading ? '...' : formatStat(stats?.totalMemorials, true)}
              </div>
              <div className="font-medium text-foreground">Memorials</div>
              <div className="text-xs text-muted-foreground mt-1">Lives Honored</div>
            </CardContent>
          </Card>

          <Card className="text-center shadow-subtle hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">
                {loading ? '...' : formatStat(stats?.funeralHomeSources, true)}
              </div>
              <div className="font-medium text-foreground">Funeral Homes</div>
              <div className="text-xs text-muted-foreground mt-1">Partner Sources</div>
            </CardContent>
          </Card>

          <Card className="text-center shadow-subtle hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">
                {loading ? '...' : formatStat(stats?.notableFigures)}
              </div>
              <div className="font-medium text-foreground">Notable Figures</div>
              <div className="text-xs text-muted-foreground mt-1">Leaders Honored</div>
            </CardContent>
          </Card>

          <Card className="text-center shadow-subtle hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">
                Growing
              </div>
              <div className="font-medium text-foreground">Communities</div>
              <div className="text-xs text-muted-foreground mt-1">Across America</div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Section */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold font-cormorant mb-2">
            Here When You Need Us
          </h3>
          <p className="text-muted-foreground">
            Resources and support for every step of the journey
          </p>
        </div>

        {/* Resource Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resourceColumns.map((column) => {
            const Icon = column.icon;
            return (
              <div key={column.title} className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg">{column.title}</h4>
                </div>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunityResources;
