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
import { Search, MapPin, Users, Bell } from 'lucide-react';

const mockCities = [
  {
    id: '1',
    name: 'New York',
    state: 'NY',
    recentObituaries: 487,
    population: '8,336,817',
    jewishPopulation: '1,100,000',
    description: 'The largest Jewish community in the United States, home to diverse Jewish neighborhoods across all five boroughs.'
  },
  {
    id: '2',
    name: 'Los Angeles',
    state: 'CA',
    recentObituaries: 312,
    population: '3,979,576',
    jewishPopulation: '617,000',
    description: 'Second-largest Jewish community in the US, with vibrant communities throughout the greater LA area.'
  },
  {
    id: '3',
    name: 'Miami',
    state: 'FL',
    recentObituaries: 245,
    population: '467,963',
    jewishPopulation: '485,000',
    description: 'A major center of Jewish life in South Florida, with significant communities in Miami Beach and surrounding areas.'
  },
  {
    id: '4',
    name: 'Chicago',
    state: 'IL',
    recentObituaries: 198,
    population: '2,746,388',
    jewishPopulation: '294,000',
    description: 'Historic Jewish community with strong institutions and diverse neighborhoods throughout the metropolitan area.'
  },
  {
    id: '5',
    name: 'Philadelphia',
    state: 'PA',
    recentObituaries: 156,
    population: '1,603,797',
    jewishPopulation: '214,000',
    description: 'One of the oldest Jewish communities in America, with a rich history dating back to colonial times.'
  },
  {
    id: '6',
    name: 'Boston',
    state: 'MA',
    recentObituaries: 143,
    population: '675,647',
    jewishPopulation: '248,000',
    description: 'Home to Brookline and other historic Jewish neighborhoods, with strong educational and cultural institutions.'
  },
  {
    id: '7',
    name: 'Baltimore',
    state: 'MD',
    recentObituaries: 127,
    population: '585,708',
    jewishPopulation: '106,000',
    description: 'A significant Orthodox community alongside Reform and Conservative congregations throughout the city.'
  },
  {
    id: '8',
    name: 'San Francisco',
    state: 'CA',
    recentObituaries: 109,
    population: '873,965',
    jewishPopulation: '218,000',
    description: 'Bay Area Jewish community known for progressive values and innovative Jewish institutions.'
  },
  {
    id: '9',
    name: 'Atlanta',
    state: 'GA',
    recentObituaries: 94,
    population: '498,715',
    jewishPopulation: '120,000',
    description: 'The largest Jewish community in the Southeast, with growing institutions and vibrant cultural life.'
  },
  {
    id: '10',
    name: 'Cleveland',
    state: 'OH',
    recentObituaries: 78,
    population: '372,624',
    jewishPopulation: '81,500',
    description: 'Historic Jewish community with strong philanthropic traditions and established synagogues.'
  }
];

const Cities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const filteredCities = mockCities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || city.state === selectedState;
    return matchesSearch && matchesState;
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
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="PA">Pennsylvania</SelectItem>
                    <SelectItem value="MA">Massachusetts</SelectItem>
                    <SelectItem value="MD">Maryland</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    <SelectItem value="OH">Ohio</SelectItem>
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
                          <CardTitle className="text-2xl mb-2">
                            <Link href={`/communities/city/${city.id}`} className="hover:text-primary">
                              {city.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-base mb-2">
                            <MapPin className="h-4 w-4" />
                            {city.name}, {city.state}
                          </CardDescription>
                        </div>
                        <Button
                          variant={following.has(city.id) ? "default" : "outline"}
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            setFollowing(prev => {
                              const newSet = new Set(prev);
                              if (newSet.has(city.id)) {
                                newSet.delete(city.id);
                                toast.info(`Unfollowed ${city.name}`);
                              } else {
                                newSet.add(city.id);
                                toast.success(`Following ${city.name}`, {
                                  description: 'You will be notified of community updates'
                                });
                              }
                              return newSet;
                            });
                          }}
                        >
                          <Bell className="h-4 w-4" />
                          {following.has(city.id) ? 'Following' : 'Follow'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{city.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Population: </span>
                          <span className="font-medium">{city.population}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Jewish Population: </span>
                          <span className="font-medium">{city.jewishPopulation}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{city.recentObituaries} recent obituaries</span>
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
