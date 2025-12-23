const HistoricalTable = ({ data }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Historical Data (Last 10 Days)</h3>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>${row.open}</td>
                <td>${row.high}</td>
                <td>${row.low}</td>
                <td>${row.close}</td>
                <td>{row.volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalTable;
