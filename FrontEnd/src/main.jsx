import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import WelcomePage from './WelcomePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <App />

  
  </StrictMode>,
)
