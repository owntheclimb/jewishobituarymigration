'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ShareButton({ label = 'Share Article' }: { label?: string }) {
  const { toast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ url, title: document.title });
        return;
      } catch {
        // user cancelled or not supported, fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied', description: 'Article link copied to clipboard.' });
    } catch {
      toast({ title: 'Error', description: 'Could not copy link.', variant: 'destructive' });
    }
  };

  return (
    <Button className="gap-2" onClick={handleShare}>
      <Share2 className="h-4 w-4" />
      {label}
    </Button>
  );
}
