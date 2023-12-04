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
        <div className="menubard-header my-4">
            <h1>Welcome to Sharetea!</h1>
        </div>
        <div className="menuboard-content mx-5">
          {categories.map((category: string, i: number) => (
            <div key={i} className="menuboard-content-section">
              <h3 className="menuboard-content-category-text pb-2">{category}</h3>
              {products.products.filter(product => product.category === category).map((product: product) => (
                <div className="menuboard-content-item-container">
                  <p>{product.name}</p>
                  <p style={{color: "#cf152d"}}>${(product.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          ))}
          <div className="menuboard-content-section">
            <h3 className="menuboard-content-category-text pb-2">Toppings (+$0.75 each)</h3>
            {products.toppings.map((topping: topping) => (
              <p className="menuboard-content-item-container">{topping.name}</p>
            ))}
          </div>
        </div>
    </div>
  );
};

export default MenuBoard;