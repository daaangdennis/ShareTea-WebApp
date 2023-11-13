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
    const [maxOrdersPerPage, setMaxOrders] = useState<number>(10);


    useEffect(() => {
        getPendingOrders(setPendingOrder);
    }, []);
    console.log(pendingOrder);

    const handlePrevButton = () => {
        if (pageNumber != 0) {
            setPageNumber(pageNumber - 1);
        }
    };
    const handleNextButton = () => {
        if (pageNumber != Math.floor((pendingOrder.orders.length)/maxOrdersPerPage)) {
            setPageNumber(pageNumber + 1);
        }
    };

    return (
        <div className="d-flex flex-column flex-column-reverse flex-md-row">
            <div className="col-md-8 pendingpage-orders-grid-container">
                <PendingOrderGrid orders={pendingOrder.orders ? (pendingOrder.orders.slice(0 + pageNumber * maxOrdersPerPage, maxOrdersPerPage + pageNumber * maxOrdersPerPage)) : ([])}/>
                <button onClick={handlePrevButton}>prev</button>
                {pageNumber}
                <button onClick={handleNextButton}>next</button>
            </div>   
            <div className="col-md-4 pendingpage-orders-information-container">
                test
            </div> 
        </div> 
    );
};

export default PendingPage;