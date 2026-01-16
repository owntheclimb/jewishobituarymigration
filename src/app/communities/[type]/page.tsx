'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import schoolHeroImage from '@/assets/school-community-hero.jpg';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, MapPin, Users, Bell, Loader2, Plus } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string | null;
  stats_recent_count: number | null;
}

const CommunityTypeFilter = () => {
  const params = useParams();
  const type = params.type as string;
  const { user } = useAuth();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [following, setFollowing] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: ''
  });

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!type) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('*')
          .eq('type', type)
          .order('name');

        if (error) throw error;
        setCommunities(data || []);
      } catch (error) {
        console.error('Error fetching communities:', error);
        toast.error('Failed to load communities');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [type]);

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitSchool = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error(`Please sign in to submit a ${getTypeLabel(type || '').slice(0, -1).toLowerCase()}`);
      return;
    }

    try {
      const { error } = await supabase
        .from('communities')
        .insert({
          type: type,
          name: formData.name,
          slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: formData.description,
          submitted_by: user.id,
          status: 'pending'
        });

      if (error) throw error;

      toast.success(`${getTypeLabel(type || '').slice(0, -1)} submitted successfully!`, {
        description: 'Thank you for your contribution. It will be reviewed shortly.'
      });

      setDialogOpen(false);
      setFormData({ name: '', location: '', description: '' });

      // Refresh to show user's pending submission
      const { data } = await supabase
        .from('communities')
        .select('*')
        .eq('type', type)
        .order('name');

      if (data) setCommunities(data);
    } catch (error) {
      console.error(`Error submitting ${getTypeLabel(type || '').slice(0, -1).toLowerCase()}:`, error);
      toast.error(`Failed to submit ${getTypeLabel(type || '').slice(0, -1).toLowerCase()}`);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      city: 'Cities',
      synagogue: 'Synagogues',
      school: 'Schools',
      highschool: 'High Schools',
      college: 'Colleges',
      military: 'Military Units',
      organization: 'Organizations'
    };
    return labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getTypeDescription = (type: string) => {
    const descriptions: Record<string, string> = {
      city: 'Honor and remember community members from Jewish communities across North America.',
      synagogue: 'Honor and remember congregation members who have passed.',
      school: 'Honor and remember alumni from Jewish schools.',
      highschool: 'Honor and remember alumni from Jewish high schools.',
      college: 'Honor and remember alumni and faculty from colleges and universities.',
      military: 'Honor and remember service members from various military branches.',
      organization: 'Honor and remember members of Jewish organizations and community groups.'
    };
    return descriptions[type] || 'Browse our community memorial pages.';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'city': return '🏙️';
      case 'synagogue': return '🕍';
      case 'school': return '🎓';
      case 'highschool': return '🎓';
      case 'college': return '🏫';
      case 'military': return '🎖️';
      case 'organization': return '👥';
      default: return '📍';
    }
  };

  if (!type) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Invalid community type</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background py-24 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${schoolHeroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl mb-4">{getIcon(type)}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {getTypeLabel(type)} Memorial Pages
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {getTypeDescription(type)}
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
                  placeholder={`Search ${getTypeLabel(type).toLowerCase()}...`}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Community Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      Showing {filteredCommunities.length} {filteredCommunities.length !== 1 ? getTypeLabel(type).toLowerCase() : getTypeLabel(type).toLowerCase().slice(0, -1)}
                    </p>
                  </div>

                  {filteredCommunities.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">No {getTypeLabel(type).toLowerCase()} found matching your search.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-6">
                      {filteredCommunities.map((community) => (
                        <Card key={community.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <CardTitle className="text-2xl mb-2">
                                  <Link href={`/communities/${type}/${community.slug}`} className="hover:text-primary">
                                    {community.name}
                                  </Link>
                                </CardTitle>
                                <Badge variant="secondary" className="mb-2">
                                  {getTypeLabel(type).slice(0, -1)}
                                </Badge>
                              </div>
                              <Button
                                variant={following.has(community.id) ? "default" : "outline"}
                                size="sm"
                                className="gap-2"
                                onClick={() => {
                                  setFollowing(prev => {
                                    const newSet = new Set(prev);
                                    if (newSet.has(community.id)) {
                                      newSet.delete(community.id);
                                      toast.info(`Unfollowed ${community.name}`);
                                    } else {
                                      newSet.add(community.id);
                                      toast.success(`Following ${community.name}`, {
                                        description: 'You will be notified of community updates'
                                      });
                                    }
                                    return newSet;
                                  });
                                }}
                              >
                                <Bell className="h-4 w-4" />
                                {following.has(community.id) ? 'Following' : 'Follow'}
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {community.description && (
                              <p className="text-muted-foreground mb-4">{community.description}</p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{community.stats_recent_count} recent obituaries</span>
                              </div>
                              <Button size="sm" asChild>
                                <Link href={`/communities/${type}/${community.slug}`}>
                                  View Memorial Page
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Don't See Your {getTypeLabel(type).slice(0, -1)}?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're continuously expanding our directory. {user ? `Add a ${getTypeLabel(type).slice(0, -1).toLowerCase()} to our directory or let us know about others.` : `Sign in to add a ${getTypeLabel(type).slice(0, -1).toLowerCase()} or let us know about others.`}
            </p>
            <div className="flex gap-4 justify-center">
              {user && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="gap-2">
                      <Plus className="h-5 w-5" />
                      Add {getTypeLabel(type).slice(0, -1)}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add a {getTypeLabel(type).slice(0, -1)}</DialogTitle>
                      <DialogDescription>
                        Help us expand our directory by adding a {getTypeLabel(type).slice(0, -1).toLowerCase()} to our community.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitSchool} className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{getTypeLabel(type).slice(0, -1)} Name *</Label>
                        <Input
                          id="name"
                          required
                          placeholder={`Enter ${getTypeLabel(type).slice(0, -1).toLowerCase()} name`}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="City, State"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder={`Brief description of the ${getTypeLabel(type).slice(0, -1).toLowerCase()}...`}
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                          Submit {getTypeLabel(type).slice(0, -1)}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
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
};

export default CommunityTypeFilter;
