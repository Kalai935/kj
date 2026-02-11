import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Mail } from 'lucide-react';

const letters = [
    { id: 1, title: "Open When You Miss Me", date: "Feb 14, 2024", content: "Meri Jaan,\n\nEven when we are apart, know that you are always in my heart. Look up at the moon and know I am looking at it too.\n\nForever yours,\nKalai" },
    { id: 2, title: "Open When You Need a Smile", date: "Anytime", content: "Remember the times , we made jokes on each other , Your laugh is my favorite sound in the world.\n\nLove always,\nKalai" },
    { id: 3, title: "To My Janu", date: "Feb 14, 2025", content: "I never believed in love until I met you. You complete me in ways I never knew possible.\n\nYours,\nKalai" },
];

const Envelope3D = ({ letter, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-80 h-52 cursor-pointer perspective-1000 group mx-auto"
            onClick={() => onClick(letter)}
        >
            {/* Envelope Body */}
            <div className="absolute inset-0 bg-[#e0c097] rounded shadow-lg z-10 flex items-end justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-tr from-[#d4b08c] to-[#eaddcf]"></div>
            </div>

            {/* Envelope Flap (Closed) */}
            <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
                <div
                    className="w-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[110px] border-t-[#cfaa82] filter drop-shadow-md origin-top transition-transform duration-500 group-hover:rotate-x-12"
                    style={{ transformStyle: 'preserve-3d' }}
                ></div>
            </div>

            {/* Wax Seal */}
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 group-hover:scale-110 transition-transform duration-300">
                <div className="w-14 h-14 bg-red-800 rounded-full border-4 border-red-900 shadow-xl flex items-center justify-center relative">
                    <div className="absolute inset-1 border border-red-900/50 rounded-full"></div>
                    <Heart size={24} className="text-red-950 fill-red-950 drop-shadow-sm" />
                </div>
            </div>

            {/* Letter Title (Peeking/Label) */}
            <div className="absolute bottom-6 left-0 w-full text-center z-30 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                <p className="font-Handwriting text-red-900 text-xl font-bold">{letter.title}</p>
            </div>

            {/* Shadow */}
            <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/20 blur-lg rounded-[50%] z-0 group-hover:bg-black/10 group-hover:blur-xl transition-all"></div>
        </motion.div>
    );
};

const LetterModal = ({ letter, onClose }) => {
    // Animation Stages: 'closed' -> 'opening' -> 'reading'
    const [stage, setStage] = useState('closed');

    React.useEffect(() => {
        const timer1 = setTimeout(() => setStage('opening'), 500); // Wait a bit then open flap
        const timer2 = setTimeout(() => setStage('reading'), 1500); // Then slide letter up
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
            <div className="relative w-full max-w-2xl h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>

                {/* Close Button */}
                <button className="absolute top-0 right-0 md:-right-12 text-white/50 hover:text-white p-2 z-50" onClick={onClose}>
                    <X size={32} />
                </button>

                {/* The Envelope Animation Container */}
                <div className="relative w-full max-w-sm aspect-[4/3]">

                    {/* Back of Envelope */}
                    <motion.div
                        className="absolute inset-0 bg-[#d4b08c] rounded shadow-2xl z-10"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* The Letter Paper */}
                    <motion.div
                        className="absolute left-4 right-4 bg-[#fff9f0] shadow-md p-8 z-20 flex flex-col"
                        initial={{ bottom: 10, height: '90%', scale: 0.9 }}
                        animate={stage === 'reading' ? { bottom: -50, top: -100, height: 'auto', scale: 1, y: -20 } : {}}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        {/* Paper Texture */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(#000000 0 1px, transparent 1px 100%)", backgroundSize: "100% 30px" }}></div>

                        <div className={`overflow-y-auto max-h-[60vh] custom-scrollbar transition-opacity duration-500 ${stage === 'reading' ? 'opacity-100' : 'opacity-0'}`}>
                            <p className="text-right text-gray-500 font-body mb-6 italic">{letter.date}</p>
                            <div className="font-Handwriting text-2xl md:text-3xl leading-relaxed text-gray-800 whitespace-pre-line">
                                {letter.content}
                            </div>
                            <div className="mt-8 text-center text-rose-400">
                                <Heart size={24} className="mx-auto" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Front Pockets associated with envelope */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#e0c097] z-30 rounded-b shadow-inner"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ clipPath: "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)" }}
                    />

                    {/* The Flap */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-[#cfaa82] z-40 origin-top rounded-t"
                        initial={{ rotateX: 0 }}
                        animate={stage !== 'closed' ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                    >
                        {/* Wax Seal on Flap */}
                        <motion.div
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-red-800 rounded-full border-4 border-red-900 flex items-center justify-center shadow-lg"
                            animate={stage !== 'closed' ? { opacity: 0 } : { opacity: 1 }}
                        >
                            <span className="text-red-950 font-bold text-xs tracking-widest">LOVE</span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const LoveLetters = () => {
    const [selectedLetter, setSelectedLetter] = useState(null);

    return (
        <section className="py-24 px-4 min-h-[70vh] relative bg-stone-50">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#ec4899 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

            <div className="text-center mb-20 relative z-10">
                <h2 className="text-5xl md:text-6xl font-script text-rose-500 mb-4 drop-shadow-sm">Love Letters</h2>
                <p className="text-gray-500 font-light text-xl">Sealed with a kiss, just for you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto px-4 z-10 relative">
                {letters.map((letter) => (
                    <Envelope3D key={letter.id} letter={letter} onClick={setSelectedLetter} />
                ))}
            </div>

            <AnimatePresence>
                {selectedLetter && <LetterModal letter={selectedLetter} onClose={() => setSelectedLetter(null)} />}
            </AnimatePresence>
        </section>
    );
};

export default LoveLetters;
