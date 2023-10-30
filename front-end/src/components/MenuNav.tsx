import Nav from "react-bootstrap/Nav";

function MenuNav() {
  const navItems = [
    { path: "/", name: "Menu" },
    { path: "/", name: "Recommended" },
    { path: "/", name: "Previous" },
    { path: "/", name: "Favorite" },
  ];
  return (
    <Nav justify variant="tabs" defaultActiveKey="/">
      {navItems.map((item: { path: string; name: string }, i: number) => (
        <Nav.Item>
          <Nav.Link eventKey={`link-${i}`} href={item.path}>
            {item.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
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
