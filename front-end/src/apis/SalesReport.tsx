import Axios from "axios";
import { listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { productSales } from "../types/types";
import { SalesProduct } from "../atoms/statsItems";
import { useRecoilState } from "recoil";

export function useGetSalesReport() {
  const [saleItems, setSaleItems] = useRecoilState(SalesProduct);

  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/product/sales?startDate=2023-01-01&endDate=2023-11-10"
    )
      .then((response) => {
        const data: productSales[] = response.data;
        setSaleItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  }, [setSaleItems]);
}
