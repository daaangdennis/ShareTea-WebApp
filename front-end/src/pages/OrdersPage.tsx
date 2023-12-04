import PendingOrderGrid from "../components/PendingOrderGrid";
import PendingPage from "../components/PendingPage";
import OrderHistory from "../components/OrderHistory";
import { useEffect, useState } from "react";

import "../styles/PendingPage.css";
import SubNav from "../components/SubNav";
import Nav from "react-bootstrap/Nav";
import CashierOrderPage from "./CashierOrderPage";

function OrdersPage() {
  const navItems = [
    { name: "Checkout" },
    { name: "Pending Orders" },
    { name: "Order History" },
  ];

  const [selectedNavItem, setSelectedNavItem] = useState(navItems[0].name);
  const renderContent = () => {
    switch (selectedNavItem) {
      case "Checkout":
        return <CashierOrderPage />;
      case "Pending Orders":
        return <PendingPage />;
      case "Order History":
        return <OrderHistory />;
      default:
        return <CashierOrderPage />;
    }
  };
  const shouldRenderSidebar = selectedNavItem === "Menu";

  return (
    <div className="col">
      <SubNav>
        <Nav
          activeKey={selectedNavItem}
          onSelect={(key) => setSelectedNavItem(key || "")}
        >
          <div className="menupage-navbar-link-container p-0">
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
          </div>
        </Nav>
      </SubNav>
      <div className="row">
        <div className={`col${shouldRenderSidebar ? "" : "-lg-12"}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
