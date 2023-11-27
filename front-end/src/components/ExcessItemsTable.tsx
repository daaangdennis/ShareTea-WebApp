import { useRecoilState, useRecoilValue } from "recoil";
import { excessInventory } from "../atoms/statsItems";
import { useGetExcessReport } from "../apis/ExcessReport";
import { useEffect, useState } from "react";
import { dateProps } from "../types/types";
import { LazyLoadingTable } from "./Table";

function ExcessItemsTable({ startDate, endDate }: dateProps) {
  const data = useRecoilValue(excessInventory);
  const newData = data.map((props) => [
    props.inventory_id,
    props.name,
    props.quantity,
    props.used,
  ]);

  useGetExcessReport(startDate);

  return (
    <LazyLoadingTable
      className="m-4"
      columns={["Item", "Name", "Quantity", "Used"]}
      data={newData}
      rowLoad={[10, 20, 30, 50, 100]}
    />
    // <div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Item</th>
    //         <th>Name</th>
    //         <th>Quantity</th>
    //         <th>Used</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.map((item, index) => (
    //         <tr key={index}>
    //           <td>{item.inventory_id}</td>
    //           <td>{item.name}</td>
    //           <td>{item.quantity}</td>
    //           <td>{item.used}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
}
export default ExcessItemsTable;
