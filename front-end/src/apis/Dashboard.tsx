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

export function updateInventory(
  itemID: number,
  name?: string,
  quantity?: number,
  is_topping?: boolean
) {
  return new Promise((resolve, reject) => {
    let URL =
      process.env.REACT_APP_BACKEND_URL +
      `/inventory/update?inventoryId=${itemID}`;

    if (name !== undefined) {
      URL += `&newName=${name}`;
    }
    if (quantity !== undefined) {
      URL += `&quantity=${quantity}`;
    }

    if (is_topping !== undefined) {
      URL += `&isTopping=${is_topping}`;
    }

    Axios.post(URL)
      .then((response) => {
        console.log(
          "updateInventory: item name = " + name + " Response: ",
          response
        );
        resolve(true);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
        reject(error);
      });
  });
}

export function addInventory(name: string, quantity?: number) {
  return new Promise((resolve, reject) => {
    let URL =
      process.env.REACT_APP_BACKEND_URL +
      `/inventory/add?inventoryName=${name}`;

    if (quantity !== undefined) {
      URL += `&quantity=${quantity}`;
    }
    Axios.post(URL)
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

export function updateMenuProduct(
  productID: number,
  name?: string,
  category?: string,
  price?: number,
  weather?: string
) {
  return new Promise((resolve, reject) => {
    let URL =
      process.env.REACT_APP_BACKEND_URL + `/menu/update?productID=${productID}`;

    if (name !== undefined) {
      URL += `&newName=${name}`;
    }
    if (category !== undefined) {
      URL += `&category=${category}`;
    }
    if (price !== undefined) {
      URL += `&price=${price}`;
    }
    if (weather !== undefined) {
      URL += `&weather=${weather}`;
    }

    Axios.post(URL)
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
}

export function addMenuProduct(
  name: string,
  category: string,
  price: number,
  weather?: string
) {
  return new Promise((resolve, reject) => {
    let URL =
      process.env.REACT_APP_BACKEND_URL +
      `/menu/add?name=${name}&category=${category}&price=${price}`;
    if (weather) {
      URL += `&weather=${weather}`;
    }

    Axios.post(URL)
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
}

export function deleteMenu(name: string) {
  return new Promise((resolve, reject) => {
    const URL =
      process.env.REACT_APP_BACKEND_URL + `/product/delete?productName=${name}`;
    Axios.post(URL)
      .then((response) => {
        console.log(
          "deleteName: item name = " + name + " Response: " + response
        );
        resolve(true);
      })
      .catch((error) => {
        console.error("There was an error fetching data:", error);
        reject(error);
      });
  });
}

export function getUsers(
  setUsersSourceData: React.Dispatch<React.SetStateAction<any>>
) {
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/users/get")
    .then((response) => {
      const users = response.data || [];
      setUsersSourceData(users);
    })
    .catch((error) => {
      console.error("There was an error fetching user data:", error);
    });
}

export function updateUser(userId: number, role: string) {
  return new Promise((resolve, reject) => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/update?userId=${userId}&role=${role}`;

    Axios.post(URL)
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
}

export function deleteUser(userId: number) {
  return new Promise((resolve, reject) => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/users/delete?userId=${userId}`;

    Axios.post(URL)
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
}

export function addCategory(categoryName: string) {
  return new Promise((resolve, reject) => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/categories/add?categoryName=${categoryName}`;

    Axios.post(URL)
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
}

export function getCategories(
  setCategories: React.Dispatch<React.SetStateAction<any>>
) {
  Axios.get(process.env.REACT_APP_BACKEND_URL + "/categories/get")
    .then((response) => {
      const categories = response.data || [];
      setCategories(categories);
    })
    .catch((error) => {
      console.error("There was an error fetching categories:", error);
    });
}

export function deleteCategory(categoryName: string) {
  return new Promise((resolve, reject) => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/categories/delete?categoryName=${categoryName}`;

    Axios.post(URL)
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
}
