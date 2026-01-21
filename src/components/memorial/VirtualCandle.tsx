import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Flame, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface VirtualCandleProps {
  obituaryId: string;
  entityType?: 'obituary' | 'notable_figure';
}

// Check if a string is a valid UUID
function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

interface CandleData {
  count: number;
  lit: boolean;
}

// Generate or retrieve a persistent session ID for anonymous candle lighting
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sessionId = localStorage.getItem('candle_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('candle_session_id', sessionId);
  }
  return sessionId;
}

const VirtualCandle = ({ obituaryId, entityType = 'obituary' }: VirtualCandleProps) => {
  const [candleData, setCandleData] = useState<CandleData>({ count: 0, lit: false });
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Check if we can use database (requires valid UUID for entity_id)
  const canUseDatabase = isValidUUID(obituaryId);

  useEffect(() => {
    fetchCandleData();
  }, [obituaryId]);

  const fetchCandleData = async () => {
    try {
      // Only query database if obituaryId is a valid UUID
      if (canUseDatabase) {
        // Fetch total candle count from database using correct column names
        const { data: candles, error: countError } = await supabase
          .from('virtual_candles' as any)
          .select('id')
          .eq('entity_type', entityType)
          .eq('entity_id', obituaryId);

        if (countError) {
          console.error('Error fetching candle count:', countError);
        }

        const count = (candles as any[] | null)?.length || 0;

        // Check if current session already lit a candle
        const sessionId = getSessionId();
        let lit = false;

        if (sessionId) {
          const { data: existingCandle } = await supabase
            .from('virtual_candles' as any)
            .select('id')
            .eq('entity_type', entityType)
            .eq('entity_id', obituaryId)
            .eq('session_id', sessionId)
            .single();

          lit = !!existingCandle;
        }

        // Also check localStorage as fallback
        if (!lit) {
          lit = localStorage.getItem(`candle_lit_${obituaryId}`) === 'true';
        }

        setCandleData({ count, lit });
      } else {
        // For non-UUID IDs (like string slugs), use localStorage only
        const stored = localStorage.getItem(`candles_${obituaryId}`);
        const count = stored ? JSON.parse(stored).count || 0 : 0;
        const lit = localStorage.getItem(`candle_lit_${obituaryId}`) === 'true';
        setCandleData({ count, lit });
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error('Error fetching candle data:', error);
      }
      // Fallback to localStorage
      const stored = localStorage.getItem(`candles_${obituaryId}`);
      if (stored) {
        const data = JSON.parse(stored);
        setCandleData(prev => ({ ...prev, count: data.count || 0 }));
      }
      const lit = localStorage.getItem(`candle_lit_${obituaryId}`) === 'true';
      setCandleData(prev => ({ ...prev, lit }));
    }
  };

  const lightCandle = async () => {
    if (candleData.lit) {
      toast.info('You have already lit a candle for this memorial');
      return;
    }

    setLoading(true);
    setAnimating(true);

    try {
      const sessionId = getSessionId();

      // Only try to insert into database if obituaryId is a valid UUID
      if (canUseDatabase) {
        // Insert candle into database using correct column names
        const { error } = await supabase
          .from('virtual_candles' as any)
          .insert({
            entity_type: entityType,
            entity_id: obituaryId,
            session_id: sessionId,
          });

        if (error) {
          // If duplicate, ignore and just mark as lit
          if (!error.message.includes('duplicate')) {
            throw error;
          }
        }
      }

      // Update localStorage as backup (always do this)
      const newCount = candleData.count + 1;
      localStorage.setItem(`candles_${obituaryId}`, JSON.stringify({ count: newCount }));
      localStorage.setItem(`candle_lit_${obituaryId}`, 'true');

      setCandleData({ count: newCount, lit: true });

      toast.success('Your candle has been lit in loving memory', {
        icon: <Flame className="h-4 w-4 text-amber-500" />,
      });

      // Animate for 2 seconds
      setTimeout(() => setAnimating(false), 2000);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error('Error lighting candle:', error);
      }
      toast.error('Failed to light candle. Please try again.');
      setAnimating(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200/50 dark:border-amber-800/50 shadow-subtle">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          {/* Animated Candle */}
          <div className={`relative transition-all duration-500 ${animating ? 'scale-110' : 'scale-100'}`}>
            <div className="w-16 h-24 bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-t-lg mx-auto relative">
              {/* Flame */}
              <div 
                className={`absolute -top-8 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
                  candleData.lit ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <Flame 
                  className={`h-8 w-8 text-amber-500 ${
                    candleData.lit ? 'animate-pulse' : ''
                  }`} 
                  fill={candleData.lit ? '#f59e0b' : 'none'}
                />
                {candleData.lit && (
                  <div className="absolute inset-0 blur-xl bg-amber-400/40 rounded-full animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Light a Virtual Candle</h3>
          <p className="text-sm text-muted-foreground">
            {candleData.count === 0 
              ? 'Be the first to light a candle' 
              : `${candleData.count.toLocaleString()} ${candleData.count === 1 ? 'candle has' : 'candles have'} been lit`}
          </p>
        </div>

        <Button
          onClick={lightCandle}
          disabled={loading || candleData.lit}
          className={`gap-2 ${
            candleData.lit 
              ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100' 
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
          }`}
        >
          {candleData.lit ? (
            <>
              <Heart className="h-4 w-4" />
              Candle Lit
            </>
          ) : (
            <>
              <Flame className="h-4 w-4" />
              Light a Candle
            </>
          )}
        </Button>

        {candleData.lit && (
          <p className="text-xs text-muted-foreground italic">
            Your light shines in loving memory
          </p>
        )}
      </div>
    </Card>
  );
};

export default VirtualCandle;
