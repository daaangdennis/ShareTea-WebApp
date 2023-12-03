import "../styles/CashierOrderPage.css";
import "../styles/PendingPage.css";
import React, { useState, useEffect } from "react";
import { Products } from "../atoms/product";
import { DefaultValue, useRecoilState, useRecoilValue } from "recoil";
import { getProducts } from "../apis/Product";
import ProductGrid from "../components/ProductGrid";
import {
  topping,
  listProductToppings,
  ToppingsGridProps,
  product,
  Cart,
  ICartItem,
} from "../types/types";
import { cart } from "../atoms/cart";
import { nextOrder, postCashierOrder } from "../apis/CashierOrder";
import Table from "../components/Table";
import { Categories } from "../atoms/product";
import { useGetCategories } from "../apis/Category";
var _ = require("lodash");

interface ItemEntry {
  itemName: string;
  itemIce: string;
  itemSugar: string;
  itemToppings: string | string[];
  itemPrice: string;
}

function CashierOrderPage() {
  const [note, setNote] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [selectedIceLevel, setSelectedIceLevel] = useState<string>("No Ice");
  const [selectedSugarLevel, setSelectedSugarLevel] =
    useState<string>("No Sugar");
  const [listToppings, setListToppings] = useState<topping[]>([]);
  const sourceProducts = useRecoilValue<listProductToppings>(Products);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [rows, setRows] = useState<ItemEntry[]>([]);
  const [bestSelling, setBestSelling] = useState<listProductToppings>({
    toppings: [],
    products: [],
  });
  const [filteredBestSelling, setFilteredBestSelling] =
    useState<listProductToppings>({} as listProductToppings);
  const [selectedProduct, setSelectedProduct] = useState<product>({
    product_id: 0,
    name: "item",
    url: "",
    price: 0,
    category: "",
    has_ice: false,
    has_toppings: false,
    has_sugar: false,
  });
  const [subTotal, setSubTotal] = useState<number>(0.0);
  const [cartItems, setcartItems] = useRecoilState<Cart>(cart);
  const [itemsPreserved, setItemsPreserved] = useState(false);
  const [filteredCart, setFilteredCart] = useState<
    (string | string[] | undefined)[][]
  >([]);
  const categoriesList: string[] = useRecoilValue(Categories);
  const [currentOrderNumber, setCurrentOrderNumber] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [displayIce, setDisplayIce] = useState(false);
  const [displaySugar, setDisplaySugar] = useState(false);
  const [displayTopping, setDisplayTopping] = useState(false);
  // Add product functionality like checking to see if a product has toppings
  useGetCategories();
  const iceLevel = [
    "Select Ice Level",
    "No Ice",
    "Light Ice",
    "Regular Ice",
    "Extra Ice",
    "MAKE IT HOT",
  ];

  const sugarLevel = [
    "Select Sugar Level",
    "No Sugar",
    "30% Sugar",
    "50% Sugar",
    "80% Sugar",
    "100% Sugar",
    "120% Sugar",
  ];

  const tableColumns = [
    "Product Name",
    "Ice Level",
    "Sugar Level",
    "Toppings",
    "Price",
  ];
  const handleProceedButton = () => {
    setCurrentOrderNumber(currentOrderNumber + 1);
    postCashierOrder(customerName, customerEmail, cartItems);
    handleCancelButton();
  };

  const handleEditItem = (index: number) => {
    const product = cartItems.items.at(index)?.product;
    setDisplayIce(product?.has_ice ?? false);
    setDisplaySugar(product?.has_sugar ?? false);
    setDisplayTopping(product?.has_toppings ?? false);
    console.log(displayIce);
    console.log(displaySugar);
    console.log(displayTopping);
    setShowOrderDetails(true);
    //setSelectedProduct(product);
  };

  const addProductToCart = () => {
    const newlist: Cart = _.cloneDeep(cartItems);
    newlist.items.push({
      product: selectedProduct,
      toppings: listToppings,
      notes: note,
      ice_level: selectedIceLevel,
      sugar_level: selectedSugarLevel,
    });
    newlist.total =
      newlist.total + selectedProduct.price + listToppings.length * 0.75;

    console.log(newlist.total);
    setcartItems(newlist);

    let sum: number = 0;
    const newArray = newlist.items.map((props) => [
      props.product.name,
      props.ice_level,
      props.sugar_level,
      props.toppings?.map((topping) => topping.name),
      (props.product.price + (props.toppings?.length ?? 0) * 0.75).toFixed(2),
    ]);
    setSubTotal(newlist.total);
    setFilteredCart(newArray);
    cartItems.items.forEach((item) => {
      sum += item.product.price;
    });
    console.log(sum);
    console.log(filteredCart);
  };

  const handleNoteChange = (event: any) => {
    setNote(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setCustomerEmail(event.target.value);
  };

  const handleNameChange = (event: any) => {
    setCustomerName(event.target.value);
  };

  const handleIceLevelChange = (event: any) => {
    setSelectedIceLevel(event.target.value);
  };

  const handleSugarLevelChange = (event: any) => {
    setSelectedSugarLevel(event.target.value);
  };

  const handleShowOrderDetails = () => {
    setShowOrderDetails((prevDiv) => !prevDiv);
    setListToppings([]);
    setSelectedIceLevel("");
    setSelectedSugarLevel("");
    setNote("");
  };

  const handleCancelButton = () => {
    setRows([]);
    setCustomerEmail("");
    setSubTotal(0.0);
    setcartItems({
      items: [],
      total: 0,
    });
    setFilteredCart([]);
  };

  const handleCashierMenuButton = (product: product) => {
    setDisplayIce(product.has_ice);
    setDisplaySugar(product.has_sugar);
    setDisplayTopping(product.has_toppings);
    console.log(displayIce);
    console.log(displaySugar);
    console.log(displayTopping);
    setShowOrderDetails(true);
    setSelectedProduct(product);
  };

  const addNewItem = () => {
    setShowOrderDetails(false);
    addProductToCart();
    setSelectedIceLevel("No Ice");
    setSelectedSugarLevel("No Sugar");
    setSelectedProduct({
      product_id: 0,
      name: "item",
      url: "",
      price: 0,
      category: "",
      has_ice: false,
      has_toppings: false,
      has_sugar: false,
    });
    setListToppings([]);
  };

  /**These states are probably used for atoms, but I will look into getting rid of them */
  useEffect(() => {
    getProducts(setBestSelling, setFilteredBestSelling);
    const fetchData = async () => {
      const result = await nextOrder();
      setCurrentOrderNumber(result);
    };
    fetchData(); // Call the async function
    console.log(cart);
  }, []);

  const handleCategoryButton = (cate: string) => {
    setCategory(cate);
  };

  let filteredProducts = bestSelling.products.filter(
    (product) => product.category == category
  );

  if (filteredProducts.length === 0) {
    filteredProducts = bestSelling.products;
  }

  return (
    <div className="container-fluid p-0">
      <div className="row p-0">
        <div className="col-lg-8 d-flex flex-column justify-content-start p-0">
          <div className="CategoryNavBar mb-2 p-4">
            {categoriesList.map((category) => (
              <button
                className=" cashier-category-button btn my-1 mx-2"
                onClick={() => handleCategoryButton(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="FoodItemButtonsContainer">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-6 m-2">
              {filteredProducts.map((product: product) => (
                <button
                  className=" btn cashier-page-button mb-2 mx-2 wrap-text"
                  onClick={() => handleCashierMenuButton(product)}
                >
                  {product.name}
                  <div className="button-subtext">
                    ${product.price.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {!showOrderDetails ? (
          <div className="col-lg-4 p-0">
            <div className="OrderDetailsContainer flex-container flex-column d-flex h-100 p-0">
              <div className="OrderHeader">
                <h1 className="largeText">Order#{currentOrderNumber}</h1>

                <div className="order-customer-name">
                  <textarea
                    className="form-control cashier-page-textarea mb-1"
                    placeholder="Enter Customer Name..."
                    rows={1}
                    value={customerName}
                    onChange={handleNameChange}
                  ></textarea>
                  <textarea
                    className="form-control cashier-page-textarea"
                    placeholder="Enter Customer Email..."
                    rows={1}
                    value={customerEmail}
                    onChange={handleEmailChange}
                  ></textarea>
                </div>
              </div>
              {/* <Table
                className="m-4"
                columns={["Name", "Ice", "Sugar", "Toppings", "Price"]}
                data={filteredCart}
              /> */}

              <table className="pendingpage-table mb-5">
                <thead className="pendingpage-table-header">
                  <tr>
                    {tableColumns.map((name: string, i: number) => {
                      return (
                        <th
                          key={i}
                          scope="col"
                          className="pendingpage-table-column px-3 py-2"
                          style={{ width: `${100 / tableColumns.length + 1}%` }}
                        >
                          {name}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.items.map((item: ICartItem, i: number) => (
                    <tr key={i}>
                      <td
                        className="pendingpage-table-column px-3 py-2"
                        style={{ width: `${100 / tableColumns.length + 1}%` }}
                      >
                        {item.product.name ? item.product.name : "None"}
                      </td>
                      <td
                        className="pendingpage-table-column px-3 py-2"
                        style={{ width: `${100 / tableColumns.length + 1}%` }}
                      >
                        {item.ice_level ? item.ice_level : "No Ice"}
                      </td>
                      <td
                        className="pendingpage-table-column px-3 py-2"
                        style={{ width: `${100 / tableColumns.length + 1}%` }}
                      >
                        {item.sugar_level ? item.sugar_level : "No Sugar"}
                      </td>
                      <td
                        className="pendingpage-table-column px-3 py-2"
                        style={{ width: `${100 / tableColumns.length + 1}%` }}
                      >
                        {item.toppings?.length ?? 0 > 0
                          ? item.toppings
                              ?.map((topping) => topping.name)
                              .join(", ")
                          : "No Toppings"}
                      </td>
                      <td
                        className="pendingpage-table-column px-3 py-2"
                        style={{ width: `${100 / tableColumns.length + 1}%` }}
                      >
                        $
                        {(
                          item.product.price +
                          (item.toppings?.length ?? 0) * 0.75
                        ).toFixed(2)}
                      </td>
                      <td
                        className="pendingpage-table-column px-3 py-2"
                        style={{ width: `${100 / tableColumns.length + 1}%` }}
                      >
                        <button
                          onClick={() => handleEditItem(i)}
                          className="btn btn-info btn-sm"
                        >
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Testing */}
              <div className="PricingContainer">
                <h1 className="largeText">Subtotal: ${subTotal.toFixed(2)}</h1>
                <h1 className="largeText">
                  Tax: ${(subTotal * 0.0825).toFixed(2)}
                </h1>
                <div className="dashed-line"></div>
                <h1 className="largeText">
                  Total: ${(subTotal * 1.0825).toFixed(2)}
                </h1>
              </div>
              <div className="OrderDetailsButtonContainer d-flex justify-content-center align-items-center">
                <button
                  onClick={handleProceedButton}
                  className="cashier-category-button btn mx-2 mb-4"
                >
                  Proceed
                </button>

                <button
                  onClick={handleCancelButton}
                  className="cashier-category-button btn mx-2 mb-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-lg-4 p-0">
            <div className="FoodItemContainer flex-container flex-column d-flex h-100 p-0">
              <div className="cashier-page-item-text">
                <h1>{selectedProduct.name}</h1>
                <h2>${selectedProduct.price.toFixed(2)}</h2>
              </div>

              {displayIce && (
                <div className="cashier-ice-dropdown">
                  {iceLevel && (
                    <div>
                      <h2>Ice Level</h2>
                      <select
                        value={selectedIceLevel}
                        onChange={handleIceLevelChange}
                        className="form-control-lg custompage-dropdown"
                      >
                        {iceLevel.map((level: string, i: number) => (
                          <option key={i}>{level}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
              {displaySugar && (
                <div className="cashier-sugar-dropdown">
                  {sugarLevel && (
                    <div>
                      <h2>Sugar Level</h2>
                      <select
                        value={selectedSugarLevel}
                        onChange={handleSugarLevelChange}
                        className="form-control-lg custompage-dropdown"
                      >
                        {sugarLevel.map((level: string, i: number) => (
                          <option key={i}>{level}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
              {displayTopping && (
                <div className="cashier-topping-grid">
                  <h2 className="mt-4">Toppings</h2>
                  {sourceProducts.toppings && (
                    <ToppingsGrid
                      sourceToppings={sourceProducts.toppings}
                      toppings={listToppings}
                      setToppings={setListToppings}
                    />
                  )}
                </div>
              )}
              <div className="mt-2 cashier-page-item-text mb-2">
                <h2 className="text-center">Additional Notes</h2>
                <textarea
                  className="form-control cashier-page-textarea"
                  rows={3}
                  value={note}
                  onChange={handleNoteChange}
                ></textarea>
              </div>
              <div className="flex-column flex-sm-row d-flex align-items-center justify-content-center mb-2">
                <button
                  onClick={handleShowOrderDetails}
                  className="cashier-done-button btn mx-2"
                >
                  Back
                </button>
                <button
                  onClick={() => addNewItem()}
                  className="cashier-done-button btn mx-2"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//We can turn this into a component later:::

const ToppingsGrid: React.FC<ToppingsGridProps> = ({
  toppings,
  setToppings,
  sourceToppings,
}) => {
  const [checkedToppings, setCheckedToppings] = useState<any>({});

  const handleCheckboxChange = (item: topping) => (event: any) => {
    setCheckedToppings((prevState: topping[]) => ({
      ...prevState,
      [item.name]: event.target.checked,
    }));
    if (event.target.checked) {
      const newListToppings: topping[] = [...toppings];
      newListToppings.push(item);
      setToppings(newListToppings);
    } else {
      const newListToppings: topping[] = [];

      for (let i = 0; i < toppings.length; i++) {
        if (toppings[i] != item) {
          newListToppings.push(toppings[i]);
        }
      }
      setToppings(newListToppings);
    }
  };

  return (
    <div className="py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {sourceToppings.map((item: topping, i: number) =>
          item.quantity ? (
            <div key={i} className="col custompage-topping">
              <input
                className="custompage-checkbox"
                type="checkbox"
                id={`blankCheckbox-${item.name}`}
                checked={!!checkedToppings[item.name]}
                onChange={handleCheckboxChange(item)}
                aria-label={item.name}
              />
              <label htmlFor={`blankCheckbox-${item.name}`} className="ms-3">
                {item.name}
              </label>
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
};
export default CashierOrderPage;
