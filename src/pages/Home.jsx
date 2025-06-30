import React from 'react'
import HeroSection from '../components/HeroSection'
import CardDesign from '../components/CardDesign'
import CategoryDesign from '../components/CategoryDesign'
import JustForYou from '../components/JustForYou'
import PaymentPartners from '../components/PaymentPartners'

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Flash Sale Section */}
            <div className='px-0 sm:px-12'>
                <h1 className='text-lg sm:text-xl font-bold text-gray-800'>Flash Sale   </h1>

                <div className='flashsale-container'>
                    <div className="rounded shadow-emerald-950">
                        <CardDesign />
                    </div>
                </div>
            </div>

            {/* Category */}
            <div className='px-0 sm:px-12 pb-4'>
                <div className='category-container'>
                    <div className="rounded shadow-emerald-950">
                        <CategoryDesign />
                    </div>
                </div>
            </div>

            {/* Just for you */}
            <div className='px-0 sm:px-12 pb-4'>
                <div className='justforyou-container'>
                    <div className="rounded shadow-emerald-950">
                        <JustForYou />
                    </div>
                </div>
            </div>


            {/* Payment Partners */}
            <div className='px-0 sm:px-12 pb-4'>
                <div className='justforyou-container'>
                    <div className="rounded shadow-emerald-950">
                        <PaymentPartners />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home