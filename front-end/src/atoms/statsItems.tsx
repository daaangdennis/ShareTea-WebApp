import { atom } from "recoil";
import {
  productSales,
  excessProducts,
  popularPairsItems,
  restockItems,
} from "../types/types";

export const SalesProduct = atom({
  key: "salesItems",
  default: {} as productSales[],
});

export const restockInventory = atom({
  key: "restockItems",
  default: {} as restockItems[],
});

export const excessInventory = atom({
  key: "excessItems",
  default: [] as excessProducts[],
});

export const popularPairsInventory = atom({
  key: "popularItems",
  default: [] as popularPairsItems[],
});
