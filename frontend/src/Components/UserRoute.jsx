import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SignIn from '../Pages/SignIn';

function UserRoute() {

    const user = useSelector((state)=>state?.user?.user) ;
    
    return user.role === 'user' ? <Outlet/> : <SignIn/>
}

export default UserRoute
