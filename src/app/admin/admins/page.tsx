'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import {
  UserPlus,
  Shield,
  Trash2,
  Mail,
  AlertTriangle,
  Check,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Admin {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  created_at: string;
}

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { profile } = useAuth();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles' as any)
      .select('*')
      .eq('role', 'admin')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch admins',
        variant: 'destructive',
      });
    } else {
      setAdmins(data as unknown as Admin[]);
    }
    setLoading(false);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingAdmin(true);

    try {
      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('You must be logged in to add admins');
      }

      // Call the server-side API to create the admin
      const response = await fetch('/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          email: newAdminEmail,
          fullName: newAdminName,
          password: newAdminPassword,
          action: 'create',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin');
      }

      toast({
        title: 'Admin Added',
        description: data.message || `${newAdminEmail} has been added as an admin.`,
      });

      setNewAdminEmail('');
      setNewAdminName('');
      setNewAdminPassword('');
      setDialogOpen(false);
      fetchAdmins();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add admin',
        variant: 'destructive',
      });
    } finally {
      setAddingAdmin(false);
    }
  };

  const handleRemoveAdmin = async (admin: Admin) => {
    // Don't allow removing yourself
    if (admin.user_id === profile?.user_id) {
      toast({
        title: 'Cannot Remove',
        description: 'You cannot remove yourself as an admin.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles' as any)
        .update({ role: 'user' })
        .eq('id', admin.id);

      if (error) throw error;

      toast({
        title: 'Admin Removed',
        description: `${admin.email} has been removed from admin role.`,
      });

      fetchAdmins();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to remove admin',
        variant: 'destructive',
      });
    }
  };

  const handlePromoteExistingUser = async () => {
    if (!newAdminEmail) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }

    setAddingAdmin(true);

    try {
      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('You must be logged in to promote users');
      }

      // Call the server-side API to promote the user
      const response = await fetch('/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          email: newAdminEmail,
          fullName: newAdminName || undefined,
          action: 'promote',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to promote user');
      }

      toast({
        title: 'Admin Added',
        description: data.message || `${newAdminEmail} has been promoted to admin.`,
      });

      setNewAdminEmail('');
      setNewAdminName('');
      setDialogOpen(false);
      fetchAdmins();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to promote user',
        variant: 'destructive',
      });
    } finally {
      setAddingAdmin(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Admins</h1>
          <p className="text-muted-foreground mt-1">
            Add or remove administrator access
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Administrator</DialogTitle>
              <DialogDescription>
                Add a new administrator to the system. They will have full access to the admin portal.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddAdmin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  minLength={6}
                  required
                />
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePromoteExistingUser}
                  disabled={addingAdmin || !newAdminEmail}
                  className="w-full sm:w-auto"
                >
                  Promote Existing User
                </Button>
                <Button type="submit" disabled={addingAdmin} className="w-full sm:w-auto">
                  {addingAdmin ? 'Adding...' : 'Create New Admin'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Warning Card */}
      <Card className="p-4 bg-amber-500/10 border-amber-500/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-600 dark:text-amber-400">Important</h3>
            <p className="text-sm text-muted-foreground">
              Administrators have full access to manage content, view analytics, handle leads, and add other admins.
              Only grant admin access to trusted individuals.
            </p>
          </div>
        </div>
      </Card>

      {/* Admins List */}
      <Card>
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Current Administrators</h2>
          <p className="text-sm text-muted-foreground">
            {admins.length} admin{admins.length !== 1 ? 's' : ''} with access
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No administrators found
          </div>
        ) : (
          <div className="divide-y">
            {admins.map((admin) => {
              const isCurrentUser = admin.user_id === profile?.user_id;
              return (
                <div
                  key={admin.id}
                  className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{admin.full_name || 'Unknown'}</p>
                        {isCurrentUser && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {admin.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Added {new Date(admin.created_at).toLocaleDateString()}
                    </Badge>

                    {!isCurrentUser && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Admin Access</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove admin access for {admin.email}?
                              They will no longer be able to access the admin portal.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveAdmin(admin)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Remove Access
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
