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
import { restockInventory } from "../atoms/statsItems";
import { useRecoilValue } from "recoil";
import { useGetRestockReport } from "../apis/RestockReport";

function RestockInventory() {
  const data = useRecoilValue(restockInventory);
  useGetRestockReport();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 150,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} interval={0} textAnchor="end" />
        <YAxis dataKey="quantity" />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Bar
          dataKey="quantity"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
export default RestockInventory;
