import Axios from "axios";
import { listProductToppings, product } from "../types/types";

export function getBestSelling(
  setBestSelling: React.Dispatch<React.SetStateAction<listProductToppings>>,
  setFiliterdBestSelling: React.Dispatch<
    React.SetStateAction<listProductToppings>
  >
) {
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/product/getbestselling")
    .then((response) => {
      const bestSelling: listProductToppings = response.data;
      console.log(response.data);

      // const bestSelling: product[] = data.map((innerList: any[]) => {
      //   return {
      //     name: innerList[0] as string,
      //     url: innerList[1] as string,
      //     product_id: innerList[2] as number,
      //     price: innerList[3] as number,
      //     category: innerList[4] as string,
      //     has_ice: false,
      //     has_sugar: false,
      //     has_toppings: false,
      //   };
      // });

      setBestSelling(bestSelling);
      setFiliterdBestSelling(bestSelling);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
    });
}
