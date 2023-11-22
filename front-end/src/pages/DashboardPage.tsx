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
} from "../apis/Dashboard";
import { getProducts } from "../apis/Product";
import "../styles/table.css";
import Table from "../components/Table";
import InventoryManagement from "../components/InventoryManagement";
import MenuManagement from "../components/MenuManagement";
import { Nav } from "react-bootstrap";
import StatsPage from "./StatsPage";
import UserManagement from "../components/UserManagement";

function DashboardPage() {
  const navItems = [
    { name: "Inventory" },
    { name: "Menu" },
    { name: "Users" },
    { name: "Statistics" },
  ];

  const [selectedNavItem, setSelectedNavItem] = useState(navItems[0].name);

  const renderContent = () => {
    switch (selectedNavItem) {
      case "Inventory":
        return <InventoryManagement />;
      case "Menu":
        return <MenuManagement />;
      case "Users":
        return <UserManagement />;
      case "Statistics":
        return <StatsPage />;
      default:
        return <InventoryManagement />;
    }
  };

  const shouldRenderSidebar = selectedNavItem === "Menu";

  return (
    <>
      <SubNav>
        <Nav
          activeKey={selectedNavItem}
          onSelect={(key) => setSelectedNavItem(key || "")}
        >
          {navItems.map((item, i) => (
            <div key={i}>
              <Nav.Link
                eventKey={item.name}
                style={
                  selectedNavItem === item.name
                    ? {
                        textDecoration: "none",
                        color: "white",
                        fontWeight: "700",
                      }
                    : { textDecoration: "none", color: "white" }
                }
              >
                {item.name}
              </Nav.Link>
            </div>
          ))}
        </Nav>
      </SubNav>
      <div className="-lg-12">{renderContent()}</div>
    </>
  );
}

export default DashboardPage;
