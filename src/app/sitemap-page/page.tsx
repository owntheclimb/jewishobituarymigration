'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, FileText, Users, Heart, Building2, Book, Phone } from 'lucide-react';

const SitemapPage = () => {
  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: Map,
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Pricing', path: '/pricing' },
      ]
    },
    {
      title: 'Create & Find',
      icon: FileText,
      links: [
        { name: 'Create Obituary', path: '/create' },
        { name: 'AI Obituary Helper', path: '/obituary-helper' },
        { name: 'Search Obituaries', path: '/search' },
        { name: 'Browse by State', path: '/obituaries' },
        { name: 'Writing Help', path: '/help' },
        { name: 'Notable Figures', path: '/notable' },
      ]
    },
    {
      title: 'Communities',
      icon: Users,
      links: [
        { name: 'All Communities', path: '/communities' },
        { name: 'Synagogues', path: '/synagogues' },
        { name: 'Jewish Schools', path: '/schools' },
        { name: 'Organizations', path: '/organizations' },
      ]
    },
    {
      title: 'Planning & Support',
      icon: Heart,
      links: [
        { name: 'Funeral Planning', path: '/planning' },
        { name: 'Funeral Home Directory', path: '/funeral-homes' },
        { name: 'Grief Support', path: '/grief-support' },
        { name: 'Resources & Articles', path: '/resources' },
      ]
    },
    {
      title: 'Sympathy Services',
      icon: Building2,
      links: [
        { name: 'Send Flowers', path: '/flowers' },
        { name: 'Plant Memorial Trees', path: '/memorial-trees' },
        { name: 'Charitable Donations', path: '/charities' },
        { name: 'Memorial Pages', path: '/memorial' },
      ]
    },
    {
      title: 'Legal & Support',
      icon: Book,
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Sitemap', path: '/sitemap-page' },
        { name: 'XML Sitemap', path: '/sitemap-external-obituaries.xml' },
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Site Map</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Navigate our comprehensive platform dedicated to honoring Jewish lives and preserving legacies
              </p>
            </div>

            {/* Sitemap Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sitemapSections.map((section, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.path}
                            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact CTA */}
            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardContent className="text-center py-12">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Need Help Finding Something?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our compassionate support team is here to assist you in navigating our platform
                  and finding the resources you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      Contact Support
                    </button>
                  </Link>
                  <Link href="/faq">
                    <button className="px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors">
                      View FAQ
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p>
                Jewish Obits is committed to providing comprehensive memorial services for the Jewish community.
              </p>
              <p className="mt-2">
                All content 2025 Jewish Obits. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SitemapPage;
