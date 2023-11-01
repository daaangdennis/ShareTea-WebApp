import { Link } from "react-router-dom";
import { Cart, navbarProps, product, route } from "../types/types";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Products, filteredProducts } from "../atoms/product";
import { getProducts } from "../apis/Product";
import { cart } from "../atoms/cart";
import { LoginButton, LogoutButton } from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import UserInfo from "./UserInfo";


const Navbar: React.FC<navbarProps> = ({ routes }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [searchTerm, setSearchTerm] = useState("");
  const SourceProducts = useRecoilValue<product[]>(Products);
  const setProducts = useSetRecoilState<product[]>(Products);
  const setFilteredProducts = useSetRecoilState<product[]>(filteredProducts);
  const cartItems = useRecoilValue<Cart>(cart);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getProducts(setProducts, setFilteredProducts, getAccessTokenSilently);
    setFilteredProducts(SourceProducts);
  }, []);
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(SourceProducts);
    } else {
      const filtered = SourceProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

  return (
    <header className="p-3 text-bg">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to={"/"}
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <img
              width="auto"
              height="50"
              className="p-3"
              src="https://images.squarespace-cdn.com/content/v1/61e8bb2a2cf8670534839093/fd85183c-e606-4f3a-b24d-96dab9535761/new-logo_500x99px.png?format=1500w"
            ></img>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {routes.map((item: route) =>
              item.name == "Cart" ? (
                <li>
                  <Link style={{ textDecoration: "none" }} to={item.path}>
                    <button
                      type="button"
                      className="nav-link px-2 btn position-relative text-dark"
                    >
                      {item.name}
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItems.items.length}
                      </span>
                    </button>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link className="nav-link px-2 text-dark" to={item.path}>
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-light"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div className="text-end">
            {isAuthenticated ?(
            <div style={{ display: "flex" }}>
              <UserInfo />
              <LogoutButton />
            </div>
            ):
            (
              <LoginButton></LoginButton>
            )

            }
            
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
