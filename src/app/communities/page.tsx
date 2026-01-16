'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscribeButton from '@/components/SubscribeButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Community {
  id: string;
  type: string;
  name: string;
  slug: string;
  description: string | null;
  stats_recent_count: number | null;
}

interface Subscription {
  community_id: string;
}

const Communities = () => {
  const { user } = useAuth();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
    if (user) {
      fetchSubscriptions();
    }
  }, [user]);

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('stats_recent_count', { ascending: false })
        .order('name');

      if (error) throw error;
      setCommunities(data || []);
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('community_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const isSubscribed = (communityId: string) => {
    return subscriptions.some(sub => sub.community_id === communityId);
  };

  const handleSubscriptionChange = (communityId: string, subscribed: boolean) => {
    if (subscribed) {
      setSubscriptions(prev => [...prev, { community_id: communityId }]);
    } else {
      setSubscriptions(prev => prev.filter(sub => sub.community_id !== communityId));
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
      case 'city': return 'Cities';
      case 'highschool': return 'High Schools';
      case 'college': return 'Colleges';
      case 'military': return 'Military';
      default: return type;
    }
  };

  const renderCommunityList = (type: string) => {
    const typeCommunities = communities.filter(c => c.type === type);

    if (typeCommunities.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No {getTypeDisplayName(type).toLowerCase()} communities yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {typeCommunities.map((community) => (
          <Card key={community.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{getCommunityIcon(community.type)}</span>
                <h3 className="font-semibold text-lg">{community.name}</h3>
              </div>
              {community.stats_recent_count && community.stats_recent_count > 0 && (
                <Badge variant="secondary">
                  {community.stats_recent_count} recent
                </Badge>
              )}
            </div>

            {community.description && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {community.description}
              </p>
            )}

            <div className="flex space-x-2">
              <Link href={`/communities/${community.type}/${community.slug}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Community
                </Button>
              </Link>
              <SubscribeButton
                communityId={community.id}
                communityName={community.name}
                isSubscribed={isSubscribed(community.id)}
                variant="default"
                size="default"
                onSubscriptionChange={(subscribed) =>
                  handleSubscriptionChange(community.id, subscribed)
                }
              />
            </div>
          </Card>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-muted-foreground">Loading communities...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Connect with Communities
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Join communities that matter to you. Stay connected with your hometown, alma mater, or military unit.
              Honor memories together and support each other through life's journeys.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Daily Updates
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                Memorial Notifications
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Community Support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center animate-fade-in">
            <div className="text-3xl font-bold text-primary mb-2">
              {communities.filter(c => c.type === 'city').length}
            </div>
            <div className="text-sm text-muted-foreground">Cities</div>
          </div>
          <div className="text-center animate-fade-in">
            <div className="text-3xl font-bold text-primary mb-2">
              {communities.filter(c => c.type === 'highschool').length}
            </div>
            <div className="text-sm text-muted-foreground">High Schools</div>
          </div>
          <div className="text-center animate-fade-in">
            <div className="text-3xl font-bold text-primary mb-2">
              {communities.filter(c => c.type === 'college').length}
            </div>
            <div className="text-sm text-muted-foreground">Colleges</div>
          </div>
          <div className="text-center animate-fade-in">
            <div className="text-3xl font-bold text-primary mb-2">
              {communities.filter(c => c.type === 'military').length}
            </div>
            <div className="text-sm text-muted-foreground">Military Units</div>
          </div>
        </div>


        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">Browse All Communities</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your community and stay connected with those who share your history and experiences
          </p>
        </div>

        <Tabs defaultValue="city" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="city">🏙️ Cities</TabsTrigger>
            <TabsTrigger value="highschool">🎓 High Schools</TabsTrigger>
            <TabsTrigger value="college">🏫 Colleges</TabsTrigger>
            <TabsTrigger value="military">🎖️ Military</TabsTrigger>
          </TabsList>

          <TabsContent value="city" className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">City Communities</h2>
            {renderCommunityList('city')}
          </TabsContent>

          <TabsContent value="highschool" className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">High School Communities</h2>
            {renderCommunityList('highschool')}
          </TabsContent>

          <TabsContent value="college" className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">College Communities</h2>
            {renderCommunityList('college')}
          </TabsContent>

          <TabsContent value="military" className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Military Communities</h2>
            {renderCommunityList('military')}
          </TabsContent>
        </Tabs>

        {/* Testimonials Section */}
        <div className="mt-20 py-16 bg-gradient-to-r from-muted/30 to-muted/10 rounded-3xl animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Community Members Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how communities are helping people stay connected and honor their loved ones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  {"★".repeat(5)}
                </div>
                <p className="text-muted-foreground italic">
                  "Being part of my hometown community has helped me stay connected with old friends and honor those we've lost. The daily updates are perfect."
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold">Sarah Mitchell</p>
                <p className="text-sm text-muted-foreground">Springfield Community Member</p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  {"★".repeat(5)}
                </div>
                <p className="text-muted-foreground italic">
                  "Our military unit stays close through this platform. It's meaningful to support each other and remember our fallen brothers and sisters."
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold">Colonel James Rodriguez</p>
                <p className="text-sm text-muted-foreground">82nd Airborne Division</p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  {"★".repeat(5)}
                </div>
                <p className="text-muted-foreground italic">
                  "My college alumni network has never been stronger. We celebrate lives well-lived and support families during difficult times."
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold">Dr. Amanda Chen</p>
                <p className="text-sm text-muted-foreground">Harvard Class of '95</p>
              </div>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Communities Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to stay connected with your communities and honor memories together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Find Your Community</h3>
              <p className="text-sm text-muted-foreground">
                Search for your city, school, or military unit from our growing list of communities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Subscribe to Updates</h3>
              <p className="text-sm text-muted-foreground">
                Get daily notifications about new memorials and community activities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Share Memories</h3>
              <p className="text-sm text-muted-foreground">
                Contribute to memorial pages and share your memories with the community
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Stay Connected</h3>
              <p className="text-sm text-muted-foreground">
                Build lasting connections and support each other through shared experiences
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center animate-fade-in">
          <Card className="p-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Don't See Your Community?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              We're always adding new communities. Help us grow by suggesting your hometown, school, or organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="hover-scale">
                Suggest a Community
              </Button>
              <Button variant="outline" size="lg" className="hover-scale">
                Contact Support
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Communities;
