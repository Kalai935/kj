import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Music, Disc, Volume2 } from 'lucide-react';

const SONG = {
    title: "Po Indru Neeyaga",
    artist: "Velaiyilla Pattadhari",
    // Placeholder cover if the original link is broken or needs refreshing
    cover: "https://lh3.googleusercontent.com/d/1LGrHifMOJf7viqYQyzLiCTyOrG3qqObQ",
    audio: "/music/po-indru-neeyaga.mp3", // Ensure this file exists in public/music/
};

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const formatTime = (time) => {
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    };

    return (
        <section className="py-24 px-4 min-h-[70vh] flex items-center justify-center bg-rose-50/30 relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 w-64 h-64 bg-rose-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-100 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-5xl w-full flex flex-col md:flex-row items-center gap-16 border border-white/60 relative z-10">

                {/* Vinyl Player Mechanism */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 flex-shrink-0 group">
                    {/* Turntable Base Shadow */}
                    <div className="absolute inset-4 rounded-full bg-black/5 blur-xl transform translate-y-4"></div>

                    {/* The Vinyl Record */}
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="w-full h-full rounded-full bg-[#1a1a1a] shadow-2xl flex items-center justify-center relative overflow-hidden ring-8 ring-gray-900"
                        style={{
                            background: 'conic-gradient(from 0deg, #1a1a1a 0%, #2a2a2a 25%, #1a1a1a 50%, #2a2a2a 75%, #1a1a1a 100%)'
                        }}
                    >
                        {/* Vinyl Grooves Texture */}
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="absolute rounded-full border border-gray-800/40"
                                style={{ inset: `${15 + i * 8}%` }}></div>
                        ))}

                        {/* Album Art Label */}
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1a1a1a] relative z-10 shadow-inner">
                            <img src={SONG.cover} alt="Cover" className="w-full h-full object-cover opacity-90" />
                        </div>

                        {/* Shine Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full pointer-events-none"></div>
                    </motion.div>

                    {/* Tone Arm */}
                    <motion.div
                        initial={{ rotate: -15 }}
                        animate={{ rotate: isPlaying ? 25 : -15 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 w-48 h-64 origin-[70%_15%] z-20 pointer-events-none filter drop-shadow-xl"
                    >
                        {/* Pivot Base */}
                        <div className="absolute right-[20%] top-[10%] w-16 h-16 bg-gray-300 rounded-full border-4 border-gray-400 shadow-inner flex items-center justify-center">
                            <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                        </div>
                        {/* Arm */}
                        <div className="w-2 h-48 bg-gradient-to-b from-gray-300 to-gray-400 absolute right-[35%] top-[20%] transform -rotate-12 origin-top rounded-full"></div>
                        {/* Head/Needle */}
                        <div className="w-10 h-14 bg-gray-800 absolute bottom-4 right-[45%] rounded-md transform rotate-12 flex items-end justify-center">
                            <div className="w-1 h-3 bg-gray-400"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Controls & Visualizer */}
                <div className="flex-1 w-full flex flex-col items-center md:items-start space-y-8">
                    <div className="text-center md:text-left space-y-2">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/50 text-rose-600 text-xs font-bold uppercase tracking-widest"
                        >
                            <Music size={12} /> Now Playing
                        </motion.div>
                        <h3 className="text-4xl md:text-5xl font-header text-gray-800 leading-tight">{SONG.title}</h3>
                        <p className="text-xl md:text-2xl text-rose-500 font-script">{SONG.artist}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden cursor-pointer relative group">
                            <motion.div
                                className="h-full bg-rose-500"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 font-mono font-medium">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration || 0)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-8">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <SkipBack size={28} />
                        </button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={togglePlay}
                            className="w-20 h-20 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-rose-200 hover:shadow-rose-300 transition-all border-4 border-white"
                        >
                            {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
                        </motion.button>

                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                            <SkipForward size={28} />
                        </button>
                    </div>

                    {/* Sound Wave Visualizer (Simulated) */}
                    <div className="flex items-center gap-1 h-12">
                        {[...Array(24)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: isPlaying ? [10, Math.random() * 40 + 10, 10] : 4,
                                    opacity: isPlaying ? 1 : 0.3
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.4,
                                    delay: i * 0.05,
                                    ease: "easeInOut"
                                }}
                                className="w-1.5 bg-rose-400 rounded-full"
                            />
                        ))}
                    </div>

                    <audio
                        ref={audioRef}
                        src={SONG.audio}
                        onTimeUpdate={handleTimeUpdate}
                        loop
                    />
                </div>
            </div>
        </section>
    );
};

export default MusicPlayer;
