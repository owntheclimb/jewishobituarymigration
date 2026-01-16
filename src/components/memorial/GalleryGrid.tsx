import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LightboxModal from './LightboxModal';
import { Clock, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

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

interface GalleryGridProps {
  mediaAssets: MediaAsset[];
  type: 'photo' | 'video';
  className?: string;
}

const GalleryGrid = ({ mediaAssets, type, className = "" }: GalleryGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});

  const getImageUrl = async (storageKey: string) => {
    if (imageUrls[storageKey]) {
      return imageUrls[storageKey];
    }

    const { data } = await supabase.storage
      .from('memorial-media')
      .getPublicUrl(storageKey);

    const url = data.publicUrl;
    setImageUrls(prev => ({ ...prev, [storageKey]: url }));
    return url;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleItemClick = (index: number) => {
    if (type === 'photo') {
      setSelectedIndex(index);
    }
    // For videos, we'll handle this differently
  };

  const filteredAssets = mediaAssets.filter(asset => asset.type === type);

  if (filteredAssets.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-muted-foreground">
          <p className="text-lg mb-2">No {type}s yet</p>
          <p className="text-sm">
            {type === 'photo' 
              ? 'Upload photos to create a beautiful memorial gallery'
              : 'Share video memories to honor their life'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {filteredAssets.map((asset, index) => (
          <Card
            key={asset.id}
            className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 aspect-square"
            onClick={() => handleItemClick(index)}
          >
            <div className="relative w-full h-full">
              <MediaThumbnail asset={asset} getImageUrl={getImageUrl} />
              
              {/* Overlay with metadata */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  {asset.title && (
                    <h4 className="font-medium text-sm truncate mb-1">
                      {asset.title}
                    </h4>
                  )}
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{asset.created_at ? format(new Date(asset.created_at), 'MMM d') : 'Unknown'}</span>
                    </div>
                    
                    {type === 'video' && asset.duration_seconds && (
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDuration(asset.duration_seconds)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox for photos */}
      {type === 'photo' && selectedIndex !== null && (
        <LightboxModal
          images={filteredAssets}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNext={() => setSelectedIndex((selectedIndex + 1) % filteredAssets.length)}
          onPrevious={() => setSelectedIndex((selectedIndex - 1 + filteredAssets.length) % filteredAssets.length)}
          getImageUrl={getImageUrl}
        />
      )}
    </>
  );
};

interface MediaThumbnailProps {
  asset: MediaAsset;
  getImageUrl: (key: string) => Promise<string>;
}

const MediaThumbnail = ({ asset, getImageUrl }: MediaThumbnailProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await getImageUrl(asset.thumb_key || asset.storage_key);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading image:', error);
      } finally {
        setLoading(false);
      }
    };
    loadImage();
  }, [asset.storage_key, asset.thumb_key, getImageUrl]);

  if (loading) {
    return (
      <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
        <div className="text-muted-foreground text-xs">Loading...</div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={asset.title || `${asset.type} from memorial`}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
    />
  );
};

export default GalleryGrid;