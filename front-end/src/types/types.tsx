import { ReactElement } from "react";

export interface route {
  name: string;
  path: string;
  element: ReactElement;
}

export interface navbarProps {
  routes: route[];
}

export interface product {
  product_id: number;
  name: string;
  image?: string;
  description?: string;
  price: number;
  category: string;
}

export interface ProductCardProps {
  product: product;
}
export interface ProductGridProps {
  products: product[];
}
