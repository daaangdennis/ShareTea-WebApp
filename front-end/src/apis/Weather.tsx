import { useEffect } from "react";
import axios from "axios";
import { listProductToppings } from "../types/types";

export function WeatherProducts(
  setProducts: React.Dispatch<React.SetStateAction<listProductToppings>>,
  setTemperature: React.Dispatch<React.SetStateAction<any[]>>
): Promise<void> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude).then(resolve).catch(reject);
      },
      (error) => {
        console.error("Error getting coordinates:", error.message);
        reject(error);
      }
    );

    const getWeather = async (latitude: number, longitude: number) => {
      const apiKey = "19725dc65f1ad80fa406d3e061244492";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        console.log(data.name, data.main.temp);
        setTemperature([data.name, data.main.temp]);
        await setWeatherProducts(data.main.temp);
        resolve();
      } catch (error) {
        console.error("Error getting weather data:", error);
        reject(error);
      }
    };

    const setWeatherProducts = async (temperature: number) => {
      const apiUrl =
        process.env.REACT_APP_BACKEND_URL +
        "/product/get/weather?temperature=" +
        temperature;
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error setting weather products:", error);
        reject(error);
      }
    };
  });
}

export default WeatherProducts;
