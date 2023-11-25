import { useRecoilState, useRecoilValue } from "recoil";
import { excessInventory, popularPairsInventory } from "../atoms/statsItems";
import { useGetExcessReport } from "../apis/ExcessReport";
import { useEffect, useState } from "react";
import { dateProps, excessProducts } from "../types/types";
import { useGetPopularPairs } from "../apis/PopularPairs";

function PopularPairsTable({ startDate, endDate }: dateProps) {
  const data = useRecoilValue(popularPairsInventory);

  useGetPopularPairs(startDate, endDate);

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
    <div>
      <table>
        <thead>
          <tr>
            <th>Product 1</th>
            <th>Product 2</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.product1}</td>
              <td>{item.product2}</td>
              <td>{item.combination_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PopularPairsTable;
