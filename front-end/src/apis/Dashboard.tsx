import Axios from "axios";
import { InventoryItem, InventoryList } from "../types/types";

export function getInventory(
  setInventory: React.Dispatch<React.SetStateAction<InventoryList>>,
  accessTokenPromise: any
) {
  accessTokenPromise().then((accessToken: any) => {
    const headers = { Authorization: `Bearer ${accessToken}` };

    Axios.get(process.env.REACT_APP_BACKEND_URL + "/inventory/get", { headers })
      .then((response) => {
        const items: InventoryItem[] = response.data || [];
        setInventory({ items });
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
      });
  });
}

export function updateInventory(
  accessTokenPromise: any,
  itemID: number,
  name?: string,
  quantity?: number,
  is_topping?: boolean
) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      let URL =
        process.env.REACT_APP_BACKEND_URL +
        `/inventory/update?inventoryId=${itemID}`;

      if (name !== undefined) URL += `&newName=${name}`;
      if (quantity !== undefined) URL += `&quantity=${quantity}`;
      if (is_topping !== undefined) URL += `&isTopping=${is_topping}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "updateInventory: item name = " + name + " Response: ",
            response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error("There was an error updating the inventory:", error);
          reject(error);
        });
    });
  });
}

export function addInventory(
  accessTokenPromise: any,
  name: string,
  quantity?: number
) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      let URL =
        process.env.REACT_APP_BACKEND_URL +
        `/inventory/add?inventoryName=${name}`;

      if (quantity !== undefined) URL += `&quantity=${quantity}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "addInventory: item name = " + name + " Response: ",
            response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error("There was an error adding the item:", error);
          reject(error);
        });
    });
  });
}

export function deleteInventory(accessTokenPromise: any, name: string) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const URL =
        process.env.REACT_APP_BACKEND_URL +
        `/inventory/delete?inventoryName=${name}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "deleteInventory: item name = " + name + " Response: " + response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error(
            "There was an error deleting the inventory item:",
            error
          );
          reject(error);
        });
    });
  });
}

export function updateMenuProduct(
  accessTokenPromise: any,
  productID: number,
  name?: string,
  category?: string,
  price?: number,
  weather?: string,
  picture?: string
) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      let URL =
        process.env.REACT_APP_BACKEND_URL +
        `/menu/update?productID=${productID}`;

      if (name !== undefined) URL += `&newName=${name}`;
      if (category !== undefined) URL += `&category=${category}`;
      if (price !== undefined) URL += `&price=${price}`;
      if (weather !== undefined) URL += `&weather=${weather}`;
      if (picture !== undefined) URL += `&url=${picture}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "updateMenu: item ID = " + productID + " Response: ",
            response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error("There was an error updating the menu:", error);
          reject(error);
        });
    });
  });
}

export function addMenuProduct(
  accessTokenPromise: any,
  name: string,
  category: string,
  price: number,
  weather?: string
) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      let URL =
        process.env.REACT_APP_BACKEND_URL +
        `/menu/add?name=${name}&category=${category}&price=${price}`;

      if (weather !== undefined) URL += `&weather=${weather}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "addMenuProduct: item name = " + name + " Response: ",
            response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error("There was an error adding the menu item:", error);
          reject(error);
        });
    });
  });
}

export function deleteMenu(accessTokenPromise: any, name: string) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const URL =
        process.env.REACT_APP_BACKEND_URL + `/menu/delete?productName=${name}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "deleteMenu: item name = " + name + " Response: " + response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error("There was an error deleting the menu item:", error);
          reject(error);
        });
    });
  });
}

export function getUsers(
  setUsersSourceData: React.Dispatch<React.SetStateAction<any>>,
  accessTokenPromise: any
) {
  accessTokenPromise().then((accessToken: any) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    Axios.get(process.env.REACT_APP_BACKEND_URL + "/users/get", { headers })
      .then((response) => {
        const users = response.data || [];
        setUsersSourceData(users);
      })
      .catch((error) => {
        console.error("There was an error fetching user data:", error);
      });
  });
}

export function updateUser(
  accessTokenPromise: any,
  userId: number,
  role?: string,
  firstName?: string,
  lastName?: string
) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      let URL = `${process.env.REACT_APP_BACKEND_URL}/users/update?userId=${userId}`;

      if (role !== undefined) URL += `&role=${role}`;
      if (firstName !== undefined) URL += `&firstName=${firstName}`;
      if (lastName !== undefined) URL += `&lastName=${lastName}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "updateUser: User ID = " + userId + " Response: ",
            response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error("There was an error updating the user:", error);
          reject(error);
        });
    });
  });
}

export function deleteUser(accessTokenPromise: any, userId: number) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const URL = `${process.env.REACT_APP_BACKEND_URL}/users/delete?userId=${userId}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "deleteUser: User ID = " + userId + " Response: " + response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error("There was an error deleting the user:", error);
          reject(error);
        });
    });
  });
}

export function addCategory(accessTokenPromise: any, categoryName: string) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const URL = `${process.env.REACT_APP_BACKEND_URL}/categories/add?categoryName=${categoryName}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "addCategory: Category name = " + categoryName + " Response: ",
            response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error("There was an error adding the category:", error);
          reject(error);
        });
    });
  });
}

export function getCategories(
  setCategories: React.Dispatch<React.SetStateAction<any>>
) {
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/categories/get", {})
    .then((response) => {
      const categories: any[] = response.data || [];
      setCategories(categories);
    })
    .catch((error) => {
      console.error("There was an error fetching categories:", error);
    });
}

export function deleteCategory(accessTokenPromise: any, categoryName: string) {
  return new Promise((resolve, reject) => {
    accessTokenPromise().then((accessToken: any) => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const URL = `${process.env.REACT_APP_BACKEND_URL}/categories/delete?categoryName=${categoryName}`;

      Axios.post(URL, {}, { headers })
        .then((response) => {
          console.log(
            "deleteCategory: Category name = " +
              categoryName +
              " Response: " +
              response
          );
          resolve(true);
        })
        .catch((error) => {
          console.error("There was an error deleting the category:", error);
          reject(error);
        });
    });
  });
}
