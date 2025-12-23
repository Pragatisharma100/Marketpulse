import numpy as np
import pandas as pd
import yfinance as yf
from keras.models import load_model
import streamlit as st
import matplotlib.pyplot as plt

# ---------------------------------------------------
# Branding
# ---------------------------------------------------
st.set_page_config(
    page_title="MarketPulse | Stock Prediction Dashboard",
    layout="wide"
)

st.markdown(
    """
    <h1 style="color:#2E86C1; text-align:center; font-size:42px;">
        <strong>MarketPulse</strong>
    </h1>
    <h3 style="text-align:center; color:#1B2631;">
        Stock Prediction Dashboard by <span style="color:#2E86C1;">Team L</span>
    </h3>
    <br>
    """, 
    unsafe_allow_html=True
)

# ---------------------------------------------------
# Load Model
# ---------------------------------------------------
model = load_model(r"Stock Predictions Model.keras")

# ---------------------------------------------------
# Sidebar Inputs
# ---------------------------------------------------
st.sidebar.title("MarketPulse Controls")
st.sidebar.markdown("Adjust parameters to analyze stock trends.")

stock = st.sidebar.text_input("Stock Symbol", "GOOG")
start = st.sidebar.date_input("Start Date", pd.to_datetime("2012-01-01"))
end = st.sidebar.date_input("End Date", pd.to_datetime("today"))

st.sidebar.markdown("---")
st.sidebar.markdown("**Powered by LSTM Model + Technical Indicators**")

# ---------------------------------------------------
# Fetch Data
# ---------------------------------------------------
st.write(f" Analyzing Stock: **{stock}**")
data = yf.download(stock, start, end)

st.subheader(" Raw Stock Data")
st.dataframe(data, height=300)

# ---------------------------------------------------
# Train/Test Split
# ---------------------------------------------------
data_train = pd.DataFrame(data.Close[0: int(len(data)*0.80)])
data_test = pd.DataFrame(data.Close[int(len(data)*0.80): len(data)])

from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler(feature_range=(0,1))

pas_100_days = data_train.tail(100)
data_test = pd.concat([pas_100_days, data_test], ignore_index=True)
data_test_scale = scaler.fit_transform(data_test)

# ---------------------------------------------------
# Moving Averages
# ---------------------------------------------------
st.subheader(" Price vs 50-Day Moving Average")
ma_50 = data.Close.rolling(50).mean()
fig1 = plt.figure(figsize=(10,5))
plt.plot(ma_50, "r", label="MA50")
plt.plot(data.Close, "g", label="Close Price")
plt.legend()
st.pyplot(fig1)

st.subheader(" Price vs MA50 vs MA100")
ma_100 = data.Close.rolling(100).mean()
fig2 = plt.figure(figsize=(10,5))
plt.plot(ma_50, "r")
plt.plot(ma_100, "b")
plt.plot(data.Close, "g")
plt.show()
st.pyplot(fig2)

st.subheader(" Price vs MA100 vs MA200")
ma_200 = data.Close.rolling(200).mean()
fig3 = plt.figure(figsize=(10,5))
plt.plot(ma_100, "r")
plt.plot(ma_200, "b")
plt.plot(data.Close, "g")
plt.show()
st.pyplot(fig3)

# ---------------------------------------------------
# Prediction
# ---------------------------------------------------
x = []
y = []

for i in range(100, data_test_scale.shape[0]):
    x.append(data_test_scale[i-100:i])
    y.append(data_test_scale[i,0])

x, y = np.array(x), np.array(y)

predict = model.predict(x)
scale = 1/scaler.scale_
predict = predict * scale
y = y * scale

# ---------------------------------------------------
# Results Plot
# ---------------------------------------------------
st.subheader(" Original Price vs Predicted Price")
fig4 = plt.figure(figsize=(10,5))
plt.plot(predict, "r", label="Predicted Price")
plt.plot(y, "g", label="Actual Price")
plt.xlabel("Time")
plt.ylabel("Price")
plt.show()
plt.legend()
st.pyplot(fig4)

# ---------------------------------------------------
# Footer
# ---------------------------------------------------
st.markdown(
    """
    <hr>
    <div style="text-align:center;">
        <p style="color:gray;">Developed as a portfolio project by <strong>Pragati Sharma</strong>.</p>
        <p>MarketPulse © 2025</p>
    </div>
    """, 
    unsafe_allow_html=True
)
