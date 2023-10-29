import { useRecoilValue } from "recoil";
import { Cart, product } from "../types/types";
import { cart } from "../atoms/cart";
import CartTable from "../components/CartTable";
import "../styles/CartPage.css";

function CartPage() {
  const cartItems = useRecoilValue<Cart>(cart);
  const columns: string[] = [
    "#",
    "product ID",
    "Product Name",
    "Product category",
    "Price",
    "Total",
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 summary-column">
          <div className="summary-item-container p-2 py-4">
            <div className="review-order-header">
              Review Order ({cartItems.items.length})
            </div>
            <div className="subtotal-information">
              <div className="col-md-6">
                Subtotal:
                <br></br>
                Tax:
              </div>
              <div className="col-md-6">
                ${(cartItems.total).toFixed(2)}
                <br></br>
                ${(cartItems.total *0.0625).toFixed(2)} 
              </div>
            </div>
            <div className="total-information">
              <div className="col-md-6">
                Total:
              </div>
              <div className="col-md-6">
              ${(parseFloat((cartItems.total *0.0625).toFixed(2)) + parseFloat((cartItems.total).toFixed(2))).toFixed(2)} 
              </div>
            </div>
            <div className="button-container">
              <button className="order-button">Place Order</button>
              <button className="order-button">Cancel Order</button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {/* <CartTable columns={columns} items={cartItems} /> */}
          {cartItems.items.map(
          (
            item: {
              product: product;
              toppings?: any;
              notes?: string;
            },
            i: number
          ) => (
            <div className="drink-order-container">
              Product Name: {item.product.name}
              <br></br>
              Product Category: {item.product.category}
              <br></br>
              Price: {item.product.price}
              <br></br>
            </div>
          )
        )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
