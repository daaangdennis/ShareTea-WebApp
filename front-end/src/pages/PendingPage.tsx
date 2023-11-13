import PendingOrderGrid from "../components/PendingOrderGrid";
import { useEffect, useState } from "react";
import { getPendingOrders } from "../apis/Order";
import { OrderItem, PendingOrders } from "../types/types";

import "../styles/PendingPage.css";

function PendingPage() {

    const [pendingOrder, setPendingOrder] = useState<PendingOrders>(
        {} as PendingOrders
    );

    useEffect(() => {
        getPendingOrders(setPendingOrder);
    }, []);

    //console.log(pendingOrder.orders);

    return (
        <div className="d-flex flex-column flex-column-reverse flex-md-row">
            <div className="col-md-8 pendingpage-orders-grid-container">
                <PendingOrderGrid orders={pendingOrder.orders}/>
            </div>   
            <div className="col-md-4 pendingpage-orders-information-container">
                test
            </div> 
        </div> 
    );
};

export default PendingPage;