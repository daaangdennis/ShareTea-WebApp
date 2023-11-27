import "../styles/CashierOrderPage.css";
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
} from "../types/types";
import { cart } from "../atoms/cart";
import { postCashierOrder } from "../apis/CashierOrder";
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

  const drinks = [
    "Milk Tea",
    "Fruit Tea",
    "Brewed Tea",
    "Ice Blended",
    "Tea Mojito",
    "Creama",
    "Fresh Milk",
  ];

  const handleProceedButton = () => {
    postCashierOrder(customerEmail, cartItems);
    handleCancelButton();
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
        <div className="col-lg-9 d-flex flex-column justify-content-start p-0">
          <div className="CategoryNavBar mb-2 p-4">
            {categoriesList.map((category) => (
              <button
                className=" cashier-category-button btn mx-2"
                onClick={() => handleCategoryButton(category)}
              >
                {category}
              </button>
            ))}

            {/* <button
              onClick={() => handleCategoryButton(drinks[0])}
              className=""
            >
              {drinks[0]}
            </button>
            <button
              onClick={() => handleCategoryButton(drinks[1])}
              className="cashier-category-button btn mx-2"
            >
              {drinks[1]}
            </button>
            <button
              onClick={() => handleCategoryButton(drinks[2])}
              className="cashier-category-button btn mx-2"
            >
              {drinks[2]}
            </button>
            <button
              onClick={() => handleCategoryButton(drinks[3])}
              className="cashier-category-button btn mx-2"
            >
              {drinks[3]}
            </button>
            <button
              onClick={() => handleCategoryButton(drinks[4])}
              className="cashier-category-button btn mx-2"
            >
              {drinks[4]}
            </button>
            <button
              onClick={() => handleCategoryButton(drinks[5])}
              className="cashier-category-button btn mx-2"
            >
              {drinks[5]}
            </button> */}
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
          <div className="col-lg-3 p-0">
            <div className="OrderDetailsContainer flex-container flex-column d-flex h-100 p-0">
              <div className="OrderHeader">
                <h1 className="largeText">Order#</h1>

                <div className="order-customer-name">
                  <textarea
                    className="form-control cashier-page-textarea"
                    placeholder="Enter Customer Email..."
                    rows={1}
                    value={customerEmail}
                    onChange={handleEmailChange}
                  ></textarea>
                </div>
              </div>
              <Table
                className="m-4"
                columns={["Name", "Ice", "Sugar", "Toppings", "Price"]}
                data={filteredCart}
              />
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
          <div className="col-lg-3 p-0">
            <div className="FoodItemContainer flex-container flex-column d-flex h-100 p-0">
              <div className="cashier-page-item-text">
                <h1>{selectedProduct.name}</h1>
                <h2>${selectedProduct.price.toFixed(2)}</h2>
              </div>

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
              <div className="mt-2 cashier-notes-container ml-2">
                <h2>Additional Notes</h2>
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
                  className="cashier-page-button btn mx-2"
                >
                  Back
                </button>
                <button
                  onClick={() => addNewItem()}
                  className="cashier-page-button btn mx-2"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 
                <div className="ItemGrid">
                  <div className="ItemCategories row">
           
                    <div className="col orderColumns">
                      <p>Name</p>
                    </div>

                    <div className="col orderColumns">
                      <p>Ice</p>
                    </div>
          
                    <div className="col orderColumns">
                      <p>Sugar</p>
                    </div>
              
                    <div className="col orderColumns">
                      <p>Toppings</p>
                    </div>
               
                    <div className="col orderColumns">
                      <p>Price</p>
                    </div>
                  </div>

                  {rows.map((rowData, index) => (
                    <div key={index} className="CartItems row">
                      <div
                        className="col orderColumns"
                        style={{ maxWidth: "20%" }}
                      >
                        <p>{rowData.itemName}</p>
                      </div>
                      <div
                        className="col orderColumns"
                        style={{ maxWidth: "20%" }}
                      >
                        <p>{rowData.itemIce}</p>
                      </div>
                      <div
                        className="col orderColumns"
                        style={{ maxWidth: "20%" }}
                      >
                        <p>{rowData.itemSugar}</p>
                      </div>
                      <div
                        className="col orderColumns"
                        style={{ maxWidth: "20%" }}
                      >
                        <p>{rowData.itemToppings}</p>
                      </div>
                      <div
                        className="col orderColumns"
                        style={{ maxWidth: "20%" }}
                      >
                        <p>${rowData.itemPrice}</p>
                      </div>
                    </div>
                  ))}
                </div> */}

        {/* </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ViewOrder cashier-page-button-container flex-column flex-sm-row">
 
   
        <button className="cashier-page-button">View Order</button>
      </div>
    </div> */}
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
