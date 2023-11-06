import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { listProductToppings, product } from "../types/types";
import { Products, filteredProducts } from "../atoms/product";
import { getProducts } from "../apis/Product";

const useCategoryFilter = (searchTerm: string, category: string) => {
  const SourceProducts = useRecoilValue<listProductToppings>(Products);
  const setFilteredProducts =
    useSetRecoilState<listProductToppings>(filteredProducts);

  useEffect(() => {
    if (category.trim() === "" && searchTerm.trim() === "") {
      setFilteredProducts(SourceProducts);
    } else if (searchTerm.trim() === "") {
      const filtered: listProductToppings = {
        products: SourceProducts.products.filter((product) =>
          product.category.toLowerCase().includes(category.toLowerCase())
        ),
        toppings: SourceProducts.toppings,
      };
      setFilteredProducts(filtered);
    } else {
      const filtered: listProductToppings = {
        products: SourceProducts.products.filter((product) =>
          product.category.toLowerCase().includes(category.toLowerCase())
        ).filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase())),
        toppings: SourceProducts.toppings,
      };
      setFilteredProducts(filtered);
    }
  }, [searchTerm, category, SourceProducts, setFilteredProducts]);
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
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  useCategoryFilter(searchTerm, currentCategory);

  const handleSidebar = () => {
    if (display == "d-none") {
      setDisplay("");
      setSidebarCollapsed(false);
    } else {
      setDisplay("d-none");
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="menupage-sidebar-container px-4 py-3">
      <div className="menupage-search-container">
        <form role="search">
          <input
            type="search"
            className="form-control menupage-search"
            placeholder="Search..."
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

      </div>
      <div className="menupage-filter-container">
        <ul className="flex-column mb-auto px-0 py-3">
          <div className="menupage-filter-header">
            <div onClick={handleSidebar}>
              {sidebarCollapsed ? 
                (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    className="bi bi-list"
                    viewBox="0 0 16 16"
                    style={{ cursor: 'pointer' }}>
                    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
                  </svg>
                ) 
                : 
                (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="40" 
                    height="40" 
                    fill="currentColor" 
                    className="bi bi-x" 
                    viewBox="2 2 12 12"
                    style={{ cursor: 'pointer' }}>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                )
              }
            </div>
            <h2 className="p-0 m-0" style={{ cursor: 'default' }}>Drinks</h2>
          </div>
          
          <div className={display}>
            <div className="py-3">
              <div className="menupage-filter-category">
                <div 
                  className="menupage-filter-category-text" 
                  style={currentCategory === "" ? ({color: "#cf152d", fontWeight: "700"}) : ({})}
                  onClick={() => setCurrentCategory("")}
                > 
                  All Drinks
                </div>
              </div>
              {drinks.map((item: string, i: number) => (
                <div className="menupage-filter-category pt-3" key={i}>
                  <div 
                    className="menupage-filter-category-text active" 
                    style={currentCategory === item ? ({color: "#cf152d", fontWeight: "700"}) : ({})}
                    onClick={() => setCurrentCategory(item)}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default MenuSidebar;
