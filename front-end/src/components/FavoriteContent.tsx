import { useEffect, useState } from "react";
import "../styles/LandingPage.css";
import ProductGrid from "./ProductGrid";
import { listProductToppings } from "../types/types";
import { useAuth0 } from "@auth0/auth0-react";

const FavoriteContent = () => {
  const [favoriteContent, setFavoriteContent] = useState<listProductToppings>(
    {} as listProductToppings
  );
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    //TODO Favorite API
  }, []);

  return isAuthenticated ? (
    <div>
      <div>
        <h1 className="landingpage-text my-md-4 my-5">Favorite Products</h1>
        <ProductGrid products={favoriteContent.products} />
      </div>
    </div>
  ) : (
    <>Not Authenticated</>
  );
};

export default FavoriteContent;