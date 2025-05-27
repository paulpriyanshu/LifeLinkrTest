import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Login from './components/Login/Login.jsx'
import Employee from './components/Employee/Employee.jsx'
import CreateEmployee from './components/CreateEmployee/CreateEmployee.jsx'
import EditEmployee from './components/EditEmployee/EditEmployee.jsx'
import ProtectedRoute from '../api/utils/ProtectedRoute.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element : <Layout/>,
    children : [
      {
        path:"",

        element:(
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        )
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/CreateEmployee",
        element: (
          <ProtectedRoute>
            <CreateEmployee/>
          </ProtectedRoute>
        )
      },
      {
        path:"/employees",
        element:<ProtectedRoute>
          <Employee/>
        </ProtectedRoute>
      },
      {
        path:`/editEmployee/:id`,
        element:( 
          <ProtectedRoute>
            <EditEmployee/>
          </ProtectedRoute>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
