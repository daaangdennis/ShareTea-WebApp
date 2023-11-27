import { useRecoilValue } from "recoil";
import {
  SalesProduct,
  inventoryUsage,
  restockInventory,
} from "../atoms/statsItems";
import { useState } from "react";
import LazyLoadingTable from "../components/Table";

function ProductUsageTable() {
  const mydata = useRecoilValue(inventoryUsage);
  const newData = mydata.map((props) => [
    props.inventory_id,
    props.inventory_name,
    props.quantity_used,
  ]);

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = mydata.slice(startIndex, endIndex);

  const totalPages = Math.ceil(mydata.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const rowLoad = [5, 10, 15, 20, 30];

  return (
    <LazyLoadingTable
      className="m-4 table-responsive"
      columns={["ID", "Name", "Used"]}
      data={newData}
      rowLoad={[10, 20, 30, 50, 100]}
    />
    // <div>
    //   <table className="table customTableHeader table-striped table-bordered">
    //     <thead className="thead-dark">
    //       <tr>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Used</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {currentItems.map((item, index) => (
    //         <tr key={index}>
    //           <td>{item.inventory_id}</td>
    //           <td>{item.inventory_name}</td>
    //           <td>{item.quantity_used}</td>
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
