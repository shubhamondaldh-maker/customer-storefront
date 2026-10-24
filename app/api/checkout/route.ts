import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/data/products';
import { saveOrder, Order } from '@/data/orders';

interface CheckoutPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country?: string;
    };
  };
  items: Array<{
    id: string;
    quantity: number;
  }>;
  discountCode?: string;
  payment: {
    cardNumber?: string;
    cardExpiry?: string;
    cardCvc?: string;
    simulateFailure?: boolean;
    paymentMethod?: string;
  };
}

export async function POST(request: NextRequest) {
  // Simulate payment processing delay (400-800ms)
  const delay = Math.floor(Math.random() * 400) + 400;
  await new Promise((resolve) => setTimeout(resolve, delay));

  let body: CheckoutPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON request payload.' },
      { status: 400 }
    );
  }

  const { customer, items, payment, discountCode } = body;

  // 1. Server-side validation of customer info
  if (!customer) {
    return NextResponse.json(
      { success: false, error: 'Customer information is missing.' },
      { status: 400 }
    );
  }

  const name = customer.name?.trim() || '';
  if (name.length < 2) {
    return NextResponse.json(
      { success: false, error: 'Full name must be at least 2 characters long.' },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!customer.email || !emailRegex.test(customer.email.trim())) {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  const phoneDigits = (customer.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 8) {
    return NextResponse.json(
      { success: false, error: 'Please enter a valid phone number with at least 8 digits.' },
      { status: 400 }
    );
  }

  const addr = customer.address;
  if (
    !addr ||
    !addr.street?.trim() ||
    !addr.city?.trim() ||
    !addr.state?.trim() ||
    !addr.postalCode?.trim()
  ) {
    return NextResponse.json(
      { success: false, error: 'Complete street, city, state, and postal code are required.' },
      { status: 400 }
    );
  }

  // 2. Server-side validation of cart items
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { success: false, error: 'Your cart is empty. Please add products before checking out.' },
      { status: 400 }
    );
  }

  let calculatedSubtotal = 0;
  const verifiedOrderItems = [];

  for (const item of items) {
    const product = getProductById(item.id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product ID '${item.id}' no longer exists.` },
        { status: 400 }
      );
    }

    if (!item.quantity || item.quantity <= 0) {
      return NextResponse.json(
        { success: false, error: `Invalid quantity for product '${product.name}'.` },
        { status: 400 }
      );
    }

    if (item.quantity > product.stock) {
      return NextResponse.json(
        {
          success: false,
          error: `Sorry, only ${product.stock} units of '${product.name}' are available. Please update your cart.`
        },
        { status: 400 }
      );
    }

    calculatedSubtotal += product.price * item.quantity;
    verifiedOrderItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.image,
    });
  }

  // 3. Discount calculation on server
  let discountAmount = 0;
  if (discountCode) {
    const code = discountCode.trim().toUpperCase();
    if (code === 'DM15') {
      discountAmount = Math.round(calculatedSubtotal * 0.15 * 100) / 100;
    } else if (code === 'SAVE10') {
      discountAmount = Math.round(calculatedSubtotal * 0.10 * 100) / 100;
    } else if (code === 'OFF25' && calculatedSubtotal >= 100) {
      discountAmount = 25;
    }
  }

  const shippingFee = (calculatedSubtotal >= 80 || discountCode?.toUpperCase() === 'FREESHIP') ? 0 : 9.99;
  const taxableAmount = Math.max(0, calculatedSubtotal - discountAmount);
  const tax = Math.round(taxableAmount * 0.08 * 100) / 100;
  const total = Math.round((calculatedSubtotal - discountAmount + shippingFee + tax) * 100) / 100;

  // 4. Payment processing & simulation logic
  // Trigger failure if:
  // - User checked "Simulate Failure"
  // - Card ends in "0000"
  // - Explicit failure query/flag
  const cardNumberClean = (payment?.cardNumber || '').replace(/\s+/g, '');
  if (payment?.simulateFailure || cardNumberClean.endsWith('0000')) {
    return NextResponse.json(
      {
        success: false,
        error: 'Payment authorization declined by issuing bank (Test Failure Triggered). Your cart is safe — please check your card details or try again.'
      },
      { status: 402 }
    );
  }

  // 5. Generate Order and store
  const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
  
  // Delivery estimate: 3 business days from now
  const estDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const estDeliveryStr = estDeliveryDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const order: Order = {
    id: orderId,
    createdAt: new Date().toISOString(),
    customer: {
      name,
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      address: {
        street: addr.street.trim(),
        city: addr.city.trim(),
        state: addr.state.trim(),
        postalCode: addr.postalCode.trim(),
        country: addr.country?.trim() || 'United States',
      },
    },
    items: verifiedOrderItems,
    subtotal: calculatedSubtotal,
    discount: discountAmount,
    discountCode: discountCode || undefined,
    shipping: shippingFee,
    tax,
    total,
    paymentMethod: payment?.paymentMethod || 'Credit Card (Simulated)',
    status: 'confirmed',
    estimatedDelivery: estDeliveryStr,
  };

  saveOrder(order);

  return NextResponse.json({
    success: true,
    orderId,
    order,
  });
}
