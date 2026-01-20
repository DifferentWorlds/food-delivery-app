import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <HashRouter>
  <App />
</HashRouter>
)
