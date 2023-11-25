import "../styles/StatsPage.css";
import { useRecoilValue } from "recoil";
import { restockInventory } from "../atoms/statsItems";
import React, { PureComponent, useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import { useGetRestockReport } from "../apis/RestockReport";
import ProductUsage from "../components/ProductUsage";
import RestockInventory from "../components/RestockInventory";
import ExcessItemsTable from "../components/ExcessItemsTable";
import PopularPairsTable from "../components/PopularPairsTable";
import RestockReportTable from "../components/RestockReportTable";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ProductUsageTable from "../components/ProductUsageTable";
import ExcessItemsGraph from "../components/ExcessItemsGraph";

function StatsPage() {
  const [showProductUsage, setShowProductUsage] = useState(false);
  const [showRestockUsage, setShowRestockUsage] = useState(false);
  const [showExcessUsage, setShowExcessUsage] = useState(false);
  const [showPopularPairs, setShowPopularPairs] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleProductUsageButton = () => {
    setShowProductUsage((prevValue) => !prevValue);
    setShowPopularPairs(false);
    setShowRestockUsage(false);
    setShowExcessUsage(false);
  };

  const handleRestockButton = () => {
    setShowRestockUsage((prevValue) => !prevValue);
    setShowPopularPairs(false);
    setShowProductUsage(false);
    setShowExcessUsage(false);
  };

  const handleExcessButton = () => {
    setShowExcessUsage((prevValue) => !prevValue);
    setShowPopularPairs(false);
    setShowProductUsage(false);
    setShowRestockUsage(false);
  };

  const handlePopularPairsButton = () => {
    setShowPopularPairs((prevValue) => !prevValue);
    setShowExcessUsage(false);
    setShowProductUsage(false);
    setShowRestockUsage(false);
  };

  return (
    <div className="StatsContainer">
      <DatePicker
        className="startDate"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
      />
      <DatePicker
        className="endDate"
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        dateFormat="yyyy-MM-dd"
      />
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
        <button onClick={handlePopularPairsButton} className="btn StatsButton">
          Popular Pairs
        </button>
      </div>
      <div className="GenerateButton">
        <button className="btn StatsButton">Generate Report</button>
      </div>

      <div className="DateSelecter">
        {/* Here is where the date selecters should go to */}
        {/* The date selectors I can choose from are react ones vs MUI */}
      </div>

      <div className="GraphContainer">
        {showProductUsage && (
          <ProductUsage startDate={startDate} endDate={endDate} />
        )}
        {showExcessUsage && <ExcessItemsGraph />}
        {showRestockUsage && <RestockInventory />}
      </div>
      <div className="TableContainer">
        {showProductUsage && <ProductUsageTable />}
        {showRestockUsage && <RestockReportTable />}
        {showExcessUsage && (
          <ExcessItemsTable startDate={startDate} endDate={endDate} />
        )}
        {showPopularPairs && (
          <PopularPairsTable startDate={startDate} endDate={endDate} />
        )}
      </div>
    </div>
  );
}
export default StatsPage;
