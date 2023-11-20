import PendingOrderGrid from "../components/PendingOrderGrid";
import { useEffect, useState } from "react";
import { getPendingOrders } from "../apis/Order";
import { OrderItem, PendingOrders } from "../types/types";

import "../styles/PendingPage.css";

function PendingPage() {
    const [pendingOrder, setPendingOrder] = useState<PendingOrders>(
        {} as PendingOrders
    );
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [maxOrdersPerPage, setMaxOrders] = useState<number>(5);
    const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
    const [selectedOrderTotal, setselectedOrderTotal] = useState<number>(0);
    

    useEffect(() => {
        getPendingOrders(setPendingOrder);
    }, []);
    //console.log(pendingOrder);
    console.log(selectedItems.length > 0);

    const handlePrevButton = () => {
        if (pendingOrder.orders && pageNumber != 0) {
            setPageNumber(pageNumber - 1);
        }
    };
    const handleNextButton = () => {
        if (pendingOrder.orders && pageNumber != Math.floor((pendingOrder.orders.length)/maxOrdersPerPage)) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handleCardClick = (items: OrderItem[]) => {
        setSelectedItems(items);
    };

    const handleOrderTotal = (total: number) => {
        setselectedOrderTotal(total);
    }

    const handleCompleteOrder = () => {
        if (selectedItems.length > 0) {
            //complete order
        }
    }

    return (
        <div className="d-flex flex-column flex-column-reverse flex-md-row">
            <div className="col-md-8 pendingpage-orders-grid-container">
                <button onClick={handlePrevButton}>prev</button>
                {pageNumber + 1} of {pendingOrder.orders ? (Math.floor((pendingOrder.orders.length)/maxOrdersPerPage) + 1) : (1)}
                <button onClick={handleNextButton}>next</button>
                <PendingOrderGrid 
                    orders={pendingOrder.orders ? (pendingOrder.orders.slice(0 + pageNumber * maxOrdersPerPage, maxOrdersPerPage + pageNumber * maxOrdersPerPage)) : ([])} 
                    onCardClick={handleCardClick}
                    setOrderTotal={handleOrderTotal}
                />
            </div>   
            <div className="col-md-4 pendingpage-orders-information-container">
                {selectedItems.map((item: OrderItem) => (
                    <div className="mb-4">
                        {item.product} {item.price} {item.ice_level} {item.sugar_level}
                        <br></br>
                        {item.toppings.join(', ')}
                    </div>
                ))}
                Total: {(selectedOrderTotal * 1.0825).toFixed(2)}
                <div>
                    <button>Complete Order</button>
                </div>
            </div> 
        </div> 
    );
};

export default PendingPage;