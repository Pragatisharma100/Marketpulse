import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

export default function App() {
  return (
    <div className="min-h-screen bg-black text-green-400 flex items-center justify-center text-4xl font-bold">
      MarketPulse Styled 🚀
    </div>
  );
}
