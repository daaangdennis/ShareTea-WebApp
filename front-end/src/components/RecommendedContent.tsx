import { useEffect, useState } from "react";
import "../styles/LandingPage.css";
import ProductGrid from "./ProductGrid";
import { getBestSelling } from "../apis/BestSelling";
import { listProductToppings } from "../types/types";
import WeatherProducts from "../apis/Weather";


const RecommendedContent = () => {
  const [bestSelling, setBestSelling] = useState<listProductToppings>(
    {} as listProductToppings
  );

  const [weatherProducts, setWeatherProducts] = useState<listProductToppings>(
    {} as listProductToppings
  );

  const[temperature, setTemperature] = useState(["",0])

  useEffect(() => {
    getBestSelling(setBestSelling, (e: any) => {});
    //TODO weather API
    WeatherProducts(setWeatherProducts, setTemperature)
    
  }, []);
  

  return (
    <div>
      <div>
        <h1 className="landingpage-text my-md-4 my-5">Trending Products</h1>
        <ProductGrid products={bestSelling.products} />
      </div>
      <div>
        <h1 className="landingpage-text my-md-4 my-5">
          Based on Today’s Weather 
        </h1>
        {
            temperature[0] === "" ? <></> : <h1> {temperature[0]} {temperature[1]}°C </h1>
        } 
        <ProductGrid products={weatherProducts.products} />
      </div>
    </div>
  );
};

export default RecommendedContent;
