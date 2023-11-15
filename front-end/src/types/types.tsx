import { ReactElement, ReactNode } from "react";

export interface route {
  name: string;
  path: string;
  element: ReactElement;
  roles?: string[];
}

export interface navbarProps {
  routes: route[];
}

export interface product {
  product_id: number;
  name: string;
  url: string;
  description?: string;
  price: number;
  category: string;
  toppings?: topping[];
  has_ice: boolean;
  has_toppings: boolean;
  has_sugar: boolean;
}

export interface topping {
  inventory_id: number;
  name: string;
  details: string;
  quantity: number;
  last_updated: string;
  is_topping: boolean;
}

export interface listProductToppings {
  toppings: topping[];
  products: product[];
  price?: number;
}

export interface ProductCardProps {
  product: product;
}
export interface ProductGridProps {
  products: product[];
}

export interface Cart {
  items: ICartItem[];
  total: number;
}

export interface CartTableProps {
  columns: string[];
  items: Cart;
}

export interface ImageGalleryProps {
  images: string[];
  style?: React.CSSProperties;
}

export interface ToppingsGridProps {
  toppings: topping[];
  setToppings: React.Dispatch<React.SetStateAction<topping[]>>;
  sourceToppings: topping[];
}

export interface CartCardProps {
  item: ICartItem;
}

export interface ICartItem {
  product: product;
  cartId?: number;
  toppings?: topping[];
  ice_level?: string;
  sugar_level?: string;
  notes?: string;
}

export interface CartGridProps {
  products: product[];
}

export interface InfoBarProps {
  header: string;
  information: string;
  imageUrl: string;
}

export interface customItem {

  isAdd: boolean;
  isEdit: boolean;
  item: ICartItem;
}

export interface SubNavProps {
  children: ReactNode;
}

export interface ProtectedRouteProps {
  roles: string[];
}

export interface InventoryList {
  items: InventoryItem[];
}

export interface InventoryItem {
  inventory_id: number;
  name: string;
  details?: string;
  quantity: number;
  last_updated: string;
  is_topping: boolean;
}

export interface productSales {
  name: string;
  count: number;
}

export interface excessProducts {
  used: number;
  quantity: number;
  name: string;
  inventory_id: number;
}

