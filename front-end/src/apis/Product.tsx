import Axios from "axios";

function getProducts() {
  Axios.get("/product/get")
    .then((response) => {
      const data = response.data;
      console.log(data);
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
    });
}
