import Axios from "axios";
import { dateProps, listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { productSales } from "../types/types";
import { SalesProduct } from "../atoms/statsItems";
import { useRecoilState } from "recoil";

export function useGetSalesReport(startDate: Date, endDate: Date) {
  const [saleItems, setSaleItems] = useRecoilState(SalesProduct);
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const route = "/product/sales?startDate=" + start + "&endDate=" + end;
  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + route)
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
