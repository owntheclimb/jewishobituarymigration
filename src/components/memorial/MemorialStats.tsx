import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Flame, MessageSquare, Heart, Gift, Eye } from 'lucide-react';

interface MemorialStatsProps {
  obituaryId: string;
}

interface Stats {
  candles: number;
  memories: number;
  guestbook: number;
  donations: number;
  views: number;
}

// Check if a string is a valid UUID
function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

const MemorialStats = ({ obituaryId }: MemorialStatsProps) => {
  const [stats, setStats] = useState<Stats>({
    candles: 0,
    memories: 0,
    guestbook: 0,
    donations: 0,
    views: 0,
  });
  const [loading, setLoading] = useState(true);

  // Check if we can query database (requires valid UUID)
  const canUseDatabase = isValidUUID(obituaryId);

  useEffect(() => {
    fetchStats();
  }, [obituaryId]);

  const fetchStats = async () => {
    try {
      let memoriesCount = 0;
      let guestbookCount = 0;

      // Only query database if obituaryId is a valid UUID
      if (canUseDatabase) {
        // Fetch memories count
        const { count: memCount } = await supabase
          .from('memories')
          .select('*', { count: 'exact', head: true })
          .eq('obituary_id', obituaryId)
          .eq('status', 'approved');
        memoriesCount = memCount || 0;

        // Fetch guestbook entries count
        const { count: gbCount } = await supabase
          .from('guestbook_entries')
          .select('*', { count: 'exact', head: true })
          .eq('obituary_id', obituaryId)
          .eq('status', 'approved');
        guestbookCount = gbCount || 0;
      }

      // Get candle count from localStorage
      const candleData = localStorage.getItem(`candles_${obituaryId}`);
      const candles = candleData ? JSON.parse(candleData).count || 0 : 0;

      // Get view count from localStorage (increment on page load)
      const viewKey = `views_${obituaryId}`;
      const currentViews = parseInt(localStorage.getItem(viewKey) || '0');
      const newViews = currentViews + 1;
      localStorage.setItem(viewKey, newViews.toString());

      setStats({
        candles,
        memories: memoriesCount,
        guestbook: guestbookCount,
        donations: 0, // Will be implemented with donation system
        views: newViews,
      });
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error('Error fetching stats:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      icon: Flame,
      label: 'Candles Lit',
      value: stats.candles,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    },
    {
      icon: MessageSquare,
      label: 'Memories Shared',
      value: stats.memories,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Heart,
      label: 'Guestbook Entries',
      value: stats.guestbook,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-100 dark:bg-rose-900/30',
    },
    {
      icon: Gift,
      label: 'Donations',
      value: stats.donations,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: Eye,
      label: 'Views',
      value: stats.views,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-muted rounded" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-background/80 backdrop-blur-lg border-border/50 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">Memorial Impact</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center text-center space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-foreground">
                  {item.value.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MemorialStats;
