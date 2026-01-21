'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Phone, Globe, CheckCircle, Star, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { generateFuneralHomeSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema';

interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  featured: boolean;
  verified: boolean;
  services: { name: string }[] | null;
}

const mockFuneralHomes = [
  {
    id: 'neshama',
    name: 'Neshama Jewish Funeral Services',
    city: 'Multiple Locations',
    state: 'NY',
    address: 'Serving the Greater New York Area',
    zip: '',
    phone: '(855) NESHAMA',
    website: 'www.neshamajfs.com',
    websiteUrl: 'https://www.neshamajfs.com/',
    denomination: 'All Denominations',
    kosherCertified: true,
    chevraKadisha: true,
    rating: 5.0,
    recentObituaries: 156,
    featured: true,
    description: 'Neshama provides compassionate, dignified Jewish funeral services with the highest standards of care. Our team is available 24/7 to guide families through every step with wisdom, warmth, and deep respect for tradition.',
    services: ['24/7 Availability', 'All Denominations Welcome', 'Chevra Kadisha On-Site', 'Kosher Certified', 'Pre-Planning Services', 'Grief Counseling', 'Traditional & Contemporary Services', 'Cemetery Arrangements']
  },
  {
    id: '1',
    name: 'Riverside Memorial Chapel',
    city: 'New York',
    state: 'NY',
    address: '180 West 76th Street',
    zip: '10023',
    phone: '(212) 362-6600',
    website: 'www.riversidememorialchapel.com',
    denomination: 'All Denominations',
    kosherCertified: true,
    chevraKadisha: true,
    rating: 4.8,
    recentObituaries: 23,
    description: 'Serving the Jewish community since 1897 with dignity and respect. Full-service funeral home with on-site Chevra Kadisha.',
    services: ['Traditional Jewish Funerals', 'Chevra Kadisha On-Site', 'Pre-Planning Services', 'Grief Counseling', 'Kosher Certified']
  },
  {
    id: '2',
    name: 'Levine Memorial Chapel',
    city: 'Brookline',
    state: 'MA',
    address: '649 Washington Street',
    zip: '02445',
    phone: '(617) 566-9300',
    website: 'www.levinechapel.com',
    denomination: 'Orthodox, Conservative, Reform',
    kosherCertified: true,
    chevraKadisha: true,
    rating: 4.9,
    recentObituaries: 18,
    description: 'Boston area\'s premier Jewish funeral home, providing compassionate service for over 75 years.',
    services: ['All Denominations Welcome', 'Chevra Kadisha', 'Kosher Certified', 'Memorial Services', 'Estate Planning']
  },
  {
    id: '3',
    name: 'Weinstein & Piser Funeral Home',
    city: 'Los Angeles',
    state: 'CA',
    address: '111 Sycamore Avenue',
    zip: '90036',
    phone: '(323) 938-6616',
    website: 'www.weinsteinpiser.com',
    denomination: 'All Denominations',
    kosherCertified: true,
    chevraKadisha: false,
    rating: 4.7,
    recentObituaries: 31,
    description: 'Serving Los Angeles Jewish families with integrity since 1947. Traditional and contemporary services available.',
    services: ['Traditional Services', 'Kosher Certified', 'Cemetery Services', 'Pre-Need Planning', 'Online Tributes']
  },
  {
    id: '4',
    name: 'Ira Kaufman Chapel',
    city: 'Detroit',
    state: 'MI',
    address: '18325 West Nine Mile Road',
    zip: '48075',
    phone: '(248) 569-0020',
    website: 'www.irakaufman.com',
    denomination: 'Orthodox, Conservative, Reform',
    kosherCertified: true,
    chevraKadisha: true,
    rating: 4.8,
    recentObituaries: 15,
    description: 'Family-owned and operated, providing personal attention and traditional Jewish funeral services.',
    services: ['Chevra Kadisha Available', 'Kosher Facilities', 'All Denominations', 'Memorial Services', 'Video Tributes']
  },
  {
    id: '5',
    name: 'Mount Sinai Memorial Parks and Mortuaries',
    city: 'Los Angeles',
    state: 'CA',
    address: '5950 Forest Lawn Drive',
    zip: '90068',
    phone: '(800) 600-0076',
    website: 'www.mountsinaiparks.org',
    denomination: 'All Denominations',
    kosherCertified: true,
    chevraKadisha: true,
    rating: 4.6,
    recentObituaries: 42,
    description: 'Southern California\'s largest provider of Jewish funeral and cemetery services with multiple locations.',
    services: ['Multiple Locations', 'Cemetery & Funeral Services', 'Chevra Kadisha', 'Pre-Planning', 'Monument Services']
  },
  {
    id: '6',
    name: 'Berkowitz-Kumin-Bookatz',
    city: 'Cleveland',
    state: 'OH',
    address: '1985 South Taylor Road',
    zip: '44118',
    phone: '(216) 932-7900',
    website: 'www.funeral-alternative.com',
    denomination: 'All Denominations',
    kosherCertified: true,
    chevraKadisha: true,
    rating: 4.9,
    recentObituaries: 12,
    description: 'Cleveland\'s most trusted Jewish funeral home, serving families with compassion for over 100 years.',
    services: ['Traditional Services', 'Chevra Kadisha', 'Kosher Certified', 'Grief Support', 'Pre-Arrangements']
  }
];

const FuneralHomes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDenomination, setSelectedDenomination] = useState('all');
  const [kosherOnly, setKosherOnly] = useState(false);
  const [dbVendors, setDbVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      try {
        // Get the funeral home type ID
        const { data: typeData } = await supabase
          .from('vendor_types' as any)
          .select('id')
          .eq('slug', 'funeral-home')
          .single();

        if (typeData) {
          const { data: vendors } = await supabase
            .from('vendors' as any)
            .select('*')
            .eq('type_id', (typeData as any).id)
            .eq('status', 'active')
            .order('featured', { ascending: false })
            .order('sort_order', { ascending: true });

          if (vendors && vendors.length > 0) {
            setDbVendors(vendors as unknown as Vendor[]);
          }
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchVendors();
  }, []);

  // Transform database vendors to match mockFuneralHomes format
  const transformedDbVendors = dbVendors.map(v => ({
    id: v.id,
    name: v.name,
    city: v.city || '',
    state: v.state || '',
    address: v.address || '',
    zip: v.zip || '',
    phone: v.phone || '',
    website: v.website?.replace(/^https?:\/\//, '') || '',
    websiteUrl: v.website || '',
    denomination: 'All Denominations',
    kosherCertified: v.verified,
    chevraKadisha: false,
    rating: 4.8,
    recentObituaries: 0,
    featured: v.featured,
    description: v.description || '',
    services: v.services ? (v.services as { name: string }[]).map(s => s.name) : []
  }));

  // Use database vendors if available, otherwise use mockFuneralHomes
  const allHomes = dbVendors.length > 0 ? transformedDbVendors : mockFuneralHomes;

  const filteredHomes = allHomes
    .filter(home => {
      const matchesSearch = home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           home.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = selectedState === 'all' || home.state === selectedState;
      const matchesKosher = !kosherOnly || home.kosherCertified;
      return matchesSearch && matchesState && matchesKosher;
    })
    .sort((a, b) => {
      // Always put featured homes (Neshama) first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

  // Generate LocalBusiness schema for each funeral home
  const funeralHomeSchemas = useMemo(() => {
    return allHomes.slice(0, 10).map(home => generateFuneralHomeSchema({
      name: home.name,
      description: home.description,
      url: home.websiteUrl || `https://${home.website}`,
      phone: home.phone,
      address: {
        street: home.address,
        city: home.city,
        state: home.state,
        zip: home.zip,
        country: 'US',
      },
      priceRange: '$$',
    }));
  }, [allHomes]);

  // Generate breadcrumb schema
  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jewishobituary.com' },
    { name: 'Funeral Homes', url: 'https://jewishobituary.com/funeral-homes' },
  ]), []);

  // Generate ItemList schema for the directory
  const directorySchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Jewish Funeral Home Directory',
    description: 'Find trusted funeral homes serving the Jewish community in the United States',
    numberOfItems: allHomes.length,
    itemListElement: allHomes.slice(0, 10).map((home, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'FuneralHome',
        name: home.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: home.address,
          addressLocality: home.city,
          addressRegion: home.state,
          postalCode: home.zip,
          addressCountry: 'US',
        },
        telephone: home.phone,
        url: home.websiteUrl || `https://${home.website}`,
      },
    })),
  }), [allHomes]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Schema.org structured data for rich search results */}
      <Script
        id="directory-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(directorySchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Jewish Funeral Home Directory
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find trusted funeral homes serving the Jewish community. Compare services, read reviews, and make informed decisions during difficult times.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name or city..."
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
                    <SelectItem value="MA">Massachusetts</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="OH">Ohio</SelectItem>
                    <SelectItem value="MI">Michigan</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={kosherOnly ? "default" : "outline"}
                  onClick={() => setKosherOnly(!kosherOnly)}
                >
                  {kosherOnly ? "✓ " : ""}Kosher Certified
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Badge */}
        <section className="py-6 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span>All listed funeral homes are verified and trusted by the Jewish community</span>
              </div>
            </div>
          </div>
        </section>

        {/* Funeral Home Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredHomes.length} funeral home{filteredHomes.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid gap-6">
                {filteredHomes.map((home) => (
                  <Card
                    key={home.id}
                    className={`hover:shadow-lg transition-all ${
                      home.featured
                        ? 'border-2 border-primary/40 shadow-xl bg-gradient-to-br from-primary/5 via-background to-primary/5 relative overflow-hidden'
                        : ''
                    }`}
                  >
                    {home.featured && (
                      <>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16" />
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-primary text-primary-foreground shadow-lg">
                            <Star className="h-3 w-3 mr-1 fill-current" />
                            Featured Partner
                          </Badge>
                        </div>
                      </>
                    )}
                    <CardHeader className={home.featured ? 'relative z-10' : ''}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className={`mb-2 ${home.featured ? 'text-3xl' : 'text-2xl'}`}>
                            {home.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-base mb-2">
                            <MapPin className="h-4 w-4" />
                            {home.address}{home.city && `, ${home.city}`}{home.state && `, ${home.state}`} {home.zip}
                          </CardDescription>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {home.kosherCertified && (
                              <Badge variant="secondary">Kosher Certified</Badge>
                            )}
                            {home.chevraKadisha && (
                              <Badge variant="secondary">Chevra Kadisha</Badge>
                            )}
                            <Badge variant="outline" className="gap-1">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              {home.rating}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{home.description}</p>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm">Services Offered:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {home.services.map((service, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                              {service}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${home.phone}`} className="hover:text-primary">
                              {home.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Globe className="h-4 w-4" />
                            <a
                              href={home.websiteUrl || `https://${home.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary"
                            >
                              {home.website}
                            </a>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/communities/funeral-home/${home.id}`}>
                              View {home.recentObituaries} Obituaries
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            className={home.featured ? 'bg-primary hover:bg-primary/90 shadow-md' : ''}
                            asChild
                          >
                            <a
                              href={home.websiteUrl || `https://${home.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit Website
                            </a>
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
            <h2 className="text-3xl font-bold mb-4">Funeral Home Owners</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our directory and connect with families in need of your compassionate services.
              Learn about our partnership program for funeral homes.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Partner With Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FuneralHomes;
