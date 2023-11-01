import Axios from "axios";
import { product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


export function getProducts(
  setProducts: React.Dispatch<React.SetStateAction<product[]>>,
  setFiliterdProducts: React.Dispatch<React.SetStateAction<product[]>>,
  getAccessTokenSilently: () => Promise<string>
) {
  getAccessTokenSilently()
    .then((token) => {
      Axios.get("http://localhost:8080/product/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const data: product[] = response.data;
          console.log(data);
          setProducts(data);
          setFiliterdProducts(data);
        })
        .catch((error) => {
          console.error("There was an error fetching data:", error);
          setProducts([]);
        });
    })
    .catch((error) => {
      console.error("Failed to obtain access token:", error);
    });
}
