import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, User, Calendar, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { z } from 'zod';

const guestbookSchema = z.object({
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
  authorName: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters")
});

interface GuestbookEntry {
  id: string;
  author_name: string;
  message: string;
  created_at: string | null;
  status: string | null;
}

interface GuestbookSectionProps {
  obituaryId: string;
  isOwner: boolean;
  canPost: boolean;
}

const GuestbookSection = ({ obituaryId, isOwner, canPost }: GuestbookSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    authorName: '',
    message: ''
  });

  useEffect(() => {
    fetchEntries();
  }, [obituaryId]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook_entries')
        .select('*')
        .eq('obituary_id', obituaryId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error('Error fetching guestbook entries:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      // Validate input
      const validationResult = guestbookSchema.safeParse({
        message: formData.message,
        authorName: formData.authorName || user?.user_metadata?.full_name || 'Anonymous'
      });

      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues[0]?.message || "Invalid input";
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from('guestbook_entries')
        .insert({
          obituary_id: obituaryId,
          author_user_id: user?.id || null,
          author_name: validationResult.data.authorName,
          message: validationResult.data.message,
          // Status is set by database trigger based on ownership
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Condolence sent",
        description: isOwner 
          ? "Your message has been added to the guestbook." 
          : "Your condolence is pending approval and will appear soon.",
      });

      // Reset form
      setFormData({ authorName: '', message: '' });
      setShowForm(false);

      // Add to list if approved
      if (data.status === 'approved') {
        setEntries(prev => [data, ...prev]);
      }

    } catch (error: any) {
      if (process.env.NODE_ENV !== "production") {
        console.error('Error submitting condolence:', error);
      }
      toast({
        title: "Error",
        description: "Failed to send condolence. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse text-muted-foreground">Loading guestbook...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {canPost && (
        <div className="flex justify-center">
          <Button
            onClick={() => setShowForm(!showForm)}
            variant={showForm ? "secondary" : "outline"}
          >
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? 'Cancel' : 'Leave a Condolence'}
          </Button>
        </div>
      )}

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="condolence-message">Your Message *</Label>
              <Textarea
                id="condolence-message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Share your condolences, thoughts, or prayers for the family..."
                rows={3}
                className="mt-1"
                required
              />
            </div>

            {!user && (
              <div>
                <Label htmlFor="condolence-name">Your Name *</Label>
                <Input
                  id="condolence-name"
                  value={formData.authorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                  placeholder="Enter your name"
                  className="mt-1"
                  required
                />
              </div>
            )}

            <div className="flex gap-3">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Condolence'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {entries.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">No condolences yet</p>
          <p className="text-muted-foreground">
            Be the first to leave a message of comfort for the family
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{entry.author_name}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{entry.created_at ? format(new Date(entry.created_at), 'MMMM d, yyyy') : 'Unknown date'}</span>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  {entry.message.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestbookSection;