export default function SummaryCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "10px" }}>
      {[
        ["Market Cap", "$2.93T"],
        ["P/E Ratio", "30.6"],
        ["52W High", "$260.10"],
        ["52W Low", "$169.21"]
      ].map(([title, value]) => (
        <div className="card" key={title}>
          <h4>{title}</h4>
          <h3>{value}</h3>
        </div>
      ))}
    </div>
  );
}
