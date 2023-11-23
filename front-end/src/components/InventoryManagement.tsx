import { useEffect, useState } from "react";
import { InventoryList } from "../types/types";
import {
  addInventory,
  deleteInventory,
  getInventory,
  updateInventory,
} from "../apis/Dashboard";
import Table, { LazyLoadingTable } from "./Table";
import SortButtons from "./SortButtons";

const InventoryManagement = () => {
  const [InventoryDataSource, setInventoryDataSource] = useState<InventoryList>(
    { items: [] }
  );

  useEffect(() => {
    getInventory(setInventoryDataSource);
  }, []);
  useEffect(() => {
    setSortedItems(InventoryDataSource.items);
  }, [InventoryDataSource]);

  const [InputInventoryName, setInputInventoryName] = useState<string>();
  const [InputInventoryQuantity, setInputInventoryQuantity] =
    useState<string>();
  const [editRow, setEditRow] = useState(NaN);
  const [editedName, setEditedName] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");
  const [editedIsTopping, setEditedIsTopping] = useState("");
  const [sortedItems, setSortedItems] = useState(InventoryDataSource.items);
  const [sortDirection, setSortDirection] = useState<any>({
    inventory_id: "",
    name: "",
    quantity: "",
    last_updated: "",
    is_topping: "",
  });

  const InventoryColumns = [
    <div className="d-flex align-items-center">
      Inventory ID
      <SortButtons
        column="inventory_id"
        sortedProducts={sortedItems}
        setSortedProducts={setSortedItems}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Item Name
      <SortButtons
        column="name"
        sortedProducts={sortedItems}
        setSortedProducts={setSortedItems}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Stock Quantity
      <SortButtons
        column="quantity"
        sortedProducts={sortedItems}
        setSortedProducts={setSortedItems}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Last Updated
      <SortButtons
        column="last_updated"
        sortedProducts={sortedItems}
        setSortedProducts={setSortedItems}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    <div className="d-flex align-items-center">
      Topping
      <SortButtons
        column="is_topping"
        sortedProducts={sortedItems}
        setSortedProducts={setSortedItems}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>,
    "",
  ];
  const InventoryData = sortedItems.map((item, i) => {
    const isEditing = editRow === i;

    const handleEditClick = () => {
      if (!isEditing) {
        setEditRow(i);
        setEditedName(item.name);
        setEditedQuantity(item.quantity?.toString());
        setEditedIsTopping(item.is_topping ? "true" : "false");
      } else {
        handleUpdateInventory(
          item.inventory_id,
          editedName,
          Number(editedQuantity),
          editedIsTopping === ""
            ? undefined
            : editedIsTopping === "true"
            ? true
            : false
        );
        setEditRow(NaN);
      }
    };

    const handleCancelClick = () => {
      setEditRow(NaN);
    };

    return [
      item.inventory_id,
      isEditing ? (
        <input
          className="form-control"
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      ) : (
        item.name
      ),
      isEditing ? (
        <input
          className="form-control"
          type="number"
          value={editedQuantity}
          onChange={(e) => setEditedQuantity(e.target.value)}
        />
      ) : (
        item.quantity
      ),
      item.last_updated,
      isEditing ? (
        <div className="form-check form-switch">
          <input
            key={i}
            className="form-check-input"
            type="checkbox"
            role="switch"
            id={`flexSwitchCheckDefault-${i}`}
            onChange={(e) =>
              setEditedIsTopping(e.target.checked ? "true" : "false")
            }
            checked={editedIsTopping === "true"}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {editedIsTopping === "true" ? "Topping" : "Not a Topping"}
          </label>
        </div>
      ) : item.is_topping ? (
        <div className="form-check form-switch">
          <input
            key={i}
            className="form-check-input"
            type="checkbox"
            role="switch"
            id={`flexSwitchCheckCheckedDisabled-${i}`}
            checked
            disabled
          />
          <label
            className="form-check-label"
            htmlFor="flexSwitchCheckCheckedDisabled"
          >
            Topping
          </label>
        </div>
      ) : (
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id={`flexSwitchCheckDisabled-${i}`}
            disabled
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">
            Not a Topping
          </label>
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
            onClick={handleCancelClick}
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
            onClick={() => handleDeleteInventory(item.name)}
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

  const handleUpdateInventory = (
    itemId: number,
    newName?: string,
    newQuantity?: number,
    newIsTopping?: boolean
  ) => {
    if (newQuantity || newName || newIsTopping) {
      updateInventory(itemId, newName, newQuantity, newIsTopping)
        .then(() => {
          getInventory(setInventoryDataSource);
        })
        .catch();
    }
  };

  const handleAddInventory = (name: string, quantity?: number) => {
    addInventory(name, quantity)
      .then(() => {
        getInventory(setInventoryDataSource);
        handleClearInventory();
      })
      .catch();
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
      <div className="container">
        <div className="row my-4 justify-content-center">
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="itemName">Item Name:</label>
              <input
                id="itemName"
                className="form-control"
                value={InputInventoryName}
                onChange={(e) => setInputInventoryName(e.target.value)}
                type="text"
                placeholder="Milk..."
              />
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor="stockQuantity">Stock Quantity:</label>
              <input
                id="stockQuantity"
                className="form-control"
                value={InputInventoryQuantity}
                onChange={(e) => setInputInventoryQuantity(e.target.value)}
                type="text"
                placeholder="5..."
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-12 col-sm-12">
            <div
              className="d-flex justify-content-center"
              style={{ gap: "10px" }}
            >
              <button
                className="btn"
                style={{ backgroundColor: "#cf152d", color: "white" }}
                onClick={() => {
                  if (InputInventoryName) {
                    handleAddInventory(
                      InputInventoryName,
                      Number(InputInventoryQuantity)
                    );
                  }
                }}
              >
                Add
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleClearInventory}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <LazyLoadingTable
        className="m-4"
        columns={InventoryColumns}
        data={InventoryData}
        rowLoad={[10, 20, 30, 50, 100]}
      />
    </div>
  );
};

export default InventoryManagement;
