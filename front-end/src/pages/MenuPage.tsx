import React, { useState } from "react";
import MenuContent from "../components/MenuContent";
import MenuSidebar from "../components/MenuSidebar";
import SubNav from "../components/SubNav";
import Nav from "react-bootstrap/Nav";
import RecommendedContent from "../components/RecommendedContent";
import FavoriteContent from "../components/FavoriteContent";
import MenuBoard from "../components/MenuBoard";

function MenuPage() {
  const navItems = [
    { name: "Menu" },
    { name: "Recommended" },
    { name: "Favorites" },
    { name: "Menu Board" },
  ];

  const [selectedNavItem, setSelectedNavItem] = useState(navItems[0].name);

  const renderContent = () => {
    switch (selectedNavItem) {
      case "Menu":
        return <MenuContent />;
      case "Recommended":
        return <RecommendedContent />;
      case "Favorites":
        return <FavoriteContent />;
      case "Menu Board":
        return <MenuBoard />;
      default:
        return <MenuContent />;
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
