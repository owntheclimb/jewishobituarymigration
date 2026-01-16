import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Heart, User, Calendar, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { z } from 'zod';

const memorySchema = z.object({
  body: z.string().trim().min(1, "Memory is required").max(5000, "Memory must be less than 5000 characters"),
  authorName: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters")
});

interface Memory {
  id: string;
  author_name: string;
  body: string;
  created_at: string | null;
  status: string | null;
}

interface MemorySectionProps {
  obituaryId: string;
  isOwner: boolean;
  canPost: boolean;
}

const MemorySection = ({ obituaryId, isOwner, canPost }: MemorySectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    authorName: '',
    body: ''
  });

  useEffect(() => {
    fetchMemories();
  }, [obituaryId]);

  const fetchMemories = async () => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('obituary_id', obituaryId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMemories(data || []);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error('Error fetching memories:', error);
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
      const validationResult = memorySchema.safeParse({
        body: formData.body,
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
        .from('memories')
        .insert({
          obituary_id: obituaryId,
          author_user_id: user?.id || null,
          author_name: validationResult.data.authorName,
          body: validationResult.data.body,
          // Status is set by database trigger based on ownership
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Memory shared",
        description: data.status === 'approved'
          ? "Your memory has been added to the memorial." 
          : "Your memory is pending approval and will appear soon.",
      });

      // Reset form
      setFormData({ authorName: '', body: '' });
      setShowForm(false);

      // Add to list if approved
      if (data.status === 'approved') {
        setMemories(prev => [data, ...prev]);
      }

    } catch (error: any) {
      if (process.env.NODE_ENV !== "production") {
        console.error('Error submitting memory:', error);
      }
      toast({
        title: "Error",
        description: "Failed to share memory. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse text-muted-foreground">Loading memories...</div>
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
            {showForm ? 'Cancel' : 'Share a Memory'}
          </Button>
        </div>
      )}

      {showForm && (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="memory-body">Your Memory *</Label>
              <Textarea
                id="memory-body"
                value={formData.body}
                onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
                placeholder="Share a favorite memory, story, or reflection about this person..."
                rows={4}
                className="mt-1"
                required
              />
            </div>

            {!user && (
              <div>
                <Label htmlFor="author-name">Your Name *</Label>
                <Input
                  id="author-name"
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
                {submitting ? 'Sharing...' : 'Share Memory'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {memories.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground mb-2">No memories shared yet</p>
          <p className="text-muted-foreground">
            Be the first to share a cherished memory or story
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {memories.map((memory) => (
            <Card key={memory.id} className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{memory.author_name}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{memory.created_at ? format(new Date(memory.created_at), 'MMMM d, yyyy') : 'Unknown date'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  {memory.body.split('\n').map((paragraph, index) => (
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

export default MemorySection;