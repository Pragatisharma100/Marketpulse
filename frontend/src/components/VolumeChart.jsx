import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Jun", volume: 50 },
  { date: "Jul", volume: 80 },
  { date: "Aug", volume: 60 },
  { date: "Sep", volume: 90 },
];

export default function VolumeChart() {
  return (
    <div className="card">
      <h3>Volume Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="volume" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
