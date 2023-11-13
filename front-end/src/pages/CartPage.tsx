import { useState } from "react";
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
  const [orderComplete, setOrderComplete] = useState<boolean>(false)

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
        setOrderComplete(true); 
        clearCart();
        setTimeout(() => {
          setOrderComplete(false);
        }, 3000);
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
                ${(cartItems.total * 0.0825).toFixed(2)}
              </div>
            </div>
            <div className="total-information">
              <div className="col-md-6">Total:</div>
              <div className="col-md-6">
                $
                {(
                  parseFloat((cartItems.total * 0.0825).toFixed(2)) +
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
          {orderComplete ? 
            (
              <div className="cartpage-order-complete mt-lg-0 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#15bd12" className="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                </svg>
                <h1>Order Successfully Placed</h1>
              </div>
            )
            : 
            (<CartItemsGrid products={[]} />)
          }
        </div>
      </div>
    </div>
  );
}

export default CartPage;
