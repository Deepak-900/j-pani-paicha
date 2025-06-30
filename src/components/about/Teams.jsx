import React from 'react';
import { motion } from 'framer-motion';

const Teams = () => {
    const teamMembers = [
        {
            name: "Ramesh",
            role: "Head of Florals",
            bio: "15 years in Nepal's flower trade—now helping local growers reach every wedding and festival.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            color: "from-[#2c4358] to-[#3a5a78]"
        },
        {
            name: "Sarita",
            role: "Local Produce Lead",
            bio: "My dream? To get a farmer's gundruk from Dolakha to global kitchens!",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            color: "from-[#ea8442] to-[#f0a368]"
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
                        Meet Our <span className="text-primary">Team</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        The passionate individuals bringing <span className='text-black font-bold'>
                            "J
                            <span className="text-[#2c4358]"> PANI </span>
                            <span className="text-[#ea8442]"> PAICHA" </span>
                        </span> to every corner of Nepal
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full overflow-hidden group">
                                <div className="card-body p-0">
                                    <div className="flex flex-col md:flex-row h-full">
                                        {/* Avatar with gradient border */}
                                        <div className="relative p-4 flex justify-center md:justify-start">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-20 w-24 h-24 rounded-full blur-md group-hover:blur-lg transition-all duration-500`}></div>
                                            <div className="avatar relative z-10">
                                                <div className="w-24 h-24 rounded-full ring-4 ring-white ring-offset-2">
                                                    <img src={member.image} alt={member.name} className="object-cover" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1">
                                            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                            <p className={`font-semibold mb-3 bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                                                {member.role}
                                            </p>
                                            <p className="text-gray-600 italic">"{member.bio}"</p>

                                            {/* Social Links (optional) */}
                                            <div className="flex gap-3 mt-4">
                                                <a href="#" className="text-gray-400 hover:text-[#2c4358] transition-colors">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="text-gray-400 hover:text-[#ea8442] transition-colors">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-gray-600 mb-6">Want to join our growing team?</p>
                    <button className="btn btn-primary px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all">
                        We're Hiring!
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Teams;