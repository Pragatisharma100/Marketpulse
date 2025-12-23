// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// const PriceChart = ({ data }) => {
//   const chartData = {
//     labels: data.dates,
//     datasets: [
//       {
//         label: "Stock Price (1 Year)",
//         data: data.prices,
//         borderColor: "blue",
//         fill: false,
//       },
//     ],
//   };

//   return <Line data={chartData} />;
// };

// export default PriceChart;

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function PriceChart({ data }) {
  if (!data || !data.prices || !data.dates) {
    return <p>Loading graph...</p>;
  }

  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: "Stock Price (1 Year)",
        data: data.prices,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
          color: "#cbd5e1",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#cbd5e1",
          callback: (value) => `$${value}`,
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },
  };

  return (
    <div style={{ height: "400px", marginTop: "20px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PriceChart;


