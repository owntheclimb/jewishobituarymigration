"use client";

import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { 
  PenTool, 
  Search, 
  Users, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Home, 
  Award,
  Heart,
  Flower2,
  BookOpen,
  TreePine,
  HandHeart,
  BookMarked,
  Menu,
  User,
  LogOut
} from "lucide-react";

interface MobileMenuLinkProps {
  href: string;
  icon: any;
  title: string;
  onClick?: () => void;
}

const MobileMenuLink = ({ href, icon: Icon, title, onClick }: MobileMenuLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
  >
    <div className="p-2 rounded-md bg-primary/10">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <span className="text-sm font-medium">{title}</span>
  </Link>
);

const MobileMenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-primary/70 mb-2">
      {title}
    </h3>
    {children}
  </div>
);

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenu = ({ open, onOpenChange }: MobileMenuProps) => {
  const { user, loading, signOut } = useAuth();
  const closeMenu = () => onOpenChange(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>Menu</SheetTitle>
          {user && !loading && (
            <div className="flex items-center gap-3 pt-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {user.user_metadata?.full_name ? getInitials(user.user_metadata.full_name) : <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">{user.user_metadata?.full_name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="px-3 py-4 space-y-6">
            {/* Create an Obituary */}
            <MobileMenuSection title="Create an Obituary">
              <MobileMenuLink
                href="/create-obituary"
                icon={PenTool}
                title="Create an Obituary"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/obituary-helper"
                icon={BookOpen}
                title="Obituary Templates"
                onClick={closeMenu}
              />
            </MobileMenuSection>

            <Separator />

            {/* Find an Obituary */}
            <MobileMenuSection title="Find an Obituary">
              <MobileMenuLink
                href="/search"
                icon={Search}
                title="Search All"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/communities"
                icon={Users}
                title="Communities"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/synagogues"
                icon={Building2}
                title="Synagogues"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/schools"
                icon={GraduationCap}
                title="Schools"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/organizations"
                icon={Briefcase}
                title="Organizations"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/funeral-homes"
                icon={Home}
                title="Funeral Homes"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/notable"
                icon={Award}
                title="Notable Figures"
                onClick={closeMenu}
              />
            </MobileMenuSection>

            <Separator />

            {/* Resources & Support */}
            <MobileMenuSection title="Resources & Support">
              <MobileMenuLink
                href="/grief-support"
                icon={Heart}
                title="Grief Support"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/flowers"
                icon={Flower2}
                title="Sympathy Store"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/planning"
                icon={BookOpen}
                title="Planning Guides"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/resources"
                icon={BookMarked}
                title="Jewish Traditions"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/memorial-trees"
                icon={TreePine}
                title="Memorial Trees"
                onClick={closeMenu}
              />
              <MobileMenuLink
                href="/charities"
                icon={HandHeart}
                title="Make a Donation"
                onClick={closeMenu}
              />
            </MobileMenuSection>
            {user && (
              <>
                <Separator />
                <MobileMenuSection title="My Account">
                  <MobileMenuLink
                    href="/account"
                    icon={User}
                    title="My Account"
                    onClick={closeMenu}
                  />
                </MobileMenuSection>
              </>
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background space-y-2">
          {loading ? (
            <div className="h-9 w-full bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <>
              <Button variant="elegant" className="w-full" asChild onClick={closeMenu}>
                <Link href="/create-obituary">Create Obituary</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={() => {
                closeMenu();
                void (async () => {
                  await signOut();
                  window.location.href = '/auth';
                })();
              }}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="w-full" asChild onClick={closeMenu}>
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button variant="elegant" className="w-full" asChild onClick={closeMenu}>
                <Link href="/create-obituary">Create Obituary</Link>
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
