import { Link } from "react-router-dom";
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

const Navbar: React.FC<navbarProps> = ({ routes }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [searchTerm, setSearchTerm] = useState("");
  const SourceProducts = useRecoilValue<listProductToppings>(Products);
  const setProducts = useSetRecoilState<listProductToppings>(Products);
  const setFilteredProducts =
    useSetRecoilState<listProductToppings>(filteredProducts);
  const cartItems = useRecoilValue<Cart>(cart);

  // const { getAccessTokenSilently } = useAuth0();
  const [menu, setMenu] = useState("home");

  useEffect(() => {
    getProducts(setProducts, setFilteredProducts);
    setFilteredProducts(SourceProducts);
  }, []);
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
  }, [searchTerm]);

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
              item.name == "Cart" ? (
                <li key={i}>
                  <Link
                    className="nav-link px-2 text-dark nav-font"
                    style={{ textDecoration: "none", fontSize: "16px" }}
                    to={item.path}
                  >
                    {item.name}
                    <div className="nav-cart-count">
                      {cartItems.items.length}
                    </div>
                  </Link>
                </li>
              ) : (
                <li key={i}>
                  <Link className="nav-link text-dark nav-font" to={item.path}>
                    {item.name}
                  </Link>
                </li>
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
              <LoginButton></LoginButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
