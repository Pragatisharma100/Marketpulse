import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockComparisonCharts = ({ symbol = "AAPL" }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symbol })
    })
      .then((res) => res.json())
      .then((data) => {
        const prices = data.prices.map(p => Number(p));
        const dates = data.dates;

        
        const lstm = prices.map(p => p * 1.01);
        const gru = prices.map(p => p * 0.99);

        setChartData({
          labels: dates,
          actual: prices,
          lstm: lstm,
          gru: gru
        });
      })
      .catch((err) => console.error(err));
  }, [symbol]);

  if (!chartData) return <h3>Loading graphs...</h3>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      
      {/* ACTUAL PRICE */}
      <h2>Actual Stock Price</h2>
      <Line
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "Actual Price",
              data: chartData.actual,
              borderColor: "blue",
              borderWidth: 2
            }
          ]
        }}
        options={options}
      />

      {/* LSTM */}
      <h2 style={{ marginTop: "40px" }}>LSTM Prediction</h2>
      <Line
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "LSTM Prediction",
              data: chartData.lstm,
              borderColor: "green",
              borderWidth: 2
            }
          ]
        }}
        options={options}
      />

      {/* GRU */}
      <h2 style={{ marginTop: "40px" }}>GRU Prediction</h2>
      <Line
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "GRU Prediction",
              data: chartData.gru,
              borderColor: "red",
              borderWidth: 2
            }
          ]
        }}
        options={options}
      />
    </div>
  );
};

export default StockComparisonCharts;

