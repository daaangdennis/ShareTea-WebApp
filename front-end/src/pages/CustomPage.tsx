import { useLocation } from "react-router-dom";
import { Cart, ToppingsGridProps, product } from "../types/types";
import { useRecoilState } from "recoil";
import { cart } from "../atoms/cart";
var _ = require("lodash");

function CustomPage() {
  const location = useLocation();
  const product: product = location.state && location.state.data;

  const [cartItems, setcartItems] = useRecoilState<Cart>(cart);

  const addProductToCart = () => {
    const newlist: Cart = _.cloneDeep(cartItems);
    newlist.items.push({
      product: product,
      toppings: "none",
      notes: "none",
    });
    newlist.total = newlist.total + product.price;
    setcartItems(newlist);
  };

  const iceLevel = ["No Ice", "Light Ice", "Regular Ice", "Extra Ice", "MAKE IT HOT"];
  const sugarLevel = ["No Sugar", "30% Sugar", "50% Sugar", "80% Sugar", "100% Sugar", "120% Sugar"];

  const toppings = {
    items: ["item1", "item2", "item3", "item4", "item5", "item6"],
    price: 0.75,
  };

  return (
    <>
      <div
        className="d-flex album py-5 bg-body-tertiary"
        style={{ gap: 20, margin: 20 }}
      >
        <img src={product.url} />
        <div>
          <h1>{product.name}</h1>
          <h3>{product.price} $</h3>
        </div>
      </div>
      <div
        className="d-flex justify-content-between"
        style={{ marginTop: 20, width: "50%", margin: "auto", gap: 30 }}
      >
        {iceLevel && (
          <div>
            <h2>Ice Level</h2>
            <select className="form-control form-control-lg">
              {iceLevel.map((level: string) => (
                <option>{level}</option>
              ))}
            </select>
          </div>
        )}
        {sugarLevel && (
          <div>
            <h2>Sugar Level</h2>
            <select className="form-control form-control-lg">
              {sugarLevel.map((level: string) => (
                <option>{level}</option>
              ))}
            </select>
          </div>
        )}
        {toppings && (
          <div>
            <h2>Toppings {toppings.price} $</h2>
            {/* <select className="form-control form-control-lg">
              {toppings.items.map((topping: string) => (
                <option>{topping}</option>
              ))}
            </select> */}
            <ToppingsGrid toppings={toppings} />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="exampleFormControlTextarea1">Note</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
        ></textarea>
      </div>
      <hr />
      <button onClick={addProductToCart} className="btn btn-dark">
        add to cart
      </button>
    </>
  );
}
const ToppingsGrid: React.FC<ToppingsGridProps> = ({ toppings }) => {
  return (
    <div className="form-check py-5 bg-body-tertiary">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {toppings.items.map((item: string, i: number) => (
          <div className="col">
            <input
              className="form-check-input"
              type="checkbox"
              id="blankCheckbox"
              value="option1"
              aria-label="..."
            />
            <>{item}</>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPage;
