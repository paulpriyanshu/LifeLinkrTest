import React from 'react'
import { useLocation } from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import { useSession } from '../lib/utlis'
import Cookies from 'js-cookie'

function Header() {
    const location=useLocation()
    const user=useSession()
    console.log("user",user)

    function handleLogout(){
        Cookies.remove('auth-token')
        window.location.href="/login"
        
    }
    if(location.pathname==="/login"){
        return (
            <HeaderComponent>
                Login
            </HeaderComponent>
        )
    }
  return (
    <HeaderComponent username={user?.user} onLogout={handleLogout}/>
  )
}

export default Header