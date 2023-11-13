import { OrderItem, PendingOrders, PendingOrderGridProp, PendingOrderCardProp } from "../types/types";
import "../styles/PendingPage.css";


function PendingOrderCard({ order }: PendingOrderCardProp) {
    //console.log(order);
    return (
        <div className="pendingpage-product-card flex-column flex-md-row" onClick={() => console.log(order.items)}>
            <div className="pendingpage-product-card-left">
                <b>Order #{order.order_id}:</b> {order.first_name} {order.last_name}
            </div>
            <div className="pendingpage-product-card-right">
                Total: $24.00
            </div>
        </div>
    );
}


function PendingOrderGrid({ orders = [] }: PendingOrderGridProp) {
    return (
        <div>
            {orders.map((order: OrderItem) => (
                <PendingOrderCard order={order}/>
            ))}
        </div>
    );
};

export default PendingOrderGrid;