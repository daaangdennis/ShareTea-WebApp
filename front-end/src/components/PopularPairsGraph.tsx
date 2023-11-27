import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { popularPairsInventory } from "../atoms/statsItems";
import { useRecoilValue } from "recoil";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}

function PopularPairsGraph() {
  const data = useRecoilValue(popularPairsInventory);
  const newArray = data.slice(0, 10);
  const newData = newArray.map((props) => [
    props.product1 + " & " + props.product2,
    props.combination_count,
  ]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF6666",
    "#66CCCC",
    "#FFD700",
    "#00FF00",
    "#FF4500",
  ];

  const formattedData = newData.map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index],
  }));

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={formattedData}
        dataKey="value"
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {formattedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip
        content={<CustomTooltip active={undefined} payload={undefined} />}
      />
    </PieChart>
  );
}

export default PopularPairsGraph;
