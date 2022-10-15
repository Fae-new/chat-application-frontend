import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import socket from '../socket/socket';


const ProtectedRoutes = () => {
  
const User= useAppSelector((state)=>state.user.userInfo)


if(!User){

return (<Navigate to='signin'/> )

}

return(
        <Outlet/>
    )
}

export default ProtectedRoutes;