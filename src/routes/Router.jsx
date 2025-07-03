import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import MainLayout from '../components/MainLayout'
import About from '../pages/About'
import ContactPage from '../pages/Contact'
import FAQ from '../pages/FAQ'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='products/:id' element={<ProductDetails />} />
                    <Route path='contact' element={<ContactPage />} />
                    <Route path='faq' element={<FAQ />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='cart' element={<Cart />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default Router