import React from 'react'
import HeroSection from '../components/HeroSection'
import CardDesign from '../components/CardDesign'
import CategoryDesign from '../components/CategoryDesign'

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Flash Sale Section */}
            <div className='px-0 sm:px-12'>
                <h1 className='text-2xl'>Flash Sale</h1>
                <div className='flashsale-container'>
                    <div className="rounded shadow-emerald-950">
                        <CardDesign />
                    </div>
                </div>
            </div>

            {/* Category */}
            <div className='px-0 sm:px-12'>
                <h1 className='text-2xl'>Category</h1>
                <div className='container'>
                    <div className="rounded shadow-emerald-950">
                        <CategoryDesign />
                    </div>
                </div>

            </div>

        </>
    )
}

export default Home