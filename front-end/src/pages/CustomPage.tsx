import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Cart, ToppingsGridProps, product } from "../types/types";
import { useRecoilState } from "recoil";
import { cart } from "../atoms/cart";
import "../styles/CustomPage.css";
var _ = require("lodash");

function CustomPage() {
  const location = useLocation();
  const product: product = location.state && location.state.data;

  const [cartItems, setcartItems] = useRecoilState<Cart>(cart);

  const addProductToCart = () => {
    const newlist: Cart = _.cloneDeep(cartItems);
    newlist.items.push({
      product: product,
      toppings: "none",
      notes: "none",
    });
    newlist.total = newlist.total + product.price;
    setcartItems(newlist);
  };

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

  const toppings = {
    items: ["item1", "item2", "item3", "item4", "item5", "item6"],
    price: 0.75,
  };

  return (
    <div className="container-fluid">
      <div className="row custompage-drink-information mb-4">
        <div className="col-md-4 text-center my-4 px-0">
          <img
            width="60%"
            style={{
              objectFit: "contain",
              border: "2px solid white",
              borderRadius: "15px",
              backgroundColor: "white",
            }}
            src={product.url}
            alt={product.name}
          />
        </div>
        <div className="col-md-8 px-0 my-4 text-center text-md-start custompage-drink-information-text">
          <h1>
            {product.name}
            <br></br>${product.price.toFixed(2)}
          </h1>
        </div>
      </div>

      <div className="row mx-2 mx-md-4 custompage-customization-container">
        <h1>Customization</h1>
        <div className="col-md-4">
          {iceLevel && (
            <div>
              <h2>Ice Level</h2>
              <select className="form-control-lg custompage-dropdown">
                {iceLevel.map((level: string, i: number) => (
                  <option key={i}>{level}</option>
                ))}
              </select>
            </div>
          )}

          <br></br>

          {sugarLevel && (
            <div>
              <h2>Sugar Level</h2>
              <select className="form-control-lg custompage-dropdown">
                {sugarLevel.map((level: string) => (
                  <option>{level}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="col">
          {toppings && (
            <div>
              <h2>Toppings (+${toppings.price.toFixed(2)} each)</h2>
              {/* <select className="form-control-lg">
                {toppings.items.map((topping: string) => (
                  <option>{topping}</option>
                ))}
              </select> */}
              <ToppingsGrid toppings={toppings} />
            </div>
          )}
        </div>

        <div className="mt-2 custompage-notes-container">
          <h2>Additional Notes</h2>
          <textarea
            className="form-control custompage-textarea"
            id="exampleFormControlTextarea1"
            rows={3}
          ></textarea>
        </div>

        <div className="custompage-button-container flex-column flex-sm-row">
          <button className="custompage-button">Save to Favorites</button>
          <button onClick={addProductToCart} className="custompage-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
const ToppingsGrid: React.FC<ToppingsGridProps> = ({ toppings }) => {
  return (
    <div className="py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {toppings.items.map((item: string, i: number) => (
          <div key={i} className="col custompage-topping">
            <input
              className="custompage-checkbox"
              type="checkbox"
              id="blankCheckbox"
              value="{item}"
              aria-label="..."
            />
            <label className="ms-3">{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPage;
