import { Order, PendingOrderGridProp, PendingOrderCardProp } from "../types/types";
import "../styles/PendingPage.css";


function PendingOrderCard({ order, onCardClick, selectedOrder}: PendingOrderCardProp) {
    //console.log(order);
    const isoTimestamp = order.order_date;
    const date = new Date(isoTimestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const regularTime = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    const handleCardClick = () => {
        onCardClick(order);
    };

    return (
        <div className={selectedOrder == order ? ("pendingpage-product-card-selected flex-column flex-md-row") : ("pendingpage-product-card flex-column flex-md-row")} onClick={handleCardClick}>
            <div className="pendingpage-product-card-left">
                <b>Order #{order.order_id}:</b> {order.first_name} {order.last_name} {`(${regularTime})`}
            </div>
            <div className="pendingpage-product-card-right">
                Total: ${(order.total * 1.0825).toFixed(2)}
            </div>
        </div>
    );
}


function PendingOrderGrid({ pending = [] , onCardClick, selectedOrder} : PendingOrderGridProp) {
    return (
        <div>
            {pending.map((order: Order) => (
                <PendingOrderCard order={order} onCardClick={onCardClick} selectedOrder={selectedOrder}/>
            ))}
        </div>
    );
};

export default PendingOrderGrid;