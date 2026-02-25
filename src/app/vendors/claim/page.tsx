'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Building2,
  CheckCircle,
  Star,
  Shield,
  TrendingUp,
  Users,
  Phone,
  Mail,
  Globe,
  MapPin,
  Send,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const benefits = [
  {
    icon: CheckCircle,
    title: 'Verified Badge',
    description: 'Display a verified badge to build trust with families',
  },
  {
    icon: Star,
    title: 'Featured Placement',
    description: 'Premium visibility in search results and directory listings',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Track page views, clicks, and inquiries in real-time',
  },
  {
    icon: Users,
    title: 'Direct Inquiries',
    description: 'Receive contact form submissions directly from families',
  },
];

const tiers = [
  {
    name: 'Basic',
    price: 'Free',
    features: [
      'Directory listing',
      'Basic profile page',
      'Contact information',
      'Service list',
    ],
    recommended: false,
  },
  {
    name: 'Premium',
    price: '$49/month',
    features: [
      'Everything in Basic',
      'Logo display',
      'Enhanced profile',
      'Priority placement',
      'Lead tracking',
      'Monthly analytics report',
    ],
    recommended: true,
  },
  {
    name: 'Featured',
    price: '$99/month',
    features: [
      'Everything in Premium',
      'Homepage highlight',
      'Top of search results',
      'Featured badge',
      'Dedicated support',
      'Custom profile design',
    ],
    recommended: false,
  },
];

export default function VendorClaimPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Business Info
    businessName: '',
    businessType: '',
    website: '',
    phone: '',
    email: '',
    // Address
    address: '',
    city: '',
    state: '',
    zip: '',
    // Contact Person
    contactName: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: '',
    // Additional
    description: '',
    services: '',
    verificationMethod: '',
    additionalNotes: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/vendors/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit claim');
      }

      toast({
        title: 'Claim Submitted!',
        description: 'We will review your claim and contact you within 2-3 business days.',
      });

      setStep(4); // Success step
    } catch (error) {
      console.error('Error submitting claim:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit claim. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Claim Your Business Listing
              </h1>
              <p className="text-xl text-muted-foreground">
                Join our directory and connect with Jewish families in need of your compassionate services
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, idx) => (
                  <Card key={idx} className="text-center">
                    <CardContent className="pt-6">
                      <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">Partnership Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((tier, idx) => (
                  <Card
                    key={idx}
                    className={tier.recommended ? 'border-2 border-primary shadow-lg' : ''}
                  >
                    {tier.recommended && (
                      <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                        Recommended
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{tier.name}</CardTitle>
                      <CardDescription className="text-2xl font-bold text-foreground">
                        {tier.price}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {tier.features.map((feature, fidx) => (
                          <li key={fidx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Claim Form */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {step < 4 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Claim Your Listing</CardTitle>
                    <CardDescription>
                      Step {step} of 3: {step === 1 ? 'Business Information' : step === 2 ? 'Contact Details' : 'Verification'}
                    </CardDescription>
                    {/* Progress Bar */}
                    <div className="flex gap-2 mt-4">
                      {[1, 2, 3].map((s) => (
                        <div
                          key={s}
                          className={`flex-1 h-2 rounded-full ${
                            s <= step ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      {/* Step 1: Business Info */}
                      {step === 1 && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="businessName">Business Name *</Label>
                            <Input
                              id="businessName"
                              value={formData.businessName}
                              onChange={(e) => handleInputChange('businessName', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="businessType">Business Type *</Label>
                            <Select
                              value={formData.businessType}
                              onValueChange={(v) => handleInputChange('businessType', v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="funeral-home">Funeral Home</SelectItem>
                                <SelectItem value="florist">Florist</SelectItem>
                                <SelectItem value="caterer">Caterer</SelectItem>
                                <SelectItem value="monument-maker">Monument Maker</SelectItem>
                                <SelectItem value="grief-counselor">Grief Counselor</SelectItem>
                                <SelectItem value="rabbi">Rabbi / Officiant</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="phone">
                                <Phone className="h-4 w-4 inline mr-1" />
                                Phone *
                              </Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">
                                <Mail className="h-4 w-4 inline mr-1" />
                                Email *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="website">
                              <Globe className="h-4 w-4 inline mr-1" />
                              Website
                            </Label>
                            <Input
                              id="website"
                              type="url"
                              value={formData.website}
                              onChange={(e) => handleInputChange('website', e.target.value)}
                              placeholder="https://example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="address">
                              <MapPin className="h-4 w-4 inline mr-1" />
                              Address *
                            </Label>
                            <Input
                              id="address"
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="city">City *</Label>
                              <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="state">State *</Label>
                              <Input
                                id="state"
                                value={formData.state}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="zip">ZIP</Label>
                              <Input
                                id="zip"
                                value={formData.zip}
                                onChange={(e) => handleInputChange('zip', e.target.value)}
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            className="w-full"
                            onClick={() => setStep(2)}
                            disabled={!formData.businessName || !formData.businessType || !formData.phone || !formData.email}
                          >
                            Continue
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      )}

                      {/* Step 2: Contact Details */}
                      {step === 2 && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="contactName">Your Name *</Label>
                              <Input
                                id="contactName"
                                value={formData.contactName}
                                onChange={(e) => handleInputChange('contactName', e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="contactTitle">Your Title</Label>
                              <Input
                                id="contactTitle"
                                value={formData.contactTitle}
                                onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                                placeholder="e.g., Owner, Manager"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="contactEmail">Your Email *</Label>
                              <Input
                                id="contactEmail"
                                type="email"
                                value={formData.contactEmail}
                                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="contactPhone">Your Phone *</Label>
                              <Input
                                id="contactPhone"
                                type="tel"
                                value={formData.contactPhone}
                                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="description">Business Description</Label>
                            <Textarea
                              id="description"
                              rows={4}
                              value={formData.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              placeholder="Tell families about your services..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="services">Services Offered</Label>
                            <Textarea
                              id="services"
                              rows={3}
                              value={formData.services}
                              onChange={(e) => handleInputChange('services', e.target.value)}
                              placeholder="List your services (one per line)"
                            />
                          </div>
                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setStep(1)}
                            >
                              Back
                            </Button>
                            <Button
                              type="button"
                              className="flex-1"
                              onClick={() => setStep(3)}
                              disabled={!formData.contactName || !formData.contactEmail || !formData.contactPhone}
                            >
                              Continue
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Verification */}
                      {step === 3 && (
                        <div className="space-y-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="h-5 w-5 text-primary" />
                              <span className="font-semibold">Verification Required</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              To protect families and ensure listing accuracy, we verify all business claims.
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="verificationMethod">Verification Method *</Label>
                            <Select
                              value={formData.verificationMethod}
                              onValueChange={(v) => handleInputChange('verificationMethod', v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select verification method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="phone">Phone verification</SelectItem>
                                <SelectItem value="email">Business email verification</SelectItem>
                                <SelectItem value="document">Upload business license</SelectItem>
                                <SelectItem value="website">Website ownership verification</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="additionalNotes">Additional Notes</Label>
                            <Textarea
                              id="additionalNotes"
                              rows={3}
                              value={formData.additionalNotes}
                              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                              placeholder="Any additional information to help us verify your claim..."
                            />
                          </div>
                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setStep(2)}
                            >
                              Back
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1"
                              disabled={submitting || !formData.verificationMethod}
                            >
                              {submitting ? 'Submitting...' : (
                                <>
                                  <Send className="h-4 w-4 mr-2" />
                                  Submit Claim
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              ) : (
                /* Success State */
                <Card className="text-center">
                  <CardContent className="pt-12 pb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Claim Submitted!</h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for submitting your claim. Our team will review it and contact you within 2-3 business days.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button variant="outline" asChild>
                        <Link href="/funeral-homes">View Directory</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/">Return Home</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our partnership team is here to help you get started.
            </p>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
