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

const router=createBrowserRouter([
  {
    path:'/',
    element : <Layout/>,
    children : [
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/CreateEmployee",
        element: <CreateEmployee/>
      },
      {
        path:"/employees",
        element:<Employee/>
      },
      {
        path:`/editEmployee/:id`,
        element:<EditEmployee/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
