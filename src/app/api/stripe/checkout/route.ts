import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import type Stripe from 'stripe';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  stripe_price_id?: string;
}

interface CheckoutRequestBody {
  items: CartItem[];
  customerEmail?: string;
  shippingAddress?: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  deliveryNotes?: string;
  giftMessage?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequestBody = await request.json();
    const { items, customerEmail, shippingAddress, deliveryNotes, giftMessage } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const shippingCost = subtotal > 100 ? 0 : 15.99;

    // Build line items for Stripe
    // If products have stripe_price_id, use that; otherwise create price_data
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      if (item.stripe_price_id) {
        // Use existing Stripe price
        return {
          price: item.stripe_price_id,
          quantity: item.quantity,
        };
      }

      // Create price_data for products without stripe_price_id
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : undefined,
            metadata: {
              product_id: item.id,
              category: item.category,
            },
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    // Add tax as a line item
    if (tax > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Sales Tax (8%)',
          },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      });
    }

    // Add shipping as a line item if applicable
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Build metadata for the order
    const metadata: Record<string, string> = {
      cart_items: JSON.stringify(items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity }))),
    };

    if (shippingAddress) {
      metadata.shipping_name = `${shippingAddress.firstName} ${shippingAddress.lastName}`;
      metadata.shipping_address = shippingAddress.address;
      if (shippingAddress.address2) metadata.shipping_address2 = shippingAddress.address2;
      metadata.shipping_city = shippingAddress.city;
      metadata.shipping_state = shippingAddress.state;
      metadata.shipping_zip = shippingAddress.zip;
      metadata.shipping_phone = shippingAddress.phone;
    }

    if (deliveryNotes) {
      metadata.delivery_notes = deliveryNotes.substring(0, 500); // Stripe metadata limit
    }

    if (giftMessage) {
      metadata.gift_message = giftMessage.substring(0, 500);
    }

    // Get the origin for success/cancel URLs
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      customer_email: customerEmail,
      metadata,
      shipping_address_collection: shippingAddress ? undefined : {
        allowed_countries: ['US'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
