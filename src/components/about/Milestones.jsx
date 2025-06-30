import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaTrophy, FaStore } from 'react-icons/fa';

const Milestones = () => {
    const milestones = [
        {
            icon: <FaHome />,
            title: "Households Served",
            value: "50,000+",
            desc: "Across Nepal",
            color: "text-primary",
            bgColor: "bg-primary/10"
        },
        {
            icon: <FaTrophy />,
            title: "Awards Won",
            value: "3",
            desc: "'Best Emerging E-Commerce 2024'",
            color: "text-secondary",
            bgColor: "bg-secondary/10"
        },
        {
            icon: <FaStore />,
            title: "Local Businesses",
            value: "1,200+",
            desc: "Empowered on our platform",
            color: "text-accent",
            bgColor: "bg-accent/10"
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
                >
                    Proud <span className="text-primary">Milestones</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
                    {milestones.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="group"
                        >
                            <div className={`h-full p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${item.bgColor}`}>
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className={`inline-flex items-center justify-center p-4 rounded-full ${item.color} ${item.bgColor} mb-6`}
                                >
                                    <div className="text-3xl">
                                        {item.icon}
                                    </div>
                                </motion.div>
                                <p className="text-4xl font-bold mb-2 text-gray-900">{item.value}</p>
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Milestones;