import Axios from "axios";
import {
  Cart,
  listProductToppings,
  product,
  OrderItem,
  PendingOrders,
  CompletedOrders,
  UserOrders,
  topping,
} from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { cart } from "../atoms/cart";
import { useRecoilValue } from "recoil";

export async function postOrder(cartData: Cart, accessTokenPromise: String) {
  try {
    const accessToken = accessTokenPromise;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await Axios.post(
      process.env.REACT_APP_BACKEND_URL + "/orders/add",
      cartData,
      { headers }
    );
    console.log(response);
  } catch (error) {
    console.error("There was an error ordering: ", error);
  }
}

export async function getPendingOrders(
  setPendingOrder: React.Dispatch<React.SetStateAction<PendingOrders>>
) {
  try {
    const response = await Axios.get(process.env.REACT_APP_BACKEND_URL + "/orders/pending");
    const pending: PendingOrders = response.data;
    setPendingOrder(pending);
  } catch (error) {
    console.error("There was an error fetching data:", error);
    throw error;
  }
}

export async function getOrderHistory(
  setCompletedOrders: React.Dispatch<React.SetStateAction<CompletedOrders>>
) {
  try {
    const response = await Axios.get(process.env.REACT_APP_BACKEND_URL + "/orders/completed");
    const completed: CompletedOrders = response.data;
    setCompletedOrders(completed);
  } catch (error) {
    console.error("There was an error fetching data:", error);
    throw error;
  }
}

export async function finishOrder(order_id: number) {
  try {
    const response = await Axios.post(
      process.env.REACT_APP_BACKEND_URL + "/orders/finish?orderID=" + order_id
    );
    console.log(response);
  } catch (error) {
    console.error("There was an error completing an order: ", error);
  }
}

export async function refundOrder(order_id: number) {
  try {
    const response = await Axios.post(
      process.env.REACT_APP_BACKEND_URL + "/orders/refund?orderID=" + order_id
    );
    console.log(response);
  } catch (error) {
    console.error("There was an error refunding an order: ", error);
  }
}

export async function removeOrder(order_id: number) {
  try {
    const response = await Axios.post(
      process.env.REACT_APP_BACKEND_URL + "/orders/remove?orderID=" + order_id
    );
    console.log(response);
  } catch (error) {
    console.error("There was an error removing an order: ", error);
  }
}

export async function getUserOrders(
  setUserOrders: React.Dispatch<React.SetStateAction<UserOrders>>, 
  accessTokenPromise: string
) {
  try {
    const accessToken = await accessTokenPromise;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await Axios.get(process.env.REACT_APP_BACKEND_URL + "/user/orders", { headers });
    const orders: UserOrders = response.data;
    setUserOrders(orders);

  } catch (error) {
    console.error("There was an error fetching data:", error);
    throw error;
  }
}

export const saveFavorite = (
  favorite: {
    productID: number;
    toppings: number[];
    notes: string;
    ice_level: string;
    sugar_level: string;
  },
  accessTokenPromise: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = await accessTokenPromise();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const URL = `${process.env.REACT_APP_BACKEND_URL}/favorites/save`;

      const response = await Axios.post(URL, favorite, { headers });
      console.log("saveFavorite: Favorite saved. Response: ", response);
      resolve(true);
    } catch (error) {
      console.error("There was an error saving the favorite:", error);
      reject(error);
    }
  });
};
