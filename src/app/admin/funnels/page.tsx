'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Filter,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Users,
  Search,
  Eye,
  Heart,
  MessageSquare,
  Flame,
  Phone,
  FileText,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FunnelStep {
  name: string;
  event: string;
  count: number;
  icon: React.ElementType;
  color: string;
}

interface FunnelData {
  mainFunnel: FunnelStep[];
  createFunnel: FunnelStep[];
  vendorFunnel: FunnelStep[];
}

// Define the funnel steps with their event names
const MAIN_FUNNEL_CONFIG = [
  { name: 'Visit', event: 'funnel_visit', icon: Users, color: 'bg-blue-500' },
  { name: 'Search', event: 'funnel_search', icon: Search, color: 'bg-indigo-500' },
  { name: 'View Obituary', event: 'funnel_obituary_view', icon: Eye, color: 'bg-purple-500' },
  { name: 'Engagement', event: 'funnel_engagement', icon: Heart, color: 'bg-pink-500' },
  { name: 'Contact', event: 'funnel_contact', icon: Phone, color: 'bg-green-500' },
];

const CREATE_FUNNEL_CONFIG = [
  { name: 'Start', event: 'funnel_create_start', icon: FileText, color: 'bg-blue-500' },
  { name: 'Basic Info', event: 'funnel_create_info', icon: Users, color: 'bg-indigo-500' },
  { name: 'Biography', event: 'funnel_create_bio', icon: MessageSquare, color: 'bg-purple-500' },
  { name: 'Preview', event: 'funnel_create_preview', icon: Eye, color: 'bg-pink-500' },
  { name: 'Complete', event: 'funnel_create_complete', icon: Flame, color: 'bg-green-500' },
];

const VENDOR_FUNNEL_CONFIG = [
  { name: 'View Listing', event: 'funnel_vendor_view', icon: Eye, color: 'bg-blue-500' },
  { name: 'Contact', event: 'funnel_vendor_contact', icon: Phone, color: 'bg-purple-500' },
  { name: 'Claim', event: 'funnel_vendor_claim', icon: FileText, color: 'bg-green-500' },
];

export default function FunnelsPage() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [funnelData, setFunnelData] = useState<FunnelData>({
    mainFunnel: [],
    createFunnel: [],
    vendorFunnel: [],
  });
  const [engagementBreakdown, setEngagementBreakdown] = useState({
    guestbook: 0,
    memory: 0,
    candle: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFunnelData();
  }, [timeRange]);

  async function fetchFunnelData() {
    setLoading(true);
    try {
      // Calculate date range
      const now = new Date();
      let startDate = new Date();

      switch (timeRange) {
        case '24h':
          startDate.setHours(startDate.getHours() - 24);
          break;
        case '7d':
          startDate.setDate(startDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(startDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(startDate.getDate() - 90);
          break;
      }

      // Fetch main funnel counts
      const mainFunnel = await Promise.all(
        MAIN_FUNNEL_CONFIG.map(async (step) => {
          const { count } = await supabase
            .from('analytics_events' as any)
            .select('*', { count: 'exact', head: true })
            .eq('event_name', step.event)
            .gte('created_at', startDate.toISOString());

          return {
            ...step,
            count: count || 0,
          };
        })
      );

      // Fetch create funnel counts
      const createFunnel = await Promise.all(
        CREATE_FUNNEL_CONFIG.map(async (step) => {
          const { count } = await supabase
            .from('analytics_events' as any)
            .select('*', { count: 'exact', head: true })
            .eq('event_name', step.event)
            .gte('created_at', startDate.toISOString());

          return {
            ...step,
            count: count || 0,
          };
        })
      );

      // Fetch vendor funnel counts
      const vendorFunnel = await Promise.all(
        VENDOR_FUNNEL_CONFIG.map(async (step) => {
          const { count } = await supabase
            .from('analytics_events' as any)
            .select('*', { count: 'exact', head: true })
            .eq('event_name', step.event)
            .gte('created_at', startDate.toISOString());

          return {
            ...step,
            count: count || 0,
          };
        })
      );

      // Fetch engagement breakdown
      const { data: engagementData } = await supabase
        .from('analytics_events' as any)
        .select('event_properties')
        .eq('event_name', 'funnel_engagement')
        .gte('created_at', startDate.toISOString());

      const breakdown = { guestbook: 0, memory: 0, candle: 0 };
      if (engagementData) {
        const typedData = engagementData as unknown as { event_properties: { engagement_type?: string } }[];
        typedData.forEach((e) => {
          const type = e.event_properties?.engagement_type as keyof typeof breakdown;
          if (type && breakdown[type] !== undefined) {
            breakdown[type]++;
          }
        });
      }

      setFunnelData({ mainFunnel, createFunnel, vendorFunnel });
      setEngagementBreakdown(breakdown);
    } catch (error) {
      console.error('Error fetching funnel data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load funnel data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  const calculateConversionRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Math.round((current / previous) * 100);
  };

  const renderFunnel = (
    title: string,
    description: string,
    steps: FunnelStep[]
  ) => {
    const hasData = steps.some((s) => s.count > 0);

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!hasData ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No funnel data for this period.</p>
              <p className="text-sm mt-1">
                Data will appear as users interact with the site.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const prevCount = index > 0 ? steps[index - 1].count : step.count;
                const conversionRate = calculateConversionRate(step.count, prevCount);
                const dropoff = prevCount > 0 ? prevCount - step.count : 0;

                return (
                  <div key={step.event}>
                    {/* Step Row */}
                    <div className="flex items-center gap-4">
                      {/* Step indicator */}
                      <div
                        className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white flex-shrink-0`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Step info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{step.name}</span>
                          <span className="text-2xl font-bold">{step.count.toLocaleString()}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${step.color} transition-all`}
                            style={{
                              width: `${steps[0].count > 0 ? (step.count / steps[0].count) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Conversion arrow */}
                    {index < steps.length - 1 && (
                      <div className="flex items-center gap-4 py-2 pl-5">
                        <div className="w-0.5 h-6 bg-muted-foreground/20 ml-4" />
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="h-4 w-4" />
                          {index === 0 ? (
                            <span>{steps[index + 1].count} continued</span>
                          ) : (
                            <>
                              <span>{conversionRate}% conversion</span>
                              {dropoff > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  -{dropoff} dropoff
                                </Badge>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Overall conversion */}
              {steps.length > 1 && steps[0].count > 0 && (
                <div className="pt-4 border-t mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Overall Conversion</span>
                    <span className="font-bold text-lg">
                      {calculateConversionRate(steps[steps.length - 1].count, steps[0].count)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Filter className="h-8 w-8" />
            Funnel Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track user journey and conversion paths
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchFunnelData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Engagement Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{engagementBreakdown.guestbook}</p>
                <p className="text-sm text-muted-foreground">Guestbook Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{engagementBreakdown.memory}</p>
                <p className="text-sm text-muted-foreground">Memories Shared</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Flame className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{engagementBreakdown.candle}</p>
                <p className="text-sm text-muted-foreground">Candles Lit</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Conversion Funnel */}
        {renderFunnel(
          'Main Conversion Funnel',
          'User journey from visit to contact',
          funnelData.mainFunnel
        )}

        {/* Obituary Creation Funnel */}
        {renderFunnel(
          'Obituary Creation Funnel',
          'Steps in the obituary creation process',
          funnelData.createFunnel
        )}

        {/* Vendor Funnel */}
        <div className="lg:col-span-2">
          {renderFunnel(
            'Vendor Engagement Funnel',
            'User interaction with vendor listings',
            funnelData.vendorFunnel
          )}
        </div>
      </div>

      {/* Tips */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Understanding Your Funnels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">Main Funnel</h4>
              <p className="text-muted-foreground">
                Tracks the primary user journey from landing on the site to taking a meaningful action like contacting a vendor or engaging with an obituary.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Creation Funnel</h4>
              <p className="text-muted-foreground">
                Monitors the obituary creation process. Look for drop-off points to identify where users abandon the process.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Vendor Funnel</h4>
              <p className="text-muted-foreground">
                Tracks how users interact with vendor listings. Higher claim rates indicate strong vendor interest.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
