import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Products } from "../atoms/product";
import { listProductToppings, product, topping} from "../types/types";

import "../styles/MenuBoard.css";
import { getCategories } from "../apis/Dashboard";


const MenuBoard = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useRecoilState<listProductToppings>(Products);
  useEffect(() => {
    getCategories(setCategories);
  }, []);
  console.log(products);

  return (
    <div className="menuboard-container">
        <div className="menubard-header">
            <h1>Welcome to Sharetea!</h1>
        </div>
        <div className="menuboard-content">
          {categories.map((category: string, i: number) => (
            <div key={i}>
              <p>{category}</p>
              {products.products.filter(product => product.category === category).map((product: product) => (
                <p>{product.name} ${(product.price).toFixed(2)}</p>
              ))}
            </div>
          ))}
          <p>Available Toppings (+$0.75 each)</p>
          {products.toppings.map((topping: topping) => (
            <p>{topping.name}</p>
          ))}
        </div>
    </div>
  );
};

export default MenuBoard;