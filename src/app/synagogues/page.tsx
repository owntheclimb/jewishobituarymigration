'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, Bell } from 'lucide-react';

const mockSynagogues = [
  {
    id: '1',
    name: 'Temple Emanu-El',
    city: 'New York',
    state: 'NY',
    denomination: 'Reform',
    recentObituaries: 23,
    address: '1 East 65th Street, New York, NY 10065',
    website: 'https://emanuelnyc.org',
    description: 'One of the oldest and largest Reform synagogues in New York City, serving the community since 1845.'
  },
  {
    id: '2',
    name: 'Congregation Beth Israel',
    city: 'Miami',
    state: 'FL',
    denomination: 'Conservative',
    recentObituaries: 18,
    address: '7100 SW 76th St, Miami, FL 33143',
    website: 'https://bethisraelmiami.org',
    description: 'A vibrant Conservative congregation serving the Miami Jewish community for over 60 years.'
  },
  {
    id: '3',
    name: 'Wilshire Boulevard Temple',
    city: 'Los Angeles',
    state: 'CA',
    denomination: 'Reform',
    recentObituaries: 31,
    address: '3663 Wilshire Blvd, Los Angeles, CA 90010',
    website: 'https://wbtla.org',
    description: 'Historic Reform synagogue founded in 1862, serving the Los Angeles Jewish community.'
  },
  {
    id: '4',
    name: 'Congregation Kehillath Israel',
    city: 'Brookline',
    state: 'MA',
    denomination: 'Conservative',
    recentObituaries: 12,
    address: '384 Harvard Street, Brookline, MA 02446',
    website: 'https://kibk.org',
    description: 'A welcoming Conservative congregation in the heart of Brookline.'
  },
  {
    id: '5',
    name: 'Anshe Emet Synagogue',
    city: 'Chicago',
    state: 'IL',
    denomination: 'Conservative',
    recentObituaries: 19,
    address: '3751 N Broadway, Chicago, IL 60613',
    website: 'https://ansheemet.org',
    description: 'One of Chicago\'s largest Conservative synagogues, fostering a warm and inclusive community.'
  },
  {
    id: '6',
    name: 'Young Israel of Scarsdale',
    city: 'Scarsdale',
    state: 'NY',
    denomination: 'Orthodox',
    recentObituaries: 8,
    address: '1313 Weaver Street, Scarsdale, NY 10583',
    website: 'https://yiscarsdale.org',
    description: 'A Modern Orthodox congregation serving Scarsdale and surrounding communities.'
  }
];

const Synagogues = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDenomination, setSelectedDenomination] = useState('all');
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const filteredSynagogues = mockSynagogues.filter(syn => {
    const matchesSearch = syn.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         syn.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || syn.state === selectedState;
    const matchesDenom = selectedDenomination === 'all' || syn.denomination === selectedDenomination;
    return matchesSearch && matchesState && matchesDenom;
  });

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
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="MA">Massachusetts</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDenomination} onValueChange={setSelectedDenomination}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Denominations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Denominations</SelectItem>
                    <SelectItem value="Orthodox">Orthodox</SelectItem>
                    <SelectItem value="Conservative">Conservative</SelectItem>
                    <SelectItem value="Reform">Reform</SelectItem>
                    <SelectItem value="Reconstructionist">Reconstructionist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Synagogue Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredSynagogues.length} synagogue{filteredSynagogues.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid gap-6">
                {filteredSynagogues.map((synagogue) => (
                  <Card key={synagogue.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">
                            <Link href={`/communities/synagogue/${synagogue.id}`} className="hover:text-primary">
                              {synagogue.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-base mb-2">
                            <MapPin className="h-4 w-4" />
                            {synagogue.city}, {synagogue.state}
                          </CardDescription>
                          <Badge variant="secondary">{synagogue.denomination}</Badge>
                        </div>
                        <Button
                          variant={following.has(synagogue.id) ? "default" : "outline"}
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            setFollowing(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(synagogue.id)) {
                                newSet.delete(synagogue.id);
                                toast.info(`Unfollowed ${synagogue.name}`);
                              } else {
                                newSet.add(synagogue.id);
                                toast.success(`Following ${synagogue.name}`, {
                                  description: 'You will be notified of community updates'
                                });
                              }
                              return newSet;
                            });
                          }}
                        >
                          <Bell className="h-4 w-4" />
                          {following.has(synagogue.id) ? 'Following' : 'Follow'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{synagogue.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{synagogue.recentObituaries} recent obituaries</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={synagogue.website} target="_blank" rel="noopener noreferrer">
                              Visit Website
                            </a>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/communities/synagogue/${synagogue.id}`}>
                              View Memorial Page
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See Your Synagogue?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're continuously adding synagogues to our directory. Let us know if you'd like to see your congregation listed.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Suggest a Synagogue</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Synagogues;
