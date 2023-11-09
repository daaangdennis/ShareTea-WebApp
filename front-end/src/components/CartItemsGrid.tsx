import React, { useState } from "react";
import {
  Cart,
  CartCardProps,
  CartGridProps,
  product,
  ICartItem,
  topping,
  customItem,
} from "../types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { cart } from "../atoms/cart";
import { Link } from "react-router-dom";
import "../styles/CartPage.css";
var _ = require("lodash");

const CartItem: React.FC<CartCardProps> = ({ item }) => {
  const [cartItems, setcartItems] = useRecoilState<Cart>(cart);
  const [data, setdata] = useState<customItem>({ isEdit: true, item });

  const toppingsCount: number = item.toppings?.length || 0;

  const addProductToCart = () => {
    const newlist: Cart = _.cloneDeep(cartItems);
    newlist.items.push({
      product: item.product,
      toppings: item.toppings,
      ice_level: item.ice_level,
      sugar_level: item.sugar_level,
      notes: item.notes,
    });

    newlist.total = newlist.total + item.product.price + toppingsCount * 0.75;
    setcartItems(newlist);
  };

  const deleteProductFromCart = () => {
    if (item.cartId != undefined) {
      const newItems = cartItems;
      const newTotal =
        cartItems.total - item.product.price - toppingsCount * 0.75;
      const newlist: Cart = {
        items: [
          ...cartItems.items.slice(0, item.cartId),
          ...cartItems.items.slice(item.cartId + 1),
        ],
        total: newTotal,
      };
      setcartItems(newlist);
    }
  };

  return (
    <div className="row mx-4 mb-5 drink-order-container">
      <div className="col-md-4">
        <img
          className="card-img"
          width="100%"
          style={{
            objectFit: "contain",
            border: "2px solid white",
            borderRadius: "15px",
            backgroundColor: "white",
          }}
          src={item.product.url}
          alt={item.product.name}
        />
      </div>
      <div className="col-md-8">
        <div className="drink-order-text-container">
          <h2 className="py-4 pt-md-0">
            {item.product.name}
            <br></br>${(item.product.price + toppingsCount * 0.75).toFixed(2)}
          </h2>
          <p className="pb-4 mb-auto">
            {item.ice_level ? (
              <>
                {item.ice_level}
                <br></br>
              </>
            ) : (
              <>
                No Ice<br></br>
              </>
            )}
            {item.sugar_level ? (
              <>
                {item.sugar_level}
                <br></br>
              </>
            ) : (
              <>
                No Sugar<br></br>
              </>
            )}
            {item.toppings?.map((topping: topping) => (
              <>
                {topping.name} (+$0.75)<br></br>
              </>
            ))}
            Additional Notes: {item.notes ? <>{item.notes}</> : <>None</>}
          </p>
          <div className="drink-order-button-container flex-column flex-lg-row">
            <Link
              to={`/custom`}
              state={{ data: data }}
              className="order-button"
            >
              Edit Drink
            </Link>
            <button className="order-button" onClick={addProductToCart}>
              Add
            </button>
            <button className="order-button" onClick={deleteProductFromCart}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItemsGrid: React.FC<CartGridProps> = () => {
  const cartItems = useRecoilValue<Cart>(cart);

  return (
    <div className="album">
      <div className="container">
        <div className="col">
          {cartItems.items.map(
            (
              item: {
                product: product;
                toppings?: any | topping[];
                ice_level?: any;
                sugar_level?: any;
                notes?: string;
              },
              i: number
            ) => (
              <CartItem key={i} item={{ cartId: i, ...item }} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItemsGrid;
