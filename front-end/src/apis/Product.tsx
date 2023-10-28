import Axios from "axios";
import { product } from "../types/types";

export function getProducts(
  setProducts: React.Dispatch<React.SetStateAction<product[]>>,
  setFiliterdProducts: React.Dispatch<React.SetStateAction<product[]>>
) {
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/product/get")
    .then((response) => {
      const data: product[] = response.data;
      console.log(data);
      
      setProducts(data);
      setFiliterdProducts(data);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
      setProducts([]);
    });
}
