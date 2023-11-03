import { useRecoilValue, useRecoilState } from "recoil";
import { Cart, product } from "../types/types";
import { cart } from "../atoms/cart";
import CartItemsGrid from "../components/CartItemsGrid";

import "../styles/CartPage.css";
import { postOrder } from "../apis/Order";
import { useAuth0 } from "@auth0/auth0-react";

function CartPage() {
  const [cartItems, setcartItems] = useRecoilState<Cart>(cart);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();

  const clearCart = () => {
    setcartItems({
      items: [],
      total: 0,
    });
  };

  const handlePlaceOrder = async () => {
    if(!isAuthenticated){
      loginWithRedirect();
    }
    else{
      try {
        const accessToken = await getAccessTokenSilently();
        postOrder(cartItems, accessToken);  
        clearCart();
      } catch (error) {
        console.error("Error getting access token: ", error);
      }
    }
  };


  console.log(cartItems);

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
                ${cartItems.total.toFixed(2)}
                <br></br>
                ${(cartItems.total * 0.0625).toFixed(2)}
              </div>
            </div>
            <div className="total-information">
              <div className="col-md-6">Total:</div>
              <div className="col-md-6">
                $
                {(
                  parseFloat((cartItems.total * 0.0625).toFixed(2)) +
                  parseFloat(cartItems.total.toFixed(2))
                ).toFixed(2)}
              </div>
            </div>
            <div className="button-container">
              {isAuthenticated ? 
                (<button className="order-button" onClick={handlePlaceOrder}>Place Order</button>) 
                : 
                (<button className="order-button" onClick={handlePlaceOrder}>Log In To Place Order</button>)
              }
              <button className="order-button" onClick={clearCart}>
                Cancel Order
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8 mt-3 mt-md-0">
          <CartItemsGrid products={[]} />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
