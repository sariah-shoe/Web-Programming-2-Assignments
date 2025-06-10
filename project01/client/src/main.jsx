import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './routes.jsx';
import { RouterProvider } from 'react-router-dom';
import './main.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ router } />
  </StrictMode>,
);