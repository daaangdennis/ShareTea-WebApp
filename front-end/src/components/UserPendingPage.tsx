import PendingOrderGrid from "../components/PendingOrderGrid";
import { useEffect, useState } from "react";
import { getUserOrders, refundOrder } from "../apis/Order";
import { OrderItem, UserOrders, Order } from "../types/types";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./LoadingSpinner";

import "../styles/PendingPage.css";

function UserPendingPage() {
    const [userOrders, setUserOrders] = useState<UserOrders>(
        {} as UserOrders
    );
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [maxOrdersPerPage, setMaxOrders] = useState<number>(10);
    const [selectedOrder, setSelectedOrder] = useState<Order>();
    const { getAccessTokenSilently } = useAuth0();
    const [orderTime, setOrderTime] = useState<String>("");
    const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(true);

    const tableColumns = [
        "Product Name",
        "Ice Level",
        "Sugar Level",
        "Toppings",
        "Price"
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
            setIsLoadingOrders(true);
            const accessToken = await getAccessTokenSilently();
            await getUserOrders(setUserOrders, accessToken);
            setIsLoadingOrders(false);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handlePrevButton = () => {
        if (userOrders.pending && pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };
    const handleNextButton = () => {
        if (userOrders.pending && pageNumber < Math.ceil((userOrders.pending.length)/maxOrdersPerPage)) {
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

    const handleRefundOrder = async () => {
        if (selectedOrder) {
            await refundOrder(selectedOrder.order_id);
            const updatedOrders = userOrders.pending.filter(order => order.order_id !== selectedOrder.order_id);
            setUserOrders({ pending: updatedOrders, completed: userOrders.completed});
            setSelectedOrder(undefined);
        }
    }

    return (
        <div className="d-flex flex-column flex-column-reverse flex-md-row">
            <div className="col-md-8 pendingpage-orders-container">
                <div className="pendingpage-orders-header m-4">
                    <h2>Pending Orders ({userOrders.pending ? (userOrders.pending.length) : (0)})</h2>
                </div>
                <div className="pendingpage-controls-container">
                    <button 
                        className={pageNumber == 1 ? ("pendingpage-control-button-disabled") : ("pendingpage-control-button")} 
                        onClick={handlePrevButton}
                    >
                        Prev
                    </button>
                    <h5>{pageNumber} of {userOrders.pending  && userOrders.pending.length > 0 ? (Math.ceil((userOrders.pending.length)/maxOrdersPerPage)) : (1)}</h5>
                    <button 
                        className={userOrders.pending && pageNumber >= Math.ceil((userOrders.pending.length)/maxOrdersPerPage) ? ("pendingpage-control-button-disabled") : ("pendingpage-control-button")} 
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
                        pending={userOrders.pending ? (userOrders.pending.slice((pageNumber-1) * maxOrdersPerPage, maxOrdersPerPage + (pageNumber-1) * maxOrdersPerPage)) : ([])} 
                        onCardClick={handleOrderSelect}
                        selectedOrder={selectedOrder}
                    />
                )
                }
            </div>   
            {selectedOrder ? 
            (
                <div className="col-md-4 pendingpage-orders-information-container">
                    <div className="pendingpage-orders-information-header px-3 pb-2">
                        <h3>
                            Order #{selectedOrder.order_id}
                            <br></br>
                            ({orderTime})
                        </h3>
                    </div>
                    <div className="px-3 py-2 mb-3">
                        <button className="pendingpage-complete-button" onClick={handleRefundOrder}>Cancel Order</button>
                    </div>
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

export default UserPendingPage;