import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import '../../styles/index.css';

import Background from './Background';

const MainLayout = ({ children }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="min-h-screen relative overflow-hidden heart-cursor">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-red-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Background Ambience */}
            <Background />

            {/* Main Content Area */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Floating Action / Navigation (Placeholder) */}
            <nav className="fixed bottom-8 right-8 z-50">
                {/* Configurable Menu or 'Back to Top' */}
            </nav>
        </div>
    );
};

export default MainLayout;
