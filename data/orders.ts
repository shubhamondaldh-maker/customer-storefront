export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'confirmed' | 'processing' | 'shipped';
  estimatedDelivery: string;
}

// In-memory server-side mock storage for placed orders
const ORDERS = new Map<string, Order>();

export function saveOrder(order: Order): void {
  ORDERS.set(order.id, order);
}

export function getOrderById(id: string): Order | undefined {
  return ORDERS.get(id);
}
