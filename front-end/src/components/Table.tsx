import { useEffect, useState } from "react";

const Table = ({ columns, data, className, style }: any) => {
  return (
    <div className={`table-responsive ${className}`} style={style}>
      <table className="table table-striped table-hover table-bordered rounded-table shadow-table">
        <thead className="custom-header">
          <tr>
            {columns?.map((name: string, i: number) => {
              return (
                <th key={i} scope="col">
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((array: any, i: number) => {
            return (
              <tr key={i}>
                {array?.map((item: any, i: number) =>
                  i === 0 ? (
                    <th scope="row">{item}</th>
                  ) : (
                    <td key={i}>{item}</td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const LazyLoadingTable = ({
  columns,
  data,
  className,
  style,
  rowLoad,
}: any) => {
  const [visibleData, setVisibleData] = useState<any>([]);
  const [rowCount, setRowCount] = useState(rowLoad[0]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const start = currentPage * rowCount;
    const end = start + rowCount;
    setVisibleData(data?.slice(start, end));
  }, [rowCount, currentPage, data]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className={`table-responsive ${className}`} style={style}>
        <table className="table table-striped table-hover table-bordered rounded-table ">
          <thead className="custom-header">
            <tr>
              {columns?.map((name: string, i: number) => {
                return (
                  <th key={`${name}-${i}`} scope="col">
                    {name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleData?.map((row: any, index: number) => (
              <tr key={index}>
                {row?.map((item: any, i: number) =>
                  i === 0 ? (
                    // Add a unique key here
                    <th scope="row" key={`row-header-${index}-${i}`}>
                      {item}
                    </th>
                  ) : (
                    <td key={`row-data-${index}-${i}`}>{item}</td>
                  )
                )}
              </tr>
            ))}
            <tr>
              <td colSpan={columns?.length <= 2 ? 1 : columns?.length - 1}>
                <label htmlFor="row-count" className="me-2">
                  Rows per load:
                </label>
                <select
                  className="form-select form-select-sm"
                  id="row-count"
                  value={rowCount}
                  onChange={(e) => setRowCount(Number(e.target.value))}
                >
                  {rowLoad?.map((value: number, i: number) => (
                    <option key={i} value={`${value}`}>
                      {value}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <div className="d-flex justify-content-center mt-2">
                  <button
                    className="btn btn-light"
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-light ms-2"
                    onClick={handleNext}
                    disabled={
                      currentPage >= Math.ceil(data?.length / rowCount) - 1
                    }
                  >
                    Next
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
