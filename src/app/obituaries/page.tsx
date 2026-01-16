'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface StateCount {
  state: string;
  count: number;
}

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

const StateDirectory = () => {
  const [stateCounts, setStateCounts] = useState<StateCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStateCounts();
  }, []);

  const fetchStateCounts = async () => {
    try {
      // Fetch state counts from both tables
      const [jewishResult, scrapedResult] = await Promise.all([
        supabase
          .from('obits')
          .select('state')
          .not('state', 'is', null),
        supabase
          .from('scraped_obituaries')
          .select('state')
          .not('state', 'is', null)
      ]);

      const allStates = [
        ...(jewishResult.data || []).map(d => d.state),
        ...(scrapedResult.data || []).map(d => d.state)
      ].filter(Boolean) as string[];

      const counts: Record<string, number> = {};
      allStates.forEach(state => {
        counts[state] = (counts[state] || 0) + 1;
      });

      const stateCountArray = Object.entries(counts)
        .map(([state, count]) => ({ state, count }))
        .sort((a, b) => b.count - a.count);

      setStateCounts(stateCountArray);
    } catch (error) {
      console.error('Error fetching state counts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Jewish Obituaries by State
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Browse obituaries from Jewish communities across the United States.
            Select a state to view memorials from funeral homes and Jewish organizations in that region.
          </p>

          <nav className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/search" className="hover:text-primary transition-colors">Search</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Browse by State</span>
          </nav>
        </header>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading states...</div>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stateCounts.map((item, index) => {
              const stateName = STATE_NAMES[item.state] || item.state;
              const stateCode = item.state.toLowerCase();

              return (
                <Link
                  key={item.state}
                  href={`/obituaries/${stateCode}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <Card className="p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-muted/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-bold text-foreground">
                          {stateName}
                        </h2>
                      </div>
                      <Badge variant="secondary" className="font-semibold">
                        {item.count}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.count} {item.count === 1 ? 'obituary' : 'obituaries'} available
                    </p>
                  </Card>
                </Link>
              );
            })}
          </section>
        )}

        {!loading && stateCounts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No state data available yet.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StateDirectory;
