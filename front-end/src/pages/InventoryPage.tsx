import { useRecoilState, useRecoilValue } from "recoil";
import SubNav from "../components/SubNav";
import { InventoryList, listProductToppings, product } from "../types/types";
import { Products, filteredProducts } from "../atoms/product";
import { useEffect, useState } from "react";
import {
  deleteInventory,
  deleteMenu,
  getInventory,
  updateInventory,
  updateMenu,
} from "../apis/Inventory";
import { getProducts } from "../apis/Product";
import "../styles/table.css";
import Table from "../components/Table";
import InventoryManagement from "../components/InventoryManagement";
import MenuManagement from "../components/MenuManagement";

function InventoryPage() {
  const [navToggle, setNavToggle] = useState<boolean>(false);

  return (
    <>
      <SubNav>
        <nav>
          <button className="me-3" onClick={() => setNavToggle(false)}>
            Manage Inventory
          </button>
          <button onClick={() => setNavToggle(true)}>Edit Menu</button>
        </nav>
      </SubNav>
      {!navToggle ? <InventoryManagement /> : <MenuManagement />}
    </>
  );
}

export default InventoryPage;
