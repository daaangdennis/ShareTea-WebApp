import Axios from "axios";
import { product } from "../types/types";

export function getBestSelling(
  setBestSelling: React.Dispatch<React.SetStateAction<product[]>>,
  setFiliterdBestSelling: React.Dispatch<React.SetStateAction<product[]>>
) {
  Axios.get("http://localhost:8080/product/getbestselling")
    .then((response) => {
      const data: any[][] = response.data;
      console.log(response.data);

      const bestSelling: product[] = data.map((innerList: any[]) => {
        return {
          name: innerList[0] as string,
          url: innerList[1] as string,
          product_id: innerList[2] as number,
          price: innerList[3] as number,
          category: innerList[4] as string,
        };
      });

      setBestSelling(bestSelling);
      setFiliterdBestSelling(bestSelling);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
      setBestSelling([]);
    });
}
