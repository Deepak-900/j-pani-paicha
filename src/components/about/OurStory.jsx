import React from 'react';
import { motion } from 'framer-motion';

const OurStory = () => {
    return (
        <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-white to-gray-50">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-secondary blur-xl"></div>
            </div>

            <div className="container mx-auto max-w-6xl">
                {/* Section header with animated underline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="text-primary">Story</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                {/* Content with staggered animation */}
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Image with hover effect */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative group">
                            <img
                                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Nepalese market"
                                className="rounded-xl shadow-2xl w-full h-auto transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-xl"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="bg-primary/90 px-3 py-1 rounded-full text-sm font-medium">Kathmandu, 2024</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 space-y-6"
                    >
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            <span className="text-primary font-semibold">Born in 2024</span> in the heart of Nepal,
                            <span className='text-black font-bold'>
                                &nbsp;"J
                                <span className="text-[#2c4358]"> PANI </span>
                                <span className="text-[#ea8442]"> PAICHA" </span>
                            </span>
                            was inspired by a simple question: What if finding everything you need felt as effortless as saying "I found it!"?
                        </p>

                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            We merged <span className="text-secondary font-semibold">Nepal's vibrant market culture</span> with cutting-edge technology to create a digital bazaar where traditional shops meet e-commerce.
                        </p>

                        <div className="pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                            >
                                Learn More About Our Journey
                            </motion.button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="text-3xl font-bold text-primary">50K+</h4>
                                <p className="text-gray-600">Happy Customers</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <h4 className="text-3xl font-bold text-secondary">1.2K</h4>
                                <p className="text-gray-600">Local Sellers</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;