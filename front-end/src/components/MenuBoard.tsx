import React, { useEffect, useState } from "react";
import "../styles/MenuBoard.css";
import { getCategories } from "../apis/Dashboard";


const MenuBoard = () => {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    getCategories(setCategories);
  }, []);

  return (
    <div className="menuboard-container">
        <div className="menubard-header">
            <h1>Welcome to Sharetea!</h1>
        </div>
        {categories.map((category: string, i: number) => (
            <p>{category}</p>
        ))}
    </div>
  );
};

export default MenuBoard;