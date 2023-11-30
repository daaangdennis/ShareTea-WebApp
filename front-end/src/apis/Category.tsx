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
import { Categories } from "../atoms/product";
import { useRecoilState } from "recoil";

export function useGetCategories() {
  const [categoryItems, setCategoryItems] = useRecoilState(Categories);

  const route = "/categories/get";
  useEffect(() => {
    Axios.get(process.env.REACT_APP_BACKEND_URL + route)
      .then((response) => {
        const data: string[] = response.data;
        setCategoryItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  }, [setCategoryItems]);
}
