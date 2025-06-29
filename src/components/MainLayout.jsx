import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Foooter from './Foooter'

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Foooter />
        </>
    )
}

export default MainLayout