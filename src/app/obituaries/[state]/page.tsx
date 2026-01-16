'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Calendar, MapPin, ExternalLink, Heart } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface JewishObit {
  id: string;
  title: string;
  summary: string | null;
  source_name: string;
  source_url: string;
  image_url: string | null;
  published_at: string | null;
  created_at: string | null;
  state: string | null;
  city: string | null;
}

interface ScrapedObituary {
  id: string;
  name: string;
  date_of_death: string | null;
  published_at: string | null;
  city: string | null;
  state: string | null;
  source: string;
  source_url: string;
  snippet: string | null;
  created_at: string | null;
}

type ExternalObit = JewishObit | ScrapedObituary;

const STATE_NAMES: Record<string, string> = {
  FL: 'Florida',
  NY: 'New York',
  CA: 'California',
  NJ: 'New Jersey',
  PA: 'Pennsylvania',
  IL: 'Illinois',
  MA: 'Massachusetts',
  TX: 'Texas',
  MD: 'Maryland',
  OH: 'Ohio',
  CT: 'Connecticut',
  MI: 'Michigan',
  AZ: 'Arizona',
  GA: 'Georgia',
  NC: 'North Carolina',
  VA: 'Virginia',
  WA: 'Washington',
  CO: 'Colorado',
  MO: 'Missouri',
  WI: 'Wisconsin'
};

const StateObituaries = () => {
  const params = useParams();
  const state = params.state as string;
  const stateCode = state?.toUpperCase() || '';
  const stateName = STATE_NAMES[stateCode] || stateCode;

  const [obituaries, setObituaries] = useState<ExternalObit[]>([]);
  const [filteredObituaries, setFilteredObituaries] = useState<ExternalObit[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Most recent');

  useEffect(() => {
    fetchObituaries();
  }, [stateCode]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, sortBy, obituaries]);

  const fetchObituaries = async () => {
    setLoading(true);
    try {
      const [jewishResult, scrapedResult] = await Promise.all([
        supabase
          .from('obits')
          .select('*')
          .eq('state', stateCode)
          .order('published_at', { ascending: false, nullsFirst: false }),
        supabase
          .from('scraped_obituaries')
          .select('*')
          .eq('state', stateCode)
          .order('published_at', { ascending: false, nullsFirst: false })
      ]);

      const combined: ExternalObit[] = [
        ...(jewishResult.data || []),
        ...(scrapedResult.data || [])
      ];

      setObituaries(combined);
      setFilteredObituaries(combined);
    } catch (error) {
      console.error('Error fetching obituaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...obituaries];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(obit => {
        const name = 'title' in obit ? obit.title : obit.name;
        const snippet = 'summary' in obit ? obit.summary : obit.snippet;
        const city = 'city' in obit ? obit.city : null;

        return name.toLowerCase().includes(searchLower) ||
          city?.toLowerCase().includes(searchLower) ||
          snippet?.toLowerCase().includes(searchLower);
      });
    }

    if (sortBy === 'Most recent') {
      filtered.sort((a, b) => {
        const dateA = new Date(a.published_at || a.created_at || '');
        const dateB = new Date(b.published_at || b.created_at || '');
        return dateB.getTime() - dateA.getTime();
      });
    }

    setFilteredObituaries(filtered);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Jewish Obituaries in {stateName}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Browse {obituaries.length} obituaries from Jewish communities, funeral homes, and publications across {stateName}
          </p>

          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/search" className="hover:text-primary transition-colors">Search</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{stateName}</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <div className="bg-gradient-to-br from-background via-muted/5 to-background rounded-2xl p-6 shadow-lg border border-border/30">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 bg-background/80 backdrop-blur-lg border-border/50 focus:border-primary/50 h-12 text-base rounded-xl"
                placeholder={`Search obituaries in ${stateName}...`}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={sortBy === 'Most recent' ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy('Most recent')}
                className="rounded-full"
              >
                Most Recent
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-10 w-full" />
              </Card>
            ))}
          </div>
        ) : filteredObituaries.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <Heart className="mx-auto h-20 w-20 text-primary/50 mb-6" />
            <h3 className="text-2xl font-semibold text-foreground mb-3">
              No obituaries found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? 'Try adjusting your search' : `No obituaries available for ${stateName} yet`}
            </p>
            <Link href="/search">
              <Button variant="outline" size="lg">
                Browse All Obituaries
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                Found {filteredObituaries.length} {filteredObituaries.length === 1 ? 'obituary' : 'obituaries'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredObituaries.map((obit, index) => {
                const title = 'title' in obit ? obit.title : obit.name;
                const sourceName = 'source_name' in obit ? obit.source_name : undefined;
                const source = 'source' in obit ? obit.source : undefined;
                const dateOfDeath = 'date_of_death' in obit ? obit.date_of_death : undefined;
                const city = 'city' in obit ? obit.city : undefined;
                const summary = 'summary' in obit ? obit.summary : undefined;
                const snippet = 'snippet' in obit ? obit.snippet : undefined;
                const imageUrl = 'image_url' in obit ? obit.image_url : undefined;

                return (
                  <article
                    key={obit.id}
                    className="group p-6 bg-gradient-to-br from-background via-background to-muted/5 backdrop-blur-lg border border-border/50 hover:border-primary/30 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in rounded-lg relative overflow-hidden"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {imageUrl && (
                      <div className="mb-4 overflow-hidden rounded-xl border border-border/30">
                        <img
                          src={imageUrl}
                          alt={`${title} memorial photo`}
                          className="w-full h-40 object-cover transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                    )}

                    <div className="space-y-3">
                      <h3
                        className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors"
                      >
                        {title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
                        {(obit.published_at || dateOfDeath) && (
                          <div className="flex items-center bg-muted/30 px-2 py-1 rounded-md">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            <time
                              className="text-xs font-medium"
                            >
                              {formatDate(obit.published_at || dateOfDeath)}
                            </time>
                          </div>
                        )}
                        {city && (
                          <div className="flex items-center bg-muted/30 px-2 py-1 rounded-md">
                            <MapPin className="h-3.5 w-3.5 mr-1.5" />
                            <span className="text-xs font-medium">{city}, {stateCode}</span>
                          </div>
                        )}
                      </div>

                      {(sourceName || source) && (
                        <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5">
                          {sourceName || source}
                        </Badge>
                      )}

                      {(summary || snippet) && (
                        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                          {summary || snippet}
                        </p>
                      )}

                      <Button
                        variant="outline"
                        className="w-full border-primary/20 hover:bg-primary/10 transition-all mt-4"
                        onClick={() => window.open(obit.source_url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Full Obituary
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StateObituaries;
