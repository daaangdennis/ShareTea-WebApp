import "../styles/PendingPage.css";


function PendingOrderCard() {
    return (
        <div className="pendingpage-product-card flex-column flex-md-row" onClick={() => console.log("hi")}>
            <div className="pendingpage-product-card-left">
                Order #1: Customer Name
            </div>
            <div className="pendingpage-product-card-right">
                Total: $24.00
            </div>
        </div>
    );
}


function PendingOrderGrid() {
    return (
        <div>
            <PendingOrderCard></PendingOrderCard>
            <PendingOrderCard></PendingOrderCard>
            <PendingOrderCard></PendingOrderCard>
        </div>
    );
};

export default PendingOrderGrid;