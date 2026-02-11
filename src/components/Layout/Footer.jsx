import React from 'react';
import { Heart, Github, Twitter, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HeartRateMonitor = () => {
    return (
        <div className="w-full h-24 relative overflow-hidden bg-black flex items-center justify-center my-8">
            {/* Grid */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(transparent 19px, #333 20px), linear-gradient(90deg, transparent 19px, #333 20px)',
                backgroundSize: '20px 20px'
            }}></div>

            {/* ECG Line */}
            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none">
                <motion.path
                    d="M0,50 L100,50 L110,50 L120,20 L130,80 L140,50 L150,50 L160,50 L200,50"
                    fill="none"
                    stroke="#ff1744"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1, x: ["-100%", "100%"] }}
                    transition={{
                        duration: 2,
                        ease: "linear",
                        repeat: Infinity
                    }}
                />
                <motion.path
                    d="M0,50 L100,50 L110,50 L120,20 L130,80 L140,50 L150,50 L160,50 L200,50"
                    fill="none"
                    stroke="#ff1744"
                    strokeWidth="2"
                    strokeOpacity="0.5"
                // Second line for trail effect? Or just use one.
                // Let's keep it simple with CSS animation for the heartbeat pulse if needed.
                />
            </svg>

            <div className="absolute right-10 top-2 text-rose-500 font-mono text-sm">
                BPM: <span className="animate-pulse font-bold text-xl">120</span>
            </div>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6 relative overflow-hidden">
            <HeartRateMonitor />

            <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl font-script text-rose-400 mb-6">Forever & Always</h2>

                <p className="text-gray-400 mb-8 italic">
                    "You are my today and all of my tomorrows."
                </p>

                <div className="flex justify-center gap-6 mb-8">
                    <button className="p-3 bg-white/10 rounded-full hover:bg-rose-500 hover:text-white transition-colors">
                        <Share2 size={20} />
                    </button>
                    {/* Add more icons if needed */}
                </div>

                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <p>© 2024 [Your Name]. All rights reserved.</p>
                    <p className="flex items-center gap-2 mt-4 md:mt-0">
                        Made with <Heart size={14} className="fill-rose-500 text-rose-500 animate-pulse" /> for [Her Name]
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
