// import { useEffect, useState } from "react";

// function StockTable({ stock }) {
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     fetch(
//       `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=UGBCODTPJ4ZOT23V`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         const series = data["Time Series (Daily)"];
//         if (!series) return;

//         const formatted = Object.keys(series)
//           .slice(0, 20)
//           .map((date) => ({
//             date,
//             open: series[date]["1. open"],
//             high: series[date]["2. high"],
//             low: series[date]["3. low"],
//             close: series[date]["4. close"],
//             volume: series[date]["5. volume"],
//           }));

//         setRows(formatted);
//       });
//   }, [stock]);

//   return (
//     <div>
//       <h2>Stock Data</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Open</th>
//             <th>High</th>
//             <th>Low</th>
//             <th>Close</th>
//             <th>Volume</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((r, i) => (
//             <tr key={i}>
//               <td>{r.date}</td>
//               <td>{r.open}</td>
//               <td>{r.high}</td>
//               <td>{r.low}</td>
//               <td>{r.close}</td>
//               <td>{r.volume}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default StockTable;

export default function StockTable() {
  return (
    <div className="card">
      <h3>Historical Data</h3>
      <table width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-06-02</td>
            <td>200.28</td>
            <td>201.70</td>
            <td>35M</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

