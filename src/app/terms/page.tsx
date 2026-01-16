'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { FileText, Mail } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">
                Last updated: January 1, 2025
              </p>
            </div>

            {/* Content */}
            <Card className="p-8 mb-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
                <p className="text-muted-foreground mb-6">
                  These Terms of Service ("Terms") govern your access to and use of the Jewish Obits website and services. By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Use of Services</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">Eligibility</h3>
                <p className="text-muted-foreground mb-6">
                  You must be at least 13 years old to use our services. By using our services, you represent and warrant that you meet this age requirement. If you are under 18, you must have permission from a parent or legal guardian.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Account Registration</h3>
                <p className="text-muted-foreground mb-4">
                  To access certain features, you may need to create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security of your password</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-8">Obituary and Content Submission</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">Content Ownership</h3>
                <p className="text-muted-foreground mb-6">
                  You retain ownership of any content you submit, including obituaries, photos, videos, and messages. By submitting content, you grant Jewish Obits a worldwide, non-exclusive, royalty-free license to use, reproduce, display, and distribute your content in connection with our services.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Content Guidelines</h3>
                <p className="text-muted-foreground mb-4">
                  When submitting content, you agree not to post content that:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Is false, misleading, or inaccurate</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Contains hate speech, harassment, or discrimination</li>
                  <li>Is obscene, pornographic, or sexually explicit</li>
                  <li>Violates any applicable laws or regulations</li>
                  <li>Contains viruses or malicious code</li>
                  <li>Promotes illegal activities</li>
                  <li>Impersonates another person or entity</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Verification and Accuracy</h3>
                <p className="text-muted-foreground mb-6">
                  You are responsible for ensuring the accuracy of obituary information. We reserve the right to verify information and may remove content that appears fraudulent or violates our policies.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Prohibited Conduct</h2>
                <p className="text-muted-foreground mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Use our services for any unlawful purpose</li>
                  <li>Interfere with or disrupt our services or servers</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Collect or harvest information about other users</li>
                  <li>Use automated tools (bots, scrapers) without permission</li>
                  <li>Impersonate Jewish Obits staff or representatives</li>
                  <li>Transmit spam or unsolicited communications</li>
                  <li>Reverse engineer or attempt to extract source code</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-8">Payment and Refunds</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">Pricing</h3>
                <p className="text-muted-foreground mb-6">
                  Certain services require payment. All prices are in U.S. dollars unless otherwise stated. We reserve the right to change our pricing at any time, though changes will not affect orders already placed.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Payment Processing</h3>
                <p className="text-muted-foreground mb-6">
                  Payments are processed through secure third-party payment providers. By making a purchase, you agree to provide accurate payment information and authorize us to charge your payment method.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Refund Policy</h3>
                <p className="text-muted-foreground mb-6">
                  We offer a 30-day money-back guarantee on premium services. Refund requests must be submitted in writing to our customer support. Certain services, such as newspaper publication fees, may not be refundable.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Intellectual Property</h2>
                <p className="text-muted-foreground mb-6">
                  The Jewish Obits website, including all content, features, and functionality (excluding user-submitted content), is owned by Jewish Obits and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Third-Party Services</h2>
                <p className="text-muted-foreground mb-6">
                  Our services may include links to third-party websites or services (funeral homes, florists, charities). We are not responsible for the content, policies, or practices of third-party services. Your interactions with third parties are solely between you and the third party.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Disclaimer of Warranties</h2>
                <p className="text-muted-foreground mb-6">
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE DO NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY CONTENT.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Limitation of Liability</h2>
                <p className="text-muted-foreground mb-6">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, JEWISH OBITS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Indemnification</h2>
                <p className="text-muted-foreground mb-6">
                  You agree to indemnify, defend, and hold harmless Jewish Obits and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services, your violation of these Terms, or your violation of any rights of another party.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Termination</h2>
                <p className="text-muted-foreground mb-6">
                  We reserve the right to suspend or terminate your account and access to our services at any time, with or without notice, for any reason, including violation of these Terms. Upon termination, your right to use our services will immediately cease. Provisions that should survive termination will remain in effect.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Changes to Terms</h2>
                <p className="text-muted-foreground mb-6">
                  We may modify these Terms at any time. We will notify you of material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of our services after changes become effective constitutes acceptance of the modified Terms.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Governing Law</h2>
                <p className="text-muted-foreground mb-6">
                  These Terms are governed by and construed in accordance with the laws of the United States, without regard to conflict of law provisions.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Email: legal@jewishobits.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Address: 123 Memorial Avenue, Suite 200, City, State 12345</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    By using Jewish Obits, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                  </p>
                </div>
              </div>
            </Card>

            {/* Related Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>
              <Link href="/faq" className="text-primary hover:underline">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
