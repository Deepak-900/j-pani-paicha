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
import Shop from '../pages/Shop'
import DashboardLayout from '../pages/dashboard/DashboardLayout'
import DashboardHome from '../pages/dashboard/pages/DashboardHome'
import ProtectedRoute from '../components/ProtectedRoute'
import UserProfile from '../pages/dashboard/pages/UserProfile'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='shop' element={<Shop />} />
                    <Route path='products/:id' element={<ProductDetails />} />
                    <Route path='contact' element={<ContactPage />} />
                    <Route path='faq' element={<FAQ />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='cart' element={<Cart />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />} >
                        <Route path='dashboard' element={<DashboardHome />} />
                        <Route path='userProfile' element={<UserProfile />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default Router