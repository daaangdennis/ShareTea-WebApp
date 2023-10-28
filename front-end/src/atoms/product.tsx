import { atom } from "recoil";
import { product } from "../types/types";

export const Products = atom({
  key: "Products",
  default: [] as product[],
});

export const filteredProducts = atom({
    key:"filteredProducts", 
    default: [] as product[]
})
