import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { excessInventory, restockInventory } from "../atoms/statsItems";
import { useRecoilValue } from "recoil";
import { useGetRestockReport } from "../apis/RestockReport";

function ExcessItemsGraph() {
  const data = useRecoilValue(excessInventory);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 80,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} interval={0} textAnchor="end" />
        <YAxis dataKey="quantity" />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="center" />
        <Bar
          dataKey="quantity"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default ExcessItemsGraph;
