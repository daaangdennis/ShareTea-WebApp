import Axios from "axios";
import { product } from "../types/types";

export function getProducts(
  setProducts: React.Dispatch<React.SetStateAction<product[]>>
) {
  Axios.get("http://localhost:8080/product/get")
    .then((response) => {
      const data: product[] = response.data;
      console.log(data);
      setProducts(data);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
      setProducts([]);
    });
}
