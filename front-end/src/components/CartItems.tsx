import React from "react";
import {
  Cart,
  ProductCardProps,
  ProductGridProps,
  product,
} from "../types/types";
import { Products, filteredProducts } from "../atoms/product";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cart } from "../atoms/cart";
import "../styles/CartPage.css";
var _ = require("lodash");

const CartItem: React.FC<ProductCardProps> = ({ product }) => {

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

    const deleteProductFromCart = () => {
        const newItems = cartItems.items.filter((item) => item.product !== product);
        const newTotal = cartItems.total - product.price;
        const newlist: Cart = {
            items: newItems,
            total: newTotal,
        };
        setcartItems(newlist);
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
                }}
                src={product.url}
                alt={product.name}
                />
            </div>
            <div className="col-md-8">
                <div className="drink-order-text-container">
                    <h2 className="py-4 pt-md-0">
                        {product.name}
                        <br></br>
                        ${(product.price).toFixed(2)}
                    </h2>
                    <p className="pb-4">
                        Topping1
                        <br></br>
                        Topping2
                        <br></br>
                        Topping3
                        <br></br>
                        Topping2
                        <br></br>
                        Topping3
                        <br></br>
                        Topping2
                        <br></br>
                        Topping3
                    </p>
                    <div className="drink-order-button-container flex-column flex-md-row">
                        <button className="order-button">Edit Drink</button>
                        <button className="order-button" onClick={addProductToCart}>Add</button>
                        <button className="order-button" onClick={deleteProductFromCart}>Delete</button>
                    </div>
                </div> 
            </div>
        </div>
    );
};

const CartItemsGrid: React.FC<ProductGridProps> = () => {
  const cartItems = useRecoilValue<Cart>(cart);

  return (
    <div className="album">
      <div className="container">
        <div className="col">
        {cartItems.items.map(
          (
            item: {
              product: product;
              toppings?: any;
              notes?: string;
            },
            i: number
          ) => (
            <CartItem key={i} product={item.product}/>
          )
        )}
        </div>
      </div>
    </div>
  );
};

export default CartItemsGrid;
