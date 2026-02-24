'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Star,
  Clock,
  ArrowLeft,
  Building2,
  Calendar,
  Users,
  ExternalLink,
  Send,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { generateFuneralHomeSchema, generateBreadcrumbSchema, schemaToString } from '@/lib/schema';
import { useToast } from '@/hooks/use-toast';

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
  logo_url: string | null;
  featured: boolean;
  verified: boolean;
  status: string;
  services: { name: string }[] | null;
  hours: Record<string, string> | null;
  created_at: string;
}

// Mock data for fallback (matches funeral-homes page)
const mockFuneralHomes: Record<string, Vendor & { services: { name: string }[] }> = {
  'neshama': {
    id: 'neshama',
    name: 'Neshama Jewish Funeral Services',
    slug: 'neshama',
    description: 'Neshama provides compassionate, dignified Jewish funeral services with the highest standards of care. Our team is available 24/7 to guide families through every step with wisdom, warmth, and deep respect for tradition. We serve families of all Jewish denominations throughout the Greater New York Area, offering traditional tahara and chevra kadisha services performed with the utmost reverence.',
    short_description: 'Compassionate Jewish funeral services serving all denominations',
    phone: '(855) NESHAMA',
    email: 'info@neshamajfs.com',
    website: 'https://www.neshamajfs.com/',
    address: 'Serving the Greater New York Area',
    city: 'Multiple Locations',
    state: 'NY',
    zip: '',
    logo_url: null,
    featured: true,
    verified: true,
    status: 'active',
    services: [
      { name: '24/7 Availability' },
      { name: 'All Denominations Welcome' },
      { name: 'Chevra Kadisha On-Site' },
      { name: 'Kosher Certified' },
      { name: 'Pre-Planning Services' },
      { name: 'Grief Counseling' },
      { name: 'Traditional & Contemporary Services' },
      { name: 'Cemetery Arrangements' },
    ],
    hours: {
      'Monday-Friday': '24 Hours',
      'Saturday': 'After Shabbat',
      'Sunday': '24 Hours',
    },
    created_at: '2024-01-01',
  },
};

export default function VendorDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { toast } = useToast();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchVendor() {
      try {
        const { data, error } = await supabase
          .from('vendors' as any)
          .select('*')
          .eq('slug', slug)
          .eq('status', 'active')
          .single();

        if (data) {
          setVendor(data as unknown as Vendor);
        } else if (mockFuneralHomes[slug]) {
          // Fallback to mock data
          setVendor(mockFuneralHomes[slug]);
        }
      } catch (error) {
        // Try mock data on error
        if (mockFuneralHomes[slug]) {
          setVendor(mockFuneralHomes[slug]);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchVendor();
  }, [slug]);

  // Track page view
  useEffect(() => {
    if (vendor) {
      trackVendorView(vendor.id);
    }
  }, [vendor]);

  async function trackVendorView(vendorId: string) {
    try {
      await supabase.from('vendor_leads' as any).insert({
        vendor_id: vendorId,
        lead_type: 'page_view',
        source_page: `/funeral-homes/${slug}`,
      });
    } catch (error) {
      // Silently fail - tracking should not affect user experience
    }
  }

  async function trackClick(vendorId: string, clickType: 'phone' | 'website' | 'email') {
    try {
      await supabase.from('vendor_leads' as any).insert({
        vendor_id: vendorId,
        lead_type: `click_${clickType}`,
        source_page: `/funeral-homes/${slug}`,
      });
    } catch (error) {
      // Silently fail
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Track as contact lead
      await supabase.from('vendor_leads' as any).insert({
        vendor_id: vendor?.id,
        lead_type: 'contact_form',
        source_page: `/funeral-homes/${slug}`,
        lead_data: contactForm,
      });

      // Also save to contact_submissions
      await supabase.from('contact_submissions' as any).insert({
        name: contactForm.name,
        email: contactForm.email,
        subject: `Inquiry for ${vendor?.name}`,
        message: `Phone: ${contactForm.phone}\n\n${contactForm.message}`,
      });

      toast({
        title: 'Message Sent',
        description: 'The funeral home will contact you shortly.',
      });

      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  }

  // Generate schema
  const funeralHomeSchema = useMemo(() => {
    if (!vendor) return null;
    return generateFuneralHomeSchema({
      name: vendor.name,
      description: vendor.description || vendor.short_description || '',
      url: vendor.website || `https://jewishobituary.com/funeral-homes/${vendor.slug}`,
      phone: vendor.phone || '',
      address: {
        street: vendor.address || '',
        city: vendor.city || '',
        state: vendor.state || '',
        zip: vendor.zip || '',
        country: 'US',
      },
      priceRange: '$$',
    });
  }, [vendor]);

  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jewishobituary.com' },
    { name: 'Funeral Homes', url: 'https://jewishobituary.com/funeral-homes' },
    { name: vendor?.name || 'Funeral Home', url: `https://jewishobituary.com/funeral-homes/${slug}` },
  ]), [vendor, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Funeral Home Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The funeral home you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/funeral-homes">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Directory
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const services = vendor.services || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {funeralHomeSchema && (
        <Script
          id="funeral-home-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaToString(funeralHomeSchema) }}
        />
      )}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(breadcrumbSchema) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link href="/funeral-homes" className="hover:text-foreground">Funeral Homes</Link>
              <span>/</span>
              <span className="text-foreground">{vendor.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className={`py-12 ${vendor.featured ? 'bg-gradient-to-b from-primary/10 to-background' : 'bg-gradient-to-b from-muted/50 to-background'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-6">
                {vendor.logo_url ? (
                  <img
                    src={vendor.logo_url}
                    alt={vendor.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-primary" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      {vendor.name}
                    </h1>
                    {vendor.featured && (
                      <Badge className="bg-primary">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    )}
                    {vendor.verified && (
                      <Badge variant="secondary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground mb-4">
                    {vendor.short_description || 'Jewish Funeral Services'}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {vendor.city && vendor.state && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {vendor.city}, {vendor.state}
                      </div>
                    )}
                    {vendor.phone && (
                      <a
                        href={`tel:${vendor.phone}`}
                        className="flex items-center gap-2 text-primary hover:underline"
                        onClick={() => trackClick(vendor.id, 'phone')}
                      >
                        <Phone className="h-4 w-4" />
                        {vendor.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="md:col-span-2 space-y-8">
                  {/* About */}
                  <Card>
                    <CardHeader>
                      <CardTitle>About {vendor.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {vendor.description || 'No description available.'}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Services */}
                  {services.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Services Offered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {services.map((service, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{typeof service === 'string' ? service : service.name}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Hours */}
                  {vendor.hours && Object.keys(vendor.hours).length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Hours of Operation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {Object.entries(vendor.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="font-medium">{day}</span>
                              <span className="text-muted-foreground">{hours}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right Column - Contact */}
                <div className="space-y-6">
                  {/* Contact Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {vendor.address && (
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p>{vendor.address}</p>
                            {vendor.city && vendor.state && (
                              <p>{vendor.city}, {vendor.state} {vendor.zip}</p>
                            )}
                          </div>
                        </div>
                      )}
                      {vendor.phone && (
                        <a
                          href={`tel:${vendor.phone}`}
                          className="flex items-center gap-3 hover:text-primary"
                          onClick={() => trackClick(vendor.id, 'phone')}
                        >
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <span>{vendor.phone}</span>
                        </a>
                      )}
                      {vendor.email && (
                        <a
                          href={`mailto:${vendor.email}`}
                          className="flex items-center gap-3 hover:text-primary"
                          onClick={() => trackClick(vendor.id, 'email')}
                        >
                          <Mail className="h-5 w-5 text-muted-foreground" />
                          <span>{vendor.email}</span>
                        </a>
                      )}
                      {vendor.website && (
                        <a
                          href={vendor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 hover:text-primary"
                          onClick={() => trackClick(vendor.id, 'website')}
                        >
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <span className="truncate">Visit Website</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </CardContent>
                  </Card>

                  {/* Contact Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Send a Message</CardTitle>
                      <CardDescription>
                        Get in touch with {vendor.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Your Name</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            rows={4}
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={submitting}>
                          {submitting ? (
                            'Sending...'
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Back to Directory */}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/funeral-homes">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Directory
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
