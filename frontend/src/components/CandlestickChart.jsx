import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Line,
} from "recharts";

function CandlestickChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={data}>
        <XAxis dataKey="date" />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip />

        {/* High-Low line */}
        <Line
          type="monotone"
          dataKey="high"
          stroke="transparent"
        />
        <Line
          type="monotone"
          dataKey="low"
          stroke="transparent"
        />

        {/* Open-Close bar */}
        <Bar
          dataKey="close"
          fill="#4f46e5"
          barSize={10}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default CandlestickChart;



