import Axios from "axios";
import { listProductToppings, product } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { restockItems } from "../types/types";
import { restockInventory } from "../atoms/statsItems";
import { useRecoilState } from "recoil";

export function useGetRestockReport() {
  const [restockItems, setRestockItems] = useRecoilState(restockInventory);

  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/inventory/low")
      .then((response) => {
        const data: restockItems[] = response.data;
        setRestockItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  }, [setRestockItems]);
}
