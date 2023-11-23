import { useRecoilState } from "recoil";
import { Products } from "../atoms/product";
import { useEffect, useState } from "react";
import { listProductToppings, product } from "../types/types";
import SortButtons from "./SortButtons";
import {
  addCategory,
  addMenuProduct,
  deleteCategory,
  deleteMenu,
  getCategories,
  updateMenuProduct,
} from "../apis/Dashboard";
import { getProducts } from "../apis/Product";
import Table, { LazyLoadingTable } from "./Table";
import { useAuth0 } from "@auth0/auth0-react";

const MenuManagement = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [products, setProducts] = useRecoilState<listProductToppings>(Products);

  useEffect(() => {
    getCategories(setCategories, getAccessTokenSilently);
  }, []);
  useEffect(() => {
    setSortedProducts(products.products);
  }, [products]);

  const [InputMenuName, setInputMenuName] = useState<string>();
  const [InputMenuCategory, setInputMenuCategory] = useState<string>();
  const [InputMenuNewCategory, setInputMenuNewCategory] = useState<string>();
  const [InputMenuPrice, setInputMenuPrice] = useState<string>();
  const [InputMenuWeather, setInputMenuWeather] = useState<string>();
  const [editingRow, setEditRow] = useState(NaN);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedWeather, setEditedWeather] = useState("");
  const [editedPicture, setEditedPicture] = useState("");

  const [sortedProducts, setSortedProducts] = useState(products.products);
  const [sortDirection, setSortDirection] = useState<any>({
    product_id: "",
    name: "",
    category: "",
    price: "",
    weather: "",
    url: "",
  });

  const [categories, setCategories] = useState(["Not selected"]);

  const [weatherCons, setWeatherCons] = useState(["cold", "mild", "hot", ""]);

  const MenuColumns = [
    <div className="d-flex align-items-center">
      Product ID
      <SortButtons
        column="product_id"
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Product Name
      <SortButtons
        column="name"
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Category
      <SortButtons
        column="category"
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Price
      <SortButtons
        column="price"
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Weather
      <SortButtons
        column="weather"
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Picture
      <SortButtons
        column="url"
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <></>,
  ];
  const MenuData = sortedProducts.map((product: product, i: number) => {
    const isEditing = editingRow === i;

    const handleEditClick = () => {
      if (!isEditing) {
        setEditRow(i);
        setEditedName(product.name);
        setEditedPrice(product.price?.toString());
        setEditedCategory(product.category);
        setEditedWeather(product.weather || "");
        setEditedPicture(product.url);
      } else {
        handleUpdateMenu(
          product.product_id,
          editedName,
          editedCategory,
          Number(editedPrice),
          editedWeather,
          editedPicture
        );
        setEditRow(NaN);
      }
    };
    return [
      product.product_id,
      isEditing ? (
        <input
          className="form-control"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          type="text"
        />
      ) : (
        product.name
      ),
      isEditing ? (
        <select
          className="form-select"
          value={editedCategory}
          onChange={(e) => setEditedCategory(e.target.value)}
        >
          {categories.map((category: string, i: number) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      ) : (
        product.category
      ),
      isEditing ? (
        <input
          className="form-control"
          value={editedPrice}
          onChange={(e) => setEditedPrice(e.target.value)}
          type="number"
        />
      ) : (
        product.price
      ),
      isEditing ? (
        <select
          className="form-select"
          value={editedWeather}
          onChange={(e) => setEditedWeather(e.target.value)}
        >
          {weatherCons.map((weather: string, i: number) => (
            <option key={i} value={weather}>
              {weather}
            </option>
          ))}
        </select>
      ) : (
        product.weather || "Not Selected"
      ),
      isEditing ? (
        <input
          className="form-control"
          value={editedPicture}
          onChange={(e) => setEditedPicture(e.target.value)}
          type="url"
        />
      ) : (
        <div
          style={{
            maxWidth: "250px",
            maxHeight: "350px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={product.url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "0.25rem",
              border: "1px solid #dee2e6",
            }}
            alt="missing picture"
          />
        </div>
      ),
      isEditing ? (
        <div className="d-flex justify-content-around">
          <button onClick={handleEditClick} className="btn btn-success btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-floppy-fill"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5v-13Z" />
              <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V16Zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V0ZM9 1h2v4H9V1Z" />
            </svg>
          </button>
          <button
            onClick={() => setEditRow(NaN)}
            className="btn btn-warning btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-around">
          <button onClick={handleEditClick} className="btn btn-info btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-fill"
              viewBox="0 0 16 16"
            >
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </button>
          <button
            onClick={() => handleDeleteMenu(product.name)}
            className="btn btn-danger btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
            </svg>
          </button>
        </div>
      ),
    ];
  });
  const handleUpdateMenu = (
    productId: number,
    newName?: string,
    newCategory?: string,
    newPrice?: number,
    newWeather?: string,
    newPicture?: string
  ) => {
    if (newName || newCategory || newPrice || newWeather || newPicture) {
      updateMenuProduct(
        getAccessTokenSilently,
        productId,
        newName,
        newCategory,
        newPrice,
        newWeather,
        newPicture
      )
        .then(() => {
          getProducts(setProducts, (e: any) => {});
        })
        .catch(() => {});
    }
  };

  const handleAddMenu = (
    name: string,
    category: string,
    price: number,
    weather?: string
  ) => {
    addMenuProduct(getAccessTokenSilently, name, category, price, weather)
      .then(() => {
        getProducts(setProducts, (e: any) => {});
        handleClearMenu();
      })
      .catch(() => {});
  };

  const handleClearMenu = () => {
    setInputMenuCategory("");
    setInputMenuName("");
    setInputMenuPrice("");
  };
  const handleDeleteMenu = (name: string) => {
    if (name) {
      deleteMenu(getAccessTokenSilently, name)
        .then(() => {
          getProducts(setProducts, (e: any) => {});
        })
        .catch(() => {});
    }
  };

  const handleAddCategory = () => {
    if (InputMenuNewCategory) {
      addCategory(getAccessTokenSilently, InputMenuNewCategory)
        .then(() => {
          getCategories(setCategories, getAccessTokenSilently);
        })
        .catch(() => {});
    }
  };

  const handleDeleteCategory = () => {
    if (InputMenuCategory) {
      deleteCategory(getAccessTokenSilently, InputMenuCategory)
        .then(() => {
          getCategories(setCategories, getAccessTokenSilently);
        })
        .catch(() => {});
    }
  };
  return (
    <div className="container">
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="productName">Product Name:</label>
              <input
                id="productName"
                className="form-control"
                value={InputMenuName}
                onChange={(e) => setInputMenuName(e.target.value)}
                type="text"
                placeholder="Lime Mojito..."
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="productPrice">Price:</label>
              <input
                id="productPrice"
                className="form-control"
                value={InputMenuPrice}
                onChange={(e) => setInputMenuPrice(e.target.value)}
                type="text"
                placeholder="6.5..."
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-12 col-sm-12 mb-3">
            <div className="form-group">
              <label htmlFor="productCategory">Category:</label>
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <select
                  id="productCategory"
                  className="form-select"
                  value={InputMenuCategory || "Not selected"}
                  onChange={(e) => setInputMenuCategory(e.target.value)}
                >
                  {categories.map((category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleDeleteCategory}
                  className="btn btn-danger btn-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                  </svg>
                </button>
                <input
                  className="form-control"
                  type="text"
                  value={InputMenuNewCategory}
                  onChange={(e) => setInputMenuNewCategory(e.target.value)}
                  placeholder="Add new category"
                />
                <button
                  className="btn btn-info btn-sm"
                  onClick={handleAddCategory}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-lg"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="productWeather">Weather:</label>
              <select
                id="productWeather"
                className="form-select"
                value={InputMenuWeather || ""}
                onChange={(e) => setInputMenuWeather(e.target.value)}
              >
                {weatherCons.map((weather, i) => (
                  <option key={i} value={weather}>
                    {weather}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-3">
          <div className="col-md-12 col-sm-12">
            <div
              className="d-flex justify-content-center"
              style={{ gap: "10px" }}
            >
              <button
                className="btn"
                style={{ backgroundColor: "#cf152d", color: "white" }}
                onClick={() => {
                  if (
                    InputMenuName &&
                    InputMenuCategory &&
                    InputMenuPrice &&
                    InputMenuCategory !== "Not Selected"
                  ) {
                    handleAddMenu(
                      InputMenuName,
                      InputMenuCategory,
                      Number(InputMenuPrice),
                      InputMenuWeather
                    );
                  }
                }}
              >
                Add
              </button>
              <button className="btn btn-secondary" onClick={handleClearMenu}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <LazyLoadingTable
        className="m-4"
        columns={MenuColumns}
        data={MenuData}
        rowLoad={[5, 10, 15, 20, 30, 50, 100]}
      />
    </div>
  );
};

export default MenuManagement;
