import React, { useState } from "react";
import MenuContent from "../components/MenuContent";
import MenuSidebar from "../components/MenuSidebar";
import SubNav from "../components/SubNav";
import Nav from "react-bootstrap/Nav";
import RecommendedContent from "../components/RecommendedContent";
import PreviousContent from "../components/PreviousContent";
import FavoriteContent from "../components/FavoriteContent";

function MenuPage() {
  const navItems = [
    { name: "Menu" },
    { name: "Recommended" },
    { name: "Previous Orders" },
    { name: "Favorites" },
  ];

  const [selectedNavItem, setSelectedNavItem] = useState(navItems[0].name);

  const renderContent = () => {
    switch (selectedNavItem) {
      case "Menu":
        return <MenuContent />;
      case "Recommended":
        return <RecommendedContent />;
      case "Previous Orders":
        return <PreviousContent />;
      case "Favorites":
        return <FavoriteContent />;
      default:
        return <MenuContent />;
    }
  };

  const shouldRenderSidebar = selectedNavItem === "Menu";

  return (
    <div className="col">
      <SubNav>
        <Nav
          variant="tabs"
          activeKey={selectedNavItem}
          onSelect={(key) => setSelectedNavItem(key || "")}
        >
          {navItems.map((item, i) => (
            <Nav.Item key={i}>
              <Nav.Link eventKey={item.name}>{item.name}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </SubNav>
      <div className="row">
        {shouldRenderSidebar && (
          <div className="col-lg-2 p-0">
            <MenuSidebar />
          </div>
        )}
        <div className={`col${shouldRenderSidebar ? "" : "-lg-12"}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
