import React from 'react';
import { motion } from 'framer-motion';

const Mission = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto max-w-4xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="card bg-gradient-to-r from-primary to-secondary text-white shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="card-body items-center text-center p-12">
                            <motion.h2
                                className="card-title text-3xl md:text-4xl font-bold mb-6"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                Our <span className="text-white">Mission</span>
                            </motion.h2>

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <blockquote className="text-xl md:text-2xl leading-relaxed italic max-w-3xl">
                                    "To build Nepal's most inclusive digital marketplace—where even the farthest village can buy, sell, and thrive."
                                </blockquote>
                            </motion.div>

                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 text-white/20 text-6xl">
                                "
                            </div>
                            <div className="absolute bottom-4 left-4 text-white/20 text-6xl">
                                "
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Mission;