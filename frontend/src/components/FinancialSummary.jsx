const FinancialSummary = ({ summary }) => {
  const formatNumber = (num) => {
    if (!num) return "N/A";
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return num;
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Financial Summary</h3>

      <div className="summary-grid">
        <div className="card">Market Cap <b>{formatNumber(summary.marketCap)}</b></div>
        <div className="card">P/E Ratio <b>{summary.peRatio ?? "N/A"}</b></div>
        <div className="card">Dividend Yield <b>{summary.dividendYield ? (summary.dividendYield * 100).toFixed(2) + "%" : "N/A"}</b></div>
        <div className="card">Volume <b>{formatNumber(summary.volume)}</b></div>

        <div className="card">52W High <b>${summary.weekHigh}</b></div>
        <div className="card">52W Low <b>${summary.weekLow}</b></div>
        <div className="card">Avg Volume <b>{formatNumber(summary.avgVolume)}</b></div>
        <div className="card">Sector <b>{summary.sector}</b></div>
      </div>
    </div>
  );
};

export default FinancialSummary;
