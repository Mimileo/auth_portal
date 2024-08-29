import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> 
      {/* react-router dom must be imported in frontend since it 
      allows to have different pages and linking in our app */}
    </BrowserRouter>
  </StrictMode>,
)
