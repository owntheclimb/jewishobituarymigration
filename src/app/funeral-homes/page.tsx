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
import { Search, MapPin, Phone, Globe, CheckCircle, Star, Loader2, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { generateFuneralHomeSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema';

interface Vendor {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
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

const FuneralHomes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [vendors, setVendors] = useState<Vendor[]>([]);
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
          const { data: vendorData, error } = await supabase
            .from('vendors' as any)
            .select('*')
            .eq('type_id', (typeData as any).id)
            .eq('status', 'active')
            .order('featured', { ascending: false })
            .order('name', { ascending: true });

          if (error) {
            console.error('Error fetching vendors:', error);
          } else if (vendorData) {
            setVendors(vendorData as unknown as Vendor[]);
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

  // Get unique states for filter
  const states = [...new Set(vendors.map(v => v.state).filter(Boolean))].sort();

  const filteredHomes = vendors
    .filter(home => {
      const matchesSearch = home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (home.city?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      const matchesState = selectedState === 'all' || home.state === selectedState;
      const matchesVerified = !verifiedOnly || home.verified;
      return matchesSearch && matchesState && matchesVerified;
    })
    .sort((a, b) => {
      // Always put featured homes first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

  // Generate LocalBusiness schema for each funeral home
  const funeralHomeSchemas = useMemo(() => {
    return vendors.slice(0, 10).map(home => generateFuneralHomeSchema({
      name: home.name,
      description: home.description || '',
      url: home.website || '',
      phone: home.phone || '',
      address: {
        street: home.address || '',
        city: home.city || '',
        state: home.state || '',
        zip: home.zip || '',
        country: 'US',
      },
      priceRange: '$$',
    }));
  }, [vendors]);

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
    numberOfItems: vendors.length,
    itemListElement: vendors.slice(0, 10).map((home, index) => ({
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
        url: home.website,
      },
    })),
  }), [vendors]);

  // Helper to extract services from JSONB
  const getServices = (services: { name: string }[] | null): string[] => {
    if (!services) return [];
    return services.map(s => s.name);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Schema.org structured data for rich search results */}
      {vendors.length > 0 && (
        <>
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
        </>
      )}

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
                Find trusted funeral homes serving the Jewish community. Compare services and make informed decisions during difficult times.
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
                    {states.map(state => (
                      <SelectItem key={state} value={state!}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant={verifiedOnly ? "default" : "outline"}
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                >
                  {verifiedOnly ? "✓ " : ""}Verified Only
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
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredHomes.length === 0 ? (
                <div className="text-center py-20">
                  <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No funeral homes found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || selectedState !== 'all' || verifiedOnly
                      ? 'Try adjusting your search or filters'
                      : 'We are actively adding funeral homes to our directory'}
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setSelectedState('all');
                    setVerifiedOnly(false);
                  }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      Showing {filteredHomes.length} funeral home{filteredHomes.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {filteredHomes.map((home) => {
                      const services = getServices(home.services);
                      return (
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
                                <CardTitle className={`mb-2 flex items-center gap-2 ${home.featured ? 'text-3xl' : 'text-2xl'}`}>
                                  {home.name}
                                  {home.verified && (
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                  )}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 text-base mb-2">
                                  <MapPin className="h-4 w-4" />
                                  {home.address}{home.city && `, ${home.city}`}{home.state && `, ${home.state}`} {home.zip}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{home.description || home.short_description}</p>

                            {services.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-semibold mb-2 text-sm">Services Offered:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {services.map((service, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                                      {service}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t">
                              <div className="flex flex-col gap-2 text-sm">
                                {home.phone && (
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <a href={`tel:${home.phone}`} className="hover:text-primary">
                                      {home.phone}
                                    </a>
                                  </div>
                                )}
                                {home.website && (
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Globe className="h-4 w-4" />
                                    <a
                                      href={home.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-primary"
                                    >
                                      {home.website.replace(/^https?:\/\//, '')}
                                    </a>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {home.website && (
                                  <Button
                                    size="sm"
                                    className={home.featured ? 'bg-primary hover:bg-primary/90 shadow-md' : ''}
                                    asChild
                                  >
                                    <a
                                      href={home.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Visit Website
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Funeral Home Owners</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our directory and connect with families in need of your compassionate services.
              Contact us to get your funeral home listed.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FuneralHomes;
