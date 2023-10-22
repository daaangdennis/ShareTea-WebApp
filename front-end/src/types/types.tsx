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
  productId: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface ProductCardProps {
  product: product;
}
export interface ProductGridProps {
  products: product[];
}
