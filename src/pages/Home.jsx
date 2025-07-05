import HeroSection from '../components/home/HeroSection'
import CardDesign from '../components/home/CardDesign'
import CategoryDesign from '../components/home/CategoryDesign'
import JustForYou from '../components/home/JustForYou'
import PaymentPartners from '../components/home/PaymentPartners'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate()

    return (
        <>
            {/* Hero Section */}
            <HeroSection />

            {/* Flash Sale Section */}
            <div className='px-0 sm:px-12'>
                <h1 className='text-lg sm:text-xl font-bold text-gray-800'>Flash Sale   </h1>

                <div className='flashsale-container'>
                    <div className="rounded shadow-emerald-950">


                        <div className='bg-white py-4'>
                            {/* Header Section */}
                            <div className='px-4 sm:px-6 py-2 flex flex-row justify-between items-center'>
                                <h1 className='text-lg sm:text-xl font-bold text-gray-800'>On Sale Now</h1>
                                <button type='button' onClick={() => navigate('/shop')} className=" btn btn-outline btn-primary text-xs sm:text-sm whitespace-nowrap py-1 px-3 sm:py-2 sm:px-4">
                                    SHOW ALL PRODUCTS
                                </button>
                            </div>
                            {/* Responsive Product Grid */}

                            {/* Card Design */}
                            <CardDesign />
                        </div>

                    </div>
                </div>
            </div >

            {/* Category */}
            < div className='px-0 sm:px-12 pb-4' >
                <div className='category-container'>
                    <div className="rounded shadow-emerald-950">
                        <CategoryDesign />
                    </div>
                </div>
            </ div>

            {/* Just for you */}
            <div div className='px-0 sm:px-12 pb-4' >
                <div className='justforyou-container'>
                    <div className="rounded shadow-emerald-950">
                        <JustForYou />
                    </div>
                </div>
            </div >


            {/* Payment Partners */}
            <div div className='px-0 sm:px-12 pb-4' >
                <div className='justforyou-container'>
                    <div className="rounded shadow-emerald-950">
                        <PaymentPartners />
                    </div>
                </div>
            </div >

        </>
    )
}

export default Home