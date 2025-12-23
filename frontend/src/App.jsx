import { useState } from "react";
import PriceChart from "./components/PriceChart";
import HistoricalTable from "./components/HistoricalTable";
import FinancialSummary from "./components/FinancialSummary";
import StockComparisonCharts from "./components/StockComparisonCharts";

import "./App.css";

function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState("");

  const fetchStockData = async () => {
    try {
      setError("");
      setStockData(null);

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: symbol,
        }),
      });

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();
      console.log("REAL DATA FROM BACKEND:", data);
      setStockData(data);
    } catch (err) {
      setError("Backend not running or invalid symbol");
    }
  };

  return (
    <div className="app">
      <h1>MarketPulse – Stock Prediction</h1>

      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="AAPL, TSLA, MSFT, INFY.NS"
      />

      <button onClick={fetchStockData}>Analyze</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {stockData && (
        <>
          <h2>{stockData.stock}</h2>
          <p><b>Prediction:</b> {stockData.prediction}</p>
          <p><b>Confidence:</b> {stockData.confidence}%</p>

          {/* 🔵 1️⃣ ACTUAL PRICE GRAPH */}
          <PriceChart data={stockData} />

          {/* 🔴 2️⃣ & 🟢 3️⃣ LSTM & GRU GRAPHS */}
          <StockComparisonCharts symbol={symbol} />

          {/* 📊 FINANCIAL SUMMARY */}
          {stockData?.summary && (
            <FinancialSummary summary={stockData.summary} />
          )}

          {/* 📅 HISTORICAL TABLE */}
          {stockData?.historical_10_days && (
            <HistoricalTable data={stockData.historical_10_days} />
          )}
        </>
      )}
    </div>
  );
}

export default App;



















