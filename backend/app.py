from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import tensorflow as tf
import random

app = Flask(__name__)
CORS(app)

# Load LSTM model
model = tf.keras.models.load_model("Stock Predictions Model.keras")

@app.route("/")
def home():
    return jsonify({"status": "Backend is running successfully"})

@app.route("/test")
def test_api():
    return jsonify({"message": "Hello from Flask backend!"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    symbol = data.get("symbol", "GOOG")

    # TEMP dummy input (will replace later with real stock data)
    model_input = np.random.rand(1, 60, 1)

    prediction_value = model.predict(model_input)[0][0]

    trend = "UP" if prediction_value > 0.5 else "DOWN"
    confidence = round(random.uniform(65, 85), 2)

    return jsonify({
        "stock": symbol,
        "prediction": trend,
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)









