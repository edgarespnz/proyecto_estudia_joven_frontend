import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import SignUp from './auth/SignUp';
import VerifyEmail from './auth/VerifyEmail';
import Login from './auth/Login';
import DashboardEstudiante from './pages/DashboardEstudiante';
import DashboardProfesor from './pages/DashboardProfesor';
import Header from './components/Header';
import CursosProfesor from './pages/CursosProfesor';
import CursosEstudiante from './pages/CursosEstudiante';
import CursoPageProfesor from './pages/CursoPageProfesor';
import CursosPageEstudiante from './pages/CursosPageEstudiante';

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
    path: '/dashboard-estudiante' , element: <DashboardEstudiante />
  },
  {
    path: '/dashboard-profesor' , element: <DashboardProfesor />
  },
  {
    path: '/cursos-profesor' , element: <CursosProfesor />
  },
  {
    path: '/cursos-estudiante' , element: <CursosEstudiante />
  },
  {
    path: '/courses-teacher/:idCurso' , element : <CursoPageProfesor />
  },
  {
    path: '/courses-student/:idCurso' , element : <CursosPageEstudiante/>
  }
])




root.render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
  </React.StrictMode>
);

