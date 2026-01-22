'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  MousePointerClick,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  UserPlus,
  Package,
  Building2,
  Newspaper,
  Briefcase,
  ClipboardCheck,
  Database,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/funnels', label: 'Funnels', icon: Filter },
  { href: '/admin/clicks', label: 'Click Tracking', icon: MousePointerClick },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/content', label: 'Content', icon: FileText },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/vendors', label: 'Vendors', icon: Building2 },
  { href: '/admin/claims', label: 'Vendor Claims', icon: ClipboardCheck },
  { href: '/admin/industries', label: 'Industry Pages', icon: Briefcase },
  { href: '/admin/scraping', label: 'Scraping', icon: Database },
  { href: '/admin/pages', label: 'Notable Figures', icon: Newspaper },
  { href: '/admin/admins', label: 'Manage Admins', icon: UserPlus },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAdmin, loading, signOut, profile } = useAuth();

  // Skip auth check for login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Don't redirect if on login page
    if (isLoginPage) return;

    // Wait for auth to load
    if (loading) return;

    // If not logged in, redirect to admin login
    if (!user) {
      router.replace('/admin/login');
      return;
    }

    // If logged in but profile not yet loaded, wait
    // (profile will be fetched by useAuth after user is set)
    if (!profile) {
      // Profile is still loading, don't redirect yet
      return;
    }

    // If logged in but not admin, redirect to home
    if (!isAdmin) {
      router.replace('/');
      return;
    }
  }, [user, isAdmin, loading, router, isLoginPage, profile]);

  // Track profile loading timeout
  const [profileTimeout, setProfileTimeout] = React.useState(false);

  React.useEffect(() => {
    // If user exists but profile is still null after 5 seconds, stop waiting
    if (user && !profile && !loading) {
      const timeout = setTimeout(() => {
        setProfileTimeout(true);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [user, profile, loading]);

  // Define handleSignOut early so it can be used in error states
  const handleSignOut = async () => {
    await signOut();
    router.replace('/admin/login');
  };

  // Show loading state while checking auth or loading profile (with timeout)
  if (!isLoginPage && (loading || (user && !profile && !profileTimeout))) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : 'Loading profile...'}
          </p>
        </div>
      </div>
    );
  }

  // Handle case where profile couldn't be loaded (timeout or error)
  if (!isLoginPage && user && !profile && profileTimeout) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">!</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <p className="text-muted-foreground mb-6">
            Unable to load your admin profile. This may happen if your account doesn&apos;t have admin privileges or there&apos;s a connection issue.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Don't render admin layout for login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Don't render if not authenticated as admin
  if (!user || !profile || !isAdmin) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">JO</span>
              </div>
              <span className="font-semibold text-lg">Admin Portal</span>
            </Link>
          </div>

          {/* User info */}
          <div className="px-4 py-3 border-b bg-muted/30">
            <p className="text-sm font-medium truncate">{profile?.full_name || profile?.email}</p>
            <p className="text-xs text-muted-foreground truncate">{profile?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-2">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                Back to Site
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
