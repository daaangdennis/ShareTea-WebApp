import { Link } from "react-router-dom";
import { navbarProps, product, route } from "../types/types";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Products, filteredProducts } from "../atoms/product";
import { getProducts } from "../apis/Product";

const Navbar: React.FC<navbarProps> = ({ routes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const SourceProducts = useRecoilValue<product[]>(Products);
  const setProducts = useSetRecoilState<product[]>(Products);
  const setFilteredProducts = useSetRecoilState<product[]>(filteredProducts);

  useEffect(() => {
    getProducts(setProducts, setFilteredProducts);
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
            {routes.map((item: route) => (
              <li>
                <Link className="nav-link px-2 text-dark" to={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}
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
            <Link to={"/login"}>
              <button type="button" className="btn btn-outline-dark me-2">
                Login
              </button>
            </Link>
            <button type="button" className="btn btn-warning">
              Sign-up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
