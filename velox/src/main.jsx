import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111',
              color: '#f0e9dc',
              border: '1px solid rgba(192,154,90,0.2)',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
