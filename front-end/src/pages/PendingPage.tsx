import PendingOrderGrid from "../components/PendingOrderGrid";
import "../styles/PendingPage.css";

function PendingPage() {
    return (
        <div className="d-flex flex-column flex-column-reverse flex-md-row">
            <div className="col-md-8 pendingpage-orders-grid-container">
                <PendingOrderGrid></PendingOrderGrid>
            </div>   
            <div className="col-md-4 pendingpage-orders-information-container">
                test
            </div> 
        </div> 
    );
};

export default PendingPage;