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
  const [products, setProducts] = useRecoilState<listProductToppings>(Products);
  const [navToggle, setNavToggle] = useState<boolean>(false);
  const [InventoryDataSource, setInventoryDataSource] = useState<InventoryList>(
    { items: [] }
  );
  const [InputInventoryName, setInputInventoryName] = useState<string>();
  const [InputInventoryQuantity, setInputInventoryQuantity] =
    useState<string>();
  const [InputMenuName, setInputMenuName] = useState<string>();
  const [InputMenuCategory, setInputMenuCategory] = useState<string>();
  const [InputMenuPrice, setInputMenuPrice] = useState<string>();

  const MenuColumns = ["Product ID", "Product Name", "Category", "Price"];
  const MenuData = products.products.map((product: product) => {
    return [product.product_id, product.name, product.category, product.price];
  });

  useEffect(() => {
    getInventory(setInventoryDataSource);
  }, []);

  const InventoryColumns = [
    "Inventory ID",
    "Item Name",
    "Stock Quantity",
    "Last Updated",
  ];
  const InventoryData = InventoryDataSource?.items?.map((item: any) => {
    return [item.inventory_id, item.name, item.quantity, item.last_updated];
  });

  const handleUpdateMenu = () => {
    if (InputMenuCategory && InputMenuName && InputMenuPrice) {
      updateMenu(InputMenuName, InputMenuCategory, Number(InputMenuPrice))
        .then(() => {
          getProducts(setProducts, (e: any) => {});
        })
        .catch(() => {});
    } else if (InputMenuName && InputMenuPrice) {
      updateMenu(InputMenuName, undefined, Number(InputMenuPrice))
        .then(() => {
          getProducts(setProducts, (e: any) => {});
        })
        .catch();
    } else if (InputMenuName && InputMenuCategory) {
      updateMenu(InputMenuName, InputMenuCategory)
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
  const handleDeleteMenu = () => {
    if (InputMenuName) {
      deleteMenu(InputMenuName)
        .then(() => {
          getProducts(setProducts, (e: any) => {});
        })
        .catch(() => {});
    }
  };

  const handleUpdateInventory = () => {
    if (InputInventoryQuantity && InputInventoryName) {
      updateInventory(InputInventoryName, Number(InputInventoryQuantity))
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
  const handleDeleteInventory = () => {
    if (InputInventoryName) {
      deleteInventory(InputInventoryName)
        .then(() => {
          getInventory(setInventoryDataSource);
        })
        .catch(() => {});
    }
  };

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
      {!navToggle ? (
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
              <button onClick={handleUpdateInventory}>Update</button>
              <button onClick={handleClearInventory}>Clear</button>
              <button onClick={handleDeleteInventory}>Delete</button>
            </div>
          </div>
        </div>
      ) : (
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
                <div
                  className="d-flex"
                  style={{ gap: 10, alignItems: "center" }}
                >
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
                <div
                  className="d-flex"
                  style={{ gap: 105, alignItems: "center" }}
                >
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
                <input
                  className="form-control"
                  style={{
                    height: 40,
                    width: 200,
                  }}
                  value={InputMenuCategory}
                  onChange={(e: any) => {
                    setInputMenuCategory(e.target.value);
                  }}
                  type="text"
                  placeholder="Tea Mojito..."
                />
              </div>
            </div>
            <div className="d-flex" style={{ gap: 10 }}>
              <button onClick={handleUpdateMenu}>Update</button>
              <button onClick={handleClearMenu}>Clear</button>
              <button onClick={handleDeleteMenu}>Delete</button>
            </div>
          </div>
        </div>
      )}
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

export default InventoryPage;
