import { useRecoilValue } from "recoil";
import { Cart } from "../types/types";
import { cart } from "../atoms/cart";
import CartTable from "../components/CartTable";

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
    <body className="d-flex align-items-center py-4 bg-body-tertiary">
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <CartTable columns={columns} items={cartItems} />
        </div>
      </div>
    </body>
  );
}

export default CartPage;
