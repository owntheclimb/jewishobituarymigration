'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Download, Mail } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Order Confirmed</h1>
            <p className="text-muted-foreground text-lg">Thank you for your order</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="font-semibold text-lg mb-2">What's Next?</h2>
                <p className="text-muted-foreground">
                  Once payment processing is integrated, you will receive:
                </p>
                <ul className="list-disc ml-6 mt-3 space-y-2 text-muted-foreground">
                  <li>Order confirmation email with receipt</li>
                  <li>Delivery tracking number</li>
                  <li>Estimated delivery date</li>
                  <li>Funeral home coordination details (if applicable)</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Mail className="h-4 w-4" />
                  Email Receipt
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Need help with your order? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="soft" asChild>
                <Link href="/search">Browse Obituaries</Link>
              </Button>
              <Button variant="elegant" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
