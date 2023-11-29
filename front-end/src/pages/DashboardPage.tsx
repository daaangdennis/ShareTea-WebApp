import SubNav from "../components/SubNav";
import { useState } from "react";
import "../styles/table.css";
import InventoryManagement from "../components/InventoryManagement";
import MenuManagement from "../components/MenuManagement";
import { Nav } from "react-bootstrap";
import StatsPage from "./StatsPage";
import UserManagement from "../components/UserManagement";
import useUserRole from "../hooks/useUserRole";

function DashboardPage() {
  const { userRole, isLoading } = useUserRole();

  const navItems = [
    { name: "Inventory" },
    { name: "Menu" },
    { name: "Statistics" },
  ];

  if (userRole === "admin") {
    navItems.push({ name: "Users" });
  }
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
