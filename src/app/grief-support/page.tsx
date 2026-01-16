'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, BookOpen, Phone, MessageCircle, Video, Mail, ExternalLink, Sparkles } from 'lucide-react';


const griefSupportGroups = [
  {
    title: 'Loss of a Spouse',
    description: 'Support for widows and widowers navigating life after loss',
    icon: Heart,
    resources: ['Weekly support meetings', 'One-on-one counseling', 'Online community']
  },
  {
    title: 'Loss of a Parent',
    description: 'Guidance for adults mourning the loss of a mother or father',
    icon: Users,
    resources: ['Grief workshops', 'Jewish mourning traditions', 'Family support']
  },
  {
    title: 'Loss of a Child',
    description: 'Compassionate support for parents facing unimaginable loss',
    icon: Heart,
    resources: ['Specialized counseling', 'Parent support groups', 'Memorial resources']
  },
  {
    title: 'Loss of a Sibling',
    description: 'Support for those mourning a brother or sister',
    icon: Users,
    resources: ['Sibling grief groups', 'Family counseling', 'Healing resources']
  }
];

const jewishResources = [
  {
    title: 'Understanding Jewish Mourning Traditions',
    description: 'A comprehensive guide to Shiva, Sheloshim, Kaddish, and Yahrzeit observance',
    category: 'Jewish Customs',
    readTime: '10 min read'
  },
  {
    title: 'The Meaning and Practice of Sitting Shiva',
    description: 'Everything you need to know about the seven-day mourning period',
    category: 'Jewish Customs',
    readTime: '8 min read'
  },
  {
    title: 'Finding Comfort in Jewish Wisdom',
    description: 'Ancient teachings and modern perspectives on grief and healing',
    category: 'Spiritual Support',
    readTime: '12 min read'
  },
  {
    title: 'Kaddish: The Mourner\'s Prayer Explained',
    description: 'Understanding the meaning and significance of reciting Kaddish',
    category: 'Jewish Customs',
    readTime: '7 min read'
  },
  {
    title: 'Yahrzeit: Honoring the Anniversary',
    description: 'How to observe and honor your loved one\'s Hebrew calendar anniversary',
    category: 'Jewish Customs',
    readTime: '6 min read'
  },
  {
    title: 'Supporting Someone Sitting Shiva',
    description: 'What to say, what to bring, and how to offer meaningful comfort',
    category: 'Etiquette',
    readTime: '9 min read'
  }
];

const professionalResources = [
  {
    name: 'Jewish Family Services',
    description: 'Professional counseling and bereavement support',
    phone: '1-800-567-JEWISH',
    website: 'www.jfs.org',
    services: ['Individual Counseling', 'Group Therapy', 'Family Support']
  },
  {
    name: 'National Alliance for Grieving Children',
    description: 'Resources for children and families dealing with loss',
    phone: '1-866-432-1542',
    website: 'www.nationalallianceforgrievingchildren.org',
    services: ['Youth Programs', 'Parent Guidance', 'School Resources']
  },
  {
    name: 'Our House Grief Support Center',
    description: 'Free grief support services for children and adults',
    phone: '1-888-417-1444',
    website: 'www.ourhouse-grief.org',
    services: ['Support Groups', 'Workshops', 'Online Resources']
  }
];

const GriefSupport = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 via-background to-background py-20">
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_0%,_transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Compassionate Support</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              You Are Not Alone
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Grief is a journey that no one should walk alone. Whether you&apos;re mourning a recent loss or remembering a loved one from years past, we&apos;re here to support you with compassion, understanding, and Jewish wisdom.
            </p>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-foreground mb-2 text-lg">24/7 Crisis Support Available</h3>
                    <p className="text-muted-foreground mb-3">
                      If you&apos;re in crisis or need immediate help, compassionate support is available right now.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild>
                        <a href="tel:988">
                          <Phone className="h-4 w-4 mr-2" />
                          Call 988 Now
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="sms:988">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Text 988
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support by Type of Loss */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Specialized Support</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Support by Type of Loss</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Different losses require different kinds of support. Find resources specifically tailored to your unique situation and journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {griefSupportGroups.map((group, index) => (
                <Card key={index} className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border-l-4 border-l-primary/0 hover:border-l-primary">
                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <group.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{group.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {group.resources.map((resource, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                      <Link href="/grief-support">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jewish Grief Resources */}
      <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">Jewish Traditions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Jewish Wisdom on Grief</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                In Jewish tradition, mourning is a sacred process guided by ancient wisdom. From the immediate grief of Shiva to the annual remembrance of Yahrzeit, our customs provide structure, meaning, and comfort during life&apos;s most difficult moments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jewishResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {resource.category}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{resource.readTime}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/resources">
                          Read Article
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Resources */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Support Services</h2>
              <p className="text-muted-foreground">
                Sometimes professional guidance can help you navigate the grieving process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {professionalResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{resource.name}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${resource.phone.replace(/\D/g, '')}`} className="text-muted-foreground hover:text-primary">
                          {resource.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ExternalLink className="h-4 w-4 text-primary" />
                        <a href={`https://${resource.website}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          {resource.website}
                        </a>
                      </div>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {resource.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Support Options */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">More Ways to Find Support</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Video className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Online Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with others through virtual support groups
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Find a Group
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Community Forums</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your story and read others&apos; experiences
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Join Forum
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Reading Library</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Books on grief, healing, and Jewish perspectives
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/resources">
                      Browse Library
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Newsletter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Weekly comfort and guidance in your inbox
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl font-serif italic text-muted-foreground mb-4">
              &quot;The deeper that sorrow carves into your being, the more joy you can contain.&quot;
            </blockquote>
            <p className="text-muted-foreground">- Kahlil Gibran</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_hsl(var(--primary)/0.15)_0%,_transparent_50%)]" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">We&apos;re Here to Help</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Support Right Now?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Our compassionate team is available to help guide you through this difficult time. Whether you need guidance on Jewish mourning customs, support resources, or simply someone to talk to, we&apos;re here for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/contact">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Us
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <a href="tel:988">
                  <Phone className="h-5 w-5 mr-2" />
                  Crisis Hotline: 988
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Available 24/7 for immediate crisis support
            </p>
          </div>
        </div>
      </section>
    </main>

      <Footer />
    </div>
  );
};

export default GriefSupport;
