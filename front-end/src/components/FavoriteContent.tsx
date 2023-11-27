import { useEffect, useState } from "react";
import "../styles/LandingPage.css";
import ProductGrid from "./ProductGrid";
import { Cart, listProductToppings } from "../types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { addFavoriteProduct, getFavoriteProducts } from "../apis/BestSelling";
import FavoriteGrid from "./FavoriteGrid";

const FavoriteContent = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<listProductToppings>(
    {} as listProductToppings
  );

  const [favoriteItems, setFavoriteItems] = useState<Cart>();
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();





  return isAuthenticated ? (
    <div>
      <div>
        <h1 className="landingpage-text my-md-4 my-5">Favorite Products</h1>
        <FavoriteGrid/>
      </div>
    </div>
  ) : (
    <>Not Authenticated</>
  );
};

export default FavoriteContent;
