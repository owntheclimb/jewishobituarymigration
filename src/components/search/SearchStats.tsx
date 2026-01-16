import { Badge } from '@/components/ui/badge';
import { UnifiedObituary } from '@/lib/obituaryTransformer';
import { Image, MapPin, Star, Flame } from 'lucide-react';

interface SearchStatsProps {
  obituaries: UnifiedObituary[];
  visible: number;
}

const SearchStats = ({ obituaries, visible }: SearchStatsProps) => {
  const withPhotos = obituaries.filter(o => o.hasVerifiedPhoto).length;
  const notable = obituaries.filter(o => o.isNotable).length;
  const recent = obituaries.filter(o => o.isRecent).length;
  const states = new Set(obituaries.filter(o => o.state).map(o => o.state)).size;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in">
      <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border border-primary/10 px-4 py-2 rounded-full shadow-sm">
        <div className="text-2xl font-bold text-primary">{obituaries.length}</div>
        <div className="text-sm text-muted-foreground">Total</div>
      </div>
      
      {withPhotos > 0 && (
        <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border border-primary/10 px-4 py-2 rounded-full shadow-sm">
          <Image className="h-4 w-4 text-primary" />
          <div className="text-sm font-semibold text-foreground">{withPhotos}</div>
          <div className="text-sm text-muted-foreground">with photos</div>
        </div>
      )}
      
      {notable > 0 && (
        <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border border-primary/10 px-4 py-2 rounded-full shadow-sm">
          <Star className="h-4 w-4 text-amber-500" />
          <div className="text-sm font-semibold text-foreground">{notable}</div>
          <div className="text-sm text-muted-foreground">notable</div>
        </div>
      )}
      
      {recent > 0 && (
        <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border border-primary/10 px-4 py-2 rounded-full shadow-sm">
          <Flame className="h-4 w-4 text-amber-500" />
          <div className="text-sm font-semibold text-foreground">{recent}</div>
          <div className="text-sm text-muted-foreground">recent</div>
        </div>
      )}
      
      {states > 0 && (
        <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm border border-primary/10 px-4 py-2 rounded-full shadow-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <div className="text-sm font-semibold text-foreground">{states}</div>
          <div className="text-sm text-muted-foreground">{states === 1 ? 'state' : 'states'}</div>
        </div>
      )}
      
      {visible < obituaries.length && (
        <Badge variant="secondary" className="text-xs">
          Showing {visible} of {obituaries.length}
        </Badge>
      )}
    </div>
  );
};

export default SearchStats;
