import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignUp from './auth/SignUp';
import VerifyEmail from './auth/VerifyEmail';
import Login from './auth/Login';
import DashboardEstudiante from './pages/DashboardEstudiante';
import Header from './components/Header';
import CursosEstudiante from './pages/CursosEstudiante';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/signup' , element: <SignUp />
  },
  {
    path: '/verify-email' , element: <VerifyEmail />
  },
  {
    path: '/login' , element: <Login />
  },
  {
    path: '/dashboard' , element: <DashboardEstudiante />
  },
  {
    path: '/cursos' , element: <CursosEstudiante />
  }
])




root.render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
  </React.StrictMode>
);

