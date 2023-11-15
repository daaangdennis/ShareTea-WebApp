import Axios from "axios";
import { Cart, listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { cart } from "../atoms/cart";
import { useRecoilValue } from "recoil";

export async function postCashierOrder(customerEmail: String, cartData: Cart) {
  try {
    const response = await Axios.post(
      process.env.REACT_APP_BACKEND_URL +
        "/orders/cashieradd?email=" +
        customerEmail,
      cartData
    );
    console.log(response);
  } catch (error) {
    console.error("There was an error ordering: ", error);
  }
}
