import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Heart, Navigation } from 'lucide-react';

const locations = [
    {
        id: 1,
        x: 20,
        y: 80,
        title: "Where We Met",
        date: "Nov 17, 2023",
        description: "The coffee shop where it all began.",
        emoji: "☕"
    },
    {
        id: 2,
        x: 45,
        y: 40,
        title: "First Date",
        date: "Dec 01, 2023",
        description: "That magical evening walk.",
        emoji: "🌙"
    },
    {
        id: 3,
        x: 80,
        y: 60,
        title: "First I Love You",
        date: "Feb 14, 2024",
        description: "Under the starlit sky.",
        emoji: "✨"
    }
];

const MapPinMarker = ({ location, onClick, delay }) => (
    <motion.div
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, type: "spring", stiffness: 200 }}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
        style={{ left: `${location.x}%`, top: `${location.y}%` }}
        onClick={() => onClick(location)}
    >
        <div className="relative">
            <MapPin size={40} className="text-rose-500 fill-rose-500 drop-shadow-lg group-hover:scale-110 transition-transform" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-600 whitespace-nowrap shadow-md mb-2 pointer-events-none">
                {location.title}
            </div>
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-red-500/30 rounded-full blur-sm"
            />
        </div>
    </motion.div>
);

const MemoryLaneMap = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <section className="py-24 px-4 min-h-screen flex flex-col items-center bg-emerald-50/30 overflow-hidden relative">
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl md:text-5xl font-script text-emerald-800 mb-4">Our Journey Map</h2>
                <p className="text-gray-600">Tracing the steps that led me to you.</p>
            </div>

            {/* Stylized Map Container */}
            <div className="relative w-full max-w-5xl aspect-[16/9] bg-[#e6dfd3] rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white/50">

                {/* Vintage Texture Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}></div>

                {/* Animated Path (Dashed Line) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                        d="M 20% 80% Q 25% 40% 45% 40% T 80% 60%"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="4"
                        strokeDasharray="10 10"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                </svg>

                {/* Decorative Map Elements */}
                <div className="absolute top-10 right-10 opacity-20 transform rotate-12">
                    <Navigation size={120} className="text-emerald-900" />
                </div>

                {/* Pins */}
                {locations.map((loc, index) => (
                    <MapPinMarker
                        key={loc.id}
                        location={loc}
                        onClick={setSelectedLocation}
                        delay={0.5 + index * 0.5}
                    />
                ))}

                {/* Location Detail Modal */}
                <AnimatePresence>
                    {selectedLocation && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
                            onClick={() => setSelectedLocation(null)}
                        >
                            <motion.div
                                className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedLocation(null)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={24} />
                                </button>

                                <div className="text-6xl mb-4 text-center">{selectedLocation.emoji}</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedLocation.title}</h3>
                                <p className="text-rose-500 font-medium text-sm border-b pb-4 mb-4">{selectedLocation.date}</p>
                                <p className="text-gray-600 italic font-body leading-relaxed">"{selectedLocation.description}"</p>

                                <div className="mt-6 flex justify-center">
                                    <Heart className="fill-rose-500 text-rose-500 animate-pulse" />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default MemoryLaneMap;
