'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Check, X, Trash2, CheckCheck, Image, Video, Heart, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface PendingItem {
  id: string;
  type: 'media' | 'memory' | 'guestbook';
  title?: string | null;
  content: string;
  author_name: string;
  created_at: string | null;
  media_type?: 'photo' | 'video';
  storage_key?: string;
}

const ModerationPanel = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [obituary, setObituary] = useState<any>(null);
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?next=' + encodeURIComponent(window.location.pathname));
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (id && user) {
      fetchData();
    }
  }, [id, user]);

  const fetchData = async () => {
    if (!id || !user) return;

    try {
      // Check if user owns this obituary
      const { data: obituaryData, error: obituaryError } = await supabase
        .from('obituaries')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (obituaryError) throw obituaryError;
      setObituary(obituaryData);

      // Fetch pending media assets
      const { data: mediaData, error: mediaError } = await supabase
        .from('media_assets')
        .select('*')
        .eq('obituary_id', id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (mediaError) throw mediaError;

      // Fetch pending memories
      const { data: memoriesData, error: memoriesError } = await supabase
        .from('memories')
        .select('*')
        .eq('obituary_id', id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (memoriesError) throw memoriesError;

      // Fetch pending guestbook entries
      const { data: guestbookData, error: guestbookError } = await supabase
        .from('guestbook_entries')
        .select('*')
        .eq('obituary_id', id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (guestbookError) throw guestbookError;

      // Combine all pending items
      const combined: PendingItem[] = [
        ...(mediaData || []).map(item => ({
          id: item.id,
          type: 'media' as const,
          title: item.title,
          content: item.caption || 'No caption',
          author_name: 'Anonymous', // We could join with profiles if needed
          created_at: item.created_at,
          media_type: item.type as 'photo' | 'video',
          storage_key: item.storage_key
        })),
        ...(memoriesData || []).map(item => ({
          id: item.id,
          type: 'memory' as const,
          content: item.body,
          author_name: item.author_name,
          created_at: item.created_at
        })),
        ...(guestbookData || []).map(item => ({
          id: item.id,
          type: 'guestbook' as const,
          content: item.message,
          author_name: item.author_name,
          created_at: item.created_at
        }))
      ];

      setPendingItems(combined.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()));

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching moderation data:', error);
      }
      toast({
        title: "Error",
        description: "Failed to load moderation data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const moderateItem = async (itemId: string, action: 'approve' | 'reject', type: string) => {
    setProcessing(prev => new Set([...prev, itemId]));

    try {
      const tableName = type === 'media' ? 'media_assets' :
                       type === 'memory' ? 'memories' : 'guestbook_entries';

      const { error } = await supabase
        .from(tableName)
        .update({ status: action === 'approve' ? 'approved' : 'rejected' })
        .eq('id', itemId);

      if (error) throw error;

      // Remove from pending list
      setPendingItems(prev => prev.filter(item => item.id !== itemId));

      toast({
        title: action === 'approve' ? "Approved" : "Rejected",
        description: `${type} has been ${action}d successfully`,
      });

    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error ${action}ing item:`, error);
      }
      toast({
        title: "Error",
        description: error.message || `Failed to ${action} item`,
        variant: "destructive",
      });
    } finally {
      setProcessing(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const bulkApprove = async (type: string) => {
    const itemsToApprove = pendingItems.filter(item => item.type === type);

    for (const item of itemsToApprove) {
      await moderateItem(item.id, 'approve', item.type);
    }
  };

  const getTypeIcon = (type: string, mediaType?: string) => {
    if (type === 'media') {
      return mediaType === 'video' ? Video : Image;
    }
    return type === 'memory' ? Heart : MessageSquare;
  };

  const getImageUrl = async (storageKey: string) => {
    const { data } = await supabase.storage
      .from('memorial-media')
      .getPublicUrl(storageKey);
    return data.publicUrl;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-muted-foreground">Loading moderation panel...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!obituary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">Obituary Not Found</h1>
            <p className="text-muted-foreground mb-6">
              You don't have permission to moderate this obituary.
            </p>
            <Link href="/search">
              <Button>Browse Obituaries</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const mediaItems = pendingItems.filter(item => item.type === 'media');
  const memoryItems = pendingItems.filter(item => item.type === 'memory');
  const guestbookItems = pendingItems.filter(item => item.type === 'guestbook');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href={`/obituary/${id}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Memorial
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Moderation Panel</h1>
              <p className="text-muted-foreground mt-1">
                Manage pending content for {obituary.full_name}'s memorial
              </p>
            </div>

            <Badge variant="secondary" className="text-lg px-3 py-1">
              {pendingItems.length} pending items
            </Badge>
          </div>
        </div>

        {pendingItems.length === 0 ? (
          <Card className="p-12 text-center">
            <CheckCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">All caught up!</h2>
            <p className="text-muted-foreground">There are no pending items to review.</p>
          </Card>
        ) : (
          <Tabs defaultValue="uploads" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="uploads" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Uploads ({mediaItems.length})
              </TabsTrigger>
              <TabsTrigger value="memories" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Memories ({memoryItems.length})
              </TabsTrigger>
              <TabsTrigger value="guestbook" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Guest Book ({guestbookItems.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="uploads" className="mt-6">
              <ModerationSection
                items={mediaItems}
                onModerate={moderateItem}
                onBulkApprove={() => bulkApprove('media')}
                processing={processing}
                type="media"
                getImageUrl={getImageUrl}
              />
            </TabsContent>

            <TabsContent value="memories" className="mt-6">
              <ModerationSection
                items={memoryItems}
                onModerate={moderateItem}
                onBulkApprove={() => bulkApprove('memory')}
                processing={processing}
                type="memory"
              />
            </TabsContent>

            <TabsContent value="guestbook" className="mt-6">
              <ModerationSection
                items={guestbookItems}
                onModerate={moderateItem}
                onBulkApprove={() => bulkApprove('guestbook')}
                processing={processing}
                type="guestbook"
              />
            </TabsContent>
          </Tabs>
        )}
      </div>

      <Footer />
    </div>
  );
};

interface ModerationSectionProps {
  items: PendingItem[];
  onModerate: (id: string, action: 'approve' | 'reject', type: string) => void;
  onBulkApprove: () => void;
  processing: Set<string>;
  type: string;
  getImageUrl?: (key: string) => Promise<string>;
}

const ModerationSection = ({
  items,
  onModerate,
  onBulkApprove,
  processing,
  type,
  getImageUrl
}: ModerationSectionProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No pending {type} items</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.length > 1 && (
        <div className="flex justify-end">
          <Button onClick={onBulkApprove} variant="outline">
            <CheckCheck className="h-4 w-4 mr-2" />
            Approve All ({items.length})
          </Button>
        </div>
      )}

      {items.map((item) => (
        <ModerationItem
          key={item.id}
          item={item}
          onModerate={onModerate}
          processing={processing.has(item.id)}
          getImageUrl={getImageUrl}
        />
      ))}
    </div>
  );
};

interface ModerationItemProps {
  item: PendingItem;
  onModerate: (id: string, action: 'approve' | 'reject', type: string) => void;
  processing: boolean;
  getImageUrl?: (key: string) => Promise<string>;
}

const ModerationItem = ({ item, onModerate, processing, getImageUrl }: ModerationItemProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    if (item.type === 'media' && item.storage_key && getImageUrl) {
      getImageUrl(item.storage_key).then(setImageUrl);
    }
  }, [item, getImageUrl]);

  const IconComponent = item.type === 'media'
    ? (item.media_type === 'video' ? Video : Image)
    : item.type === 'memory'
      ? Heart
      : MessageSquare;

  return (
    <Card className="p-6">
      <div className="flex gap-4">
        {item.type === 'media' && imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={item.title || 'Uploaded media'}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <IconComponent className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">
                  {item.title || `${item.type} from ${item.author_name}`}
                </h3>
                <p className="text-sm text-muted-foreground">
                  by {item.author_name} - {item.created_at ? format(new Date(item.created_at), 'MMM d, yyyy') : 'Unknown date'}
                </p>
              </div>
            </div>

            <Badge variant="outline">
              {item.type === 'media' ? item.media_type : item.type}
            </Badge>
          </div>

          <p className="text-sm text-foreground line-clamp-3">
            {item.content}
          </p>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onModerate(item.id, 'approve', item.type)}
              disabled={processing}
            >
              <Check className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onModerate(item.id, 'reject', item.type)}
              disabled={processing}
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModerationPanel;
