import Axios from "axios";
import { listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function getProducts(
  setProducts: React.Dispatch<React.SetStateAction<listProductToppings>>,
  setFiliterdProducts: React.Dispatch<React.SetStateAction<listProductToppings>>
) {
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/product/get")
    .then((response) => {
      const data: listProductToppings = response.data;
      console.log(data);
      setProducts(data);
      setFiliterdProducts(data);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
    });
}
