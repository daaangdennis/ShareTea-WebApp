import { product } from "../types/types";

const SortButtons = ({
  column,
  sortedProducts,
  setSortedProducts,
  sortDirection,
  setSortDirection,
}: {
  column: string;
  sortedProducts: any[];
  setSortedProducts: React.Dispatch<React.SetStateAction<any[]>>;
  sortDirection: any;
  setSortDirection: React.Dispatch<any>;
}) => {
  function normalizeData(value: any) {
    if (value === null) {
      return "";
    }
    if (typeof value === "string") {
      return value.toLowerCase().replace(/[\s*!@$]+/g, "");
    }
    return value;
  }
  const sortData = (column: string) => {
    const newDirection = sortDirection[column] === "asc" ? "desc" : "asc";
    const sortedData = [...sortedProducts].sort((a: any, b: any) => {
      const valA = normalizeData(a[column]);
      const valB = normalizeData(b[column]);

      if (newDirection === "asc") {
        return valA > valB ? 1 : -1;
      }
      return valA < valB ? 1 : -1;
    });

    setSortedProducts(sortedData);
    setSortDirection({ ...sortDirection, [column]: newDirection });
  };
  return (
    <div className="d-flex m-1">
      <button
        className="btn btn-sm rounded-circle-btn"
        onClick={() => sortData(column)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-up-fill"
          viewBox="0 0 16 16"
        >
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
      </button>
      <button
        className="btn btn-sm rounded-circle-btn"
        onClick={() => sortData(column)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </button>
    </div>
  );
};

export default SortButtons;
