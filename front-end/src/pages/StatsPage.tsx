import "../styles/StatsPage.css";
import { useRecoilValue } from "recoil";
import { restockInventory } from "../atoms/statsItems";
import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { useGetRestockReport } from "../apis/RestockReport";
import ProductUsage from "../components/ProductUsage";
import RestockInventory from "../components/RestockInventory";
import ExcessItemsTable from "../components/ExcessItemsTable";

function StatsPage() {
  const [showProductUsage, setShowProductUsage] = useState(false);
  const [showRestockUsage, setShowRestockUsage] = useState(false);
  const [showExcessUsage, setShowExcessUsage] = useState(false);

  const handleProductUsageButton = () => {
    setShowProductUsage((prevValue) => !prevValue);
    setShowRestockUsage(false);
    setShowExcessUsage(false);
  };

  const handleRestockButton = () => {
    setShowRestockUsage((prevValue) => !prevValue);
    setShowProductUsage(false);
    setShowExcessUsage(false);
  };

  const handleExcessButton = () => {
    setShowExcessUsage((prevValue) => !prevValue);
    setShowProductUsage(false);
    setShowRestockUsage(false);
  };

  return (
    <div className="StatsContainer">
      <div className="StatsButtonContainer">
        <button className="btn StatsButton">Sales Report</button>
        <button onClick={handleProductUsageButton} className="btn StatsButton">
          Product Usage
        </button>
        <button onClick={handleRestockButton} className="btn StatsButton">
          Restock Report
        </button>
        <button onClick={handleExcessButton} className="btn StatsButton">
          Excess Report
        </button>
        <button className="btn StatsButton">Popular Pairs</button>
      </div>
      <div className="GenerateButton">
        <button className="btn StatsButton">Generate Report</button>
      </div>

      <div className="DateSelecter">
        {/* Here is where the date selecters should go to */}
        {/* The date selectors I can choose from are react ones vs MUI */}
      </div>

      <div className="GraphContainer">
        {showProductUsage && <ProductUsage />}
        {showRestockUsage && <RestockInventory />}
        {showExcessUsage && <ExcessItemsTable />}
      </div>
    </div>
  );
}
export default StatsPage;
