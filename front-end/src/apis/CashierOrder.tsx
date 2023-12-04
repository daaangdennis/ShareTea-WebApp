import Axios from "axios";
import { Cart, listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { cart } from "../atoms/cart";
import { useRecoilValue } from "recoil";

export async function postCashierOrder(
  customerName: string,
  customerEmail: string,
  cartData: Cart
) {
  try {
    let passedValue = "";
    if (customerName === "") {
      passedValue = "email=" + customerEmail;
    } else {
      const nameParts: string[] = customerName.split(" ");
      passedValue =
        "firstName=" + nameParts[0] + "&" + "lastName=" + nameParts[1];
      console.log("CustomerName: " + customerName);
      console.log("Formatted Name: " + nameParts[0] + " " + nameParts[1]);
    }
    const response = await Axios.post(
      process.env.REACT_APP_BACKEND_URL + "/orders/cashieradd?" + passedValue,
      cartData
    );

    console.log(response);
  } catch (error) {
    console.error("There was an error ordering: ", error);
  }
}
export async function nextOrder(): Promise<number> {
  try {
    const data = await Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/orders/next"
    );
    const val: number = data.data as number;
    console.log(data);
    return val;
  } catch (error) {
    console.error("Error fetching next order number: ", error);
    return 0;
  }
}
