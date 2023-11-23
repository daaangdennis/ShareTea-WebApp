import { Link, useLocation } from "react-router-dom";
import {
  Cart,
  listProductToppings,
  navbarProps,
  product,
  route,
} from "../types/types";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Products, filteredProducts } from "../atoms/product";
import { getProducts } from "../apis/Product";
import { cart } from "../atoms/cart";
import "../styles/Navbar.css";
import { LoginButton, LogoutButton } from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import UserInfo from "./UserInfo";
import useUserRole from "../hooks/useUserRole";

const Navbar: React.FC<navbarProps> = ({ routes }) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  const [activePage, setActivePage] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const SourceProducts = useRecoilValue<listProductToppings>(Products);
  const setProducts = useSetRecoilState<listProductToppings>(Products);
  const setFilteredProducts =
    useSetRecoilState<listProductToppings>(filteredProducts);
  const cartItems = useRecoilValue<Cart>(cart);
  const { userRole } = useUserRole();

  const [menu, setMenu] = useState("home");
  const location = useLocation();

  useEffect(() => {
    getProducts(setProducts, setFilteredProducts);
    setFilteredProducts(SourceProducts);
  }, [isLoading, getAccessTokenSilently, activePage]);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(SourceProducts);
    } else {
      const filtered: listProductToppings = {
        products: SourceProducts.products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        toppings: SourceProducts.toppings,
      };
      setFilteredProducts(filtered);
    }
  }, [searchTerm, isLoading, getAccessTokenSilently, activePage]);

  return (
    <header className="p-3 text-bg">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to={"/"}
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <img
              width="auto"
              height="55"
              className="p-3"
              src="https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/fd85183c-e606-4f3a-b24d-96dab9535761/new-logo_500x99px.png?format=1500w"
            ></img>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {routes.map((item: route, i: number) =>
              (!item.roles && !userRole) || !item.roles ? (
                item.name == "Cart" ? (
                  <li key={i}>
                    <Link
                      className="nav-link px-2 text-dark"
                      to={item.path}
                      onClick={() => setActivePage(item.name)}
                    >
                      <p
                        className="navbar-link m-0"
                        style={
                          location.pathname == item.path
                            ? {
                                textDecoration: "underline",
                                textDecorationColor: "#cf152d",
                                textDecorationThickness: "4px",
                                textUnderlineOffset: "10px",
                              }
                            : {}
                        }
                      >
                        {item.name}
                      </p>
                      <div className="nav-cart-count">
                        {cartItems.items.length}
                      </div>
                    </Link>
                  </li>
                ) : (
                  <li key={i}>
                    <Link
                      className="nav-link text-dark"
                      to={item.path}
                      style={
                        location.pathname == item.path
                          ? {
                              textDecoration: "underline",
                              textDecorationColor: "#cf152d",
                              textDecorationThickness: "4px",
                              textUnderlineOffset: "10px",
                            }
                          : {}
                      }
                      onClick={() => setActivePage(item.name)}
                    >
                      <p className="navbar-link m-0">{item.name}</p>
                    </Link>
                  </li>
                )
              ) : item.roles.includes(userRole) ? (
                <li key={i}>
                  <Link
                    className="nav-link text-dark"
                    to={item.path}
                    style={
                      location.pathname == item.path
                        ? {
                            textDecoration: "underline",
                            textDecorationColor: "#cf152d",
                            textDecorationThickness: "4px",
                            textUnderlineOffset: "10px",
                          }
                        : {}
                    }
                    onClick={() => setActivePage(item.name)}
                  >
                    <p className="navbar-link m-0">{item.name}</p>
                  </Link>
                </li>
              ) : (
                <></>
              )
            )}
          </ul>

          <div className="text-end">
            {isAuthenticated ? (
              <div style={{ display: "flex" }}>
                <UserInfo />
                <LogoutButton />
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
