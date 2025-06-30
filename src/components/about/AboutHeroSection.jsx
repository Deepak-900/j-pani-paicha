import React from 'react';
import Button from '../Button';
import { motion } from 'framer-motion';

const AboutHeroSection = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Hero Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Nepalese marketplace"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            </div>

            {/* Hero Content */}
            <div className="relative min-h-[60vh] flex items-center justify-center px-4 py-20">
                <div className="text-center max-w-4xl">
                    {/* Logo Text - Preserving original colors */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                    >
                        <span className='text-2xl lg:text-3xl [text-shadow:_-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white,_1px_1px_0_white]'>
                            <span className="text-black">J</span>
                            <span className="text-[#2c4358]"> PANI </span>
                            <span className="text-[#ea8442]">PAICHA</span>
                        </span>
                    </motion.h1>

                    {/* Taglines with staggered animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
                    >
                        <motion.p
                            className="mb-4 text-xl md:text-2xl text-white font-medium"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            Everywhere, Everything, Anytime
                        </motion.p>
                        <motion.p
                            className="mb-8 text-lg md:text-xl text-gray-200"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            Nepal's Most Trusted Marketplace
                        </motion.p>
                    </motion.div>

                    {/* Animated Button */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            className="px-8 py-3 bg-gradient-to-r from-[#2c4358] to-[#ea8442] text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Shopping
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>
    );
};

export default AboutHeroSection;