import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import { Router } from './router/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);