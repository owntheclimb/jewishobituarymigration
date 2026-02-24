'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, ArrowLeft, Mail, Phone } from 'lucide-react';

const Checkout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <Card className="max-w-lg w-full text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Construction className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-serif">Coming Soon</CardTitle>
            <CardDescription className="text-base">
              We apologize for the inconvenience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Our online checkout and payment system is currently under construction.
              We&apos;re working hard to bring you a seamless purchasing experience soon.
            </p>

            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <p className="font-medium text-foreground">
                Need to place an order now?
              </p>
              <p className="text-sm text-muted-foreground">
                Please contact us directly and we'll be happy to assist you:
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="tel:+19547443432"
                  className="flex items-center justify-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  (954) 744-3432
                </a>
                <a
                  href="mailto:info@neshamajfs.com"
                  className="flex items-center justify-center gap-2 text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  info@neshamajfs.com
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button variant="outline" asChild>
                <Link href="/flowers">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Shop
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
