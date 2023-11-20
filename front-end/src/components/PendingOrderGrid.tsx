import { Order, OrderItem, PendingOrders, PendingOrderGridProp, PendingOrderCardProp } from "../types/types";
import "../styles/PendingPage.css";


function PendingOrderCard({ order, onCardClick, setOrderTotal }: PendingOrderCardProp) {
    //console.log(order);
    const handleCardClick = () => {
        onCardClick(order.items);
        setOrderTotal(order.total);
    };

    return (
        <div className="pendingpage-product-card flex-column flex-md-row" onClick={handleCardClick}>
            <div className="pendingpage-product-card-left">
                <b>Order #{order.order_id}:</b> {order.first_name} {order.last_name}
            </div>
            <div className="pendingpage-product-card-right">
                Total: ${(order.total * 1.0825).toFixed(2)}
            </div>
        </div>
    );
}


function PendingOrderGrid({ orders = [] , onCardClick, setOrderTotal} : PendingOrderGridProp) {
    return (
        <div>
            {orders.map((order: Order) => (
                <PendingOrderCard order={order} onCardClick={onCardClick} setOrderTotal={setOrderTotal}/>
            ))}
        </div>
    );
};

export default PendingOrderGrid;