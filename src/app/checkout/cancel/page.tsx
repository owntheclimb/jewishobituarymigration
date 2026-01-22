'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { XCircle, ShoppingCart, ArrowLeft, HelpCircle } from 'lucide-react';

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/20 mb-4">
              <XCircle className="h-12 w-12 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Checkout Cancelled</h1>
            <p className="text-muted-foreground text-lg">Your order was not completed</p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="font-semibold text-lg mb-2">No Payment Was Processed</h2>
                <p className="text-muted-foreground">
                  Your checkout was cancelled and no charges were made to your payment method.
                  Your cart items have been saved if you wish to complete your order later.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Having Issues?
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Make sure your payment information is correct</li>
                  <li>Try a different payment method</li>
                  <li>Contact your bank if the issue persists</li>
                  <li>Reach out to our support team for assistance</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="flex-1 gap-2">
                  <Link href="/checkout">
                    <ShoppingCart className="h-4 w-4" />
                    Return to Checkout
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1 gap-2">
                  <Link href="/contact">
                    <HelpCircle className="h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <Link href="/flowers">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
              <Button variant="outline" asChild>
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

export default CheckoutCancel;
