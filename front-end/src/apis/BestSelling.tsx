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

//TODO
export function getWeatherProducts(
  setWeatherProducts: React.Dispatch<React.SetStateAction<listProductToppings>>,
  temp: number
) {
  Axios.get(
    process.env.REACT_APP_BACKEND_URL +
      `/product/get/weather?temperature=${temp}`
  )
    .then((response) => {
      const WeatherProducts: listProductToppings = response.data;
      console.log(response.data);
      setWeatherProducts(WeatherProducts);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
    });
}

//TODO
export async function getFavoriteProducts(
  setFavoriteProducts: React.Dispatch<
    React.SetStateAction<listProductToppings>
  >,
  getAccessToken: any
) {
  const accessToken = await getAccessToken();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  Axios.get(process.env.REACT_APP_BACKEND_URL + `/user/favorite/get`, {
    headers,
  })
    .then((response) => {
      const FavoriteProducts: listProductToppings = response.data;
      console.log(response.data);
      setFavoriteProducts(FavoriteProducts);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
    });
}

//TODO
export async function addFavoriteProduct(
  productName: string,
  getAccessToken: any
) {
  const accessToken = await getAccessToken();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  Axios.post(
    process.env.REACT_APP_BACKEND_URL +
      `/user/favorite?productName=${productName}`,
    { headers }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
    });
}
