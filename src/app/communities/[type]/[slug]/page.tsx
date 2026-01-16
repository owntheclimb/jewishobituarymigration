'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SubscribeButton from '@/components/SubscribeButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface Community {
  id: string;
  type: string;
  name: string;
  slug: string;
  description: string | null;
  stats_recent_count: number | null;
}

interface Obituary {
  id: string;
  full_name: string;
  date_of_birth: string | null;
  date_of_death: string | null;
  biography: string | null;
  location: string | null;
  photo_url: string | null;
  created_at: string;
}

interface Subscription {
  community_id: string;
}

const CommunityDetail = () => {
  const params = useParams();
  const type = params.type as string;
  const slug = params.slug as string;
  const { user } = useAuth();
  const [community, setCommunity] = useState<Community | null>(null);
  const [obituaries, setObituaries] = useState<Obituary[]>([]);
  const [relatedCommunities, setRelatedCommunities] = useState<Community[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (type && slug) {
      fetchCommunityData();
    }
  }, [type, slug, user]);

  const fetchCommunityData = async () => {
    try {
      // Fetch community
      const { data: communityData, error: communityError } = await supabase
        .from('communities')
        .select('*')
        .eq('type', type)
        .eq('slug', slug)
        .single();

      if (communityError) {
        setNotFound(true);
        return;
      }

      setCommunity(communityData);

      // Fetch obituaries for this community
      const { data: obituaryData, error: obituaryError } = await supabase
        .from('obituaries')
        .select(`
          id, full_name, date_of_birth, date_of_death, biography,
          location, photo_url, created_at
        `)
        .eq('published', true)
        .eq('visibility', 'public')
        .in('id',
          await supabase
            .from('community_links')
            .select('obituary_id')
            .eq('community_id', communityData.id)
            .then(res => res.data?.map(link => link.obituary_id) || [])
        )
        .order('created_at', { ascending: false })
        .limit(20);

      if (!obituaryError) {
        setObituaries(obituaryData || []);
      }

      // Fetch related communities of the same type
      const { data: relatedData, error: relatedError } = await supabase
        .from('communities')
        .select('*')
        .eq('type', type)
        .neq('id', communityData.id)
        .order('stats_recent_count', { ascending: false })
        .limit(5);

      if (!relatedError) {
        setRelatedCommunities(relatedData || []);
      }

      // Check subscription status
      if (user) {
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('community_id')
          .eq('user_id', user.id)
          .eq('community_id', communityData.id)
          .single();

        setSubscription(subData);
      }

    } catch (error) {
      console.error('Error fetching community data:', error);
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

  const getCommunityIcon = (type: string) => {
    switch (type) {
      case 'city': return '🏙️';
      case 'highschool': return '🎓';
      case 'college': return '🏫';
      case 'military': return '🎖️';
      default: return '';
    }
  };

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'city': return 'City';
      case 'highschool': return 'High School';
      case 'college': return 'College';
      case 'military': return 'Military Branch';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-muted-foreground">Loading community...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !community) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Community Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The community you're looking for doesn't exist.
            </p>
            <Link href="/communities">
              <Button>Browse Communities</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/communities">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Communities
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Community Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{getCommunityIcon(community.type)}</span>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{community.name}</h1>
                  <p className="text-muted-foreground">{getTypeDisplayName(community.type)}</p>
                </div>
              </div>

              {community.description && (
                <p className="text-muted-foreground mb-4">{community.description}</p>
              )}

              <div className="flex items-center space-x-4">
                <Badge variant="secondary">
                  {community.stats_recent_count} recent obituaries
                </Badge>
                <SubscribeButton
                  communityId={community.id}
                  communityName={community.name}
                  isSubscribed={!!subscription}
                />
              </div>
            </div>

            {/* Obituaries List */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Recent Obituaries</h2>
              {obituaries.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No obituaries found for this community yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {obituaries.map((obituary) => (
                    <Card key={obituary.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex space-x-4">
                        {obituary.photo_url && (
                          <div className="flex-shrink-0">
                            <img
                              src={obituary.photo_url}
                              alt={obituary.full_name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          </div>
                        )}

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {obituary.full_name}
                          </h3>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                            {(obituary.date_of_birth || obituary.date_of_death) && (
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {obituary.date_of_birth && formatDate(obituary.date_of_birth)}
                                {obituary.date_of_birth && obituary.date_of_death && ' - '}
                                {obituary.date_of_death && formatDate(obituary.date_of_death)}
                              </div>
                            )}

                            {obituary.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {obituary.location}
                              </div>
                            )}
                          </div>

                          {obituary.biography && (
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                              {obituary.biography}
                            </p>
                          )}

                          <Link href={`/obituary/${obituary.id}`}>
                            <Button variant="outline" size="sm">
                              Read Full Obituary
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {relatedCommunities.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Related {getTypeDisplayName(community.type)}s
                </h3>
                <div className="space-y-2">
                  {relatedCommunities.map((related) => (
                    <Link
                      key={related.id}
                      href={`/communities/${related.type}/${related.slug}`}
                      className="block p-2 rounded hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{related.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {related.stats_recent_count}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CommunityDetail;
