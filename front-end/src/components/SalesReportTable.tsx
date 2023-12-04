import { useRecoilValue } from "recoil";
import { SalesProduct, restockInventory } from "../atoms/statsItems";
import { useState } from "react";
import LazyLoadingTable from "../components/Table";
function ProductUsageTable() {
  const data = useRecoilValue(SalesProduct);
  const newData = data.map((props) => [props.name, props.count]);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <LazyLoadingTable
      className="m-4"
      style={{ width: "90%" }}
      columns={["Name", "Quantity"]}
      data={newData}
      rowLoad={[10, 20, 30, 50, 100]}
    />
    // <div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Quantity</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {currentItems.map((item, index) => (
    //         <tr key={index}>
    //           <td>{item.name}</td>
    //           <td>{item.count}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <div>
    //     <button
    //       onClick={() => handlePageChange(currentPage - 1)}
    //       disabled={currentPage === 1}
    //     >
    //       Previous
    //     </button>
    //     <span>
    //       {" "}
    //       Page {currentPage} of {totalPages}{" "}
    //     </span>
    //     <button
    //       onClick={() => handlePageChange(currentPage + 1)}
    //       disabled={currentPage === totalPages}
    //     >
    //       Next
    //     </button>
    //   </div>
    // </div>
  );
}

export default ProductUsageTable;
