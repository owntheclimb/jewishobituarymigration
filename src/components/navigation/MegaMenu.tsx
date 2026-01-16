import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  PenTool, 
  FileText, 
  BookOpen, 
  Search, 
  Users, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Home, 
  Award,
  Heart,
  Flower2,
  Gift,
  BookMarked,
  TreePine,
  HandHeart
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced menu link component with refined hover states
const MenuLink = ({
  href,
  icon: Icon,
  title,
  description,
  featured = false
}: {
  href: string;
  icon: any;
  title: string;
  description?: string;
  featured?: boolean;
}) => (
  <Link href={href}>
    <div className={cn(
      "group block select-none rounded-xl p-4 leading-none no-underline outline-none",
      "transition-all duration-300 ease-in-out",
      "hover:bg-muted/50",
      featured && "bg-gradient-to-br from-primary/5 to-transparent border-b border-primary/10"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "mt-0.5 rounded-lg p-2 transition-all duration-300",
          "bg-primary/10 text-primary",
          "group-hover:bg-primary/20 group-hover:scale-110"
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className={cn(
            "text-sm font-semibold leading-tight mb-1 transition-colors duration-300",
            "text-foreground group-hover:text-primary"
          )}>
            {title}
          </div>
          {description && (
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  </Link>
);

// Section header component for menu organization
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 pt-3 pb-2">
    <h3 className="text-xs font-semibold uppercase tracking-wider text-primary/70 font-cormorant">
      {children}
    </h3>
    <div className="mt-1 h-px w-12 bg-gradient-to-r from-primary/30 to-transparent" />
  </div>
);

const MegaMenu = () => {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        {/* Create an Obituary Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "h-11 px-4 font-medium text-sm tracking-wide transition-all duration-300",
            "hover:bg-muted/50 data-[state=open]:bg-muted/50",
            "border-b-2 border-transparent hover:border-primary/30 data-[state=open]:border-primary",
            "rounded-none rounded-t-lg"
          )}>
            Create an Obituary
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-background/95 backdrop-blur-xl border shadow-elegant">
            <div className="w-[520px] p-4">
              <div className="grid gap-3">
                <SectionHeader>Get Started</SectionHeader>
                <MenuLink
                  href="/create-obituary"
                  icon={PenTool}
                  title="Create an Obituary"
                  description="Start writing a beautiful tribute to your loved one with our guided editor"
                  featured
                />
                <MenuLink
                  href="/writing-help"
                  icon={FileText}
                  title="Writing Help"
                  description="Get assistance and guidance on crafting the perfect obituary"
                />
                
                <SectionHeader>Resources</SectionHeader>
                <div className="grid grid-cols-2 gap-3">
                  <MenuLink
                    href="/obituary-helper"
                    icon={BookOpen}
                    title="Obituary Templates"
                    description="Browse professionally designed templates"
                  />
                  <MenuLink
                    href="/articles"
                    icon={BookMarked}
                    title="Writing Tips"
                    description="Expert advice and guidelines"
                  />
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Find an Obituary Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "h-11 px-4 font-medium text-sm tracking-wide transition-all duration-300",
            "hover:bg-muted/50 data-[state=open]:bg-muted/50",
            "border-b-2 border-transparent hover:border-blue-500/30 data-[state=open]:border-blue-500",
            "rounded-none rounded-t-lg"
          )}>
            Find an Obituary
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-background/95 backdrop-blur-xl border shadow-elegant">
            <div className="w-[580px] p-4">
              <div className="grid gap-3">
                <SectionHeader>Search</SectionHeader>
                <MenuLink
                  href="/search"
                  icon={Search}
                  title="Search All Obituaries"
                  description="Find obituaries across all communities and organizations"
                  featured
                />
                
                <SectionHeader>Browse by Category</SectionHeader>
                <div className="grid grid-cols-2 gap-3">
                  <MenuLink
                    href="/communities"
                    icon={Users}
                    title="Communities"
                    description="Browse by Jewish community"
                  />
                  <MenuLink
                    href="/synagogues"
                    icon={Building2}
                    title="Synagogues"
                    description="Find by synagogue affiliation"
                  />
                  <MenuLink
                    href="/schools"
                    icon={GraduationCap}
                    title="Schools"
                    description="Search by educational institution"
                  />
                  <MenuLink
                    href="/organizations"
                    icon={Briefcase}
                    title="Organizations"
                    description="Browse by organization"
                  />
                  <MenuLink
                    href="/funeral-homes"
                    icon={Home}
                    title="Funeral Homes"
                    description="Find by funeral home"
                  />
                  <MenuLink
                    href="/notable"
                    icon={Award}
                    title="Notable Figures"
                    description="Prominent community members"
                  />
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Resources & Support Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "h-11 px-4 font-medium text-sm tracking-wide transition-all duration-300",
            "hover:bg-muted/50 data-[state=open]:bg-muted/50",
            "border-b-2 border-transparent hover:border-green-500/30 data-[state=open]:border-green-500",
            "rounded-none rounded-t-lg"
          )}>
            Resources & Support
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-background/95 backdrop-blur-xl border shadow-elegant">
            <div className="w-[580px] p-4">
              <div className="grid gap-3">
                <SectionHeader>Support Services</SectionHeader>
                <div className="grid grid-cols-2 gap-3">
                  <MenuLink
                    href="/grief-support"
                    icon={Heart}
                    title="Grief Support"
                    description="Find comfort and guidance"
                    featured
                  />
                  <MenuLink
                    href="/flowers"
                    icon={Flower2}
                    title="Sympathy Store"
                    description="Flowers and memorial gifts"
                    featured
                  />
                </div>

                <SectionHeader>Planning & Traditions</SectionHeader>
                <div className="grid grid-cols-2 gap-3">
                  <MenuLink
                    href="/planning"
                    icon={BookOpen}
                    title="Planning Guides"
                    description="Step-by-step funeral planning"
                  />
                  <MenuLink
                    href="/resources"
                    icon={BookMarked}
                    title="Jewish Traditions"
                    description="Customs and practices"
                  />
                  <MenuLink
                    href="/memorial-trees"
                    icon={TreePine}
                    title="Memorial Trees"
                    description="Plant a living tribute"
                  />
                  <MenuLink
                    href="/charities"
                    icon={HandHeart}
                    title="Make a Donation"
                    description="Honor their memory"
                  />
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MegaMenu;
