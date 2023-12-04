import Axios from "axios";
import { excessProducts, listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { productSales } from "../types/types";
import { excessInventory, restockInventory } from "../atoms/statsItems";
import { useRecoilState } from "recoil";

export function useGetExcessReport(startDate: Date) {
  const [excessItems, setExcessItems] = useRecoilState(excessInventory);
  const start = startDate.toISOString().split("T")[0];
  const route = "/inventory/excess?date=" + start;
  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + route)
      .then((response) => {
        const data: excessProducts[] = response.data;
        setExcessItems(data);
        console.log(start);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  }, [setExcessItems]);
}
