'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  // Clear cart on successful checkout
  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Thank You for Your Order</h1>
        <p className="text-muted-foreground text-lg">Your payment was successful</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">What Happens Next?</h2>
            <ul className="list-disc ml-6 mt-3 space-y-2 text-muted-foreground">
              <li>You will receive an order confirmation email shortly</li>
              <li>Our team will prepare your order with care</li>
              <li>You will receive delivery tracking information</li>
              <li>Your thoughtful tribute will be delivered as scheduled</li>
            </ul>
          </div>

          {sessionId && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Order Reference:</span>{' '}
                <code className="text-xs bg-muted px-2 py-1 rounded">{sessionId.slice(0, 20)}...</code>
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" className="flex-1 gap-2">
              <Mail className="h-4 w-4" />
              Need Help? Contact Us
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Questions about your order?{' '}
          <Link href="/contact" className="text-primary hover:underline">
            Contact our support team
          </Link>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link href="/flowers">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="text-center py-12">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
      <p className="mt-4 text-muted-foreground">Loading order details...</p>
    </div>
  );
}

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<LoadingFallback />}>
            <CheckoutSuccessContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
