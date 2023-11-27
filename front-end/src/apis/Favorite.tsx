import Axios from "axios";
import { Cart, listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export async function getFavorites(
  setFavorites: React.Dispatch<React.SetStateAction<Cart>>, accessTokenPromise: String
) {
    try {
        const accessToken = accessTokenPromise;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
    
        const response = Axios.get(process.env.REACT_APP_BACKEND_URL + "/favorites/get", { headers })
        .then((response) => {
          const data: Cart = response.data;
          console.log(data);
          setFavorites(data);
        })
        .catch((error) => {
          console.error("There was an error fetching data:", error);
        });
    } catch (error) {
        console.error("There was an error calling API: ", error);
    }
}
