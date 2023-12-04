import PendingOrderGrid from "../components/PendingOrderGrid";
import { useEffect, useState } from "react";
import { getOrderHistory, removeOrder } from "../apis/Order";
import { OrderItem, CompletedOrders, Order } from "../types/types";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "./LoadingSpinner";

import "../styles/PendingPage.css";

function OrderHistory() {
    const [completedOrders, setCompletedOrders] = useState<CompletedOrders>(
        {} as CompletedOrders
    );
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [maxOrdersPerPage, setMaxOrders] = useState<number>(10);
    const [selectedOrder, setSelectedOrder] = useState<Order>();
    const [orderTime, setOrderTime] = useState<String>("");
    const { userRole, isLoading } = useUserRole();
    const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(true);

    const tableColumns = [
        "Product Name",
        "Ice Level",
        "Sugar Level",
        "Toppings",
        "Price"
    ];
    
    useEffect(() => {
        setIsLoadingOrders(true)
        getOrderHistory(setCompletedOrders).finally(() => {
            setIsLoadingOrders(false);
        });
    }, []);

    const handlePrevButton = () => {
        if (completedOrders.completed && pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };
    const handleNextButton = () => {
        if (completedOrders.completed && pageNumber < Math.ceil((completedOrders.completed.length)/maxOrdersPerPage)) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handleOrderSelect = (order: Order) => {
        setSelectedOrder(order);
        const isoTimestamp = order.order_date;
        const date = new Date(isoTimestamp);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const regularTime = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        setOrderTime(regularTime);
    };

    const handleRemoveOrder = async () => {
        if (selectedOrder) {
            await removeOrder(selectedOrder.order_id);
            const updatedOrders = completedOrders.completed.filter(order => order.order_id !== selectedOrder.order_id);
            setCompletedOrders({ completed: updatedOrders });
            setSelectedOrder(undefined);
        }
    }

    return (
        <div className="d-flex flex-column flex-column-reverse flex-md-row">
            <div className="col-md-8 pendingpage-orders-container">
                <div className="pendingpage-orders-header m-4">
                    <h2>Order History</h2>
                </div>
                <div className="pendingpage-controls-container">
                    <button 
                        className={pageNumber == 1 ? ("pendingpage-control-button-disabled") : ("pendingpage-control-button")} 
                        onClick={handlePrevButton}
                    >
                        Prev
                    </button>
                    <h5>{pageNumber} of {completedOrders.completed? (Math.ceil((completedOrders.completed.length)/maxOrdersPerPage)) : (1)}</h5>
                    <button 
                        className={completedOrders.completed && pageNumber >= Math.ceil((completedOrders.completed.length)/maxOrdersPerPage) ? ("pendingpage-control-button-disabled") : ("pendingpage-control-button")} 
                        onClick={handleNextButton}
                    >
                        Next
                    </button>
                </div>
                {isLoadingOrders ?
                (
                    <LoadingSpinner
                        className="justify-content-center mt-5"
                        style={{ gap: 10 }}
                    />
                )
                :
                (
                    <PendingOrderGrid 
                        pending={completedOrders.completed ? (completedOrders.completed.slice((pageNumber-1) * maxOrdersPerPage, maxOrdersPerPage + (pageNumber-1) * maxOrdersPerPage)) : ([])} 
                        onCardClick={handleOrderSelect}
                        selectedOrder={selectedOrder}
                    />
                )
                }
            </div>   
            {selectedOrder ? 
            (
                <div className="col-md-4 pendingpage-orders-information-container">
                    <div className="pendingpage-orders-information-header px-3 pb-3">
                        <h3>
                            Order #{selectedOrder.order_id}
                            <br></br>
                            Customer Name: {selectedOrder.first_name} {selectedOrder.last_name}
                            <br></br>
                            Status: {selectedOrder.status}
                            <br></br>
                            ({orderTime})
                        </h3>
                    </div>
                    {(userRole === "manager" || userRole === "admin") ?
                    (
                        <div className="px-3 py-2 mb-3">
                            <button className="pendingpage-complete-button" onClick={handleRemoveOrder}>Remove From History</button>
                        </div>
                    ) 
                    : 
                    (
                        <></>
                    )
                    }
                    <table className="pendingpage-table mb-5">
                        <thead className="pendingpage-table-header">
                            <tr>
                                {tableColumns.map((name: string, i: number) => {
                                    return (
                                        <th key={i} scope="col" className="pendingpage-table-column px-3 py-2" style={{ width: `${100 / tableColumns.length}%`}}>
                                            {name}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {selectedOrder?.items.map((item: OrderItem, i: number) => (
                                <tr key={i}>
                                    <td className="pendingpage-table-column px-3 py-2" style={{ width: `${100 / tableColumns.length}%` }}>{item.product ? (item.product) : ("None")}</td>
                                    <td className="pendingpage-table-column px-3 py-2" style={{ width: `${100 / tableColumns.length}%` }}>{item.ice_level ? (item.ice_level) : ("No Ice")}</td>
                                    <td className="pendingpage-table-column px-3 py-2" style={{ width: `${100 / tableColumns.length}%` }}>{item.sugar_level ? (item.sugar_level) : ("No Sugar")}</td>
                                    <td className="pendingpage-table-column px-3 py-2" style={{ width: `${100 / tableColumns.length}%` }}>{item.toppings.length > 0 ? (item.toppings.join(', ')) : ("No Toppings")}</td>
                                    <td className="pendingpage-table-column px-3 py-2" style={{ width: `${100 / tableColumns.length}%` }}>${(item.price + item.toppings.length * 0.75).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pendingpage-subtotal-information-container">
                        <div className="col-md-6 px-3 py-2">
                            <h5>Subtotal:</h5>
                            <h5>Tax:</h5>
                        </div>
                        <div className="col-md-6 px-3 py-2">
                            <h5>${(selectedOrder.total).toFixed(2)}</h5>
                            <h5>${(selectedOrder.total * .0825).toFixed(2)}</h5>
                        </div>
                    </div>
                    <div className="pendingpage-total-information-container">
                        <div className="col-md-6 px-3 py-2 mb-2">
                            <h5>Total:</h5>
                        </div>
                        <div className="col-md-6 px-3 py-2 mb-2">
                            <h5>${(selectedOrder.total * 1.0825).toFixed(2)}</h5>
                        </div>
                    </div>
                </div>
            )
            :
            (
                <div className="col-md-4 pendingpage-orders-information-container d-flex justify-content-center align-items-center py-4">
                    <h1 className="m-0">No Order Selected</h1>
                </div>
            )
            }
        </div> 
    );
};

export default OrderHistory;