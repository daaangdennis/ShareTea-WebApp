import { useRecoilState, useRecoilValue } from "recoil";
import { excessInventory } from "../atoms/statsItems";
import { useGetExcessReport } from "../apis/ExcessReport";
import { useEffect, useState } from "react";
import { excessProducts } from "../types/types";

function ExcessItemsTable() {
  const data = useRecoilValue(excessInventory);
  useGetExcessReport();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Used</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.inventory_id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.used}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ExcessItemsTable;
