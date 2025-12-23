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

