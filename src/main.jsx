import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import GOOGLE_CLIENT_ID from './services/auth.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="345269802863-m618p00terjv25v2omqqhethfj8on7mm.apps.googleusercontent.com">
      <Toaster position="top-right" />
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
