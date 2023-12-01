import { useRecoilValue } from "recoil";
import { SalesProduct } from "../atoms/statsItems";
import { dateProps, productSales } from "../types/types";
import { useGetSalesReport } from "../apis/SalesReport";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function ProductUsage({ startDate, endDate }: dateProps) {
  const data = useRecoilValue(SalesProduct);
  const abbreviatedData = data.map((item) => ({
    ...item,
    name: item.name.substring(0, 15),
  }));
  useGetSalesReport(startDate, endDate);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={abbreviatedData}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 150,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-90} interval={0} textAnchor="end" />
        <YAxis dataKey="count" />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="top" align="center" />
        <Bar
          dataKey="count"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ProductUsage;
