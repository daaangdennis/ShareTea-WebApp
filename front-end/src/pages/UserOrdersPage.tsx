
import { useEffect, useState } from "react";
import "../styles/PendingPage.css";
import SubNav from "../components/SubNav";
import Nav from "react-bootstrap/Nav";
import UserPendingPage from "../components/UserPendingPage";
import UserOrderHistory from "../components/UserOrderHistory";


function UserOrdersPage() {
    const navItems = [
        { name: "Pending Orders" },
        { name: "Order History" },
      ];
    
    const [selectedNavItem, setSelectedNavItem] = useState(navItems[0].name);
    const renderContent = () => {
        switch (selectedNavItem) {
          case "Pending Orders":
            return <UserPendingPage />;
          case "Order History":
            return <UserOrderHistory />;
          default:
            return <UserPendingPage />;
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
                    {navItems.map((item, i) => (
                        <div key={i}>
                        <Nav.Link 
                            eventKey={item.name} 
                            style={selectedNavItem === item.name ? ({textDecoration: "none", color: "white", fontWeight: "700"}) : ({textDecoration: "none", color: "white"})}
                        >
                            {item.name}
                        </Nav.Link>
                        </div>
                    ))}
                </Nav>
            </SubNav>
            <div className="row">
                <div className={`col${shouldRenderSidebar ? "" : "-lg-12"}`}>
                {renderContent()}
                </div>
            </div>
        </div> 
    );
};

export default UserOrdersPage;