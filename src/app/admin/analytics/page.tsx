'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart3,
  TrendingUp,
  Eye,
  Clock,
  Globe,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  Heart,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface PageViewData {
  page: string;
  views: number;
}

interface DailyData {
  date: string;
  events: number;
}

interface EngagementMetrics {
  guestbookEntries: number;
  guestbookPrevious: number;
  memories: number;
  memoriesPrevious: number;
  candlesLit: number;
  candlesPrevious: number;
}

// Helper function to calculate percentage change
function calculateChange(current: number, previous: number): { value: string; type: 'positive' | 'negative' | 'neutral' } {
  if (previous === 0) {
    return current > 0
      ? { value: `+${current} new`, type: 'positive' }
      : { value: 'No change', type: 'neutral' };
  }
  const change = ((current - previous) / previous) * 100;
  if (change === 0) return { value: 'No change', type: 'neutral' };
  return {
    value: `${change > 0 ? '+' : ''}${change.toFixed(0)}% vs previous`,
    type: change > 0 ? 'positive' : 'negative',
  };
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [pageViews, setPageViews] = useState<PageViewData[]>([]);
  const [dailyEvents, setDailyEvents] = useState<DailyData[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [previousEvents, setPreviousEvents] = useState(0);
  const [uniqueSessions, setUniqueSessions] = useState(0);
  const [previousSessions, setPreviousSessions] = useState(0);
  const [engagement, setEngagement] = useState<EngagementMetrics>({
    guestbookEntries: 0,
    guestbookPrevious: 0,
    memories: 0,
    memoriesPrevious: 0,
    candlesLit: 0,
    candlesPrevious: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      // Calculate date range
      const now = new Date();
      const daysAgo = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - daysAgo);

      // Previous period for comparison
      const previousStartDate = new Date(startDate);
      previousStartDate.setDate(previousStartDate.getDate() - daysAgo);

      // Fetch all data in parallel
      const [
        eventsRes,
        previousEventsRes,
        guestbookRes,
        guestbookPrevRes,
        memoriesRes,
        memoriesPrevRes,
        candlesRes,
        candlesPrevRes,
      ] = await Promise.all([
        // Current period events
        supabase
          .from('analytics_events')
          .select('event_name, page_url, session_id, created_at')
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: true }),
        // Previous period events
        supabase
          .from('analytics_events')
          .select('session_id')
          .gte('created_at', previousStartDate.toISOString())
          .lt('created_at', startDate.toISOString()),
        // Engagement metrics - current period
        supabase
          .from('guestbook_entries')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startDate.toISOString()),
        supabase
          .from('guestbook_entries')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', previousStartDate.toISOString())
          .lt('created_at', startDate.toISOString()),
        supabase
          .from('memories')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startDate.toISOString()),
        supabase
          .from('memories')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', previousStartDate.toISOString())
          .lt('created_at', startDate.toISOString()),
        supabase
          .from('analytics_events')
          .select('*', { count: 'exact', head: true })
          .eq('event_name', 'candle_lit')
          .gte('created_at', startDate.toISOString()),
        supabase
          .from('analytics_events')
          .select('*', { count: 'exact', head: true })
          .eq('event_name', 'candle_lit')
          .gte('created_at', previousStartDate.toISOString())
          .lt('created_at', startDate.toISOString()),
      ]);

      const events = eventsRes.data;
      if (eventsRes.error) throw eventsRes.error;

      // Calculate total events
      setTotalEvents(events?.length || 0);
      setPreviousEvents(previousEventsRes.data?.length || 0);

      // Calculate unique sessions
      const sessions = new Set(events?.map((e) => e.session_id).filter(Boolean));
      setUniqueSessions(sessions.size);
      const previousSessionsSet = new Set(
        previousEventsRes.data?.map((e) => e.session_id).filter(Boolean)
      );
      setPreviousSessions(previousSessionsSet.size);

      // Set engagement metrics
      setEngagement({
        guestbookEntries: guestbookRes.count || 0,
        guestbookPrevious: guestbookPrevRes.count || 0,
        memories: memoriesRes.count || 0,
        memoriesPrevious: memoriesPrevRes.count || 0,
        candlesLit: candlesRes.count || 0,
        candlesPrevious: candlesPrevRes.count || 0,
      });

      // Calculate page views
      const pageViewCounts: Record<string, number> = {};
      events?.forEach((e) => {
        if (e.page_url) {
          const page = e.page_url.split('?')[0]; // Remove query params
          pageViewCounts[page] = (pageViewCounts[page] || 0) + 1;
        }
      });

      const sortedPageViews = Object.entries(pageViewCounts)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      setPageViews(sortedPageViews);

      // Calculate daily events
      const dailyCounts: Record<string, number> = {};
      events?.forEach((e) => {
        if (!e.created_at) return;
        const date = new Date(e.created_at).toLocaleDateString();
        dailyCounts[date] = (dailyCounts[date] || 0) + 1;
      });

      const sortedDaily = Object.entries(dailyCounts)
        .map(([date, events]) => ({ date, events }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setDailyEvents(sortedDaily);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track visitor behavior and site performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchAnalytics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{totalEvents.toLocaleString()}</p>
                {(() => {
                  const change = calculateChange(totalEvents, previousEvents);
                  return (
                    <p className={`text-xs mt-1 flex items-center gap-1 ${
                      change.type === 'positive' ? 'text-green-600' :
                      change.type === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                    }`}>
                      {change.type === 'positive' && <ArrowUpRight className="h-3 w-3" />}
                      {change.type === 'negative' && <ArrowDownRight className="h-3 w-3" />}
                      {change.value}
                    </p>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unique Sessions</p>
                <p className="text-2xl font-bold">{uniqueSessions.toLocaleString()}</p>
                {(() => {
                  const change = calculateChange(uniqueSessions, previousSessions);
                  return (
                    <p className={`text-xs mt-1 flex items-center gap-1 ${
                      change.type === 'positive' ? 'text-green-600' :
                      change.type === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                    }`}>
                      {change.type === 'positive' && <ArrowUpRight className="h-3 w-3" />}
                      {change.type === 'negative' && <ArrowDownRight className="h-3 w-3" />}
                      {change.value}
                    </p>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Events/Session</p>
                <p className="text-2xl font-bold">
                  {uniqueSessions > 0
                    ? (totalEvents / uniqueSessions).toFixed(1)
                    : '0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pages Tracked</p>
                <p className="text-2xl font-bold">{pageViews.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Engagement Metrics
          </CardTitle>
          <CardDescription>
            User interactions with obituaries for the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guestbook Entries */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Guestbook Entries</p>
                <p className="text-2xl font-bold">{engagement.guestbookEntries.toLocaleString()}</p>
                {(() => {
                  const change = calculateChange(engagement.guestbookEntries, engagement.guestbookPrevious);
                  return (
                    <p className={`text-xs mt-1 flex items-center gap-1 ${
                      change.type === 'positive' ? 'text-green-600' :
                      change.type === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                    }`}>
                      {change.type === 'positive' && <ArrowUpRight className="h-3 w-3" />}
                      {change.type === 'negative' && <ArrowDownRight className="h-3 w-3" />}
                      {change.value}
                    </p>
                  );
                })()}
              </div>
            </div>

            {/* Memories Shared */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Memories Shared</p>
                <p className="text-2xl font-bold">{engagement.memories.toLocaleString()}</p>
                {(() => {
                  const change = calculateChange(engagement.memories, engagement.memoriesPrevious);
                  return (
                    <p className={`text-xs mt-1 flex items-center gap-1 ${
                      change.type === 'positive' ? 'text-green-600' :
                      change.type === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                    }`}>
                      {change.type === 'positive' && <ArrowUpRight className="h-3 w-3" />}
                      {change.type === 'negative' && <ArrowDownRight className="h-3 w-3" />}
                      {change.value}
                    </p>
                  );
                })()}
              </div>
            </div>

            {/* Candles Lit */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Flame className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Candles Lit</p>
                <p className="text-2xl font-bold">{engagement.candlesLit.toLocaleString()}</p>
                {(() => {
                  const change = calculateChange(engagement.candlesLit, engagement.candlesPrevious);
                  return (
                    <p className={`text-xs mt-1 flex items-center gap-1 ${
                      change.type === 'positive' ? 'text-green-600' :
                      change.type === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                    }`}>
                      {change.type === 'positive' && <ArrowUpRight className="h-3 w-3" />}
                      {change.type === 'negative' && <ArrowDownRight className="h-3 w-3" />}
                      {change.value}
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Events Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Events Over Time</CardTitle>
            <CardDescription>Daily event count for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            ) : dailyEvents.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyEvents}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="events"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available for this period
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most viewed pages by event count</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            ) : pageViews.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pageViews} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="page"
                    tick={{ fontSize: 11 }}
                    width={150}
                    tickFormatter={(value) =>
                      value.length > 20 ? value.substring(0, 20) + '...' : value
                    }
                  />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available for this period
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* External Tools */}
      <Card>
        <CardHeader>
          <CardTitle>External Analytics Tools</CardTitle>
          <CardDescription>
            View detailed analytics in Microsoft Clarity and PostHog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://clarity.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Microsoft Clarity
              </Button>
            </a>
            <a
              href="https://us.posthog.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                PostHog Dashboard
              </Button>
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            For session recordings, heatmaps, and detailed user journeys, use the
            external tools above. This dashboard shows aggregated event data stored
            in your Supabase database.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
