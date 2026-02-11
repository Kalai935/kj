import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronRight, ChevronLeft, Heart } from 'lucide-react';

const quotes = [
    { id: 1, text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.", author: "Leo Christopher", color: "from-rose-400 to-orange-300" },
    { id: 2, text: "If I know what love is, it is because of you.", author: "Hermann Hesse", color: "from-purple-400 to-pink-400" },
    { id: 3, text: "You are my heart, my life, my one and only thought.", author: "Arthur Conan Doyle", color: "from-red-400 to-rose-400" },
    { id: 4, text: "In all the world, there is no heart for me like yours.", author: "Maya Angelou", color: "from-pink-300 to-rose-300" },
    { id: 5, text: "I love you. I am who I am because of you.", author: "The Notebook", color: "from-blue-300 to-purple-300" },
    { id: 6, text: "My soul and your soul are forever tangled.", author: "N.R. Hart", color: "from-indigo-400 to-cyan-300" },
];

const LoveQuotes = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            nextQuote();
        }, 6000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextQuote = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
    };

    const prevQuote = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
    };

    const currentQuote = quotes[currentIndex];

    // Animation variants
    const variants = {
        enter: (direction) => ({
            y: direction > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            y: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            y: direction > 0 ? -50 : 50,
            opacity: 0,
            scale: 0.95
        })
    };

    return (
        <motion.section
            animate={{
                background: `linear-gradient(135deg, ${currentQuote.color.split(' ')[0].replace('from-', 'var(--tw-gradient-from)')}, ${currentQuote.color.split(' ')[1].replace('to-', 'var(--tw-gradient-to)')})`
            }}
            className={`py-24 px-4 min-h-[60vh] flex items-center justify-center transition-colors duration-1000 bg-gradient-to-br ${currentQuote.color} relative overflow-hidden`}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>

            <div className="max-w-5xl w-full relative z-10">
                <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 md:p-20 shadow-2xl border border-white/40 text-center min-h-[400px] flex flex-col items-center justify-center">

                    {/* Decorative Quotes */}
                    <Quote className="absolute top-8 left-8 text-rose-950/10 w-12 h-12 md:w-20 md:h-20 transform -scale-x-100" />
                    <Quote className="absolute bottom-8 right-8 text-rose-950/10 w-12 h-12 md:w-20 md:h-20" />

                    <AnimatePresence mode='wait' custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-3xl mx-auto"
                        >
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-header text-rose-950 mb-8 leading-tight drop-shadow-sm">
                                "{currentQuote.text}"
                            </h3>
                            <div className="flex items-center justify-center gap-3">
                                <div className="h-[1px] w-12 bg-rose-900/30"></div>
                                <p className="text-rose-900/80 font-body uppercase tracking-[0.2em] text-sm md:text-base font-medium">
                                    {currentQuote.author}
                                </p>
                                <div className="h-[1px] w-12 bg-rose-900/30"></div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-12 text-rose-900/60">
                        <button onClick={prevQuote} className="p-2 hover:bg-white/40 rounded-full transition-colors group">
                            <ChevronLeft size={32} className="group-hover:scale-125 transition-transform text-rose-950" />
                        </button>
                        {/* Dot Indicators */}
                        <div className="flex items-center gap-3">
                            {quotes.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1);
                                        setCurrentIndex(idx);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-rose-950 w-6' : 'bg-rose-900/20 hover:bg-rose-900/40'}`}
                                />
                            ))}
                        </div>
                        <button onClick={nextQuote} className="p-2 hover:bg-white/40 rounded-full transition-colors group">
                            <ChevronRight size={32} className="group-hover:scale-125 transition-transform text-rose-950" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default LoveQuotes;
