import Axios from "axios";
import {
  dateProps,
  inventoryUsageProps,
  listProductToppings,
  product,
} from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { productSales } from "../types/types";
import { SalesProduct, inventoryUsage } from "../atoms/statsItems";
import { useRecoilState } from "recoil";

export function useGetProductUsageReport(startDate: Date, endDate: Date) {
  const [inventoryItems, setInventoryItems] = useRecoilState(inventoryUsage);
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const route = "/inventory/usage?startDate=" + start + "&endDate=" + end;
  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + route)
      .then((response) => {
        const data: inventoryUsageProps[] = response.data;
        setInventoryItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  }, [setInventoryItems]);
}
