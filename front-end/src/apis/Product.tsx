import Axios from "axios";
import { listProductToppings, product } from "../types/types";
import { useState } from "react";

export function getProducts(
  setProducts: React.Dispatch<React.SetStateAction<listProductToppings>>,
  setFiliterdProducts: React.Dispatch<React.SetStateAction<listProductToppings>>
) {
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/product/get")
    .then((response) => {
      const data: listProductToppings = response.data;
      console.log(data);

      setProducts(data);
      setFiliterdProducts(data);
    })
    .catch((error) => {
      window.location.href =
        "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=366192628605-0qrd9jo1um142prpp5c6nocelkkfndjg.apps.googleusercontent.com&scope=openid%20profile%20email&state=N_9v9cJGE4Iw-83Hw498ud_MJiwmhEK5mI6XGWCRXaw%3D&redirect_uri=http://localhost:8080/login/oauth2/code/google&nonce=idMTDJEONfnq1sciZHVoADqkYbDQyJuWu7zS1pYANSc";
      console.error("There was an error fetching data:", error);
      // setProducts([]);
    });
}
