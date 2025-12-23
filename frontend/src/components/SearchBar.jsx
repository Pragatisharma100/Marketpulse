export default function SearchBar({ stock, setStock, onAnalyze }) {
  return (
    <div className="card">
      <label>Stock Symbol</label>
      <br />
      <input
        placeholder="e.g. AAPL, MSFT, GOOG"
        value={stock}
        onChange={(e) => setStock(e.target.value.toUpperCase())}
      />
      <br /><br />
      <button onClick={onAnalyze}>Analyze Stock</button>
    </div>
  );
}
