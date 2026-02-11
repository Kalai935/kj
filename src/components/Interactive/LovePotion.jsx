import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Beaker } from 'lucide-react';
import confetti from 'canvas-confetti';

const ingredients = [
    { id: 1, name: "Trust", color: "from-blue-400 to-blue-600", liquidColor: "#60A5FA" },
    { id: 2, name: "Laughter", color: "from-yellow-400 to-yellow-600", liquidColor: "#FBBF24" },
    { id: 3, name: "Adventure", color: "from-green-400 to-green-600", liquidColor: "#34D399" },
    { id: 4, name: "Cuddles", color: "from-pink-400 to-pink-600", liquidColor: "#F472B6" },
    { id: 5, name: "Support", color: "from-purple-400 to-purple-600", liquidColor: "#A78BFA" },
    { id: 6, name: "Pizza", color: "from-orange-400 to-orange-600", liquidColor: "#FB923C" },
];

const LovePotion = () => {
    const [addedIngredients, setAddedIngredients] = useState([]);
    const [brewing, setBrewing] = useState(false);
    const [finished, setFinished] = useState(false);
    const [potionColor, setPotionColor] = useState("#ec4899"); // Default pink

    const addIngredient = (ingredient) => {
        if (finished || brewing) return;
        setAddedIngredients([...addedIngredients, ingredient]);
        setPotionColor(ingredient.liquidColor);

        if (addedIngredients.length + 1 >= 5) {
            brewPotion();
        }
    };

    const brewPotion = () => {
        setBrewing(true);
        setTimeout(() => {
            setFinished(true);
            setBrewing(false);
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.8 },
                colors: ['#FF69B4', '#FF1493', '#C71585']
            });
        }, 2000);
    };

    const reset = () => {
        setAddedIngredients([]);
        setFinished(false);
        setBrewing(false);
        setPotionColor("#ec4899");
    };

    return (
        <section className="py-20 px-4 min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative overflow-hidden">
            {/* Magical Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-rose-500/20 rounded-full blur-xl"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0.2, 0.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                        }}
                    />
                ))}
            </div>

            <div className="text-center mb-12 relative z-10">
                <h2 className="text-5xl md:text-6xl font-script text-rose-300 mb-4 drop-shadow-lg">Love Potion No. 9</h2>
                <p className="text-gray-300 text-lg">Mix 5 essential ingredients to create our perfect brew.</p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-16 relative z-10 w-full max-w-5xl">

                {/* Ingredients Panel */}
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <h3 className="text-xl font-header text-rose-200 mb-2 text-center">Select Ingredients</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {ingredients.map((ing) => (
                            <motion.button
                                key={ing.id}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => addIngredient(ing)}
                                disabled={finished || brewing}
                                className={`relative overflow-hidden group p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${ing.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                                <div className="relative z-10 flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${ing.color} shadow-inner border border-white/20`} />
                                    <span className="font-bold text-sm tracking-wide">{ing.name}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* The Flask */}
                <div className="relative w-80 h-96 flex items-center justify-center">

                    {/* Flask Container */}
                    <div className="relative w-48 h-64">
                        {/* Glass Effect */}
                        <div className="absolute inset-0 z-20 border-4 border-white/30 bg-white/5 backdrop-blur-[2px] rounded-b-[4rem] rounded-t-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] overflow-hidden mask-flask clip-flask">
                            {/* Reflection */}
                            <div className="absolute top-4 left-4 w-4 h-32 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-[1px]" />
                        </div>

                        {/* Liquid Container */}
                        <div className="absolute inset-2 bottom-2 rounded-b-[3.5rem] rounded-t-md overflow-hidden z-10 bg-gray-800/50">
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 w-full"
                                initial={{ height: "0%" }}
                                animate={{
                                    height: `${(addedIngredients.length / 5) * 100}%`,
                                    backgroundColor: potionColor
                                }}
                                transition={{ type: "spring", damping: 15 }}
                            >
                                {/* Bubbles inside liquid */}
                                <AnimatePresence>
                                    {brewing && [...Array(10)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: 200, opacity: 0 }}
                                            animate={{ y: -50, opacity: 1 }}
                                            exit={{ y: -100, opacity: 0 }}
                                            transition={{
                                                duration: Math.random() * 1 + 1,
                                                repeat: Infinity,
                                                delay: Math.random() * 0.5
                                            }}
                                            className="absolute w-2 h-2 bg-white/40 rounded-full"
                                            style={{ left: `${Math.random() * 100}%` }}
                                        />
                                    ))}
                                </AnimatePresence>

                                {/* Liquid Surface */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-4 bg-white/20"
                                    animate={{ scaleY: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                            </motion.div>
                        </div>

                        {/* Flask Neck (Top part) */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 border-x-4 border-white/30 bg-white/5 backdrop-blur-[2px] z-10" />
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-20 h-4 bg-white/30 rounded-full z-20 shadow-lg" />

                    </div>

                    {/* Floating Magical Particles when Brewing/Finished */}
                    <AnimatePresence>
                        {(brewing || finished) && (
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none">
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                >
                                    <Sparkles size={64} className="text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)] animate-pulse" />
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Result Message */}
                    <AnimatePresence>
                        {finished && (
                            <motion.div
                                initial={{ scale: 0, y: 50, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                className="absolute -bottom-20 left-0 right-0 flex justify-center z-50"
                            >
                                <div className="bg-white/90 backdrop-blur-md text-rose-600 font-bold py-3 px-8 rounded-full shadow-2xl border-2 border-rose-100 flex items-center gap-2">
                                    <Sparkles size={20} />
                                    <span>Recipe for Eternal Love!</span>
                                    <Sparkles size={20} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Reset Button */}
                <div className="w-full max-w-xs flex justify-center lg:justify-start">
                    {finished ? (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={reset}
                            className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/10 px-6 py-3 rounded-full transition-all border border-white/20"
                        >
                            <RotateCcw size={18} />
                            Brew Another
                        </motion.button>
                    ) : (
                        <div className="h-12 text-white/40 text-sm italic py-3 flex items-center gap-2">
                            <Beaker size={16} />
                            {5 - addedIngredients.length} more ingredient{5 - addedIngredients.length !== 1 && 's'} needed
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default LovePotion;
