import Axios from "axios";
import { product } from "../types/types";
import { useState } from "react";

export function getProducts(
  setProducts: React.Dispatch<React.SetStateAction<product[]>>,
  setFiliterdProducts: React.Dispatch<React.SetStateAction<product[]>>
) {
  Axios.get("http://localhost:8080/product/get")
    .then((response) => {
      const data: product[] = response.data;
      console.log(data);

      setProducts(data);
      setFiliterdProducts(data);
    })
    .catch((error) => {
      window.location.href =
        "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=366192628605-0qrd9jo1um142prpp5c6nocelkkfndjg.apps.googleusercontent.com&scope=openid%20profile%20email&state=N_9v9cJGE4Iw-83Hw498ud_MJiwmhEK5mI6XGWCRXaw%3D&redirect_uri=http://localhost:8080/login/oauth2/code/google&nonce=idMTDJEONfnq1sciZHVoADqkYbDQyJuWu7zS1pYANSc";
      console.error("There was an error fetching data:", error);
      setProducts([]);
    });
}
