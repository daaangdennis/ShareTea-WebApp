import { useEffect, useState } from "react";
import "../styles/LandingPage.css";
import ProductGrid from "./ProductGrid";
import { listProductToppings } from "../types/types";
import { useAuth0 } from "@auth0/auth0-react";

const PreviousContent = () => {
  const [previousProducts, setPreviousProducts] = useState<listProductToppings>(
    {} as listProductToppings
  );
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    //TODO previous API
  }, []);

  return isAuthenticated ? (
    <div>
      <div>
        <h1 className="landingpage-text my-md-4 my-5">Previous Products</h1>
        <ProductGrid products={previousProducts.products} />
      </div>
    </div>
  ) : (
    <>Not Authenticated</>
  );
};

export default PreviousContent;
