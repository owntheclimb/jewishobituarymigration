import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import GalleryGrid from './GalleryGrid';
import MediaUploader from './MediaUploader';
import MemorySection from './MemorySection';
import GuestbookSection from './GuestbookSection';
import { Camera, Video, Heart, MessageSquare, Settings } from 'lucide-react';

// Check if a string is a valid UUID
function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

interface MemorialTabsProps {
  obituaryId: string;
  isOwner: boolean;
  onOpenThemeDrawer?: () => void;
  className?: string;
}

interface MediaAsset {
  id: string;
  type: 'photo' | 'video';
  storage_key: string;
  thumb_key: string | null;
  title: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  created_at: string | null;
  status: string | null;
}

interface ObituarySettings {
  allow_public_uploads: boolean | null;
  guestbook_enabled: boolean | null;
  max_video_seconds: number | null;
}

const MemorialTabs = ({ obituaryId, isOwner, onOpenThemeDrawer, className = "" }: MemorialTabsProps) => {
  const { user } = useAuth();
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [settings, setSettings] = useState<ObituarySettings | null>(null);
  const [showPhotoUploader, setShowPhotoUploader] = useState(false);
  const [showVideoUploader, setShowVideoUploader] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if we can query database (requires valid UUID)
  const canUseDatabase = isValidUUID(obituaryId);

  useEffect(() => {
    fetchData();
  }, [obituaryId]);

  const fetchData = async () => {
    try {
      // Only query database if obituaryId is a valid UUID
      if (!canUseDatabase) {
        // For non-UUID IDs (external obituaries), use default settings
        setSettings({
          allow_public_uploads: false,
          guestbook_enabled: false,
          max_video_seconds: 120
        });
        setLoading(false);
        return;
      }

      // Fetch media assets
      const { data: mediaData, error: mediaError } = await supabase
        .from('media_assets')
        .select('*')
        .eq('obituary_id', obituaryId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (mediaError) throw mediaError;
      setMediaAssets(mediaData?.map(asset => ({
        ...asset,
        type: asset.type as 'photo' | 'video'
      })) || []);

      // Fetch settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('obituary_settings')
        .select('*')
        .eq('obituary_id', obituaryId)
        .single();

      if (settingsError && settingsError.code !== 'PGRST116') {
        throw settingsError;
      }

      setSettings(settingsData || {
        allow_public_uploads: true,
        guestbook_enabled: true,
        max_video_seconds: 120
      });

    } catch (error) {
      console.error('Error fetching memorial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (newMediaAsset: MediaAsset) => {
    if (newMediaAsset.status === 'approved') {
      setMediaAssets(prev => [newMediaAsset, ...prev]);
    }
    setShowPhotoUploader(false);
    setShowVideoUploader(false);
  };

  const canUpload = isOwner || Boolean(settings?.allow_public_uploads && user);

  const photoCount = mediaAssets.filter(a => a.type === 'photo').length;
  const videoCount = mediaAssets.filter(a => a.type === 'video').length;

  if (loading) {
    return (
      <div className={`py-8 ${className}`}>
        <div className="animate-pulse text-center text-muted-foreground">
          Loading memorial content...
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Memorial</h2>
        {isOwner && (
          <Button variant="outline" size="sm" onClick={onOpenThemeDrawer}>
            <Settings className="h-4 w-4 mr-2" />
            Customize Memorial
          </Button>
        )}
      </div>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="photos" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Photos
            {photoCount > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {photoCount}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Videos
            {videoCount > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {videoCount}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger value="memories" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Memories
          </TabsTrigger>
          
          {settings?.guestbook_enabled && (
            <TabsTrigger value="guestbook" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Guest Book
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="photos" className="mt-6">
          <div className="space-y-6">
            {canUpload && (
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowPhotoUploader(!showPhotoUploader)}
                  variant={showPhotoUploader ? "secondary" : "outline"}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {showPhotoUploader ? 'Cancel Upload' : 'Add Photos'}
                </Button>
              </div>
            )}

            {showPhotoUploader && (
              <MediaUploader
                obituaryId={obituaryId}
                type="photo"
                maxSizeMB={10}
                onUploadComplete={handleUploadComplete}
              />
            )}

            <GalleryGrid
              mediaAssets={mediaAssets}
              type="photo"
            />
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="space-y-6">
            {canUpload && (
              <div className="flex justify-center">
                <Button
                  onClick={() => setShowVideoUploader(!showVideoUploader)}
                  variant={showVideoUploader ? "secondary" : "outline"}
                >
                  <Video className="h-4 w-4 mr-2" />
                  {showVideoUploader ? 'Cancel Upload' : 'Add Videos'}
                </Button>
              </div>
            )}

            {showVideoUploader && (
              <MediaUploader
                obituaryId={obituaryId}
                type="video"
                maxSizeMB={200}
                maxDurationSeconds={settings?.max_video_seconds || 120}
                onUploadComplete={handleUploadComplete}
              />
            )}

            <GalleryGrid
              mediaAssets={mediaAssets}
              type="video"
            />
          </div>
        </TabsContent>

        <TabsContent value="memories" className="mt-6">
          <MemorySection
            obituaryId={obituaryId}
            isOwner={isOwner}
            canPost={canUpload}
          />
        </TabsContent>

        {settings?.guestbook_enabled && (
          <TabsContent value="guestbook" className="mt-6">
            <GuestbookSection
              obituaryId={obituaryId}
              isOwner={isOwner}
              canPost={true} // Anyone can post to guestbook
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MemorialTabs;