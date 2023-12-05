import { useEffect, useState } from "react";
import "../styles/LandingPage.css";
import ProductGrid from "./ProductGrid";
import { getBestSelling } from "../apis/BestSelling";
import { listProductToppings } from "../types/types";
import WeatherProducts from "../apis/Weather";
import LoadingSpinner from "./LoadingSpinner";

const RecommendedContent = () => {
  const [bestSelling, setBestSelling] = useState<listProductToppings>(
    {} as listProductToppings
  );

  const [weatherProducts, setWeatherProducts] = useState<listProductToppings>(
    {} as listProductToppings
  );

  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(true);

  const [temperature, setTemperature] = useState(["", 0]);

  useEffect(() => {
    getBestSelling(setBestSelling, (e: any) => {});
    setIsLoadingWeather(true);
    WeatherProducts(setWeatherProducts, setTemperature).finally(() => {
      setIsLoadingWeather(false);
    });
  }, []);

  return (
    <div>
      <div>
        <h1 className="landingpage-text mt-5">Trending Products</h1>
        <ProductGrid products={bestSelling.products} />
      </div>
      <div>
        <h1 className="landingpage-text mt-2">Based on Today’s Weather</h1>
        <>
          {isLoadingWeather ? (
            <LoadingSpinner
              className="justify-content-center mt-5"
              style={{ gap: 10 }}
            />
          ) : (
            <div className="d-flex flex-column text-center">
              <h2
                className="mt-5 ms-5"
                style={{
                  position: "relative",
                  fontWeight: 700,
                }}
              >
                {temperature[0]} {temperature[1]}°C{" "}
                {Number(temperature[1]) > 25 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-thermometer-high"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415" />
                    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                  </svg>
                ) : Number(temperature[1]) <= 25 &&
                  Number(temperature[1]) >= 20 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-thermometer-half"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className="bi bi-thermometer-low"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415" />
                    <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                  </svg>
                )}
              </h2>
              <ProductGrid products={weatherProducts.products} />
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default RecommendedContent;
