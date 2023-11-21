import Axios from "axios";
import { Cart, listProductToppings, product, OrderItem, PendingOrders } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { cart } from "../atoms/cart";
import { useRecoilValue } from "recoil";

export async function postOrder(cartData: Cart, accessTokenPromise : String) {
    try {
      const accessToken = accessTokenPromise;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      const response = await Axios.post(process.env.REACT_APP_BACKEND_URL + "/orders/add", cartData, { headers });
      console.log(response);
    } catch (error) {
      console.error("There was an error ordering: ", error);
    }
  }


export function getPendingOrders(
  setPendingOrder: React.Dispatch<React.SetStateAction<PendingOrders>>
) {
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/orders/pending")
    .then((response) => {
      const pending: PendingOrders = response.data;
      //console.log(pending);
      setPendingOrder(pending);

    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
    });
}

export async function finishOrder(order_id: number) {
  try {
    const response = await Axios.post(process.env.REACT_APP_BACKEND_URL + "/orders/finish?orderID=" + order_id);
    console.log(response);
  } catch (error) {
    console.error("There was an error completing an order: ", error);
  }
}