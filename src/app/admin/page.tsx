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
  FileText,
  UserPlus,
  Globe,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

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

interface HeroMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

function HeroMetricCard({
  title,
  value,
  subtitle,
  change,
  changeType = 'neutral',
  icon,
  iconBgColor,
  iconColor,
}: HeroMetricCardProps) {
  return (
    <Card className="border-2 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-4xl font-bold mt-2">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
            {change && (
              <p
                className={`text-sm mt-2 flex items-center gap-1 font-medium ${
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
          <div className={`h-14 w-14 ${iconBgColor} rounded-xl flex items-center justify-center`}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface GrowthDataPoint {
  month: string;
  obituaries: number;
  users: number;
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

interface BusinessMetrics {
  totalObituaries: number;
  obituariesThisMonth: number;
  obituariesLastMonth: number;
  totalUsers: number;
  usersThisMonth: number;
  usersLastMonth: number;
  visitorsThisMonth: number;
  visitorsLastMonth: number;
  conversionRate: number;
}

// Helper function to calculate percentage change
function calculatePercentChange(current: number, previous: number): { value: string; type: 'positive' | 'negative' | 'neutral' } {
  if (previous === 0) {
    return current > 0
      ? { value: 'New this month', type: 'positive' }
      : { value: 'No change', type: 'neutral' };
  }
  const change = ((current - previous) / previous) * 100;
  if (change === 0) return { value: 'No change', type: 'neutral' };
  return {
    value: `${change > 0 ? '+' : ''}${change.toFixed(0)}% vs last month`,
    type: change > 0 ? 'positive' : 'negative',
  };
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalEvents: 0,
    totalLeads: 0,
    newLeadsToday: 0,
    topEvents: [] as TopEvent[],
    recentLeads: [] as RecentLead[],
  });
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics>({
    totalObituaries: 0,
    obituariesThisMonth: 0,
    obituariesLastMonth: 0,
    totalUsers: 0,
    usersThisMonth: 0,
    usersLastMonth: 0,
    visitorsThisMonth: 0,
    visitorsLastMonth: 0,
    conversionRate: 0,
  });
  const [growthData, setGrowthData] = useState<GrowthDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Date helpers
        const now = new Date();
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Fetch all data in parallel
        const [
          // Business metrics
          totalObituariesRes,
          obituariesThisMonthRes,
          obituariesLastMonthRes,
          totalUsersRes,
          usersThisMonthRes,
          usersLastMonthRes,
          visitorsThisMonthRes,
          visitorsLastMonthRes,
          // Growth data (last 6 months)
          obituariesGrowthRes,
          usersGrowthRes,
          // Existing metrics
          eventCountRes,
          leadCountRes,
          newLeadsCountRes,
          recentLeadsRes,
          eventsRes,
        ] = await Promise.all([
          // Obituaries
          supabase.from('obituaries').select('*', { count: 'exact', head: true }),
          supabase.from('obituaries').select('*', { count: 'exact', head: true })
            .gte('created_at', firstOfMonth.toISOString()),
          supabase.from('obituaries').select('*', { count: 'exact', head: true })
            .gte('created_at', firstOfLastMonth.toISOString())
            .lt('created_at', firstOfMonth.toISOString()),
          // Users
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true })
            .gte('created_at', firstOfMonth.toISOString()),
          supabase.from('profiles').select('*', { count: 'exact', head: true })
            .gte('created_at', firstOfLastMonth.toISOString())
            .lt('created_at', firstOfMonth.toISOString()),
          // Visitors (unique sessions)
          supabase.from('analytics_events').select('session_id')
            .gte('created_at', firstOfMonth.toISOString()),
          supabase.from('analytics_events').select('session_id')
            .gte('created_at', firstOfLastMonth.toISOString())
            .lt('created_at', firstOfMonth.toISOString()),
          // Growth data
          supabase.from('obituaries').select('created_at')
            .gte('created_at', sixMonthsAgo.toISOString()),
          supabase.from('profiles').select('created_at')
            .gte('created_at', sixMonthsAgo.toISOString()),
          // Existing metrics
          supabase.from('analytics_events').select('*', { count: 'exact', head: true })
            .gte('created_at', yesterday.toISOString()),
          supabase.from('rb2b_leads').select('*', { count: 'exact', head: true }),
          supabase.from('rb2b_leads').select('*', { count: 'exact', head: true })
            .gte('created_at', today.toISOString()),
          supabase.from('rb2b_leads')
            .select('id, full_name, email, company_name, page_url, created_at')
            .order('created_at', { ascending: false })
            .limit(5),
          supabase.from('analytics_events').select('event_name')
            .gte('created_at', yesterday.toISOString()),
        ]);

        // Calculate unique visitors
        const visitorsThisMonth = new Set(
          visitorsThisMonthRes.data?.map((e) => e.session_id).filter(Boolean)
        ).size;
        const visitorsLastMonth = new Set(
          visitorsLastMonthRes.data?.map((e) => e.session_id).filter(Boolean)
        ).size;

        // Calculate conversion rate (users who created obituaries)
        const totalUsers = totalUsersRes.count || 0;
        const totalObituaries = totalObituariesRes.count || 0;
        const conversionRate = totalUsers > 0 ? (totalObituaries / totalUsers) * 100 : 0;

        // Process growth data by month
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const growthByMonth: Record<string, { obituaries: number; users: number }> = {};

        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
          growthByMonth[key] = { obituaries: 0, users: 0 };
        }

        // Count obituaries by month
        obituariesGrowthRes.data?.forEach((item) => {
          if (item.created_at) {
            const d = new Date(item.created_at);
            const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
            if (growthByMonth[key]) {
              growthByMonth[key].obituaries++;
            }
          }
        });

        // Count users by month
        usersGrowthRes.data?.forEach((item) => {
          if (item.created_at) {
            const d = new Date(item.created_at);
            const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`;
            if (growthByMonth[key]) {
              growthByMonth[key].users++;
            }
          }
        });

        const growthDataArray: GrowthDataPoint[] = Object.entries(growthByMonth).map(
          ([month, data]) => ({
            month,
            obituaries: data.obituaries,
            users: data.users,
          })
        );

        setGrowthData(growthDataArray);

        setBusinessMetrics({
          totalObituaries,
          obituariesThisMonth: obituariesThisMonthRes.count || 0,
          obituariesLastMonth: obituariesLastMonthRes.count || 0,
          totalUsers,
          usersThisMonth: usersThisMonthRes.count || 0,
          usersLastMonth: usersLastMonthRes.count || 0,
          visitorsThisMonth,
          visitorsLastMonth,
          conversionRate,
        });

        // Count events by name (existing logic)
        const eventCounts: Record<string, number> = {};
        eventsRes.data?.forEach((e) => {
          eventCounts[e.event_name] = (eventCounts[e.event_name] || 0) + 1;
        });

        const topEvents = Object.entries(eventCounts)
          .map(([event_name, count]) => ({ event_name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setMetrics({
          totalEvents: eventCountRes.count || 0,
          totalLeads: leadCountRes.count || 0,
          newLeadsToday: newLeadsCountRes.count || 0,
          topEvents,
          recentLeads: recentLeadsRes.data || [],
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

  // Calculate changes for display
  const obituaryChange = calculatePercentChange(
    businessMetrics.obituariesThisMonth,
    businessMetrics.obituariesLastMonth
  );
  const userChange = calculatePercentChange(
    businessMetrics.usersThisMonth,
    businessMetrics.usersLastMonth
  );
  const visitorChange = calculatePercentChange(
    businessMetrics.visitorsThisMonth,
    businessMetrics.visitorsLastMonth
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the Jewish Obits admin portal
        </p>
      </div>

      {/* Business Overview - Hero KPIs */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Business Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <HeroMetricCard
            title="Total Obituaries"
            value={businessMetrics.totalObituaries.toLocaleString()}
            subtitle={`${businessMetrics.obituariesThisMonth} this month`}
            change={obituaryChange.value}
            changeType={obituaryChange.type}
            icon={<FileText className="h-7 w-7" />}
            iconBgColor="bg-violet-100"
            iconColor="text-violet-600"
          />
          <HeroMetricCard
            title="Total Users"
            value={businessMetrics.totalUsers.toLocaleString()}
            subtitle={`${businessMetrics.usersThisMonth} this month`}
            change={userChange.value}
            changeType={userChange.type}
            icon={<UserPlus className="h-7 w-7" />}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <HeroMetricCard
            title="Visitors This Month"
            value={businessMetrics.visitorsThisMonth.toLocaleString()}
            subtitle="Unique sessions"
            change={visitorChange.value}
            changeType={visitorChange.type}
            icon={<Globe className="h-7 w-7" />}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <HeroMetricCard
            title="Conversion Rate"
            value={`${businessMetrics.conversionRate.toFixed(1)}%`}
            subtitle="Users → Obituaries"
            change={businessMetrics.conversionRate > 0 ? 'Active creators' : 'No conversions yet'}
            changeType={businessMetrics.conversionRate > 0 ? 'positive' : 'neutral'}
            icon={<Target className="h-7 w-7" />}
            iconBgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>
      </div>

      {/* Growth Chart & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Growth Over Time Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Growth Over Time
            </CardTitle>
            <CardDescription>New users and obituaries per month (last 6 months)</CardDescription>
          </CardHeader>
          <CardContent>
            {growthData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorObituaries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="users"
                    name="New Users"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="obituaries"
                    name="New Obituaries"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorObituaries)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-muted-foreground">
                No growth data available yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Conversion Funnel
            </CardTitle>
            <CardDescription>User journey from visit to creation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Visitors */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Visitors (This Month)</span>
                  <span className="font-bold">{businessMetrics.visitorsThisMonth.toLocaleString()}</span>
                </div>
                <div className="h-4 bg-green-500 rounded-full w-full" />
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="text-sm">
                    {businessMetrics.visitorsThisMonth > 0
                      ? `${((businessMetrics.totalUsers / businessMetrics.visitorsThisMonth) * 100).toFixed(1)}% registered`
                      : '—'}
                  </span>
                </div>
              </div>

              {/* Users */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Registered Users</span>
                  <span className="font-bold">{businessMetrics.totalUsers.toLocaleString()}</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                      width: `${
                        businessMetrics.visitorsThisMonth > 0
                          ? Math.min((businessMetrics.totalUsers / businessMetrics.visitorsThisMonth) * 100, 100)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ArrowDownRight className="h-4 w-4" />
                  <span className="text-sm">
                    {businessMetrics.conversionRate > 0
                      ? `${businessMetrics.conversionRate.toFixed(1)}% created obituary`
                      : '—'}
                  </span>
                </div>
              </div>

              {/* Obituaries */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Obituaries Created</span>
                  <span className="font-bold">{businessMetrics.totalObituaries.toLocaleString()}</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full"
                    style={{
                      width: `${
                        businessMetrics.totalUsers > 0
                          ? Math.min((businessMetrics.totalObituaries / businessMetrics.totalUsers) * 100, 100)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Metrics */}
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5" />
        Activity Metrics
      </h2>
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
