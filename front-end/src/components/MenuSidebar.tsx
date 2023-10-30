import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { product } from "../types/types";
import { Products, filteredProducts } from "../atoms/product";
import { getProducts } from "../apis/Product";

const useCategoryFilter = (searchTerm: string) => {
  const SourceProducts = useRecoilValue<product[]>(Products);
  const setFilteredProducts = useSetRecoilState<product[]>(filteredProducts);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(SourceProducts);
    } else {
      const filtered = SourceProducts.filter((product) =>
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, SourceProducts, setFilteredProducts]);
};

function MenuSidebar() {
  const drinks = [
    "Milk Tea",
    "Fruit Tea",
    "Brewed Tea",
    "Ice Blended",
    "Tea Mojito",
    "Creama",
    "Fresh Milk",
  ];

  const [display, setDisplay] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useCategoryFilter(searchTerm);

  const handleSidebar = () => {
    if (display == "d-none") {
      setDisplay("");
    } else {
      setDisplay("d-none");
    }
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 align-items-center"
      style={{ width: "280px" }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <div className="fs-2 mb-3 d-flex">
          <div onClick={handleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              ></path>
            </svg>
          </div>
          Drinks
        </div>
        <div className={display}>
          {drinks.map((item: string) => (
            <div
              onClick={() => setSearchTerm(item)}
              className="nav-item"
              style={{ textDecoration: "none" }}
            >
              {/* <div className="nav-link link-body-emphasis ">{item}</div> */}
              <div className="nav-link link-body-emphasis ">{item}</div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default MenuSidebar;
