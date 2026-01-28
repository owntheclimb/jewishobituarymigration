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
import { Search, MapPin, GraduationCap, Bell, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface School {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  city_name: string | null;
  state_code: string | null;
  type: string;
  verified: boolean;
  stats_recent_count: number;
}

const Schools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchSchools() {
      try {
        // Fetch schools - both highschool and college types
        const { data, error } = await supabase
          .from('communities')
          .select('*')
          .in('type', ['highschool', 'college'])
          .order('name');

        if (error) {
          console.error('Error fetching schools:', error);
        } else if (data) {
          setSchools(data as unknown as School[]);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSchools();
  }, []);

  // Get unique states for filter
  const states = [...new Set(schools.map(s => s.state_code).filter(Boolean))].sort();

  // Map type to display label
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'highschool': return 'Day School';
      case 'college': return 'College/University';
      default: return type;
    }
  };

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (school.city_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || school.state_code === selectedState;
    const matchesType = selectedType === 'all' || school.type === selectedType;
    return matchesSearch && matchesState && matchesType;
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
                Jewish School Alumni Memorial Pages
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Honor alumni and former students who have passed. Connect with your school community and remember classmates.
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
                    placeholder="Search schools..."
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

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="highschool">Day School</SelectItem>
                    <SelectItem value="college">College/University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* School Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredSchools.length === 0 ? (
                <div className="text-center py-20">
                  <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No schools found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || selectedState !== 'all' || selectedType !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'We are actively adding Jewish schools to our directory'}
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setSelectedState('all');
                    setSelectedType('all');
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      Showing {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {filteredSchools.map((school) => (
                      <Card key={school.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                                {school.name}
                                {school.verified && (
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                )}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 text-base mb-2">
                                <MapPin className="h-4 w-4" />
                                {school.city_name}, {school.state_code}
                              </CardDescription>
                              <div className="flex gap-2">
                                <Badge variant="secondary">{getTypeLabel(school.type)}</Badge>
                              </div>
                            </div>
                            <Button
                              variant={following.has(school.id) ? "default" : "outline"}
                              size="sm"
                              className="gap-2"
                              onClick={() => handleFollow(school.id)}
                            >
                              <Bell className="h-4 w-4" />
                              {following.has(school.id) ? 'Following' : 'Follow'}
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {school.description && (
                            <p className="text-muted-foreground mb-4">{school.description}</p>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <GraduationCap className="h-4 w-4" />
                              <span>{school.stats_recent_count || 0} alumni memorials</span>
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
            <h2 className="text-3xl font-bold mb-4">Don't See Your School?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're continuously adding Jewish schools to our directory. Let us know if you'd like to see your school listed.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Suggest a School</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schools;
