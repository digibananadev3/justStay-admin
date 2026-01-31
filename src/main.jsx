import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="564189022401-d581ulnqsc7tr9r1hhbc4ftuoohgppuj.apps.googleusercontent.com">
      <Toaster position="top-right" />
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
