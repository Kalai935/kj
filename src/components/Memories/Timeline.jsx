import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Heart, Star, Music, Coffee, Sparkles } from 'lucide-react';

const events = [
    { id: 1, date: "Nov 05, 2023", title: "First Met", description: "The day our paths crossed at the Glen's.", icon: <Star size={24} /> },
    { id: 2, date: "Nov 13, 2023", title: "First Date", description: "Coffee, nervous laughter, and instant connection.", icon: <Coffee size={24} /> },
    { id: 3, date: "Nov 17, 2023", title: "We both fell in love", description: "With the two cups of coffee, it just felt right.", icon: <Heart size={24} /> },
];

const TimelineEvent = ({ event, index }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={`flex items-center justify-center w-full mb-24 relative ${isEven ? 'flex-row-reverse' : ''}`}>
            {/* Spacer for the other side */}
            <div className="w-1/2" />

            {/* The Dot on the Path */}
            <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-12 h-12 bg-rose-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white"
                >
                    {event.icon}
                </motion.div>
            </div>

            {/* The Content Card */}
            <div className={`w-1/2 p-4 md:p-8 flex ${isEven ? 'justify-end' : 'justify-start'}`}>
                <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-rose-400 max-w-md relative group`}
                >
                    <div className={`absolute top-6 ${isEven ? '-right-3 border-l-[12px] border-l-white' : '-left-3 border-r-[12px] border-r-white'} w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent drop-shadow-sm`}></div>

                    <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-xs font-bold tracking-wider mb-2">
                        {event.date}
                    </span>
                    <h3 className="text-2xl font-header text-gray-800 mb-2 group-hover:text-rose-500 transition-colors">{event.title}</h3>
                    <p className="text-gray-600 font-body leading-relaxed">
                        {event.description}
                    </p>
                    <Sparkles className="absolute -top-4 -right-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </motion.div>
            </div>
        </div>
    );
};

const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-rose-50 to-white min-h-screen">
            <div className="text-center mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-6xl font-script text-rose-500 mb-4 drop-shadow-sm">Our Journey</h2>
                    <p className="text-gray-500 text-lg">Every step brings us closer.</p>
                </motion.div>
            </div>

            <div className="relative max-w-5xl mx-auto px-4 z-10 w-full">
                {/* SVG Path Background */}
                <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full pointer-events-none hidden md:block" style={{ width: '600px' }}>
                    <svg className="w-full h-full" viewBox="0 0 600 1200" preserveAspectRatio="none">
                        {/* Static Grey Path */}
                        <path
                            d="M 300 0 Q 450 200 300 400 T 300 800 T 300 1200"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                        />
                        {/* Animated Colored Path */}
                        <motion.path
                            d="M 300 0 Q 450 200 300 400 T 300 800 T 300 1200"
                            fill="none"
                            stroke="#f43f5e"
                            strokeWidth="4"
                            style={{ pathLength }}
                        />
                    </svg>
                </div>

                {/* Mobile Straight Line fallback */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 md:hidden transform -translate-x-1/2">
                    <motion.div
                        className="w-full bg-rose-500 origin-top"
                        style={{ height: "100%", scaleY: pathLength }}
                    />
                </div>

                <div className="relative pt-10 pb-20">
                    {events.map((event, index) => (
                        <TimelineEvent key={event.id} event={event} index={index} />
                    ))}
                </div>

                {/* End Heart */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <Heart className="text-rose-500 fill-rose-500 animate-bounce" size={40} />
                </div>
            </div>
        </section>
    );
};

export default Timeline;
