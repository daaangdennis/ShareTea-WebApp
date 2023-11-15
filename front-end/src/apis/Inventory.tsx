import Axios from "axios";
import { InventoryItem, InventoryList } from "../types/types";

export function getInventory(
  setInventory: React.Dispatch<React.SetStateAction<InventoryList>>
) {
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/inventory/get")
    .then((response) => {
      const items: InventoryItem[] = response.data || [];
      setInventory({ items });
    })
    .catch((error) => {
      console.error("There was an error fetching data:", error);
    });
}

export function updateInventory(name: string, quantity?: number) {
  return new Promise((resolve, reject) => {
    const URL = quantity
      ? process.env.REACT_APP_BACKEND_URL +
        `/inventory/update?inventoryName=${name}&quantity=${quantity}`
      : process.env.REACT_APP_BACKEND_URL +
        `/inventory/update?inventoryName=${name}`;

    Axios.post(URL)
      .then((response) => {
        console.log(
          "updateInventory: item name = " + name + " Response: " + response
        );
        resolve(true); // Resolve the promise with true
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
        reject(error); // Reject the promise with the error
      });
  });
}

export function deleteInventory(name: string) {
  return new Promise((resolve, reject) => {
    const URL =
      process.env.REACT_APP_BACKEND_URL +
      `/inventory/delete?inventoryName=${name}`;
    Axios.post(URL)
      .then((response) => {
        console.log(
          "deleteInventory: item name = " + name + " Response: " + response
        );
        resolve(true); // Resolve the promise with true
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
        reject(error); // Reject the promise with the error
      });
  });
}

export function updateMenu(name: string, category?: string, price?: number) {
  return new Promise((resolve, reject) => {
    // new product (name, category, price)
    // update price product with name (name, price)
    // update price product with name and category (name, category, price)
    // update category product with name (name, newCategory)
    // update category and price with name (name, newCategory, price)

    const URL =
      price && category
        ? process.env.REACT_APP_BACKEND_URL +
          `/product/update?productName=${name}&price=${price}&category=${category}`
        : price
        ? `/product/update?productName=${name}&price=${price}`
        : category
        ? `/product/update?productName=${name}&category=${category}`
        : false;
    if (URL) {
      Axios.post(URL)
        .then((response) => {
          console.log(
            "updateMenu: item name = " + name + " Response: " + response
          );
          resolve(true); // Resolve the promise with true
        })
        .catch((error) => {
          console.error("There was an error fetching data:", error);
        });
    } else {
      reject("Not enough parms"); // Reject the promise with the error
    }
  });
}

export function deleteMenu(name: string) {
  return new Promise((resolve, reject) => {
    const URL =
      process.env.REACT_APP_BACKEND_URL +
      `/product/delete?productName=${name}`;
    Axios.post(URL)
      .then((response) => {
        console.log(
          "deleteName: item name = " + name + " Response: " + response
        );
        resolve(true); // Resolve the promise with true
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
        reject(error); // Reject the promise with the error
      });
  });
}
