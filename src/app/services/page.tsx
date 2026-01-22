import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { supabasePublic } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Heart,
  Scale,
  Flower2,
  UtensilsCrossed,
  Landmark,
  TreePine,
  Star,
  HeartPulse,
  Gavel,
  ChevronRight
} from 'lucide-react';
import { generateBreadcrumbSchema, schemaToString } from '@/lib/schema';

interface IndustryPage {
  id: string;
  slug: string;
  title: string;
  hero_subheading: string | null;
  intro_content: string | null;
  vendor_type_id: string | null;
  sort_order: number;
  vendor_type?: {
    icon: string | null;
    slug: string;
  }[] | null;
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
  Gavel: Gavel,
};

const defaultIcon = Building2;

export const metadata: Metadata = {
  title: 'Jewish Funeral & Memorial Services Directory | Jewish Obits',
  description: 'Find trusted funeral homes, rabbis, grief counselors, florists, caterers, and other service providers for the Jewish community.',
  openGraph: {
    title: 'Jewish Funeral & Memorial Services Directory | Jewish Obits',
    description: 'Find trusted funeral homes, rabbis, grief counselors, florists, caterers, and other service providers for the Jewish community.',
    type: 'website',
    url: 'https://jewishobituary.com/services',
  },
};

async function getIndustryPages(): Promise<IndustryPage[]> {
  const { data } = await supabasePublic
    .from('industry_pages' as any)
    .select(`
      id,
      slug,
      title,
      hero_subheading,
      intro_content,
      vendor_type_id,
      sort_order,
      vendor_type:vendor_types(icon, slug)
    `)
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  return (data || []) as unknown as IndustryPage[];
}

export default async function ServicesPage() {
  const industries = await getIndustryPages();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jewishobituary.com' },
    { name: 'Services', url: 'https://jewishobituary.com/services' },
  ]);

  // Organize industries by category
  const categories = {
    'Funeral & Memorial': ['funeral-homes', 'cemeteries', 'monuments', 'chevra-kadisha', 'funeral-musicians'],
    'Professional Services': ['estate-planning-attorneys', 'probate-attorneys', 'elder-law-attorneys', 'rabbis'],
    'Support Services': ['grief-counselors', 'hospice-care', 'support-groups', 'shiva-coordinators'],
    'Event Services': ['florists', 'shiva-caterers'],
    'Memorial & Legacy': ['memorial-videographers', 'obituary-writers', 'jewish-genealogists', 'yahrzeit-services'],
    'Estate Services': ['estate-sales'],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(breadcrumbSchema) }}
      />

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
                <span className="text-foreground">Services</span>
              </nav>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Jewish Funeral & Memorial Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find trusted service providers who understand and honor Jewish traditions.
                From funeral homes to grief counselors, we connect you with professionals
                serving the Jewish community.
              </p>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {Object.entries(categories).map(([categoryName, slugs]) => {
                const categoryIndustries = industries.filter((i) =>
                  slugs.includes(i.slug)
                );
                if (categoryIndustries.length === 0) return null;

                return (
                  <div key={categoryName} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
                      {categoryName}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryIndustries.map((industry) => {
                        const vendorTypeArr = industry.vendor_type as { icon: string | null; slug: string }[] | null;
                        const vendorType = vendorTypeArr?.[0] || null;
                        const iconName = vendorType?.icon || 'Building2';
                        const IconComponent = iconMap[iconName] || defaultIcon;

                        return (
                          <Link
                            key={industry.id}
                            href={`/services/${industry.slug}`}
                            className="group"
                          >
                            <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50">
                              <CardHeader>
                                <div className="flex items-start gap-4">
                                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <IconComponent className="h-6 w-6 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                      {industry.title}
                                    </CardTitle>
                                    {industry.hero_subheading && (
                                      <CardDescription className="mt-1">
                                        {industry.hero_subheading}
                                      </CardDescription>
                                    )}
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {industry.intro_content?.substring(0, 120)}...
                                </p>
                                <div className="mt-4 flex items-center text-sm text-primary font-medium">
                                  Browse Providers
                                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Show remaining industries not in categories */}
              {(() => {
                const categorizedSlugs = Object.values(categories).flat();
                const uncategorized = industries.filter(
                  (i) => !categorizedSlugs.includes(i.slug)
                );
                if (uncategorized.length === 0) return null;

                return (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
                      Additional Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {uncategorized.map((industry) => {
                        const vendorTypeArr = industry.vendor_type as { icon: string | null; slug: string }[] | null;
                        const vendorType = vendorTypeArr?.[0] || null;
                        const iconName = vendorType?.icon || 'Building2';
                        const IconComponent = iconMap[iconName] || defaultIcon;

                        return (
                          <Link
                            key={industry.id}
                            href={`/services/${industry.slug}`}
                            className="group"
                          >
                            <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50">
                              <CardHeader>
                                <div className="flex items-start gap-4">
                                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <IconComponent className="h-6 w-6 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                      {industry.title}
                                    </CardTitle>
                                    {industry.hero_subheading && (
                                      <CardDescription className="mt-1">
                                        {industry.hero_subheading}
                                      </CardDescription>
                                    )}
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {industry.intro_content?.substring(0, 120)}...
                                </p>
                                <div className="mt-4 flex items-center text-sm text-primary font-medium">
                                  Browse Providers
                                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4">For Service Providers</Badge>
            <h2 className="text-3xl font-bold mb-4">List Your Business</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Are you a service provider serving the Jewish community? Join our directory
              to connect with families who need your services.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/vendors/claim"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Claim Your Listing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
