import React from 'react';
import { motion } from 'framer-motion';
import { FaStore, FaHandHoldingUsd, FaHandsHelping } from 'react-icons/fa';

const WhatWeOffer = () => {
    const offerings = [
        {
            icon: <FaStore className="w-full h-full" />,
            title: "All in One Place",
            description: "From daily groceries to handwoven Dhaka fabrics, electronics to organic mountain honey—curated for Nepali homes.",
            color: "text-primary"
        },
        {
            icon: <FaHandHoldingUsd className="w-full h-full" />,
            title: "Easy & Reliable",
            description: "Cash on Delivery | Esewa/Khalti Integration | 24/7 Nepali-speaking customer support",
            color: "text-secondary"
        },
        {
            icon: <FaHandsHelping className="w-full h-full" />,
            title: "Empowering Local Businesses",
            description: "60% of our sellers are homegrown entrepreneurs, from Kathmandu street vendors to rural artisans.",
            color: "text-accent"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto max-w-6xl px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What We <span className="text-primary">Offer</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {offerings.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
                                <figure className="px-10 pt-10">
                                    <div className={`text-6xl ${item.color} w-20 h-20 mx-auto`}>
                                        {item.icon}
                                    </div>
                                </figure>
                                <div className="card-body items-center text-center p-8">
                                    <h3 className="card-title text-2xl text-gray-800 mb-4">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;