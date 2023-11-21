import { useRecoilState, useRecoilValue } from "recoil";
import SubNav from "../components/SubNav";
import { InventoryList, listProductToppings, product } from "../types/types";
import { Products, filteredProducts } from "../atoms/product";
import { useEffect, useState } from "react";
import {
  deleteInventory,
  deleteMenu,
  getInventory,
  updateInventory,
  updateMenu,
} from "../apis/Inventory";
import { getProducts } from "../apis/Product";

function InventoryPage() {
  const [navToggle, setNavToggle] = useState<boolean>(false);

  return (
    <>
      <SubNav>
        <nav>
          <button className="me-3" onClick={() => setNavToggle(false)}>
            Manage Inventory
          </button>
          <button onClick={() => setNavToggle(true)}>Edit Menu</button>
        </nav>
      </SubNav>
      {!navToggle ? <InventoryManagement /> : <MenuManagement />}
    </>
  );
}

const Table = ({ columns, data }: any) => {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          {columns?.map((name: string, i: number) => {
            return (
              <th key={i} scope="col">
                {name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data?.map((array: any, i: number) => {
          return (
            <tr key={i}>
              {array.map((item: any, i: number) =>
                i === 0 ? <th scope="row">{item}</th> : <td key={i}>{item}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const InventoryManagement = () => {
  const [InventoryDataSource, setInventoryDataSource] = useState<InventoryList>(
    { items: [] }
  );

  useEffect(() => {
    getInventory(setInventoryDataSource);
  }, []);

  const [InputInventoryName, setInputInventoryName] = useState<string>();
  const [InputInventoryQuantity, setInputInventoryQuantity] =
    useState<string>();
  const [editRow, setEditRow] = useState(NaN);
  const [editedName, setEditedName] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");

  const InventoryColumns = [
    "Inventory ID",
    "Item Name",
    "Stock Quantity",
    "Last Updated",
    "",
  ];
  const InventoryData = InventoryDataSource?.items?.map((item, i) => {
    const isEditing = editRow === i;

    const handleEditClick = () => {
      if (!isEditing) {
        setEditRow(i);
        setEditedName(item.name);
        setEditedQuantity(item.quantity?.toString());
      } else {
        handleUpdateInventory(editedName, Number(editedQuantity));
        setEditRow(NaN);
      }
    };

    const handleCancelClick = () => {
      setEditRow(NaN);
    };

    return [
      item.inventory_id,
      item.name,
      isEditing ? (
        <input
          type="number"
          value={editedQuantity}
          onChange={(e) => setEditedQuantity(e.target.value)}
        />
      ) : (
        item.quantity
      ),
      item.last_updated,
      isEditing ? (
        <>
          <button onClick={handleEditClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => handleDeleteInventory(item.name)}>
            Delete
          </button>
        </>
      ),
    ];
  });

  const handleUpdateInventory = (Name: string, newQuantity?: number) => {
    if (newQuantity && Name) {
      updateInventory(Name, newQuantity)
        .then(() => {
          getInventory(setInventoryDataSource);
        })
        .catch();
    } else if (InputInventoryName) {
      updateInventory(InputInventoryName)
        .then(() => {
          getInventory(setInventoryDataSource);
        })
        .catch(() => {});
    }
  };
  const handleClearInventory = () => {
    setInputInventoryName("");
    setInputInventoryQuantity("");
  };
  const handleDeleteInventory = (name: string) => {
    if (name) {
      deleteInventory(name)
        .then(() => {
          getInventory(setInventoryDataSource);
        })
        .catch(() => {});
    }
  };
  return (
    <div className="container">
      <Table columns={InventoryColumns} data={InventoryData} />

      <div
        className="container d-flex flex-column"
        style={{ gap: 30, alignItems: "center" }}
      >
        <div
          className="container d-flex"
          style={{ gap: 50, alignItems: "center" }}
        >
          <div className="d-flex" style={{ gap: 10, alignItems: "center" }}>
            <h4>Item Name: </h4>
            <input
              className="form-control"
              style={{
                height: 40,
                width: 200,
              }}
              value={InputInventoryName}
              onChange={(e: any) => {
                setInputInventoryName(e.target.value);
              }}
              type="text"
              placeholder="Milk..."
            />
          </div>

          <div className="d-flex" style={{ gap: 10, alignItems: "center" }}>
            <h4>Stock Quantity: </h4>
            <input
              className="form-control"
              style={{
                height: 40,
                width: 200,
              }}
              value={InputInventoryQuantity}
              onChange={(e: any) => {
                setInputInventoryQuantity(e.target.value);
              }}
              type="text"
              placeholder="5..."
            />
          </div>
        </div>
        <div className="d-flex" style={{ gap: 10 }}>
          <button
            onClick={() =>
              handleUpdateInventory(
                InputInventoryName || "",
                Number(InputInventoryQuantity)
              )
            }
          >
            Add
          </button>
          <button onClick={handleClearInventory}>Clear</button>
        </div>
      </div>
    </div>
  );
};

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

  const MenuColumns = ["Product ID", "Product Name", "Category", "Price", ""];
  const MenuData = products.products.map((product: product, i: number) => {
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
        <>
          <button onClick={handleEditClick}>Save</button>
          <button onClick={() => setEditRow(NaN)}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => handleDeleteMenu(product.name)}>Delete</button>
        </>
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
      <Table columns={MenuColumns} data={MenuData} />

      <div
        className="container d-flex flex-column"
        style={{ gap: 30, alignItems: "center" }}
      >
        <div
          className="container d-flex"
          style={{ gap: 50, alignItems: "center" }}
        >
          <div
            className="d-flex flex-column"
            style={{ gap: 10, alignItems: "center" }}
          >
            <div className="d-flex" style={{ gap: 10, alignItems: "center" }}>
              <h4>Product Name: </h4>
              <input
                className="form-control"
                style={{
                  height: 40,
                  width: 200,
                }}
                value={InputMenuName}
                onChange={(e: any) => {
                  setInputMenuName(e.target.value);
                }}
                type="text"
                placeholder="Lime Mojito..."
              />
            </div>
            <div className="d-flex" style={{ gap: 105, alignItems: "center" }}>
              <h4>Price: </h4>
              <input
                className="form-control"
                style={{
                  height: 40,
                  width: 200,
                }}
                value={InputMenuPrice}
                onChange={(e: any) => {
                  setInputMenuPrice(e.target.value);
                }}
                type="text"
                placeholder="6.5..."
              />
            </div>
          </div>
          <div className="d-flex" style={{ gap: 10, alignItems: "center" }}>
            <h4>Category: </h4>
            <select
              value={InputMenuCategory || ""}
              onChange={(e) => setInputMenuCategory(e.target.value)}
            >
              {categories.map((category: string, i: number) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={InputMenuNewCategory}
              onChange={(e) => setInputMenuNewCategory(e.target.value)}
              placeholder="Add new category"
            />
            <button onClick={handleAddCategory}>Add</button>
          </div>
        </div>
        <div className="d-flex" style={{ gap: 10 }}>
          <button
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
          <button onClick={handleClearMenu}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
