import { useRecoilState } from "recoil";
import { Products } from "../atoms/product";
import { useState } from "react";
import { listProductToppings, product } from "../types/types";
import SortButtons from "./SortButtons";
import { deleteMenu, updateMenu } from "../apis/Inventory";
import { getProducts } from "../apis/Product";
import Table from "./Table";

const MenuManagement = () => {
  const [products, setProducts] = useRecoilState<listProductToppings>(Products);

  const [InputMenuName, setInputMenuName] = useState<string>();
  const [InputMenuCategory, setInputMenuCategory] = useState<string>();
  const [InputMenuNewCategory, setInputMenuNewCategory] = useState<string>();
  const [InputMenuPrice, setInputMenuPrice] = useState<string>();
  const [editingRow, setEditRow] = useState(NaN);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const [sortedProducts, setSortedProducts] = useState(products.products);
  const [sortDirection, setSortDirection] = useState<any>({
    product_id: "",
    name: "",
    category: "",
    price: "",
  });

  const [categories, setCategories] = useState([
    "Super Mini Beer",
    "Fruit Tea",
    "Random Tea",
    "Christmas Beer",
    "Milk Tea",
    "Creama",
    "Brewed Tea",
    "Tea Mojito",
    "Ice Blended",
    "",
  ]);

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
        column="Category"
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Price
      <SortButtons
        column="Category"
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
      } else {
        handleUpdateMenu(editedName, editedCategory, Number(editedPrice));
        setEditRow(NaN);
      }
    };
    return [
      product.product_id,
      product.name,
      isEditing ? (
        <select
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
          value={editedPrice}
          onChange={(e) => setEditedPrice(e.target.value)}
          type="number"
        />
      ) : (
        product.price
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
    name: string,
    category?: string,
    price?: number
  ) => {
    if (category && name && price) {
      updateMenu(name, category, price)
        .then(() => {
          getProducts(setProducts, (e: any) => {});
        })
        .catch(() => {});
    } else if (name && price) {
      updateMenu(name, undefined, price)
        .then(() => {
          getProducts(setProducts, (e: any) => {});
        })
        .catch();
    } else if (name && category) {
      updateMenu(name, category)
        .then(() => {
          getProducts(setProducts, (e: any) => {});
        })
        .catch(() => {});
    }
  };
  const handleClearMenu = () => {
    setInputMenuCategory("");
    setInputMenuName("");
    setInputMenuPrice("");
  };
  const handleDeleteMenu = (name: string) => {
    if (name) {
      deleteMenu(name)
        .then(() => {
          getProducts(setProducts, (e: any) => {});
        })
        .catch(() => {});
    }
  };

  const handleAddCategory = () => {
    //TODO API
    // if (InputMenuNewCategory) {
    //   POSTAPIFUNCTION(InputMenuNewCategory)
    //     .then(() => {
    //       GETAPIFUNCTION(setCategories);
    //     })
    //     .catch(() => {});
    // }
  };
  return (
    <div className="container">
      <Table className="m-4" columns={MenuColumns} data={MenuData} />

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
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label htmlFor="productCategory">Category:</label>
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                <select
                  id="productCategory"
                  className="form-control"
                  value={InputMenuCategory || ""}
                  onChange={(e) => setInputMenuCategory(e.target.value)}
                >
                  {categories.map((category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  className="form-control"
                  type="text"
                  value={InputMenuNewCategory}
                  onChange={(e) => setInputMenuNewCategory(e.target.value)}
                  placeholder="Add new category"
                />
                <button
                  className="btn btn-sm"
                  style={{ backgroundColor: "#cf152d", color: "white" }}
                >
                  Add
                </button>
              </div>
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
                onClick={() =>
                  handleUpdateMenu(
                    InputMenuName || "",
                    InputMenuCategory,
                    Number(InputMenuPrice)
                  )
                }
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
    </div>
  );
};

export default MenuManagement;
