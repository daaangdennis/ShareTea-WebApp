import { atom } from "recoil";
import { productSales, excessProducts } from "../types/types";

export const SalesProduct = atom({
  key: "salesItems",
  default: {} as productSales[],
});

export const restockInventory = atom({
  key: "restockItems",
  default: {} as productSales[],
});

export const excessInventory = atom({
  key: "excessItems",
  default: [] as excessProducts[],
});
