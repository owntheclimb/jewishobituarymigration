'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Sparkles } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'Forever',
    description: 'Perfect for creating a simple, heartfelt tribute',
    bestFor: 'One memorial with essential features',
    badge: null,
    features: [
      'Create one obituary',
      'Basic memorial page',
      'Up to 3 photos',
      'Guest book with up to 25 entries',
      'Share via email and social media',
      'Search listing included',
      'Basic support'
    ],
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const,
    popular: false
  },
  {
    name: 'Premium',
    price: '$49',
    period: 'One-time',
    description: 'Enhanced memorial with unlimited memories',
    bestFor: 'A richer memorial for one loved one',
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Unlimited photos and videos',
      'Unlimited guest book entries',
      'Custom memorial themes',
      'Virtual candle lighting',
      'Memory timeline',
      'Premium placement in search',
      'Remove ads',
      'PDF download',
      'Priority support',
      'Yahrzeit reminder service'
    ],
    cta: 'Choose Premium',
    ctaVariant: 'default' as const,
    popular: true
  },
  {
    name: 'Lifetime',
    price: '$149',
    period: 'One-time',
    description: 'Complete memorial solution with all features',
    bestFor: 'Families managing multiple memorials over time',
    badge: 'Best Value',
    features: [
      'Everything in Premium',
      'Unlimited obituaries',
      'Featured homepage placement',
      'Custom domain option',
      'Video tributes (up to 10 min)',
      'Advanced analytics',
      'Family collaboration tools',
      'Dedicated account manager',
      '24/7 premium support',
      'Lifetime updates',
      'Memorial website builder'
    ],
    cta: 'Choose Lifetime',
    ctaVariant: 'default' as const,
    popular: false
  }
];

const additionalServices = [
  {
    title: 'Newspaper Publishing',
    description: 'Publish your obituary in local and national newspapers',
    price: 'Varies by publication',
    features: [
      'Major Jewish publications',
      'Local newspapers',
      'National outlets',
      'Print and online editions'
    ]
  },
  {
    title: 'Professional Writing Service',
    description: 'Let our experienced writers craft a beautiful tribute',
    price: 'Starting at $99',
    features: [
      'Phone interview with family',
      'Professional writing and editing',
      'Multiple revision rounds',
      '48-hour turnaround'
    ]
  },
  {
    title: 'Video Memorial Production',
    description: 'Professional video tribute with photos and music',
    price: 'Starting at $199',
    features: [
      'Up to 50 photos',
      'Professional editing',
      'Custom music selection',
      'HD quality output'
    ]
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Choose the right memorial level for your family. No hidden fees, and paid plans are one-time purchases.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingTiers.map((tier, index) => (
                  <Card
                    key={index}
                    className={`relative ${tier.popular ? 'border-primary shadow-elegant scale-105' : 'hover:shadow-lg'} transition-all duration-300`}
                  >
                    {tier.badge && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4 py-1">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {tier.badge}
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="text-center pb-8 pt-8">
                      <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                      <div className="mb-2">
                        <span className="text-4xl font-bold">{tier.price}</span>
                        <span className="text-muted-foreground ml-2">{tier.period}</span>
                      </div>
                      <CardDescription className="text-base">{tier.description}</CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">
                        <span className="font-medium">Best for:</span> {tier.bestFor}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant={tier.ctaVariant}
                        className={`w-full ${tier.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                        size="lg"
                        asChild
                      >
                        <Link href="/create-obituary">{tier.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="mt-8 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">What&apos;s the difference between levels?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Free:</strong> 1 obituary, up to 3 photos, 25 guestbook messages.</li>
                    <li><strong className="text-foreground">Premium:</strong> everything in Free + unlimited photos/videos, timeline, and premium placement.</li>
                    <li><strong className="text-foreground">Lifetime:</strong> everything in Premium + unlimited obituaries and advanced family tools.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Additional Services</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Enhance your memorial with professional services tailored to your needs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {additionalServices.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                      <div className="pt-2">
                        <span className="text-2xl font-bold text-primary">{service.price}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Funeral Home Partnership */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl mb-4">For Funeral Homes & Organizations</CardTitle>
                  <CardDescription className="text-lg">
                    Join our network and offer comprehensive memorial services to the families you serve
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">Unlimited</div>
                      <div className="text-sm text-muted-foreground">Obituaries</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">Featured</div>
                      <div className="text-sm text-muted-foreground">Directory Listing</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">Dedicated</div>
                      <div className="text-sm text-muted-foreground">Support Team</div>
                    </div>
                  </div>
                  <Button size="lg" asChild>
                    <Link href="/contact">Request Partnership Info</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I upgrade or downgrade my plan?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You can upgrade at any time by paying only the difference to the higher tier. Because plans are one-time purchases, there is no monthly downgrade billing cycle.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What happens if I cancel?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      There are no recurring subscriptions on memorial plans, so nothing renews automatically. Your memorial remains active based on the plan you purchased.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not completely satisfied, contact us for a full refund.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is my payment information secure?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Absolutely. We use industry-standard encryption and never store your payment details. All transactions are processed through secure, PCI-compliant payment providers.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">Still have questions?</p>
                <Button variant="outline" asChild>
                  <Link href="/faq">View All FAQs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Honor Your Loved One?</h2>
              <p className="text-muted-foreground mb-8">
                Start creating a beautiful memorial today. No credit card required for free plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/create-obituary">Create Memorial</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
