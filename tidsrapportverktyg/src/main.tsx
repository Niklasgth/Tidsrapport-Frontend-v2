import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/styles.css';
import App from './App'; // Om App.tsx ligger i samma mapp som main.tsx


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
