import Link from "next/link";
import Image from "next/image";
import { Heart, Facebook, Twitter, Instagram } from "lucide-react";
const Footer = () => {
  return <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image src="/lovable-uploads/91d76a8a-9de8-4557-9c73-04d15ac34ba6.png" alt="Jewish Obits Logo" width={24} height={24} className="h-6 w-6" />
              <span className="text-lg font-bold">Jewish Obits</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Honoring Jewish lives and preserving legacies for generations.
            </p>
            <div className="flex space-x-3">
              <Facebook className="h-5 w-5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
              <Twitter className="h-5 w-5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
              <Instagram className="h-5 w-5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/create-obituary" className="opacity-80 hover:opacity-100 transition-opacity">Create Obituary</Link></li>
              <li><Link href="/obituary-helper" className="opacity-80 hover:opacity-100 transition-opacity">AI Obituary Helper</Link></li>
              <li><Link href="/search" className="opacity-80 hover:opacity-100 transition-opacity">Find Obituary</Link></li>
              <li><Link href="/planning" className="opacity-80 hover:opacity-100 transition-opacity">Funeral Planning</Link></li>
              <li><Link href="/funeral-homes" className="opacity-80 hover:opacity-100 transition-opacity">Funeral Homes</Link></li>
              <li><Link href="/flowers" className="opacity-80 hover:opacity-100 transition-opacity">Send Flowers</Link></li>
              <li><Link href="/memorial-trees" className="opacity-80 hover:opacity-100 transition-opacity">Plant a Tree</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resources" className="opacity-80 hover:opacity-100 transition-opacity">Articles & Guides</Link></li>
              <li><Link href="/help" className="opacity-80 hover:opacity-100 transition-opacity">Writing Help</Link></li>
              <li><Link href="/grief-support" className="opacity-80 hover:opacity-100 transition-opacity">Grief Support</Link></li>
              <li><Link href="/faq" className="opacity-80 hover:opacity-100 transition-opacity">FAQ</Link></li>
              <li><Link href="/charities" className="opacity-80 hover:opacity-100 transition-opacity">Donate</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/communities" className="opacity-80 hover:opacity-100 transition-opacity">All Communities</Link></li>
              <li><Link href="/synagogues" className="opacity-80 hover:opacity-100 transition-opacity">Synagogues</Link></li>
              <li><Link href="/schools" className="opacity-80 hover:opacity-100 transition-opacity">Schools</Link></li>
              <li><Link href="/organizations" className="opacity-80 hover:opacity-100 transition-opacity">Organizations</Link></li>
              <li><Link href="/notable" className="opacity-80 hover:opacity-100 transition-opacity">Notable Figures</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link href="/contact" className="opacity-80 hover:opacity-100 transition-opacity">Contact</Link></li>
              <li><Link href="/pricing" className="opacity-80 hover:opacity-100 transition-opacity">Pricing</Link></li>
              <li><Link href="/privacy" className="opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
              <li><Link href="/terms" className="opacity-80 hover:opacity-100 transition-opacity">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
            <p>© 2025 Jewish Obits. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 fill-current" /> for the Jewish community
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;