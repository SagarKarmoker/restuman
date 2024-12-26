import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
    return (
        <div>
            <Navbar />
            <Outlet>
                <div className='container mx-auto'>
                    {children}
                </div>
            </Outlet>
            <Footer />
        </div>
    )
}
