# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import yfinance as yf

# app = Flask(__name__)
# CORS(app)

# @app.route("/")
# def home():
#     return "Backend running OK"

# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.get_json()
#         symbol = data.get("symbol", "AAPL")

#         stock = yf.Ticker(symbol)

#         # ✅ SAFE history fetch
#         hist = stock.history(period="1y")

#         if hist.empty:
#             return jsonify({"error": "Invalid symbol"}), 400

#         # --- Price data ---
#         prices = hist["Close"].round(2).tolist()
#         dates = hist.index.strftime("%Y-%m-%d").tolist()

#         # --- Last 10 days table ---
#         last_10 = hist.tail(10)
#         table_data = []
#         for index, row in last_10.iterrows():
#             table_data.append({
#                 "date": index.strftime("%Y-%m-%d"),
#                 "open": round(row["Open"], 2),
#                 "high": round(row["High"], 2),
#                 "low": round(row["Low"], 2),
#                 "close": round(row["Close"], 2),
#                 "volume": int(row["Volume"]),
#             })

       
#         change = prices[-1] - prices[-2]
#         prediction = "UP" if change > 0 else "DOWN"
#         confidence = round(abs(change / prices[-2]) * 100, 2)

#         # ✅ SAFE summary (NO stock.info)
#         summary = {
#             "marketCap": "N/A",
#             "peRatio": "N/A",
#             "dividendYield": "N/A",
#             "volume": int(last_10.iloc[-1]["Volume"]),
#             "weekHigh": max(prices),
#             "weekLow": min(prices),
#             "avgVolume": int(hist["Volume"].mean()),
#             "sector": "N/A",
#         }

#         return jsonify({
#             "stock": symbol,
#             "prediction": prediction,
#             "confidence": confidence,
#             "dates": dates,
#             "prices": prices,
#             "summary": summary,
#             "historical_10_days": table_data
#         })

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend running OK 🚀"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        symbol = data.get("symbol", "AAPL").upper()

        stock = yf.Ticker(symbol)

        # ---------- PRICE HISTORY ----------
        hist = stock.history(period="1y")

        if hist.empty:
            return jsonify({"error": "Invalid symbol"}), 400

        prices = hist["Close"].round(2).tolist()
        dates = hist.index.strftime("%Y-%m-%d").tolist()

        # ---------- LAST 10 DAYS TABLE ----------
        last_10 = hist.tail(10)
        table_data = []
        for index, row in last_10.iterrows():
            table_data.append({
                "date": index.strftime("%Y-%m-%d"),
                "open": round(row["Open"], 2),
                "high": round(row["High"], 2),
                "low": round(row["Low"], 2),
                "close": round(row["Close"], 2),
                "volume": int(row["Volume"]),
            })

        # ---------- SIMPLE PREDICTION ----------
        change = prices[-1] - prices[-2]
        prediction = "UP" if change > 0 else "DOWN"
        confidence = round(abs(change / prices[-2]) * 100, 2)

        # ---------- SAFE INFO FETCH ----------
        info = stock.info if stock.info else {}

        summary = {
            "marketCap": info.get("marketCap", "N/A"),
            "peRatio": info.get("trailingPE", "N/A"),
            "dividendYield": (
                round(info.get("dividendYield", 0) * 100, 2)
                if info.get("dividendYield") else "N/A"
            ),
            "volume": info.get("volume", int(last_10.iloc[-1]["Volume"])),
            "weekHigh": info.get("fiftyTwoWeekHigh", max(prices)),
            "weekLow": info.get("fiftyTwoWeekLow", min(prices)),
            "avgVolume": info.get("averageVolume", int(hist["Volume"].mean())),
            "sector": info.get("sector", "N/A"),
        }

        return jsonify({
            "stock": symbol,
            "prediction": prediction,
            "confidence": confidence,
            "dates": dates,
            "prices": prices,
            "summary": summary,
            "historical_10_days": table_data
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
















