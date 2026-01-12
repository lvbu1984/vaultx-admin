console.log("🔥🔥🔥 REAL main.tsx LOADED 🔥🔥🔥", location.href);
alert("REAL main.tsx loaded");

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
