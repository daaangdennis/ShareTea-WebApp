import { Order, OrderItem, PendingOrders, PendingOrderGridProp, PendingOrderCardProp } from "../types/types";
import "../styles/PendingPage.css";


function PendingOrderCard({ order, onCardClick }: PendingOrderCardProp) {
    //console.log(order);
    return (
        <div className="pendingpage-product-card flex-column flex-md-row" onClick={() => onCardClick(order.items)}>
            <div className="pendingpage-product-card-left">
                <b>Order #{order.order_id}:</b> {order.first_name} {order.last_name}
            </div>
            <div className="pendingpage-product-card-right">
                Total: ${(order.total * 1.0825).toFixed(2)}
            </div>
        </div>
    );
}


function PendingOrderGrid({ orders = [] , onCardClick} : PendingOrderGridProp) {
    return (
        <div>
            {orders.map((order: Order) => (
                <PendingOrderCard order={order} onCardClick={onCardClick}/>
            ))}
        </div>
    );
};

export default PendingOrderGrid;