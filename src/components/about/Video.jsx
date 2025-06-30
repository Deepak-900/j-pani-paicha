import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const VideoPlayer = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const videoId = "4p9B6Gzwj4U";

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto max-w-6xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our <span className="text-primary">Journey</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                    {/* YouTube Player with Native Controls */}
                    <div className="relative" style={{ paddingBottom: '56.25%' }}>
                        {hasStarted ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1`}
                                title="JPaniPaicha Journey"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            />
                        ) : (
                            <div className="absolute inset-0">
                                <img
                                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                    alt="Video thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <motion.button
                                        onClick={() => setHasStarted(true)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <FaPlay className="w-6 h-6 ml-1" />
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Video Description */}
                    <div className="bg-white p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                            <span className='text-2xl lg:text-3xl text-black'>
                                "J
                                <span className="text-[#2c4358]"> PANI </span>
                                <span className="text-[#ea8442]"> PAICHA" </span>
                                Story
                            </span>
                        </h3>
                        <p className="text-gray-600">
                            Watch our 60-second journey from idea to Nepal's fastest growing marketplace
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoPlayer;