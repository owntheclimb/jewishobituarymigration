'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CommunityBadge from '@/components/CommunityBadge';
import MemorialTabs from '@/components/memorial/MemorialTabs';
import ThemeDrawer from '@/components/memorial/ThemeDrawer';
import VirtualCandle from '@/components/memorial/VirtualCandle';
import YahrzeitReminder from '@/components/memorial/YahrzeitReminder';
import MemorialStats from '@/components/memorial/MemorialStats';
import PDFDownload from '@/components/memorial/PDFDownload';
import MemorialDonation from '@/components/memorial/MemorialDonation';
import { Calendar, MapPin, ArrowLeft, Heart, Share2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { CandleProvider } from '@/contexts/CandleContext';

interface Obituary {
  id: string;
  full_name: string;
  hebrew_name: string | null;
  date_of_birth: string | null;
  date_of_death: string | null;
  biography: string | null;
  funeral_details: string | null;
  location: string | null;
  photo_url: string | null;
  created_at: string | null;
  user_id: string;
  city?: string | null;
  state?: string | null;
  source?: string;
  source_url?: string;
  isExternal?: boolean;
}

interface Community {
  id: string;
  type: string;
  name: string;
  slug: string;
}

const ObituaryDetail = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { user } = useAuth();
  const [obituary, setObituary] = useState<Obituary | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showThemeDrawer, setShowThemeDrawer] = useState(false);

  useEffect(() => {
    if (id) {
      fetchObituary(id);
    }
  }, [id]);

  const fetchObituary = async (obituaryId: string) => {
    try {
      // For RSS/scraped obituaries, IDs are stored URL-encoded in the database
      // React Router decodes them, so we need to encode them back for the query
      const encodedId = encodeURIComponent(decodeURIComponent(obituaryId));

      // Try fetching from all three tables
      // 1. First try user-created obituaries (use original ID - UUIDs don't need encoding)
      const { data: userData, error: userError } = await supabase
        .from('obituaries')
        .select('*')
        .eq('id', obituaryId)
        .eq('published', true)
        .maybeSingle();

      if (userData) {
        setObituary(userData);

        // Fetch associated communities for user-created obituaries
        const { data: communityData } = await supabase
          .from('community_links')
          .select(`
            communities:community_id (
              id,
              type,
              name,
              slug
            )
          `)
          .eq('obituary_id', obituaryId);

        if (communityData) {
          setCommunities(communityData.map(link => link.communities).filter(Boolean));
        }

        setLoading(false);
        return;
      }

      // 2. Try RSS obituaries (obits table) - use encoded ID
      const { data: rssData, error: rssError } = await supabase
        .from('obits')
        .select('*')
        .eq('id', encodedId)
        .maybeSingle();

      if (rssData) {
        // Transform RSS data to match Obituary interface
        const transformedData: Obituary = {
          id: rssData.id,
          full_name: rssData.title,
          hebrew_name: null,
          date_of_birth: null,
          date_of_death: null,
          biography: rssData.summary,
          funeral_details: null,
          location: rssData.city && rssData.state ? `${rssData.city}, ${rssData.state}` : rssData.city || rssData.state || null,
          photo_url: rssData.image_url,
          created_at: rssData.created_at,
          user_id: '', // No user for external obits
          city: rssData.city,
          state: rssData.state,
          source: rssData.source_name,
          source_url: rssData.source_url,
          isExternal: true,
        };
        setObituary(transformedData);
        setLoading(false);
        return;
      }

      // 3. Try scraped obituaries - use encoded ID
      const { data: scrapedData, error: scrapedError } = await supabase
        .from('scraped_obituaries')
        .select('*')
        .eq('id', encodedId)
        .maybeSingle();

      if (scrapedData) {
        // Transform scraped data to match Obituary interface
        const transformedData: Obituary = {
          id: scrapedData.id,
          full_name: scrapedData.name,
          hebrew_name: null,
          date_of_birth: null,
          date_of_death: scrapedData.date_of_death,
          biography: scrapedData.snippet,
          funeral_details: null,
          location: scrapedData.city && scrapedData.state ? `${scrapedData.city}, ${scrapedData.state}` : scrapedData.city || scrapedData.state || null,
          photo_url: scrapedData.image_url || null,
          created_at: scrapedData.created_at,
          user_id: '', // No user for external obits
          city: scrapedData.city,
          state: scrapedData.state,
          source: scrapedData.source,
          source_url: scrapedData.source_url,
          isExternal: true,
        };
        setObituary(transformedData);
        setLoading(false);
        return;
      }

      // If not found in any table, show not found
      console.error('Obituary not found in any table');
      setNotFound(true);
    } catch (error) {
      console.error('Error:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  const getAge = (birthDate: string | null, deathDate: string | null) => {
    if (!birthDate) return '';
    const birth = new Date(birthDate);
    const death = deathDate ? new Date(deathDate) : new Date();
    const age = death.getFullYear() - birth.getFullYear();
    return age > 0 ? `, Age ${age}` : '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-muted-foreground">Loading obituary...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !obituary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <h1 className="text-3xl font-bold text-foreground mb-4">Obituary Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The obituary you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/search">
            <Button className="bg-gradient-elegant text-primary-foreground hover:shadow-glow transition-all duration-300">
              Browse All Obituaries
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const pageTitle = `${obituary.full_name} - Obituary | Neshama`;
  const pageDescription = obituary.biography
    ? obituary.biography.substring(0, 155) + '...'
    : `In loving memory of ${obituary.full_name}${obituary.date_of_birth && obituary.date_of_death ? ` (${formatDate(obituary.date_of_birth)} - ${formatDate(obituary.date_of_death)})` : ''}`;
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const pageImage = obituary.photo_url || '/placeholder-memorial.svg';

  // Parse name for schema
  const parseName = (fullName: string) => {
    const parts = fullName.split(' ');
    const givenName = parts.slice(0, -1).join(' ') || fullName;
    const familyName = parts.length > 1 ? parts[parts.length - 1] : '';
    return { givenName, familyName };
  };

  const { givenName, familyName } = parseName(obituary.full_name);

  // Person Schema for deceased individual
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": pageUrl + "#person",
    "name": obituary.full_name,
    "givenName": givenName,
    "familyName": familyName,
    ...(obituary.date_of_birth && { "birthDate": obituary.date_of_birth }),
    ...(obituary.date_of_death && { "deathDate": obituary.date_of_death }),
    ...(obituary.biography && { "description": obituary.biography.substring(0, 200) }),
    ...(obituary.photo_url && {
      "image": {
        "@type": "ImageObject",
        "url": obituary.photo_url,
        "caption": `Memorial photo of ${obituary.full_name}`
      }
    }),
    ...(obituary.location && {
      "address": {
        "@type": "PostalAddress",
        "addressLocality": obituary.city || obituary.location.split(',')[0]?.trim(),
        ...(obituary.state && { "addressRegion": obituary.state })
      }
    }),
    "memorialPage": pageUrl,
    "url": pageUrl
  };

  // Article Schema for the obituary
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Obituary: ${obituary.full_name}`,
    "description": pageDescription,
    "image": pageImage,
    "datePublished": obituary.created_at,
    "author": {
      "@type": "Organization",
      "name": obituary.source || "Jewish Obits"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jewish Obits",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jewishobituary.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "about": {
      "@id": pageUrl + "#person"
    }
  };

  return (
    <CandleProvider>
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">

      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 animate-fade-in">
            <Link href="/search">
              <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Search
              </Button>
            </Link>
          </div>

          {/* Memorial Stats */}
          <div className="mb-6 animate-fade-in">
            <MemorialStats obituaryId={obituary.id} />
          </div>

          <Card className="p-8 bg-background/80 backdrop-blur-lg border border-border/50 shadow-elegant animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {obituary.photo_url && (
                <div className="lg:col-span-1">
                  <div className="overflow-hidden rounded-lg shadow-subtle">
                    <img
                      src={obituary.photo_url}
                      alt={obituary.full_name}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}

              <div className={obituary.photo_url ? "lg:col-span-2" : "lg:col-span-3"}>
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {obituary.full_name}
                      {getAge(obituary.date_of_birth, obituary.date_of_death)}
                    </h1>
                    {obituary.hebrew_name && (
                      <p className="text-xl text-muted-foreground mb-2 font-hebrew">
                        {obituary.hebrew_name}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                      {(obituary.date_of_birth || obituary.date_of_death) && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {obituary.date_of_birth && formatDate(obituary.date_of_birth)}
                          {obituary.date_of_birth && obituary.date_of_death && ' - '}
                          {obituary.date_of_death && formatDate(obituary.date_of_death)}
                        </div>
                      )}

                      {obituary.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {obituary.location}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href).then(() => {
                            toast.success('Link copied to clipboard');
                          }).catch(() => {
                            toast.error('Failed to copy link');
                          });
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        Share Memorial
                      </Button>
                    </div>

                    {/* Community Badges */}
                    {communities.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Communities:</p>
                        <div className="flex flex-wrap gap-2">
                          {communities.map((community) => (
                            <CommunityBadge
                              key={community.id}
                              type={community.type as any}
                              name={community.name}
                              slug={community.slug}
                              variant="secondary"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {obituary.biography && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold text-foreground">Life Story</h2>
                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        {obituary.biography.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {obituary.funeral_details && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-semibold text-foreground">Service Information</h2>
                      <div className="bg-muted/20 p-4 rounded-lg border border-border/50">
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                          {obituary.funeral_details.split('\n').map((line, index) => (
                            <p key={index} className="mb-2">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* View Original Source - For External Obituaries */}
                  {obituary.isExternal && obituary.source_url && (
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        asChild
                      >
                        <a href={obituary.source_url} target="_blank" rel="noopener noreferrer">
                          View Original at {obituary.source}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  )}

                  {/* PDF Download */}
                  <div className="pt-4 border-t border-border/50">
                    <PDFDownload obituary={obituary} />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Memorial Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <VirtualCandle obituaryId={obituary.id} />
            <YahrzeitReminder
              obituaryId={obituary.id}
              deceasedName={obituary.full_name}
              hebrewName={obituary.hebrew_name ?? undefined}
              dateOfDeath={obituary.date_of_death ?? undefined}
            />
          </div>

          {/* Memorial Donation */}
          <div className="mt-6">
            <MemorialDonation deceasedName={obituary.full_name} />
          </div>

          {/* Memorial Section */}
          <div className="mt-8">
            <MemorialTabs
              obituaryId={obituary.id}
              isOwner={obituary.user_id === user?.id}
              onOpenThemeDrawer={() => setShowThemeDrawer(true)}
            />
          </div>

          <ThemeDrawer
            obituaryId={obituary.id}
            open={showThemeDrawer}
            onOpenChange={setShowThemeDrawer}
          />
        </div>
      </div>

      <Footer />
    </div>
    </CandleProvider>
  );
};

export default ObituaryDetail;
