import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const MainLayout = () => {
    return (
        <>
            {/* Header Section */}
            <Header />

            {/* Layout Contents */}
            <div className='outlet'>
                <Outlet />
            </div>

            {/* Footer Contents */}
            <Footer />
        </>
    )
}

export default MainLayout