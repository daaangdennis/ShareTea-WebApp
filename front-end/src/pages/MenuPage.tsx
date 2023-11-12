import MenuContent from "../components/MenuContent";
import MenuSidebar from "../components/MenuSidebar";
import ProductGrid from "../components/ProductGrid";
import SubNav from "../components/SubNav";
import Nav from "react-bootstrap/Nav";

function MenuPage() {
  const navItems = [
    { path: "/Menu", name: "Menu" },
    { path: "/", name: "Recommended" },
    { path: "/", name: "Previous Orders" },
    { path: "/", name: "Favorites" },
  ];
  return (
    <div className="col">
      <SubNav>
        {navItems.map((item: { path: string; name: string }, i: number) => (
          <Nav.Item key={i}>
            <Nav.Link eventKey={`link-${i}`} href={item.path}>
              {item.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </SubNav>
      <div className="row">
        <div className="col-lg-2 p-0">
          <MenuSidebar />
        </div>
        <div className="col">
          <MenuContent />
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
