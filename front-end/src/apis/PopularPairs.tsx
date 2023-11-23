import Axios from "axios";
import { popularPairsItems } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { productSales } from "../types/types";
import { popularPairsInventory } from "../atoms/statsItems";
import { useRecoilState } from "recoil";

export function useGetPopularPairs() {
  const [popularItems, setPopularItems] = useRecoilState(popularPairsInventory);

  useEffect(() => {
    Axios.get(
      process.env.REACT_APP_BACKEND_URL +
        "/product/commonpairings?startDate=2023-01-01&endDate=2023-11-10"
    )
      .then((response) => {
        const data: popularPairsItems[] = response.data;
        setPopularItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  }, [setPopularItems]);
}
