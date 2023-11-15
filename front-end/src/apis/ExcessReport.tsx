import Axios from "axios";
import { excessProducts, listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { productSales } from "../types/types";
import { excessInventory, restockInventory } from "../atoms/statsItems";
import { useRecoilState } from "recoil";

export function useGetExcessReport() {
  const [excessItems, setExcessItems] = useRecoilState(excessInventory);

  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL + "/inventory/excess?date=2023-10-10"
    )
      .then((response) => {
        const data: excessProducts[] = response.data;
        setExcessItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  }, [setExcessItems]);
}
