'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Bell, Heart, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  verified: boolean;
  stats_recent_count: number;
}

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('*')
          .eq('type', 'organization')
          .order('name');

        if (error) {
          console.error('Error fetching organizations:', error);
        } else if (data) {
          setOrganizations(data as unknown as Organization[]);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrganizations();
  }, []);

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (org.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesSearch;
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
                Jewish Organization Memorial Pages
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Honor members of Jewish organizations who have dedicated their lives to serving the community. Follow organizations to stay connected.
              </p>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="py-8 border-b bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search organizations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Organization Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredOrganizations.length === 0 ? (
                <div className="text-center py-20">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No organizations found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm
                      ? 'Try adjusting your search'
                      : 'We are actively adding Jewish organizations to our directory'}
                  </p>
                  {searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm('')}>
                      Clear Search
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      Showing {filteredOrganizations.length} organization{filteredOrganizations.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {filteredOrganizations.map((org) => (
                      <Card key={org.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                                {org.name}
                                {org.verified && (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                )}
                              </CardTitle>
                            </div>
                            <Button
                              variant={following.has(org.id) ? "default" : "outline"}
                              size="sm"
                              className="gap-2"
                              onClick={() => handleFollow(org.id)}
                            >
                              <Bell className="h-4 w-4" />
                              {following.has(org.id) ? 'Following' : 'Follow'}
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {org.description && (
                            <p className="text-muted-foreground mb-4">{org.description}</p>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Heart className="h-4 w-4" />
                              <span>{org.stats_recent_count || 0} member memorials</span>
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
            <h2 className="text-3xl font-bold mb-4">Don't See Your Organization?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're continuously adding Jewish organizations to our directory. Let us know if you'd like to see your organization listed.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Suggest an Organization</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Organizations;
