import "../styles/StatsPage.css";

function StatsPage() {
  return (
    <div className="StatsContainer">
      <div className="StatsButtonContainer">
        <button className="btn StatsButton">Sales Report</button>
        <button className="btn StatsButton">Product Usage</button>
        <button className="btn StatsButton">Restock Report</button>
        <button className="btn StatsButton">Excess Report</button>
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
        <p>This is a test</p>
      </div>
    </div>
  );
}
export default StatsPage;
