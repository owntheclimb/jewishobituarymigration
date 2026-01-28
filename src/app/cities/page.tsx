'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Users, Bell, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface City {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  state_code: string | null;
  verified: boolean;
  stats_recent_count: number;
}

const Cities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchCities() {
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('*')
          .eq('type', 'city')
          .order('name');

        if (error) {
          console.error('Error fetching cities:', error);
        } else if (data) {
          setCities(data as unknown as City[]);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, []);

  // Get unique states for filter
  const states = [...new Set(cities.map(c => c.state_code).filter(Boolean))].sort();

  const filteredCities = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (city.state_code?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || city.state_code === selectedState;
    return matchesSearch && matchesState;
  });

  const handleFollow = (cityId: string, cityName: string) => {
    setFollowing(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cityId)) {
        newSet.delete(cityId);
        toast.info(`Unfollowed ${cityName}`);
      } else {
        newSet.add(cityId);
        toast.success(`Following ${cityName}`, {
          description: 'You will be notified of community updates'
        });
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                City Memorial Pages
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Honor and remember community members from Jewish communities across North America. Follow your city to receive notifications of recent losses.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search cities..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map(state => (
                      <SelectItem key={state} value={state!}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* City Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredCities.length === 0 ? (
                <div className="text-center py-20">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No cities found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || selectedState !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'We are actively adding Jewish communities to our directory'}
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setSelectedState('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      Showing {filteredCities.length} {filteredCities.length !== 1 ? 'cities' : 'city'}
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {filteredCities.map((city) => (
                      <Card key={city.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                                {city.name}
                                {city.verified && (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                )}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 text-base mb-2">
                                <MapPin className="h-4 w-4" />
                                {city.name}, {city.state_code}
                              </CardDescription>
                            </div>
                            <Button
                              variant={following.has(city.id) ? "default" : "outline"}
                              size="sm"
                              className="gap-2"
                              onClick={() => handleFollow(city.id, city.name)}
                            >
                              <Bell className="h-4 w-4" />
                              {following.has(city.id) ? 'Following' : 'Follow'}
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {city.description && (
                            <p className="text-muted-foreground mb-4">{city.description}</p>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{city.stats_recent_count || 0} recent obituaries</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" asChild>
                                <Link href={`/search?city=${encodeURIComponent(city.name)}`}>
                                  Browse Obituaries
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See Your City?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're continuously expanding our coverage. Let us know if you'd like to see your city's Jewish community featured.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Suggest a City</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cities;
