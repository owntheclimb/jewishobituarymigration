import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { supabasePublic } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  Star,
  Phone,
  Globe,
  MapPin,
  CheckCircle,
  Building2,
  Heart,
  Scale,
  Flower2,
  UtensilsCrossed,
  Landmark,
  TreePine,
  HeartPulse
} from 'lucide-react';
import { generateBreadcrumbSchema, generateFAQSchema, schemaToString } from '@/lib/schema';
import ReactMarkdown from 'react-markdown';

interface IndustryPage {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  hero_heading: string | null;
  hero_subheading: string | null;
  intro_content: string | null;
  educational_content: string | null;
  faq_content: { question: string; answer: string }[] | null;
  vendor_type_id: string | null;
  related_industries: string[] | null;
  is_published: boolean;
  sort_order: number;
}

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
  tier: string | null;
  services: { name: string }[] | null;
}

interface VendorType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

// Icon mapping for vendor types
const iconMap: Record<string, React.ElementType> = {
  Building2: Building2,
  Heart: Heart,
  Scale: Scale,
  Flower2: Flower2,
  UtensilsCrossed: UtensilsCrossed,
  Landmark: Landmark,
  TreePine: TreePine,
  Star: Star,
  HeartPulse: HeartPulse,
};

// Mock vendors for display when database is empty
const mockVendorsByType: Record<string, Vendor[]> = {
  'funeral-home': [
    {
      id: 'neshama',
      name: 'Neshama Jewish Funeral Services',
      slug: 'neshama',
      description: 'Neshama provides compassionate, dignified Jewish funeral services with the highest standards of care.',
      phone: '(855) NESHAMA',
      email: 'info@neshamajfs.com',
      website: 'https://www.neshamajfs.com',
      address: 'Serving the Greater New York Area',
      city: 'Multiple Locations',
      state: 'NY',
      zip: '',
      featured: true,
      verified: true,
      tier: 'featured',
      services: [{ name: '24/7 Availability' }, { name: 'Chevra Kadisha' }, { name: 'All Denominations' }],
    },
  ],
};

async function getIndustryPage(slug: string): Promise<IndustryPage | null> {
  const { data, error } = await supabasePublic
    .from('industry_pages' as any)
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) {
    return null;
  }

  return data as unknown as IndustryPage;
}

async function getVendorType(id: string): Promise<VendorType | null> {
  const { data } = await supabasePublic
    .from('vendor_types' as any)
    .select('*')
    .eq('id', id)
    .single();

  return data as unknown as VendorType | null;
}

async function getVendors(vendorTypeId: string): Promise<Vendor[]> {
  const { data } = await supabasePublic
    .from('vendors' as any)
    .select('*')
    .eq('type_id', vendorTypeId)
    .eq('status', 'active')
    .order('featured', { ascending: false })
    .order('tier', { ascending: false })
    .order('sort_order', { ascending: true })
    .limit(10);

  return (data || []) as unknown as Vendor[];
}

async function getRelatedPages(slugs: string[]): Promise<IndustryPage[]> {
  if (!slugs || slugs.length === 0) return [];

  const { data } = await supabasePublic
    .from('industry_pages' as any)
    .select('id, slug, title, hero_subheading')
    .in('slug', slugs)
    .eq('is_published', true);

  return (data || []) as unknown as IndustryPage[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getIndustryPage(slug);

  if (!page) {
    return {
      title: 'Industry Not Found | Jewish Obits',
    };
  }

  return {
    title: `${page.title} | Jewish Obits`,
    description: page.meta_description || `Find trusted ${page.title.toLowerCase()} serving the Jewish community.`,
    openGraph: {
      title: `${page.title} | Jewish Obits`,
      description: page.meta_description || `Find trusted ${page.title.toLowerCase()} serving the Jewish community.`,
      type: 'website',
      url: `https://jewishobituary.com/services/${slug}`,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getIndustryPage(slug);

  if (!page) {
    notFound();
  }

  let vendorType: VendorType | null = null;
  let vendors: Vendor[] = [];

  if (page.vendor_type_id) {
    vendorType = await getVendorType(page.vendor_type_id);
    vendors = await getVendors(page.vendor_type_id);
  }

  // Use mock data if no vendors in database
  if (vendors.length === 0 && vendorType) {
    vendors = mockVendorsByType[vendorType.slug] || [];
  }

  const relatedPages = await getRelatedPages(page.related_industries || []);

  // Generate schema markup
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jewishobituary.com' },
    { name: 'Services', url: 'https://jewishobituary.com/services' },
    { name: page.title, url: `https://jewishobituary.com/services/${slug}` },
  ]);

  const faqSchema = page.faq_content && page.faq_content.length > 0
    ? generateFAQSchema(page.faq_content)
    : null;

  // Service schema for the page
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.meta_description || page.intro_content,
    provider: {
      '@type': 'Organization',
      name: 'Jewish Obituary',
      url: 'https://jewishobituary.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: page.hero_heading || page.title,
  };

  const IconComponent = vendorType?.icon ? iconMap[vendorType.icon] || Building2 : Building2;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Schema.org structured data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(breadcrumbSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(serviceSchema) }}
      />
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaToString(faqSchema) }}
        />
      )}

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-background py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/services" className="hover:text-primary">Services</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">{page.title}</span>
              </nav>

              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full">
                  <IconComponent className="h-12 w-12 text-primary" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {page.hero_heading || page.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {page.hero_subheading || `Professional services for the Jewish community`}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        {page.intro_content && (
          <section className="py-12 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {page.intro_content}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Featured Vendors */}
        {vendors.length > 0 && (
          <section className="py-12 bg-card">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Featured Providers</h2>
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    Verified & Trusted
                  </Badge>
                </div>

                <div className="grid gap-6">
                  {vendors.map((vendor) => (
                    <Card
                      key={vendor.id}
                      className={`hover:shadow-lg transition-all ${
                        vendor.featured || vendor.tier === 'featured'
                          ? 'border-2 border-primary/40 shadow-xl bg-gradient-to-br from-primary/5 via-background to-primary/5'
                          : ''
                      }`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-2xl">{vendor.name}</CardTitle>
                              {(vendor.featured || vendor.tier === 'featured') && (
                                <Badge className="bg-primary text-primary-foreground">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  Featured
                                </Badge>
                              )}
                              {vendor.verified && (
                                <Badge variant="outline" className="gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            {(vendor.city || vendor.state) && (
                              <CardDescription className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {[vendor.address, vendor.city, vendor.state].filter(Boolean).join(', ')}
                              </CardDescription>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {vendor.description && (
                          <p className="text-muted-foreground mb-4">{vendor.description}</p>
                        )}

                        {vendor.services && vendor.services.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {vendor.services.slice(0, 5).map((service, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {service.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex flex-col gap-2 text-sm">
                            {vendor.phone && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <a href={`tel:${vendor.phone}`} className="hover:text-primary">
                                  {vendor.phone}
                                </a>
                              </div>
                            )}
                            {vendor.website && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Globe className="h-4 w-4" />
                                <a
                                  href={vendor.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary"
                                >
                                  {vendor.website.replace(/^https?:\/\//, '')}
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/${vendorType?.slug || 'vendors'}/${vendor.slug}`}>
                                View Profile
                              </Link>
                            </Button>
                            {vendor.website && (
                              <Button size="sm" asChild>
                                <a href={vendor.website} target="_blank" rel="noopener noreferrer">
                                  Visit Website
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Educational Content */}
        {page.educational_content && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown>{page.educational_content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {page.faq_content && page.faq_content.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {page.faq_content.map((faq, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Industries */}
        {relatedPages.length > 0 && (
          <section className="py-12 border-t">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Related Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedPages.map((related) => (
                    <Card key={related.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          <Link href={`/services/${related.slug}`} className="hover:text-primary">
                            {related.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.hero_subheading}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Service Providers</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our directory and connect with Jewish families seeking your services.
              Claim your listing today and reach your target audience.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/vendors/claim">Claim Your Listing</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static paths for all published industry pages
export async function generateStaticParams() {
  const { data } = await supabasePublic
    .from('industry_pages' as any)
    .select('slug')
    .eq('is_published', true);

  const pages = (data || []) as unknown as { slug: string }[];
  return pages.map((page) => ({
    slug: page.slug,
  }));
}
