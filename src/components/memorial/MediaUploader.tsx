import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image, Video, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { z } from 'zod';

const mediaMetadataSchema = z.object({
  title: z.string().max(200, "Title must be less than 200 characters").optional(),
  caption: z.string().max(500, "Caption must be less than 500 characters").optional()
});

interface MediaUploaderProps {
  obituaryId: string;
  type: 'photo' | 'video';
  maxSizeMB: number;
  maxDurationSeconds?: number;
  onUploadComplete?: (mediaAsset: any) => void;
  className?: string;
}

const MediaUploader = ({ 
  obituaryId, 
  type, 
  maxSizeMB, 
  maxDurationSeconds = 120,
  onUploadComplete,
  className = ""
}: MediaUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const { toast } = useToast();

  const acceptedTypes: Record<string, string[]> = type === 'photo'
    ? { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }
    : { 'video/*': ['.mp4', '.mov', '.avi'] };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File must be smaller than ${maxSizeMB}MB`,
        variant: "destructive",
      });
      return;
    }

    // For videos, we'll validate duration after upload on the server side
    setUploading(true);
    setProgress(0);

    try {
      // Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${obituaryId}/${fileName}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('memorial-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      setProgress(50);

      // Get file dimensions for images
      let width: number | null = null;
      let height: number | null = null;
      
      if (type === 'photo') {
        await new Promise<void>((resolve, reject) => {
          const img = document.createElement('img');
          img.onload = () => {
            width = img.naturalWidth;
            height = img.naturalHeight;
            resolve();
          };
          img.onerror = reject;
          img.src = URL.createObjectURL(file);
        });
      }

      setProgress(75);

      // Validate metadata
      const metadataValidation = mediaMetadataSchema.safeParse({ title, caption });
      if (!metadataValidation.success) {
        throw new Error(metadataValidation.error.issues[0]?.message || "Invalid metadata");
      }

      // Create media asset record
      const { data: mediaAsset, error: dbError } = await supabase
        .from('media_assets')
        .insert({
          obituary_id: obituaryId,
          uploader_user_id: (await supabase.auth.getUser()).data.user?.id || null,
          type,
          storage_key: filePath,
          width,
          height,
          title: title || null,
          caption: caption || null,
          // Status is set by database trigger based on ownership
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setProgress(100);

      toast({
        title: "Upload successful",
        description: type === 'photo' ? "Photo uploaded successfully" : "Video uploaded successfully",
      });

      onUploadComplete?.(mediaAsset);
      
      // Reset form
      setTitle('');
      setCaption('');

    } catch (error: any) {
      if (process.env.NODE_ENV !== "production") {
        console.error('Upload error:', error);
      }
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [obituaryId, type, maxSizeMB, title, caption, toast, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give this a title"
              disabled={uploading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption">Caption (optional)</Label>
            <Input
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption"
              disabled={uploading}
            />
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Uploading...</p>
                <Progress value={progress} className="w-full max-w-xs mx-auto" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                {type === 'photo' ? (
                  <Image className="h-12 w-12 text-muted-foreground" />
                ) : (
                  <Video className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {isDragActive 
                    ? `Drop the ${type} here` 
                    : `Upload a ${type}`
                  }
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to browse
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <AlertCircle className="h-3 w-3" />
                  <span>
                    Max {maxSizeMB}MB
                    {type === 'video' && `, ${maxDurationSeconds}s duration`}
                  </span>
                </div>
              </div>
              
              <Button variant="outline" disabled={uploading}>
                Choose {type === 'photo' ? 'Photos' : 'Videos'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MediaUploader;