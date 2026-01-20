'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  MessageSquare,
  Heart,
  RefreshCw,
  Eye,
  Check,
  X,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Obituary {
  id: string;
  full_name: string;
  date_of_death: string | null;
  published: boolean | null;
  created_at: string;
}

interface GuestbookEntry {
  id: string;
  author_name: string;
  message: string;
  status: string | null;
  created_at: string | null;
  obituary_id: string;
}

interface Memory {
  id: string;
  author_name: string;
  body: string;
  status: string | null;
  created_at: string | null;
  obituary_id: string;
}

export default function ContentPage() {
  const [loading, setLoading] = useState(true);
  const [obituaries, setObituaries] = useState<Obituary[]>([]);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    setLoading(true);
    try {
      // Fetch obituaries
      const { data: obits } = await supabase
        .from('obituaries')
        .select('id, full_name, date_of_death, published, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

      // Fetch pending guestbook entries
      const { data: guestbook } = await supabase
        .from('guestbook_entries')
        .select('id, author_name, message, status, created_at, obituary_id')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(50);

      // Fetch pending memories
      const { data: mems } = await supabase
        .from('memories')
        .select('id, author_name, body, status, created_at, obituary_id')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(50);

      setObituaries(obits || []);
      setGuestbookEntries(guestbook || []);
      setMemories(mems || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateGuestbookStatus(id: string, status: 'approved' | 'rejected') {
    try {
      const { error } = await supabase
        .from('guestbook_entries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      // Remove from list
      setGuestbookEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Error updating guestbook entry:', error);
    }
  }

  async function updateMemoryStatus(id: string, status: 'approved' | 'rejected') {
    try {
      const { error } = await supabase
        .from('memories')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      // Remove from list
      setMemories((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  }

  const pendingCount = guestbookEntries.length + memories.length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Content Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage obituaries and moderate user submissions
          </p>
        </div>
        <Button variant="outline" onClick={fetchContent}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Pending Alert */}
      {pendingCount > 0 && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-yellow-800 font-medium">
              {pendingCount} item{pendingCount !== 1 ? 's' : ''} pending moderation
            </p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="obituaries">
        <TabsList className="mb-6">
          <TabsTrigger value="obituaries" className="gap-2">
            <FileText className="h-4 w-4" />
            Obituaries ({obituaries.length})
          </TabsTrigger>
          <TabsTrigger value="guestbook" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Guestbook ({guestbookEntries.length})
          </TabsTrigger>
          <TabsTrigger value="memories" className="gap-2">
            <Heart className="h-4 w-4" />
            Memories ({memories.length})
          </TabsTrigger>
        </TabsList>

        {/* Obituaries Tab */}
        <TabsContent value="obituaries">
          <Card>
            <CardHeader>
              <CardTitle>Obituaries</CardTitle>
              <CardDescription>
                User-created obituaries in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading...
                </div>
              ) : obituaries.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Date of Death</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Created</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {obituaries.map((obit) => (
                        <tr key={obit.id} className="border-b">
                          <td className="p-3 font-medium">{obit.full_name}</td>
                          <td className="p-3">
                            {obit.date_of_death
                              ? new Date(obit.date_of_death).toLocaleDateString()
                              : '-'}
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={obit.published ? 'default' : 'secondary'}
                            >
                              {obit.published ? 'Published' : 'Draft'}
                            </Badge>
                          </td>
                          <td className="p-3">
                            {new Date(obit.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No obituaries found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guestbook Tab */}
        <TabsContent value="guestbook">
          <Card>
            <CardHeader>
              <CardTitle>Pending Guestbook Entries</CardTitle>
              <CardDescription>
                Review and approve guestbook messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading...
                </div>
              ) : guestbookEntries.length > 0 ? (
                <div className="space-y-4">
                  {guestbookEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{entry.author_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.created_at ? new Date(entry.created_at).toLocaleString() : '-'}
                          </p>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <p className="text-sm">{entry.message}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            updateGuestbookStatus(entry.id, 'approved')
                          }
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            updateGuestbookStatus(entry.id, 'rejected')
                          }
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No pending guestbook entries
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Memories Tab */}
        <TabsContent value="memories">
          <Card>
            <CardHeader>
              <CardTitle>Pending Memories</CardTitle>
              <CardDescription>
                Review and approve shared memories
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading...
                </div>
              ) : memories.length > 0 ? (
                <div className="space-y-4">
                  {memories.map((memory) => (
                    <div
                      key={memory.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{memory.author_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {memory.created_at ? new Date(memory.created_at).toLocaleString() : '-'}
                          </p>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <p className="text-sm">{memory.body}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            updateMemoryStatus(memory.id, 'approved')
                          }
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            updateMemoryStatus(memory.id, 'rejected')
                          }
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No pending memories
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
