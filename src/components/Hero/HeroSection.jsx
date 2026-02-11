import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, ChevronDown, Stars, Sparkles } from 'lucide-react';
import Countdown from './Countdown';

const FloatingHeart = ({ delay, duration, x, scale }) => (
    <motion.div
        initial={{ y: "120vh", x, opacity: 0, scale }}
        animate={{
            y: "-20vh",
            opacity: [0, 1, 1, 0],
            rotate: [0, 45, -45, 0]
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "linear"
        }}
        className="absolute text-rose-200/30 blur-[1px] z-0"
    >
        <Heart fill="currentColor" />
    </motion.div>
);

const HeroSection = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative text-center px-4 overflow-hidden bg-gradient-to-b from-rose-50 via-white to-rose-100">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingHeart delay={0} duration={15} x="10%" scale={1.5} />
                <FloatingHeart delay={2} duration={18} x="85%" scale={1.2} />
                <FloatingHeart delay={5} duration={20} x="20%" scale={1} />
                <FloatingHeart delay={8} duration={25} x="70%" scale={0.8} />
                <FloatingHeart delay={12} duration={22} x="40%" scale={1.8} />

                {/* Soft Gradients */}
                <motion.div
                    animate={{ x: mousePosition.x * -2, y: mousePosition.y * -2 }}
                    className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
                    className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[100px]"
                />
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y: y1, opacity }}
                className="z-10 relative flex flex-col items-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="mb-6 relative"
                >
                    <div className="flex items-center justify-center gap-4 text-rose-500 font-bold tracking-[0.3em] uppercase text-sm md:text-base animate-pulse">
                        <Stars size={16} />
                        <span>Our Infinite Story</span>
                        <Stars size={16} />
                    </div>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-8 perspective-1000">
                    <motion.h1
                        initial={{ x: -100, opacity: 0, rotateY: 45 }}
                        animate={{ x: 0, opacity: 1, rotateY: 0 }}
                        transition={{ duration: 1.2, type: "spring" }}
                        className="font-script text-7xl sm:text-8xl md:text-9xl text-gray-800 drop-shadow-lg cursor-default hover:text-rose-500 transition-colors duration-500"
                    >
                        Kalai
                    </motion.h1>

                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        className="text-rose-500 relative group"
                    >
                        <Heart size={80} fill="currentColor" className="drop-shadow-xl group-hover:animate-heartbeat" />
                        <Sparkles className="absolute -top-4 -right-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                    <motion.h1
                        initial={{ x: 100, opacity: 0, rotateY: -45 }}
                        animate={{ x: 0, opacity: 1, rotateY: 0 }}
                        transition={{ duration: 1.2, type: "spring" }}
                        className="font-script text-7xl sm:text-8xl md:text-9xl text-gray-800 drop-shadow-lg cursor-default hover:text-rose-500 transition-colors duration-500"
                    >
                        Janu
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-lg sm:text-2xl text-gray-600 max-w-2xl mx-auto italic mb-12 font-light"
                >
                    "Every moment with you is my favorite memory in the making."
                </motion.p>

                {/* Glassmorphism Countdown Container */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/30 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="uppercase tracking-[0.2em] text-xs font-bold text-gray-500 mb-6 group-hover:text-rose-500 transition-colors">Since the magic began</p>
                    <div className="text-gray-800">
                        <Countdown startDate="2023-11-17" />
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2.5, duration: 1.5, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-rose-400 cursor-pointer z-10"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs uppercase tracking-widest opacity-80">Our Story</span>
                    <ChevronDown size={32} />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
