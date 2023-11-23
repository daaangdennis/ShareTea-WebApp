import { Order, OrderItem, PendingOrders, PendingOrderGridProp, PendingOrderCardProp } from "../types/types";
import "../styles/PendingPage.css";


function PendingOrderCard({ order, onCardClick}: PendingOrderCardProp) {
    //console.log(order);
    const handleCardClick = () => {
        onCardClick(order);
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


function PendingOrderGrid({ pending = [] , onCardClick} : PendingOrderGridProp) {
    return (
        <div>
            {pending.map((order: Order) => (
                <PendingOrderCard order={order} onCardClick={onCardClick}/>
            ))}
        </div>
    );
};

export default PendingOrderGrid;