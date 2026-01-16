'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CreditCard, MapPin, User, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

// Form validation schema
const checkoutSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number too long"),
  address: z.string().trim().min(1, "Address is required").max(200, "Address too long"),
  address2: z.string().max(200, "Address line 2 too long").optional(),
  city: z.string().trim().min(1, "City is required").max(100, "City name too long"),
  state: z.string().trim().min(2, "State is required").max(50, "State name too long"),
  zip: z.string().trim().min(5, "ZIP code must be at least 5 digits").max(10, "ZIP code too long"),
  deliveryNotes: z.string().max(500, "Delivery notes too long").optional(),
  giftMessage: z.string().max(500, "Gift message too long").optional(),
  terms: z.boolean().refine(val => val === true, "You must accept the terms and conditions")
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

// TODO: STRIPE INTEGRATION REQUIRED
// This is a placeholder checkout page. Before production:
// 1. Enable Stripe integration via Lovable tools
// 2. Add Stripe Elements for secure card processing
// 3. Create payment intent on backend (Supabase Edge Function)
// 4. Handle payment confirmation and order creation
// 5. Send order confirmation emails via Resend
// 6. Add order tracking and history

const Checkout = () => {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      terms: false
    }
  });

  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 15.99;
  const total = subtotal + tax + shipping;

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/flowers');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    try {
      // TODO: Replace with actual Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Order placed successfully!', {
        description: 'You will receive a confirmation email shortly.'
      });

      // Placeholder success flow
      clearCart();
      router.push('/order-confirmation');
    } catch (error) {
      toast.error('Order failed', {
        description: 'Please check your information and try again.'
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your order to honor their memory</p>
          </div>

          {/* Stripe Integration Notice */}
          <Alert className="mb-8 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <strong>Development Notice:</strong> Payment processing is not yet active. Stripe integration required before production launch.
            </AlertDescription>
          </Alert>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleFormSubmit(onSubmit)} className="space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Contact Information
                    </CardTitle>
                    <CardDescription>We'll use this to send order confirmation and delivery updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" {...register('firstName')} />
                        {errors.firstName && (
                          <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" {...register('lastName')} />
                        {errors.lastName && (
                          <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register('email')} />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" {...register('phone')} />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Delivery Address
                    </CardTitle>
                    <CardDescription>Where should we send these items?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" {...register('address')} />
                      {errors.address && (
                        <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="address2">Apartment, Suite, etc. (Optional)</Label>
                      <Input id="address2" {...register('address2')} />
                      {errors.address2 && (
                        <p className="text-sm text-destructive mt-1">{errors.address2.message}</p>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" {...register('city')} />
                        {errors.city && (
                          <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" {...register('state')} />
                        {errors.state && (
                          <p className="text-sm text-destructive mt-1">{errors.state.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" {...register('zip')} />
                        {errors.zip && (
                          <p className="text-sm text-destructive mt-1">{errors.zip.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="deliveryNotes">Delivery Instructions (Optional)</Label>
                      <Textarea id="deliveryNotes" placeholder="Gate code, special instructions, etc." {...register('deliveryNotes')} />
                      {errors.deliveryNotes && (
                        <p className="text-sm text-destructive mt-1">{errors.deliveryNotes.message}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment - Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                    <CardDescription>Secure payment processing via Stripe</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Stripe payment form will be integrated here. This will include:
                        <ul className="list-disc ml-4 mt-2 space-y-1">
                          <li>Card number input with validation</li>
                          <li>Expiration date and CVV fields</li>
                          <li>Billing address (if different from delivery)</li>
                          <li>PCI-compliant secure processing</li>
                        </ul>
                      </AlertDescription>
                    </Alert>

                    {/* Placeholder card form */}
                    <div className="space-y-4 opacity-50 pointer-events-none">
                      <div>
                        <Label>Card Number</Label>
                        <Input placeholder="4242 4242 4242 4242" disabled />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Expiration</Label>
                          <Input placeholder="MM / YY" disabled />
                        </div>
                        <div>
                          <Label>CVV</Label>
                          <Input placeholder="123" disabled />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Optional Message */}
                <Card>
                  <CardHeader>
                    <CardTitle>Gift Message (Optional)</CardTitle>
                    <CardDescription>Include a personal message with your order</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="With deepest sympathy..."
                      className="min-h-[100px]"
                      {...register('giftMessage')}
                    />
                    {errors.giftMessage && (
                      <p className="text-sm text-destructive mt-1">{errors.giftMessage.message}</p>
                    )}
                  </CardContent>
                </Card>

                {/* Terms */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Checkbox id="terms" {...register('terms')} />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-destructive">{errors.terms.message}</p>
                  )}
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>{items.length} {items.length === 1 ? 'item' : 'items'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items List */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isProcessing}
                    onClick={handleFormSubmit(onSubmit)}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing this order, you agree to our Terms of Service
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
