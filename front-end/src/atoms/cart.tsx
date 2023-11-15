import { atom } from "recoil";
import { Cart } from "../types/types";

export const cart = atom({
  key: "cart",
  default: {
    items: [],
    total: 0,
  } as Cart,
  effects_UNSTABLE: [
    ({ onSet, setSelf }) => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart != null) {
        setSelf(JSON.parse(savedCart));
      }
      onSet((newValue) => {
        localStorage.setItem("cart", JSON.stringify(newValue));
      });
    },
  ],
});
