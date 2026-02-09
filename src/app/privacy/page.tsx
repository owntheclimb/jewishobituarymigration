'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Shield, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">
                Last updated: January 1, 2025
              </p>
            </div>

            {/* Content */}
            <Card className="p-8 mb-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-muted-foreground mb-6">
                  At Jewish Obits, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Information We Collect</h2>

                <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
                <p className="text-muted-foreground mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Create an obituary or memorial page</li>
                  <li>Register for an account</li>
                  <li>Sign a guestbook or leave a condolence</li>
                  <li>Contact us with inquiries</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Make a purchase (flowers, memorial trees, etc.)</li>
                </ul>
                <p className="text-muted-foreground mb-6">
                  This information may include: name, email address, mailing address, phone number, payment information, and any other information you choose to provide.
                </p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
                <p className="text-muted-foreground mb-4">
                  When you visit our website, we automatically collect certain information about your device, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Access times and dates</li>
                  <li>Pages viewed and links clicked</li>
                  <li>Referring website addresses</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-8">How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect for various purposes, including to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Create and manage user accounts</li>
                  <li>Process obituary submissions and memorial pages</li>
                  <li>Process payments and send transaction notifications</li>
                  <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve and personalize your experience</li>
                  <li>Analyze usage trends and optimize our website</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-8">Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf (payment processing, email delivery, hosting)</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
                  <li><strong>Public Information:</strong> Obituaries and memorial pages are publicly viewable by design</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-8">Data Security</h2>
                <p className="text-muted-foreground mb-6">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Your Privacy Rights</h2>
                <p className="text-muted-foreground mb-4">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your information</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent where we rely on consent</li>
                </ul>
                <p className="text-muted-foreground mb-6">
                  To exercise these rights, please contact us using the information below.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Children's Privacy</h2>
                <p className="text-muted-foreground mb-6">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Third-Party Links</h2>
                <p className="text-muted-foreground mb-6">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground mb-6">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Email: privacy@jewishobits.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Address: Rockville, Maryland</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
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

export default PrivacyPolicy;
