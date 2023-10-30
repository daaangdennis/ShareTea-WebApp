import { useRecoilValue } from "recoil";
import { product } from "../types/types";
import { filteredProducts } from "../atoms/product";
import ProductGrid from "./ProductGrid";

function MenuContent() {
  const products = useRecoilValue<product[]>(filteredProducts);

  return <ProductGrid products={products} />;
}

export default MenuContent;
