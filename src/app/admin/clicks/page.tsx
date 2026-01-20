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
  MousePointerClick,
  RefreshCw,
  TrendingUp,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { ANALYTICS_EVENTS } from '@/lib/analytics';

interface ClickData {
  event_name: string;
  count: number;
  label: string;
  [key: string]: string | number;
}

const COLORS = [
  '#8b5cf6',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#6366f1',
  '#14b8a6',
];

// Map event names to friendly labels
const eventLabels: Record<string, string> = {
  cta_create_obituary_clicked: 'Create Obituary',
  cta_writing_help_clicked: 'Writing Help',
  cta_search_submitted: 'Search',
  cta_shop_flowers_clicked: 'Shop Flowers',
  cta_plant_tree_clicked: 'Plant Tree',
  cta_view_memorial_clicked: 'View Memorial',
  cta_get_started_clicked: 'Get Started',
  cta_contact_clicked: 'Contact',
  cta_browse_communities_clicked: 'Browse Communities',
  cta_view_resources_clicked: 'View Resources',
  nav_synagogues_clicked: 'Nav: Synagogues',
  nav_schools_clicked: 'Nav: Schools',
  nav_organizations_clicked: 'Nav: Organizations',
  nav_cities_clicked: 'Nav: Cities',
  nav_funeral_homes_clicked: 'Nav: Funeral Homes',
  nav_resources_clicked: 'Nav: Resources',
};

export default function ClicksPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [clickData, setClickData] = useState<ClickData[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    fetchClickData();
  }, [timeRange]);

  async function fetchClickData() {
    setLoading(true);
    try {
      // Calculate date range
      const now = new Date();
      const daysAgo = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - daysAgo);

      // Fetch click events
      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('event_name')
        .gte('created_at', startDate.toISOString())
        .or(
          `event_name.ilike.%clicked%,event_name.ilike.%submitted%`
        );

      if (error) throw error;

      // Count by event name
      const counts: Record<string, number> = {};
      events?.forEach((e) => {
        counts[e.event_name] = (counts[e.event_name] || 0) + 1;
      });

      // Convert to array and sort
      const sortedData = Object.entries(counts)
        .map(([event_name, count]) => ({
          event_name,
          count,
          label: eventLabels[event_name] || event_name.replace(/_/g, ' '),
        }))
        .sort((a, b) => b.count - a.count);

      setClickData(sortedData);
      setTotalClicks(events?.length || 0);
    } catch (error) {
      console.error('Error fetching click data:', error);
    } finally {
      setLoading(false);
    }
  }

  const topCTAs = clickData.slice(0, 5);
  const otherClicks = clickData.slice(5);
  const otherTotal = otherClicks.reduce((sum, c) => sum + c.count, 0);

  const pieData = [
    ...topCTAs,
    ...(otherTotal > 0 ? [{ label: 'Other', count: otherTotal, event_name: 'other' }] : []),
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MousePointerClick className="h-8 w-8" />
            Click Tracking
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor which buttons and CTAs users click most
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
          <Button variant="outline" onClick={fetchClickData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MousePointerClick className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Clicks</p>
                <p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unique CTAs Clicked</p>
                <p className="text-2xl font-bold">{clickData.length}</p>
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
                <p className="text-sm text-muted-foreground">Top CTA</p>
                <p className="text-xl font-bold truncate">
                  {topCTAs[0]?.label || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Click Distribution</CardTitle>
            <CardDescription>Clicks by button/CTA</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            ) : clickData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={clickData.slice(0, 10)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={{ fontSize: 11 }}
                    width={120}
                  />
                  <Tooltip
                    formatter={(value) => [value ?? 0, 'Clicks']}
                    labelFormatter={(label) => String(label)}
                  />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                No click data available for this period
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Click Share</CardTitle>
            <CardDescription>Percentage breakdown of top CTAs</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            ) : pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                    }
                    nameKey="label"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [value ?? 0, 'Clicks']}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                No click data available for this period
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Click Events</CardTitle>
          <CardDescription>Complete list of tracked button clicks</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading...
            </div>
          ) : clickData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">#</th>
                    <th className="text-left p-3 font-medium">Button/CTA</th>
                    <th className="text-left p-3 font-medium">Event Name</th>
                    <th className="text-right p-3 font-medium">Clicks</th>
                    <th className="text-right p-3 font-medium">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {clickData.map((click, index) => (
                    <tr key={click.event_name} className="border-b">
                      <td className="p-3 text-muted-foreground">{index + 1}</td>
                      <td className="p-3 font-medium">{click.label}</td>
                      <td className="p-3 text-sm text-muted-foreground font-mono">
                        {click.event_name}
                      </td>
                      <td className="p-3 text-right font-bold">
                        {click.count.toLocaleString()}
                      </td>
                      <td className="p-3 text-right">
                        {totalClicks > 0
                          ? `${((click.count / totalClicks) * 100).toFixed(1)}%`
                          : '0%'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No click data available. Events will appear here once users start
              clicking tracked buttons.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
