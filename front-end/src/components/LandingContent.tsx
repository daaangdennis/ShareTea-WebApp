import { useRecoilValue } from "recoil";
import { listProductToppings, product } from "../types/types";
import { filteredProducts } from "../atoms/product";
import ProductGrid from "./ProductGrid";

function LandingContent() {
  const products = useRecoilValue<listProductToppings>(filteredProducts);

  return <ProductGrid products={products.products} />;
}

export default LandingContent;
