'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, Shield, ArrowLeft } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, isAdmin, signIn, loading: authLoading, profile } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // If user is logged in and is admin, redirect to admin dashboard
    if (!authLoading && user && isAdmin) {
      router.replace('/admin');
      return;
    }
    // If user is logged in, profile is loaded, but not admin, show error
    // Only show error when we're certain profile has been fetched (profile !== null)
    if (!authLoading && user && profile && !isAdmin) {
      setLoading(false); // Reset loading state
      toast({
        title: 'Access Denied',
        description: 'You do not have admin privileges.',
        variant: 'destructive',
      });
    }
    // Safety: if auth loaded and user exists but no profile after a delay, reset loading
    if (!authLoading && user && !profile) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [user, isAdmin, authLoading, router, toast, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.error) {
        toast({
          title: 'Authentication Failed',
          description: result.error.message,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      // Sign-in successful - the useEffect will handle the redirect
      // after profile is loaded and admin status is verified
      toast({
        title: 'Signed in',
        description: 'Verifying admin access...',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // If already logged in as admin, show redirecting message
  if (user && isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p>Redirecting to admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(147,51,234,0.05),transparent_50%)]" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to site link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>

        <Card className="p-8 bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 border border-primary/20">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-slate-400 text-sm">
              Authorized personnel only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-slate-900/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-primary/50 transition-all duration-300"
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-slate-900/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-primary/50 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Security notice */}
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <p className="text-xs text-slate-500 text-center">
              This is a secure area. All login attempts are logged.
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          Jewish Obituary Admin Portal
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
