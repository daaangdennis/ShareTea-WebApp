import { atom } from "recoil";
import { product } from "../types/types";

const Products = atom({
  key: "Products",
  default: [] as product[],
});

const filteredProducts = atom({
    key:"filteredProducts", 
    default: [] as product[]
})
