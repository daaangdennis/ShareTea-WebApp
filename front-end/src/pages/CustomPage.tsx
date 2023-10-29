import { useLocation } from "react-router-dom";
import { product } from "../types/types";

function CustomPage() {
  const location = useLocation();
  const product: product = location.state && location.state.data;

  const iceLevel = [
    "0% Ice",
    "10% Ice",
    "30% Ice",
    "50% Ice",
    "100% Ice" 
  ]
  return (
    <>
      <img src={product.url} />
      <div className="d-flex" style={{ flexDirection: "column", gap: 15 }}>
        {product.isIce && (
          <div>
            <h2>Ice Level</h2>
            {}
          </div>
        )}
        {product.toppings && (
          <div>
            <h2>Toppings</h2>
            {product.toppings.map(
              (topping: { topping: string; price: number }) => (
                <div>
                  <div>{topping.topping}</div>
                  <div>{topping.price}</div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CustomPage;
