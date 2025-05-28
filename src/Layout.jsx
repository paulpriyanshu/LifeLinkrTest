import { Outlet } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { Toaster } from "react-hot-toast"

function Layout(){
   return (
     <>
    <Header/>   
    <Toaster/>
    <Outlet/>
    <Footer/>
    </>

   )

}
export default Layout