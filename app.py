import numpy as np
import pandas as pd
import yfinance as yf
import streamlit as st
import matplotlib.pyplot as plt
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler

# ---------------------------------------------------
# Page Config
# ---------------------------------------------------
st.set_page_config(
    page_title="MarketPulse | Stock Prediction Dashboard",
    layout="wide"
)

# ---------------------------------------------------
# Branding
# ---------------------------------------------------
st.markdown(
    """
    <h1 style="text-align:center; color:#2E86C1;">MarketPulse</h1>
    <h3 style="text-align:center;">Stock Prediction Dashboard</h3>
    <hr>
    """,
    unsafe_allow_html=True
)

# ---------------------------------------------------
# Sidebar
# ---------------------------------------------------
st.sidebar.header("Controls")

stock = st.sidebar.text_input("Stock Symbol", "GOOG")
start = st.sidebar.date_input("Start Date", pd.to_datetime("2012-01-01"))
end   = st.sidebar.date_input("End Date", pd.to_datetime("today"))

WINDOW_SIZE = 100

# ---------------------------------------------------
# Load Models
# ---------------------------------------------------
lstm_model = load_model("lstm_stock_model.keras")
gru_model  = load_model("gru_stock_model.keras")

# ---------------------------------------------------
# Fetch Data
# ---------------------------------------------------
data = yf.download(stock, start, end)

if data.empty:
    st.error("No data found. Check stock symbol or date range.")
    st.stop()

st.subheader("Raw Stock Data")
st.dataframe(data.tail(200), height=300)

# ---------------------------------------------------
# Close Prices
# ---------------------------------------------------
close_prices = data[['Close']]

# ---------------------------------------------------
# Scaling
# ---------------------------------------------------
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(close_prices)

# ---------------------------------------------------
# Train/Test Split (CRITICAL FIX)
# ---------------------------------------------------
train_size = int(len(scaled_data) * 0.80)

train_data = scaled_data[:train_size]
test_data  = scaled_data[train_size - WINDOW_SIZE:]

# ---------------------------------------------------
# Create Sequences
# ---------------------------------------------------
def create_sequences(data, window):
    X, y = [], []
    for i in range(window, len(data)):
        X.append(data[i-window:i])
        y.append(data[i])
    return np.array(X), np.array(y)

X_test, y_test = create_sequences(test_data, WINDOW_SIZE)

# ---------------------------------------------------
# Predictions
# ---------------------------------------------------
lstm_pred = lstm_model.predict(X_test, verbose=0)
gru_pred  = gru_model.predict(X_test, verbose=0)

# Inverse scaling
lstm_pred = scaler.inverse_transform(lstm_pred)
gru_pred  = scaler.inverse_transform(gru_pred)
y_actual  = scaler.inverse_transform(y_test)

# ---------------------------------------------------
# Proper Date Alignment (KEY FIX)
# ---------------------------------------------------
test_dates = data.index[train_size:]

# ---------------------------------------------------
# Moving Averages
# ---------------------------------------------------
st.subheader("Moving Averages")

ma50  = close_prices.rolling(50).mean()
ma100 = close_prices.rolling(100).mean()
ma200 = close_prices.rolling(200).mean()

fig_ma = plt.figure(figsize=(12,6))
plt.plot(close_prices.index, close_prices, label="Close", color="black")
plt.plot(ma50.index, ma50, label="MA 50")
plt.plot(ma100.index, ma100, label="MA 100")
plt.plot(ma200.index, ma200, label="MA 200")
plt.legend()
plt.title("Price with Moving Averages")
plt.xlabel("Date")
plt.ylabel("Price")
st.pyplot(fig_ma)

# ---------------------------------------------------
# Prediction Plot
# ---------------------------------------------------
st.subheader("Actual vs Predicted Prices")

fig_pred = plt.figure(figsize=(12,6))
plt.plot(test_dates, y_actual, label="Actual Price", color="black")
plt.plot(test_dates, lstm_pred, label="LSTM Prediction", color="blue")
plt.plot(test_dates, gru_pred, label="GRU Prediction", color="green")
plt.legend()
plt.xlabel("Date")
plt.ylabel("Price")
plt.title("Stock Price Prediction Comparison")
st.pyplot(fig_pred)

# ---------------------------------------------------
# Metrics
# ---------------------------------------------------
from sklearn.metrics import mean_absolute_error, mean_squared_error

lstm_mae  = mean_absolute_error(y_actual, lstm_pred)
lstm_rmse = np.sqrt(mean_squared_error(y_actual, lstm_pred))

gru_mae   = mean_absolute_error(y_actual, gru_pred)
gru_rmse  = np.sqrt(mean_squared_error(y_actual, gru_pred))

st.subheader("Model Performance")

metrics_df = pd.DataFrame({
    "Model": ["LSTM", "GRU"],
    "MAE":  [lstm_mae, gru_mae],
    "RMSE": [lstm_rmse, gru_rmse]
})

st.table(metrics_df)

# ---------------------------------------------------
# Footer
# ---------------------------------------------------
st.markdown(
    """
    <hr>
    <p style="text-align:center; color:gray;">
        MarketPulse © 2025 | Built By Pragati
    </p>
    """,
    unsafe_allow_html=True
)

