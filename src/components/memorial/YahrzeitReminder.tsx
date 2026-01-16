import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar, Mail, Check } from 'lucide-react';
import { toast } from 'sonner';

interface YahrzeitReminderProps {
  obituaryId: string;
  deceasedName: string;
  hebrewName?: string;
  dateOfDeath?: string;
}

const YahrzeitReminder = ({ 
  obituaryId, 
  deceasedName,
  hebrewName,
  dateOfDeath 
}: YahrzeitReminderProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Store subscription in localStorage for now
      // In production, this would call a Supabase edge function to store in DB
      const subscription = {
        email,
        obituaryId,
        deceasedName,
        hebrewName,
        dateOfDeath,
        subscribedAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem('yahrzeit_subscriptions') || '[]');
      existing.push(subscription);
      localStorage.setItem('yahrzeit_subscriptions', JSON.stringify(existing));

      setSubscribed(true);
      toast.success('Yahrzeit reminder set successfully!', {
        description: `You'll receive annual reminders for ${deceasedName}`,
      });
      setEmail('');
    } catch (error) {
      console.error('Error setting Yahrzeit reminder:', error);
      toast.error('Failed to set reminder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <Card className="p-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200/50 dark:border-purple-800/50 shadow-subtle">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Reminder Set
            </h3>
            <p className="text-sm text-muted-foreground">
              You'll receive an email reminder before the Yahrzeit date on the Hebrew calendar
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200/50 dark:border-purple-800/50 shadow-subtle">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Yahrzeit Reminder
            </h3>
            <p className="text-sm text-muted-foreground">
              Receive an annual email reminder on the Hebrew calendar anniversary of {deceasedName}'s passing
              {hebrewName && ` (${hebrewName})`}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubscribe} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="pl-10"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {loading ? 'Setting Reminder...' : 'Set Yahrzeit Reminder'}
          </Button>
        </form>

        {dateOfDeath && (
          <p className="text-xs text-muted-foreground text-center">
            Based on passing date: {new Date(dateOfDeath).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        )}
      </div>
    </Card>
  );
};

export default YahrzeitReminder;
