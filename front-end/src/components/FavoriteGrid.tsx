import React, { useEffect, useState } from "react";
import {
  Cart,
  CartCardProps,
  CartGridProps,
  product,
  ICartItem,
  topping,
  customItem,
} from "../types/types";
import "../styles/CartPage.css";
import { CartItem } from "./CartItemsGrid";
import { useAuth0 } from "@auth0/auth0-react";
import { getFavorites } from "../apis/Favorite";
var _ = require("lodash");

const FavoriteItemsGrid = () => {
    const [cartItems, setcartItems] = useState<Cart>({ items: [] , total: 0});
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                getFavorites(setcartItems, accessToken);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, [getAccessTokenSilently]);
  
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
                <CartItem key={i} item={{ cartId: i, ...item }} favorite={true} />
              )
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default FavoriteItemsGrid;