import Axios from "axios";
import { popularPairsItems } from "../types/types";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { productSales } from "../types/types";
import { popularPairsInventory } from "../atoms/statsItems";
import { useRecoilState } from "recoil";

export function useGetPopularPairs(startDate: Date, endDate: Date) {
  const [popularItems, setPopularItems] = useRecoilState(popularPairsInventory);
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];
  const route =
    "/product/commonpairings?startDate=" + start + "&endDate=" + end;

  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + route)
      .then((response) => {
        const data: popularPairsItems[] = response.data;
        setPopularItems(data);
        // console.log(start);
        // console.log(end);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  }, [setPopularItems]);
}
