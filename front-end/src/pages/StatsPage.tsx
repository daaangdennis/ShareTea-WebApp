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
import SalesReportTable from "../components/SalesReportTable";
import SalesReportGraph from "../components/SalesReportGraph";
import PopularPairsGraph from "../components/PopularPairsGraph";

function StatsPage() {
  const [showProductUsage, setShowProductUsage] = useState(false);
  const [showRestockUsage, setShowRestockUsage] = useState(false);
  const [showExcessUsage, setShowExcessUsage] = useState(false);
  const [showPopularPairs, setShowPopularPairs] = useState(false);
  const [showSales, setShowSales] = useState(false);
  const [generate, setGenerate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleProductUsageButton = () => {
    setShowProductUsage(true);
    setGenerate(false);
    setShowPopularPairs(false);
    setShowRestockUsage(false);
    setShowExcessUsage(false);
    setShowSales(false);
  };

  const handleRestockButton = () => {
    setShowRestockUsage(true);
    setShowPopularPairs(false);
    setShowProductUsage(false);
    setShowExcessUsage(false);
    setShowSales(false);
    setGenerate(false);
  };

  const handleExcessButton = () => {
    setShowExcessUsage(true);
    setShowPopularPairs(false);
    setShowProductUsage(false);
    setShowRestockUsage(false);
    setShowSales(false);
    setGenerate(false);
  };

  const handlePopularPairsButton = () => {
    setShowPopularPairs(true);
    setShowExcessUsage(false);
    setShowProductUsage(false);
    setShowRestockUsage(false);
    setShowSales(false);
    setGenerate(false);
  };

  const handleProductSalesButton = () => {
    setShowSales(true);
    setShowExcessUsage(false);
    setShowProductUsage(false);
    setShowRestockUsage(false);
    setShowPopularPairs(false);
    setGenerate(false);
  };

  const handleGenerate = () => {
    setGenerate(true);
  };

  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-12 p-0">
          <div className="container-fluid d-flex justify-content-center flex-column h-100 p-0 mt-2">
            <div className="d-flex flex-wrap w-100 StatsButtonContainer p-0 justify-content-center">
              <button
                onClick={handleProductSalesButton}
                className={`StatsButton.btn mx-2 my-2 ${
                  showSales === true ? "StatsButton" : "StatsButtonOn"
                }`}
              >
                Sales Report
              </button>
              <button
                onClick={handleProductUsageButton}
                className={`StatsButton.btn mx-2 my-2 ${
                  showProductUsage === true ? "StatsButton" : "StatsButtonOn"
                }`}
              >
                Product Usage
              </button>
              <button
                onClick={handleRestockButton}
                className={`StatsButton.btn mx-2 my-2 ${
                  showRestockUsage === true ? "StatsButton" : "StatsButtonOn"
                }`}
              >
                Restock Report
              </button>
              <button
                onClick={handleExcessButton}
                className={`StatsButton.btn mx-2 my-2 ${
                  showExcessUsage === true ? "StatsButton" : "StatsButtonOn"
                }`}
              >
                Excess Report
              </button>
              <button
                onClick={handlePopularPairsButton}
                className={`StatsButton.btn mx-2 my-2 ${
                  showPopularPairs === true ? "StatsButton" : "StatsButtonOn"
                }`}
              >
                Popular Pairs
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 p-0">
          <div className="container-fluid d-flex justify-content-center flex-column p-0">
            <div className="col-md-6 dateContainer container-fluid d-flex p-0 justify-content-center align-items-center flex-wrap w-100 pt-2">
              <label className="dateLabel" htmlFor="startDate">
                Start Date:{" "}
              </label>
              <DatePicker
                id="startDate"
                className="startDate mx-2 my-2  "
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
              />

              <label className="dateLabel" htmlFor="endDate">
                End Date:{" "}
              </label>
              <DatePicker
                id="endDate"
                className="endDate  mx-2 my-2"
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
        </div>
        <div className="col-12 p-0">
          <div className="StatsButtonContainer container-fluid d-flex justify-content-center align-items-center flex-column h-100 pt-2 pb-2">
            <div className="GenerateButton">
              <button onClick={handleGenerate} className="StatsButtonOn">
                Generate Report
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-flex container-fluid justify-content-center align-items-center mt-2">
          <div className="TableContainer mx-4 mb-4 d-flex justify-content-center">
            {generate && showSales && <SalesReportTable />}
            {generate && showProductUsage && <ProductUsageTable />}
            {generate && showRestockUsage && <RestockReportTable />}
            {generate && showExcessUsage && (
              <ExcessItemsTable startDate={startDate} endDate={endDate} />
            )}
            {generate && showPopularPairs && (
              <PopularPairsTable startDate={startDate} endDate={endDate} />
            )}
          </div>

          <div className="GraphContainer mx-4 mb-4 d-flex justify-content-center">
            {generate && showSales && (
              <SalesReportGraph startDate={startDate} endDate={endDate} />
            )}
            {generate && showProductUsage && (
              <ProductUsage startDate={startDate} endDate={endDate} />
            )}
            {generate && showExcessUsage && <ExcessItemsGraph />}
            {generate && showRestockUsage && <RestockInventory />}
            {generate && showPopularPairs && <PopularPairsGraph />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default StatsPage;
