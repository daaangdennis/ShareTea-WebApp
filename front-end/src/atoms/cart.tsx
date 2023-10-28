import { atom } from "recoil";
import { Cart } from "../types/types";

export const cart = atom({
  key: "cart",
  default: {
    items: [],
    total: 0,
  } as Cart,
});
