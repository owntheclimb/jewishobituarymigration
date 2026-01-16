'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Bell, Heart } from 'lucide-react';

const mockOrganizations = [
  {
    id: '1',
    name: 'Hadassah',
    category: 'Women\'s Organization',
    recentObituaries: 42,
    description: 'The Women\'s Zionist Organization of America, empowering Jewish women and supporting healthcare and education in Israel.',
    founded: 1912
  },
  {
    id: '2',
    name: 'B\'nai B\'rith',
    category: 'Service Organization',
    recentObituaries: 35,
    description: 'The oldest Jewish service organization in the world, committed to community service and supporting Israel.',
    founded: 1843
  },
  {
    id: '3',
    name: 'Jewish War Veterans of the USA',
    category: 'Veterans',
    recentObituaries: 28,
    description: 'Honoring Jewish men and women who have served in the United States Armed Forces.',
    founded: 1896
  },
  {
    id: '4',
    name: 'American Jewish Committee',
    category: 'Advocacy',
    recentObituaries: 19,
    description: 'Leading global advocacy organization for the Jewish people and Israel, promoting human rights and democratic values.',
    founded: 1906
  },
  {
    id: '5',
    name: 'Jewish Community Center Association',
    category: 'Community',
    recentObituaries: 31,
    description: 'Network of JCCs providing programs, services, and facilities for Jewish communities across North America.',
    founded: 1917
  },
  {
    id: '6',
    name: 'National Council of Jewish Women',
    category: 'Women\'s Organization',
    recentObituaries: 24,
    description: 'Grassroots organization of volunteers and advocates working to improve the lives of women, children, and families.',
    founded: 1893
  },
  {
    id: '7',
    name: 'Jewish Federations of North America',
    category: 'Community',
    recentObituaries: 38,
    description: 'Umbrella organization for Jewish federations and communities across North America.',
    founded: 1932
  },
  {
    id: '8',
    name: 'ORT America',
    category: 'Education',
    recentObituaries: 16,
    description: 'Supporting Jewish education and vocational training worldwide through ORT\'s global network.',
    founded: 1880
  }
];

const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrganizations = mockOrganizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
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
                          <CardTitle className="text-2xl mb-2">
                            <Link href={`/communities/organization/${org.id}`} className="hover:text-primary">
                              {org.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-base mb-2">
                            Founded {org.founded}
                          </CardDescription>
                          <Badge variant="secondary">{org.category}</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Bell className="h-4 w-4" />
                          Follow
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{org.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Heart className="h-4 w-4" />
                          <span>{org.recentObituaries} member obituaries</span>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/communities/organization/${org.id}`}>
                            View Memorial Page
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
