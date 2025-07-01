import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import MainLayout from '../components/MainLayout'
import About from '../pages/About'
import ContactPage from '../pages/Contact'
import FAQ from '../pages/FAQ'
import LoginPage from '../pages/Login'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='contact' element={<ContactPage />} />
                    <Route path='faq' element={<FAQ />} />
                    <Route path='login' element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default Router