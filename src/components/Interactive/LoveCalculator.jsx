import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Heart, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const LoveCalculator = () => {
    const [status, setStatus] = useState('idle'); // idle, scanning, result
    const [progress, setProgress] = useState(0);

    const startScan = () => {
        if (status === 'result') return;
        setStatus('scanning');
        setProgress(0);
    };

    const stopScan = () => {
        if (status === 'scanning' && progress < 100) {
            setStatus('idle');
            setProgress(0);
        }
    };

    useEffect(() => {
        let interval;
        if (status === 'scanning') {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStatus('result');
                        triggerSuccess();
                        return 100;
                    }
                    return prev + 2; // Speed of scan
                });
            }, 30);
        }
        return () => clearInterval(interval);
    }, [status]);

    const triggerSuccess = () => {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#F43F5E', '#EC4899', '#ffb7b2']
        });
    };

    const reset = () => {
        setStatus('idle');
        setProgress(0);
    };

    return (
        <section className="py-24 px-4 min-h-[60vh] flex flex-col items-center justify-center bg-rose-50/50">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-script text-rose-500 mb-4">Compatibility Scanner</h2>
                <p className="text-gray-600">Place your finger to analyze our connection.</p>
            </div>

            <div className="relative">
                {/* Fingerprint Scanner Area */}
                <motion.div
                    onMouseDown={startScan}
                    onMouseUp={stopScan}
                    onMouseLeave={stopScan}
                    onTouchStart={startScan}
                    onTouchEnd={stopScan}
                    whileTap={{ scale: 0.95 }}
                    className={`w-64 h-64 md:w-80 md:h-80 rounded-[3rem] bg-white shadow-2xl border-4 ${status === 'scanning' ? 'border-rose-400' : 'border-gray-100'} flex items-center justify-center relative overflow-hidden cursor-pointer select-none transition-colors duration-300`}
                >
                    {/* Background Progress Fill */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-rose-100"
                        style={{ height: `${progress}%` }}
                    />

                    {/* Fingerprint Icon */}
                    <div className={`relative z-10 transition-colors duration-500 ${status === 'scanning' ? 'text-rose-500' : 'text-gray-300'}`}>
                        <Fingerprint size={120} strokeWidth={1} />

                        {/* Scanning Beam */}
                        {status === 'scanning' && (
                            <motion.div
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                            />
                        )}
                    </div>

                    {/* Instruction Text */}
                    <div className="absolute bottom-8 left-0 right-0 text-center z-10">
                        <p className={`text-sm font-bold tracking-widest uppercase transition-colors ${status === 'scanning' ? 'text-rose-600 animate-pulse' : 'text-gray-400'}`}>
                            {status === 'scanning' ? 'Scanning...' : 'Hold to Scan'}
                        </p>
                    </div>

                    {/* Result Overlay */}
                    <AnimatePresence>
                        {status === 'result' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-rose-500 z-20 flex flex-col items-center justify-center text-white"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                >
                                    <Heart size={80} fill="white" className="mb-4 animate-bounce" />
                                </motion.div>
                                <h3 className="text-5xl font-black mb-2">100%</h3>
                                <p className="font-script text-2xl">Perfect Match!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Reset Button */}
                {status === 'result' && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={reset}
                        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-colors"
                    >
                        <RefreshCw size={18} /> Scan Again
                    </motion.button>
                )}
            </div>
        </section>
    );
};

export default LoveCalculator;
