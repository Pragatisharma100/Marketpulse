// import { useEffect, useState } from "react";
// import {
//   ChartCanvas,
//   Chart,
//   CandlestickSeries,
//   XAxis,
//   YAxis,
//   discontinuousTimeScaleProvider,
// } from "react-financial-charts";
// import { timeParse } from "d3-time-format";
// import "./App.css";

// const parseDate = timeParse("%Y-%m-%d");

// function App() {
//   const [stock, setStock] = useState("GOOG");
//   const [ohlcData, setOhlcData] = useState([]);
//   const [prediction, setPrediction] = useState("");
//   const [confidence, setConfidence] = useState(0);

//   // 🔹 Fetch prediction from backend
//   useEffect(() => {
//     fetch("http://localhost:5000/predict", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ symbol: stock }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//   console.log("Backend response:", data);
//   setPrediction(data.prediction);
//   setConfidence(data.confidence);
// });

//   }, [stock]);

//   // 🔹 Fetch REAL OHLC data
//   useEffect(() => {
//     fetch(
//       `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=UGBCODTPJ4ZOT23V`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         const series = data["Time Series (Daily)"];
//         if (!series) return;

//         const formatted = Object.keys(series)
//           .slice(0, 30)
//           .reverse()
//           .map((date) => ({
//             date: parseDate(date),
//             open: +series[date]["1. open"],
//             high: +series[date]["2. high"],
//             low: +series[date]["3. low"],
//             close: +series[date]["4. close"],
//           }));

//         setOhlcData(formatted);
//       });
//   }, [stock]);

//   if (ohlcData.length === 0) return <p>Loading chart...</p>;

//   const ScaleProvider =
//     discontinuousTimeScaleProvider.inputDateAccessor(
//       (d) => d.date
//     );

//   const { data, xScale, xAccessor, displayXAccessor } =
//     ScaleProvider(ohlcData);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>📈 MarketPulse Dashboard</h1>

//       {/* 🔹 Stock Selector */}
//       <label>Select Stock: </label>
//       <select value={stock} onChange={(e) => setStock(e.target.value)}>
//         <option value="GOOG">Google (GOOG)</option>
//         <option value="AAPL">Apple (AAPL)</option>
//         <option value="TSLA">Tesla (TSLA)</option>
//       </select>

//       {/* 🔹 Prediction Card */}
//       <div className="card">
//         <h2>Stock: {stock}</h2>
//         <h3>
//           Prediction:{" "}
//           <span style={{ color: prediction === "UP" ? "green" : "red" }}>
//             {prediction}
//           </span>
//         </h3>
//         <p>Confidence: {confidence}%</p>
//       </div>

//       {/* 🔹 REAL Candlestick Chart */}
//       <h2>Real Candlestick Chart</h2>

//       <ChartCanvas
//         height={500}
//         width={1000}
//         ratio={1}
//         margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
//         data={data}
//         xScale={xScale}
//         xAccessor={xAccessor}
//         displayXAccessor={displayXAccessor}
//       >
//         <Chart id={1} yExtents={(d) => [d.high, d.low]}>
//           <XAxis />
//           <YAxis />
//           <CandlestickSeries
//   fill={(d) => (d.close > d.open ? "#22c55e" : "#ef4444")}
//   stroke={(d) => (d.close > d.open ? "#22c55e" : "#ef4444")}
//   wickStroke={(d) => (d.close > d.open ? "#22c55e" : "#ef4444")}
// />

//         </Chart>
//       </ChartCanvas>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import StockTable from "./components/StockTable";
import StockLineChart from "./components/StockLineChart";
import "./App.css";

function App() {
  const [stock, setStock] = useState("GOOG");

  return (
    <div className="container">
      <h1>MarketPulse</h1>

      {/* Stock Input */}
      <label>Enter the Stock ID</label>
      <input
        type="text"
        value={stock}
        onChange={(e) => setStock(e.target.value.toUpperCase())}
        className="stock-input"
      />

      {/* Table */}
      <StockTable stock={stock} />

      {/* Chart */}
      <StockLineChart stock={stock} />
    </div>
  );
}

export default App;















