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
import { Search, Heart, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const jewishCharities = [
  {
    id: '1',
    name: 'American Jewish Joint Distribution Committee (JDC)',
    category: 'International Aid',
    description: 'JDC works in over 70 countries to alleviate hunger and hardship, rescue Jews in danger, create lasting connections to Jewish life, and provide immediate relief and long-term development support.',
    website: 'https://www.jdc.org'
  },
  {
    id: '2',
    name: 'Jewish National Fund (JNF)',
    category: 'Israel',
    description: 'Plant trees in Israel and support environmental and community development projects throughout the Land of Israel.',
    website: 'https://www.jnf.org'
  },
  {
    id: '3',
    name: 'Hadassah Medical Organization',
    category: 'Healthcare',
    description: 'Supporting world-class hospitals in Jerusalem providing care to all people regardless of religion, ethnicity, or nationality.',
    website: 'https://www.hadassah.org'
  },
  {
    id: '4',
    name: 'United Jewish Appeal (UJA)',
    category: 'Community',
    description: 'Caring for Jews in need, strengthening Jewish identity, and supporting Israel and world Jewry.',
    website: 'https://www.ujafedny.org'
  },
  {
    id: '5',
    name: 'Yad Vashem',
    category: 'Holocaust Remembrance',
    description: 'The World Holocaust Remembrance Center, dedicated to Holocaust education, documentation, research and commemoration.',
    website: 'https://www.yadvashem.org'
  },
  {
    id: '6',
    name: 'Magen David Adom',
    category: 'Healthcare',
    description: 'Israel\'s national emergency medical, disaster, ambulance, and blood bank service.',
    website: 'https://www.afmda.org'
  }
];

const generalCharities = [
  {
    id: '7',
    name: 'American Cancer Society',
    category: 'Healthcare',
    description: 'Leading the fight for a world without cancer through research, patient support, and advocacy.',
    website: 'https://www.cancer.org'
  },
  {
    id: '8',
    name: 'American Heart Association',
    category: 'Healthcare',
    description: 'Fighting heart disease and stroke with research, education, and community programs.',
    website: 'https://www.heart.org'
  },
  {
    id: '9',
    name: 'Alzheimer\'s Association',
    category: 'Healthcare',
    description: 'Leading voluntary health organization in Alzheimer\'s care, support and research.',
    website: 'https://www.alz.org'
  },
  {
    id: '10',
    name: 'St. Jude Children\'s Research Hospital',
    category: 'Healthcare',
    description: 'Treating and defeating pediatric catastrophic diseases through research and treatment.',
    website: 'https://www.stjude.org'
  },
  {
    id: '11',
    name: 'American Red Cross',
    category: 'Humanitarian',
    description: 'Preventing and alleviating human suffering in the face of emergencies.',
    website: 'https://www.redcross.org'
  }
];

const Charities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filterCharities = (charities: typeof jewishCharities) => {
    return charities.filter(charity => {
      const matchesSearch = charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           charity.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || charity.category === selectedCategory;
      return matchesSearch && matchesCategory;
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
              <Heart className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Memorial Donations
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Honor a loved one's memory by making a charitable donation to a cause they cared about. Transform grief into meaningful action.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How Memorial Donations Work</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <CardTitle className="text-center">Choose a Charity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Browse our curated list of Jewish and general charities, or select a charity specified by the family.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <CardTitle className="text-center">Make Your Donation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Donate securely online in memory of your loved one. Choose to notify the family of your gift.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <CardTitle className="text-center">Honor Their Memory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Your donation creates a lasting legacy and supports causes that mattered to the deceased.
                  </p>
                </CardContent>
              </Card>
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
                    placeholder="Search charities..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Israel">Israel</SelectItem>
                    <SelectItem value="Community">Community</SelectItem>
                    <SelectItem value="International Aid">International Aid</SelectItem>
                    <SelectItem value="Holocaust Remembrance">Holocaust Remembrance</SelectItem>
                    <SelectItem value="Humanitarian">Humanitarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Charity Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="jewish" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="jewish">Jewish Charities</TabsTrigger>
                  <TabsTrigger value="general">General Charities</TabsTrigger>
                </TabsList>

                <TabsContent value="jewish" className="space-y-6">
                  {filterCharities(jewishCharities).map((charity) => (
                    <Card key={charity.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-2xl mb-2">{charity.name}</CardTitle>
                            <CardDescription className="text-base">
                              <Badge variant="secondary" className="mb-2">{charity.category}</Badge>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{charity.description}</p>

                        <div className="flex gap-2 pt-4 border-t">
                          <Button
                            className="flex-1"
                            size="lg"
                            onClick={() => {
                              toast.success('Opening donation page...', {
                                description: 'You will be redirected to the charity\'s secure donation portal.'
                              });
                              window.open(charity.website, '_blank');
                            }}
                          >
                            <Heart className="mr-2 h-4 w-4" />
                            Donate in Memory
                          </Button>
                          <Button variant="outline" size="lg" asChild>
                            <a href={charity.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Visit Website
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="general" className="space-y-6">
                  {filterCharities(generalCharities).map((charity) => (
                    <Card key={charity.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-2xl mb-2">{charity.name}</CardTitle>
                            <CardDescription className="text-base">
                              <Badge variant="secondary" className="mb-2">{charity.category}</Badge>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{charity.description}</p>

                        <div className="flex gap-2 pt-4 border-t">
                          <Button
                            className="flex-1"
                            size="lg"
                            onClick={() => {
                              toast.success('Opening donation page...', {
                                description: 'You will be redirected to the charity\'s secure donation portal.'
                              });
                              window.open(charity.website, '_blank');
                            }}
                          >
                            <Heart className="mr-2 h-4 w-4" />
                            Donate in Memory
                          </Button>
                          <Button variant="outline" size="lg" asChild>
                            <a href={charity.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Visit Website
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Charities;
