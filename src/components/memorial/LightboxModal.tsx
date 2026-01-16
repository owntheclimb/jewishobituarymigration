import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface LightboxModalProps {
  images: MediaAsset[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  getImageUrl: (key: string) => Promise<string>;
}

const LightboxModal = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  getImageUrl
}: LightboxModalProps) => {
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  const currentImage = images[currentIndex];

  // Preload current and adjacent images
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const indicesToLoad = [
        Math.max(0, currentIndex - 1),
        currentIndex,
        Math.min(images.length - 1, currentIndex + 1)
      ];

      const loadPromises = indicesToLoad.map(async (index) => {
        const image = images[index];
        if (image && !imageUrls[image.storage_key]) {
          try {
            const url = await getImageUrl(image.storage_key);
            setImageUrls(prev => ({ ...prev, [image.storage_key]: url }));
          } catch (error) {
            console.error('Error loading image:', error);
          }
        }
      });

      await Promise.all(loadPromises);
      setLoading(false);
    };

    loadImages();
  }, [currentIndex, images, imageUrls, getImageUrl]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </Button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
            onClick={onPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="sr-only">Previous image</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10"
            onClick={onNext}
            disabled={currentIndex === images.length - 1}
          >
            <ChevronRight className="h-8 w-8" />
            <span className="sr-only">Next image</span>
          </Button>
        </>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} of {images.length}
        </div>
      )}

      {/* Main content */}
      <div className="max-w-7xl max-h-full w-full flex flex-col items-center">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center max-h-[80vh] w-full">
          {loading ? (
            <div className="text-white text-lg">Loading...</div>
          ) : (
            <img
              src={imageUrls[currentImage.storage_key]}
              alt={currentImage.title || 'Memorial photo'}
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>

        {/* Caption area */}
        {(currentImage.title || currentImage.caption) && (
          <div className="mt-4 max-w-2xl w-full text-center text-white space-y-2">
            {currentImage.title && (
              <h3 className="text-xl font-semibold">{currentImage.title}</h3>
            )}
            {currentImage.caption && (
              <p className="text-sm text-white/80">{currentImage.caption}</p>
            )}
            {currentImage.created_at && (
              <p className="text-xs text-white/60">
                {format(new Date(currentImage.created_at), 'MMMM d, yyyy')}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
        aria-label="Close lightbox"
      />
    </div>
  );
};

export default LightboxModal;