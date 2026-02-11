import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { RefreshCcw, Heart, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const initialReasons = [
    { id: 1, text: "The way you smile at me.", icon: "😊", color: "bg-red-500" },
    { id: 2, text: "Your kindness to everyone.", icon: "🌟", color: "bg-pink-500" },
    { id: 3, text: "How you make me laugh.", icon: "😂", color: "bg-purple-500" },
    { id: 4, text: "The way you listen.", icon: "👂", color: "bg-rose-500" },
    { id: 5, text: "Your support for my dreams.", icon: "🚀", color: "bg-orange-500" },
    { id: 6, text: "Your text messages.", icon: "📱", color: "bg-blue-500" },
    { id: 7, text: "The way you hug me.", icon: "🤗", color: "bg-teal-500" },
    { id: 8, text: "Your intelligence.", icon: "🧠", color: "bg-indigo-500" },
    { id: 9, text: "Your beautiful eyes.", icon: "👀", color: "bg-violet-500" },
    { id: 10, text: "How we grow together.", icon: "🌱", color: "bg-green-500" },
    { id: 11, text: "Everything about you.", icon: "❤️", color: "bg-red-600" },
];

const Card = ({ reason, index, total, onSwipe }) => {
    // Only render the top 3 cards for performance and visual clarity
    if (index > 2) return null;

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    // Stack effect: cards behind are smaller and lower
    const scale = 1 - index * 0.05;
    const yOffset = index * 15;

    const handleDragEnd = (event, info) => {
        if (Math.abs(info.offset.x) > 100) {
            // Trigger swipe
            onSwipe();
            if (Math.random() > 0.7) {
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.7 }
                });
            }
        }
    };

    return (
        <motion.div
            style={{
                x,
                rotate,
                opacity,
                zIndex: total - index,
                scale,
                y: yOffset
            }}
            drag={index === 0 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale, opacity: 1, y: yOffset }}
            exit={{ x: Math.random() < 0.5 ? -1000 : 1000, opacity: 0, rotate: Math.random() < 0.5 ? -45 : 45 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute w-72 h-96 md:w-80 md:h-[26rem] rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing border-8 border-white bg-white flex flex-col`}
        >
            <div className={`h-1/2 ${reason.color} rounded-t-xl flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                {/* Pattern */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #fff 2px, transparent 2.5px)", backgroundSize: "20px 20px" }}></div>
                <span className="text-8xl drop-shadow-md filter">{reason.icon}</span>
            </div>

            <div className="h-1/2 flex flex-col items-center justify-center p-6 text-center bg-gray-50 rounded-b-xl relative">
                <Heart className={`absolute top-0 transform -translate-y-1/2 p-2 bg-white rounded-full text-${reason.color.replace('bg-', '')} shadow-md border-2 border-gray-100`} size={48} fill="currentColor" />

                <h3 className="text-gray-400 font-script text-xl mb-2">Reason #{reason.id}</h3>
                <p className="font-header text-2xl md:text-3xl text-gray-800 leading-tight">
                    {reason.text}
                </p>
            </div>
        </motion.div>
    );
};

const ReasonsWhy = () => {
    const [cards, setCards] = useState(initialReasons);

    const handleSwipe = () => {
        setCards((prev) => {
            const newCards = [...prev];
            // Remove the first card
            newCards.shift();
            return newCards;
        });
    };

    const resetDeck = () => {
        setCards([...initialReasons].sort(() => Math.random() - 0.5));
    };

    return (
        <section className="py-24 px-4 min-h-[90vh] bg-rose-50 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute top-10 left-10 text-rose-200"><Heart size={64} /></div>
                <div className="absolute bottom-20 right-20 text-rose-200"><Heart size={96} /></div>
                <div className="absolute top-1/2 right-10 text-rose-200"><Star size={48} /></div>
                <div className="absolute bottom-10 left-20 text-rose-200"><Star size={32} /></div>
            </div>

            <div className="text-center mb-12 relative z-10">
                <h2 className="text-4xl md:text-5xl font-script text-rose-500 mb-2">Reasons Why I Love You</h2>
                <p className="text-gray-500">Swipe to count the ways...</p>
            </div>

            <div className="w-full max-w-sm h-[30rem] relative flex items-center justify-center z-10">
                <AnimatePresence>
                    {cards.length > 0 ? (
                        cards.map((reason, index) => (
                            <Card
                                key={reason.id} // Important: use ID as key for drag ordering to work
                                reason={reason}
                                index={index}
                                total={cards.length}
                                onSwipe={handleSwipe}
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-8 rounded-2xl shadow-xl text-center border-4 border-rose-200"
                        >
                            <h3 className="text-2xl font-header text-gray-800 mb-4">You are my everything!</h3>
                            <button
                                onClick={resetDeck}
                                className="px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto"
                            >
                                <RefreshCcw size={20} /> Start Over
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ReasonsWhy;
