import Axios from "axios";
import { listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function getSalesReport() {
  Axios.get(
    process.env.REACT_APP_BACKEND_URL +
      "/product/sales?startDate=2023-01-01&endDate=2023-11-10"
  )
    .then((response) => {
      const data: listProductToppings = response.data;
      console.log(data);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
    });
}
