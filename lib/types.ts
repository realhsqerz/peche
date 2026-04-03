export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  createdAt: string;
  featured?: boolean;
  variants?: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  productId: string;
  name: string;
  value: string;
  sortOrder: number;
};

export type OrderStatus = "pending" | "confirmed" | "delivered";

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string | null;
  variantLabel?: string | null;
  quantity: number;
  price: number;
  product?: Pick<Product, "id" | "name" | "imageUrl" | "category">;
};

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  items?: OrderItem[];
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  orderCount?: number;
};

export type DashboardMetrics = {
  totalOrders: number;
  totalRevenue: number;
  bestSellingProduct: string;
  pendingOrders: number;
};

export type CartItem = {
  cartKey: string;
  productId: string;
  variantId?: string | null;
  variantLabel?: string | null;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
  stock: number;
};

export type CheckoutPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  deliveryState: string;
  address: string;
  items: CartItem[];
};

export type ActionState = {
  success: boolean;
  message: string;
};

export type WishlistItem = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  hasVariants: boolean;
};
