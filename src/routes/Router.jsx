import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import MainLayout from '../components/MainLayout'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path='' element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default Router