import PendingOrderGrid from "../components/PendingOrderGrid";
import { useEffect, useState } from "react";
import { getPendingOrders } from "../apis/Order";
import { OrderItem, PendingOrders, Order } from "../types/types";

import "../styles/PendingPage.css";

function PendingPage() {
    const [pendingOrder, setPendingOrder] = useState<PendingOrders>(
        {} as PendingOrders
    );
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [maxOrdersPerPage, setMaxOrders] = useState<number>(5);
    const [selectedOrder, setSelectedOrder] = useState<Order>();
    const tableColumns = [
        "Product Name",
        "Ice Level",
        "Sugar Level",
        "Toppings",
        "Price"
    ];

    useEffect(() => {
        getPendingOrders(setPendingOrder);
    }, []);
    //console.log(pendingOrder);
    //console.log(selectedItems.length > 0);

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

    const handleOrderSelect = (order: Order) => {
        setSelectedOrder(order);
    };

    const handleCompleteOrder = () => {
        if (selectedOrder && selectedOrder.items.length > 0) {
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
                    onCardClick={handleOrderSelect}
                />
            </div>   
            <div className="col-md-4 pendingpage-orders-information-container">
                {selectedOrder ? 
                    (
                        <h3>
                            Order {selectedOrder.order_id}
                            <br></br>
                            Customer Name: {selectedOrder.first_name} {selectedOrder.last_name}
                        </h3>
                    )
                    :
                    (
                        <h3>
                            No Order Selected
                        </h3>
                    )
                }

                <table className="table" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            {tableColumns.map((name: string, i: number) => {
                                return (
                                    <th key={i} scope="col" style={{ width: `${100 / tableColumns.length}%` }}>
                                        {name}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {selectedOrder?.items.map((item: OrderItem, i: number) => (
                            <tr key={i}>
                                <td style={{ width: `${100 / tableColumns.length}%` }}>{item.product ? (item.product) : ("None")}</td>
                                <td style={{ width: `${100 / tableColumns.length}%` }}>{item.ice_level ? (item.ice_level) : ("No Ice")}</td>
                                <td style={{ width: `${100 / tableColumns.length}%` }}>{item.sugar_level ? (item.sugar_level) : ("No Sugar")}</td>
                                <td style={{ width: `${100 / tableColumns.length}%` }}>{item.toppings.length > 0 ? (item.toppings.join(', ')) : ("No Toppings")}</td>
                                <td style={{ width: `${100 / tableColumns.length}%` }}>${(item.price + item.toppings.length * 0.75).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                Subtotal: ${selectedOrder ? (selectedOrder.total).toFixed(2) : ((0).toFixed(2))}
                <br></br>
                Tax: ${selectedOrder ? (selectedOrder.total * .0825).toFixed(2) : ((0).toFixed(2))}
                <br></br>
                Total: ${selectedOrder ? (selectedOrder.total * 1.0825).toFixed(2) : ((0).toFixed(2))}
                <div>
                    <button>Complete Order</button>
                </div>
            </div> 
        </div> 
    );
};

export default PendingPage;