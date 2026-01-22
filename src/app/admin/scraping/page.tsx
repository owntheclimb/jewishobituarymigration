'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Database,
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Rss,
  Globe,
  Activity,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RssSource {
  id: string;
  name: string;
  feed_url: string;
  state: string | null;
  city: string | null;
  is_active: boolean;
  last_fetched: string | null;
  created_at: string;
}

interface ScrapedSource {
  id: string;
  name: string;
  base_url: string;
  obituary_list_url: string;
  state: string | null;
  city: string | null;
  is_active: boolean;
  last_scraped: string | null;
  last_error: string | null;
  scrape_count: number;
  platform: string | null;
  created_at: string;
}

interface ObitStats {
  totalObits: number;
  totalRssObits: number;
  totalScrapedObits: number;
  recentObits: number;
  statesCovered: number;
}

export default function ScrapingDashboard() {
  const [loading, setLoading] = useState(true);
  const [rssSources, setRssSources] = useState<RssSource[]>([]);
  const [scrapedSources, setScrapedSources] = useState<ScrapedSource[]>([]);
  const [stats, setStats] = useState<ObitStats>({
    totalObits: 0,
    totalRssObits: 0,
    totalScrapedObits: 0,
    recentObits: 0,
    statesCovered: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // Fetch RSS sources
      const { data: rssDataRaw, error: rssError } = await supabase
        .from('obit_sources' as any)
        .select('*')
        .order('name', { ascending: true });

      if (rssError) throw rssError;
      const rssData = (rssDataRaw || []) as unknown as RssSource[];
      setRssSources(rssData);

      // Fetch scraped sources
      const { data: scrapedDataRaw, error: scrapedError } = await supabase
        .from('scraped_sources' as any)
        .select('*')
        .order('name', { ascending: true });

      if (scrapedError) throw scrapedError;
      const scrapedData = (scrapedDataRaw || []) as unknown as ScrapedSource[];
      setScrapedSources(scrapedData);

      // Fetch stats
      const { count: rssObitCount } = await supabase
        .from('obits' as any)
        .select('*', { count: 'exact', head: true });

      const { count: scrapedObitCount } = await supabase
        .from('scraped_obituaries' as any)
        .select('*', { count: 'exact', head: true });

      // Count recent obits (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { count: recentRssCount } = await supabase
        .from('obits' as any)
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      const { count: recentScrapedCount } = await supabase
        .from('scraped_obituaries' as any)
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      // Get unique states
      const statesSet = new Set<string>();
      rssData.forEach((s) => s.state && statesSet.add(s.state));
      scrapedData.forEach((s) => s.state && statesSet.add(s.state));

      setStats({
        totalObits: (rssObitCount || 0) + (scrapedObitCount || 0),
        totalRssObits: rssObitCount || 0,
        totalScrapedObits: scrapedObitCount || 0,
        recentObits: (recentRssCount || 0) + (recentScrapedCount || 0),
        statesCovered: statesSet.size,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load scraping data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function toggleRssSource(source: RssSource) {
    try {
      const { error } = await supabase
        .from('obit_sources' as any)
        .update({ is_active: !source.is_active })
        .eq('id', source.id);

      if (error) throw error;
      toast({ title: 'Success', description: `Source ${source.is_active ? 'disabled' : 'enabled'}` });
      fetchData();
    } catch (error) {
      console.error('Error toggling source:', error);
      toast({ title: 'Error', description: 'Failed to update source', variant: 'destructive' });
    }
  }

  async function toggleScrapedSource(source: ScrapedSource) {
    try {
      const { error } = await supabase
        .from('scraped_sources' as any)
        .update({ is_active: !source.is_active })
        .eq('id', source.id);

      if (error) throw error;
      toast({ title: 'Success', description: `Source ${source.is_active ? 'disabled' : 'enabled'}` });
      fetchData();
    } catch (error) {
      console.error('Error toggling source:', error);
      toast({ title: 'Error', description: 'Failed to update source', variant: 'destructive' });
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getSourceHealth = (source: ScrapedSource): 'healthy' | 'warning' | 'error' => {
    if (!source.is_active) return 'warning';
    if (source.last_error) return 'error';
    if (!source.last_scraped) return 'warning';

    const lastScraped = new Date(source.last_scraped);
    const now = new Date();
    const diffHours = (now.getTime() - lastScraped.getTime()) / (1000 * 60 * 60);

    if (diffHours > 48) return 'warning';
    return 'healthy';
  };

  const filteredRssSources = rssSources.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.state?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && s.is_active) ||
      (statusFilter === 'inactive' && !s.is_active);
    return matchesSearch && matchesStatus;
  });

  const filteredScrapedSources = scrapedSources.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.state?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && s.is_active) ||
      (statusFilter === 'inactive' && !s.is_active) ||
      (statusFilter === 'error' && s.last_error);
    return matchesSearch && matchesStatus;
  });

  const healthyScrapers = scrapedSources.filter((s) => getSourceHealth(s) === 'healthy').length;
  const errorScrapers = scrapedSources.filter((s) => getSourceHealth(s) === 'error').length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-8 w-8" />
            Scraping Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor obituary data sources and scraping health
          </p>
        </div>
        <Button onClick={fetchData} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalObits.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Obituaries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.recentObits}</p>
                <p className="text-sm text-muted-foreground">Last 7 Days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Rss className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{rssSources.filter((s) => s.is_active).length}</p>
                <p className="text-sm text-muted-foreground">Active RSS Feeds</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{healthyScrapers}/{scrapedSources.length}</p>
                <p className="text-sm text-muted-foreground">Healthy Scrapers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{stats.statesCovered}</p>
                <p className="text-sm text-muted-foreground">States Covered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Summary */}
      {errorScrapers > 0 && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">
                {errorScrapers} scraper{errorScrapers !== 1 ? 's' : ''} have errors
              </span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              Check the Web Scrapers tab for details on failed sources.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="error">With Errors</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rss">
        <TabsList className="mb-6">
          <TabsTrigger value="rss" className="gap-2">
            <Rss className="h-4 w-4" />
            RSS Feeds ({rssSources.length})
          </TabsTrigger>
          <TabsTrigger value="scrapers" className="gap-2">
            <Globe className="h-4 w-4" />
            Web Scrapers ({scrapedSources.length})
          </TabsTrigger>
        </TabsList>

        {/* RSS Feeds Tab */}
        <TabsContent value="rss">
          <Card>
            <CardHeader>
              <CardTitle>RSS Feed Sources</CardTitle>
              <CardDescription>
                {filteredRssSources.length} source{filteredRssSources.length !== 1 ? 's' : ''} •
                {stats.totalRssObits.toLocaleString()} obituaries fetched
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : filteredRssSources.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Source</th>
                        <th className="text-left p-3 font-medium">Location</th>
                        <th className="text-left p-3 font-medium">Last Fetched</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRssSources.map((source) => (
                        <tr key={source.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{source.name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                                {source.feed_url}
                              </p>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">
                              {source.city ? `${source.city}, ` : ''}{source.state || 'National'}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(source.last_fetched)}
                            </span>
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={source.is_active ? 'default' : 'secondary'}
                              className="cursor-pointer"
                              onClick={() => toggleRssSource(source)}
                            >
                              {source.is_active ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              {source.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(source.feed_url, '_blank')}
                            >
                              View Feed
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No RSS sources found.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Web Scrapers Tab */}
        <TabsContent value="scrapers">
          <Card>
            <CardHeader>
              <CardTitle>Web Scraper Sources</CardTitle>
              <CardDescription>
                {filteredScrapedSources.length} source{filteredScrapedSources.length !== 1 ? 's' : ''} •
                {stats.totalScrapedObits.toLocaleString()} obituaries scraped
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : filteredScrapedSources.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Source</th>
                        <th className="text-left p-3 font-medium">Platform</th>
                        <th className="text-left p-3 font-medium">Location</th>
                        <th className="text-left p-3 font-medium">Last Scraped</th>
                        <th className="text-left p-3 font-medium">Health</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredScrapedSources.map((source) => {
                        const health = getSourceHealth(source);
                        return (
                          <tr key={source.id} className="border-b hover:bg-muted/50">
                            <td className="p-3">
                              <div>
                                <p className="font-medium">{source.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {source.scrape_count} obituaries
                                </p>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline">{source.platform || 'Unknown'}</Badge>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline">
                                {source.city ? `${source.city}, ` : ''}{source.state || 'N/A'}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDate(source.last_scraped)}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="space-y-1">
                                <Badge
                                  variant={health === 'healthy' ? 'default' : health === 'error' ? 'destructive' : 'secondary'}
                                  className="cursor-pointer"
                                  onClick={() => toggleScrapedSource(source)}
                                >
                                  {health === 'healthy' ? (
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                  ) : health === 'error' ? (
                                    <XCircle className="h-3 w-3 mr-1" />
                                  ) : (
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                  )}
                                  {source.is_active ? (health === 'error' ? 'Error' : 'Active') : 'Inactive'}
                                </Badge>
                                {source.last_error && (
                                  <p className="text-xs text-red-500 truncate max-w-[150px]" title={source.last_error}>
                                    {source.last_error}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="p-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(source.obituary_list_url, '_blank')}
                              >
                                View Site
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No scraper sources found.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
