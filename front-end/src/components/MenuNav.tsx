import Nav from "react-bootstrap/Nav";
import "../styles/MenuPage.css";

function MenuNav() {
  const navItems = [
    { path: "/Menu", name: "Menu" },
    { path: "/", name: "Recommended" },
    { path: "/", name: "Previous Orders" },
    { path: "/", name: "Favorites" },
  ];
  return (
    <div className="menupage-navbar">
      <div className="menupage-navbar-link-container px-md-5">
        {navItems.map((item: { path: string; name: string }, i: number) => (
          <Nav.Item key={i}>
            <Nav.Link eventKey={`link-${i}`} href={item.path}>
              {item.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </div>
    </div>
  );
}

export default MenuNav;

//   <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
// </Nav.Item>
// <Nav.Item>
//   <Nav.Link eventKey="link-2">Link</Nav.Link>
// </Nav.Item>
// <Nav.Item>
//   <Nav.Link eventKey="disabled" disabled>
//     Disabled
//   </Nav.Link>
// </Nav.Item>
