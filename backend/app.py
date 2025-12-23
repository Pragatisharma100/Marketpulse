from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf


app = Flask(__name__)
CORS(app)

# ✅ Home route (prevents 404 error)
@app.route("/")
def home():
    return "Backend is running successfully 🚀"

# ✅ Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    symbol = data.get("symbol", "AAPL")

    stock = yf.Ticker(symbol)

    info = stock.info
    hist_1y = stock.history(period="1y")
    hist_10d = stock.history(period="15d").tail(10)

    if hist_1y.empty:
        return jsonify({"error": "Invalid stock symbol"}), 400

    prices = hist_1y["Close"].tolist()
    dates = hist_1y.index.strftime("%Y-%m-%d").tolist()

    table_data = []
    for index, row in hist_10d.iterrows():
        table_data.append({
            "date": index.strftime("%Y-%m-%d"),
            "open": round(row["Open"], 2),
            "high": round(row["High"], 2),
            "low": round(row["Low"], 2),
            "close": round(row["Close"], 2),
            "volume": int(row["Volume"]),
        })

    # 🔮 Simple prediction logic
    change = prices[-1] - prices[-2]
    prediction = "UP" if change > 0 else "DOWN"
    confidence = round(abs(change / prices[-2]) * 100, 2)

    return jsonify({
        "stock": symbol,
        "prediction": prediction,
        "confidence": confidence,

        "dates": dates,
        "prices": prices,

        "summary": {
            "marketCap": info.get("marketCap"),
            "peRatio": info.get("trailingPE"),
            "dividendYield": info.get("dividendYield"),
            "volume": info.get("volume"),
            "weekHigh": info.get("fiftyTwoWeekHigh"),
            "weekLow": info.get("fiftyTwoWeekLow"),
            "avgVolume": info.get("averageVolume"),
            "sector": info.get("sector"),
        },

        "historical_10_days": table_data
    })

if __name__ == "__main__":
    app.run(debug=True)
















