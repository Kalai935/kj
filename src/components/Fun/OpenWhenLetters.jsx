import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const letters = [
    {
        id: 1,
        title: "Open when you miss me",
        color: "bg-blue-100",
        sealColor: "bg-blue-500",
        content: "Remember that I am always with you in spirit. Look at the moon, and know I am looking at it too. You are my heart, no matter the distance.",
        image: "/memories/letter1.jpeg"
    },
    {
        id: 2,
        title: "Open when you're sad",
        color: "bg-yellow-100",
        sealColor: "bg-yellow-500",
        content: "I hate seeing you sad. Remember your smile lights up my entire world. This storm will pass, and the sun will shine on us again. I love you!",
        image: "/memories/letter2.jpeg"
    },
    {
        id: 3,
        title: "Open on our Anniversary",
        color: "bg-rose-100",
        sealColor: "bg-rose-500",
        content: "Happy Anniversary my love! Every day with you is a gift. I can't believe how lucky I am to call you mine. Here's to forever!",
        image: "/memories/letter3.jpeg"
    },
    {
        id: 4,
        title: "Open when you need a laugh",
        color: "bg-purple-100",
        sealColor: "bg-purple-500",
        content: "Why did the scarecrow win an award? Because he was outstanding in his field! (Okay, I know it's bad, but I hope you smiled!)",
        image: "/memories/letter4.jpeg"
    },
    {
        id: 5,
        title: "Open when you are stressed",
        color: "bg-green-100",
        sealColor: "bg-green-500",
        content: "Take a deep breath. In... Out... You are capable, strong, and brilliant. Don't let the world weigh you down. I believe in you.",
        image: "/memories/letter5.jpeg"
    },
    {
        id: 6,
        title: "Open just because",
        color: "bg-orange-100",
        sealColor: "bg-orange-500",
        content: "No special reason. Just wanted to remind you that you are the best thing that ever happened to me. I love you more than words can say.",
        image: "/memories/letter6.jpeg"
    }
];

const Envelope = ({ letter, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick(letter)}
        className={`relative aspect-[4/3] ${letter.color} rounded-lg shadow-md cursor-pointer flex items-center justify-center p-4 border-b-4 border-r-4 border-black/5 group overflow-hidden`}
    >
        {/* Envelope Flap Illusion */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 clip-path-polygon-[0_0,50%_100%,100%_0] transform origin-top transition-transform group-hover:scale-y-90"></div>

        {/* Wax Seal */}
        <div className={`w-12 h-12 rounded-full ${letter.sealColor} flex items-center justify-center shadow-inner border-2 border-white/20 relative z-10`}>
            <Mail className="text-white w-6 h-6" />
        </div>

        <div className="absolute bottom-4 text-center w-full px-2">
            <p className="font-handwriting text-gray-700 text-lg leading-tight">{letter.title}</p>
        </div>
    </motion.div>
);

const OpenWhenLetters = () => {
    const [selectedLetter, setSelectedLetter] = useState(null);

    const handleOpen = (letter) => {
        setSelectedLetter(letter);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFE082', '#FFAB91'] // Gold/Peach
        });
    };

    return (
        <section className="py-24 px-4 min-h-screen bg-slate-50 flex flex-col items-center">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-script text-slate-700 mb-4">The Envelope Vault</h2>
                <p className="text-gray-500">For every mood, a message.</p>
            </div>

            <div className="max-w-6xl w-full grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                {letters.map((letter) => (
                    <Envelope key={letter.id} letter={letter} onClick={handleOpen} />
                ))}
            </div>

            <AnimatePresence>
                {selectedLetter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setSelectedLetter(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100, rotateX: 90 }}
                            animate={{ scale: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.5, y: 100, opacity: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`h-32 ${selectedLetter.color} flex items-center justify-center relative`}>
                                <button
                                    onClick={() => setSelectedLetter(null)}
                                    className="absolute top-4 right-4 bg-white/50 p-2 rounded-full hover:bg-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <h3 className="font-header text-2xl text-gray-800 px-8 text-center">{selectedLetter.title}</h3>
                            </div>

                            <div className="p-8">
                                <div className="prose prose-rose max-w-none">
                                    <p className="font-handwriting text-2xl text-gray-700 leading-loose">
                                        "{selectedLetter.content}"
                                    </p>
                                </div>
                                <div className="mt-8 rounded-xl overflow-hidden shadow-md h-48">
                                    <img src={selectedLetter.image} alt="Memory" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 uppercase tracking-widest border-t">
                                With all my love
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default OpenWhenLetters;
