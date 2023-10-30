import { useLocation } from "react-router-dom";
import { product } from "../types/types";

function CustomPage() {
  const location = useLocation();
  const product: product = location.state && location.state.data;

  const iceLevel = ["0% Ice", "10% Ice", "30% Ice", "50% Ice", "100% Ice"];
  const toppings = {
    items: ["item1", "item2", "item3"],
    price: 0.75,
  };
  return (
    <>
      <div style={{ display: "flex", gap: 20 }}>
        <img src={product.url} />
        <div>
          <h1>{product.name}</h1>
          <h3>{product.price} $</h3>
        </div>
      </div>
      <div
        className="d-flex"
        style={{ marginTop: 20, width: "50%", margin: "auto", gap: 30 }}
      >
        {iceLevel && (
          <div>
            <h2>Ice Level</h2>
            {iceLevel.map((level: string) => (
              <div>
                <div>{level}</div>
              </div>
            ))}
          </div>
        )}
        {toppings && (
          <div>
            <h2>Toppings {toppings.price} $</h2>
            {toppings.items.map((topping: string) => (
              <div>{topping}</div>
            ))}
          </div>
        )}
      </div>
      <hr />
      <button className="btn btn-dark">add to cart</button>
    </>
  );
}

export default CustomPage;
