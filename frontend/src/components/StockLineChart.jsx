import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function StockLineChart({ stock }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=UGBCODTPJ4ZOT23V`
    )
      .then((res) => res.json())
      .then((res) => {
        const series = res["Time Series (Daily)"];
        if (!series) return;

        let arr = Object.keys(series)
          .slice(0, 250)
          .reverse()
          .map((date) => ({
            date,
            close: parseFloat(series[date]["4. close"]),
          }));

        // Moving Average (20 days)
        arr = arr.map((d, i) => {
          if (i < 20) return { ...d, ma: null };
          const slice = arr.slice(i - 20, i);
          const avg =
            slice.reduce((sum, x) => sum + x.close, 0) / 20;
          return { ...d, ma: avg };
        });

        setData(arr);
      });
  }, [stock]);

  return (
    <div>
      <h2>Original Close Price and MA</h2>

      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" hide />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="close"
          stroke="#2563eb"
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="ma"
          stroke="#facc15"
          dot={false}
        />
      </LineChart>
    </div>
  );
}

export default StockLineChart;

