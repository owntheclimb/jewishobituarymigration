'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, BookOpen, CheckCircle, Users, Calendar, Heart } from 'lucide-react';

const resources = [
  {
    id: 'funeral-checklist',
    title: 'Jewish Funeral Planning Checklist',
    description: 'Comprehensive step-by-step checklist covering everything from immediate notifications to post-burial arrangements',
    icon: CheckCircle,
    category: 'Planning',
    pages: '8 pages',
    format: 'PDF'
  },
  {
    id: 'shiva-guide',
    title: 'Complete Shiva Planning Guide',
    description: 'Detailed guide to preparing your home for shiva, coordinating meals, managing visitors, and understanding customs',
    icon: Users,
    category: 'Mourning',
    pages: '12 pages',
    format: 'PDF'
  },
  {
    id: 'obituary-workbook',
    title: 'Obituary Writing Workbook',
    description: 'Interactive workbook with prompts, templates, and examples to help you craft a meaningful tribute',
    icon: FileText,
    category: 'Writing',
    pages: '16 pages',
    format: 'PDF'
  },
  {
    id: 'memorial-service-program',
    title: 'Memorial Service Program Templates',
    description: 'Customizable templates for funeral and memorial service programs with traditional Jewish elements',
    icon: BookOpen,
    category: 'Planning',
    pages: '10 templates',
    format: 'PDF + DOCX'
  },
  {
    id: 'yahrzeit-tracker',
    title: 'Yahrzeit Observance Calendar',
    description: 'Annual calendar for tracking yahrzeits with Hebrew date converter and reminder system',
    icon: Calendar,
    category: 'Remembrance',
    pages: '4 pages',
    format: 'PDF'
  },
  {
    id: 'sympathy-messages',
    title: 'Jewish Sympathy Messages Guide',
    description: 'Appropriate condolence messages and phrases for cards, guestbooks, and conversations',
    icon: Heart,
    category: 'Support',
    pages: '6 pages',
    format: 'PDF'
  },
  {
    id: 'hebrew-obituary-guide',
    title: 'Including Hebrew Names in Obituaries',
    description: 'Guide to properly including Hebrew names, transliterations, and traditional phrases',
    icon: FileText,
    category: 'Writing',
    pages: '5 pages',
    format: 'PDF'
  },
  {
    id: 'unveiling-planner',
    title: 'Unveiling Ceremony Planner',
    description: 'Complete guide to planning a headstone dedication with service outlines and invitation templates',
    icon: Calendar,
    category: 'Planning',
    pages: '8 pages',
    format: 'PDF'
  }
];

const categories = [
  { name: 'All Resources', count: resources.length },
  { name: 'Planning', count: resources.filter(r => r.category === 'Planning').length },
  { name: 'Writing', count: resources.filter(r => r.category === 'Writing').length },
  { name: 'Mourning', count: resources.filter(r => r.category === 'Mourning').length },
  { name: 'Support', count: resources.filter(r => r.category === 'Support').length },
  { name: 'Remembrance', count: resources.filter(r => r.category === 'Remembrance').length }
];

const DownloadableResources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Download className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Downloadable Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Free guides, templates, and planning tools to help you through every aspect of Jewish mourning and memorial traditions
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((cat) => (
              <Badge key={cat.name} variant="secondary" className="px-4 py-2">
                {cat.name} ({cat.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.id} className="hover:shadow-elegant transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline">{resource.category}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                    <CardDescription className="text-base">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <span>{resource.pages}</span>
                      <span>{resource.format}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why These Resources */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Download Our Resources?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">Culturally Authentic</h3>
              <p className="text-muted-foreground">Created by Jewish educators and rabbis familiar with traditions</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">Immediately Useful</h3>
              <p className="text-muted-foreground">Practical tools you can use right away during difficult times</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">Completely Free</h3>
              <p className="text-muted-foreground">No hidden costs or registration required</p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">Print & Share</h3>
              <p className="text-muted-foreground">Download, print, and share with family members as needed</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Explore our full library of articles or create a memorial
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/resources">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Articles
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/create-obituary">
                <Heart className="mr-2 h-5 w-5" />
                Create Memorial
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DownloadableResources;
