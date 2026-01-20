'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  MousePointerClick,
  TrendingUp,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  href?: string;
}

function MetricCard({ title, value, change, changeType = 'neutral', icon, href }: MetricCardProps) {
  const content = (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
            {change && (
              <p
                className={`text-sm mt-1 flex items-center gap-1 ${
                  changeType === 'positive'
                    ? 'text-green-600'
                    : changeType === 'negative'
                    ? 'text-red-600'
                    : 'text-muted-foreground'
                }`}
              >
                {changeType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : changeType === 'negative' ? (
                  <ArrowDownRight className="h-4 w-4" />
                ) : null}
                {change}
              </p>
            )}
          </div>
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

interface RecentLead {
  id: string;
  full_name: string | null;
  email: string | null;
  company_name: string | null;
  page_url: string | null;
  created_at: string | null;
}

interface TopEvent {
  event_name: string;
  count: number;
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    totalLeads: 0,
    newLeadsToday: 0,
    topEvents: [] as TopEvent[],
    recentLeads: [] as RecentLead[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Get total events (last 24 hours)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const { count: eventCount } = await supabase
          .from('analytics_events')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', yesterday.toISOString());

        // Get total leads
        const { count: leadCount } = await supabase
          .from('rb2b_leads')
          .select('*', { count: 'exact', head: true });

        // Get new leads today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const { count: newLeadsCount } = await supabase
          .from('rb2b_leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today.toISOString());

        // Get recent leads
        const { data: recentLeads } = await supabase
          .from('rb2b_leads')
          .select('id, full_name, email, company_name, page_url, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        // Get top events
        const { data: events } = await supabase
          .from('analytics_events')
          .select('event_name')
          .gte('created_at', yesterday.toISOString());

        // Count events by name
        const eventCounts: Record<string, number> = {};
        events?.forEach((e) => {
          eventCounts[e.event_name] = (eventCounts[e.event_name] || 0) + 1;
        });

        const topEvents = Object.entries(eventCounts)
          .map(([event_name, count]) => ({ event_name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setMetrics({
          totalEvents: eventCount || 0,
          totalLeads: leadCount || 0,
          newLeadsToday: newLeadsCount || 0,
          topEvents,
          recentLeads: recentLeads || [],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Activity className="h-5 w-5 animate-pulse" />
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Jewish Obits admin portal
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Events (24h)"
          value={metrics.totalEvents.toLocaleString()}
          icon={<Eye className="h-6 w-6 text-primary" />}
          href="/admin/analytics"
        />
        <MetricCard
          title="Button Clicks (24h)"
          value={metrics.topEvents.reduce((acc, e) => acc + e.count, 0).toLocaleString()}
          icon={<MousePointerClick className="h-6 w-6 text-primary" />}
          href="/admin/clicks"
        />
        <MetricCard
          title="Total Leads"
          value={metrics.totalLeads.toLocaleString()}
          icon={<Users className="h-6 w-6 text-primary" />}
          href="/admin/leads"
        />
        <MetricCard
          title="New Leads Today"
          value={metrics.newLeadsToday.toLocaleString()}
          change={metrics.newLeadsToday > 0 ? 'New arrivals' : 'No new leads'}
          changeType={metrics.newLeadsToday > 0 ? 'positive' : 'neutral'}
          icon={<TrendingUp className="h-6 w-6 text-primary" />}
          href="/admin/leads"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointerClick className="h-5 w-5" />
              Top Events (24h)
            </CardTitle>
            <CardDescription>Most triggered events in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            {metrics.topEvents.length > 0 ? (
              <div className="space-y-4">
                {metrics.topEvents.map((event, index) => (
                  <div
                    key={event.event_name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-6">
                        #{index + 1}
                      </span>
                      <span className="font-medium truncate max-w-[200px]">
                        {event.event_name.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <span className="font-bold">{event.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No events recorded yet. Events will appear here once users start interacting with the site.
              </p>
            )}
            <div className="mt-4 pt-4 border-t">
              <Link href="/admin/clicks">
                <Button variant="outline" className="w-full">
                  View All Events
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Leads
            </CardTitle>
            <CardDescription>Latest visitors identified by RB2B</CardDescription>
          </CardHeader>
          <CardContent>
            {metrics.recentLeads.length > 0 ? (
              <div className="space-y-4">
                {metrics.recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-start justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {lead.full_name || 'Unknown'}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {lead.company_name || lead.email || 'No details'}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No leads captured yet. Once RB2B identifies visitors, they will appear here.
              </p>
            )}
            <div className="mt-4 pt-4 border-t">
              <Link href="/admin/leads">
                <Button variant="outline" className="w-full">
                  View All Leads
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href="/admin/leads?status=new">
              <Button variant="outline">Review New Leads</Button>
            </Link>
            <Link href="/admin/content">
              <Button variant="outline">Moderate Content</Button>
            </Link>
            <Link href="/admin/analytics">
              <Button variant="outline">View Full Analytics</Button>
            </Link>
            <a
              href="https://clarity.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">Open Clarity</Button>
            </a>
            <a
              href="https://us.posthog.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">Open PostHog</Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
