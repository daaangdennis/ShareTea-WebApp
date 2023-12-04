import { atom } from "recoil";
import { listProductToppings, product } from "../types/types";

export const Products = atom({
  key: "Products",
  default: {} as listProductToppings,
});

export const filteredProducts = atom({
  key: "filteredProducts",
  default: {} as listProductToppings,
});

export const Categories = atom({
  key: "Categories",
  default: [] as string[],
});
