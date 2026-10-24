import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock?: number;
  category?: string;
}

export interface AppliedDiscount {
  code: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  description: string;
}

interface CartState {
  items: CartItem[];
  discount: AppliedDiscount | null;
  isOpen: boolean;
  
  // Actions
  addToCart: (product: { id: string; name: string; price: number; image: string; stock?: number; category?: string }, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  
  // Computed helpers
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getEstimatedTax: () => number;
  getTotal: () => number;
}

export const VALID_DISCOUNTS: Record<string, Omit<AppliedDiscount, 'code'>> = {
  DM15: {
    type: 'percentage',
    value: 15,
    description: '15% Off - Welcome from WhatsApp/Instagram!'
  },
  SAVE10: {
    type: 'percentage',
    value: 10,
    description: '10% Off Your Entire Order'
  },
  FREESHIP: {
    type: 'shipping',
    value: 100,
    description: 'Free Standard Shipping'
  },
  OFF25: {
    type: 'fixed',
    value: 25,
    description: '$25 Off orders over $100'
  }
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      discount: null,
      isOpen: false,

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.id === product.id);
          const maxStock = product.stock ?? 99;

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            const currentItem = updatedItems[existingItemIndex];
            const newQuantity = Math.min(currentItem.quantity + quantity, maxStock);
            updatedItems[existingItemIndex] = {
              ...currentItem,
              quantity: newQuantity,
            };
            return { items: updatedItems };
          }

          const initialQty = Math.min(quantity, maxStock);
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                stock: product.stock,
                quantity: initialQty > 0 ? initialQty : 1,
              },
            ],
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }

        set((state) => {
          return {
            items: state.items.map((item) => {
              if (item.id === id) {
                const maxStock = item.stock ?? 99;
                return { ...item, quantity: Math.min(quantity, maxStock) };
              }
              return item;
            }),
          };
        });
      },

      clearCart: () => {
        set({ items: [], discount: null });
      },

      setIsOpen: (isOpen) => set({ isOpen }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      applyDiscount: (rawCode: string) => {
        const code = rawCode.trim().toUpperCase();
        const promo = VALID_DISCOUNTS[code];

        if (!promo) {
          return { success: false, message: 'Invalid promo code. Try DM15 or SAVE10.' };
        }

        const subtotal = get().getSubtotal();
        if (code === 'OFF25' && subtotal < 100) {
          return { success: false, message: 'Code OFF25 requires a minimum order of $100.' };
        }

        set({ discount: { code, ...promo } });
        return { success: true, message: `Coupon ${code} applied successfully!` };
      },

      removeDiscount: () => {
        set({ discount: null });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const { discount } = get();
        if (!discount) return 0;
        const subtotal = get().getSubtotal();

        if (discount.type === 'percentage') {
          return Math.round((subtotal * discount.value) / 100 * 100) / 100;
        }
        if (discount.type === 'fixed') {
          return Math.min(discount.value, subtotal);
        }
        return 0; // Shipping discounts are handled in getShippingFee
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const { discount } = get();

        // Free shipping if over $80 or promo code FREESHIP
        if (subtotal >= 80 || discount?.type === 'shipping') {
          return 0;
        }
        return 9.99;
      },

      getEstimatedTax: () => {
        const subtotal = get().getSubtotal();
        const discountAmount = get().getDiscountAmount();
        const taxableAmount = Math.max(0, subtotal - discountAmount);
        return Math.round(taxableAmount * 0.08 * 100) / 100; // 8% estimated sales tax
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discountAmount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        const tax = get().getEstimatedTax();
        return Math.max(0, Math.round((subtotal - discountAmount + shipping + tax) * 100) / 100);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);