'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Share2, Check, Star, Flame } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { UnifiedObituary } from '@/lib/obituaryTransformer';

interface ObituaryCardProps {
  obituary: UnifiedObituary;
  onCopyLink?: (id: string, name: string) => void;
  copiedId?: string | null;
  index?: number;
}

const STATE_NAMES: Record<string, string> = {
  FL: 'Florida', NY: 'New York', CA: 'California', NJ: 'New Jersey',
  PA: 'Pennsylvania', IL: 'Illinois', MA: 'Massachusetts', TX: 'Texas',
  MD: 'Maryland', OH: 'Ohio', CT: 'Connecticut', AZ: 'Arizona',
  GA: 'Georgia', NC: 'North Carolina', VA: 'Virginia', MI: 'Michigan',
  WA: 'Washington', CO: 'Colorado', OR: 'Oregon', NV: 'Nevada'
};

const ObituaryCard = ({ obituary, onCopyLink, copiedId, index = 0 }: ObituaryCardProps) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return null;
    }
  };

  const getAge = () => {
    if (!obituary.dateOfBirth || !obituary.dateOfDeath) return '';
    try {
      const birth = new Date(obituary.dateOfBirth);
      const death = new Date(obituary.dateOfDeath);
      const age = death.getFullYear() - birth.getFullYear();
      return age > 0 ? `, Age ${age}` : '';
    } catch {
      return '';
    }
  };

  const displayDate = formatDate(obituary.dateOfDeath || obituary.publishedAt);
  const hasFloridaBadge = obituary.state === 'FL';
  
  // Use the obituary's image URL (already includes gender-specific placeholder logic from transformer)
  const imageUrl = (!obituary.imageUrl || imageError) 
    ? '/placeholder-male.png' 
    : obituary.imageUrl;

  const isPlaceholder = imageUrl.includes('/placeholder-');

  return (
    <Card
      className={`flex flex-col bg-gradient-to-br from-background via-background to-primary/5 backdrop-blur-lg border shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 animate-fade-in relative overflow-hidden rounded-2xl group ${
        hasFloridaBadge
          ? 'border-primary/40 ring-2 ring-primary/20'
          : 'border-border/40 hover:border-primary/40'
      }`}
      style={{ 
        animationDelay: `${index * 0.05}s`,
        minHeight: '760px',
        maxHeight: '760px',
      }}
    >
      {/* Decorative gradient overlay for FL obituaries */}
      {hasFloridaBadge && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -z-0" />
      )}

      {/* Image Section - Always 480px height */}
      <div className={`relative overflow-hidden ${isPlaceholder ? 'bg-gradient-to-br from-muted/30 to-muted/10' : ''}`} style={{ height: '480px' }}>
        <Image
          src={imageUrl}
          alt={`Memorial photo of ${obituary.name}${obituary.city ? ` from ${obituary.city}` : ''}${obituary.state ? `, ${obituary.state}` : ''}`}
          width={520}
          height={480}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isPlaceholder
              ? 'opacity-90'
              : 'group-hover:scale-105'
          }`}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Overlay for placeholder images with text */}
        {isPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-transparent to-primary/5">
            <div className="text-center px-4">
              <div className="text-muted-foreground/40 text-sm font-medium">
                {/* Decorative element only, alt text is sufficient */}
              </div>
            </div>
          </div>
        )}

        {/* Top-right badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {hasFloridaBadge && (
            <Badge className="text-xs bg-primary shadow-md animate-pulse">
              🌴 Florida
            </Badge>
          )}
          {obituary.isRecent && (
            <Badge variant="secondary" className="text-xs bg-background/90 shadow-md">
              <Flame className="h-3 w-3 mr-1 text-amber-500" />
              Recent
            </Badge>
          )}
          {obituary.isNotable && (
            <Badge variant="secondary" className="text-xs bg-background/90 shadow-md">
              <Star className="h-3 w-3 mr-1 text-amber-500" />
              Notable
            </Badge>
          )}
        </div>
        
        {/* Bottom-left verified photo indicator */}
        {obituary.hasVerifiedPhoto && !isPlaceholder && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="secondary" className="text-[10px] bg-background/90 shadow-sm border-primary/20">
              📸 Photo
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section - Flex grow to fill remaining space */}
      <div className="flex-1 flex flex-col p-5 space-y-3 relative z-10">
        {/* Name */}
        <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-snug">
          {obituary.name}
          {getAge()}
        </h3>

        {/* Date Badge */}
        {displayDate && (
          <div className="flex items-center bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full w-fit">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
            <span className="text-xs font-semibold">{displayDate}</span>
          </div>
        )}

        {/* Location Badge */}
        {obituary.location && (
          <div className="flex items-center bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full w-fit">
            <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" />
            <span className="text-xs font-semibold">{obituary.location}</span>
          </div>
        )}

        {/* Source Badge */}
        <div>
          <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5 font-medium">
            📰 {obituary.source}
          </Badge>
        </div>

        {/* Biography/Snippet - Flex grow to fill space */}
        {obituary.biography && (
          <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed flex-1">
            {obituary.biography}
          </p>
        )}

        {/* Action Buttons - Fixed at bottom */}
        <div className="pt-4 mt-auto border-t border-primary/10">
          <div className="flex gap-2">
            <Link href={`/obituary/${obituary.id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-primary/40 bg-primary/5 hover:bg-primary/15 hover:border-primary/60 transition-all duration-300 h-11 font-semibold"
              >
                <span className="text-foreground">View Memorial Page</span>
              </Button>
            </Link>
            
            {onCopyLink && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onCopyLink(obituary.id, obituary.name)}
                className="shrink-0 hover:bg-primary/15 h-11 w-11 border border-primary/20"
                title="Copy link"
              >
                {copiedId === obituary.id ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Share2 className="h-4 w-4 text-primary" />
                )}
              </Button>
            )}
          </div>
          
          {/* Source name under button */}
          {obituary.source && (
            <p className="text-[11px] text-muted-foreground/70 text-center leading-snug px-1 mt-2">
              <span className="font-semibold truncate inline-block max-w-full">
                {obituary.source}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* SEO Hidden Data */}
      <div className="sr-only">
        {obituary.state && STATE_NAMES[obituary.state] && (
          <span>Jewish obituary from {STATE_NAMES[obituary.state]}</span>
        )}
      </div>
    </Card>
  );
};

export default ObituaryCard;
