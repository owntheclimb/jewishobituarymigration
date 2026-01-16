'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, GraduationCap, Bell } from 'lucide-react';

const mockSchools = [
  {
    id: '1',
    name: 'Ramaz School',
    city: 'New York',
    state: 'NY',
    type: 'Day School',
    level: 'K-12',
    recentObituaries: 15,
    description: 'Premier Modern Orthodox Jewish day school in Manhattan, educating students since 1937.'
  },
  {
    id: '2',
    name: 'Hebrew Academy of San Francisco',
    city: 'San Francisco',
    state: 'CA',
    type: 'Day School',
    level: 'K-8',
    recentObituaries: 8,
    description: 'Progressive Jewish day school providing excellence in both general and Judaic studies.'
  },
  {
    id: '3',
    name: 'Akiba Academy',
    city: 'Dallas',
    state: 'TX',
    type: 'Day School',
    level: 'K-12',
    recentObituaries: 12,
    description: 'Community Jewish day school serving the Dallas area with academic excellence.'
  },
  {
    id: '4',
    name: 'Solomon Schechter School',
    city: 'Boston',
    state: 'MA',
    type: 'Day School',
    level: 'K-8',
    recentObituaries: 10,
    description: 'Conservative Jewish day school fostering love of learning and Jewish values.'
  },
  {
    id: '5',
    name: 'Maimonides School',
    city: 'Brookline',
    state: 'MA',
    type: 'Day School',
    level: 'K-12',
    recentObituaries: 14,
    description: 'Co-educational Modern Orthodox day school with rigorous academics and Torah studies.'
  },
  {
    id: '6',
    name: 'Donna Klein Jewish Academy',
    city: 'Boca Raton',
    state: 'FL',
    type: 'Day School',
    level: 'K-12',
    recentObituaries: 11,
    description: 'Pluralistic Jewish day school in South Florida, welcoming all streams of Judaism.'
  }
];

const Schools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredSchools = mockSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'all' || school.state === selectedState;
    const matchesType = selectedType === 'all' || school.type === selectedType;
    return matchesSearch && matchesState && matchesType;
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
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="MA">Massachusetts</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Day School">Day School</SelectItem>
                    <SelectItem value="Hebrew School">Hebrew School</SelectItem>
                    <SelectItem value="Yeshiva">Yeshiva</SelectItem>
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
                          <CardTitle className="text-2xl mb-2">
                            <Link href={`/communities/school/${school.id}`} className="hover:text-primary">
                              {school.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-base mb-2">
                            <MapPin className="h-4 w-4" />
                            {school.city}, {school.state}
                          </CardDescription>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{school.type}</Badge>
                            <Badge variant="outline">{school.level}</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Bell className="h-4 w-4" />
                          Follow
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{school.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <GraduationCap className="h-4 w-4" />
                          <span>{school.recentObituaries} alumni obituaries</span>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/communities/school/${school.id}`}>
                            View Alumni Memorial Page
                          </Link>
                        </Button>
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
