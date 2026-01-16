import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bell, BellOff } from 'lucide-react';

interface SubscribeButtonProps {
  communityId: string;
  communityName: string;
  isSubscribed?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  onSubscriptionChange?: (subscribed: boolean) => void;
}

const SubscribeButton = ({ 
  communityId, 
  communityName, 
  isSubscribed = false, 
  variant = 'outline',
  size = 'default',
  onSubscriptionChange 
}: SubscribeButtonProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(isSubscribed);

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to subscribe to community updates.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (subscribed) {
        // Unsubscribe
        const { error } = await supabase
          .from('subscriptions')
          .delete()
          .eq('user_id', user.id)
          .eq('community_id', communityId);

        if (error) throw error;

        setSubscribed(false);
        onSubscriptionChange?.(false);
        toast({
          title: "Unsubscribed",
          description: `You've unsubscribed from ${communityName} updates.`,
        });
      } else {
        // Subscribe
        const { error } = await supabase
          .from('subscriptions')
          .insert({
            user_id: user.id,
            community_id: communityId,
          });

        if (error) throw error;

        setSubscribed(true);
        onSubscriptionChange?.(true);
        toast({
          title: "Subscribed!",
          description: `You'll receive daily updates for ${communityName}.`,
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: "Failed to update subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSubscribe}
      disabled={loading}
      className="transition-all duration-200"
    >
      {subscribed ? (
        <>
          <BellOff className="h-4 w-4 mr-2" />
          {loading ? 'Unsubscribing...' : 'Unsubscribe'}
        </>
      ) : (
        <>
          <Bell className="h-4 w-4 mr-2" />
          {loading ? 'Subscribing...' : 'Subscribe'}
        </>
      )}
    </Button>
  );
};

export default SubscribeButton;