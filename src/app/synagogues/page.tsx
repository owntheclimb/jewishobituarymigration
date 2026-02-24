'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, Bell, Phone, Globe, Loader2, Building2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Synagogue {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  denomination: string | null;
  address: string | null;
  city_name: string | null;
  state_code: string | null;
  zip: string | null;
  phone: string | null;
  website: string | null;
  verified: boolean;
  stats_recent_count: number;
}

const Synagogues = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDenomination, setSelectedDenomination] = useState('all');
  const [synagogues, setSynagogues] = useState<Synagogue[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState<Set<string>>(new Set());

  // Fetch synagogues from database
  useEffect(() => {
    async function fetchSynagogues() {
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('*')
          .eq('type', 'synagogue')
          .order('name');

        if (error) {
          console.error('Error fetching synagogues:', error);
        } else if (data) {
          setSynagogues(data as unknown as Synagogue[]);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSynagogues();
  }, []);

  // Get unique states and denominations for filters
  const states = [...new Set(synagogues.map(s => s.state_code).filter(Boolean))].sort();
  const denominations = [...new Set(synagogues.map(s => s.denomination).filter(Boolean))].sort();

  const filteredSynagogues = synagogues.filter(syn => {
    const matchesSearch = syn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (syn.city_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || syn.state_code === selectedState;
    const matchesDenom = selectedDenomination === 'all' || syn.denomination === selectedDenomination;
    return matchesSearch && matchesState && matchesDenom;
  });

  const handleFollow = (id: string) => {
    setFollowing(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
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
                Synagogue Memorial Pages
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Honor and remember congregation members who have passed. Follow your synagogue community to receive notifications of recent losses.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search synagogues..."
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

                <Select value={selectedDenomination} onValueChange={setSelectedDenomination}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Denominations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Denominations</SelectItem>
                    {denominations.map(denom => (
                      <SelectItem key={denom} value={denom!}>{denom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Synagogues Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredSynagogues.length === 0 ? (
              <div className="text-center py-20">
                <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No synagogues found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm || selectedState !== 'all' || selectedDenomination !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'We are actively adding synagogues to our directory'}
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedState('all');
                  setSelectedDenomination('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-6">
                  Showing {filteredSynagogues.length} synagogue{filteredSynagogues.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSynagogues.map((synagogue) => (
                    <Card key={synagogue.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2 flex items-center gap-2">
                              {synagogue.name}
                              {synagogue.verified && (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              )}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {synagogue.city_name}, {synagogue.state_code}
                            </CardDescription>
                          </div>
                          {synagogue.denomination && (
                            <Badge variant="secondary">{synagogue.denomination}</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {synagogue.description && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {synagogue.description}
                          </p>
                        )}

                        {synagogue.address && (
                          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{synagogue.address}</span>
                          </p>
                        )}

                        {synagogue.phone && (
                          <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                            <Phone className="h-3 w-3 flex-shrink-0" />
                            <a href={`tel:${synagogue.phone}`} className="hover:text-primary">
                              {synagogue.phone}
                            </a>
                          </p>
                        )}

                        {synagogue.website && (
                          <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                            <Globe className="h-3 w-3 flex-shrink-0" />
                            <a
                              href={synagogue.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary truncate"
                            >
                              {synagogue.website.replace(/^https?:\/\//, '')}
                            </a>
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{synagogue.stats_recent_count || 0} recent memorials</span>
                          </div>
                          <Button
                            variant={following.has(synagogue.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleFollow(synagogue.id)}
                          >
                            <Bell className="h-3 w-3 mr-1" />
                            {following.has(synagogue.id) ? 'Following' : 'Follow'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Don&apos;t see your synagogue?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We&apos;re continuously adding synagogues to our directory. If you&apos;d like to add your congregation, please contact us.
            </p>
            <Button asChild>
              <Link href="/contact">Request Addition</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Synagogues;
